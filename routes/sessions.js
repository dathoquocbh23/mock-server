/**
 * routes/sessions.js
 *
 * POST /api/sessions
 *   Body: { rawInput, userId, inputLang? }
 *   Response: { sessionId }
 *
 * Creates a bare session record. The scene pipeline fires once the client
 * connects the /ws/scene/:sessionId WebSocket AND the session has reached
 * 'branch_active' phase (i.e. intention has been selected).
 */

const { v4: uuidv4 } = require('uuid');
const sessions = require('../sessions');

module.exports = (app) => {
  app.post('/api/sessions', (req, res) => {
    const { rawInput, userId, inputLang = 'vi' } = req.body;

    if (!rawInput || !userId) {
      return res.status(400).json({ error: 'rawInput and userId are required' });
    }

    const sessionId = uuidv4();

    sessions.set(sessionId, {
      sessionId,
      userId,
      rawInput,
      inputLang,
      branch: null,
      phase: 'created',
      sceneWs: null,
      chatWs: null,
      pipelineStarted: false,
      createdAt: Date.now(),
    });

    console.log(`[Session] Created: ${sessionId} (user=${userId})`);

    res.json({ sessionId });
  });


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
};