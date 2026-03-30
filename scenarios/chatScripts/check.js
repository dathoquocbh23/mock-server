// Branch D — Check
// Validates the student's submitted answer for IN/IM.
// Triggered by SWITCH_BRANCH { branch: "check" } from either the banner or quick reply.
// Step 1 matches correct answer variants; unmatched answers fall through to nudge logic in chatWSHandler.

const CHECK_SCRIPT = [
  // Step 0: Ask student to state their answer
  {
    trigger: 'auto',
    delay: 500,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'chk-0',
      branch: 'check',
      content: 'Được rồi, hãy cho mình biết đáp án của bạn: **IN/IM bằng bao nhiêu?**',
      quickReplies: ['2/3', '3/2', '1/2', 'Đáp án khác'],
      suggestCheck: false
    }
  },

  // Step 1: Match correct answer → CHECK_RESULT correct
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['2/3', 'hai phần ba', '0.667', '0.66', '2 / 3', '2/3'],
    message: {
      type: 'CHECK_RESULT',
      role: 'assistant',
      messageId: 'chk-1-correct',
      branch: 'check',
      correct: true,
      content: '✅ **Chính xác! IN/IM = 2/3**\n\nBạn đã giải đúng hoàn toàn!\n\n**Tóm tắt lời giải:**\n• M(0, 1/2, 1/2) — trung điểm SD\n• N(1/3, 0, 1/3) — trọng tâm △SAB\n• I(1/5, 1/5, 1/5) — giao điểm MN với (SBC)\n• IN/IM = 2/3 ✓',
      highlightElement: { name: 'I', elementType: 'POINT', color: '#22c55e' },
      quickReplies: ['Xem lại toàn bộ lời giải', 'Mình hiểu rồi, cảm ơn!'],
      suggestCheck: false
    }
  },

  // Step 2: Wrong answer → CHECK_RESULT incorrect
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['3/2', '1/2', '1/3', 'khác', 'other', '*'],
    message: {
      type: 'CHECK_RESULT',
      role: 'assistant',
      messageId: 'chk-1-wrong',
      branch: 'check',
      correct: false,
      content: '❌ **Chưa đúng rồi.**\n\nĐáp án đúng là **IN/IM = 2/3**.\n\nLỗi hay gặp:\n• Nhầm chiều tỉ số (IN/IM ≠ IM/IN)\n• Sai tọa độ điểm I khi giải hệ\n• Dùng sai phương trình mặt phẳng (SBC)\n\nBạn muốn xem lại bước nào?',
      highlightElement: { name: 'MN', elementType: 'EDGE', color: '#ef4444' },
      quickReplies: ['Xem lời giải đúng', 'Thử lại'],
      suggestCheck: false
    }
  }
]

module.exports = CHECK_SCRIPT
