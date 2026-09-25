
const BARAMEEL = (() => {
  const RUNNERS = ["brona","chiller","dreamer","racer","rookie","skater"];
  const state = JSON.parse(localStorage.getItem("barameelRunState") || "null") || {
    nickname: "",
    runner: "brona",
    points: 0,
    marks: 0,
    rank: 0,
    collected: { collection01: [] }
  };

  function save(){ localStorage.setItem("barameelRunState", JSON.stringify(state)); }
  function setRunner(r){ if(RUNNERS.includes(r)){ state.runner=r; save(); } }
  function setNickname(n){ state.nickname=(n||"").trim().slice(0,24); save(); }
  function addPoints(n){ state.points += Number(n)||0; save(); }
  function collect(collectionId, piece){
    if(!state.collected[collectionId]) state.collected[collectionId]=[];
    if(!state.collected[collectionId].includes(piece)) state.collected[collectionId].push(piece);
    save();
  }
  function hasPiece(c,p){ return !!(state.collected[c]||[]).includes(String(p).padStart(2,"0")); }
  function count(c){ return (state.collected[c]||[]).length; }

  function play(type){
    // Browser-generated retro effects: no external audio dependency required.
    try{
      const C=window.AudioContext||window.webkitAudioContext;
      if(!C) return;
      const ctx=new C();
      const now=ctx.currentTime;
      const master=ctx.createGain(); master.gain.value=.055; master.connect(ctx.destination);
      const seq = {
        tap:[[660,.045,"square"]],
        back:[[330,.07,"sawtooth"]],
        select:[[440,.06,"triangle"],[660,.08,"triangle"]],
        confirm:[[523,.07,"triangle"],[659,.07,"triangle"],[784,.12,"triangle"]],
        scan:[[700,.05,"square"],[900,.07,"square"]],
        error:[[180,.12,"sawtooth"],[120,.15,"sawtooth"]],
        reward:[[523,.08,"triangle"],[659,.08,"triangle"],[784,.08,"triangle"],[1047,.18,"triangle"]]
      }[type] || [[500,.05,"square"]];
      let t=now;
      seq.forEach(([freq,dur,wave])=>{
        const o=ctx.createOscillator(), g=ctx.createGain();
        o.type=wave; o.frequency.value=freq;
        g.gain.setValueAtTime(.0001,t);
        g.gain.exponentialRampToValueAtTime(.8,t+.008);
        g.gain.exponentialRampToValueAtTime(.0001,t+dur);
        o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+.02); t+=dur;
      });
      setTimeout(()=>ctx.close().catch(()=>{}), 700);
    }catch(e){}
  }

  function pulse(el, cls="ui-pulse"){
    if(!el) return;
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  }

  return {state,RUNNERS,save,setRunner,setNickname,addPoints,collect,hasPiece,count,play,pulse};
})();
