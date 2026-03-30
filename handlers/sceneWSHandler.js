const sessions = require('../sessions')
const SCENE_SCRIPT = require('../scenarios/sceneScript')
const { streamMessages, sendMessage } = require('../utils/streamMessages')

module.exports = (wss) => {
  wss.on('connection', (ws, req) => {
    const sessionId = req.url.split('/ws/scene/')[1]
    const session = sessions.get(sessionId)

    if (!session) {
      console.warn(`[Scene WS] Unknown session: ${sessionId}`)
      ws.close()
      return
    }

    session.sceneWs = ws
    console.log(`[Scene WS] Connected: ${sessionId}`)

    streamMessages(ws, SCENE_SCRIPT, sessionId,
      // onStep — mirror chatText to chat WS
      (step) => {
        if (step.message.chatText && session.chatWs) {
          sendMessage(session.chatWs, {
            type: 'CHAT_MESSAGE',
            role: 'assistant',
            messageId: `narr-${step.message.stepIndex}`,
            branch: 'draw',
            content: step.message.chatText,
            highlightElement: null,
            quickReplies: [],
            suggestCheck: false,
            sessionId
          })
        }
      },
      // onComplete — fires after all steps finish
      () => {
        // Notify scene client
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({
            type: 'STREAM_COMPLETE',
            sessionId,
            totalSteps: SCENE_SCRIPT.length
          }))
        }

        setTimeout(() => {
          // Send collapse sentinel to frontend chat panel
          if (session.chatWs) {
            sendMessage(session.chatWs, {
              type: 'CHAT_MESSAGE',
              role: 'assistant',
              messageId: 'narr-complete',
              branch: 'draw',
              content: 'NARRATION_COMPLETE',
              quickReplies: [],
              suggestCheck: false,
              sessionId
            })
          }

          // ← Set the flag so chatWSHandler polling can start the branch script
          session.narrationComplete = true
          console.log(`[Scene WS] narrationComplete = true for ${sessionId}`)
        }, 400)
      }
    )

    ws.on('close', () => {
      console.log(`[Scene WS] Disconnected: ${sessionId}`)
      session.sceneWs = null
    })
  })
}