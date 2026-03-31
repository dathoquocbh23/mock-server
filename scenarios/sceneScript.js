// Scene script — branch-agnostic. Same 20 geometry steps for all 4 branches.
// chatText fields are mirrored to the chat WS by sceneWSHandler in the same setTimeout tick.
// Empty chatText ("") = silent step — no narration mirror.
//
// COLOR SYSTEM:
//   Idle  → all faces: fill #f8fafc  stroke #cbd5e1  labelColor #64748b   (soft light slate)
//   Highlighted → light tinted fill + vivid dark stroke + dark label text
//     Base ABCD : amber   fill #FAEEDA  stroke #BA7517  label #633806
//     Plane SBC : blue    fill #E6F1FB  stroke #185FA5  label #0C447C
//     Plane SAD : teal    fill #E1F5EE  stroke #0F6E56  label #085041
//     Plane SAB : purple  fill #EEEDFE  stroke #534AB7  label #3C3489
//     Plane SCD : coral   fill #FAECE7  stroke #993C1D  label #712B13
//     Line MN   : green   fill #EAF3DE  stroke #3B6D11  label #27500A
//     Point I   : pink    fill #FBEAF0  stroke #993556  label #72243E

const SCENE_SCRIPT = [

  // ── STEP 0: Base plane ABCD ────────────────────────────────
  {
    delay: 400,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 0,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Dựng mặt đáy ABCD — vẽ hình bình hành xiên để tránh trường hợp đặc biệt.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'ABCD',
        planeType: 'BASE',
        vertices: [
          { name: 'A', x: 0, y: 0, z: 0 },
          { name: 'B', x: 3, y: 0, z: 0 },
          { name: 'C', x: 4, y: 3, z: 0 },
          { name: 'D', x: 1, y: 3, z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#FAEEDA',
        highlightStroke: '#BA7517',
        highlightLabelColor: '#633806',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 0 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 1: Point A ───────────────────────────────────────
  {
    delay: 300,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 1,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Vẽ điểm A tại gốc tọa độ.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'A', x: 0, y: 0, z: 0,
        pointType: 'GIVEN',
        color: '#475569',
        radius: 0.12,
        label: { text: 'A', subtext: null, color: '#334155', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 2: Point B ───────────────────────────────────────
  {
    delay: 200,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 2,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Vẽ điểm B — cạnh AB theo trục Ox.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'B', x: 3, y: 0, z: 0,
        pointType: 'GIVEN',
        color: '#475569',
        radius: 0.12,
        label: { text: 'B', subtext: null, color: '#334155', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 3: Point C ───────────────────────────────────────
  {
    delay: 200,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 3,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Vẽ điểm C — dịch sang phải để tạo độ xiên cho hình bình hành.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'C', x: 4, y: 3, z: 0,
        pointType: 'GIVEN',
        color: '#475569',
        radius: 0.12,
        label: { text: 'C', subtext: null, color: '#334155', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 4: Point D ───────────────────────────────────────
  {
    delay: 200,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 4,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Vẽ điểm D — hoàn thiện 4 đỉnh mặt đáy.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'D', x: 1, y: 3, z: 0,
        pointType: 'GIVEN',
        color: '#475569',
        radius: 0.12,
        label: { text: 'D', subtext: null, color: '#334155', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 5: Base edges ABCD ───────────────────────────────
  {
    delay: 400,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 5,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Kết nối các đỉnh — hình bình hành ABCD hoàn chỉnh.',
      actionType: 'DRAW_EDGES',
      edges: [
        { name: 'AB', fromPoint: 'A', toPoint: 'B', fromCoords: { x: 0, y: 0, z: 0 }, toCoords: { x: 3, y: 0, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'BC', fromPoint: 'B', toPoint: 'C', fromCoords: { x: 3, y: 0, z: 0 }, toCoords: { x: 4, y: 3, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'CD', fromPoint: 'C', toPoint: 'D', fromCoords: { x: 4, y: 3, z: 0 }, toCoords: { x: 1, y: 3, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'DA', fromPoint: 'D', toPoint: 'A', fromCoords: { x: 1, y: 3, z: 0 }, toCoords: { x: 0, y: 0, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 }
      ],
      point: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 6: Apex S ────────────────────────────────────────
  {
    delay: 500,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 6,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Dựng đỉnh chóp S phía trên mặt đáy.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'S', x: 0, y: 0, z: 3,
        pointType: 'GIVEN',
        color: '#475569',
        radius: 0.15,
        label: { text: 'S', subtext: null, color: '#334155', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 7.5 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 600 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 7: Lateral edges SA, SB, SC, SD ──────────────────
  {
    delay: 400,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 7,
      totalSteps: 20,
      phase: 'SETUP',
      chatText: 'Nối S xuống các đỉnh A, B, C, D — hình chóp S.ABCD hoàn chỉnh.',
      actionType: 'DRAW_EDGES',
      edges: [
        { name: 'SA', fromPoint: 'S', toPoint: 'A', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 0, y: 0, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'SB', fromPoint: 'S', toPoint: 'B', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 3, y: 0, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'SC', fromPoint: 'S', toPoint: 'C', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 4, y: 3, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 },
        { name: 'SD', fromPoint: 'S', toPoint: 'D', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 1, y: 3, z: 0 }, lineType: 'EDGE', color: '#94a3b8', style: 'SOLID', width: 2 }
      ],
      point: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 7.5 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 8: Plane SBC ─────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 8,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Tô mặt phẳng (SBC) — đây là mặt phẳng cần tìm giao điểm.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SBC',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'B', x: 3, y: 0, z: 0 },
          { name: 'C', x: 4, y: 3, z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#E6F1FB',
        highlightStroke: '#185FA5',
        highlightLabelColor: '#0C447C',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 8.5, y: 4.5, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 9: Point M (midpoint SD) ────────────────────────
  {
    delay: 700,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 9,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Đánh dấu M = trung điểm SD. M chia SD thành hai phần bằng nhau.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'M', x: 0.5, y: 1.5, z: 1.5,
        pointType: 'GIVEN',
        color: '#94a3b8',
        highlightColor: '#BA7517',
        radius: 0.15,
        label: { text: 'M', subtext: 'midpoint SD', color: '#64748b', highlightLabelColor: '#633806', fontSize: 13 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 8.5, y: 4.5, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 10: Highlight SD + M ─────────────────────────────
  {
    delay: 400,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 10,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: '✦ Chú ý SD và điểm M — mối quan hệ này dùng ngay sau.',
      actionType: 'HIGHLIGHT',
      highlights: [
        { elementName: 'SD', elementType: 'EDGE',  color: '#BA7517', duration: 2000 },
        { elementName: 'M',  elementType: 'POINT', color: '#BA7517', duration: 2000 }
      ],
      point: null, edges: null, plane: null, circle: null, surface: null,
      camera: { position: { x: 8.5, y: 4.5, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 11: Point N (centroid SAB) ──────────────────────
  {
    delay: 700,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 11,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Đánh dấu N = trọng tâm △SAB. N là điểm cân bằng của tam giác.',
      actionType: 'DRAW_POINT',
      point: {
        name: 'N', x: 1, y: 0, z: 1,
        pointType: 'GIVEN',
        color: '#94a3b8',
        highlightColor: '#534AB7',
        radius: 0.15,
        label: { text: 'N', subtext: 'centroid SAB', color: '#64748b', highlightLabelColor: '#3C3489', fontSize: 13 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 8.5, y: 4.5, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 12: Plane SAD ─────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 12,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Tô mặt phẳng (SAD) — mặt bên trái chứa điểm M.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SAD',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'A', x: 0, y: 0, z: 0 },
          { name: 'D', x: 1, y: 3, z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#E1F5EE',
        highlightStroke: '#0F6E56',
        highlightLabelColor: '#085041',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 8.5, y: 6, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 13: Plane SAB ─────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 13,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Tô mặt phẳng (SAB) — mặt trước của hình chóp, chứa trọng tâm N.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SAB',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'A', x: 0, y: 0, z: 0 },
          { name: 'B', x: 3, y: 0, z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#EEEDFE',
        highlightStroke: '#534AB7',
        highlightLabelColor: '#3C3489',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: -3, z: 6 }, target: { x: 2, y: 0, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 14: Plane SCD ─────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 14,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Tô mặt phẳng (SCD) — mặt phía sau của hình chóp.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SCD',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'C', x: 4, y: 3, z: 0 },
          { name: 'D', x: 1, y: 3, z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#FAECE7',
        highlightStroke: '#993C1D',
        highlightLabelColor: '#712B13',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: -3, y: 8, z: 6 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 1000 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 15: Line MN ──────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 15,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Vẽ đoạn thẳng MN bên trong hình chóp.',
      actionType: 'DRAW_EDGES',
      edges: [
        {
          name: 'MN',
          fromPoint: 'M', toPoint: 'N',
          fromCoords: { x: 0.5, y: 1.5, z: 1.5 },
          toCoords:   { x: 1,   y: 0,   z: 1   },
          lineType: 'EDGE',
          color: '#94a3b8',
          highlightColor: '#3B6D11',
          style: 'SOLID', width: 2
        }
      ],
      point: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 7, y: 6, z: 7.5 }, target: { x: 2, y: 1.5, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 16: Point I (intersection) ──────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 16,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: '✦ Điểm I xuất hiện — giao điểm của đường thẳng MN với mặt phẳng (SBC).',
      actionType: 'DRAW_POINT',
      point: {
        name: 'I', x: 2, y: -3, z: 0,
        pointType: 'GIVEN',
        color: '#94a3b8',
        highlightColor: '#993556',
        radius: 0.18,
        label: { text: 'I', subtext: '∩ (SBC)', color: '#64748b', highlightLabelColor: '#72243E', fontSize: 14 }
      },
      edges: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 9, y: -3, z: 6 }, target: { x: 2, y: -0.5, z: 1.5 }, duration: 0 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 17: Extend MN toward I ──────────────────────────
  {
    delay: 500,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 17,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Kéo dài tia MN đến chạm vào điểm I...',
      actionType: 'DRAW_EDGES',
      edges: [
        {
          name: 'MN_EXT',
          fromPoint: 'N', toPoint: 'I',
          fromCoords: { x: 1, y: 0,  z: 1 },
          toCoords:   { x: 2, y: -3, z: 0 },
          lineType: 'EDGE',
          color: '#94a3b8',
          highlightColor: '#3B6D11',
          style: 'SOLID', width: 2
        }
      ],
      point: null, plane: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 9, y: -3, z: 6 }, target: { x: 2, y: -0.5, z: 1.5 }, duration: 1000 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 18: Plane SIB ────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 18,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Dựng mặt phẳng (SIB) — mặt phẳng qua S, I, B.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SIB',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'I', x: 2, y: -3, z: 0 },
          { name: 'B', x: 3, y: 0,  z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#FBEAF0',
        highlightStroke: '#993556',
        highlightLabelColor: '#72243E',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 9, y: -3, z: 7 }, target: { x: 2, y: 0, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 19: Plane SIA ────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 19,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Dựng mặt phẳng (SIA) — mặt phẳng qua S, I, A.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SIA',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'I', x: 2, y: -3, z: 0 },
          { name: 'A', x: 0, y: 0,  z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#FAECE7',
        highlightStroke: '#993C1D',
        highlightLabelColor: '#712B13',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: 9, y: -3, z: 7 }, target: { x: 1, y: -1, z: 1.5 }, duration: 600 },
      verified: true, verifyNote: null
    }
  },

  // ── STEP 20: Plane SID ────────────────────────────────────
  {
    delay: 600,
    message: {
      type: 'SCENE_STEP',
      stepIndex: 20,
      totalSteps: 20,
      phase: 'CONSTRUCTION',
      chatText: 'Dựng mặt phẳng (SID) — mặt phẳng qua S, I, D.',
      actionType: 'DRAW_PLANE',
      plane: {
        name: 'SID',
        planeType: 'SIDE',
        vertices: [
          { name: 'S', x: 0, y: 0, z: 3 },
          { name: 'I', x: 2, y: -3, z: 0 },
          { name: 'D', x: 1, y: 3,  z: 0 }
        ],
        color: '#f8fafc',
        stroke: '#cbd5e1',
        opacity: 0.85,
        highlightColor: '#FAEEDA',
        highlightStroke: '#BA7517',
        highlightLabelColor: '#633806',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: -2, y: 6, z: 7 }, target: { x: 1, y: 1, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },
];

module.exports = SCENE_SCRIPT;