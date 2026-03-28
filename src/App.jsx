import { useState, useEffect, useRef, useCallback } from "react";
import './storage.js';  // Initialize window.storage

const PHASES = [
  {
    id: "p1", name: "SHIP & SEED", dates: "APR–MAY 2026",
    tasks: [
      { id: "t1", text: "Finish Christianmegle + buy domain", tag: "BUILD" },
      { id: "t2", text: "First guerilla marketing push (actors round 1)", tag: "MARKET" },
      { id: "t3", text: "Sigil research deep dive + draw examples", tag: "WRITE" },
      { id: "t4", text: "Buy guitar accessories + install Ableton", tag: "LEARN" },
      { id: "t5", text: "LED mask routine + book Sculptra & Botox", tag: "BODY" },
      { id: "t6", text: "Start gym consistency + cupping", tag: "BODY" },
    ],
  },
  {
    id: "p2", name: "VOLUME & VELOCITY", dates: "JUN–JUL 2026",
    tasks: [
      { id: "t7", text: "Publish sigil Substack essay + launch Fiverr", tag: "WRITE" },
      { id: "t8", text: "Vibecode weird website #2 (Coco / personal)", tag: "BUILD" },
      { id: "t9", text: "Christianmegle guerilla rounds 2 + 3", tag: "MARKET" },
      { id: "t10", text: "Start motherboard drawing series (1/week)", tag: "BUILD" },
      { id: "t11", text: "Begin TikTok divine message series (10-15)", tag: "MARKET" },
      { id: "t12", text: "Write Quentin part 2 (love letter to Reina)", tag: "WRITE" },
    ],
  },
  {
    id: "p3", name: "DEEPEN & DOCUMENT", dates: "AUG–SEP 2026",
    tasks: [
      { id: "t13", text: "Write the whitepaper / find subversive voice", tag: "WRITE" },
      { id: "t14", text: "Motherboards: ASCII poetry + still life + 3D", tag: "BUILD" },
      { id: "t15", text: "Ableton basics + first recordings", tag: "LEARN" },
      { id: "t16", text: "Hire photographer + take photos", tag: "LIFE" },
      { id: "t17", text: "Start WMAF artbook slow-build", tag: "WRITE" },
      { id: "t18", text: "TikTok series: 30-40 posted, analyze data", tag: "MARKET" },
    ],
  },
  {
    id: "p4", name: "PORTFOLIO & APPLICATION", dates: "OCT–NOV 2026",
    tasks: [
      { id: "t19", text: "SUBMIT BROWN MFA APPLICATION", tag: "LIFE" },
      { id: "t20", text: "Finalize writing sample + artist statement", tag: "WRITE" },
      { id: "t21", text: "Research astrology degree financing", tag: "LIFE" },
      { id: "t22", text: "Gallery: push for asst director / co-curate", tag: "LIFE" },
      { id: "t23", text: "Vibecode weird website #3", tag: "BUILD" },
      { id: "t24", text: "Kundalini yoga deep dive begins", tag: "LEARN" },
    ],
  },
  {
    id: "p5", name: "EXPAND & PRE-PRODUCE", dates: "DEC 2026–FEB 2027",
    tasks: [
      { id: "t25", text: "Relearn trig → start calculus", tag: "LEARN" },
      { id: "t26", text: "Film short skits (just you)", tag: "BUILD" },
      { id: "t27", text: "Get a review/essay published somewhere real", tag: "WRITE" },
      { id: "t28", text: "Web series pre-production (script/cast/budget)", tag: "BUILD" },
      { id: "t29", text: "Finish TikTok 55 + write up data analysis", tag: "MARKET" },
      { id: "t30", text: "Sustained sigil practice: 1/week minimum", tag: "LIFE" },
    ],
  },
  {
    id: "p6", name: "SHOOT", dates: "MAR 2027",
    tasks: [
      { id: "t31", text: "Shoot web series over spring break", tag: "BUILD" },
      { id: "t32", text: "Fundraising & budgeting complete", tag: "LIFE" },
      { id: "t33", text: "Write and write and write and write", tag: "WRITE" },
    ],
  },
];

