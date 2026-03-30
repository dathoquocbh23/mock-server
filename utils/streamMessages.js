/**
 * streamMessages — streams an array of scripted steps with delays.
 *
 * @param {WebSocket} ws         - The WebSocket to send on
 * @param {Array}     script     - Array of { delay, message } step objects
 * @param {string}    sessionId  - Attached to every outgoing message
 * @param {Function}  onStep     - Called for each step as it fires (used for narration mirroring)
 * @param {Function}  onComplete - Called after all steps finish
 *
 * Supports old 4-arg call signature: streamMessages(ws, script, sessionId, onComplete)
 * In that case onStep is treated as onComplete and onComplete is ignored.
 */
function streamMessages(ws, script, sessionId, onStep, onComplete) {
  // Handle old 4-arg call signature: streamMessages(ws, script, sessionId, onComplete)
  if (typeof onStep === 'function' && typeof onComplete === 'undefined') {
    onComplete = onStep
    onStep = null
  }

  let i = 0

  function next() {
    if (i >= script.length) {
      if (onComplete) onComplete()
      return
    }

    const step = script[i]

    setTimeout(() => {
      if (ws.readyState === 1) { // OPEN
        ws.send(JSON.stringify({ ...step.message, sessionId }))
      }

      // Fire per-step callback — used by sceneWSHandler to mirror chatText → chat WS
      if (onStep) onStep(step)

      i++
      next()
    }, step.delay)
  }

  next()
}

/**
 * sendMessage — safely sends a JSON message on a WebSocket.
 * No-op if socket is not OPEN.
 */
function sendMessage(ws, msg) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(msg))
  }
}

module.exports = { streamMessages, sendMessage }
