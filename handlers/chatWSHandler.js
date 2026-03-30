const sessions = require('../sessions')
const { sendMessage } = require('../utils/streamMessages')
const { detectCheckIntent } = require('../utils/detectCheckIntent')

const CHAT_SCRIPTS = {
  observe: require('../scenarios/chatScripts/observe'),
  solution: require('../scenarios/chatScripts/solution'),
  hint: require('../scenarios/chatScripts/mentor'),
  check: require('../scenarios/chatScripts/check')
}

module.exports = (wss) => {
  wss.on('connection', (ws, req) => {
    const sessionId = req.url.split('/ws/chat/')[1]
    const session = sessions.get(sessionId)
    console.log('[ChatWS] Connected, branch =', session?.branch)

    if (!session) {
      console.warn(`[Chat WS] Unknown session: ${sessionId}`)
      ws.close()
      return
    }

    session.chatWs = ws
    console.log(`[Chat WS] Connected: ${sessionId}`)

    // Per-connection script state
    let scriptCursor = 0
    let waitingForReply = false
    let currentScript = []

    // ── startBranchScript ────────────────────────────────────
    function startBranchScript() {
      const branch = session.branch
      if (!branch || !CHAT_SCRIPTS[branch]) {
        console.warn(`[Chat WS] No script for branch: ${branch}`)
        return
      }
      session.phase = 'branch_active'
      currentScript = CHAT_SCRIPTS[branch]
      scriptCursor = 0
      waitingForReply = false
      console.log(`[Chat WS] Starting branch script: ${branch} for ${sessionId}`)
      runScript()
    }

    // ── Poll session.narrationComplete (set by sceneWSHandler) ──
    // sceneWSHandler writes directly to chatWs socket — it does NOT
    // trigger ws.on('message') here, so we poll the shared session flag instead.
    function waitForNarration() {
      if (session.narrationComplete) {
        console.log(`[Chat WS] Gate open — starting branch: ${session.branch}`)
        setTimeout(() => startBranchScript(), 600)
      } else {
        setTimeout(waitForNarration, 200)
      }
    }
    waitForNarration()

    // ── Incoming messages (from frontend only) ───────────────
    ws.on('message', (data) => {
      let msg
      try {
        msg = JSON.parse(data)
      } catch {
        console.warn(`[Chat WS] Malformed message from ${sessionId}`)
        return
      }

      const text = (msg.content || '').toLowerCase().trim()

      // ── INTENTION_SELECT — branch switching mid-session ───
      if (msg.type === 'INTENTION_SELECT') {
        const branch = msg.branch
        if (!CHAT_SCRIPTS[branch]) {
          console.warn(`[Chat WS] Unknown branch: ${branch}`)
          return
        }
        session.branch = branch
        currentScript = CHAT_SCRIPTS[branch]
        scriptCursor = 0
        waitingForReply = false
        session.phase = 'branch_active'
        console.log(`[Chat WS] Branch switched via INTENTION_SELECT: ${branch}`)
        if (session.narrationComplete) runScript()
        return
      }

      // ── SWITCH_BRANCH to check ────────────────────────────
      if (msg.type === 'SWITCH_BRANCH' && msg.branch === 'check') {
        session.branch = 'check'
        currentScript = CHAT_SCRIPTS.check
        scriptCursor = 0
        waitingForReply = false
        session.phase = 'branch_active'
        console.log(`[Chat WS] Switched to check branch: ${sessionId}`)
        runScript()
        return
      }

      // ── branch_active: student reply ──────────────────────
      if (session.phase === 'branch_active' && waitingForReply) {
        waitingForReply = false
        if (detectCheckIntent(text)) {
          sendMessage(ws, { type: 'SUGGEST_CHECK', sessionId })
        }
        advanceScript(text)
        return
      }

      // ── Free text after script ends ───────────────────────
      if (session.phase === 'branch_active' && !waitingForReply) {
        if (detectCheckIntent(text)) {
          sendMessage(ws, { type: 'SUGGEST_CHECK', sessionId })
        }
      }
    })

    // ── runScript ────────────────────────────────────────────
    function runScript() {
      const step = currentScript[scriptCursor]
      if (!step) return

      if (step.trigger === 'auto') {
        setTimeout(() => {
          sendMessage(ws, { ...step.message, sessionId })
          scriptCursor++
          runScript()
        }, step.delay || 600)
      } else if (step.trigger === 'student_reply') {
        waitingForReply = true
      }
    }

    // ── advanceScript ────────────────────────────────────────
    function advanceScript(studentText) {
      const step = currentScript[scriptCursor]
      if (!step) return

      const waitFor = step.waitFor || []
      const matched =
        waitFor.includes('*') ||
        waitFor.some(w => studentText.includes(w.toLowerCase()))

      if (matched) {
        setTimeout(() => {
          sendMessage(ws, { ...step.message, sessionId })
          scriptCursor++
          runScript()
        }, step.delay || 800)
      } else {
        sendMessage(ws, {
          type: 'CHAT_MESSAGE',
          role: 'assistant',
          messageId: `nudge-${Date.now()}`,
          branch: session.branch,
          content: 'Hm, bạn thử lại nhé! Gợi ý: nhìn vào hình 3D và tìm mối quan hệ giữa các điểm.',
          quickReplies: [],
          suggestCheck: false,
          sessionId
        })
        waitingForReply = true
      }
    }

    ws.on('close', () => {
      console.log(`[Chat WS] Disconnected: ${sessionId}`)
      session.chatWs = null
    })
  })
}