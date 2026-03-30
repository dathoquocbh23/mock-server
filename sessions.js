// Shared in-memory session registry.
// Scene WS and Chat WS both reference the same session object via this Map.
// This is the only coupling between the two channels.

const sessions = new Map()

module.exports = sessions
