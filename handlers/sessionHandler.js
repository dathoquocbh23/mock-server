const { v4: uuidv4 } = require('uuid')
const sessions = require('../sessions')

module.exports = (app) => {
  app.post('/api/sessions', (req, res) => {
    console.log('[Session] Body received:', req.body)
    const { rawInput, userId, intention } = req.body
    const sessionId = uuidv4()
  
    sessions.set(sessionId, {
      sessionId,
      userId,
      rawInput,
      branch: intention ?? "observe",
      phase: 'created',
      sceneWs: null,
      chatWs: null,
      narrationComplete: false,   // ← added: gate for chat script start
      createdAt: Date.now()
    })

    console.log(`[Session] Created: ${sessionId}`)
    res.json({ sessionId })
  })
}