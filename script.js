const scene = document.getElementById('scene');

const AUTHOR_TAG = 'Sam_Velasquez';

const subEs = document.getElementById('subEs');
const subEn = document.getElementById('subEn');
const subtitleEl = document.getElementById('subtitle');

const lyricSequence = [
  {es:'Sabes lo que estoy pensando',en:"You know what I'm thinkin'"},
  {es:'Lo veo en tus ojos',en:" see it in your eyes"},
  {es:'Odias quererme',en:"You hate that you want me"},
  {es:'Odio cuando lloras',en:"hate it when you cry"},
  {es:'Tienes miedo de estar sola, especialmente de noche',en:"You're scared to be lonely, 'specially in the night"},
  {es:'Tengo miedo de extrañarte',en:"I'm scared that I'll miss you"},
  {es:'Me pasa todo el tiempo',en:"happens every time"},
  {es:'No quiero sentir esto',en:"I don't want this feelin'"},
  {es:'No puedo soportar el amor',en:"I can't afford love"},
  {es:'Trato de encontrar una razón que nos separe',en:"I try to find a reason to pull us apart"},
  {es:'No está funcionando, pues eres perfecta',en:"It ain't workin' 'cause you're perfect"},
  {es:'Y sé que vales la pena',en:"And I know that you're worth it"},
  {es:'No puedo alejarme, oh',en:"I can't walk away, oh!"},
  {es:'A pesar de que estemos pasando por esto',en:"Even though we're going through it"},
  {es:'Y que esto te hace sentir sola',en:"And it makes you feel alone"},
  {es:'Ten presente que moriría por ti',en:"Just know that I would die for you"},
  {es:'Amor, moriría por ti, sí',en:"Baby, I would die for you, yeah"},
  {es:'La distancia y el tiempo entre nosotros',en:"The distance and the time between us"},
  {es:'Nunca me harán cambiar de idea, porque, amor',en:"It'll never change my mind, 'cause baby"},
  {es:'Moriría por ti',en:"I would die for you"},
  {es:'Amor, moriría por ti, sí',en:"Baby, I would die for you, yeah"}
];

let timeRanges = [

  {start:0.0,end:2.5},   //Sabes lo que estoy pensando
  {start:2.5,end:4.5},   //lo veo en tus ojos
  {start:4.5,end:6.4},   //Odias quererme
  {start:6.4,end:8.0},   //odio cuando lloras
  {start:8.0,end:11.3},  //Tienes miedo de estar sola, especialmente de noche
  {start:11.3,end:13.3}, //Tengo miedo de extrañarte
  {start:13.3,end:15.3}, //me pasa todo el tiempo
  {start:15.3,end:17.0}, //No quiero sentir esto
  {start:17.0,end:18.7}, //no puedo soportar el amor
  {start:18.7,end:22.0}, //Trato de encontrar una razón que nos separe
  {start:22.0,end:24.0}, //No está funcionando, pues eres perfecta
  {start:24.0,end:26.0}, //Y sé que vales la pena
  {start:26.0,end:29.8}, //No puedo alejarme, oh
  {start:29.8,end:33.0}, //A pesar de que estemos pasando por esto
  {start:33.0,end:35.3}, //Y que esto te hace sentir sola
  {start:35.3,end:39.6}, //Ten presente que moriría por ti
  {start:39.6,end:43.7}, //Amor, moriría por ti, sí
  {start:43.7,end:47.2}, //La distancia y el tiempo entre nosotros
  {start:47.2,end:50.8}, //Nunca me harán cambiar de idea, porque, amor
  {start:50.8,end:53.8}, //Moriría por ti
  {start:53.8,end:57.9}  //Amor, moriría por ti, sí

];

let subIdx = 0;
let subTimer = null;
let playingSubs = false;