const TASK_HYPE = {
  t1: [
    "the domain is the flag in the ground. plant it.",
    "every weird empire started with a weird URL",
    "ship ugly, iterate pretty. just get it live.",
    "this is your first gallery opening — it's just online",
  ],
  t2: [
    "guerilla marketing is just performance art with a business plan",
    "the actors don't need to be good. the bit needs to be committed.",
    "document EVERYTHING. the behind-the-scenes IS the content.",
    "you're not promoting a site, you're creating a cultural moment",
  ],
  t3: [
    "sigils are literally about manifesting through art. you're already doing it.",
    "the research IS the essay IS the marketing. one action, three outputs.",
    "draw one today. just one. see what happens.",
    "this is where mysticism meets graphic design and you live there",
  ],
  t4: [
    "you don't need to be good yet. you need the tools in your hands.",
    "ableton is a sketchbook. open it like one.",
    "sound design is just visual art for your ears",
    "buy the cable. plug it in. the rest follows.",
  ],
  t5: [
    "investing in yourself is not vanity, it's infrastructure",
    "the glow-up is part of the art project",
    "this is maintenance, not indulgence. do it.",
    "LED mask = daily ritual = discipline = everything else gets easier",
  ],
  t6: [
    "the gym is where your body learns discipline so your art can be chaotic",
    "consistency doesn't mean perfection. it means showing up.",
    "skinty/gymthicc era starts with one session",
    "the fit pics will thank you later",
  ],
  t7: [
    "the essay IS the marketing campaign. you already know this.",
    "publish it even if it's not perfect. fiverr link at the bottom. done.",
    "your first paid sigil is going to feel unreal",
    "writer → practitioner → entrepreneur in one post",
  ],
  t8: [
    "every weird website is a portal and a portfolio piece",
    "coco deserves a fan page and you deserve to build it",
    "same energy, different URL. the vibe is the brand.",
    "this is you learning UI by making things only you would make",
  ],
  t9: [
    "round 2 is where you learn what actually worked",
    "iterate iterate iterate. the algorithm is watching.",
    "you've done this before. now do it better and weirder.",
    "the repetition is the strategy. three rounds, three data points.",
  ],
  t10: [
    "a motherboard is already a poem. you're just making that visible.",
    "one per week. the discipline IS the art.",
    "blueprint style first — constraint breeds creativity",
    "this series is going to look insane by week 12",
  ],
  t11: [
    "55 is the number. start with 1. the data will teach you.",
    "divine messages are just poetry in algorithm-friendly packaging",
    "batch film. don't think. let them be weird.",
    "you're building a dataset AND a following simultaneously",
  ],
  t12: [
    "the love letter is the bravest form. write it.",
    "quentin pt 2 is MFA portfolio material and you know it",
    "this one matters to you. that's why it'll be good.",
    "vulnerability on the page is just courage in written form",
  ],
  t13: [
    "you don't need to invent a writing style. you need to commit to the one you already have.",
    "read 3 things. subvert all of them. that's the method.",
    "the whitepaper is just your brain dump with structure",
    "your tone is already interesting. the whitepaper proves it.",
  ],
  t14: [
    "ASCII poetry on a motherboard. nobody else is doing this.",
    "still life → 3D → who knows. let the medium evolve.",
    "the series is the portfolio. each one teaches you something new.",
    "you're making art about the thing that runs the world. that's not nothing.",
  ],
  t15: [
    "your first recording will be terrible and sacred",
    "sound design is just another texture in your practice",
    "ableton doesn't bite. open it. press buttons.",
    "bad recordings are still recordings. good ones come from bad ones.",
  ],
  t16: [
    "hiring a photographer is hiring a teacher",
    "these photos are going to anchor everything — the artbook, the socials, the MFA app",
    "get in front of the camera. learn to be the subject.",
    "confidence is just repetition with a good lens",
  ],
  t17: [
    "the artbook is everything at once — poems, essays, images, vibes",
    "slow build means it's always growing. just add to it.",
    "dream bf poem from age 4. that alone is worth the whole book.",
    "this is the container for everything that doesn't fit anywhere else",
  ],
  t18: [
    "30-40 posted. you have DATA now. what does it say?",
    "the analysis is content too. write about what you learned.",
    "the algorithm taught you something. listen.",
    "divine messages with data analytics. you're a chaos researcher.",
  ],
  t19: [
    "this is the anchor. everything feeds into this moment.",
    "you've been building the portfolio all year. now you name it.",
    "brown wants someone who makes work. you make work.",
    "submit it. whatever happens, the work exists.",
  ],
  t20: [
    "you have SO much to choose from. that's the whole point of this year.",
    "the artist statement is just: here's what i've been doing and why",
    "pull from quentin, the whitepaper, the sigil essay. you're abundant.",
    "your writing sample is already written. you just haven't picked it yet.",
  ],
  t21: [
    "the astrology degree is the long game. find the money.",
    "scholarships exist for weird interdisciplinary people. you are one.",
    "parallel tracks keep you resilient. this is the backup that's also a dream.",
    "research is just asking questions until someone says yes",
  ],
  t22: [
    "you already belong in that gallery. now make them see it.",
    "co-curating is directing. you're learning to direct.",
    "the gallery is a stage. you're learning to use it.",
    "ask for it. the worst they say is not yet.",
  ],
  t23: [
    "website #3 and you're not even thinking about it anymore, you're just building",
    "by now the vibecode is second nature",
    "three weird sites is a portfolio. four is a practice.",
    "the UI skills are compounding. feel that?",
  ],
  t24: [
    "kundalini is the operating system upgrade for everything else",
    "the teaching license is leverage — income + credibility + practice",
    "fascia, meridians, acupressure — you're building a body of knowledge about bodies",
    "this feeds the yoga teaching, the wellness practice, and the art",
  ],
  t25: [
    "relearning math is relearning how to think in structure",
    "trig is just circles. calculus is just change. you're good at both.",
    "this is the quiet flex. nobody expects the artist who does calculus.",
    "the motherboard drawings will get better when you understand the math",
  ],
  t26: [
    "just you. no crew. no excuses. press record.",
    "short skits are sketch comedy for people with taste",
    "the constraint (just you) is the creative engine",
    "these are audition tapes for the reality show era",
  ],
  t27: [
    "pitch to places you would actually read. that's the only rule.",
    "an essay published somewhere real changes how people see you",
    "you've been writing all year. now send it somewhere.",
    "the worst thing that happens is they say no and you send it somewhere else",
  ],
  t28: [
    "pre-production is where amateurs become directors",
    "script, cast, locations, budget. in that order.",
    "spring break shoot means january prep. you're right on time.",
    "the web series is the capstone. give it the planning it deserves.",
  ],
  t29: [
    "55 tiktoks. the dataset is complete. now tell the story of the data.",
    "the writeup is an essay, a portfolio piece, and a flex",
    "divine messages + data analysis = your whole aesthetic in one project",
    "this started as content. it became research. that's the move.",
  ],
  t30: [
    "1 per week. that's it. the ritual is the art.",
    "by now sigils should feel like breathing",
    "sustained practice is what separates hobbyists from practitioners",
    "every sigil is a spell and a drawing and a meditation",
  ],
  t31: [
    "cameras rolling. this is what the whole year built toward.",
    "you prepped for this. trust the prep.",
    "spring break shoot = concentrated creation energy. channel it.",
    "submit to venues. find premieres. this isn't a hobby, it's a career move.",
  ],
  t32: [
    "the budget is the scaffolding. without it the art can't stand.",
    "fundraising is just storytelling with a dollar amount attached",
    "grants, crowdfunding, favors — use all three",
    "the money is a solvable problem. solve it.",
  ],
  t33: [
    "inner carrie bradshaw: fully activated",
    "the writing is the through-line. everything else is material.",
    "write about what you made. write about what you failed. write about what's next.",
    "you said you'd do this. you're doing it. keep going.",
  ],
};

