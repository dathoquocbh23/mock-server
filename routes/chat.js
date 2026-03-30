/**
 * routes/chat.js
 *
 * POST /api/chat/confirm
 *   Body: { text, userId, conversationId }
 *   ─ Creates (or reuses) a lightweight pre-session chat record and sends
 *     the "confirmation" assistant message over the chat WS channel.
 *
 * POST /api/chat/reply
 *   Body: { text, confirmed, userId, conversationId }
 *   ─ Handles the student's yes/no answer to the confirmation question.
 *     If confirmed → sends __INTENTION_CHECK__ over the chat WS.
 *     If not confirmed → asks the student to re-enter the problem.
 *
 * Both endpoints are HTTP — the client sends text here, the *response*
 * arrives via the /ws/chat WebSocket so the message ordering is consistent.
 */

const { sendChatMessage, sendIntentionCheck } = require('../wsHelpers');

// conversationId → { ws, phase, rawInput }
// Lightweight store for pre-session chat state (before a sessionId exists).
const chatStore = new Map();

module.exports = (app, wss) => {
  // ── GET ws from wss by conversationId ───────────────────────────────────
  // The /ws/chat WebSocket handler registers sockets here.
  // We expose a helper so routes can push messages without importing wss directly.

  // ── POST /api/chat/confirm ───────────────────────────────────────────────
  app.post('/api/chat/confirm', (req, res) => {
    const { text, userId, conversationId } = req.body;

    if (!text || !userId || !conversationId) {
      return res.status(400).json({ error: 'text, userId, conversationId required' });
    }

    // Initialise or reset the pre-session record
    const existing = chatStore.get(conversationId) || {};
    chatStore.set(conversationId, {
      ...existing,
      userId,
      rawInput: text,
      phase: 'awaiting_confirmation',
    });

    console.log(`[Chat] confirm received — conversationId=${conversationId}`);

    // Push the confirmation question over the WS channel (if already connected)
    const ws = existing.ws || null;
    const confirmText = buildConfirmationMessage(text);
    sendChatMessage(ws, confirmText, { conversationId });

    // Even if WS isn't connected yet the message will be queued and sent
    // when /ws/chat connects (see ws/chat.js).
    chatStore.set(conversationId, {
      ...chatStore.get(conversationId),
      pendingMessage: { text: confirmText, type: 'chat_message' },
    });

    res.json({ ok: true });
  });

  // ── POST /api/chat/reply ─────────────────────────────────────────────────
  app.post('/api/chat/reply', (req, res) => {
    const { text, confirmed, userId, conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).json({ error: 'conversationId required' });
    }

    const record = chatStore.get(conversationId);
    if (!record) {
      return res.status(404).json({ error: 'conversation not found' });
    }

    const ws = record.ws || null;

    if (confirmed) {
      // Student confirmed the problem → send intention check signal
      record.phase = 'awaiting_intention';
      chatStore.set(conversationId, record);

      console.log(`[Chat] confirmed — sending intention check (conversationId=${conversationId})`);
      sendIntentionCheck(ws);

      // Queue it in case WS isn't connected yet
      chatStore.set(conversationId, {
        ...record,
        pendingMessage: { type: 'intention_check', text: '__INTENTION_CHECK__' },
      });
    } else {
      // Student said no → ask them to re-enter
      record.phase = 'idle';
      chatStore.set(conversationId, record);

      console.log(`[Chat] NOT confirmed — asking for re-entry (conversationId=${conversationId})`);
      const retryText = 'Xin lỗi, hãy nhập lại đề bài để mình hiểu đúng hơn nhé!';
      sendChatMessage(ws, retryText, { conversationId });

      chatStore.set(conversationId, {
        ...record,
        pendingMessage: { text: retryText, type: 'chat_message' },
      });
    }

    res.json({ ok: true });
  });

  // Expose the chat store so the WS handler can access it
  app.locals.chatStore = chatStore;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function buildConfirmationMessage(problemText) {
  const trimmed = problemText.length > 200
    ? problemText.slice(0, 200) + '…'
    : problemText;
  return `Mình hiểu đề bài của bạn là:\n\n"${trimmed}"\n\nĐúng không? (Gõ "đúng" hoặc "sai/không đúng" để tiếp tục)`;
}