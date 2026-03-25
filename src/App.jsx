import { useState, useEffect, useRef, useCallback, useContext, createContext } from "react";
const LangContext = createContext("en");
function useLang() { const lang = useContext(LangContext); return T[lang] || T["en"]; }
import { createClient } from "@supabase/supabase-js";

// ─── Supabase ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://kwkqmwhpwhtowhoxtfnp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3a3Ftd2hwd2h0b3dob3h0Zm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4OTU5MjQsImV4cCI6MjA4NzQ3MTkyNH0.e5n25Vxdj4PSmRQuBfKRpzhiIFj_F9cAzPcwkUx7vFY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Constants ────────────────────────────────────────────────────────────────
const SEED_USERS = [
  { id: "u1", name: "Shayla", pin: "1111", role: "para",  assignedStudents: ["s1","s2","s3","s4","s5","s6"] },
  { id: "u2", name: "Luna",   pin: "2222", role: "para",  assignedStudents: ["s1","s2","s3","s4","s5","s6"] },
  { id: "u3", name: "Nicole", pin: "3333", role: "admin", assignedStudents: [] },
  { id: "u4", name: "Suki",   pin: "4444", role: "admin", assignedStudents: [] },
];

const BEHAVIOR_COLORS = [
  { bg:"#FFF0F0", border:"#FFB3B3", text:"#C0392B", accent:"#FF6B6B" },
  { bg:"#FFF4E6", border:"#FFCC80", text:"#B7560A", accent:"#FF9F43" },
  { bg:"#FFFDE6", border:"#FFE082", text:"#9A7B00", accent:"#FDCB6E" },
  { bg:"#F0FFF4", border:"#A8E6B8", text:"#1A7A3A", accent:"#26de81" },
  { bg:"#E8F8FF", border:"#90D5F5", text:"#0B6EA3", accent:"#45B7D1" },
  { bg:"#EEF3FF", border:"#A5BFFF", text:"#2847BF", accent:"#5B8EFF" },
  { bg:"#F5F0FF", border:"#C4ADFF", text:"#5A3DB8", accent:"#A29BFE" },
  { bg:"#FFF0F8", border:"#FFB3D9", text:"#B02070", accent:"#FD79A8" },
];

const SEED_STUDENTS = [
  {
    id:"s1", name:"Shadi", grade:10, color:"#FF6B6B", avatar:"🦊",
    behaviors:[
      {id:"b1",name:"Elopement in building",types:["frequency"]},
      {id:"b2",name:"Elopement out of building",types:["duration","abc"]},
      {id:"b3",name:"Stealing",types:["frequency","duration","abc"]},
      {id:"b4",name:"Disrobing",types:["abc"]},
    ],
    goals:[{id:"g1",name:"2 non-preferred to 1 preferred task",targetPct:80}],
  },
  {
    id:"s2", name:"Gabe", grade:9, color:"#FF9F43", avatar:"🐯",
    behaviors:[
      {id:"b5",name:"Verbal bite threat",types:["abc"]},
      {id:"b6",name:"Physical biting",types:["duration","frequency"]},
    ],
    goals:[{id:"g2",name:"Turn day around",targetPct:80}],
  },
  {
    id:"s3", name:"Elijah", grade:9, color:"#26de81", avatar:"🐸",
    behaviors:[
      {id:"b7",name:"Talking back / cussing",types:["frequency"]},
      {id:"b8",name:"Verbal threat",types:["frequency","abc"]},
    ],
    goals:[],
  },
  {
    id:"s4", name:"Yahir", grade:11, color:"#A29BFE", avatar:"🦋",
    behaviors:[
      {id:"b9",name:"Eating non-edibles",types:["abc","frequency"]},
      {id:"b10",name:"Disrobing",types:["abc","frequency"]},
    ],
    goals:[],
  },
  {
    id:"s5", name:"Alex", grade:11, color:"#45B7D1", avatar:"🦁",
    behaviors:[
      {id:"b11",name:"Non-compliance",types:["frequency"]},
    ],
    goals:[],
  },
  {
    id:"s6", name:"Serenity", grade:12, color:"#FD79A8", avatar:"🦋",
    behaviors:[
      {id:"b12",name:"Sleeping",types:["duration"]},
      {id:"b13",name:"Working",types:["duration"]},
      {id:"b14",name:"Non-compliance",types:["frequency"]},
    ],
    goals:[],
  },
];

const AVATARS = ["🦊","🐯","🐸","🦋","🐨","🦁","🐼","🐙","🦄","🐬","🐧","🦀","🦜","🐻","🐺","🦔"];
const COLORS  = ["#FF6B6B","#FF9F43","#26de81","#A29BFE","#45B7D1","#FD79A8","#FDCB6E","#6C5CE7","#00CEC9","#E17055","#74B9FF","#55EFC4"];
const ANTECEDENTS = ["Demand presented","Transition","Peer interaction","Access denied","Alone/ignored","Preferred removed","Sensory trigger","Unknown"];
const BEHAVIOR_OPTIONS = ["Crying","Hitting","Kicking","Biting","Throwing","Screaming","Running away","Dropping to floor","Other"];
const CONSEQUENCES = ["Escape/avoid task","Received attention","Received item/activity","Sensory stimulation","Unknown","Redirected","Task completed"];
const TRACK_TYPES = ["frequency","duration","latency","abc","trials","intensity"];
const RESPONSE_STRATEGIES_EN = [
  "Ignore/planned ignoring","Redirect to preferred activity","Offer choices","Use visual supports",
  "Provide sensory break","Increase supervision","Remove audience","Offer preferred item contingently",
  "Use calm/neutral tone","Block and redirect","Safety intervention","Crisis protocol",
];
const RESPONSE_STRATEGIES_ES = [
  "Ignorar/ignorar planificado","Redirigir a actividad preferida","Ofrecer opciones","Usar apoyos visuales",
  "Proporcionar descanso sensorial","Aumentar supervisión","Eliminar audiencia","Ofrecer objeto preferido condicionalmente",
  "Usar tono calmado/neutral","Bloquear y redirigir","Intervención de seguridad","Protocolo de crisis",
];
const STRATEGY_MAP_ES = Object.fromEntries(RESPONSE_STRATEGIES_EN.map((e,i)=>[e,RESPONSE_STRATEGIES_ES[i]]));
const STRATEGY_MAP_EN = Object.fromEntries(RESPONSE_STRATEGIES_ES.map((e,i)=>[e,RESPONSE_STRATEGIES_EN[i]]));
function getStrategies(lang){ return lang==="es" ? RESPONSE_STRATEGIES_ES : RESPONSE_STRATEGIES_EN; }
function translateStrategy(s, lang){
  if(lang==="es") return STRATEGY_MAP_ES[s]||s;
  return STRATEGY_MAP_EN[s]||s;
}
const USER_COLORS = [
  {bg:"#FFF0F0",text:"#C0392B"},{bg:"#FFF4E6",text:"#B7560A"},{bg:"#F0FFF4",text:"#1A7A3A"},
  {bg:"#EEF3FF",text:"#2847BF"},{bg:"#F5F0FF",text:"#5A3DB8"},{bg:"#FFF0F8",text:"#B02070"},
  {bg:"#FFFDE6",text:"#9A7B00"},{bg:"#E8F8FF",text:"#0B6EA3"},
];