function showSubtitleAt(i){
  if (i < 0 || i >= lyricSequence.length) return;

  const item = lyricSequence[i];
  subEs.textContent = item.es;
  subEn.textContent = item.en;

  subtitleEl.style.opacity = 1;

  const durationMs = (timeRanges[i].end - timeRanges[i].start) * 1000;

  clearTimeout(subTimer);

  subTimer = setTimeout(()=>{
    subtitleEl.style.opacity = 0;

    const next = i + 1;
    if (playingSubs && next < lyricSequence.length){
      subIdx = next;
      setTimeout(()=> showSubtitleAt(subIdx),200);
    } else {
      playingSubs = false;
      // Cuando termina la última línea de subtítulos, iniciamos la animación de flores
      if (i === lyricSequence.length - 1){
        // pequeño retardo para que la transición no sea instantánea
        setTimeout(()=>{
          startFallingFlowers();
        }, 600);
      }
    }
  }, durationMs);
}

function playSubtitles(){
  if (playingSubs) return;
  playingSubs = true;
  subIdx = 0;
  showSubtitleAt(subIdx);
}

function pauseSubtitles(){
  playingSubs = false;
  clearTimeout(subTimer);
}

// Nota: Los subtítulos se inician tras la activación del audio (primer gesto del usuario)

let vivid = false;
scene && scene.addEventListener('dblclick',()=>{
  vivid = !vivid;
  if(vivid){
    document.documentElement.style.setProperty('--sky-mid','#ff3b30');
    document.documentElement.style.setProperty('--sun','#fff1a8');
  } else {
    document.documentElement.style.setProperty('--sky-mid','#ff7a59');
    document.documentElement.style.setProperty('--sun','#ffd166');
  }
});

console.log('Subtítulos sincronizados correctamente 🔥');

