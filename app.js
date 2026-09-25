const BARAMEEL = (() => {
  const RUNNERS = ["brona","chiller","dreamer","racer","rookie","skater"];
  const defaults = {nickname:"",runner:"brona",points:0,marks:0,rank:0,collected:{collection01:[]}};
  let state;
  try { state = JSON.parse(localStorage.getItem("barameelRunState") || "null") || structuredClone(defaults); }
  catch(e){ state = JSON.parse(JSON.stringify(defaults)); }
  if(!state.collected) state.collected={collection01:[]};
  function save(){localStorage.setItem("barameelRunState",JSON.stringify(state));}
  function setRunner(r){if(RUNNERS.includes(r)){state.runner=r;save();}}
  function setNickname(n){state.nickname=(n||"").trim().slice(0,24);save();}
  function addPoints(n){state.points+=Number(n)||0;save();}
  function collect(c,p){if(!state.collected[c])state.collected[c]=[];p=String(p).padStart(2,"0");if(!state.collected[c].includes(p))state.collected[c].push(p);save();}
  function hasPiece(c,p){return (state.collected[c]||[]).includes(String(p).padStart(2,"0"));}
  function count(c){return (state.collected[c]||[]).length;}

  let audioCtx=null;
  function ctx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!audioCtx)audioCtx=new C();if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});return audioCtx;}
  function tone(freq,dur,type='sine',gain=.08,delay=0){const c=ctx();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.02);}
  function play(type){
    // Match the established sounds from the previous BARAMEEL RUN build.
    if(type==='tap'||type==='select'||type==='back') { tone(520,.10,'sine',.08); return; }
    if(type==='confirm'){ [523,659,784].forEach((f,i)=>tone(f,.16,'triangle',.11,i*.08)); return; }
    if(type==='success'||type==='reward'){
      [523,659,784,1046].forEach((f,i)=>tone(f,.17,'triangle',.12,i*.08));
      if(type==='reward'){ const a=document.getElementById('rewardAudio'); if(a){a.currentTime=0;a.play().catch(()=>{});} }
      return;
    }
    if(type==='scan'){tone(700,.05,'square',.08);tone(900,.07,'square',.08,.06);return;}
    if(type==='error'){tone(180,.12,'sawtooth',.08);tone(120,.15,'sawtooth',.08,.1);return;}
    tone(520,.10,'sine',.08);
  }
  function pulse(el,cls='ui-pulse'){if(!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}
  function mountRewardAudio(){if(document.getElementById('rewardAudio'))return;const a=document.createElement('audio');a.id='rewardAudio';a.preload='auto';a.src='audio/reward-levelup.mp3';a.style.display='none';document.body.appendChild(a);}
  document.addEventListener('pointerdown',()=>{const c=ctx();if(c){}},{once:true,passive:true});
  document.addEventListener('DOMContentLoaded',mountRewardAudio);
  return {state,RUNNERS,save,setRunner,setNickname,addPoints,collect,hasPiece,count,play,pulse};
})();
