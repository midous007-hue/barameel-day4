const RUNNERS=["brona","chiller","dreamer","racer","rookie","skater"];
const RUNNER_NAMES={brona:"BRONA",chiller:"THE CHILLER",dreamer:"THE DREAMER",racer:"THE RACER",rookie:"THE ROOKIE",skater:"THE SKATER"};
const defaults={nickname:"",runner:"brona",points:0,marks:0,weeklyPoints:0,checkpoints:0,collected:{collection01:{}},lastReward:null};
let state;
try{state=JSON.parse(localStorage.getItem("barameelRunState")||"null")||JSON.parse(JSON.stringify(defaults));}
catch(e){state=JSON.parse(JSON.stringify(defaults));}
if(!state.collected)state.collected={};
if(Array.isArray(state.collected.collection01)){
  const old=state.collected.collection01; state.collected.collection01={image10:old};
}
if(!state.collected.collection01)state.collected.collection01={};
for(const k of ["points","marks","weeklyPoints","checkpoints"]){if(typeof state[k]!=="number")state[k]=0;}
function save(){localStorage.setItem("barameelRunState",JSON.stringify(state));}
function setRunner(r){if(RUNNERS.includes(r)){state.runner=r;save();}}
function setNickname(n){state.nickname=(n||"").slice(0,24);save();}
function addPoints(n){state.points=(Number(state.points)||0)+(Number(n)||0);state.weeklyPoints=(Number(state.weeklyPoints)||0)+(Number(n)||0);save();}
function addCheckpoint(){state.checkpoints=(Number(state.checkpoints)||0)+1;save();}
function collect(c,image,p){if(!state.collected[c])state.collected[c]={};if(!state.collected[c][image])state.collected[c][image]=[];p=String(p).padStart(2,"0");if(!state.collected[c][image].includes(p)){state.collected[c][image].push(p);save();return true;}return false;}
function selected(){return state.runner||"brona";}
function pieces(c,image){return(state.collected[c]&&state.collected[c][image])||[];}
function count(c,image){return pieces(c,image).length;}
function hasPiece(c,image,p){return pieces(c,image).includes(String(p).padStart(2,"0"));}
function totalCollected(c){return Object.values(state.collected[c]||{}).reduce((n,a)=>n+(Array.isArray(a)?a.length:0),0);}
function setLastReward(data){state.lastReward=data;save();}

