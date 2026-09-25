const RUNNERS=["brona","chiller","dreamer","racer","rookie","skater"];
const RUNNER_NAMES={brona:"BRONA",chiller:"THE CHILLER",dreamer:"THE DREAMER",racer:"THE RACER",rookie:"THE ROOKIE",skater:"THE SKATER"};
const defaults={nickname:"",runner:"brona",points:0,marks:0,collected:{collection01:[]}};
let state;
try{state=JSON.parse(localStorage.getItem("barameelRunState")||"null")||JSON.parse(JSON.stringify(defaults));}
catch(e){state=JSON.parse(JSON.stringify(defaults));}
if(!state.collected)state.collected={collection01:[]};
function save(){localStorage.setItem("barameelRunState",JSON.stringify(state));}
function setRunner(r){if(RUNNERS.includes(r)){state.runner=r;save();}}
function setNickname(n){state.nickname=(n||"").slice(0,24);save();}
function addPoints(n){state.points=(Number(state.points)||0)+(Number(n)||0);save();}
function collect(c,p){if(!state.collected[c])state.collected[c]=[];p=String(p).padStart(2,"0");if(!state.collected[c].includes(p))state.collected[c].push(p);save();}
function selected(){return state.runner||"brona";}
function count(c){return(state.collected[c]||[]).length;}
function hasPiece(c,p){return(state.collected[c]||[]).includes(String(p).padStart(2,"0"));}

/* Previous BARAMEEL RUN sound language: short tap/select, confirm, scan, error + the established reward MP3. */
let audioCtx=null;
function ctx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!audioCtx)audioCtx=new C();if(audioCtx.state==="suspended")audioCtx.resume().catch(()=>{});return audioCtx;}
function tone(freq,dur,type="sine",gain=.08,delay=0){const c=ctx();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.02);}
function play(type){
  if(type==="tap"||type==="select"||type==="back"){tone(520,.10,"sine",.08);return;}
  if(type==="confirm"){[523,659,784].forEach((f,i)=>tone(f,.16,"triangle",.11,i*.08));return;}
  if(type==="success"){[523,659,784,1046].forEach((f,i)=>tone(f,.17,"triangle",.12,i*.08));return;}
  if(type==="scan"){tone(700,.05,"square",.08);tone(900,.07,"square",.08,.06);return;}
  if(type==="error"){tone(180,.12,"sawtooth",.08);tone(120,.15,"sawtooth",.08,.10);return;}
  tone(520,.10,"sine",.08);
}
function rewardAudio(){let a=document.getElementById("rewardAudio");if(!a){a=document.createElement("audio");a.id="rewardAudio";a.preload="auto";a.src="./audio/reward-levelup.mp3";a.style.display="none";document.body.appendChild(a);}return a;}
function playRewardFrom(startOffset=0){const a=rewardAudio();a.currentTime=Math.max(0,startOffset||0);a.volume=1;a.play().catch(()=>{});return a;}
function pulse(el,cls="ui-pulse"){if(!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}
function go(url){document.body.classList.add("page-leave");setTimeout(()=>location.href=url,180);}
function preload(src){if(!src)return;const i=new Image();i.src=src;return i;}
function preloadAll(list){list.forEach(preload);}
function setArt(id,src,next=[]){const im=document.getElementById(id);if(!im)return;im.classList.remove("art-ready");im.onload=()=>{im.classList.add("art-ready");next.forEach(preload);};im.onerror=()=>{console.warn("Missing asset:",src)};im.src=src;}
function parseQR(raw){
  const s=String(raw||"");
  const pieceMatch=s.match(/(?:piece|p)[-_ =\/]*(0?[1-9])/i);
  const collectionMatch=s.match(/(?:collection|c)[-_ =\/]*(0?[1-9]+)/i);
  return {collection:collectionMatch?`collection${String(collectionMatch[1]).padStart(2,"0")}`:"collection01",piece:pieceMatch?Number(pieceMatch[1]):4};
}
function startRewardTransition(piece){
  const now=Date.now();
  localStorage.setItem("barameelRewardTransition",JSON.stringify({startedAt:now,piece:Number(piece)||4}));
  playRewardFrom(0);
}
document.addEventListener("pointerdown",()=>{ctx();},{once:true,passive:true});
window.BR={RUNNERS,RUNNER_NAMES,state,save,setRunner,setNickname,addPoints,collect,selected,count,hasPiece,play,rewardAudio,playRewardFrom,pulse,go,preload,preloadAll,setArt,parseQR,startRewardTransition};
