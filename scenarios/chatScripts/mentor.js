// Branch C — Mentor / Hint (Socratic mode)
// Never gives the answer directly. Guides the student step by step with questions.
// All interactive steps use trigger: "student_reply" with waitFor: ["*"].

const MENTOR_SCRIPT = [
  // Step 0: Open with a question about coordinate assignment
  {
    trigger: 'auto',
    delay: 600,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-0',
      branch: 'hint',
      content: 'Tốt lắm! Mình sẽ đồng hành cùng bạn. Trước tiên — để dùng phương pháp tọa độ, bạn sẽ gán tọa độ cho các đỉnh như thế nào? Hãy thử đặt A tại gốc tọa độ trước.',
      quickReplies: ['A(0,0,0), B(1,0,0), C(1,1,0), D(0,1,0), S(0,0,1)', 'Mình chưa biết cách đặt'],
      suggestCheck: false
    }
  },

  // Step 1: Respond to vertex answer, nudge toward M
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-1',
      branch: 'hint',
      content: 'Đúng hướng rồi! Với tọa độ đó, bạn tính được M chưa? Nhớ rằng M là **trung điểm của SD**. Công thức trung điểm: M = (S + D) / 2.',
      quickReplies: ['M(0, 1/2, 1/2)', 'Mình tính ra M khác'],
      suggestCheck: false
    }
  },

  // Step 2: Respond to M, ask about N as centroid
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-2',
      branch: 'hint',
      content: 'Chính xác! M(0, 1/2, 1/2) ✓\n\nBây giờ tìm N — **trọng tâm tam giác SAB**. Bạn còn nhớ công thức trọng tâm không? (gợi ý: N = (S + A + B) / 3)',
      quickReplies: ['N(1/3, 0, 1/3)', 'Mình quên công thức rồi'],
      suggestCheck: false
    }
  },

  // Step 3: Respond to N, ask about plane SBC
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-3',
      branch: 'hint',
      content: 'Tuyệt! N(1/3, 0, 1/3) ✓\n\nBước tiếp theo quan trọng: **Tìm phương trình mặt phẳng (SBC)**.\nGợi ý: Lấy hai vectơ SB⃗ và SC⃗, rồi tính tích có hướng để ra pháp vectơ. Bạn thử xem?',
      quickReplies: ['Pháp vectơ n = (1, 0, 1)', 'Mình không nhớ cách tính tích có hướng'],
      suggestCheck: false
    }
  },

  // Step 4: Respond to plane, ask about substitution
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-4',
      branch: 'hint',
      content: 'Rất tốt! Pháp vectơ n⃗ = (1, 0, 1) → phương trình (SBC): **x + z = 1** ✓\n\nBây giờ viết phương trình tham số của đường thẳng MN, rồi thay vào x + z = 1 để tìm I. Bạn có thể làm bước này không?',
      quickReplies: ['I(1/5, 1/5, 1/5)', 'Cho mình gợi ý thêm'],
      suggestCheck: false
    }
  },

  // Step 5: Final — ask for ratio, arm check banner
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'hint-5',
      branch: 'hint',
      content: 'Gần đến đích rồi! I nằm trên đoạn MN. Bạn tính được IN và IM chưa?\n\nGợi ý: Dùng khoảng cách Euclid giữa hai điểm, hoặc dùng tham số t trên đường thẳng. Bạn nghĩ tỉ số IN/IM bằng bao nhiêu?',
      quickReplies: ['IN/IM = 2/3', 'IN/IM = 3/2', 'Mình chưa ra'],
      suggestCheck: true
    }
  }
]

module.exports = MENTOR_SCRIPT