let audioCtx,master,compressor;
function audio(){audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();if(!master){master=audioCtx.createGain();master.gain.value=.95;compressor=audioCtx.createDynamicsCompressor();compressor.threshold.value=-18;compressor.knee.value=8;compressor.ratio.value=8;compressor.attack.value=.003;compressor.release.value=.12;master.connect(compressor);compressor.connect(audioCtx.destination);}if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx;}
function tone(freq,dur=.11,type='square',gain=.32,when=0,slide=0){const c=audio(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime+when);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),c.currentTime+when+dur);g.gain.setValueAtTime(.0001,c.currentTime+when);g.gain.exponentialRampToValueAtTime(Math.max(.0003,gain),c.currentTime+when+.008);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+when+dur);o.connect(g);g.connect(master);o.start(c.currentTime+when);o.stop(c.currentTime+when+dur+.025);}
function noise(dur=.08,gain=.12,when=0){const c=audio(),buffer=c.createBuffer(1,c.sampleRate*dur,c.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,2);const s=c.createBufferSource(),g=c.createGain();s.buffer=buffer;g.gain.setValueAtTime(gain,c.currentTime+when);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+when+dur);s.connect(g);g.connect(master);s.start(c.currentTime+when);}
const ARCADE={rookie:[392,523,659],skater:[494,659,988],brona:[440,554,659,880],racer:[330,494,784,988],chiller:[262,330,392],dreamer:[392,494,587,784]};
function selectSound(key){const seq=ARCADE[key]||ARCADE.brona;seq.forEach((f,i)=>tone(f,.105,'square',.58,i*.055,i===seq.length-1?120:0));noise(.045,.09,0);}
function confirmSound(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,.09,'square',.62,i*.055,i===4?180:0));noise(.08,.13,.02)}
function scanSound(){[660,880,1175,1568].forEach((f,i)=>tone(f,.075,'square',.55,i*.065));noise(.05,.1,.02)}
function errorSound(){tone(180,.16,'sawtooth',.5,0,-70);tone(110,.2,'square',.42,.09,-30);noise(.08,.14,.04)}
function backSound(){tone(440,.06,'square',.5,0,-80);tone(330,.08,'square',.48,.055,-60);noise(.035,.08,.02)}
function rewardSound(){const coins=[1047,1319,1568,1976,2349,2637,3136];coins.forEach((f,i)=>{tone(f,.085,'square',.76,i*.065,i<coins.length-1?90:180);tone(f*2,.055,'triangle',.22,i*.065+.012,120)});[784,988,1175,1568,2093].forEach((f,i)=>tone(f,.13,'square',.64,.48+i*.055,i===4?240:70));tone(1047,.38,'triangle',.34,.78,180);tone(1568,.44,'triangle',.30,.82,260);noise(.13,.18,.02);noise(.08,.12,.56);}
function play(type){if(type==='tap'||type==='select'){selectSound(selected());return;}if(type==='confirm'){confirmSound();return;}if(type==='success'){rewardSound();return;}if(type==='scan'){scanSound();return;}if(type==='error'){errorSound();return;}if(type==='back'){backSound();return;}tone(520,.10,'sine',.08);}
function rewardAudio(){let a=document.getElementById('rewardAudio');if(!a){a=document.createElement('audio');a.id='rewardAudio';a.preload='auto';a.src='./audio/reward-levelup.mp3';a.style.display='none';document.body.appendChild(a);}return a;}
function playRewardFrom(startOffset=0){const a=rewardAudio();a.currentTime=Math.max(0,startOffset||0);a.volume=1;a.play().catch(()=>{});return a;}
function pulse(el,cls='ui-pulse'){if(!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}
function flash(){document.body.classList.remove('arcade-flash');void document.body.offsetWidth;document.body.classList.add('arcade-flash');}
function go(url){document.body.classList.add('page-leave');setTimeout(()=>location.href=url,180);}
function preload(src){if(!src)return;const i=new Image();i.decoding='async';i.src=src;return i;}
function preloadAll(list){list.forEach(preload);}
function setArt(id,src,next=[]){const im=document.getElementById(id);if(!im)return;im.classList.remove('art-ready');im.onload=()=>{im.classList.add('art-ready');next.forEach(preload);};im.onerror=()=>console.warn('Missing asset:',src);im.src=src;}
function parseQR(raw){const s=decodeURIComponent(String(raw||"")).trim();let m=s.match(/(?:collection0?1[|_-])?(image0?[1-9]|image10)[|_-]piece0?([1-9])/i);if(m)return{collection:"collection01",image:`image${String(m[1].replace(/\D/g,'')).padStart(2,'0')}`,piece:Number(m[2])};let c=s.match(/collection0?(\d+)/i),i=s.match(/image0?(\d+)/i),p=s.match(/piece0?(\d+)/i);if(p)return{collection:`collection${String(c?c[1]:1).padStart(2,'0')}`,image:`image${String(i?i[1]:10).padStart(2,'0')}`,piece:Number(p[1])};return null;}
async function fetchCollection(id="collection01"){const r=await fetch(`./assets/collections/${id}/collection.json`,{cache:'no-store'});if(!r.ok)throw new Error('collection data unavailable');return r.json();}
function startRewardTransition(data){localStorage.setItem('barameelRewardTransition',JSON.stringify({startedAt:Date.now(),...data}));playRewardFrom(0);}
document.addEventListener('pointerdown',()=>{audio();},{once:true,passive:true});
save();
window.BR={RUNNERS,RUNNER_NAMES,state,save,setRunner,setNickname,addPoints,addCheckpoint,collect,selected,pieces,count,hasPiece,totalCollected,setLastReward,play,selectSound,confirmSound,scanSound,errorSound,backSound,rewardSound,rewardAudio,playRewardFrom,pulse,flash,go,preload,preloadAll,setArt,parseQR,startRewardTransition,fetchCollection};
