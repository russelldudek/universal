(() => {
 const scenarios={
  steady:{state:'Show ready',health:{scene:'green',cue:'green',run:'green',review:'green'},copy:'All four books agree. Release remains observable, reversible and owned.'},
  arrival:{state:'Review required',health:{scene:'green',cue:'amber',run:'amber',review:'green'},copy:'Peak demand changes context and latency assumptions. Revalidate data freshness, performance thresholds and human escalation before expansion.'},
  disruption:{state:'Continuity at risk',health:{scene:'green',cue:'green',run:'red',review:'amber'},copy:'A live interruption makes fallback, rollback, incident command and guest recovery more important than model output.'},
  drift:{state:'Hold for evidence',health:{scene:'green',cue:'red',run:'amber',review:'red'},copy:'Model behavior moved beyond the approved cue. Hold or constrain the service, investigate drift and re-establish the evidence standard.'},
  vendor:{state:'Fallback active',health:{scene:'green',cue:'amber',run:'red',review:'amber'},copy:'An external API failure tests ownership. Invoke the documented fallback, protect the guest moment and use the incident to renegotiate resilience.'}
 };
 const flats=[...document.querySelectorAll('.scene-flat')]; const tabs=[...document.querySelectorAll('[data-scenario]')];
 const state=document.getElementById('show-state'); const copy=document.getElementById('scenario-copy'); const restore=document.getElementById('restore');
 if(!flats.length) return;
 let timer; const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function apply(key,manual=false){const s=scenarios[key]||scenarios.steady; flats.forEach(f=>f.dataset.health=s.health[f.dataset.book]); tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.scenario===key))); state.textContent=s.state; copy.innerHTML='<strong>Decision:</strong> '+s.copy; if(manual&&timer){clearInterval(timer);timer=null}}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>apply(tab.dataset.scenario,true));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:e.key==='ArrowRight'?(i+1)%tabs.length:(i-1+tabs.length)%tabs.length;tabs[n].focus();apply(tabs[n].dataset.scenario,true)})});
 restore?.addEventListener('click',()=>apply('steady',true));
 if(!reduced){let idx=0;const keys=Object.keys(scenarios);timer=setInterval(()=>{idx=(idx+1)%keys.length;apply(keys[idx])},6000)}
})();