const PHASE_HYPE = {
  p1: ["the hardest part is starting. you're starting.", "plant every seed now. water them later.", "this phase is about momentum, not perfection."],
  p2: ["volume over perfection. speed over polish. go.", "this is the phase where you stop thinking and start shipping.", "velocity compounds. every piece you make teaches the next."],
  p3: ["you have work now. time to understand what it means.", "the documentation is the art. write about everything.", "depth comes from looking at what you've already made."],
  p4: ["everything converges here. you've been building this portfolio all year.", "the application is a formality. the work is the argument.", "you are ready. the work proves it."],
  p5: ["MFA app is done. breathe. now go bigger.", "this is expansion energy. try things you're not qualified for.", "the work doesn't stop because the application is in."],
  p6: ["this is it. cameras rolling. everything you built leads here.", "shoot it. submit it. show it. that's the sequence.", "march 2027: you are a person who makes things. proof enclosed."],
};

const DONE_MESSAGES = [
  "done. that's power.", "checked off. never going back.",
  "you did that. remember this feeling.", "one less thing between you and the MFA.",
  "completed. the work is working.", "✓ — feels good doesn't it",
  "shipped. next.", "that's one more thing most people never finish.",
];

function getHype(taskId, isDone) {
  if (isDone) return DONE_MESSAGES[Math.floor(Math.random() * DONE_MESSAGES.length)];
  const pool = TASK_HYPE[taskId];
  if (!pool) return "you're building something nobody else could build.";
  return pool[Math.floor(Math.random() * pool.length)];
}

function getPhaseHype(phaseId) {
  const pool = PHASE_HYPE[phaseId];
  return pool ? pool[Math.floor(Math.random() * pool.length)] : "";
}

const ALL_TASKS = PHASES.flatMap(p => p.tasks.map(t => ({ ...t, phaseId: p.id, phaseName: p.name })));
const TAG_COLORS = { BUILD: "#ff2200", WRITE: "#ccff00", MARKET: "#ff00aa", LEARN: "#00ffcc", BODY: "#ff8800", LIFE: "#8888ff" };
const SK = "punk-v5-state";
const genId = () => Math.random().toString(36).slice(2, 10);

/* ═══════════════════════════════════════════════════════════════
   HOVER TOOLTIP
   ═══════════════════════════════════════════════════════════════ */
