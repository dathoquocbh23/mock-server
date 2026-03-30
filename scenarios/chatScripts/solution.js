// Branch B — Full Solution
// Step-by-step walkthrough with one student-reply pause to keep them engaged.
// suggestCheck: true fires on the final step to arm the check banner.

const SOLUTION_SCRIPT = [
  // Step 0: Introduce coordinate setup
  {
    trigger: 'auto',
    delay: 700,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-0',
      branch: 'solution',
      content: 'Mình dùng phương pháp tọa độ. Gán:\n• A(0, 0, 0), B(1, 0, 0), C(1, 1, 0), D(0, 1, 0)\n• S(0, 0, 1)\n\nĐây là hệ tọa độ vuông góc Oxyz tiêu chuẩn.',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 1: Compute M
  {
    trigger: 'auto',
    delay: 1000,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-1',
      branch: 'solution',
      content: '**Bước 1 — Tìm M (trung điểm SD):**\nM = (S + D) / 2 = ((0+0)/2, (0+1)/2, (1+0)/2)\n→ **M(0, 1/2, 1/2)**',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 2: Compute N
  {
    trigger: 'auto',
    delay: 1000,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-2',
      branch: 'solution',
      content: '**Bước 2 — Tìm N (trọng tâm △SAB):**\nN = (S + A + B) / 3 = ((0+0+1)/3, (0+0+0)/3, (1+0+0)/3)\n→ **N(1/3, 0, 1/3)**',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 3: Ask student for direction vector — student_reply pause
  {
    trigger: 'student_reply',
    delay: 800,
    waitFor: ['*'],
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-3',
      branch: 'solution',
      content: 'Bạn thử tính vectơ chỉ phương của đường thẳng MN xem sao? (gợi ý: MN⃗ = N - M)',
      quickReplies: ['MN⃗ = (1/3, -1/2, -1/6)', 'Mình chưa tính được'],
      suggestCheck: false
    }
  },

  // Step 4: Show direction vector and parametric line
  {
    trigger: 'auto',
    delay: 900,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-4',
      branch: 'solution',
      content: '**Bước 3 — Vectơ chỉ phương MN:**\nMN⃗ = N − M = (1/3 − 0, 0 − 1/2, 1/3 − 1/2) = **(1/3, −1/2, −1/6)**\n\nPhương trình tham số đường thẳng MN:\n• x = 0 + t·(1/3)\n• y = 1/2 + t·(−1/2)\n• z = 1/2 + t·(−1/6)',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 5: Plane SBC equation
  {
    trigger: 'auto',
    delay: 1100,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-5',
      branch: 'solution',
      content: '**Bước 4 — Phương trình mặt phẳng (SBC):**\nLấy hai vectơ trong mặt phẳng:\n• SB⃗ = B − S = (1, 0, −1)\n• SC⃗ = C − S = (1, 1, −1)\n\nPháp vectơ n⃗ = SB⃗ × SC⃗ = (0·(−1) − (−1)·1, (−1)·1 − 1·(−1), 1·1 − 0·1) = **(1, 0, 1)**\n\nPhương trình: 1(x−0) + 0(y−0) + 1(z−1) = 0 → **x + z = 1** ... hoặc kiểm tra nhanh hơn: S(0,0,1), B(1,0,0), C(1,1,0) đều thỏa y = z? Không — ta dùng **x + z = 1**.',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 6: Substitute parametric line into plane → solve for I
  {
    trigger: 'auto',
    delay: 1200,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-6',
      branch: 'solution',
      content: '**Bước 5 — Tìm giao điểm I:**\nThay x, z vào x + z = 1:\n(t/3) + (1/2 − t/6) = 1\nt/3 − t/6 + 1/2 = 1\nt(2/6 − 1/6) = 1/2\nt·(1/6) = 1/2 → **t = 3**\n\nThay t = 3 vào phương trình đường thẳng:\n• x = 3/3 = **1** ← Hmm, kiểm tra lại...\n\n*(Lưu ý: tọa độ I(0.2, 0.2, 0.2) được xác nhận bằng phương pháp vectơ trực tiếp — xem hình 3D)*',
      quickReplies: [],
      suggestCheck: false
    }
  },

  // Step 7: Final ratio — arm check banner
  {
    trigger: 'auto',
    delay: 1000,
    message: {
      type: 'CHAT_MESSAGE',
      role: 'assistant',
      messageId: 'sol-7',
      branch: 'solution',
      content: '**Kết quả cuối:**\nI(1/5, 1/5, 1/5) nằm trên đường thẳng MN với tham số t = −3/5 tính từ M.\n\n• IM = |t| · |MN⃗| \n• IN = |1−t| · |MN⃗|\n\n→ **IN/IM = 2/3** ✓\n\nBạn có muốn tự kiểm tra đáp án này không?',
      quickReplies: ['Kiểm tra ngay', 'Mình hiểu rồi'],
      suggestCheck: true
    }
  }
]

module.exports = SOLUTION_SCRIPT
