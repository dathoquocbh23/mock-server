// Mirror of client-side detection — used to trigger SUGGEST_CHECK from server.
// Redundant by design: either server or client can arm the check banner.

const PATTERNS = [
  /i think/i,
  /maybe if/i,
  /tôi nghĩ/i,
  /có lẽ/i,
  /the answer is/i,
  /đáp án là/i,
  /kết quả là/i,
  /should be/i,
  /must be/i,
  /is it/i,
  /could it be/i,
  /in\/im/i,
  /bằng/i,
  /equal/i,
  /ratio/i
]

function detectCheckIntent(text) {
  return PATTERNS.some(p => p.test(text))
}

module.exports = { detectCheckIntent }