function HoverHype({ message, visible, x, y }) {
  if (!visible || !message) return null;
  return (
    <div style={{
      position: "fixed", left: x, top: y - 8, transform: "translate(-50%, -100%)",
      background: "#0a0a0a", border: "1px solid #ff2200", padding: "8px 14px",
      fontFamily: "'Courier New',monospace", fontSize: 11, color: "#ff2200",
      letterSpacing: 1, lineHeight: 1.5, maxWidth: 320, zIndex: 9000,
      pointerEvents: "none", whiteSpace: "normal",
      boxShadow: "0 0 20px rgba(255,34,0,0.15), 0 4px 16px rgba(0,0,0,0.6)",
      animation: "hypeIn 0.15s ease-out",
    }}>
      <span style={{ opacity: 0.4, marginRight: 6 }}>»</span>{message}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PATCH CABLES
   ═══════════════════════════════════════════════════════════════ */
function PatchCables({ connections, positions, onDelete }) {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "visible" }}>
      {connections.map((conn, i) => {
        const f = positions[conn.from], t = positions[conn.to];
        if (!f || !t) return null;
        const x1 = f.x + (f.w||200)/2, y1 = f.y + (f.h||60)/2;
        const x2 = t.x + (t.w||200)/2, y2 = t.y + (t.h||60)/2;
        const dx = Math.abs(x2-x1)*0.35;
        const path = `M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`;
        const mx = (x1+x2)/2, my = (y1+y2)/2;
        return (
          <g key={`${conn.from}-${conn.to}-${i}`}>
            <path d={path} stroke="#ff220033" strokeWidth={3} fill="none" />
            <path d={path} stroke="#ff2200" strokeWidth={1.2} fill="none" opacity={0.8} strokeDasharray="8,5">
              <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.5s" repeatCount="indefinite" />
            </path>
            <circle cx={x1} cy={y1} r={4} fill="#ff2200" opacity={0.9} />
            <circle cx={x2} cy={y2} r={4} fill="#ff2200" opacity={0.9} />
            <g style={{ pointerEvents: "all", cursor: "pointer" }} onClick={() => onDelete(conn)}>
              <circle cx={mx} cy={my} r={9} fill="#0a0a0a" stroke="#ff220066" strokeWidth={1} />
              <text x={mx} y={my+3.5} textAnchor="middle" fill="#ff2200" fontSize={11} fontFamily="'Courier New',monospace">×</text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DRAGGABLE NODE
   ═══════════════════════════════════════════════════════════════ */
function DraggableNode({ nodeId, pos, onMove, onStartConnect, connecting, connectSrc, onRegister, children }) {
  const ref = useRef(null);
  const drag = useRef(false);
  const off = useRef({ x: 0, y: 0 });
  const isSrc = connectSrc === nodeId;

  useEffect(() => {
    if (ref.current && onRegister) {
      const r = ref.current.getBoundingClientRect();
      onRegister(nodeId, { x: pos.x, y: pos.y, w: r.width, h: r.height });
    }
  });

  const pd = (e) => {
    const t = e.target;
    if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "BUTTON" || t.tagName === "A" || t.closest?.("[data-nd]")) return;
    drag.current = true;
    off.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pm = (e) => { if (drag.current) onMove(nodeId, { x: e.clientX - off.current.x, y: e.clientY - off.current.y }); };
  const pu = () => { drag.current = false; };

  return (
    <div ref={ref} onPointerDown={pd} onPointerMove={pm} onPointerUp={pu}
      style={{
        position: "absolute", left: pos.x, top: pos.y, zIndex: 2,
        background: "#111", border: `1px solid ${isSrc ? "#ff2200" : "#222"}`,
        minWidth: 190, maxWidth: 300, cursor: "grab", userSelect: "none",
        boxShadow: isSrc ? "0 0 24px rgba(255,34,0,0.15)" : "0 2px 12px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.2s",
      }}>
      <div data-nd="1" onClick={(e) => { e.stopPropagation(); onStartConnect(nodeId); }}
        style={{
          position: "absolute", top: -7, right: -7, width: 14, height: 14,
          background: isSrc ? "#ff2200" : "#1a1a1a", border: "2px solid #ff2200",
          borderRadius: "50%", cursor: "crosshair", zIndex: 10,
        }} />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PATCH VIEW
   ═══════════════════════════════════════════════════════════════ */
function PatchView({ taskId, data, onUpdate, onClose }) {
  const [positions, setPositions] = useState({});
  const [connecting, setConnecting] = useState(null);
  const d = data || { subtasks: [], notes: [], links: [], connections: [], mainPos: { x: 30, y: 30 } };
  const taskInfo = ALL_TASKS.find(t => t.id === taskId);

  const reg = useCallback((id, rect) => {
    setPositions(p => {
      if (p[id]?.x === rect.x && p[id]?.y === rect.y && p[id]?.w === rect.w && p[id]?.h === rect.h) return p;
      return { ...p, [id]: rect };
    });
  }, []);

  const move = useCallback((id, pos) => {
    setPositions(p => ({ ...p, [id]: { ...p[id], ...pos } }));
    const u = { ...d };
    if (id === "main") u.mainPos = pos;
    else { for (const arr of ["subtasks","notes","links"]) { const item = u[arr]?.find(x => x.id === id); if (item) { item.pos = pos; break; } } }
    onUpdate(taskId, u);
  }, [d, taskId, onUpdate]);

  const startConnect = (id) => {
    if (!connecting) setConnecting(id);
    else if (connecting !== id) {
      const exists = d.connections?.some(c => (c.from===connecting&&c.to===id)||(c.from===id&&c.to===connecting));
      if (!exists) onUpdate(taskId, { ...d, connections: [...(d.connections||[]), { from: connecting, to: id }] });
      setConnecting(null);
    } else setConnecting(null);
  };

  const delConn = (c) => onUpdate(taskId, { ...d, connections: d.connections.filter(x => !(x.from===c.from&&x.to===c.to)) });
  const addSub = () => { const id = "s_"+genId(); onUpdate(taskId, { ...d, subtasks: [...(d.subtasks||[]), { id, text: "", done: false, pos: { x: 320, y: 30+(d.subtasks?.length||0)*80 } }] }); };
  const addNote = () => { const id = "n_"+genId(); onUpdate(taskId, { ...d, notes: [...(d.notes||[]), { id, text: "", pos: { x: 580, y: 30+(d.notes?.length||0)*80 } }] }); };
  const addLink = () => { const id = "l_"+genId(); onUpdate(taskId, { ...d, links: [...(d.links||[]), { id, url: "", label: "", pos: { x: 30, y: 260+(d.links?.length||0)*80 } }] }); };
  const updSub = (sid, ch) => onUpdate(taskId, { ...d, subtasks: d.subtasks.map(s => s.id===sid?{...s,...ch}:s) });
  const updNote = (nid, ch) => onUpdate(taskId, { ...d, notes: d.notes.map(n => n.id===nid?{...n,...ch}:n) });
  const updLink = (lid, ch) => onUpdate(taskId, { ...d, links: d.links.map(l => l.id===lid?{...l,...ch}:l) });
  const delNode = (nid) => onUpdate(taskId, { ...d, subtasks: d.subtasks.filter(s=>s.id!==nid), notes: d.notes.filter(n=>n.id!==nid), links: d.links.filter(l=>l.id!==nid), connections: d.connections.filter(c=>c.from!==nid&&c.to!==nid) });

  const subDone = (d.subtasks||[]).filter(s=>s.done).length;
  const subTotal = (d.subtasks||[]).length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#050505", zIndex: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 16px", background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Courier New',monospace", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #333", color: "#888", fontFamily: "'Courier New',monospace", fontSize: 11, padding: "4px 10px", cursor: "pointer", letterSpacing: 2 }}>← BACK</button>
          <span style={{ color: TAG_COLORS[taskInfo?.tag], fontSize: 9, letterSpacing: 3, border: `1px solid ${TAG_COLORS[taskInfo?.tag]}`, padding: "2px 6px" }}>{taskInfo?.tag}</span>
          <span style={{ color: "#fff", fontSize: 12, letterSpacing: 1 }}>{taskInfo?.text}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["+ SUBTASK","#ff2200",addSub],["+ NOTE","#ccff00",addNote],["+ LINK","#8888ff",addLink]].map(([l,c,fn]) => (
            <button key={l} onClick={fn} style={{ background: "none", border: `1px solid ${c}`, color: c, fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: 2, padding: "4px 8px", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {connecting && (
        <div style={{ padding: "6px 16px", background: "#ff220011", borderBottom: "1px solid #ff220033", fontFamily: "'Courier New',monospace", fontSize: 10, color: "#ff2200", letterSpacing: 3, textAlign: "center", flexShrink: 0 }}>
          ◉ PATCHING — CLICK ANOTHER NODE — ESC TO CANCEL
        </div>
      )}

      <div style={{
        flex: 1, position: "relative", overflow: "auto",
        backgroundImage: "linear-gradient(rgba(255,34,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,34,0,0.03) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} onClick={() => connecting && setConnecting(null)} onKeyDown={e => e.key==="Escape"&&setConnecting(null)} tabIndex={0}>

        <PatchCables connections={d.connections||[]} positions={positions} onDelete={delConn} />

        <DraggableNode nodeId="main" pos={d.mainPos||{x:30,y:30}} onMove={move} onStartConnect={startConnect} connecting={!!connecting} connectSrc={connecting} onRegister={reg}>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: TAG_COLORS[taskInfo?.tag], marginBottom: 4, fontFamily: "'Courier New',monospace" }}>◆ {taskInfo?.phaseName}</div>
            <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", fontFamily: "'Courier New',monospace", letterSpacing: 1, marginBottom: 8, lineHeight: 1.4 }}>{taskInfo?.text}</div>
            {subTotal > 0 && (<>
              <div style={{ fontSize: 9, color: "#666", letterSpacing: 2, marginBottom: 4, fontFamily: "'Courier New',monospace" }}>{subDone}/{subTotal} SUBTASKS</div>
              <div style={{ height: 3, background: "#1a1a1a" }}><div style={{ height: "100%", width: `${subTotal?(subDone/subTotal)*100:0}%`, background: subDone===subTotal&&subTotal>0?"#00ff00":"#ff2200", transition: "width 0.3s" }} /></div>
            </>)}
          </div>
        </DraggableNode>

        {(d.subtasks||[]).map(sub => (
          <DraggableNode key={sub.id} nodeId={sub.id} pos={sub.pos||{x:320,y:30}} onMove={move} onStartConnect={startConnect} connecting={!!connecting} connectSrc={connecting} onRegister={reg}>
            <div style={{ padding: "8px 12px", borderLeft: `3px solid ${sub.done?"#00ff00":"#ff2200"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 8, letterSpacing: 3, color: "#ff2200", fontFamily: "'Courier New',monospace" }}>SUBTASK</span>
                <div style={{ display: "flex", gap: 4 }} data-nd="1">
                  <button onClick={() => updSub(sub.id,{done:!sub.done})} style={{ background: sub.done?"#00ff00":"none", border: `1px solid ${sub.done?"#00ff00":"#444"}`, color: sub.done?"#000":"#666", width: 18, height: 18, fontSize: 10, cursor: "pointer", fontFamily: "'Courier New',monospace", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{sub.done?"✓":""}</button>
                  <button onClick={() => delNode(sub.id)} style={dBtn}>×</button>
                </div>
              </div>
              <div data-nd="1"><input type="text" value={sub.text} placeholder="what needs doing..." onChange={e => updSub(sub.id,{text:e.target.value})} style={{ ...iS, textDecoration: sub.done?"line-through":"none", color: sub.done?"#555":"#ccc" }} /></div>
            </div>
          </DraggableNode>
        ))}

        {(d.notes||[]).map(note => (
          <DraggableNode key={note.id} nodeId={note.id} pos={note.pos||{x:580,y:30}} onMove={move} onStartConnect={startConnect} connecting={!!connecting} connectSrc={connecting} onRegister={reg}>
            <div style={{ padding: "8px 12px", borderLeft: "3px solid #ccff00" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 8, letterSpacing: 3, color: "#ccff00", fontFamily: "'Courier New',monospace" }}>NOTE</span>
                <button onClick={() => delNode(note.id)} style={dBtn} data-nd="1">×</button>
              </div>
              <div data-nd="1"><textarea value={note.text} placeholder="thoughts, fragments..." onChange={e => updNote(note.id,{text:e.target.value})} rows={3} style={{ ...iS, resize: "vertical", minHeight: 50, lineHeight: 1.6 }} /></div>
            </div>
          </DraggableNode>
        ))}

        {(d.links||[]).map(link => (
          <DraggableNode key={link.id} nodeId={link.id} pos={link.pos||{x:30,y:260}} onMove={move} onStartConnect={startConnect} connecting={!!connecting} connectSrc={connecting} onRegister={reg}>
            <div style={{ padding: "8px 12px", borderLeft: "3px solid #8888ff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 8, letterSpacing: 3, color: "#8888ff", fontFamily: "'Courier New',monospace" }}>LINK</span>
                <button onClick={() => delNode(link.id)} style={dBtn} data-nd="1">×</button>
              </div>
              <div data-nd="1">
                <input type="text" value={link.label} placeholder="label" onChange={e => updLink(link.id,{label:e.target.value})} style={{ ...iS, marginBottom: 4, color: "#8888ff" }} />
                <input type="text" value={link.url} placeholder="https://..." onChange={e => updLink(link.id,{url:e.target.value})} style={{ ...iS, fontSize: 10, color: "#666" }} />
                {link.url && <a href={link.url.startsWith("http")?link.url:`https://${link.url}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 6, fontSize: 9, color: "#8888ff", fontFamily: "'Courier New',monospace", letterSpacing: 1 }} onClick={e => e.stopPropagation()}>OPEN →</a>}
              </div>
            </div>
          </DraggableNode>
        ))}

        {(d.subtasks?.length||0)+(d.notes?.length||0)+(d.links?.length||0)===0 && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Courier New',monospace", color: "#1a1a1a", fontSize: 13, letterSpacing: 3, textAlign: "center", lineHeight: 2, pointerEvents: "none", userSelect: "none" }}>
            ADD NODES WITH THE BUTTONS ABOVE<br />DRAG THEM AROUND<br />CLICK THE RED PORTS TO PATCH CABLES<br /><span style={{ fontSize: 40, lineHeight: 2 }}>◉</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [completed, setCompleted] = useState({});
  const [journal, setJournal] = useState([]);
  const [patchData, setPatchData] = useState({});
  const [newEntry, setNewEntry] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activePhase, setActivePhase] = useState(null);
  const [showJournal, setShowJournal] = useState(false);
  const [activePatch, setActivePatch] = useState(null);
  const [glitch, setGlitch] = useState(false);
  const [hoverMsg, setHoverMsg] = useState({ visible: false, message: "", x: 0, y: 0 });
  const [phaseHoverMsg, setPhaseHoverMsg] = useState({ visible: false, message: "", x: 0, y: 0 });
  const hoverTimer = useRef(null);
  const phaseHoverTimer = useRef(null);
  const jRef = useRef(null);
  const saveT = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(SK);
        if (r?.value) { const p = JSON.parse(r.value); setCompleted(p.completed||{}); setJournal(p.journal||[]); setPatchData(p.patchData||{}); }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      window.storage.set(SK, JSON.stringify({ completed, journal, patchData })).catch(() => {});
    }, 500);
  }, [completed, journal, patchData, loaded]);

  const toggle = (id) => {
    setCompleted(p => {
      const n = { ...p };
      if (n[id]) delete n[id];
      else { n[id] = Date.now(); setGlitch(true); setTimeout(() => setGlitch(false), 300); }
      return n;
    });
  };

  const updPatch = useCallback((tid, data) => setPatchData(p => ({ ...p, [tid]: data })), []);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    setJournal(p => [...p, { id: Date.now(), text: newEntry.trim(), date: new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}), time: new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}) }]);
    setNewEntry("");
    setTimeout(() => jRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const onTaskEnter = (taskId, isDone, e) => {
    clearTimeout(hoverTimer.current);
    const msg = getHype(taskId, isDone);
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverMsg({ visible: true, message: msg, x: rect.left + rect.width / 2, y: rect.top });
  };
  const onTaskLeave = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoverMsg(p => ({ ...p, visible: false })), 100);
  };
  const onPhaseEnter = (phaseId, e) => {
    clearTimeout(phaseHoverTimer.current);
    const msg = getPhaseHype(phaseId);
    const rect = e.currentTarget.getBoundingClientRect();
    setPhaseHoverMsg({ visible: true, message: msg, x: rect.left + rect.width / 2, y: rect.top });
  };
  const onPhaseLeave = () => {
    clearTimeout(phaseHoverTimer.current);
    phaseHoverTimer.current = setTimeout(() => setPhaseHoverMsg(p => ({ ...p, visible: false })), 100);
  };

  const totalT = PHASES.reduce((a,p) => a+p.tasks.length, 0);
  const totalD = Object.keys(completed).length;
  const pct = totalT ? Math.round((totalD/totalT)*100) : 0;
  const dLeft = Math.max(0, Math.floor((new Date("2026-12-01")-new Date())/86400000));

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "'Courier New',monospace", color: "#ff2200", fontSize: 14, letterSpacing: 6 }}>LOADING...</span>
    </div>
  );

  if (activePatch) return <PatchView taskId={activePatch} data={patchData[activePatch]} onUpdate={updPatch} onClose={() => setActivePatch(null)} />;

  return (
    <div style={{ fontFamily: "'Courier New',monospace", background: "#080808", color: "#ddd", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {glitch && <div style={{ position: "fixed", inset: 0, background: "rgba(255,34,0,0.08)", zIndex: 9999, pointerEvents: "none" }} />}
      <HoverHype {...hoverMsg} />
      <HoverHype {...phaseHoverMsg} />

      <div style={{ borderBottom: "1px solid #222", padding: "16px 20px", position: "sticky", top: 0, zIndex: 100, background: "#080808" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 18, fontWeight: "bold", letterSpacing: 4, color: "#fff" }}><span style={{ color: "#ff2200" }}>//</span> THE WORK</div>
          <button onClick={() => setShowJournal(!showJournal)} style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: 3, padding: "6px 14px", border: "1px solid #ff2200", cursor: "pointer", background: showJournal?"#ff2200":"transparent", color: showJournal?"#000":"#ff2200" }}>{showJournal?"× CLOSE":"JOURNAL"}</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 9, letterSpacing: 3, color: "#666" }}>MFA DEADLINE</span>
            <span style={{ fontSize: 22, fontWeight: "bold", color: "#ff2200" }}>{dLeft}d</span>
          </div>
          <div style={{ flex: 1, minWidth: 180, maxWidth: 400 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#888", marginBottom: 4, textAlign: "right" }}>{totalD}/{totalT} — {pct}%</div>
            <div style={{ height: 6, background: "#1a1a1a", border: "1px solid #222" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#ff2200", transition: "width 0.4s", boxShadow: "0 0 10px rgba(255,34,0,0.5)" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 80 }}>
        {showJournal ? (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: 20, display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, borderBottom: "1px solid #222", paddingBottom: 12 }}>
              <h2 style={{ fontSize: 15, letterSpacing: 5, fontWeight: "bold", color: "#ff2200" }}>TRANSMISSION LOG</h2>
              <span style={{ fontSize: 11, color: "#555", letterSpacing: 2 }}>{journal.length}</span>
            </div>
            <div style={{ flex: 1, overflow: "auto", marginBottom: 16 }}>
              {journal.length===0 && <div style={{ color: "#333", fontSize: 14, fontStyle: "italic", padding: "40px 0", lineHeight: 2 }}>Nothing here yet. Write something.<br /><span style={{ fontSize: 11 }}>"write and write and write and write"</span></div>}
              {journal.map(e => (
                <div key={e.id} style={{ borderLeft: "2px solid #ff2200", padding: "10px 16px", marginBottom: 8, background: "#0c0c0c" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, letterSpacing: 2, color: "#666" }}>{e.date}</span>
                    <span style={{ fontSize: 10, color: "#444" }}>{e.time}</span>
                    <button onClick={() => setJournal(p => p.filter(x=>x.id!==e.id))} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, fontFamily: "'Courier New',monospace", marginLeft: "auto" }}>×</button>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "#ccc", whiteSpace: "pre-wrap" }}>{e.text}</div>
                </div>
              ))}
              <div ref={jRef} />
            </div>
            <div style={{ borderTop: "1px solid #222", paddingTop: 12, display: "flex", gap: 8 }}>
              <textarea value={newEntry} onChange={e => setNewEntry(e.target.value)} onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); addEntry(); } }} placeholder="what happened today?" rows={3} style={{ flex: 1, background: "#0a0a0a", border: "1px solid #222", color: "#ddd", fontFamily: "'Courier New',monospace", fontSize: 13, padding: "10px 12px", resize: "none", lineHeight: 1.6, outline: "none" }} />
              <button onClick={addEntry} style={{ background: "#ff2200", border: "none", color: "#000", fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: 3, fontWeight: "bold", padding: "10px 16px", cursor: "pointer", alignSelf: "flex-end", opacity: newEntry.trim()?1:0.3 }}>LOG IT</button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
            {PHASES.map(phase => {
              const done = phase.tasks.filter(t=>completed[t.id]).length;
              const total = phase.tasks.length;
              const pp = Math.round((done/total)*100);
              const isOpen = activePhase===phase.id;
              const comp = done===total;
              return (
                <div key={phase.id} style={{ marginBottom: 2 }}>
                  <button onClick={() => setActivePhase(isOpen?null:phase.id)} onMouseEnter={e => onPhaseEnter(phase.id,e)} onMouseLeave={onPhaseLeave}
                    style={{ display: "block", width: "100%", textAlign: "left", background: "#0e0e0e", border: "none", borderBottom: "1px solid #1a1a1a", padding: "14px 16px", cursor: "pointer", fontFamily: "'Courier New',monospace", color: "#ddd", borderLeft: comp?"3px solid #00ff00":done>0?"3px solid #ff2200":"3px solid #333" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, letterSpacing: 3, color: "#666" }}>{phase.dates}</span>
                      <span style={{ fontSize: 11, color: "#888" }}>{done}/{total}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: "bold", letterSpacing: 3, marginBottom: 8, color: "#fff" }}>
                      {comp && <span style={{ color: "#00ff00" }}>✓ </span>}{phase.name}
                    </div>
                    <div style={{ height: 3, background: "#1a1a1a" }}><div style={{ height: "100%", width: `${pp}%`, background: comp?"#00ff00":"#ff2200", transition: "width 0.4s" }} /></div>
                  </button>
                  {isOpen && (
                    <div style={{ borderLeft: "1px solid #222", marginLeft: 12 }}>
                      {phase.tasks.map(task => {
                        const isDone = !!completed[task.id];
                        const pd = patchData[task.id];
                        const hasPatch = pd && ((pd.subtasks?.length||0)+(pd.notes?.length||0)+(pd.links?.length||0)>0);
                        const subCount = pd?.subtasks?.length||0;
                        const subDone = pd?.subtasks?.filter(s=>s.done).length||0;
                        return (
                          <div key={task.id} onMouseEnter={e => onTaskEnter(task.id,isDone,e)} onMouseLeave={onTaskLeave}
                            style={{ display: "flex", alignItems: "flex-start", borderBottom: "1px solid #141414", background: isDone?"#0a0a0a":"#111", transition: "background 0.15s" }}>
                            <button onClick={() => toggle(task.id)} style={{ background: "none", border: "none", padding: "12px 10px 12px 16px", cursor: "pointer" }}>
                              <div style={{ width: 18, height: 18, border: `2px solid ${isDone?"#ff2200":"#444"}`, background: isDone?"#ff2200":"transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {isDone && <span style={{ color: "#000", fontSize: 13, fontWeight: "bold" }}>×</span>}
                              </div>
                            </button>
                            <button onClick={() => setActivePatch(task.id)} style={{ flex: 1, background: "none", border: "none", textAlign: "left", padding: "10px 16px 10px 4px", cursor: "pointer", fontFamily: "'Courier New',monospace" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 9, letterSpacing: 3, fontWeight: "bold", color: TAG_COLORS[task.tag], border: `1px solid ${TAG_COLORS[task.tag]}`, padding: "1px 5px" }}>{task.tag}</span>
                                {hasPatch && <span style={{ fontSize: 8, color: "#ff2200", letterSpacing: 2 }}>◆ {subCount>0?`${subDone}/${subCount}`:"PATCHED"}</span>}
                              </div>
                              <span style={{ fontSize: 13, lineHeight: 1.5, color: isDone?"#555":"#ddd", textDecoration: isDone?"line-through":"none" }}>{task.text}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#080808", borderTop: "1px solid #1a1a1a", padding: "8px 20px", zIndex: 100, overflow: "hidden" }}>
        <span style={{ fontSize: 9, letterSpacing: 4, color: "#333", whiteSpace: "nowrap", display: "block", animation: "marquee 20s linear infinite" }}>
          EVERYTHING IS PORTFOLIO MATERIAL — BUILD THE WORK — MARKET THE WORK — WRITE ABOUT ALL OF IT
        </span>
      </div>
    </div>
  );
}

const iS = { width: "100%", background: "none", border: "none", borderBottom: "1px solid #222", color: "#ccc", fontFamily: "'Courier New',monospace", fontSize: 13, padding: "4px 0", outline: "none", lineHeight: 1.5 };
const dBtn = { background: "none", border: "1px solid #333", color: "#555", width: 18, height: 18, fontSize: 12, cursor: "pointer", fontFamily: "'Courier New',monospace", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 };
