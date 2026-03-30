/**
 * routes/intention.js
 *
 * POST /api/sessions/:sessionId/intention
 *   Body: { intention: 'observe'|'hint'|'solution'|'check', conversationId? }
 *
 * Called when the student selects their learning intention from the UI.
 * Advances phase to 'branch_active' and triggers the scene pipeline.
 */

const sessions = require('../sessions');
const { maybeStartPipeline } = require('../ws/scene');

const VALID_INTENTIONS = ['observe', 'hint', 'solution', 'check'];

module.exports = (app) => {
  app.post('/api/sessions/:sessionId/intention', (req, res) => {
    const { sessionId } = req.params;
    const { intention, conversationId } = req.body;

    if (!VALID_INTENTIONS.includes(intention)) {
      return res.status(400).json({
        error: `intention must be one of: ${VALID_INTENTIONS.join(', ')}`,
      });
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.branch = intention;
    session.phase = 'branch_active';
    if (conversationId) session.conversationId = conversationId;
    sessions.set(sessionId, session);

    console.log(`[Intention] Set — sessionId=${sessionId} branch=${intention}`);

    // If the scene WS is already connected, fire the pipeline now.
    // If not, it fires when the WS connects (see ws/scene.js).
    maybeStartPipeline(session);

    // Also update the chatStore phase for the conversation so the
    // chat WS handler knows to forward messages as branch_active.
    if (conversationId && app.locals.chatStore) {
      const record = app.locals.chatStore.get(conversationId) || {};
      record.phase = 'branch_active';
      record.branch = intention;
      app.locals.chatStore.set(conversationId, record);
    }

    res.json({ ok: true, sessionId, branch: intention });
  });
};