// ─── Storage ──────────────────────────────────────────────────────────────────
async function loadData(key, fallback) {
  try {
    const { data, error } = await supabase.from("bt_data").select("value").eq("key", key).single();
    if (error || !data) return fallback;
    return JSON.parse(data.value);
  } catch { return fallback; }
}
async function saveData(key, value) {
  try {
    await supabase.from("bt_data").upsert(
      { key, value: JSON.stringify(value), updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  } catch {}
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function fmt(ms) {
  const s=Math.floor(ms/1000), m=Math.floor(s/60), h=Math.floor(m/60);
  if(h>0) return `${h}h ${m%60}m ${s%60}s`;
  if(m>0) return `${m}m ${s%60}s`;
  return `${s}s`;
}
function today() { return new Date().toLocaleDateString(); }
function nowStr() { return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); }
function ts() { return Date.now(); }
function uid() { return `${ts()}-${Math.random().toString(36).slice(2)}`; }
function bColor(i) { return BEHAVIOR_COLORS[i % BEHAVIOR_COLORS.length]; }
function userColor(name) { return USER_COLORS[name.charCodeAt(0) % USER_COLORS.length]; }
function initials(name) { return name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2); }
function sessionKey(studentId, userId) { return `${studentId}-${today()}-${userId}`; }

// ─── Intensity helpers ────────────────────────────────────────────────────────
function intensityLevelColor(index, total) {
  if (total <= 1) return "#26de81";
  const ratio = index / (total - 1);
  const hue = Math.round(120 * (1 - ratio));
  const sat = 65, lit = 42;
  return `hsl(${hue},${sat}%,${lit}%)`;
}
function intensityLevelBg(index, total) {
  if (total <= 1) return "#E8FFF4";
  const ratio = index / (total - 1);
  const hue = Math.round(120 * (1 - ratio));
  return `hsl(${hue},70%,93%)`;
}
function defaultIntensityLevels(n) {
  const defaults = ["Minimal","Mild","Moderate","Elevated","Severe","Extreme","Crisis"];
  return Array.from({length:n},(_,i)=>({level:i+1,label:defaults[i]||`Level ${i+1}`,description:""}));
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  :root {
    --bg:#F0F4FF; --surface:#FFFFFF; --surface2:#F8FAFF; --border:#E2E8F8;
    --text:#1A1F36; --muted:#6B7A99; --accent:#5B8EFF;
    --green:#26de81; --orange:#FF9F43; --red:#FF6B6B; --purple:#A29BFE; --yellow:#FDCB6E;
    --radius:14px; --radius-sm:10px;
    --shadow:0 2px 10px rgba(91,142,255,.10);
    --bottom-nav-h:68px;
  }
  html, body { -webkit-text-size-adjust:100%; width:100%; overflow-x:hidden; margin:0; padding:0; }
  body { background:var(--bg); color:var(--text); font-family:'Nunito',sans-serif; min-height:100vh; -webkit-tap-highlight-color:transparent; overscroll-behavior:none; width:100vw; max-width:100%; overflow-x:hidden; }
  .app { display:flex; flex-direction:column; min-height:100vh; padding-bottom:var(--bottom-nav-h); width:100%; overflow-x:hidden; }

  .login-wrap { display:block; min-height:100vh; padding:0; background:linear-gradient(135deg,#e0e8ff,#f8e8ff 50%,#e8fff4); position:relative; }
  .login-card { background:var(--surface); border-radius:0; padding:48px 28px; width:100vw; min-height:100vh; box-shadow:none; }
  .login-logo { font-size:52px; margin-bottom:10px; }
  .login-title { font-size:30px; font-weight:900; color:var(--accent); margin-bottom:4px; }
  .login-sub { color:var(--muted); font-size:14px; margin-bottom:26px; font-weight:600; }
  .user-btn { width:100%; background:var(--surface2); border:2px solid var(--border); border-radius:12px; padding:16px 18px; margin-bottom:11px; cursor:pointer; display:flex; align-items:center; gap:10px; color:var(--text); font-family:'Nunito',sans-serif; font-size:15px; font-weight:700; transition:all .15s; }
  .user-btn.selected { border-color:var(--accent); background:#EEF3FF; }
  .user-role { font-size:10px; color:var(--muted); background:var(--border); padding:2px 7px; border-radius:20px; margin-left:auto; flex-shrink:0; }
  .pin-wrap { margin-top:14px; }
  .pin-label { font-size:13px; color:var(--muted); margin-bottom:7px; font-weight:700; }
  .pin-input { width:100%; background:var(--surface2); border:2px solid var(--border); border-radius:var(--radius-sm); padding:14px; color:var(--text); font-family:'DM Mono',monospace; font-size:22px; letter-spacing:10px; text-align:center; outline:none; transition:border-color .2s; }
  .pin-input:focus { border-color:var(--accent); }
  .pin-error { color:var(--red); font-size:13px; margin-top:6px; font-weight:700; }

  .btn-primary { background:var(--accent); color:#fff; border:none; border-radius:var(--radius-sm); padding:13px 18px; font-family:'Nunito',sans-serif; font-size:15px; font-weight:800; cursor:pointer; transition:all .15s; box-shadow:0 3px 10px rgba(91,142,255,.28); display:inline-block; }
  .btn-primary:active { transform:scale(.96); }
  .btn-primary.full { width:100%; margin-top:10px; display:block; text-align:center; }
  .btn-secondary { background:var(--surface2); color:var(--text); border:2px solid var(--border); border-radius:var(--radius-sm); padding:10px 14px; font-family:'Nunito',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all .15s; }
  .btn-secondary:active { opacity:.75; }
  .btn-danger { background:#fff0f0; color:var(--red); border:2px solid #ffd4d4; border-radius:var(--radius-sm); padding:8px 12px; font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; cursor:pointer; }
  .btn-danger:active { background:var(--red); color:#fff; }
  .btn-green { background:#D4F7E5; color:#059669; border:none; border-radius:30px; padding:12px 18px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; }
  .btn-green:active { background:#059669; color:#fff; }
  .btn-red-soft { background:#FFE4E4; color:#DC2626; border:none; border-radius:30px; padding:12px 18px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; }
  .btn-red-soft:active { background:#DC2626; color:#fff; }

  .top-bar { background:var(--surface); border-bottom:2px solid var(--border); padding:0 14px; display:flex; align-items:center; justify-content:space-between; height:52px; position:sticky; top:0; z-index:100; box-shadow:var(--shadow); width:100vw; left:0; right:0; }
  .top-bar-logo { font-size:17px; font-weight:900; color:var(--accent); display:flex; align-items:center; gap:6px; }
  .top-bar-right { display:flex; align-items:center; gap:8px; }
  .top-bar-user { font-size:12px; color:var(--muted); font-weight:700; }
  .logout-btn { background:none; border:2px solid var(--border); color:var(--muted); font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; padding:5px 11px; border-radius:20px; cursor:pointer; }
  .logout-btn:active { border-color:var(--red); color:var(--red); }

  .bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:200; background:var(--surface); border-top:2px solid var(--border); height:var(--bottom-nav-h); padding-bottom:env(safe-area-inset-bottom,0px); box-shadow:0 -2px 12px rgba(91,142,255,.10); width:100vw; }
  .bottom-nav-inner { display:flex; height:100%; }
  .bottom-tab { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; border:none; background:none; cursor:pointer; color:var(--muted); font-family:'Nunito',sans-serif; padding:6px 2px; -webkit-tap-highlight-color:transparent; transition:all .15s; border-radius:12px; margin:6px 4px; }
  .bottom-tab.active { color:var(--accent); background:#EEF3FF; }
  .bottom-tab-icon { font-size:21px; line-height:1; }
  .bottom-tab-label { font-size:9px; font-weight:800; letter-spacing:.3px; }

  .main { flex:1; padding:14px 14px 20px; width:100vw; max-width:100vw; overflow-x:hidden; }
  .section-title { font-size:20px; font-weight:900; margin-bottom:3px; }
  .section-sub { color:var(--muted); font-size:12px; margin-bottom:14px; font-weight:600; }

  .search-wrap { position:relative; margin-bottom:14px; }
  .search-input { width:100%; background:var(--surface); border:2px solid var(--border); border-radius:30px; padding:11px 16px 11px 42px; color:var(--text); font-family:'Nunito',sans-serif; font-size:14px; font-weight:600; outline:none; transition:border-color .2s; box-shadow:var(--shadow); }
  .search-input:focus { border-color:var(--accent); }
  .search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:16px; pointer-events:none; }
  .search-clear { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:var(--border); border:none; border-radius:50%; width:20px; height:20px; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--muted); font-weight:900; }

  .session-banner { background:var(--surface); border:2px solid var(--border); border-radius:12px; padding:12px 14px; margin-bottom:14px; display:flex; align-items:center; gap:10px; box-shadow:var(--shadow); flex-wrap:wrap; }
  .session-label { font-size:10px; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
  .session-time { font-size:15px; font-weight:900; font-family:'DM Mono',monospace; color:var(--text); }
  .session-elapsed { font-size:12px; font-weight:700; color:var(--accent); }
  .session-sep { width:1px; height:32px; background:var(--border); flex-shrink:0; }
  .session-active { background:linear-gradient(135deg,#E8FFF4,#D4F7E5); border-color:#A8E6B8; }
  .session-dot { width:9px; height:9px; border-radius:50%; background:#26de81; animation:pulse-dot 1.5s ease-in-out infinite; flex-shrink:0; }
  @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }

  .session-toast { position:fixed; top:62px; left:50%; transform:translateX(-50%); background:#1A1F36; color:#fff; font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; padding:10px 18px; border-radius:30px; z-index:150; white-space:nowrap; box-shadow:0 4px 16px rgba(0,0,0,.25); animation:toast-in .3s ease; }
  @keyframes toast-in { from{opacity:0;transform:translateX(-50%) translateY(-8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  .dialog-backdrop { position:fixed; inset:0; background:rgba(26,31,54,.5); z-index:400; display:flex; align-items:flex-end; justify-content:center; padding:0; }
  .dialog-sheet { background:var(--surface); border-radius:24px 24px 0 0; padding:24px 20px 40px; width:100%; max-width:520px; box-shadow:0 -8px 32px rgba(91,142,255,.2); }
  .dialog-handle { width:36px; height:4px; background:var(--border); border-radius:4px; margin:0 auto 20px; }
  .dialog-title { font-size:19px; font-weight:900; margin-bottom:6px; }
  .dialog-body { font-size:14px; color:var(--muted); font-weight:600; line-height:1.5; margin-bottom:22px; }
  .dialog-actions { display:flex; flex-direction:column; gap:10px; }
  .dialog-btn-end { background:var(--red); color:#fff; border:none; border-radius:12px; padding:16px; font-family:'Nunito',sans-serif; font-weight:800; font-size:16px; cursor:pointer; width:100%; }
  .dialog-btn-keep { background:var(--surface2); color:var(--text); border:2px solid var(--border); border-radius:12px; padding:14px; font-family:'Nunito',sans-serif; font-weight:700; font-size:15px; cursor:pointer; width:100%; }
  .dialog-btn-back { background:none; color:var(--muted); border:none; font-family:'Nunito',sans-serif; font-weight:700; font-size:14px; cursor:pointer; padding:6px; }

  .student-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .student-card { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:14px 12px; cursor:pointer; position:relative; overflow:hidden; box-shadow:var(--shadow); -webkit-tap-highlight-color:transparent; transition:transform .12s; }
  .student-card:active { transform:scale(.96); }
  .student-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:var(--student-color,var(--accent)); }
  .student-avatar { font-size:32px; margin-bottom:6px; }
  .student-name { font-size:15px; font-weight:800; margin-bottom:2px; line-height:1.2; }
  .student-meta { color:var(--muted); font-size:10px; font-weight:600; margin-bottom:8px; }
  .behavior-pills { display:flex; flex-wrap:wrap; gap:4px; }
  .behavior-pill-colored { border-radius:20px; font-size:10px; padding:2px 8px; font-weight:800; border:1.5px solid; white-space:nowrap; }
  .today-count { position:absolute; top:8px; right:8px; background:var(--yellow); border-radius:20px; font-size:10px; padding:2px 7px; font-weight:800; color:#7a5800; }
  .add-student-card { background:var(--surface2); border:2px dashed var(--border); border-radius:16px; padding:14px 12px; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:130px; gap:7px; color:var(--muted); font-weight:700; font-size:13px; }
  .add-student-card:active { border-color:var(--accent); color:var(--accent); }
  .no-results { text-align:center; padding:40px 16px; color:var(--muted); font-weight:700; font-size:15px; }

  .back-btn { background:none; border:none; color:var(--muted); font-family:'Nunito',sans-serif; font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; margin-bottom:14px; padding:0; }
  .track-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; padding-bottom:14px; border-bottom:2px solid var(--border); }
  .track-avatar { font-size:44px; }
  .track-name { font-size:22px; font-weight:900; line-height:1.1; }
  .track-meta { color:var(--muted); font-size:12px; font-weight:600; margin-top:2px; }
  .track-strip { height:4px; width:40px; border-radius:4px; margin-top:6px; }
  .behaviors-list { display:flex; flex-direction:column; gap:14px; }

  .behavior-block { border:2px solid; border-radius:16px; overflow:hidden; box-shadow:var(--shadow); }
  .behavior-header { padding:13px 14px; display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid; }
  .behavior-name { font-size:15px; font-weight:800; }
  .behavior-types { display:flex; gap:5px; margin-top:4px; flex-wrap:wrap; }
  .type-badge { font-size:10px; font-family:'DM Mono',monospace; padding:2px 8px; border-radius:20px; font-weight:700; }
  .type-frequency { background:#DEEEFF; color:#2563EB; }
  .type-duration { background:#D4F7E5; color:#059669; }
  .type-latency { background:#FFE9D4; color:#D97706; }
  .type-abc { background:#EDE9FE; color:#7C3AED; }
  .type-trials { background:#FFF0F8; color:#B02070; }
  .type-intensity { background:#FEF3C7; color:#92400E; }

  .tracking-zones { display:flex; flex-direction:column; }
  .tracking-zone { padding:14px; border-bottom:2px solid; background:var(--surface); }
  .tracking-zone:last-child { border-bottom:none; }
  .zone-label { font-size:10px; font-weight:800; color:var(--muted); margin-bottom:10px; text-transform:uppercase; letter-spacing:1.5px; }
  .freq-display { font-size:42px; font-weight:900; font-family:'DM Mono',monospace; margin-bottom:10px; line-height:1; }
  .freq-btn { color:#fff; border:none; border-radius:30px; padding:12px 24px; font-family:'Nunito',sans-serif; font-weight:800; font-size:16px; cursor:pointer; width:100%; }
  .freq-note { margin-top:8px; font-size:11px; color:var(--muted); font-weight:600; }
  .timer-display { font-size:28px; font-weight:800; font-family:'DM Mono',monospace; margin-bottom:10px; }
  .timer-running { animation:blink 1s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.5} }
  .timer-btn-row { display:flex; gap:8px; }
  .timer-btn-row button { flex:1; padding:12px 8px; border-radius:30px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; border:none; }
  .timer-log { font-size:11px; color:var(--muted); margin-top:8px; font-weight:600; }
  .trials-row { display:flex; gap:10px; margin-bottom:12px; }
  .trial-counter { flex:1; border-radius:12px; padding:12px 10px; text-align:center; }
  .trial-counter-num { font-size:36px; font-weight:900; font-family:'DM Mono',monospace; line-height:1; }
  .trial-counter-label { font-size:10px; font-weight:800; margin-top:3px; text-transform:uppercase; }
  .trial-counter-btn { width:100%; margin-top:10px; border:none; border-radius:8px; padding:11px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; }
  .trial-correct { background:#E8FFF0; border:2px solid #A8E6B8; }
  .trial-correct .trial-counter-num,.trial-correct .trial-counter-label { color:#059669; }
  .trial-correct .trial-counter-btn { background:#26de81; color:#fff; }
  .trial-incorrect { background:#FFF0F0; border:2px solid #FFB3B3; }
  .trial-incorrect .trial-counter-num,.trial-incorrect .trial-counter-label { color:#DC2626; }
  .trial-incorrect .trial-counter-btn { background:#FF6B6B; color:#fff; }
  .trials-bar-bg { background:var(--border); border-radius:20px; height:10px; overflow:hidden; margin-top:6px; }
  .trials-bar-fill { height:100%; border-radius:20px; transition:width .4s; }
  .trials-pct { font-size:13px; font-weight:800; display:flex; justify-content:space-between; }
  .abc-form { display:flex; flex-direction:column; gap:8px; }
  .abc-select { background:var(--surface2); border:2px solid var(--border); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text); font-family:'Nunito',sans-serif; font-size:14px; font-weight:600; outline:none; width:100%; }
  .abc-submit { background:var(--purple); color:#fff; border:none; border-radius:30px; padding:12px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; width:100%; }
  .abc-saved { color:#059669; font-size:12px; font-weight:800; margin-top:4px; }

  /* Intensity zone */
  .intensity-level-btn { width:100%; display:flex; align-items:center; gap:12px; border-radius:12px; padding:11px 14px; cursor:pointer; font-family:'Nunito',sans-serif; text-align:left; transition:all .12s; margin-bottom:6px; }
  .intensity-level-btn:last-child { margin-bottom:0; }
  .intensity-level-btn:active { transform:scale(.97); }
  .intensity-level-num { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:900; flex-shrink:0; color:#fff; }
  .intensity-level-label { flex:1; font-size:14px; font-weight:700; }
  .intensity-level-desc { font-size:11px; font-weight:600; opacity:.75; margin-top:1px; }
  .intensity-count-badge { font-size:11px; font-weight:800; border-radius:20px; padding:3px 9px; color:#fff; flex-shrink:0; }
  .intensity-summary { margin-top:10px; padding:10px 12px; background:var(--surface2); border-radius:10px; border:1.5px solid var(--border); }
  .intensity-summary-row { display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:700; }

  .behavior-logs { padding:12px 14px; background:var(--surface); }
  .logs-title { font-size:11px; font-weight:800; color:var(--muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px; }
  .log-item { font-size:12px; padding:6px 0; border-bottom:1px solid var(--border); display:flex; gap:8px; align-items:flex-start; font-weight:600; }
  .log-item:last-child { border-bottom:none; }
  .log-time { color:var(--accent); white-space:nowrap; font-family:'DM Mono',monospace; font-size:10px; }
  .log-content { flex:1; color:var(--text); font-size:11px; }
  .log-who { color:var(--orange); }

  .goals-section { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:16px 14px; box-shadow:var(--shadow); }
  .goals-section-title { font-size:16px; font-weight:900; margin-bottom:2px; }
  .goals-section-sub { font-size:12px; color:var(--muted); font-weight:600; margin-bottom:14px; }
  .goal-card { background:var(--surface2); border:2px solid var(--border); border-radius:12px; padding:14px; margin-bottom:12px; }
  .goal-card:last-child { margin-bottom:0; }
  .goal-name { font-size:14px; font-weight:800; margin-bottom:2px; }
  .goal-target { font-size:11px; color:var(--muted); font-weight:700; margin-bottom:10px; }
  .goal-btn-row { display:flex; gap:8px; margin-bottom:10px; }
  .goal-btn-correct { flex:1; background:#26de81; color:#fff; border:none; border-radius:10px; padding:13px 8px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; }
  .goal-btn-incorrect { flex:1; background:#FF6B6B; color:#fff; border:none; border-radius:10px; padding:13px 8px; font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; cursor:pointer; }
  .goal-stats { display:flex; justify-content:space-between; font-size:12px; font-weight:700; margin-bottom:5px; }
  .goal-bar-bg { background:var(--border); border-radius:20px; height:10px; overflow:hidden; }
  .goal-bar-fill { height:100%; border-radius:20px; transition:width .4s; }
  .goal-today { font-size:11px; color:var(--muted); font-weight:600; margin-top:5px; }

  .reports-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
  .report-card { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:16px 14px; box-shadow:var(--shadow); }
  .report-student { font-size:15px; font-weight:800; margin-bottom:3px; display:flex; align-items:center; gap:8px; }
  .report-date { font-size:11px; color:var(--muted); font-weight:600; margin-bottom:12px; }
  .report-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border); font-size:12px; }
  .report-row:last-child { border-bottom:none; }
  .report-bname { color:var(--muted); font-weight:700; flex:1; padding-right:8px; }
  .report-val { font-weight:800; font-family:'DM Mono',monospace; font-size:11px; flex-shrink:0; }
  .export-btn { background:var(--surface2); border:2px solid var(--border); color:var(--text); font-family:'Nunito',sans-serif; font-size:13px; font-weight:800; padding:10px; border-radius:30px; cursor:pointer; margin-top:12px; width:100%; }

  .manage-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
  .manage-card { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:16px 14px; box-shadow:var(--shadow); }
  .manage-card-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; padding-bottom:10px; border-bottom:2px solid var(--border); }
  .manage-card-name { font-size:16px; font-weight:800; flex:1; }
  .manage-behavior-row { display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); gap:8px; }
  .manage-behavior-row:last-child { border-bottom:none; }
  .manage-bname { font-size:13px; font-weight:700; }
  .manage-btypes { display:flex; gap:4px; flex-wrap:wrap; margin-top:3px; }
  .tag { font-size:9px; padding:2px 6px; border-radius:10px; font-weight:700; }
  .tag-f { background:#DEEEFF; color:#2563EB; }
  .tag-d { background:#D4F7E5; color:#059669; }
  .tag-l { background:#FFE9D4; color:#D97706; }
  .tag-a { background:#EDE9FE; color:#7C3AED; }
  .tag-t { background:#FFF0F8; color:#B02070; }
  .tag-i { background:#FEF3C7; color:#92400E; }

  .users-list { display:flex; flex-direction:column; gap:10px; margin-top:8px; }
  .user-card { background:var(--surface); border:2px solid var(--border); border-radius:14px; padding:14px; box-shadow:var(--shadow); display:flex; align-items:center; gap:12px; }
  .user-avatar-circle { width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; flex-shrink:0; }
  .user-card-name { font-size:15px; font-weight:800; }
  .user-card-role { font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px; display:inline-block; margin-top:3px; }
  .role-admin { background:#EDE9FE; color:#7C3AED; }
  .role-para { background:#DEEEFF; color:#2563EB; }
  .user-card-actions { margin-left:auto; display:flex; gap:6px; flex-shrink:0; }

  .assign-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
  .assign-chip { border-radius:20px; padding:5px 12px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; cursor:pointer; border:2px solid var(--border); background:var(--surface2); color:var(--muted); transition:all .15s; }
  .assign-chip.on { background:#EEF3FF; border-color:var(--accent); color:var(--accent); }

  .modal-backdrop { position:fixed; inset:0; background:rgba(26,31,54,.4); display:flex; align-items:flex-end; justify-content:center; z-index:300; }
  .modal { background:var(--surface); border-radius:24px 24px 0 0; padding:24px 18px 36px; width:100%; max-width:520px; max-height:92vh; overflow-y:auto; box-shadow:0 -8px 40px rgba(91,142,255,.18); }
  .modal-handle { width:36px; height:4px; background:var(--border); border-radius:4px; margin:0 auto 16px; }
  .modal-title { font-size:20px; font-weight:900; margin-bottom:4px; }
  .modal-sub { color:var(--muted); font-size:13px; font-weight:600; margin-bottom:20px; }
  .form-label { font-size:11px; font-weight:800; color:var(--muted); margin-bottom:5px; display:block; text-transform:uppercase; letter-spacing:.5px; }
  .form-input { width:100%; background:var(--surface2); border:2px solid var(--border); border-radius:var(--radius-sm); padding:12px 13px; color:var(--text); font-family:'Nunito',sans-serif; font-size:15px; font-weight:600; outline:none; transition:border-color .2s; margin-bottom:14px; }
  .form-input:focus { border-color:var(--accent); }
  .avatar-grid { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px; }
  .avatar-opt { font-size:24px; width:42px; height:42px; border-radius:10px; border:2px solid var(--border); background:var(--surface2); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .12s; }
  .avatar-opt.sel { border-color:var(--accent); background:#EEF3FF; transform:scale(1.1); }
  .color-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
  .color-opt { width:30px; height:30px; border-radius:50%; cursor:pointer; border:3px solid transparent; transition:all .12s; }
  .color-opt.sel { border-color:#1A1F36; transform:scale(1.2); }
  .type-toggle-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px; }
  .type-toggle { border:2px solid var(--border); border-radius:20px; padding:6px 12px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; cursor:pointer; background:var(--surface2); color:var(--muted); }
  .type-toggle.on-f { background:#DEEEFF; border-color:#2563EB; color:#2563EB; }
  .type-toggle.on-d { background:#D4F7E5; border-color:#059669; color:#059669; }
  .type-toggle.on-l { background:#FFE9D4; border-color:#D97706; color:#D97706; }
  .type-toggle.on-a { background:#EDE9FE; border-color:#7C3AED; color:#7C3AED; }
  .type-toggle.on-t { background:#FFF0F8; border-color:#B02070; color:#B02070; }
  .type-toggle.on-i { background:#FEF3C7; border-color:#D97706; color:#92400E; }
  .behavior-edit-item { border:2px solid var(--border); border-radius:10px; padding:11px 12px; margin-bottom:8px; }
  .modal-actions { display:flex; gap:10px; margin-top:16px; }
  .modal-actions .btn-primary { flex:1; margin-top:0; text-align:center; }

  /* Intensity config in modal */
  .intensity-config-box { background:var(--surface2); border:2px solid #FEF3C7; border-radius:12px; padding:14px; margin-bottom:14px; }
  .intensity-config-title { font-size:11px; font-weight:800; color:#92400E; text-transform:uppercase; letter-spacing:.5px; margin-bottom:10px; }
  .intensity-config-row { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
  .intensity-level-circle { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; color:#fff; flex-shrink:0; }
  .intensity-config-input { flex:1; background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:8px 10px; color:var(--text); font-family:'Nunito',sans-serif; font-size:13px; font-weight:600; outline:none; }
  .intensity-config-input:focus { border-color:#D97706; }
  .intensity-config-desc { width:100%; background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:7px 10px; color:var(--muted); font-family:'Nunito',sans-serif; font-size:11px; font-weight:600; outline:none; margin-left:36px; margin-bottom:4px; }
  .intensity-config-desc:focus { border-color:#D97706; }
  .intensity-num-select { background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:8px 10px; font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; color:var(--text); outline:none; cursor:pointer; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }

  .report-student-row { background:var(--surface); border:2px solid var(--border); border-radius:14px; padding:16px 14px; margin-bottom:10px; display:flex; align-items:center; gap:12px; cursor:pointer; box-shadow:var(--shadow); -webkit-tap-highlight-color:transparent; transition:transform .12s; }
  .report-student-row:active { transform:scale(.97); }
  .report-student-row-left { flex:1; }
  .report-student-row-name { font-size:16px; font-weight:800; }
  .report-student-row-meta { font-size:12px; color:var(--muted); font-weight:600; margin-top:2px; }
  .report-student-row-today { font-size:12px; font-weight:800; color:var(--orange); }

  .graph-section { background:var(--surface); border:2px solid var(--border); border-radius:16px; padding:16px 14px; margin-bottom:14px; box-shadow:var(--shadow); }
  .data-table { width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; }
  .data-table th { background:var(--surface2); color:var(--muted); font-weight:800; font-size:10px; text-transform:uppercase; letter-spacing:.5px; padding:7px 8px; text-align:left; }
  .data-table td { padding:7px 8px; border-top:1px solid var(--border); font-weight:600; color:var(--text); vertical-align:top; }
  .data-table tr:nth-child(even) td { background:var(--surface2); }
  .data-table .num { font-family:'DM Mono',monospace; font-weight:700; color:var(--accent); text-align:right; }
  .chart-wrap { position:relative; width:100%; margin-bottom:4px; }
  .chart-x-labels { display:flex; justify-content:space-between; padding:0 2px; margin-top:2px; }
  .chart-x-label { font-size:9px; font-weight:700; color:var(--muted); }
  .graph-title { font-size:14px; font-weight:800; margin-bottom:3px; }
  .graph-meta { font-size:11px; color:var(--muted); font-weight:600; margin-bottom:12px; }
  .graph-range-row { display:flex; gap:6px; margin-bottom:14px; }
  .graph-range-btn { border:2px solid var(--border); border-radius:20px; padding:5px 12px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:700; cursor:pointer; background:var(--surface2); color:var(--muted); }
  .graph-range-btn.active { background:#EEF3FF; border-color:var(--accent); color:var(--accent); }
  .graph-empty { text-align:center; padding:24px; color:var(--muted); font-size:13px; font-weight:700; }
  svg.line-chart { width:100%; overflow:visible; }

  .info-btn { background:none; border:none; font-size:15px; cursor:pointer; padding:2px 4px; opacity:.7; }
  .info-btn:active { opacity:1; }
  .info-notes { background:var(--surface2); border-radius:10px; padding:10px 12px; font-size:13px; font-weight:600; color:var(--text); margin-top:8px; border:2px solid var(--border); }
  .strategy-toggle-grid { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
  .strategy-toggle { border:2px solid var(--border); border-radius:20px; padding:5px 11px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:700; cursor:pointer; background:var(--surface2); color:var(--muted); }
  .strategy-toggle.on { background:#EEF3FF; border-color:var(--accent); color:var(--accent); }

  .lang-toggle { background:none; border:2px solid var(--border); border-radius:20px; padding:6px 12px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:800; cursor:pointer; color:var(--muted); background:var(--surface); flex-shrink:0; }
  .lang-toggle:active { border-color:var(--accent); color:var(--accent); }

  .session-delete-btn { background:#FFF0F0; color:var(--red); border:2px solid #FFD4D4; border-radius:8px; padding:5px 10px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:700; cursor:pointer; }
  .session-delete-btn:active { background:var(--red); color:#fff; }
  .session-edit-btn { background:#EEF3FF; color:var(--accent); border:2px solid #A5BFFF; border-radius:8px; padding:5px 10px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:700; cursor:pointer; }
  .session-edit-btn:active { background:var(--accent); color:#fff; }
  .time-input { background:var(--surface2); border:2px solid var(--border); border-radius:var(--radius-sm); padding:10px 12px; color:var(--text); font-family:'DM Mono',monospace; font-size:18px; font-weight:600; outline:none; transition:border-color .2s; width:100%; margin-bottom:14px; }
  .time-input:focus { border-color:var(--accent); }

  /* Data Recovery */
  .recovery-banner { background:linear-gradient(135deg,#FFF9E6,#FEF3C7); border:2px solid #FDE68A; border-radius:14px; padding:14px 16px; margin-bottom:16px; }
  .recovery-banner-title { font-size:15px; font-weight:900; color:#92400E; margin-bottom:4px; }
  .recovery-banner-sub { font-size:12px; color:#B45309; font-weight:600; line-height:1.5; }
  .orphan-student-block { background:var(--surface); border:2px solid var(--border); border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:var(--shadow); }
  .orphan-student-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; padding-bottom:10px; border-bottom:2px solid var(--border); }
  .orphan-key-block { background:#FFF9E6; border:2px solid #FDE68A; border-radius:10px; padding:12px; margin-bottom:10px; }
  .orphan-key-title { font-size:11px; font-weight:800; color:#92400E; text-transform:uppercase; letter-spacing:.5px; margin-bottom:6px; display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
  .orphan-log-row { font-size:11px; padding:5px 0; border-bottom:1px solid #FDE68A55; display:flex; gap:8px; align-items:flex-start; font-weight:600; color:var(--text); }
  .orphan-log-row:last-child { border-bottom:none; }
  .orphan-actions { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; align-items:center; }
  .btn-recover { background:#FEF3C7; color:#92400E; border:2px solid #FDE68A; border-radius:8px; padding:8px 12px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:800; cursor:pointer; white-space:nowrap; }
  .btn-recover:active { background:#92400E; color:#fff; }
  .assign-target-select { background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:8px 10px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; color:var(--text); outline:none; cursor:pointer; flex:1; min-width:0; }
  .assign-target-select:focus { border-color:var(--accent); }
  .btn-assign-confirm { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:8px 12px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:800; cursor:pointer; white-space:nowrap; }
  .btn-assign-confirm:active { opacity:.8; }
  .recovery-empty { text-align:center; padding:32px 16px; color:#059669; font-weight:800; font-size:14px; background:#E8FFF4; border:2px solid #A8E6B8; border-radius:14px; }

  /* Session Review Sheet */
  .review-sheet-backdrop { position:fixed; inset:0; background:rgba(26,31,54,.55); z-index:500; display:flex; flex-direction:column; justify-content:flex-end; }
  .review-sheet { background:var(--bg); border-radius:24px 24px 0 0; width:100%; max-width:520px; margin:0 auto; height:92vh; display:flex; flex-direction:column; box-shadow:0 -8px 40px rgba(91,142,255,.2); overflow:hidden; }
  .review-sheet-header { background:var(--surface); border-bottom:2px solid var(--border); padding:16px 18px 14px; flex-shrink:0; }
  .review-sheet-handle { width:36px; height:4px; background:var(--border); border-radius:4px; margin:0 auto 14px; }
  .review-sheet-title { font-size:19px; font-weight:900; margin-bottom:2px; }
  .review-sheet-sub { font-size:12px; color:var(--muted); font-weight:600; }
  .review-sheet-body { flex:1; overflow-y:auto; padding:14px; }
  .review-sheet-footer { background:var(--surface); border-top:2px solid var(--border); padding:14px 18px; flex-shrink:0; padding-bottom:max(14px,env(safe-area-inset-bottom)); }
  .review-behavior-section { margin-bottom:18px; }
  .review-behavior-label { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
  .review-behavior-count { font-size:10px; padding:2px 8px; border-radius:20px; font-weight:800; }
  .review-entry { background:var(--surface); border:2px solid var(--border); border-radius:12px; margin-bottom:8px; overflow:hidden; transition:border-color .15s; }
  .review-entry.editing { border-color:var(--accent); }
  .review-entry-row { display:flex; align-items:center; gap:10px; padding:10px 12px; }
  .review-entry-type { font-size:10px; font-family:'DM Mono',monospace; padding:2px 8px; border-radius:20px; font-weight:700; flex-shrink:0; }
  .review-entry-main { flex:1; min-width:0; }
  .review-entry-detail { font-size:13px; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .review-entry-meta { font-size:10px; color:var(--muted); font-weight:600; margin-top:1px; }
  .review-entry-actions { display:flex; gap:5px; flex-shrink:0; }
  .review-edit-btn { background:#EEF3FF; color:var(--accent); border:2px solid #A5BFFF; border-radius:7px; padding:5px 9px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:800; cursor:pointer; }
  .review-edit-btn:active { background:var(--accent); color:#fff; }
  .review-del-btn { background:#FFF0F0; color:var(--red); border:2px solid #FFD4D4; border-radius:7px; padding:5px 9px; font-family:'Nunito',sans-serif; font-size:11px; font-weight:800; cursor:pointer; }
  .review-del-btn:active { background:var(--red); color:#fff; }
  .review-edit-panel { padding:0 12px 12px; border-top:2px solid var(--border); background:#F8FAFF; }
  .review-edit-panel-inner { padding-top:10px; display:flex; flex-direction:column; gap:8px; }
  .review-field-label { font-size:10px; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; margin-bottom:3px; }
  .review-field-input { width:100%; background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:9px 11px; color:var(--text); font-family:'Nunito',sans-serif; font-size:13px; font-weight:600; outline:none; }
  .review-field-input:focus { border-color:var(--accent); }
  .review-field-select { width:100%; background:var(--surface); border:2px solid var(--border); border-radius:8px; padding:9px 11px; color:var(--text); font-family:'Nunito',sans-serif; font-size:13px; font-weight:600; outline:none; }
  .review-save-btn { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:10px; font-family:'Nunito',sans-serif; font-weight:800; font-size:13px; cursor:pointer; width:100%; margin-top:4px; }
  .review-cancel-edit-btn { background:var(--surface2); color:var(--muted); border:2px solid var(--border); border-radius:8px; padding:9px; font-family:'Nunito',sans-serif; font-weight:700; font-size:12px; cursor:pointer; width:100%; }
  .review-empty { text-align:center; padding:32px 16px; color:var(--muted); font-weight:700; font-size:14px; background:var(--surface); border-radius:14px; border:2px dashed var(--border); }
  .summary-section { background:var(--surface); border:2px solid var(--border); border-radius:14px; padding:14px; margin-bottom:14px; }
  .summary-section-title { font-size:12px; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; margin-bottom:10px; }
  .summary-stat-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; font-weight:700; }
  .summary-stat-row:last-child { border-bottom:none; }
  .summary-stat-label { color:var(--muted); }
  .summary-stat-val { font-family:'DM Mono',monospace; font-weight:800; color:var(--accent); }
  .summary-submit-btn { background:var(--green); color:#fff; border:none; border-radius:12px; padding:16px; font-family:'Nunito',sans-serif; font-weight:900; font-size:16px; cursor:pointer; width:100%; margin-bottom:10px; box-shadow:0 4px 12px rgba(38,222,129,.3); }
  .summary-submit-btn:active { transform:scale(.97); }
  .summary-back-btn { background:var(--surface2); color:var(--text); border:2px solid var(--border); border-radius:12px; padding:13px; font-family:'Nunito',sans-serif; font-weight:700; font-size:14px; cursor:pointer; width:100%; }
`;

// ─── Session Review Sheet ──────────────────────────────────────────────────────
function SessionReviewSheet({ student, session, allLogs, onUpdateLog, onDeleteLog, onConfirmEnd, onCancel }) {
  const t = useLang();
  const lang = useContext(LangContext);
  const [step, setStep] = useState("review"); // "review" | "summary"
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({});

  const elapsed = session?.timeIn ? ts() - session.timeIn : 0;

  // Gather all today's logs across all behaviors + goals
  const behaviorEntries = student.behaviors.map((b, i) => {
    const key = `${student.id}-${b.id}`;
    const logs = (allLogs[key] || []).filter(l => l.date === today());
    return { behavior: b, bIndex: i, key, logs };
  }).filter(e => e.logs.length > 0);

  const goalEntries = (student.goals || []).map(g => {
    const key = `${student.id}-goal-${g.id}`;
    const logs = (allLogs[key] || []).filter(l => l.date === today());
    return { goal: g, key, logs };
  }).filter(e => e.logs.length > 0);

  const totalEntries = behaviorEntries.reduce((s, e) => s + e.logs.length, 0)
    + goalEntries.reduce((s, e) => s + e.logs.length, 0);

  function startEdit(log) {
    setEditingId(log.id);
    setEditDraft({
      time: log.time || "",
      note: log.note || "",
      antecedent: log.antecedent || "",
      behavior: log.behavior || "",
      consequence: log.consequence || "",
      result: log.result || "",
      level: log.level || 1,
    });
  }

  function saveEdit(key, log) {
    const updated = {
      ...log,
      time: editDraft.time || log.time,
      note: editDraft.note,
      ...(log.type === "abc" ? {
        antecedent: editDraft.antecedent,
        behavior: editDraft.behavior,
        consequence: editDraft.consequence,
      } : {}),
      ...(log.type === "trial" ? { result: editDraft.result } : {}),
      ...(log.type === "intensity" ? { level: parseInt(editDraft.level) } : {}),
    };
    onUpdateLog(key, log.id, updated);
    setEditingId(null);
  }

  function entryLabel(l) {
    if (l.type === "frequency") return "Occurrence recorded";
    if (l.type === "duration") return `Duration: ${fmt(l.value)}`;
    if (l.type === "latency") return `Latency: ${fmt(l.value)}`;
    if (l.type === "trial") return `Trial: ${l.result}`;
    if (l.type === "intensity") return `Level ${l.level}${l.label ? ": " + l.label : ""}`;
    if (l.type === "abc") return `A: ${l.antecedent} → C: ${l.consequence}`;
    return l.type;
  }

  // ── Review Step ──
  if (step === "review") {
    return (
      <div className="review-sheet-backdrop">
        <div className="review-sheet">
          <div className="review-sheet-header">
            <div className="review-sheet-handle"/>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
              <div>
                <div className="review-sheet-title">📋 Review Session</div>
                <div className="review-sheet-sub">{student.avatar} {student.name} · {today()} · {totalEntries} entr{totalEntries===1?"y":"ies"} today</div>
              </div>
              <button onClick={onCancel} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"var(--muted)",padding:"2px 4px",flexShrink:0}}>✕</button>
            </div>
          </div>

          <div className="review-sheet-body">
            {totalEntries === 0 && (
              <div className="review-empty">No data recorded today yet.<br/>You can still end the session.</div>
            )}

            {behaviorEntries.map(({ behavior, bIndex, key, logs }) => {
              const c = bColor(bIndex);
              return (
                <div key={key} className="review-behavior-section">
                  <div className="review-behavior-label" style={{color:c.text}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:c.accent,display:"inline-block",flexShrink:0}}/>
                    {behavior.name}
                    <span className="review-behavior-count" style={{background:c.bg,color:c.text,border:`1.5px solid ${c.border}`}}>{logs.length}</span>
                  </div>
                  {logs.map(l => {
                    const isEditing = editingId === l.id;
                    return (
                      <div key={l.id} className={`review-entry ${isEditing?"editing":""}`}>
                        <div className="review-entry-row">
                          <span className={`review-entry-type type-${l.type==="trial"?"trials":l.type}`}>{t.typeLabels[l.type==="trial"?"trial":l.type]||l.type}</span>
                          <div className="review-entry-main">
                            <div className="review-entry-detail">{entryLabel(l)}</div>
                            <div className="review-entry-meta">
                              {l.time}{l.note ? ` · 📝 ${l.note}` : ""}{l.who ? ` · ${l.who}` : ""}
                            </div>
                          </div>
                          <div className="review-entry-actions">
                            <button className="review-edit-btn" onClick={()=>isEditing?setEditingId(null):startEdit(l)}>
                              {isEditing?"✕":"✏️"}
                            </button>
                            <button className="review-del-btn" onClick={()=>{if(window.confirm("Delete this entry?"))onDeleteLog(key,l.id);}}>🗑</button>
                          </div>
                        </div>
                        {isEditing && (
                          <div className="review-edit-panel">
                            <div className="review-edit-panel-inner">
                              {/* Time */}
                              <div>
                                <div className="review-field-label">Time</div>
                                <input className="review-field-input" type="time" value={editDraft.time} onChange={e=>setEditDraft(p=>({...p,time:e.target.value}))}/>
                              </div>
                              {/* ABC fields */}
                              {l.type === "abc" && (<>
                                <div>
                                  <div className="review-field-label">Antecedent</div>
                                  <select className="review-field-select" value={editDraft.antecedent} onChange={e=>setEditDraft(p=>({...p,antecedent:e.target.value}))}>
                                    {t.antecedents.map(a=><option key={a}>{a}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <div className="review-field-label">Behavior</div>
                                  <select className="review-field-select" value={editDraft.behavior} onChange={e=>setEditDraft(p=>({...p,behavior:e.target.value}))}>
                                    {t.behaviorOptions.map(b=><option key={b}>{b}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <div className="review-field-label">Consequence</div>
                                  <select className="review-field-select" value={editDraft.consequence} onChange={e=>setEditDraft(p=>({...p,consequence:e.target.value}))}>
                                    {t.consequences.map(c=><option key={c}>{c}</option>)}
                                  </select>
                                </div>
                              </>)}
                              {/* Trial result */}
                              {l.type === "trial" && (
                                <div>
                                  <div className="review-field-label">Result</div>
                                  <div style={{display:"flex",gap:8}}>
                                    {["correct","incorrect"].map(r=>(
                                      <button key={r} onClick={()=>setEditDraft(p=>({...p,result:r}))} style={{flex:1,padding:"9px 8px",borderRadius:8,border:`2px solid ${editDraft.result===r?(r==="correct"?"#059669":"var(--red)"):"var(--border)"}`,background:editDraft.result===r?(r==="correct"?"#E8FFF4":"#FFF0F0"):"var(--surface2)",color:editDraft.result===r?(r==="correct"?"#059669":"var(--red)"):"var(--muted)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer"}}>
                                        {r === "correct" ? "✓ Correct" : "✗ Incorrect"}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {/* Intensity level */}
                              {l.type === "intensity" && behavior.intensityConfig?.levels?.length > 0 && (
                                <div>
                                  <div className="review-field-label">Intensity Level</div>
                                  <select className="review-field-select" value={editDraft.level} onChange={e=>setEditDraft(p=>({...p,level:parseInt(e.target.value)}))}>
                                    {behavior.intensityConfig.levels.map(lvl=><option key={lvl.level} value={lvl.level}>{lvl.level}: {lvl.label}</option>)}
                                  </select>
                                </div>
                              )}
                              {/* Note */}
                              <div>
                                <div className="review-field-label">Note (optional)</div>
                                <input className="review-field-input" placeholder="Add a note…" value={editDraft.note} onChange={e=>setEditDraft(p=>({...p,note:e.target.value}))}/>
                              </div>
                              <button className="review-save-btn" onClick={()=>saveEdit(key,l)}>Save Changes</button>
                              <button className="review-cancel-edit-btn" onClick={()=>setEditingId(null)}>Cancel</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {goalEntries.map(({ goal, key, logs }) => (
              <div key={key} className="review-behavior-section">
                <div className="review-behavior-label" style={{color:"#9A7B00"}}>
                  <span>🎯</span>
                  {goal.name}
                  <span className="review-behavior-count" style={{background:"#FFF9E6",color:"#9A7B00",border:"1.5px solid #FDE68A"}}>{logs.length}</span>
                </div>
                {logs.map(l => {
                  const isEditing = editingId === l.id;
                  return (
                    <div key={l.id} className={`review-entry ${isEditing?"editing":""}`}>
                      <div className="review-entry-row">
                        <span className="review-entry-type type-trials">trial</span>
                        <div className="review-entry-main">
                          <div className="review-entry-detail">Trial: {l.result}</div>
                          <div className="review-entry-meta">{l.time}{l.note?` · 📝 ${l.note}`:""}</div>
                        </div>
                        <div className="review-entry-actions">
                          <button className="review-edit-btn" onClick={()=>isEditing?setEditingId(null):startEdit(l)}>{isEditing?"✕":"✏️"}</button>
                          <button className="review-del-btn" onClick={()=>{if(window.confirm("Delete this entry?"))onDeleteLog(key,l.id);}}>🗑</button>
                        </div>
                      </div>
                      {isEditing && (
                        <div className="review-edit-panel">
                          <div className="review-edit-panel-inner">
                            <div>
                              <div className="review-field-label">Time</div>
                              <input className="review-field-input" type="time" value={editDraft.time} onChange={e=>setEditDraft(p=>({...p,time:e.target.value}))}/>
                            </div>
                            <div>
                              <div className="review-field-label">Result</div>
                              <div style={{display:"flex",gap:8}}>
                                {["correct","incorrect"].map(r=>(
                                  <button key={r} onClick={()=>setEditDraft(p=>({...p,result:r}))} style={{flex:1,padding:"9px 8px",borderRadius:8,border:`2px solid ${editDraft.result===r?(r==="correct"?"#059669":"var(--red)"):"var(--border)"}`,background:editDraft.result===r?(r==="correct"?"#E8FFF4":"#FFF0F0"):"var(--surface2)",color:editDraft.result===r?(r==="correct"?"#059669":"var(--red)"):"var(--muted)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer"}}>
                                    {r==="correct"?"✓ Correct":"✗ Incorrect"}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="review-field-label">Note (optional)</div>
                              <input className="review-field-input" placeholder="Add a note…" value={editDraft.note} onChange={e=>setEditDraft(p=>({...p,note:e.target.value}))}/>
                            </div>
                            <button className="review-save-btn" onClick={()=>saveEdit(key,l)}>Save Changes</button>
                            <button className="review-cancel-edit-btn" onClick={()=>setEditingId(null)}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="review-sheet-footer">
            <button className="summary-submit-btn" style={{background:"var(--accent)",boxShadow:"0 4px 12px rgba(91,142,255,.3)"}} onClick={()=>setStep("summary")}>
              Continue to Summary →
            </button>
            <button className="summary-back-btn" onClick={onCancel}>← Keep Tracking</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary Step ──
  const startTime = session?.timeIn ? new Date(session.timeIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) : "—";
  const endTimeStr = new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

  return (
    <div className="review-sheet-backdrop">
      <div className="review-sheet">
        <div className="review-sheet-header">
          <div className="review-sheet-handle"/>
          <div className="review-sheet-title">✅ Session Summary</div>
          <div className="review-sheet-sub">{student.avatar} {student.name} · Ready to submit</div>
        </div>

        <div className="review-sheet-body">
          {/* Session timing */}
          <div className="summary-section">
            <div className="summary-section-title">⏱ Session Info</div>
            <div className="summary-stat-row">
              <span className="summary-stat-label">Start time</span>
              <span className="summary-stat-val">{startTime}</span>
            </div>
            <div className="summary-stat-row">
              <span className="summary-stat-label">End time</span>
              <span className="summary-stat-val">{endTimeStr}</span>
            </div>
            <div className="summary-stat-row">
              <span className="summary-stat-label">Total duration</span>
              <span className="summary-stat-val">{fmt(elapsed)}</span>
            </div>
            <div className="summary-stat-row">
              <span className="summary-stat-label">Total entries</span>
              <span className="summary-stat-val">{totalEntries}</span>
            </div>
          </div>

          {/* Per-behavior breakdown */}
          {behaviorEntries.length > 0 && (
            <div className="summary-section">
              <div className="summary-section-title">📊 Behavior Data</div>
              {behaviorEntries.map(({ behavior, bIndex, logs }) => {
                const c = bColor(bIndex);
                const freqCount = logs.filter(l=>l.type==="frequency").length;
                const durLogs = logs.filter(l=>l.type==="duration");
                const trialLogs = logs.filter(l=>l.type==="trial");
                const abcCount = logs.filter(l=>l.type==="abc").length;
                const intLogs = logs.filter(l=>l.type==="intensity");
                const correct = trialLogs.filter(l=>l.result==="correct").length;
                const pct = trialLogs.length ? Math.round((correct/trialLogs.length)*100) : null;
                const avgDur = durLogs.length ? fmt(Math.round(durLogs.reduce((s,l)=>s+l.value,0)/durLogs.length)) : null;
                const avgInt = intLogs.length ? (intLogs.reduce((s,l)=>s+l.level,0)/intLogs.length).toFixed(1) : null;
                return (
                  <div key={behavior.id} style={{padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{fontSize:13,fontWeight:800,color:c.text,marginBottom:4}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:c.accent,display:"inline-block",marginRight:6,verticalAlign:"middle"}}/>
                      {behavior.name}
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                      {freqCount > 0 && <span style={{fontSize:11,fontWeight:700,background:c.bg,color:c.text,border:`1.5px solid ${c.border}`,borderRadius:20,padding:"2px 9px"}}>× {freqCount} occurrences</span>}
                      {avgDur && <span style={{fontSize:11,fontWeight:700,background:"#D4F7E5",color:"#059669",border:"1.5px solid #A8E6B8",borderRadius:20,padding:"2px 9px"}}>⏱ avg {avgDur}</span>}
                      {pct !== null && <span style={{fontSize:11,fontWeight:700,background:"#EDE9FE",color:"#7C3AED",border:"1.5px solid #C4ADFF",borderRadius:20,padding:"2px 9px"}}>{pct}% ({trialLogs.length} trials)</span>}
                      {abcCount > 0 && <span style={{fontSize:11,fontWeight:700,background:"#EDE9FE",color:"#7C3AED",border:"1.5px solid #C4ADFF",borderRadius:20,padding:"2px 9px"}}>{abcCount} ABC</span>}
                      {avgInt && <span style={{fontSize:11,fontWeight:700,background:"#FEF3C7",color:"#92400E",border:"1.5px solid #FDE68A",borderRadius:20,padding:"2px 9px"}}>🌡 avg {avgInt}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Goals */}
          {goalEntries.length > 0 && (
            <div className="summary-section">
              <div className="summary-section-title">🎯 Goals</div>
              {goalEntries.map(({ goal, logs }) => {
                const correct = logs.filter(l=>l.result==="correct").length;
                const pct = logs.length ? Math.round((correct/logs.length)*100) : 0;
                const barColor = pct >= goal.targetPct ? "#26de81" : pct >= goal.targetPct*.7 ? "#FDCB6E" : "#FF6B6B";
                return (
                  <div key={goal.id} style={{padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <span style={{fontSize:13,fontWeight:800}}>{goal.name}</span>
                      <span style={{fontSize:13,fontWeight:800,fontFamily:"'DM Mono',monospace",color:barColor}}>{pct}%</span>
                    </div>
                    <div style={{background:"var(--border)",borderRadius:20,height:8,overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:20,background:barColor,width:`${Math.min(pct,100)}%`,transition:"width .4s"}}/>
                    </div>
                    <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginTop:4}}>
                      ✓ {correct} correct · ✗ {logs.length-correct} incorrect · Target: {goal.targetPct}%
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalEntries === 0 && (
            <div className="review-empty" style={{marginBottom:14}}>No data was recorded this session.</div>
          )}
        </div>

        <div className="review-sheet-footer">
          <button className="summary-submit-btn" onClick={onConfirmEnd}>
            🟢 End Session & Submit
          </button>
          <button className="summary-back-btn" onClick={()=>setStep("review")}>← Back to Review</button>
        </div>
      </div>
    </div>
  );
}
function EndSessionDialog({ student, session, onEnd, onKeep, onBack, mode }) {
  const t=useLang();
  const elapsed = session?.timeIn ? ts() - session.timeIn : 0;
  const isNavigate = mode === "navigate";
  return (
    <div className="dialog-backdrop">
      <div className="dialog-sheet">
        <div className="dialog-handle"/>
        <div className="dialog-title">{isNavigate ? `End session for ${student.name}?` : t.endDialogTitle(student.name)}</div>
        <div className="dialog-body">
          {isNavigate
            ? <><strong>Heads up:</strong> Leaving will end {student.name}'s session (<strong>{fmt(elapsed)}</strong> elapsed). It will be saved automatically.</>
            : <>Session has been running for <strong>{fmt(elapsed)}</strong>. Keep it running in the background while you use other apps.</>
          }
        </div>
        <div className="dialog-actions">
          <button className="dialog-btn-end" onClick={onEnd}>{isNavigate ? "🔴 End Session & Leave" : t.endNow}</button>
          {!isNavigate && <button className="dialog-btn-keep" onClick={onKeep}>{t.keepRunning}</button>}
          <button className="dialog-btn-back" onClick={onBack}>{isNavigate ? "← Stay on this page" : t.goBack}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Session Banner ───────────────────────────────────────────────────────────
function SessionBanner({ session, onEndRequest }) {
  const t=useLang();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!session?.timeIn) return;
    const iv = setInterval(() => setElapsed(ts() - session.timeIn), 1000);
    return () => clearInterval(iv);
  }, [session?.timeIn]);
  const active = session?.timeIn && !session?.timeOut;
  return (
    <div className={`session-banner ${active?"session-active":""}`}>
      {active && <div className="session-dot"/>}
      <div style={{flex:1}}>
        <div className="session-label">{active?t.sessionInProgress:t.sessionComplete}</div>
        {active
          ? <div className="session-time">{t.sessionStarted(new Date(session.timeIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}</div>
          : session?.timeIn
            ? <div className="session-time">{new Date(session.timeIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} → {new Date(session.timeOut).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
            : <div className="session-time" style={{color:"var(--muted)"}}>{t.noSessionToday}</div>
        }
        {active && <div className="session-elapsed">⏱ {fmt(elapsed)} {t.elapsed}</div>}
        {session?.timeOut && <div className="session-elapsed">{t.sessionTotal} {fmt(session.timeOut-session.timeIn)}</div>}
      </div>
      {active && (
        <button className="btn-red-soft" style={{padding:"10px 14px",fontSize:13}} onClick={onEndRequest}>{t.endSession}</button>
      )}
    </div>
  );
}

function Toast({ message }) {
  return <div className="session-toast">{message}</div>;
}

// ─── Tracking Zones ───────────────────────────────────────────────────────────
function FrequencyZone({ logs, onLog, user, color }) {
  const t=useLang();
  const count = logs.filter(l=>l.type==="frequency"&&l.date===today()).length;
  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">{t.frequency}</div>
      <div className="freq-display" style={{color:color.accent}}>{String(count).padStart(2,"0")}</div>
      <button className="freq-btn" style={{background:color.accent}} onClick={()=>onLog({id:uid(),type:"frequency",date:today(),time:nowStr(),who:user.name,ts:ts()})}>
        {t.recordOccurrence}
      </button>
      <div className="freq-note">{t.timesToday(count)}</div>
    </div>
  );
}

function DurationZone({ logs, onLog, user, color }) {
  const t=useLang();
  const [running,setRunning]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const startRef=useRef(null); const intRef=useRef(null);
  function start(){startRef.current=ts();setRunning(true);intRef.current=setInterval(()=>setElapsed(ts()-startRef.current),100);}
  function stop(){clearInterval(intRef.current);const dur=ts()-startRef.current;setRunning(false);setElapsed(0);onLog({id:uid(),type:"duration",date:today(),time:nowStr(),who:user.name,value:dur,ts:ts()});}
  const dl=logs.filter(l=>l.type==="duration"&&l.date===today());
  const avg=dl.length?Math.round(dl.reduce((a,l)=>a+l.value,0)/dl.length):0;
  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">{t.duration}</div>
      <div className={`timer-display ${running?"timer-running":""}`} style={{color:color.accent}}>{fmt(running?elapsed:0)}</div>
      <div className="timer-btn-row">
        {!running ? <button style={{background:"#D4F7E5",color:"#059669"}} onClick={start}>{t.startTimer}</button>
                  : <button style={{background:"#FFE4E4",color:"#DC2626"}} onClick={stop}>{t.stopSave}</button>}
      </div>
      <div className="timer-log">{dl.length?t.avgEpisodes(fmt(avg),dl.length):t.noEpisodes}</div>
    </div>
  );
}

function LatencyZone({ logs, onLog, user, color }) {
  const t=useLang();
  const [running,setRunning]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const startRef=useRef(null); const intRef=useRef(null);
  function start(){startRef.current=ts();setRunning(true);intRef.current=setInterval(()=>setElapsed(ts()-startRef.current),100);}
  function stop(){clearInterval(intRef.current);const lat=ts()-startRef.current;setRunning(false);setElapsed(0);onLog({id:uid(),type:"latency",date:today(),time:nowStr(),who:user.name,value:lat,ts:ts()});}
  const ll=logs.filter(l=>l.type==="latency"&&l.date===today());
  const avg=ll.length?Math.round(ll.reduce((a,l)=>a+l.value,0)/ll.length):0;
  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">{t.latency}</div>
      <div className={`timer-display ${running?"timer-running":""}`} style={{color:color.accent}}>{fmt(running?elapsed:0)}</div>
      <div className="timer-btn-row">
        {!running ? <button style={{background:"#FFE9D4",color:"#D97706"}} onClick={start}>{t.startLatency}</button>
                  : <button style={{background:"#FFE4E4",color:"#DC2626"}} onClick={stop}>{t.recordLatency}</button>}
      </div>
      <div className="timer-log">{ll.length?`Avg: ${fmt(avg)}`:t.latencyHint}</div>
    </div>
  );
}

function ABCZone({ logs, onLog, user, color }) {
  const t=useLang();
  const [ant,setAnt]=useState(""); const [beh,setBeh]=useState(""); const [con,setCon]=useState(""); const [note,setNote]=useState(""); const [saved,setSaved]=useState(false);
  function submit(){
    if(!ant||!beh||!con)return;
    onLog({id:uid(),type:"abc",date:today(),time:nowStr(),who:user.name,antecedent:ant,behavior:beh,consequence:con,note,ts:ts()});
    setAnt("");setBeh("");setCon("");setNote("");setSaved(true);setTimeout(()=>setSaved(false),2000);
  }
  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">{t.abcData}</div>
      <div className="abc-form">
        <select className="abc-select" value={ant} onChange={e=>setAnt(e.target.value)}><option value="">{t.antecedentPlaceholder}</option>{t.antecedents.map(a=><option key={a}>{a}</option>)}</select>
        <select className="abc-select" value={beh} onChange={e=>setBeh(e.target.value)}><option value="">{t.behaviorPlaceholder}</option>{t.behaviorOptions.map(b=><option key={b}>{b}</option>)}</select>
        <select className="abc-select" value={con} onChange={e=>setCon(e.target.value)}><option value="">{t.consequencePlaceholder}</option>{t.consequences.map(c=><option key={c}>{c}</option>)}</select>
        <input className="abc-select" placeholder={t.notesPlaceholder} value={note} onChange={e=>setNote(e.target.value)}/>
        <button className="abc-submit" style={{background:color.accent}} onClick={submit}>{t.saveAbc}</button>
        {saved && <div className="abc-saved">{t.savedConfirm}</div>}
      </div>
    </div>
  );
}

function TrialsZone({ logs, onLog, user, color }) {
  const t=useLang();
  const tl=logs.filter(l=>l.type==="trial"&&l.date===today());
  const correct=tl.filter(l=>l.result==="correct").length;
  const incorrect=tl.filter(l=>l.result==="incorrect").length;
  const total=correct+incorrect;
  const pct=total?Math.round((correct/total)*100):0;
  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">{t.trials}</div>
      <div className="trials-row">
        <div className="trial-counter trial-correct">
          <div className="trial-counter-num">{correct}</div>
          <div className="trial-counter-label">{t.correct}</div>
          <button className="trial-counter-btn" onClick={()=>onLog({id:uid(),type:"trial",result:"correct",date:today(),time:nowStr(),who:user.name,ts:ts()})}>{t.addCorrect}</button>
        </div>
        <div className="trial-counter trial-incorrect">
          <div className="trial-counter-num">{incorrect}</div>
          <div className="trial-counter-label">{t.incorrect}</div>
          <button className="trial-counter-btn" onClick={()=>onLog({id:uid(),type:"trial",result:"incorrect",date:today(),time:nowStr(),who:user.name,ts:ts()})}>{t.addIncorrect}</button>
        </div>
      </div>
      {total>0&&(
        <div>
          <div className="trials-pct">
            <span style={{color:"#059669",fontWeight:800}}>{pct}% correct</span>
            <span style={{color:"var(--muted)"}}>{total} trials</span>
          </div>
          <div className="trials-bar-bg">
            <div className="trials-bar-fill" style={{width:`${pct}%`,background:pct>=80?"#26de81":pct>=60?"#FDCB6E":"#FF6B6B"}}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Intensity Zone ───────────────────────────────────────────────────────────
function IntensityZone({ behavior, logs, onLog, user, color }) {
  const levels = behavior.intensityConfig?.levels || [];
  const todayLogs = logs.filter(l => l.type === "intensity" && l.date === today());
  const total = levels.length;

  const avgLevel = todayLogs.length
    ? (todayLogs.reduce((s,l) => s + l.level, 0) / todayLogs.length).toFixed(1)
    : null;

  // Most recent intensity
  const lastEntry = todayLogs.length ? todayLogs[todayLogs.length - 1] : null;

  if (total === 0) {
    return (
      <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
        <div className="zone-label">INTENSITY</div>
        <div style={{color:"var(--muted)",fontSize:13,fontWeight:600,padding:"4px 0"}}>
          No intensity levels configured. An admin can set them up in Manage → Edit Behavior.
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-zone" style={{borderColor:color.border+"66"}}>
      <div className="zone-label">INTENSITY</div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {levels.map((lvl, i) => {
          const btnColor = intensityLevelColor(i, total);
          const btnBg = intensityLevelBg(i, total);
          const count = todayLogs.filter(l => l.level === lvl.level).length;
          const isLast = lastEntry?.level === lvl.level;
          return (
            <button
              key={lvl.level}
              className="intensity-level-btn"
              style={{
                background: count > 0 ? btnBg : "var(--surface2)",
                border: `2px solid ${count > 0 ? btnColor : "var(--border)"}`,
                outline: isLast ? `3px solid ${btnColor}` : "none",
                outlineOffset: isLast ? "1px" : "0",
              }}
              onClick={() => onLog({
                id: uid(), type: "intensity", date: today(), time: nowStr(),
                who: user.name, level: lvl.level, label: lvl.label, ts: ts()
              })}
            >
              <div className="intensity-level-num" style={{background:btnColor}}>
                {lvl.level}
              </div>
              <div style={{flex:1}}>
                <div className="intensity-level-label" style={{color:count>0?btnColor:"var(--text)"}}>{lvl.label}</div>
                {lvl.description && <div className="intensity-level-desc" style={{color:count>0?btnColor:"var(--muted)"}}>{lvl.description}</div>}
              </div>
              {count > 0 && (
                <span className="intensity-count-badge" style={{background:btnColor}}>
                  {count}×
                </span>
              )}
            </button>
          );
        })}
      </div>
      {todayLogs.length > 0 && (
        <div className="intensity-summary">
          <div className="intensity-summary-row">
            <span style={{color:"var(--muted)"}}>Recordings today</span>
            <strong style={{color:"var(--accent)",fontFamily:"'DM Mono',monospace"}}>{todayLogs.length}</strong>
          </div>
          <div className="intensity-summary-row" style={{marginTop:4}}>
            <span style={{color:"var(--muted)"}}>Avg intensity</span>
            <strong style={{color: intensityLevelColor(Math.round(parseFloat(avgLevel))-1, total), fontFamily:"'DM Mono',monospace"}}>{avgLevel} / {total}</strong>
          </div>
          {lastEntry && (
            <div className="intensity-summary-row" style={{marginTop:4}}>
              <span style={{color:"var(--muted)"}}>Last recorded</span>
              <strong style={{color:"var(--text)"}}>{lastEntry.label} ({lastEntry.time})</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BehaviorBlock({ behavior, bIndex, studentId, user, allLogs, onLog }) {
  const tr=useLang();
  const color=bColor(bIndex);
  const key=`${studentId}-${behavior.id}`;
  const bLogs=allLogs[key]||[];
  const recent=bLogs.slice(-3).reverse();
  const todayCount=bLogs.filter(l=>l.date===today()).length;
  const [showInfo,setShowInfo]=useState(false);
  function handleLog(entry){onLog(studentId,behavior.id,entry);}
  return (
    <div className="behavior-block" style={{borderColor:color.border,background:color.bg}}>
      <div className="behavior-header" style={{borderColor:color.border,background:color.bg}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <div className="behavior-name" style={{color:color.text}}>{behavior.name}</div>
            <button className="info-btn" onClick={e=>{e.stopPropagation();setShowInfo(true);}}>ℹ️</button>
          </div>
          <div className="behavior-types">{behavior.types.map(tp=><span key={tp} className={`type-badge type-${tp}`}>{tr.typeLabels[tp]||tp}</span>)}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:26,fontWeight:900,fontFamily:"'DM Mono',monospace",color:color.accent,lineHeight:1}}>{todayCount}</div>
          <div style={{fontSize:9,color:"var(--muted)",fontWeight:700}}>{tr.todayLabel}</div>
        </div>
      </div>
      {showInfo && <BehaviorInfoModal behavior={behavior} onClose={()=>setShowInfo(false)}/>}
      <div className="tracking-zones">
        {behavior.types.includes("frequency")&&<FrequencyZone logs={bLogs} onLog={handleLog} user={user} color={color}/>}
        {behavior.types.includes("duration")&&<DurationZone logs={bLogs} onLog={handleLog} user={user} color={color}/>}
        {behavior.types.includes("latency")&&<LatencyZone logs={bLogs} onLog={handleLog} user={user} color={color}/>}
        {behavior.types.includes("trials")&&<TrialsZone logs={bLogs} onLog={handleLog} user={user} color={color}/>}
        {behavior.types.includes("abc")&&<ABCZone logs={bLogs} onLog={handleLog} user={user} color={color}/>}
        {behavior.types.includes("intensity")&&<IntensityZone behavior={behavior} logs={bLogs} onLog={handleLog} user={user} color={color}/>}
      </div>
      {recent.length>0&&(
        <div className="behavior-logs" style={{borderTop:`2px solid ${color.border}`}}>
          <div className="logs-title">{tr.recentLogs}</div>
          {recent.map(l=>(
            <div key={l.id} className="log-item">
              <span className="log-time">{l.time}</span>
              <span className={`type-badge type-${l.type==="trial"?"trials":l.type}`}>{tr.typeLabels[l.type==="trial"?"trial":l.type]||l.type}</span>
              <span className="log-content">
                {l.type==="frequency"&&tr.recordedLabel}
                {l.type==="duration"&&fmt(l.value)}
                {l.type==="latency"&&`${tr.latLabel} ${fmt(l.value)}`}
                {l.type==="trial"&&tr.trialLabel(l.result)}
                {l.type==="abc"&&`A:${l.antecedent} C:${l.consequence}`}
                {l.type==="intensity"&&`Level ${l.level}: ${l.label}`}
                {" "}<span className="log-who">— {l.who}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GoalsSection({ student, allLogs, onLog }) {
  const t=useLang();
  if(!student.goals?.length) return null;
  return (
    <div className="goals-section">
      <div className="goals-section-title">{t.goalsTitle}</div>
      <div className="goals-section-sub">{t.goalsSub}</div>
      {student.goals.map(goal=>{
        const key=`${student.id}-goal-${goal.id}`;
        const logs=(allLogs[key]||[]).filter(l=>l.date===today());
        const correct=logs.filter(l=>l.result==="correct").length;
        const incorrect=logs.filter(l=>l.result==="incorrect").length;
        const total=correct+incorrect;
        const pct=total?Math.round((correct/total)*100):0;
        const barColor=pct>=goal.targetPct?"#26de81":pct>=goal.targetPct*.7?"#FDCB6E":"#FF6B6B";
        function record(result){onLog(student.id,`goal-${goal.id}`,{id:uid(),type:"trial",result,date:today(),time:nowStr(),who:"",ts:ts()});}
        return (
          <div key={goal.id} className="goal-card">
            <div className="goal-name">{goal.name}</div>
            <div className="goal-target">{t.goalTarget(goal.targetPct)}</div>
            <div className="goal-btn-row">
              <button className="goal-btn-correct" onClick={()=>record("correct")}>{t.correct}</button>
              <button className="goal-btn-incorrect" onClick={()=>record("incorrect")}>{t.incorrect}</button>
            </div>
            <div className="goal-stats">
              <span style={{color:"#059669"}}>✓ {correct}</span>
              <span style={{color:"var(--red)"}}>✗ {incorrect}</span>
              <span style={{fontFamily:"'DM Mono',monospace",color:pct>=goal.targetPct?"#059669":"var(--orange)"}}>{total>0?`${pct}%`:"—"}</span>
            </div>
            <div className="goal-bar-bg"><div className="goal-bar-fill" style={{width:`${Math.min(pct,100)}%`,background:barColor}}/></div>
            <div className="goal-today">{total>0?t.trialsToday(total,pct):t.noDataYet}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function StudentsPage({ user, allLogs, students, onSelect, onAddStudent }) {
  const t=useLang();
  const [search, setSearch] = useState("");
  const visible = user.role === "admin"
    ? students
    : students.filter(s => (user.assignedStudents||[]).includes(s.id));
  const filtered = visible.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="section-title">🏫 {t.students}</div>
      <div className="section-sub">{user.role==="admin" ? t.allStudents : t.yourStudents(visible.length)}</div>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder={t.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)}/>
        {search && <button className="search-clear" onClick={()=>setSearch("")}>✕</button>}
      </div>
      <div className="student-grid">
        {filtered.map(s=>{
          const todayTotal=s.behaviors.reduce((sum,b)=>sum+(allLogs[`${s.id}-${b.id}`]||[]).filter(l=>l.date===today()).length,0);
          return (
            <div key={s.id} className="student-card" style={{"--student-color":s.color}} onClick={()=>onSelect(s)}>
              {todayTotal>0&&<div className="today-count">🔥 {todayTotal}</div>}
              <div className="student-avatar">{s.avatar}</div>
              <div className="student-name">{s.name}</div>
              <div className="student-meta">{t.gradeLabel(s.grade)} · {t.behaviorsCount(s.behaviors.length)}</div>
              <div className="behavior-pills">
                {s.behaviors.map((b,i)=>{const c=bColor(i);return(
                  <span key={b.id} className="behavior-pill-colored" style={{background:c.bg,borderColor:c.border,color:c.text}}>{b.name}</span>
                );})}
              </div>
            </div>
          );
        })}
        {filtered.length===0&&(
          <div className="no-results" style={{gridColumn:"1/-1"}}>
            {search ? t.noStudentsSearch(search) : t.noStudentsAssigned}
          </div>
        )}
        {user.role==="admin"&&!search&&(
          <div className="add-student-card" onClick={onAddStudent}>
            <span style={{fontSize:30}}>➕</span><span>{t.addStudent}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentTrackPage({ student, user, allLogs, onLog, sessions, onReviewRequest, onBack }) {
  const t=useLang();
  const [showToast, setShowToast] = useState(true);
  const session = sessions[sessionKey(student.id, user.id)];
  useEffect(()=>{
    const t = setTimeout(()=>setShowToast(false), 3000);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div>
      {showToast && <Toast message={t.sessionToast}/>}
      <button className="back-btn" onClick={onBack}>{t.backStudents}</button>
      <div className="track-header">
        <div className="track-avatar">{student.avatar}</div>
        <div>
          <div className="track-name">{student.name}</div>
          <div className="track-meta">{t.gradeLabel(student.grade)} · {t.behaviorsCount(student.behaviors.length)}</div>
          <div className="track-strip" style={{background:student.color}}/>
        </div>
      </div>
      <SessionBanner session={session} onEndRequest={()=>onReviewRequest(student, user)}/>
      <div className="behaviors-list">
        {student.behaviors.map((b,i)=><BehaviorBlock key={b.id} behavior={b} bIndex={i} studentId={student.id} user={user} allLogs={allLogs} onLog={onLog}/>)}
        {student.behaviors.length===0&&<div style={{color:"var(--muted)",fontWeight:700,padding:20,background:"var(--surface)",borderRadius:14,textAlign:"center",fontSize:14}}>{t.noBehaviors}</div>}
        {student.goals?.length>0&&<GoalsSection student={student} allLogs={allLogs} onLog={onLog}/>}
      </div>
    </div>
  );
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────
function LineChart({ data, color }) {
  if (!data || data.length === 0) return <div className="graph-empty">Not enough data yet</div>;
  const vals = data.map(d => d.value);
  const maxV = Math.max(...vals, 1);
  const W = 300, H = 80, PAD = 4;
  const drawData = data.length === 1 ? [data[0], data[0]] : data;
  const pts = drawData.map((d, i) => {
    const x = PAD + (i / (drawData.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.value / maxV) * (H - PAD * 2));
    return `${x},${y}`;
  }).join(" ");
  const area = `M ${drawData.map((d,i)=>{
    const x=PAD+(i/(drawData.length-1))*(W-PAD*2);
    const y=H-PAD-((d.value/maxV)*(H-PAD*2));
    return `${x},${y}`;
  }).join(" L ")} L ${W-PAD},${H-PAD} L ${PAD},${H-PAD} Z`;
  return (
    <svg className="line-chart" viewBox={`0 0 ${W} ${H}`} style={{height:90}}>
      <defs>
        <linearGradient id={`g${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g${color.replace('#','')})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((d,i)=>{
        const dd = data.length === 1 ? [data[0],data[0]] : data;
        const x=PAD+(i/(dd.length-1))*(W-PAD*2);
        const y=H-PAD-((d.value/maxV)*(H-PAD*2));
        return d.value > 0 ? <circle key={i} cx={x} cy={y} r="4" fill={color}/> : null;
      })}
    </svg>
  );
}

// ─── Behavior Info Modal ──────────────────────────────────────────────────────
function BehaviorInfoModal({ behavior, onClose }) {
  const t=useLang();
  const lang=useContext(LangContext);
  const info = behavior.info || {};
  const strategies = info.strategies || [];
  const customResponses = info.customResponses || [];
  const notes = info.notes || "";
  const description = info.description || "";
  const allResponses = [...strategies.map(s=>translateStrategy(s,lang)), ...customResponses];
  const levels = behavior.intensityConfig?.levels || [];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">ℹ️ {behavior.name}</div>
        {description && (
          <>
            <div style={{fontSize:12,fontWeight:800,color:"var(--muted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{t.description}</div>
            <div className="info-notes" style={{marginBottom:12}}>{description}</div>
          </>
        )}
        {levels.length > 0 && (
          <>
            <div style={{fontSize:12,fontWeight:800,color:"#92400E",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>🌡 INTENSITY SCALE ({levels.length} levels)</div>
            <div style={{marginBottom:12}}>
              {levels.map((lvl,i)=>(
                <div key={lvl.level} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6,padding:"8px 10px",borderRadius:10,background:intensityLevelBg(i,levels.length),border:`1.5px solid ${intensityLevelColor(i,levels.length)}44`}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:intensityLevelColor(i,levels.length),color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,flexShrink:0}}>{lvl.level}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:intensityLevelColor(i,levels.length)}}>{lvl.label}</div>
                    {lvl.description&&<div style={{fontSize:11,fontWeight:600,color:"var(--muted)",marginTop:2}}>{lvl.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {allResponses.length > 0 && (
          <>
            <div style={{fontSize:12,fontWeight:800,color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>RESPONSE STRATEGIES</div>
            <ul style={{paddingLeft:18,margin:"0 0 12px"}}>
              {allResponses.map((s,i)=><li key={i} style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:5,lineHeight:1.4}}>{s}</li>)}
            </ul>
          </>
        )}
        {notes && (
          <>
            <div style={{fontSize:12,fontWeight:800,color:"var(--muted)",margin:"4px 0 6px",textTransform:"uppercase",letterSpacing:.5}}>{t.notes}</div>
            <div className="info-notes">{notes}</div>
          </>
        )}
        {!description && !allResponses.length && !notes && levels.length === 0 && (
          <div style={{color:"var(--muted)",fontSize:14,fontWeight:600,padding:"16px 0"}}>{t.noInfo}</div>
        )}
        <button className="btn-primary full" style={{marginTop:20}} onClick={onClose}>{t.close}</button>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────
function ReportsPage({ allLogs, students, sessions, user }) {
  const t=useLang();
  const [selected, setSelected] = useState(null);
  const [range, setRange] = useState(30);
  const visible = user.role==="admin" ? students : students.filter(s=>(user.assignedStudents||[]).includes(s.id));

  function dateVariants(d) {
    const variants = new Set();
    variants.add(d.toLocaleDateString());
    variants.add(d.toLocaleDateString("en-US"));
    variants.add(d.toLocaleDateString("en-GB"));
    const m=d.getMonth()+1, dy=d.getDate(), y=d.getFullYear();
    variants.add(`${m}/${dy}/${y}`);
    variants.add(`${dy}/${m}/${y}`);
    variants.add(`${String(m).padStart(2,"0")}/${String(dy).padStart(2,"0")}/${y}`);
    variants.add(`${y}-${String(m).padStart(2,"0")}-${String(dy).padStart(2,"0")}`);
    return variants;
  }
  function logsForDay(logs, d) {
    const v = dateVariants(d);
    return logs.filter(l => v.has(l.date));
  }

  function buildGraphData(studentId, behaviorId, days) {
    const logs = allLogs[`${studentId}-${behaviorId}`] || [];
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const shortLabel = `${d.getMonth()+1}/${d.getDate()}`;
      const matchingLogs = logsForDay(logs, d);
      const count = matchingLogs.filter(l => l.type === "frequency").length;
      const durations = matchingLogs.filter(l => l.type === "duration").map(l => l.value);
      const avgDur = durations.length ? Math.round(durations.reduce((a,b)=>a+b,0)/durations.length/1000) : 0;
      const hasData = count > 0 || avgDur > 0;
      result.push({ label: shortLabel, value: hasData ? (count || avgDur) : 0, hasData });
    }
    return result;
  }

  function buildIntensityGraphData(studentId, behaviorId, days) {
    const logs = allLogs[`${studentId}-${behaviorId}`] || [];
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const shortLabel = `${d.getMonth()+1}/${d.getDate()}`;
      const dayLogs = logsForDay(logs, d).filter(l => l.type === "intensity");
      const avg = dayLogs.length ? dayLogs.reduce((s,l)=>s+l.level,0)/dayLogs.length : 0;
      result.push({ label: shortLabel, value: parseFloat(avg.toFixed(1)), hasData: dayLogs.length > 0 });
    }
    return result;
  }

  function exportCSV(student) {
    const rows=[["Date","Time","Behavior","Behavior ID","Type","Details","By","Status"]];
    // Active behaviors
    const activeBehIds = new Set(student.behaviors.map(b=>`${student.id}-${b.id}`));
    student.behaviors.forEach(b=>{
      (allLogs[`${student.id}-${b.id}`]||[]).forEach(l=>{
        let d=l.type==="frequency"?"1":l.type==="duration"?fmt(l.value):l.type==="latency"?fmt(l.value):l.type==="trial"?l.result:l.type==="intensity"?`Level ${l.level}: ${l.label}`:`A:${l.antecedent}|B:${l.behavior}|C:${l.consequence}${l.note?"|Note:"+l.note:""}`;
        rows.push([l.date,l.time,b.name,b.id,l.type,d,l.who,"active"]);
      });
    });
    // Goals
    (student.goals||[]).forEach(g=>{
      (allLogs[`${student.id}-goal-${g.id}`]||[]).forEach(l=>{rows.push([l.date,l.time,g.name,g.id,"goal",l.result,l.who||"—","active"]);});
    });
    // Orphaned logs — keys that start with this student's ID but don't match any current behavior or goal
    const activeGoalIds = new Set((student.goals||[]).map(g=>`${student.id}-goal-${g.id}`));
    Object.keys(allLogs).forEach(key=>{
      if(!key.startsWith(student.id+"-")) return;
      if(activeBehIds.has(key)||activeGoalIds.has(key)) return;
      // This is an orphaned key
      const orphanBehId = key.replace(student.id+"-","");
      (allLogs[key]||[]).forEach(l=>{
        let d=l.type==="frequency"?"1":l.type==="duration"?fmt(l.value):l.type==="latency"?fmt(l.value):l.type==="trial"?l.result:l.type==="intensity"?`Level ${l.level}: ${l.label}`:`A:${l.antecedent}|B:${l.behavior}|C:${l.consequence}${l.note?"|Note:"+l.note:""}`;
        rows.push([l.date,l.time,`[Removed Behavior]`,orphanBehId,l.type,d,l.who||"—","orphaned"]);
      });
    });
    const csv=rows.map(r=>r.map(v=>`"${String(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=`${student.name.replace(/ /g,"_")}_ALL_data.csv`;a.click();
  }

  function FreqTable({ logs, days }) {
    const today2 = new Date(); today2.setHours(12,0,0,0);
    const rows = [];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      const dayLogs=logsForDay(logs,d).filter(l=>l.type==="frequency");
      if(dayLogs.length>0) rows.push({date:`${d.getMonth()+1}/${d.getDate()}`,count:dayLogs.length,by:[...new Set(dayLogs.map(l=>l.who))].join(", ")});
    }
    if(!rows.length) return null;
    const total=rows.reduce((s,r)=>s+r.count,0);
    const peak=rows.reduce((mx,r)=>r.count>mx.count?r:mx,rows[0]);
    return (
      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📋 Frequency Data</div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Count</th><th>Logged by</th></tr></thead>
          <tbody>{rows.map((r,i)=><tr key={i}><td>{r.date}</td><td className="num">{r.count}</td><td style={{color:"var(--muted)",fontSize:11}}>{r.by||"—"}</td></tr>)}</tbody>
        </table>
        <div style={{display:"flex",gap:14,marginTop:8,flexWrap:"wrap"}}>
          <span style={{fontSize:11,fontWeight:700,color:"var(--muted)"}}>Total: <strong style={{color:"var(--accent)"}}>{total}</strong></span>
          <span style={{fontSize:11,fontWeight:700,color:"var(--muted)"}}>Avg/day: <strong style={{color:"var(--accent)"}}>{(total/days).toFixed(1)}</strong></span>
          <span style={{fontSize:11,fontWeight:700,color:"var(--muted)"}}>Peak: <strong style={{color:"var(--accent)"}}>{peak.date} ({peak.count})</strong></span>
        </div>
      </div>
    );
  }

  function DurTable({ logs, days }) {
    const today2 = new Date(); today2.setHours(12,0,0,0);
    const rows = [];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      const dayLogs=logsForDay(logs,d).filter(l=>l.type==="duration");
      if(dayLogs.length>0){
        const avg=Math.round(dayLogs.reduce((s,l)=>s+l.value,0)/dayLogs.length);
        rows.push({date:`${d.getMonth()+1}/${d.getDate()}`,episodes:dayLogs.length,avg:fmt(avg),total:fmt(dayLogs.reduce((s,l)=>s+l.value,0))});
      }
    }
    if(!rows.length) return null;
    return (
      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📋 Duration Data</div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Episodes</th><th>Avg</th><th>Total</th></tr></thead>
          <tbody>{rows.map((r,i)=><tr key={i}><td>{r.date}</td><td className="num">{r.episodes}</td><td className="num">{r.avg}</td><td className="num">{r.total}</td></tr>)}</tbody>
        </table>
      </div>
    );
  }

  function ABCTable({ logs, days }) {
    const today2 = new Date(); today2.setHours(12,0,0,0);
    const abcLogs = [];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      logsForDay(logs,d).filter(l=>l.type==="abc").forEach(l=>abcLogs.push({...l,shortDate:`${d.getMonth()+1}/${d.getDate()}`}));
    }
    if(!abcLogs.length) return null;
    const antCount={}, conCount={};
    abcLogs.forEach(l=>{antCount[l.antecedent]=(antCount[l.antecedent]||0)+1;conCount[l.consequence]=(conCount[l.consequence]||0)+1;});
    const topAnts=Object.entries(antCount).sort((a,b)=>b[1]-a[1]).slice(0,4);
    const topCons=Object.entries(conCount).sort((a,b)=>b[1]-a[1]).slice(0,4);
    return (
      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📋 ABC Summary ({abcLogs.length} entries)</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:130}}>
            <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",marginBottom:4,textTransform:"uppercase"}}>Top Antecedents</div>
            <table className="data-table"><thead><tr><th>Antecedent</th><th>#</th></tr></thead><tbody>{topAnts.map(([k,v],i)=><tr key={i}><td style={{fontSize:11}}>{k}</td><td className="num">{v}</td></tr>)}</tbody></table>
          </div>
          <div style={{flex:1,minWidth:130}}>
            <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",marginBottom:4,textTransform:"uppercase"}}>Top Consequences</div>
            <table className="data-table"><thead><tr><th>Consequence</th><th>#</th></tr></thead><tbody>{topCons.map(([k,v],i)=><tr key={i}><td style={{fontSize:11}}>{k}</td><td className="num">{v}</td></tr>)}</tbody></table>
          </div>
        </div>
      </div>
    );
  }

  function IntensityTable({ logs, behavior, days }) {
    const levels = behavior.intensityConfig?.levels || [];
    const today2 = new Date(); today2.setHours(12,0,0,0);
    const rows = [];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      const dayLogs=logsForDay(logs,d).filter(l=>l.type==="intensity");
      if(dayLogs.length>0){
        const avg=(dayLogs.reduce((s,l)=>s+l.level,0)/dayLogs.length).toFixed(1);
        const peak=dayLogs.reduce((mx,l)=>l.level>mx?l.level:mx,0);
        rows.push({date:`${d.getMonth()+1}/${d.getDate()}`,count:dayLogs.length,avg,peak,by:[...new Set(dayLogs.map(l=>l.who))].join(", ")});
      }
    }
    if(!rows.length) return null;

    // Level distribution
    const levelCounts = {};
    rows.forEach(r=>{}); // already counted above
    const allIntLogs = [];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      logsForDay(logs,d).filter(l=>l.type==="intensity").forEach(l=>allIntLogs.push(l));
    }
    if(!allIntLogs.length) return null;
    const totalInt = allIntLogs.length;
    const overallAvg = (allIntLogs.reduce((s,l)=>s+l.level,0)/totalInt).toFixed(1);
    const levelDist = levels.map((lvl,i)=>{
      const cnt = allIntLogs.filter(l=>l.level===lvl.level).length;
      return {level:lvl.level, label:lvl.label, count:cnt, pct:Math.round((cnt/totalInt)*100), color:intensityLevelColor(i,levels.length)};
    }).filter(r=>r.count>0);

    return (
      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:800,color:"#92400E",textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>🌡 Intensity Data ({totalInt} recordings)</div>
        {/* Distribution */}
        <div style={{background:"#FEF3C7",borderRadius:10,padding:"10px 12px",marginBottom:10,border:"1.5px solid #FDE68A"}}>
          <div style={{fontSize:10,fontWeight:800,color:"#92400E",marginBottom:6,textTransform:"uppercase"}}>Level Distribution</div>
          {levelDist.map(r=>(
            <div key={r.level} style={{marginBottom:5}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:700,marginBottom:2}}>
                <span style={{color:r.color}}>{r.level}. {r.label}</span>
                <span style={{color:"var(--muted)"}}>{r.count}× ({r.pct}%)</span>
              </div>
              <div style={{background:"var(--border)",borderRadius:20,height:6,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:20,background:r.color,width:`${r.pct}%`,transition:"width .4s"}}/>
              </div>
            </div>
          ))}
          <div style={{fontSize:11,fontWeight:800,color:"#92400E",marginTop:8}}>
            Overall avg: <strong style={{fontFamily:"'DM Mono',monospace"}}>{overallAvg}</strong> / {levels.length}
          </div>
        </div>
        {/* Daily table */}
        <table className="data-table">
          <thead><tr><th>Date</th><th>Recordings</th><th>Avg Level</th><th>Peak</th></tr></thead>
          <tbody>{rows.map((r,i)=><tr key={i}><td>{r.date}</td><td className="num">{r.count}</td><td className="num" style={{color:"#92400E"}}>{r.avg}</td><td className="num" style={{color:"var(--red)"}}>{r.peak}</td></tr>)}</tbody>
        </table>
      </div>
    );
  }

  function GoalTable({ logs, goal, days }) {
    const today2 = new Date(); today2.setHours(12,0,0,0);
    const rows=[];
    for(let i=days-1;i>=0;i--){
      const d=new Date(today2);d.setDate(today2.getDate()-i);
      const dayLogs=logsForDay(logs,d);
      if(dayLogs.length>0){
        const c=dayLogs.filter(l=>l.result==="correct").length;
        const tot=dayLogs.length;
        rows.push({date:`${d.getMonth()+1}/${d.getDate()}`,correct:c,incorrect:tot-c,pct:Math.round((c/tot)*100)});
      }
    }
    if(!rows.length) return null;
    const allC=rows.reduce((s,r)=>s+r.correct,0), allT=rows.reduce((s,r)=>s+r.correct+r.incorrect,0);
    return (
      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📋 Goal Data</div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>✓</th><th>✗</th><th>%</th></tr></thead>
          <tbody>{rows.map((r,i)=><tr key={i}><td>{r.date}</td><td className="num" style={{color:"#059669"}}>{r.correct}</td><td className="num" style={{color:"var(--red)"}}>{r.incorrect}</td><td className="num" style={{color:r.pct>=goal.targetPct?"#059669":"var(--orange)"}}>{r.pct}%</td></tr>)}</tbody>
        </table>
        <div style={{display:"flex",gap:14,marginTop:8}}>
          <span style={{fontSize:11,fontWeight:700,color:"var(--muted)"}}>Overall: <strong style={{color:allT?Math.round((allC/allT)*100)>=goal.targetPct?"#059669":"var(--orange)":"var(--muted)"}}>{allT?`${Math.round((allC/allT)*100)}%`:"—"}</strong></span>
          <span style={{fontSize:11,fontWeight:700,color:"var(--muted)"}}>Target: <strong style={{color:"#9A7B00"}}>{goal.targetPct}%</strong></span>
        </div>
      </div>
    );
  }

  if (selected) {
    const s = selected;
    return (
      <div>
        <button className="back-btn" onClick={()=>setSelected(null)}>{t.backReports}</button>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:14,borderBottom:"2px solid var(--border)"}}>
          <span style={{fontSize:36}}>{s.avatar}</span>
          <div>
            <div style={{fontSize:20,fontWeight:900}}>{s.name}</div>
            <div style={{fontSize:12,color:"var(--muted)",fontWeight:600}}>{t.gradeLabel(s.grade)}</div>
          </div>
          <button className="export-btn" style={{marginLeft:"auto",marginTop:0,width:"auto",padding:"8px 14px"}} onClick={()=>exportCSV(s)}>{t.exportCsv}</button>
        </div>
        <div className="graph-range-row">
          {[7,14,30].map(r=><button key={r} className={`graph-range-btn ${range===r?"active":""}`} onClick={()=>setRange(r)}>{r} {t.lastDays(r).replace(/\d+\s*/,"")}</button>)}
        </div>

        {s.behaviors.map((b,i)=>{
          const c = bColor(i);
          const allBLogs = allLogs[`${s.id}-${b.id}`] || [];
          const hasFreq = b.types.includes("frequency");
          const hasDur = b.types.includes("duration");
          const hasABC = b.types.includes("abc");
          const hasIntensity = b.types.includes("intensity");

          const data = buildGraphData(s.id, b.id, range);
          const intensityData = hasIntensity ? buildIntensityGraphData(s.id, b.id, range) : [];
          const hasAnyFreqDur = data.some(d=>d.value>0);
          const hasAnyIntensity = intensityData.some(d=>d.value>0);
          const total = data.reduce((sum,d)=>sum+d.value,0);
          const xLabels = data.length > 0 ? [data[0].label, data[Math.floor(data.length/2)].label, data[data.length-1].label] : [];
          const xLabelsInt = intensityData.length > 0 ? [intensityData[0].label, intensityData[Math.floor(intensityData.length/2)].label, intensityData[intensityData.length-1].label] : [];

          return (
            <div key={b.id} className="graph-section" style={{borderColor:c.border}}>
              <div className="graph-title" style={{color:c.text}}>{b.name}</div>
              <div className="graph-meta">
                {hasFreq && t.occurrences(total)}
                {hasDur && !hasFreq && t.durationTracked}
                {hasIntensity && ` · 🌡 Intensity tracked`}
                {" · "}{t.lastDays(range)}
              </div>

              {/* Frequency/Duration chart */}
              {(hasFreq || hasDur) && (
                hasAnyFreqDur ? (
                  <div className="chart-wrap">
                    <LineChart data={data} color={c.accent}/>
                    <div className="chart-x-labels">{xLabels.map((l,i)=><span key={i} className="chart-x-label">{l}</span>)}</div>
                  </div>
                ) : <div className="graph-empty">{t.noDataPeriod}</div>
              )}

              {/* Intensity chart */}
              {hasIntensity && (
                <>
                  {(hasFreq || hasDur) && <div style={{fontSize:11,fontWeight:800,color:"#92400E",textTransform:"uppercase",letterSpacing:.5,marginTop:14,marginBottom:6}}>🌡 Avg Intensity Over Time</div>}
                  {hasAnyIntensity ? (
                    <div className="chart-wrap">
                      <LineChart data={intensityData} color="#D97706"/>
                      <div className="chart-x-labels">{xLabelsInt.map((l,i)=><span key={i} className="chart-x-label">{l}</span>)}</div>
                    </div>
                  ) : (
                    <div className="graph-empty" style={{color:"#92400E"}}>No intensity data in this period</div>
                  )}
                </>
              )}

              {hasFreq && <FreqTable logs={allBLogs} days={range}/>}
              {hasDur && <DurTable logs={allBLogs} days={range}/>}
              {hasIntensity && <IntensityTable logs={allBLogs} behavior={b} days={range}/>}
              {hasABC && <ABCTable logs={allBLogs} days={range}/>}
            </div>
          );
        })}

        {s.goals?.length>0&&s.goals.map(g=>{
          const gLogs=(allLogs[`${s.id}-goal-${g.id}`]||[]);
          const today2 = new Date(); today2.setHours(12,0,0,0);
          const data = [];
          for(let i=range-1;i>=0;i--){
            const d=new Date(today2);d.setDate(today2.getDate()-i);
            const dayLogs=logsForDay(gLogs,d);
            const c=dayLogs.filter(l=>l.result==="correct").length;
            const tot=dayLogs.length;
            data.push({label:`${d.getMonth()+1}/${d.getDate()}`,value:tot?Math.round((c/tot)*100):0,hasData:tot>0});
          }
          const xLabels = data.length > 0 ? [data[0].label, data[Math.floor(data.length/2)].label, data[data.length-1].label] : [];
          return (
            <div key={g.id} className="graph-section" style={{borderColor:"#FDCB6E"}}>
              <div className="graph-title" style={{color:"#9A7B00"}}>🎯 {g.name}</div>
              <div className="graph-meta">Target: {g.targetPct}% · {t.lastDays(range)}</div>
              {data.some(d=>d.value>0) ? (
                <div className="chart-wrap">
                  <LineChart data={data} color="#FDCB6E"/>
                  <div className="chart-x-labels">{xLabels.map((l,i)=><span key={i} className="chart-x-label">{l}</span>)}</div>
                </div>
              ) : <div className="graph-empty">{t.noDataPeriod}</div>}
              <GoalTable logs={gLogs} goal={g} days={range}/>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">{t.reportsTitle}</div>
      <div className="section-sub">{t.reportsSub}</div>
      {visible.map(s=>{
        const tot=s.behaviors.reduce((sum,b)=>sum+(allLogs[`${s.id}-${b.id}`]||[]).filter(l=>l.date===today()).length,0);
        return (
          <div key={s.id} className="report-student-row" style={{borderTopColor:s.color,borderTopWidth:4}} onClick={()=>setSelected(s)}>
            <span style={{fontSize:32}}>{s.avatar}</span>
            <div className="report-student-row-left">
              <div className="report-student-row-name">{s.name}</div>
              <div className="report-student-row-meta">{t.gradeLabel(s.grade)} · {t.behaviorsCount(s.behaviors.length)}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div className="report-student-row-today">{tot > 0 ? `🔥 ${tot} ${t.todayLabel}` : ""}</div>
              <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginTop:2}}>{t.viewGraphs}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Data Recovery Page ───────────────────────────────────────────────────────
function DataRecoveryPage({ students, allLogs, onMerge }) {
  const [assignTargets, setAssignTargets] = useState({});
  const [merged, setMerged] = useState({});

  const orphansByStudent = [];
  students.forEach(s => {
    const activeBehKeys = new Set(s.behaviors.map(b => `${s.id}-${b.id}`));
    const activeGoalKeys = new Set((s.goals||[]).map(g => `${s.id}-goal-${g.id}`));
    const orphanKeys = Object.keys(allLogs).filter(key => {
      if (!key.startsWith(s.id + "-")) return false;
      if (activeBehKeys.has(key) || activeGoalKeys.has(key)) return false;
      if ((allLogs[key]||[]).length === 0) return false;
      return true;
    });
    if (orphanKeys.length > 0) orphansByStudent.push({ student: s, orphanKeys });
  });

  function formatLogEntry(l) {
    if (l.type === "frequency") return "Frequency recorded";
    if (l.type === "duration") return `Duration: ${fmt(l.value)}`;
    if (l.type === "latency") return `Latency: ${fmt(l.value)}`;
    if (l.type === "trial") return `Trial: ${l.result}`;
    if (l.type === "intensity") return `Intensity Level ${l.level}: ${l.label}`;
    if (l.type === "abc") return `A: ${l.antecedent} → C: ${l.consequence}`;
    return l.type;
  }

  function handleMerge(student, orphanKey, targetBehId) {
    if (!targetBehId) return;
    const targetKey = `${student.id}-${targetBehId}`;
    onMerge(orphanKey, targetKey);
    setMerged(p => ({ ...p, [orphanKey]: true }));
  }

  function exportSingleCSV(student, orphanKey, logs) {
    const behId = orphanKey.replace(student.id + "-", "");
    const rows = [["Date","Time","Type","Details","By"]];
    logs.forEach(l => rows.push([l.date, l.time, l.type, formatLogEntry(l), l.who||"—"]));
    const csv = rows.map(r => r.map(v => `"${String(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
    a.download = `${student.name.replace(/ /g,"_")}_${behId}.csv`;
    a.click();
  }

  function exportAllOrphansCSV(student, orphanKeys) {
    const rows = [["Date","Time","Orphaned Behavior ID","Type","Details","By"]];
    orphanKeys.forEach(key => {
      const behId = key.replace(student.id + "-", "");
      (allLogs[key]||[]).forEach(l => rows.push([l.date, l.time, behId, l.type, formatLogEntry(l), l.who||"—"]));
    });
    const csv = rows.map(r => r.map(v => `"${String(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
    a.download = `${student.name.replace(/ /g,"_")}_recovered_data.csv`;
    a.click();
  }

  if (orphansByStudent.length === 0) {
    return (
      <div>
        <div className="recovery-banner">
          <div className="recovery-banner-title">🗂 Data Recovery</div>
          <div className="recovery-banner-sub">Finds data from behaviors that were removed from a student's profile. You can merge it into a current behavior or export it as CSV.</div>
        </div>
        <div className="recovery-empty">✅ No orphaned data found — all logs are linked to active behaviors.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="recovery-banner">
        <div className="recovery-banner-title">🗂 Data Recovery</div>
        <div className="recovery-banner-sub">
          Found data from <strong>{orphansByStudent.reduce((s,o)=>s+o.orphanKeys.length,0)} removed behavior{orphansByStudent.reduce((s,o)=>s+o.orphanKeys.length,0)!==1?"s":""}</strong> across {orphansByStudent.length} student{orphansByStudent.length!==1?"s":""}. Merge into a current behavior or export as CSV. This data will not be deleted unless you choose to.
        </div>
      </div>

      {orphansByStudent.map(({ student, orphanKeys }) => (
        <div key={student.id} className="orphan-student-block">
          <div className="orphan-student-header">
            <span style={{fontSize:28}}>{student.avatar}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:900,fontSize:16}}>{student.name}</div>
              <div style={{fontSize:11,color:"var(--muted)",fontWeight:600}}>Grade {student.grade} · {orphanKeys.length} removed behavior set{orphanKeys.length!==1?"s":""}</div>
            </div>
            <button className="btn-recover" onClick={()=>exportAllOrphansCSV(student, orphanKeys)}>↓ Export All</button>
          </div>

          {orphanKeys.map(orphanKey => {
            if (merged[orphanKey]) return (
              <div key={orphanKey} className="orphan-key-block" style={{background:"#E8FFF4",borderColor:"#A8E6B8"}}>
                <div style={{color:"#059669",fontWeight:800,fontSize:13}}>✅ Merged successfully into current behavior</div>
              </div>
            );
            const logs = allLogs[orphanKey] || [];
            const behId = orphanKey.replace(student.id + "-", "");
            const dateSet = [...new Set(logs.map(l=>l.date))];
            const types = [...new Set(logs.map(l=>l.type))];
            const preview = logs.slice(-5).reverse();
            const target = assignTargets[orphanKey] || "";

            return (
              <div key={orphanKey} className="orphan-key-block">
                <div className="orphan-key-title">
                  <span>⚠️ Removed behavior <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,opacity:.8}}>{behId}</span></span>
                  <span style={{color:"var(--accent)",fontWeight:800,fontSize:12}}>{logs.length} entries · {dateSet.length} day{dateSet.length!==1?"s":""}</span>
                </div>
                <div style={{fontSize:11,color:"#B45309",fontWeight:600,marginBottom:8}}>
                  Types tracked: {types.join(", ")} &nbsp;·&nbsp; Dates: {dateSet.slice(0,3).join(", ")}{dateSet.length>3?` +${dateSet.length-3} more`:""}
                </div>
                {/* Recent entries preview */}
                <div style={{marginBottom:10}}>
                  {preview.map((l,i) => (
                    <div key={i} className="orphan-log-row">
                      <span style={{color:"var(--accent)",fontFamily:"'DM Mono',monospace",fontSize:10,whiteSpace:"nowrap"}}>{l.date} {l.time}</span>
                      <span style={{background:"#FEF3C7",color:"#92400E",borderRadius:20,padding:"1px 7px",fontSize:10,fontWeight:800,flexShrink:0}}>{l.type}</span>
                      <span style={{flex:1,fontSize:11}}>{formatLogEntry(l)}</span>
                      <span style={{color:"var(--orange)",fontSize:10,flexShrink:0,whiteSpace:"nowrap"}}>{l.who}</span>
                    </div>
                  ))}
                  {logs.length > 5 && <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginTop:4}}>+{logs.length-5} more entries…</div>}
                </div>
                {/* Merge / export actions */}
                <div className="orphan-actions">
                  {student.behaviors.length > 0 ? (
                    <>
                      <select className="assign-target-select" value={target} onChange={e=>setAssignTargets(p=>({...p,[orphanKey]:e.target.value}))}>
                        <option value="">Merge into current behavior…</option>
                        {student.behaviors.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                      <button className="btn-assign-confirm" disabled={!target} style={{opacity:target?1:.4}} onClick={()=>handleMerge(student,orphanKey,target)}>
                        Merge ✓
                      </button>
                    </>
                  ) : (
                    <span style={{fontSize:12,color:"var(--muted)",fontWeight:600}}>No current behaviors to merge into — add one first.</span>
                  )}
                  <button className="btn-recover" onClick={()=>exportSingleCSV(student,orphanKey,logs)}>↓ CSV</button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Admin Modals ─────────────────────────────────────────────────────────────
function TypeToggle({type,active,onToggle}){
  const map={frequency:"f",duration:"d",latency:"l",abc:"a",trials:"t",intensity:"i"};
  return <button className={`type-toggle ${active?`on-${map[type]}`:""}`} onClick={()=>onToggle(type)}>{type}</button>;
}

// ─── Intensity Config UI ──────────────────────────────────────────────────────
function IntensityConfigEditor({ config, onChange }) {
  const levels = config?.levels || defaultIntensityLevels(3);
  const n = levels.length;

  function setNumLevels(newN) {
    const existing = levels;
    const newLevels = Array.from({length:newN},(_,i)=>existing[i]||{level:i+1,label:defaultIntensityLevels(newN)[i]?.label||`Level ${i+1}`,description:""});
    onChange({levels:newLevels});
  }
  function updateLevel(i, field, val) {
    const newLevels = levels.map((lvl,idx)=>idx===i?{...lvl,[field]:val}:lvl);
    onChange({levels:newLevels});
  }

  return (
    <div className="intensity-config-box">
      <div className="intensity-config-title">🌡 Intensity Scale Configuration</div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <span style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>Number of levels:</span>
        <select className="intensity-num-select" value={n} onChange={e=>setNumLevels(parseInt(e.target.value))}>
          {[2,3,4,5,6,7,8,9,10].map(x=><option key={x} value={x}>{x} levels</option>)}
        </select>
      </div>
      <div style={{fontSize:11,color:"#92400E",fontWeight:600,marginBottom:10}}>
        Set a label and optional description for each level. Level 1 = lowest, Level {n} = highest.
      </div>
      {levels.map((lvl, i) => {
        const c = intensityLevelColor(i, n);
        const bg = intensityLevelBg(i, n);
        return (
          <div key={lvl.level} style={{marginBottom:8}}>
            <div className="intensity-config-row">
              <div className="intensity-level-circle" style={{background:c}}>{lvl.level}</div>
              <input
                className="intensity-config-input"
                placeholder={`Level ${lvl.level} label (e.g. Mild)`}
                value={lvl.label}
                onChange={e=>updateLevel(i,"label",e.target.value)}
                style={{borderColor: lvl.label ? `${c}66` : "var(--border)"}}
              />
            </div>
            <input
              className="intensity-config-desc"
              placeholder={`Description for Level ${lvl.level} (optional, shown to staff)`}
              value={lvl.description||""}
              onChange={e=>updateLevel(i,"description",e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
}

function AddBehaviorModal({onSave,onClose,existing}){
  const t=useLang();
  const lang=useContext(LangContext);
  const [name,setName]=useState(existing?.name||"");
  const [types,setTypes]=useState(existing?.types||["frequency"]);
  const [description,setDescription]=useState(existing?.info?.description||"");
  const [customResponses,setCustomResponses]=useState(existing?.info?.customResponses||[]);
  const [newResponse,setNewResponse]=useState("");
  const [strategies,setStrategies]=useState(existing?.info?.strategies||[]);
  const [notes,setNotes]=useState(existing?.info?.notes||"");
  const [intensityConfig,setIntensityConfig]=useState(
    existing?.intensityConfig || {levels:defaultIntensityLevels(3)}
  );

  function toggle(tp){setTypes(p=>p.includes(tp)?p.filter(x=>x!==tp):[...p,tp]);}
  function toggleStrategy(s){setStrategies(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]);}

  function handleSave() {
    if(!name.trim()||!types.length)return;
    onSave({
      id:existing?.id||uid(),
      name:name.trim(),
      types,
      info:{description,strategies,customResponses,notes},
      intensityConfig: types.includes("intensity") ? intensityConfig : undefined,
    });
  }

  return(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{existing?"Edit Behavior":t.addBehavior}</div>
        <label className="form-label">{t.behaviorName}</label>
        <input className="form-input" placeholder={t.behaviorNamePlaceholder} value={name} onChange={e=>setName(e.target.value)} autoFocus/>
        <label className="form-label">{t.trackingTypes}</label>
        <div className="type-toggle-row">{TRACK_TYPES.map(tp=><TypeToggle key={tp} type={tp} active={types.includes(tp)} onToggle={toggle}/>)}</div>

        {/* Intensity configuration — shown only when intensity is selected */}
        {types.includes("intensity") && (
          <div style={{marginTop:10,marginBottom:4}}>
            <IntensityConfigEditor config={intensityConfig} onChange={setIntensityConfig}/>
          </div>
        )}

        <label className="form-label" style={{marginTop:8}}>{t.behaviorDesc}</label>
        <textarea className="form-input" placeholder={t.behaviorDescPlaceholder} value={description} onChange={e=>setDescription(e.target.value)} rows={2} style={{resize:"none"}}/>
        <label className="form-label">{t.responseStrategies||"Response Strategies"}</label>
        <div className="strategy-toggle-grid">
          {getStrategies(lang).map((s,i)=>{ const enKey=lang==="es"?RESPONSE_STRATEGIES_EN[i]:s; return <button key={enKey} className={`strategy-toggle ${strategies.includes(enKey)?"on":""}`} onClick={()=>toggleStrategy(enKey)}>{s}</button>; })}
        </div>
        <label className="form-label">{t.customSteps}</label>
        {customResponses.map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{fontSize:13,color:"var(--muted)",fontWeight:700,flexShrink:0}}>•</span>
            <span style={{flex:1,fontSize:13,fontWeight:600,color:"var(--text)"}}>{r}</span>
            <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--red)",fontSize:14,fontWeight:900,padding:"0 4px"}} onClick={()=>setCustomResponses(p=>p.filter((_,j)=>j!==i))}>✕</button>
          </div>
        ))}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          <input className="form-input" style={{flex:1,marginBottom:0}} placeholder={t.addStep} value={newResponse} onChange={e=>setNewResponse(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newResponse.trim()){setCustomResponses(p=>[...p,newResponse.trim()]);setNewResponse("");}}}/>
          <button className="btn-secondary" style={{flexShrink:0,padding:"10px 12px"}} onClick={()=>{if(newResponse.trim()){setCustomResponses(p=>[...p,newResponse.trim()]);setNewResponse("");}}}>{t.addBtn}</button>
        </div>
        <label className="form-label">{t.additionalNotes}</label>
        <textarea className="form-input" placeholder={t.notesTextPlaceholder} value={notes} onChange={e=>setNotes(e.target.value)} rows={3} style={{resize:"none"}}/>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>{t.cancelBtn}</button>
          <button className="btn-primary" onClick={handleSave} style={{margin:0}}>{existing?t.saveBtn:t.addBehavior.replace("+ ","")}</button>
        </div>
      </div>
    </div>
  );
}

function AddGoalModal({onSave,onClose}){
  const t=useLang();
  const [name,setName]=useState("");const [target,setTarget]=useState(80);
  return(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{t.addGoal}</div>
        <label className="form-label">{t.goalDesc}</label>
        <input className="form-input" placeholder={t.goalDescPlaceholder} value={name} onChange={e=>setName(e.target.value)} autoFocus/>
        <label className="form-label">{t.masteryTarget}</label>
        <input className="form-input" type="number" min="1" max="100" value={target} onChange={e=>setTarget(Number(e.target.value))}/>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>{t.cancelBtn}</button>
          <button className="btn-primary" onClick={()=>{if(!name.trim())return;onSave({id:uid(),name:name.trim(),targetPct:target});}} style={{margin:0}}>{t.addGoal}</button>
        </div>
      </div>
    </div>
  );
}

function StudentModal({student,onSave,onClose}){
  const t=useLang();
  const isNew=!student;
  const [name,setName]=useState(student?.name||"");
  const [grade,setGrade]=useState(student?.grade||"");
  const [avatar,setAvatar]=useState(student?.avatar||AVATARS[0]);
  const [color,setColor]=useState(student?.color||COLORS[0]);
  const [behaviors,setBehaviors]=useState(student?.behaviors||[]);
  const [goals,setGoals]=useState(student?.goals||[]);
  const [showAddBeh,setShowAddBeh]=useState(false);
  const [showAddGoal,setShowAddGoal]=useState(false);
  const [editBehavior,setEditBehavior]=useState(null);
  return(
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="modal-handle"/>
          <div className="modal-title">{isNew?t.newStudent:t.editStudent}</div>
          <label className="form-label">{t.nameLabel}</label>
          <input className="form-input" placeholder={t.namePlaceholder} value={name} onChange={e=>setName(e.target.value)} autoFocus/>
          <label className="form-label">{t.gradeInputLabel}</label>
          <input className="form-input" type="number" min="9" max="12" placeholder="e.g. 10" value={grade} onChange={e=>setGrade(e.target.value)}/>
          <label className="form-label">{t.avatarLabel}</label>
          <div className="avatar-grid">{AVATARS.map(a=><div key={a} className={`avatar-opt ${avatar===a?"sel":""}`} onClick={()=>setAvatar(a)}>{a}</div>)}</div>
          <label className="form-label">{t.colorLabel}</label>
          <div className="color-grid">{COLORS.map(c=><div key={c} className={`color-opt ${color===c?"sel":""}`} style={{background:c}} onClick={()=>setColor(c)}/>)}</div>
          <label className="form-label">{t.behaviorsLabel(behaviors.length)}</label>
          {behaviors.map((b,i)=>{const c=bColor(i);return(
            <div key={b.id} className="behavior-edit-item" style={{background:c.bg,borderColor:c.border,marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:14,color:c.text}}>{b.name}</span>
                <div style={{display:"flex",gap:5}}>
                  <button className="btn-secondary" style={{padding:"3px 8px",fontSize:11}} onClick={()=>setEditBehavior(b)}>✏️ Info</button>
                  <button className="btn-danger" style={{padding:"3px 8px",fontSize:11}} onClick={()=>setBehaviors(p=>p.filter(x=>x.id!==b.id))}>✕</button>
                </div>
              </div>
              <div className="manage-btypes">
                {b.types.includes("frequency")&&<span className="tag tag-f">{t.tagFreq}</span>}
                {b.types.includes("duration")&&<span className="tag tag-d">{t.tagDur}</span>}
                {b.types.includes("latency")&&<span className="tag tag-l">{t.tagLat}</span>}
                {b.types.includes("abc")&&<span className="tag tag-a">{t.tagAbc}</span>}
                {b.types.includes("trials")&&<span className="tag tag-t">{t.tagTrials}</span>}
                {b.types.includes("intensity")&&<span className="tag tag-i">🌡 intensity</span>}
              </div>
              {b.types.includes("intensity")&&b.intensityConfig?.levels?.length>0&&(
                <div style={{fontSize:10,color:"#92400E",fontWeight:700,marginTop:4}}>
                  🌡 {b.intensityConfig.levels.length} levels: {b.intensityConfig.levels.map(l=>l.label).join(", ")}
                </div>
              )}
              {b.info?.description&&<div style={{fontSize:11,color:c.text,fontWeight:700,marginTop:4}}>📝 {b.info.description.slice(0,60)}{b.info.description.length>60?"…":""}</div>}
            </div>
          );})}
          {behaviors.length===0&&<div style={{color:"var(--muted)",fontSize:13,fontWeight:600,marginBottom:10}}>None yet.</div>}
          <button className="btn-secondary" style={{width:"100%",marginBottom:18}} onClick={()=>setShowAddBeh(true)}>{t.addBehavior}</button>
          <label className="form-label">{t.goalsLabel(goals.length)}</label>
          {goals.map(g=>(
            <div key={g.id} className="behavior-edit-item" style={{background:"#FFF9E6",borderColor:"#FDCB6E",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <div><span style={{fontWeight:700,fontSize:13}}>🎯 {g.name}</span><div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>Target: {g.targetPct}%</div></div>
                <button className="btn-danger" style={{padding:"3px 8px",fontSize:11}} onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))}>✕</button>
              </div>
            </div>
          ))}
          {goals.length===0&&<div style={{color:"var(--muted)",fontSize:13,fontWeight:600,marginBottom:10}}>No goals yet.</div>}
          <button className="btn-secondary" style={{width:"100%",marginBottom:18}} onClick={()=>setShowAddGoal(true)}>{t.addGoal}</button>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>{t.cancelBtn}</button>
            <button className="btn-primary" style={{margin:0}} onClick={()=>{if(!name.trim()||!grade)return;onSave({id:student?.id||uid(),name:name.trim(),grade:parseInt(grade),avatar,color,behaviors,goals});}}>
              {isNew?t.createBtn:t.saveBtn}
            </button>
          </div>
        </div>
      </div>
      {showAddBeh&&<AddBehaviorModal onSave={b=>{setBehaviors(p=>[...p,b]);setShowAddBeh(false);}} onClose={()=>setShowAddBeh(false)}/>}
      {editBehavior&&<AddBehaviorModal existing={editBehavior} onSave={b=>{setBehaviors(p=>p.map(x=>x.id===b.id?b:x));setEditBehavior(null);}} onClose={()=>setEditBehavior(null)}/>}
      {showAddGoal&&<AddGoalModal onSave={g=>{setGoals(p=>[...p,g]);setShowAddGoal(false);}} onClose={()=>setShowAddGoal(false)}/>}
    </>
  );
}

// ─── Edit Session Modal ───────────────────────────────────────────────────────
function EditSessionModal({ sess, onSave, onClose }) {
  const t=useLang();
  function tsToTimeStr(ts) { if(!ts)return""; const d=new Date(ts);return d.toTimeString().slice(0,5); }
  const [startTime, setStartTime] = useState(tsToTimeStr(sess.timeIn));
  const [endTime, setEndTime] = useState(tsToTimeStr(sess.timeOut));
  function save() {
    const [sh,sm] = startTime.split(":").map(Number);
    const newStart = new Date(sess.timeIn); newStart.setHours(sh,sm,0,0);
    let newEnd = null;
    if(endTime){const [eh,em]=endTime.split(":").map(Number);newEnd=new Date(sess.timeIn);newEnd.setHours(eh,em,0,0);if(newEnd<=newStart)newEnd.setDate(newEnd.getDate()+1);}
    onSave({...sess,timeIn:newStart.getTime(),timeOut:newEnd?newEnd.getTime():sess.timeOut});
  }
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{t.editSession}</div>
        <div className="modal-sub">{new Date(sess.timeIn).toLocaleDateString()}</div>
        <label className="form-label">{t.startTime}</label>
        <input className="time-input" type="time" value={startTime} onChange={e=>setStartTime(e.target.value)}/>
        <label className="form-label">{t.endTime}</label>
        <input className="time-input" type="time" value={endTime} onChange={e=>setEndTime(e.target.value)}/>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>{t.cancelBtn}</button>
          <button className="btn-primary" style={{margin:0}} onClick={save}>{t.saveChanges}</button>
        </div>
      </div>
    </div>
  );
}

function ManagePage({students,onSave,onDelete,sessions,onDeleteSession,onEditSession,users,allLogs,onMergeOrphan}){
  const t=useLang();
  const [editStudent,setEditStudent]=useState(null);
  const [addNew,setAddNew]=useState(false);
  const [tab,setTab]=useState("students");
  const [editingSession,setEditingSession]=useState(null);
  function handleSave(s){onSave(s);setEditStudent(null);setAddNew(false);}

  const sessionsByStudent = {};
  Object.entries(sessions).forEach(([key,sess])=>{
    const sid=sess.studentId;if(!sid)return;
    if(!sessionsByStudent[sid])sessionsByStudent[sid]=[];
    sessionsByStudent[sid].push({...sess,key});
  });

  // Count orphaned keys for badge
  const orphanCount = students.reduce((total, s) => {
    const activeBehKeys = new Set(s.behaviors.map(b=>`${s.id}-${b.id}`));
    const activeGoalKeys = new Set((s.goals||[]).map(g=>`${s.id}-goal-${g.id}`));
    return total + Object.keys(allLogs).filter(key => {
      if(!key.startsWith(s.id+"-")) return false;
      if(activeBehKeys.has(key)||activeGoalKeys.has(key)) return false;
      return (allLogs[key]||[]).length > 0;
    }).length;
  }, 0);

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div className="section-title">{t.manageTitle}</div>
        {tab==="students"&&<button className="btn-primary" style={{margin:0,padding:"10px 16px",fontSize:14}} onClick={()=>setAddNew(true)}>+ Add</button>}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <button className={`graph-range-btn ${tab==="students"?"active":""}`} onClick={()=>setTab("students")}>{t.studentsTab}</button>
        <button className={`graph-range-btn ${tab==="sessions"?"active":""}`} onClick={()=>setTab("sessions")}>{t.sessionsTab}</button>
        <button className={`graph-range-btn ${tab==="recovery"?"active":""}`} onClick={()=>setTab("recovery")} style={{position:"relative"}}>
          🗂 Recovery
          {orphanCount > 0 && <span style={{position:"absolute",top:-6,right:-6,background:"var(--orange)",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{orphanCount}</span>}
        </button>
      </div>
      {tab==="students"&&<div className="section-sub">{t.editProfilesSub}</div>}
      {tab==="sessions"&&<div className="section-sub">{t.deleteSessionsSub}</div>}
      {tab==="sessions"&&(
        <div>
          {students.map(s=>{
            const sSessions=sessionsByStudent[s.id]||[];if(!sSessions.length)return null;
            return (
              <div key={s.id} style={{background:"var(--surface)",border:"2px solid var(--border)",borderRadius:14,padding:14,marginBottom:12,boxShadow:"var(--shadow)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,paddingBottom:8,borderBottom:"2px solid var(--border)"}}>
                  <span style={{fontSize:24}}>{s.avatar}</span>
                  <span style={{fontWeight:800,fontSize:15}}>{s.name}</span>
                </div>
                {sSessions.sort((a,b)=>b.timeIn-a.timeIn).map(sess=>{
                  const staffName=users?.find(u=>u.id===sess.userId)?.name||"Unknown";
                  return (
                    <div key={sess.key} style={{padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:800}}>
                            {new Date(sess.timeIn).toLocaleDateString()} · {new Date(sess.timeIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                            {sess.timeOut&&` → ${new Date(sess.timeOut).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}
                          </div>
                          <div style={{display:"flex",gap:10,marginTop:3}}>
                            <span style={{fontSize:11,color:"var(--muted)",fontWeight:600}}>{sess.timeOut?`⏱ ${fmt(sess.timeOut-sess.timeIn)}`:"🟢 Ongoing"}</span>
                            <span style={{fontSize:11,color:"var(--accent)",fontWeight:700}}>👤 {staffName}</span>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:5,flexShrink:0}}>
                          <button className="session-edit-btn" onClick={()=>setEditingSession(sess)}>✏️</button>
                          <button className="session-delete-btn" onClick={()=>{if(window.confirm(t.deleteSessionConfirm))onDeleteSession(sess.key,s.id,new Date(sess.timeIn).toLocaleDateString());}}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {Object.keys(sessionsByStudent).length===0&&<div style={{color:"var(--muted)",fontWeight:700,textAlign:"center",padding:32,fontSize:14}}>{t.noSessionsYet}</div>}
        </div>
      )}
      {tab==="students"&&(
        <div className="manage-list">
          {students.map(s=>(
            <div key={s.id} className="manage-card" style={{borderTopColor:s.color,borderTopWidth:4}}>
              <div className="manage-card-header">
                <span style={{fontSize:28}}>{s.avatar}</span>
                <div className="manage-card-name">{s.name}<div style={{fontSize:11,color:"var(--muted)",fontWeight:600}}>Grade {s.grade}</div></div>
                <button className="btn-secondary" style={{padding:"6px 10px",fontSize:12}} onClick={()=>setEditStudent(s)}>✏️</button>
                <button className="btn-danger" style={{padding:"6px 9px"}} onClick={()=>{if(window.confirm(t.removeConfirm(s.name)))onDelete(s.id);}}>✕</button>
              </div>
              {s.behaviors.map((b,i)=>{const c=bColor(i);return(
                <div key={b.id} className="manage-behavior-row">
                  <div>
                    <div className="manage-bname" style={{color:c.text}}>● {b.name}</div>
                    <div className="manage-btypes">
                      {b.types.includes("frequency")&&<span className="tag tag-f">{t.tagFreq}</span>}
                      {b.types.includes("duration")&&<span className="tag tag-d">{t.tagDur}</span>}
                      {b.types.includes("latency")&&<span className="tag tag-l">{t.tagLat}</span>}
                      {b.types.includes("abc")&&<span className="tag tag-a">{t.tagAbc}</span>}
                      {b.types.includes("trials")&&<span className="tag tag-t">{t.tagTrials}</span>}
                      {b.types.includes("intensity")&&<span className="tag tag-i">🌡 {b.intensityConfig?.levels?.length||0}lvl</span>}
                    </div>
                  </div>
                  <div style={{width:8,height:8,borderRadius:"50%",background:c.accent}}/>
                </div>
              );})}
              {s.goals?.length>0&&(
                <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--border)"}}>
                  {s.goals.map(g=><div key={g.id} style={{fontSize:12,fontWeight:700,color:"#9A7B00",padding:"2px 0"}}>🎯 {g.name} ({g.targetPct}%)</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {tab==="recovery"&&(
        <DataRecoveryPage students={students} allLogs={allLogs} onMerge={onMergeOrphan}/>
      )}
      {editStudent&&<StudentModal student={editStudent} onSave={handleSave} onClose={()=>setEditStudent(null)}/>}
      {addNew&&<StudentModal student={null} onSave={handleSave} onClose={()=>setAddNew(false)}/>}
      {editingSession&&<EditSessionModal sess={editingSession} onSave={updated=>{onEditSession(updated);setEditingSession(null);}} onClose={()=>setEditingSession(null)}/>}
    </div>
  );
}

// ─── User Management ──────────────────────────────────────────────────────────
function UserModal({user:editUser,onSave,onClose,students}){
  const t=useLang();
  const isNew=!editUser;
  const [name,setName]=useState(editUser?.name||"");
  const [pin,setPin]=useState("");const [pin2,setPin2]=useState("");
  const [role,setRole]=useState(editUser?.role||"para");
  const [assigned,setAssigned]=useState(editUser?.assignedStudents||[]);
  const [err,setErr]=useState("");
  function toggleStudent(id){setAssigned(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);}
  function save(){
    if(!name.trim()){setErr("Name required.");return;}
    if(isNew&&!pin){setErr("PIN required.");return;}
    if(pin&&pin.length!==4){setErr("PIN must be 4 digits.");return;}
    if(pin&&pin!==pin2){setErr("PINs don't match.");return;}
    onSave({id:editUser?.id||uid(),name:name.trim(),pin:pin||editUser?.pin,role,assignedStudents:role==="admin"?[]:assigned});
  }
  return(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{isNew?t.addStaff:t.editStaff}</div>
        <label className="form-label">{t.fullName}</label>
        <input className="form-input" placeholder={t.fullNamePlaceholder} value={name} onChange={e=>setName(e.target.value)} autoFocus/>
        <label className="form-label">{isNew?t.pinNew:t.pinChange}</label>
        <input className="form-input" type="password" inputMode="numeric" maxLength={4} placeholder="••••" value={pin} onChange={e=>setPin(e.target.value.replace(/\D/,""))} style={{letterSpacing:8,textAlign:"center",fontSize:20}}/>
        {pin&&(<><label className="form-label">{t.confirmPin}</label><input className="form-input" type="password" inputMode="numeric" maxLength={4} placeholder="••••" value={pin2} onChange={e=>setPin2(e.target.value.replace(/\D/,""))} style={{letterSpacing:8,textAlign:"center",fontSize:20}}/></>)}
        <label className="form-label">Role</label>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <button style={{flex:1,padding:12,borderRadius:12,border:`2px solid ${role==="para"?"#2563EB":"var(--border)"}`,background:role==="para"?"#DEEEFF":"var(--surface2)",color:role==="para"?"#2563EB":"var(--muted)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:14,cursor:"pointer"}} onClick={()=>setRole("para")}>{t.paraRole}</button>
          <button style={{flex:1,padding:12,borderRadius:12,border:`2px solid ${role==="admin"?"#7C3AED":"var(--border)"}`,background:role==="admin"?"#EDE9FE":"var(--surface2)",color:role==="admin"?"#7C3AED":"var(--muted)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:14,cursor:"pointer"}} onClick={()=>setRole("admin")}>{t.adminRole}</button>
        </div>
        {role==="para"&&(
          <>
            <label className="form-label">{t.assignedStudents(assigned.length)}</label>
            <div className="assign-chips">
              {students.map(s=>(
                <button key={s.id} className={`assign-chip ${assigned.includes(s.id)?"on":""}`} onClick={()=>toggleStudent(s.id)}>
                  {s.avatar} {s.name}
                </button>
              ))}
            </div>
          </>
        )}
        {err&&<div style={{color:"var(--red)",fontWeight:700,fontSize:13,marginBottom:10}}>⚠ {err}</div>}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>{t.cancelBtn}</button>
          <button className="btn-primary" style={{margin:0}} onClick={save}>{isNew?t.addStaffBtn:t.saveBtn}</button>
        </div>
      </div>
    </div>
  );
}

function UsersPage({users,students,onSave,onDelete,currentUserId}){
  const t=useLang();
  const [editUser,setEditUser]=useState(null);const [addNew,setAddNew]=useState(false);
  function handleSave(u){onSave(u);setEditUser(null);setAddNew(false);}
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
        <div className="section-title">{t.staffTitle}</div>
        <button className="btn-primary" style={{margin:0,padding:"10px 16px",fontSize:14}} onClick={()=>setAddNew(true)}>+ {t.addStaff}</button>
      </div>
      <div className="section-sub">{t.staffSub}</div>
      <div className="users-list">
        {users.map(u=>{
          const c=userColor(u.name);const isMe=u.id===currentUserId;
          return(
            <div key={u.id} className="user-card">
              <div className="user-avatar-circle" style={{background:c.bg,color:c.text}}>{initials(u.name)}</div>
              <div style={{flex:1}}>
                <div className="user-card-name">{u.name}{isMe&&<span style={{fontSize:10,color:"var(--muted)",fontWeight:600,marginLeft:4}}>{t.youLabel}</span>}</div>
                <span className={`user-card-role ${u.role==="admin"?"role-admin":"role-para"}`}>{u.role==="admin"?"⭐ Admin":"👤 Para"}</span>
                {u.role==="para"&&u.assignedStudents?.length>0&&(
                  <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginTop:3}}>
                    {u.assignedStudents.map(id=>students.find(s=>s.id===id)?.name).filter(Boolean).join(", ")}
                  </div>
                )}
              </div>
              <div className="user-card-actions">
                <button className="btn-secondary" style={{padding:"6px 10px",fontSize:12}} onClick={()=>setEditUser(u)}>✏️</button>
                {!isMe&&<button className="btn-danger" style={{padding:"6px 9px"}} onClick={()=>{if(window.confirm(t.removeConfirm(u.name)))onDelete(u.id);}}>✕</button>}
              </div>
            </div>
          );
        })}
      </div>
      {editUser&&<UserModal user={editUser} onSave={handleSave} onClose={()=>setEditUser(null)} students={students}/>}
      {addNew&&<UserModal user={null} onSave={handleSave} onClose={()=>setAddNew(false)} students={students}/>}
    </div>
  );
}

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  en: {
    appSub:"Classroom Behavior Data System", signIn:"Sign In →",
    pinFor:(n)=>`PIN for ${n}`, wrongPin:"Incorrect PIN.",
    para:"para", admin:"admin", langToggle:"🇪🇸 Español",
    students:"Students", reports:"Reports", manage:"Manage", staff:"Staff", signOut:"Sign out",
    allStudents:"All students", yourStudents:(n)=>`Your ${n} assigned student${n!==1?"s":""}`,
    searchPlaceholder:"Search students…", gradeLabel:(g)=>`Grade ${g}`,
    behaviorsCount:(n)=>`${n} behavior${n!==1?"s":""}`,
    noStudentsSearch:(q)=>`No students matching "${q}"`, noStudentsAssigned:"No students assigned yet",
    addStudent:"Add Student",
    sessionToast:"🟢 Session started automatically",
    backStudents:"← Students",
    noBehaviors:"No behaviors assigned yet.",
    sessionInProgress:"Session In Progress", sessionComplete:"Session Complete",
    sessionStarted:(t)=>`Started ${t}`, noSessionToday:"No session today",
    elapsed:"elapsed", sessionTotal:"Total:", endSession:"🔴 End",
    endDialogTitle:(n)=>`End session for ${n}?`,
    endNow:"🔴 End Session Now", keepRunning:"⏸ Keep Session Running", goBack:"← Go back to student",
    frequency:"FREQUENCY", recordOccurrence:"+ Record Occurrence",
    timesToday:(n)=>`${n} time${n!==1?"s":""} today`,
    duration:"DURATION", startTimer:"▶ Start", stopSave:"■ Stop & Save",
    avgEpisodes:(avg,n)=>`Avg: ${avg} · ${n} episodes`, noEpisodes:"No episodes today",
    latency:"LATENCY", startLatency:"▶ Start Timer", recordLatency:"■ Record Latency",
    latencyHint:"Antecedent → behavior onset",
    abcData:"ABC DATA", antecedentPlaceholder:"A: Antecedent…", behaviorPlaceholder:"B: Behavior…",
    consequencePlaceholder:"C: Consequence…", notesPlaceholder:"Notes (optional)…",
    saveAbc:"Save ABC Entry", savedConfirm:"✓ Saved!",
    trials:"TRIALS", correct:"✓ Correct", incorrect:"✗ Incorrect",
    addCorrect:"+ Correct", addIncorrect:"+ Incorrect",
    accuracy:(p)=>`${p}% accuracy`, noDataYet:"No data yet",
    trialsToday:(n,p)=>`${n} trial${n!==1?"s":""} · ${p}% accuracy`,
    goalsTitle:"🎯 Goals", goalsSub:"Correct vs. incorrect trial tracking",
    goalTarget:(p)=>`Target: ${p}%`,
    reportsTitle:"📊 Reports", reportsSub:"Tap a student to view graphs",
    viewGraphs:"View graphs →", backReports:"← Reports",
    occurrences:(n)=>`${n} occurrences`, durationTracked:"Duration tracked",
    lastDays:(n)=>`last ${n} days`, noDataPeriod:"No data in this period", exportCsv:"↓ CSV",
    manageTitle:"⚙️ Manage", studentsTab:"👦 Students", sessionsTab:"🗑️ Sessions",
    editProfilesSub:"Edit profiles, behaviors & goals",
    deleteSessionsSub:"Admin · Delete sessions and their data",
    noSessionsYet:"No sessions recorded yet.",
    deleteSessionConfirm:"Delete this session and all behavior data from this day?",
    editSession:"✏️ Edit Session", saveChanges:"Save Changes",
    startTime:"Start Time", endTime:"End Time",
    addBehavior:"+ Add Behavior", addGoal:"+ Add Goal",
    behaviorName:"Behavior Name", behaviorNamePlaceholder:"e.g. Hand flapping",
    trackingTypes:"Tracking Types",
    behaviorDesc:"Behavior Description (what it looks like)",
    behaviorDescPlaceholder:"Describe what this behavior looks like…",
    responseStrategies:"Response Strategies",
    customSteps:"Custom Response Steps", addStep:"Add a response step…", addBtn:"+ Add",
    additionalNotes:"Additional Notes", notesTextPlaceholder:"Any specific instructions or notes…",
    goalDesc:"Goal Description", goalDescPlaceholder:"e.g. Follows 1-step directions",
    masteryTarget:"Mastery Target (%)",
    newStudent:"New Student", editStudent:"Edit Student",
    nameLabel:"Name", namePlaceholder:"e.g. Alex M.", gradeInputLabel:"Grade",
    avatarLabel:"Avatar", colorLabel:"Card Color",
    behaviorsLabel:(n)=>`Behaviors (${n})`, goalsLabel:(n)=>`Goals (${n})`,
    createBtn:"Create", saveBtn:"Save", cancelBtn:"Cancel",
    removeConfirm:(n)=>`Remove ${n}?`,
    staffTitle:"👥 Staff", staffSub:"Admin · Manage logins and student assignments",
    addStaff:"Add Staff", editStaff:"Edit Staff",
    fullName:"Full Name", fullNamePlaceholder:"e.g. Ms. Rivera",
    pinNew:"PIN (4 digits)", pinChange:"New PIN (blank = keep current)", confirmPin:"Confirm PIN",
    paraRole:"👤 Para", adminRole:"⭐ Admin",
    assignedStudents:(n)=>`Assigned Students (${n})`,
    noStudentsAssignedWarn:"No students assigned",
    addStaffBtn:"Add Staff", youLabel:"(you)",
    description:"DESCRIPTION", notes:"NOTES", noInfo:"No behavior info added yet. Admins can add it in the Manage tab.",
    close:"Close",
    antecedents:["Demand presented","Transition","Peer interaction","Access denied","Alone/ignored","Preferred removed","Sensory trigger","Unknown"],
    behaviorOptions:["Crying","Hitting","Kicking","Biting","Throwing","Screaming","Running away","Dropping to floor","Other"],
    consequences:["Escape/avoid task","Received attention","Received item/activity","Sensory stimulation","Unknown","Redirected","Task completed"],
    tagFreq:"freq", tagDur:"dur", tagLat:"lat", tagAbc:"abc", tagTrials:"trials",
    typeLabels:{frequency:"freq",duration:"dur",latency:"lat",abc:"abc",trials:"trials",trial:"trial",intensity:"intens"},
    recentLogs:"Recent", recordedLabel:"Recorded", latLabel:"Lat:",
    trialLabel:(r)=>`Trial ${r}`, todayLabel:"today",
  },
  es: {
    appSub:"Sistema de Datos de Comportamiento", signIn:"Iniciar Sesión →",
    pinFor:(n)=>`PIN para ${n}`, wrongPin:"PIN incorrecto.",
    para:"auxiliar", admin:"admin", langToggle:"🇺🇸 English",
    students:"Estudiantes", reports:"Reportes", manage:"Gestionar", staff:"Personal", signOut:"Cerrar sesión",
    allStudents:"Todos los estudiantes", yourStudents:(n)=>`Tus ${n} estudiante${n!==1?"s":""} asignado${n!==1?"s":""}`,
    searchPlaceholder:"Buscar estudiantes…", gradeLabel:(g)=>`Grado ${g}`,
    behaviorsCount:(n)=>`${n} comportamiento${n!==1?"s":""}`,
    noStudentsSearch:(q)=>`Sin resultados para "${q}"`, noStudentsAssigned:"Sin estudiantes asignados",
    addStudent:"Agregar Estudiante",
    sessionToast:"🟢 Sesión iniciada automáticamente",
    backStudents:"← Estudiantes",
    noBehaviors:"Sin comportamientos asignados.",
    sessionInProgress:"Sesión en Progreso", sessionComplete:"Sesión Completa",
    sessionStarted:(t)=>`Inicio ${t}`, noSessionToday:"Sin sesión hoy",
    elapsed:"transcurrido", sessionTotal:"Total:", endSession:"🔴 Fin",
    endDialogTitle:(n)=>`¿Terminar sesión de ${n}?`,
    endNow:"🔴 Terminar Ahora", keepRunning:"⏸ Mantener Activa", goBack:"← Volver al estudiante",
    frequency:"FRECUENCIA", recordOccurrence:"+ Registrar Ocurrencia",
    timesToday:(n)=>`${n} vez${n!==1?"es":""} hoy`,
    duration:"DURACIÓN", startTimer:"▶ Iniciar", stopSave:"■ Detener y Guardar",
    avgEpisodes:(avg,n)=>`Prom: ${avg} · ${n} episodio${n!==1?"s":""}`, noEpisodes:"Sin episodios hoy",
    latency:"LATENCIA", startLatency:"▶ Iniciar Temporizador", recordLatency:"■ Registrar Latencia",
    latencyHint:"Antecedente → inicio del comportamiento",
    abcData:"DATOS ABC", antecedentPlaceholder:"A: Antecedente…", behaviorPlaceholder:"B: Comportamiento…",
    consequencePlaceholder:"C: Consecuencia…", notesPlaceholder:"Notas (opcional)…",
    saveAbc:"Guardar ABC", savedConfirm:"✓ ¡Guardado!",
    trials:"ENSAYOS", correct:"✓ Correcto", incorrect:"✗ Incorrecto",
    addCorrect:"+ Correcto", addIncorrect:"+ Incorrecto",
    accuracy:(p)=>`${p}% precisión`, noDataYet:"Sin datos aún",
    trialsToday:(n,p)=>`${n} ensayo${n!==1?"s":""} · ${p}% precisión`,
    goalsTitle:"🎯 Metas", goalsSub:"Seguimiento de ensayos correctos e incorrectos",
    goalTarget:(p)=>`Meta: ${p}%`,
    reportsTitle:"📊 Reportes", reportsSub:"Toca un estudiante para ver gráficas",
    viewGraphs:"Ver gráficas →", backReports:"← Reportes",
    occurrences:(n)=>`${n} ocurrencia${n!==1?"s":""}`, durationTracked:"Duración registrada",
    lastDays:(n)=>`últimos ${n} días`, noDataPeriod:"Sin datos en este período", exportCsv:"↓ CSV",
    manageTitle:"⚙️ Gestionar", studentsTab:"👦 Estudiantes", sessionsTab:"🗑️ Sesiones",
    editProfilesSub:"Editar perfiles, comportamientos y metas",
    deleteSessionsSub:"Admin · Eliminar sesiones y sus datos",
    noSessionsYet:"Sin sesiones registradas.",
    deleteSessionConfirm:"¿Eliminar esta sesión y todos los datos de comportamiento de ese día?",
    editSession:"✏️ Editar Sesión", saveChanges:"Guardar Cambios",
    startTime:"Hora de Inicio", endTime:"Hora de Fin",
    addBehavior:"+ Agregar Comportamiento", addGoal:"+ Agregar Meta",
    behaviorName:"Nombre del Comportamiento", behaviorNamePlaceholder:"ej. Agitación de manos",
    trackingTypes:"Tipos de Seguimiento",
    behaviorDesc:"Descripción del Comportamiento",
    behaviorDescPlaceholder:"Describe cómo se ve este comportamiento…",
    responseStrategies:"Estrategias de Respuesta",
    customSteps:"Pasos de Respuesta Personalizados", addStep:"Agregar un paso…", addBtn:"+ Agregar",
    additionalNotes:"Notas Adicionales", notesTextPlaceholder:"Instrucciones específicas o notas…",
    goalDesc:"Descripción de la Meta", goalDescPlaceholder:"ej. Sigue instrucciones de 1 paso",
    masteryTarget:"Meta de Dominio (%)",
    newStudent:"Nuevo Estudiante", editStudent:"Editar Estudiante",
    nameLabel:"Nombre", namePlaceholder:"ej. Alex M.", gradeInputLabel:"Grado",
    avatarLabel:"Avatar", colorLabel:"Color de Tarjeta",
    behaviorsLabel:(n)=>`Comportamientos (${n})`, goalsLabel:(n)=>`Metas (${n})`,
    createBtn:"Crear", saveBtn:"Guardar", cancelBtn:"Cancelar",
    removeConfirm:(n)=>`¿Eliminar a ${n}?`,
    staffTitle:"👥 Personal", staffSub:"Admin · Gestionar accesos y asignaciones",
    addStaff:"Agregar Personal", editStaff:"Editar Personal",
    fullName:"Nombre Completo", fullNamePlaceholder:"ej. Ms. Rivera",
    pinNew:"PIN (4 dígitos)", pinChange:"Nuevo PIN (vacío = mantener actual)", confirmPin:"Confirmar PIN",
    paraRole:"👤 Auxiliar", adminRole:"⭐ Admin",
    assignedStudents:(n)=>`Estudiantes Asignados (${n})`,
    noStudentsAssignedWarn:"Sin estudiantes asignados",
    addStaffBtn:"Agregar Personal", youLabel:"(tú)",
    description:"DESCRIPCIÓN", notes:"NOTAS", noInfo:"Sin información aún. Los administradores pueden agregarla en Gestionar.",
    close:"Cerrar",
    antecedents:["Demanda presentada","Transición","Interacción con compañeros","Acceso negado","Solo/ignorado","Preferido retirado","Detonante sensorial","Desconocido"],
    behaviorOptions:["Llanto","Golpes","Patadas","Mordidas","Lanzar objetos","Gritos","Huir","Tirarse al piso","Otro"],
    consequences:["Escapar/evitar tarea","Recibió atención","Recibió objeto/actividad","Estimulación sensorial","Desconocido","Redireccionado","Tarea completada"],
    tagFreq:"frec", tagDur:"dur", tagLat:"lat", tagAbc:"abc", tagTrials:"ensayos",
    typeLabels:{frequency:"frec",duration:"dur",latency:"lat",abc:"abc",trials:"ensayos",trial:"ensayo",intensity:"intens"},
    recentLogs:"Reciente", recordedLabel:"Registrado", latLabel:"Lat:",
    trialLabel:(r)=>`Ensayo ${r==="correct"?"correcto":"incorrecto"}`, todayLabel:"hoy",
  },
};

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginPage({onLogin,users,lang,onToggleLang}){
  const [sel,setSel]=useState(null);
  const [pin,setPin]=useState("");
  const [err,setErr]=useState("");
  const t=T[lang||"en"];
  function login(){if(pin===sel.pin)onLogin(sel);else{setErr(t.wrongPin);setPin("");}}
  return(
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">📋</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <div className="login-title" style={{marginBottom:0}}>BehaviorTrack</div>
          <button className="lang-toggle" onClick={onToggleLang}>{t.langToggle}</button>
        </div>
        <div className="login-sub">{t.appSub}</div>
        {users.map(u=>{const c=userColor(u.name);return(
          <button key={u.id} className={`user-btn ${sel?.id===u.id?"selected":""}`} onClick={()=>{setSel(u);setPin("");setErr("");}}>
            <span style={{width:32,height:32,borderRadius:"50%",background:c.bg,color:c.text,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12,flexShrink:0}}>{initials(u.name)}</span>
            {u.name}<span className="user-role">{u.role==="admin"?`⭐ ${t.admin}`:`👤 ${t.para}`}</span>
          </button>
        );})}
        {sel&&(
          <div className="pin-wrap">
            <div className="pin-label">{t.pinFor(sel.name)}</div>
            <input className="pin-input" type="password" inputMode="numeric" maxLength={4} value={pin} onChange={e=>{setPin(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&login()} autoFocus placeholder="••••"/>
            {err&&<div className="pin-error">⚠ {err}</div>}
            <button className="btn-primary full" onClick={login}>{t.signIn}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(()=>{
    let meta = document.querySelector("meta[name=viewport]");
    if(!meta){ meta=document.createElement("meta"); meta.name="viewport"; document.head.appendChild(meta); }
    meta.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  },[]);

  const [user,setUser]=useState(null);
  const [page,setPage]=useState("students");
  const [selectedStudent,setSelectedStudent]=useState(null);
  const [allLogs,setAllLogs]=useState({});
  const [students,setStudents]=useState(SEED_STUDENTS);
  const [sessions,setSessions]=useState({});
  const [users,setUsers]=useState(SEED_USERS);
  const [loaded,setLoaded]=useState(false);
  const [endSessionDialog,setEndSessionDialog]=useState(null);
  const [navTarget,setNavTarget]=useState(null);
  const [lang,setLang]=useState("en");
  const [reviewSession,setReviewSession]=useState(null); // {student, user}

  useEffect(()=>{
    Promise.all([
      loadData("bt-logs-v3",{}),
      loadData("bt-students-v3",SEED_STUDENTS),
      loadData("bt-sessions-v1",{}),
      loadData("bt-users-v1",SEED_USERS),
    ]).then(([logs,studs,sess,usrs])=>{
      setAllLogs(logs);setStudents(studs);setSessions(sess);setUsers(usrs);setLoaded(true);
    });

    const channel = supabase
      .channel("bt_data_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "bt_data" }, async (payload) => {
        const key = payload.new?.key;
        if (!key) return;
        if (key === "bt-logs-v3") setAllLogs(JSON.parse(payload.new.value));
        else if (key === "bt-students-v3") setStudents(JSON.parse(payload.new.value));
        else if (key === "bt-sessions-v1") setSessions(JSON.parse(payload.new.value));
        else if (key === "bt-users-v1") setUsers(JSON.parse(payload.new.value));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  },[]);

  function handleLog(studentId,behaviorId,entry){
    const key=`${studentId}-${behaviorId}`;
    setAllLogs(prev=>{const u={...prev,[key]:[...(prev[key]||[]),entry]};saveData("bt-logs-v3",u);return u;});
  }

  function handleSelectStudent(s) {
    const key = sessionKey(s.id, user.id);
    setSessions(prev=>{
      if(prev[key]?.timeIn && !prev[key]?.timeOut) return prev;
      const u={...prev,[key]:{timeIn:ts(),userId:user.id,studentId:s.id}};
      saveData("bt-sessions-v1",u);
      return u;
    });
    setSelectedStudent(s);
  }

  function handleTimeOut(studentId,userId){
    const key=sessionKey(studentId,userId);
    setSessions(prev=>{const u={...prev,[key]:{...prev[key],timeOut:ts()}};saveData("bt-sessions-v1",u);return u;});
  }

  function handleBack() {
    if(!selectedStudent||!user) return;
    const key=sessionKey(selectedStudent.id,user.id);
    const sess=sessions[key];
    if(sess?.timeIn&&!sess?.timeOut){
      setEndSessionDialog(selectedStudent);
    } else {
      setSelectedStudent(null);
    }
  }

  function handleSaveStudent(s){
    setStudents(prev=>{
      const exists=prev.find(x=>x.id===s.id);
      const u=exists?prev.map(x=>x.id===s.id?s:x):[...prev,s];
      saveData("bt-students-v3",u);
      if(selectedStudent?.id===s.id)setSelectedStudent(s);
      return u;
    });
  }
  function handleDeleteStudent(id){
    setStudents(prev=>{const u=prev.filter(x=>x.id!==id);saveData("bt-students-v3",u);return u;});
    if(selectedStudent?.id===id){setSelectedStudent(null);setPage("students");}
  }
  function handleSaveUser(u){
    setUsers(prev=>{
      const exists=prev.find(x=>x.id===u.id);
      const updated=exists?prev.map(x=>x.id===u.id?u:x):[...prev,u];
      saveData("bt-users-v1",updated);
      if(user?.id===u.id)setUser(u);
      return updated;
    });
  }
  function handleDeleteUser(id){
    const remaining=users.filter(x=>x.id!==id);
    if(!remaining.find(x=>x.role==="admin")){alert("Cannot remove last admin!");return;}
    setUsers(prev=>{const u=prev.filter(x=>x.id!==id);saveData("bt-users-v1",u);return u;});
  }
  function handleEditSession(updatedSess) {
    setSessions(prev=>{const u={...prev,[updatedSess.key]:updatedSess};saveData("bt-sessions-v1",u);return u;});
  }
  function handleDeleteSession(sKey, studentId, date) {
    setSessions(prev=>{const u={...prev};delete u[sKey];saveData("bt-sessions-v1",u);return u;});
    setAllLogs(prev=>{
      const u={...prev};
      Object.keys(u).forEach(key=>{if(key.startsWith(studentId+"-"))u[key]=u[key].filter(l=>l.date!==date);});
      saveData("bt-logs-v3",u);return u;
    });
  }

  function handleMergeOrphan(orphanKey, targetKey) {
    setAllLogs(prev => {
      const orphanLogs = prev[orphanKey] || [];
      const targetLogs = prev[targetKey] || [];
      const merged = [...targetLogs, ...orphanLogs].sort((a,b) => (a.ts||0) - (b.ts||0));
      const u = { ...prev, [targetKey]: merged };
      delete u[orphanKey];
      saveData("bt-logs-v3", u);
      return u;
    });
  }

  function handleUpdateLog(key, logId, updatedLog) {
    setAllLogs(prev => {
      const u = { ...prev, [key]: (prev[key]||[]).map(l => l.id === logId ? updatedLog : l) };
      saveData("bt-logs-v3", u);
      return u;
    });
  }

  function handleDeleteLogEntry(key, logId) {
    setAllLogs(prev => {
      const u = { ...prev, [key]: (prev[key]||[]).filter(l => l.id !== logId) };
      saveData("bt-logs-v3", u);
      return u;
    });
  }

  function handleReviewRequest(student, user) {
    setReviewSession({ student, user });
  }

  function navTo(id){
    if(selectedStudent && user){
      const key=sessionKey(selectedStudent.id,user.id);
      const sess=sessions[key];
      if(sess?.timeIn&&!sess?.timeOut){
        setNavTarget(id);
        setEndSessionDialog({...selectedStudent,_navMode:true});
        return;
      }
    }
    setPage(id);
    setSelectedStudent(null);
  }

  if(!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"var(--muted)",fontFamily:"'Nunito',sans-serif",fontWeight:700,background:"var(--bg)"}}>Loading…</div>;
  if(!user) return <LangContext.Provider value={lang}><style>{css}</style><LoginPage users={users} onLogin={u=>{setUser(u);setPage("students");}} lang={lang} onToggleLang={()=>setLang(l=>l==="en"?"es":"en")}/></LangContext.Provider>;

  const tApp=T[lang];
  const tabs=[
    {id:"students",icon:"🏫",label:tApp.students},
    {id:"reports",icon:"📊",label:tApp.reports},
    ...(user.role==="admin"?[{id:"manage",icon:"⚙️",label:tApp.manage},{id:"users",icon:"👥",label:tApp.staff}]:[]),
  ];

  return(
    <LangContext.Provider value={lang}>
      <style>{css}</style>
      <div className="app">
        <div className="top-bar">
          <div className="top-bar-logo"><span>📋</span>BehaviorTrack</div>
          <div className="top-bar-right">
            <span className="top-bar-user">{user.name}</span>
            <button className="logout-btn" onClick={()=>{setUser(null);setSelectedStudent(null);}}>{tApp.signOut}</button>
          </div>
        </div>

        <main className="main">
          {page==="students"&&!selectedStudent&&(
            <StudentsPage user={user} allLogs={allLogs} students={students} onSelect={handleSelectStudent} onAddStudent={()=>setPage("manage")}/>
          )}
          {page==="students"&&selectedStudent&&(
            <StudentTrackPage
              student={selectedStudent} user={user} allLogs={allLogs} onLog={handleLog}
              sessions={sessions} onReviewRequest={handleReviewRequest} onBack={handleBack}
            />
          )}
          {page==="reports"&&<ReportsPage allLogs={allLogs} students={students} sessions={sessions} user={user}/>}
          {page==="manage"&&<ManagePage students={students} onSave={handleSaveStudent} onDelete={handleDeleteStudent} sessions={sessions} onDeleteSession={handleDeleteSession} onEditSession={handleEditSession} users={users} allLogs={allLogs} onMergeOrphan={handleMergeOrphan}/>}
          {page==="users"&&<UsersPage users={users} students={students} onSave={handleSaveUser} onDelete={handleDeleteUser} currentUserId={user.id}/>}
        </main>

        <div className="bottom-nav">
          <div className="bottom-nav-inner">
            {tabs.map(t=>(
              <button key={t.id} className={`bottom-tab ${page===t.id&&!selectedStudent?"active":""}`} onClick={()=>navTo(t.id)}>
                <span className="bottom-tab-icon">{t.icon}</span>
                <span className="bottom-tab-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {endSessionDialog&&(
          <EndSessionDialog
            student={endSessionDialog}
            session={sessions[sessionKey(endSessionDialog.id,user?.id)]}
            mode={endSessionDialog._navMode ? "navigate" : "back"}
            onEnd={()=>{
              handleTimeOut(endSessionDialog.id,user.id);
              setEndSessionDialog(null);
              if(endSessionDialog._navMode && navTarget){setPage(navTarget);setNavTarget(null);}
              setSelectedStudent(null);
            }}
            onKeep={()=>{setEndSessionDialog(null);setSelectedStudent(null);}}
            onBack={()=>{setEndSessionDialog(null);setNavTarget(null);}}
          />
        )}
        {/* Session Review Sheet — triggered by End Session button */}
        {reviewSession && (
          <SessionReviewSheet
            student={reviewSession.student}
            session={sessions[sessionKey(reviewSession.student.id, reviewSession.user.id)]}
            allLogs={allLogs}
            onUpdateLog={handleUpdateLog}
            onDeleteLog={handleDeleteLogEntry}
            onConfirmEnd={()=>{
              handleTimeOut(reviewSession.student.id, reviewSession.user.id);
              setReviewSession(null);
              setSelectedStudent(null);
            }}
            onCancel={()=>setReviewSession(null)}
          />
        )}
      </div>
    </LangContext.Provider>
  );
}
