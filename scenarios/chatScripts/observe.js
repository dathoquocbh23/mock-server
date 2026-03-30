// Branch A — Observe
// Student wants to watch the construction unfold. All steps are auto-triggered.
// No student input required beyond branch selection.

const OBSERVE_SCRIPT = [
  {
    trigger: 'auto',
    delay: 600,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'obs-0',
      branch: 'observe',
      content: 'Tuyệt! Bạn hãy quan sát mình dựng hình và phân tích bài toán nhé. Mình sẽ vẽ từng bước một.',
      quickReplies: [],
      suggestCheck: false
    }
  },
  {
    trigger: 'auto',
    delay: 1200,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'obs-1',
      branch: 'observe',
      content: 'Ý tưởng chính: Gán tọa độ cho các đỉnh, sau đó tìm M và N bằng công thức trung điểm và trọng tâm. Từ đó viết phương trình đường thẳng MN dạng tham số.',
      quickReplies: [],
      suggestCheck: false
    }
  },
  {
    trigger: 'auto',
    delay: 1500,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'obs-2',
      branch: 'observe',
      content: 'Mặt phẳng (SBC) có phương trình y = z (bạn có thể tự kiểm tra bằng cách thay tọa độ S, B, C vào). Thay đường thẳng MN vào → tìm được I(0.2, 0.2, 0.2).',
      quickReplies: [],
      suggestCheck: false
    }
  },
  {
    trigger: 'auto',
    delay: 1200,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'obs-3',
      branch: 'observe',
      content: '📐 Kết quả:\n• IN = √((0.333-0.2)² + (0-0.2)² + (0.333-0.2)²) ≈ 0.266\n• IM = √((0-0.2)² + (0.5-0.2)² + (0.5-0.2)²) ≈ 0.4\n\n→ **IN/IM = 2/3**',
      quickReplies: ['Cho mình xem lại từng bước', 'Mình hiểu rồi, cảm ơn!'],
      suggestCheck: false
    }
  }
]

module.exports = OBSERVE_SCRIPT