/* -------- Falling flowers: spawner and control -------- */
function startFallingFlowers(){
  // Evitar múltiples inicios
  if (window._flowersRunning) return;
  window._flowersRunning = true;

  const container = document.getElementById('falling-flowers');
  if (!container) return;

  // Data-URI of a simple flower SVG (used as image/png replacement). Using inline SVG data URL.
  const flowerSVG = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 120'>
      <defs>
        <style>text{font-family:Arial,Helvetica,sans-serif;font-weight:700}</style>
      </defs>
      <!-- pétalos rojos -->
      <g transform='translate(32,32)'>
        <g fill='#c92a2a'>
          <ellipse rx='16' ry='8' cx='0' cy='-28' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(36)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(72)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(108)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(144)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(180)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(216)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(252)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(288)' />
          <ellipse rx='16' ry='8' cx='0' cy='-28' transform='rotate(324)' />
        </g>
        <!-- centro claro sin texto (texto central se mostrará como overlay) -->
        <circle cx='0' cy='0' r='12' fill='#fff6d1' stroke='#e6b800' stroke-width='1'/>
      </g>
      <!-- tallo/raiz verde -->
      <g transform='translate(32,44)'>
        <rect x='-2' y='0' width='4' height='44' rx='2' fill='#2e8b3a' />
        <path d='M0 44 C -6 52, 6 52, 0 60' fill='none' stroke='#2e8b3a' stroke-width='3' stroke-linecap='round'/>
      </g>
    </svg>
  `);

  // function to spawn a single flower element
  function spawnFlower(){
    const el = document.createElement('div');
    el.className = 'flower';

    // depth: 1 (far), 2 (mid), 3 (near)
    const depthRand = Math.random();
    let depthClass = 'depth-2';
    if (depthRand < 0.28) depthClass = 'depth-1';
    else if (depthRand > 0.78) depthClass = 'depth-3';
    el.classList.add(depthClass);

    // random horizontal position across the screen
    const left = Math.random() * 100; // percent
    el.style.left = left + 'vw';

    // Size tweaks (already handled by depth classes) but small random scale
    const scale = 0.85 + Math.random()*0.5;
    el.style.transform = `translateY(-10vh) scale(${scale})`;

    // random opacity variance
    const baseOpacity = depthClass === 'depth-1' ? 0.6 : depthClass === 'depth-3' ? 1 : 0.85;
    el.style.opacity = (baseOpacity - Math.random()*0.2).toFixed(2);

    // random fall duration (4s - 8s)
    const fallDuration = (4 + Math.random()*4).toFixed(2);

    // no rotation or sway: set drift and end rotation to zero
    el.style.setProperty('--drift', '0px');
    el.style.setProperty('--end-rot', '0deg');

    // small random delay so they don't all spawn at the exact same frame
    const delay = (Math.random()*0.8).toFixed(2);

    // build animation string: only vertical fall (no rotation, no sway)
    el.style.animation = `fall ${fallDuration}s linear ${delay}s 1 forwards`;

    // set background to inline SVG
    el.style.backgroundImage = `url("data:image/svg+xml;utf8,${flowerSVG}")`;

    // append to container
    container.appendChild(el);

    // remove element after fall animation completes (listen for animationend for 'fall')
    function onAnimEnd(ev){
      if (ev.animationName === 'fall'){
        el.removeEventListener('animationend', onAnimEnd);
        if (el.parentNode) el.parentNode.removeChild(el);
      }
    }
    el.addEventListener('animationend', onAnimEnd);
  }

  // spawn continuously at random intervals — infinite animation
  function scheduleNext(){
    const nextIn = 220 + Math.random()*700; // 220ms - 920ms
    setTimeout(()=>{
      // spawn 1-2 flowers per tick for variety
      const count = Math.random() < 0.25 ? 2 : 1;
      for (let i=0;i<count;i++) spawnFlower();
      scheduleNext();
    }, nextIn);
  }

  // initial burst
  for (let i=0;i<8;i++) spawnFlower();
  scheduleNext();

  // also change background to black for maximum contrast behind content
  document.body.style.background = '#000';
  // añadir clase que oculta/pausa el atardecer y muestra estrellas (CSS .final-scene)
  document.body.classList.add('final-scene');
  if (scene) scene.classList.add('final-scene');
}

// ------- Autoplay muted y auto-unmute en primer gesto -------
(function(){
  const bgAudio = document.getElementById('bgAudio');
  if (!bgAudio) return;
  console.log('bgAudio found, attaching activation handlers');

  // Aseguramos que arranque silenciado para que autoplay funcione
  try { bgAudio.muted = true; bgAudio.volume = 0.0; } catch(e){}
  // Reproducir (muted) para evitar que el audio quede "suspended"
  try { bgAudio.play().catch(()=>{}); } catch(e){}

  const TARGET_VOLUME = 0.85;
  function fadeVolume(to, duration = 1200){
    const start = Math.max(0, Math.min(1, bgAudio.volume || 0));
    const diff = to - start;
    const steps = 20;
    let step = 0;
    const iv = setInterval(()=>{
      step++;
      const v = start + diff * (step / steps);
      try { bgAudio.volume = Math.max(0, Math.min(1, v)); } catch(e){}
      if (step >= steps) clearInterval(iv);
    }, Math.max(10, Math.round(duration / steps)));
  }

  let activated = false;
  function activateAudio(){
    if (activated) return;
    console.log('activateAudio: user gesture detected');
    activated = true;
    try { bgAudio.muted = false; } catch(e){}
    // Ensure track starts from 0 so subtitles can sync exactly
    try { bgAudio.currentTime = 0; } catch(e){}
    // Some browsers require a play() call in the gesture; after play resolves start sync
    const p = bgAudio.play();
    if (p && p.then) {
      p.then(()=>{
        fadeVolume(TARGET_VOLUME, 200);
        // normalize timeRanges so they start at 0 (if they were offset)
        try { normalizeTimeRanges(); } catch(e){}
        // start subtitle sync based on actual audio time
        try { startSubtitleSync(); } catch(e){}
      }).catch((err)=>{
        console.warn('play() rejected:', err);
        // even if rejected, try to start sync — user interaction occurred
        try { normalizeTimeRanges(); } catch(e){}
        try { startSubtitleSync(); } catch(e){}
      });
    } else {
      // play() didn't return a promise — still start sync
      fadeVolume(TARGET_VOLUME, 200);
      try { normalizeTimeRanges(); } catch(e){}
      try { startSubtitleSync(); } catch(e){}
    }
    // ocultar overlay o botón de activación si existe
    try{
      const overlay = document.getElementById('activationOverlay');
      if (overlay){ overlay.classList.add('hidden'); setTimeout(()=>{ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 520); }
      const btn = document.getElementById('enableAudioBtn');
      if (btn){ btn.classList.add('hidden'); setTimeout(()=>{ if (btn.parentNode) btn.parentNode.removeChild(btn); }, 520); }
    } catch(e){}

    // (subtitles started by startSubtitleSync above)
    // remove listeners - we used once:true on addEventListener below
  }

  // Escuchar el primer gesto del usuario sin mostrar botones
  ['pointerdown','touchstart','keydown'].forEach(evt =>
    document.addEventListener(evt, activateAudio, {once:true, passive:true})
  );

  // Botón explícito para activar (por petición del usuario)
  try{
    const enableBtn = document.getElementById('enableAudioBtn');
    if (enableBtn){
      // Ensure visible
      enableBtn.classList.remove('hidden');
      enableBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        activateAudio();
      }, {once:true});
    }
  } catch(e){}

  // Cuando la pista termina, detener subtítulos y dejar todo en estado final
  try{
    bgAudio.addEventListener('ended', ()=>{
      console.log('bgAudio ended — deteniendo subtítulos');
      try { stopSubtitleSync(); } catch(e){}
      try { pauseSubtitles(); } catch(e){}
      // opcional: limpiar listeners si los hubiera
    });
  } catch(e){}

  // Fallback: si el usuario nunca interactúa, el audio seguirá en muted pero reproducido.
})();

// ---- Subtitle sync helpers: synchronize subtitles to bgAudio.currentTime ----
let subtitleSyncInterval = null;
// Normalize timeRanges so the earliest start becomes 0 (shifts all ranges)
function normalizeTimeRanges(){
  if (!Array.isArray(timeRanges) || timeRanges.length === 0) return;
  const minStart = timeRanges.reduce((m, r)=> Math.min(m, (r && typeof r.start === 'number') ? r.start : m), Infinity);
  if (!isFinite(minStart) || minStart <= 0) return; // nothing to do
  for (let i=0;i<timeRanges.length;i++){
    timeRanges[i].start = Math.max(0, +(timeRanges[i].start - minStart).toFixed(3));
    timeRanges[i].end = Math.max(0, +(timeRanges[i].end - minStart).toFixed(3));
  }
  console.log('timeRanges normalized by', minStart, 'seconds');
}
function showSubtitleImmediate(i){
  if (i < 0 || i >= lyricSequence.length) return;
  const item = lyricSequence[i];
  try{ subEs.textContent = item.es; subEn.textContent = item.en; subtitleEl.style.opacity = 1; } catch(e){}
  // clear legacy timer
  try{ clearTimeout(subTimer); } catch(e){}
}
function hideSubtitleImmediate(){
  try{ subtitleEl.style.opacity = 0; } catch(e){}
  try{ clearTimeout(subTimer); } catch(e){}
}
function startSubtitleSync(){
  const bgAudio = document.getElementById('bgAudio');
  if (!bgAudio) return;
  if (subtitleSyncInterval) clearInterval(subtitleSyncInterval);
  // compute last subtitle end so we can trigger final scene
  const lastRangeEnd = (timeRanges && timeRanges.length) ? timeRanges[timeRanges.length-1].end : null;
  let flowersScheduled = false;
  subtitleSyncInterval = setInterval(()=>{
    const t = bgAudio.currentTime || 0;
    let idx = -1;
    for (let i=0;i<timeRanges.length;i++){
      if (t >= timeRanges[i].start && t < timeRanges[i].end){ idx = i; break; }
    }
    if (idx >= 0){
      if (subIdx !== idx || !playingSubs){
        subIdx = idx;
        playingSubs = true;
        showSubtitleImmediate(idx);
      }
    } else {
      // not inside any subtitle range
      if (playingSubs){ playingSubs = false; }
      hideSubtitleImmediate();
    }
    // if audio passed the last subtitle end, trigger falling flowers once
    if (lastRangeEnd !== null && t >= lastRangeEnd && !flowersScheduled){
      flowersScheduled = true;
      try{
        setTimeout(()=>{
          try{ startFallingFlowers(); }catch(e){}
        }, 600);
      }catch(e){}
    }
  }, 120);
}
function stopSubtitleSync(){
  if (subtitleSyncInterval){ clearInterval(subtitleSyncInterval); subtitleSyncInterval = null; }
  hideSubtitleImmediate();
}