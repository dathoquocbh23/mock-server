// Scene script — branch-agnostic. Same 20 geometry steps for all 4 branches.
// chatText fields are mirrored to the chat WS by sceneWSHandler in the same setTimeout tick.
// Empty chatText ("") = silent step — no narration mirror.
//
// COLOR SYSTEM:
//   Idle state  → all faces share dark slate body #1e293b, stroke #475569 (unified solid object)
//   Highlighted → each element gets its unique vivid accent (dark tinted fill + bright stroke)
//     Base ABCD : amber   fill #451a03  stroke #f59e0b  label #fcd34d
//     Plane SBC : blue    fill #172554  stroke #3b82f6  label #93c5fd
//     Plane SAD : emerald fill #052e16  stroke #10b981  label #6ee7b7
//     Plane SAB : violet  fill #2e1065  stroke #8b5cf6  label #c4b5fd
//     Plane SCD : orange  fill #431407  stroke #f97316  label #fdba74
//     Line MN   : cyan    fill #083344  stroke #22d3ee  label #67e8f9
//     Point I   : rose    fill #4c0519  stroke #f43f5e  label #fda4af

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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: amber
        highlightColor: '#451a03',
        highlightStroke: '#f59e0b',
        highlightLabelColor: '#fcd34d',
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
        color: '#e2e8f0',
        radius: 0.12,
        label: { text: 'A', subtext: null, color: '#e2e8f0', fontSize: 14 }
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
        color: '#e2e8f0',
        radius: 0.12,
        label: { text: 'B', subtext: null, color: '#e2e8f0', fontSize: 14 }
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
        color: '#e2e8f0',
        radius: 0.12,
        label: { text: 'C', subtext: null, color: '#e2e8f0', fontSize: 14 }
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
        color: '#e2e8f0',
        radius: 0.12,
        label: { text: 'D', subtext: null, color: '#e2e8f0', fontSize: 14 }
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
        { name: 'AB', fromPoint: 'A', toPoint: 'B', fromCoords: { x: 0, y: 0, z: 0 }, toCoords: { x: 3, y: 0, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'BC', fromPoint: 'B', toPoint: 'C', fromCoords: { x: 3, y: 0, z: 0 }, toCoords: { x: 4, y: 3, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'CD', fromPoint: 'C', toPoint: 'D', fromCoords: { x: 4, y: 3, z: 0 }, toCoords: { x: 1, y: 3, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'DA', fromPoint: 'D', toPoint: 'A', fromCoords: { x: 1, y: 3, z: 0 }, toCoords: { x: 0, y: 0, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 }
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
        color: '#e2e8f0',
        radius: 0.15,
        label: { text: 'S', subtext: null, color: '#e2e8f0', fontSize: 14 }
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
        { name: 'SA', fromPoint: 'S', toPoint: 'A', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 0, y: 0, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'SB', fromPoint: 'S', toPoint: 'B', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 3, y: 0, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'SC', fromPoint: 'S', toPoint: 'C', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 4, y: 3, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 },
        { name: 'SD', fromPoint: 'S', toPoint: 'D', fromCoords: { x: 0, y: 0, z: 3 }, toCoords: { x: 1, y: 3, z: 0 }, lineType: 'EDGE', color: '#475569', style: 'SOLID', width: 2 }
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: blue
        highlightColor: '#172554',
        highlightStroke: '#3b82f6',
        highlightLabelColor: '#93c5fd',
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
        // Idle: muted slate; Highlight: amber (same family as base)
        color: '#94a3b8',
        highlightColor: '#f59e0b',
        radius: 0.15,
        label: { text: 'M', subtext: 'midpoint SD', color: '#94a3b8', highlightLabelColor: '#fcd34d', fontSize: 13 }
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
        { elementName: 'SD', elementType: 'EDGE', color: '#f59e0b', duration: 2000 },
        { elementName: 'M',  elementType: 'POINT', color: '#f59e0b', duration: 2000 }
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
        // Idle: muted slate; Highlight: violet (same family as SAB)
        color: '#94a3b8',
        highlightColor: '#8b5cf6',
        radius: 0.15,
        label: { text: 'N', subtext: 'centroid SAB', color: '#94a3b8', highlightLabelColor: '#c4b5fd', fontSize: 13 }
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: emerald
        highlightColor: '#052e16',
        highlightStroke: '#10b981',
        highlightLabelColor: '#6ee7b7',
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: violet
        highlightColor: '#2e1065',
        highlightStroke: '#8b5cf6',
        highlightLabelColor: '#c4b5fd',
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: orange
        highlightColor: '#431407',
        highlightStroke: '#f97316',
        highlightLabelColor: '#fdba74',
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
          // Idle: muted slate; Highlight: cyan
          color: '#475569',
          highlightColor: '#22d3ee',
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
        // Idle: muted slate; Highlight: rose
        color: '#94a3b8',
        highlightColor: '#f43f5e',
        radius: 0.18,
        label: { text: 'I', subtext: '∩ (SBC)', color: '#94a3b8', highlightLabelColor: '#fda4af', fontSize: 14 }
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
          // Idle: muted slate; Highlight: cyan (same as MN)
          color: '#475569',
          highlightColor: '#22d3ee',
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: rose
        highlightColor: '#4c0519',
        highlightStroke: '#f43f5e',
        highlightLabelColor: '#fda4af',
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: orange (warm, adjacent to rose)
        highlightColor: '#431407',
        highlightStroke: '#fb923c',
        highlightLabelColor: '#fdba74',
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
        // Idle: unified dark slate
        color: '#1e293b',
        stroke: '#475569',
        opacity: 0.85,
        // Highlight: amber/yellow
        highlightColor: '#451a03',
        highlightStroke: '#facc15',
        highlightLabelColor: '#fef08a',
        doubleSide: true
      },
      point: null, edges: null, circle: null, surface: null, highlights: null,
      camera: { position: { x: -2, y: 6, z: 7 }, target: { x: 1, y: 1, z: 1.5 }, duration: 800 },
      verified: true, verifyNote: null
    }
  },
];

module.exports = SCENE_SCRIPT;