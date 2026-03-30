const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

const server = http.createServer(app)

// Two independent WS servers — one for geometry, one for chat.
// They share session state via sessions.js but are otherwise decoupled.
const sceneWss = new WebSocket.Server({ noServer: true })
const chatWss = new WebSocket.Server({ noServer: true })

// Route WebSocket upgrade requests by URL path prefix
server.on('upgrade', (req, socket, head) => {
  const url = req.url

  if (url.startsWith('/ws/scene/')) {
    sceneWss.handleUpgrade(req, socket, head, (ws) => {
      sceneWss.emit('connection', ws, req)
    })
  } else if (url.startsWith('/ws/chat/')) {
    chatWss.handleUpgrade(req, socket, head, (ws) => {
      chatWss.emit('connection', ws, req)
    })
  } else {
    // Unknown path — reject upgrade
    socket.destroy()
  }
})

// Register REST and WS handlers
require('./handlers/sessionHandler')(app)
require('./handlers/sceneWSHandler')(sceneWss)
require('./handlers/chatWSHandler')(chatWss)

// Health check endpoint — useful for frontend polling before WS connect
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }))
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log('╔══════════════════════════════════════╗')
  console.log('║  `Mock server running on :${PORT}`   ║')
  console.log('╠══════════════════════════════════════╣')
  console.log('║  POST /api/sessions                  ║')
  console.log('║  WS   /ws/scene/:sessionId           ║')
  console.log('║  WS   /ws/chat/:sessionId            ║')
  console.log('║  GET  /health                        ║')
  console.log('╚══════════════════════════════════════╝')
})
