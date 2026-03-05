const scene = document.getElementById('scene');

const AUTHOR_TAG = 'Sam_Velasquez';

const subEs = document.getElementById('subEs');
const subEn = document.getElementById('subEn');
const subtitleEl = document.getElementById('subtitle');

const lyricSequence = [
  {es:'Sabes lo que estoy pensando',en:"You know what I'm thinkin'"},
  {es:'lo veo en tus ojos',en:" see it in your eyes"},
  {es:'Odias quererme',en:"You hate that you want me"},
  {es:'odio cuando lloras',en:"hate it when you cry"},
  {es:'Tienes miedo de estar sola, especialmente de noche',en:"You're scared to be lonely, 'specially in the night"},
  {es:'Tengo miedo de extrañarte',en:"I'm scared that I'll miss you"},
  {es:'me pasa todo el tiempo',en:"happens every time"},
  {es:'No quiero sentir esto',en:"I don't want this feelin'"},
  {es:'no puedo soportar el amor',en:"I can't afford love"},
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

  {start:7.0,end:8.5},
  {start:8.5,end:9.8},
  {start:9.8,end:11.5},
  {start:13.5,end:15.0},
  {start:16.0,end:19.3},
  {start:19.3,end:21.3},
  {start:21.3,end:22.6},
  {start:22.6,end:24.3},
  {start:24.3,end:25.7},
  {start:25.7,end:29.0},
  {start:32.0,end:33.8},
  {start:33.8,end:35.5},
  {start:35.5,end:39.0},
  {start:39.0,end:42.0},
  {start:42.0,end:44.4},
  {start:44.4,end:48.4},
  {start:48.4,end:52.8},
  {start:52.8,end:55.7},
  {start:55.7,end:59.3},
  {start:59.3,end:62.0},
  {start:62.0,end:66.0}

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

document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{ playSubtitles(); },400);
});

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