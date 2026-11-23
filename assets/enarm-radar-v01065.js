/* KidBum ENARM 1.1 · Radar de Conocimiento + repaso espaciado.
 * Pure module: no personal health data, no network, no client storage access.
 * Supports old v1 records without invented timestamps; imported attempts
 * that lack a due date are eligible for first review immediately. */
(function(root,factory){
 'use strict';
 const api=factory();
 root.KidBumENARMRadar=api;
 if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const DAY=86400000;
 const INTERVALS=[1,3,7,14,30,60];
 function nonneg(n,max=10000){return Number.isSafeInteger(n)&&n>=0&&n<=max?n:0;}
 function stamp(n){return Number.isSafeInteger(n)&&n>0&&n<8640000000000000?n:0;}
 function normalize(input){
  const h=input&&typeof input==='object'?input:{};
  const seen=nonneg(h.seen);
  const right=Math.min(seen,nonneg(h.right));
  const wrong=Math.min(seen-right,nonneg(h.wrong));
  return{
   seen,right,wrong,
   streak:Math.min(6,nonneg(h.streak)),
   lastAt:stamp(h.lastAt),dueAt:stamp(h.dueAt),
   intervalDays:nonneg(h.intervalDays,60)
  };
 }
 function record(previous,isCorrect,at=Date.now()){
  const p=normalize(previous),now=stamp(at)||Date.now();
  // Repeating an already-correct item BEFORE its scheduled review date
  // can improve practice counts, but must not accelerate the spaced interval.
  const early=isCorrect&&p.streak>0&&p.dueAt>now;
  const streak=isCorrect?(early?p.streak:Math.min(p.streak+1,6)):0;
  const intervalDays=isCorrect?(early?(p.intervalDays||INTERVALS[streak-1]):INTERVALS[streak-1]):0;
  return{
   seen:Math.min(10000,p.seen+1),
   right:Math.min(10000,p.right+(isCorrect?1:0)),
   wrong:Math.min(10000,p.wrong+(isCorrect?0:1)),
   streak,lastAt:now,dueAt:early?p.dueAt:now+intervalDays*DAY,intervalDays
  };
 }
 function due(h,now=Date.now()){
  const p=normalize(h);
  return p.seen>0&&(!p.dueAt||p.dueAt<=now);
 }
 function weak(h){
  const p=normalize(h);
  return p.wrong>0&&p.streak<2;
 }
 function scores(bank,history={},now=Date.now()){
  const areas=bank.areas.map(name=>({area:name,attempts:0,correct:0,wrong:0,seenQuestions:0,totalQuestions:0,dueQuestions:0,weakQuestions:0,percent:null,smallSample:true}));
  const map=new Map(areas.map(x=>[x.area,x]));
  let dueQuestions=0,weakQuestions=0,nextDueAt=0,seenQuestions=0;
  const dueCaseIds=[];
  for(const c of bank.cases){
   const row=map.get(c.area);if(!row)continue;
   let anyDue=false;
   c.questions.forEach((q,i)=>{
    row.totalQuestions++;
    const h=normalize(history[c.id+'-'+i]);
    if(h.seen){
     seenQuestions++;row.seenQuestions++;
     row.attempts+=h.seen;row.correct+=h.right;row.wrong+=h.wrong;
     if(due(h,now)){row.dueQuestions++;dueQuestions++;anyDue=true;}
     else if(h.dueAt&&(!nextDueAt||h.dueAt<nextDueAt))nextDueAt=h.dueAt;
     if(weak(h)){row.weakQuestions++;weakQuestions++;}
    }
   });
   if(anyDue)dueCaseIds.push(c.id);
  }
  areas.forEach(x=>{
   x.percent=x.attempts?Math.round(100*x.correct/x.attempts):null;
   x.smallSample=x.attempts<5;
  });
  const credible=areas.filter(x=>x.attempts>=5);
  const weakest=credible.length?credible.slice().sort((a,b)=>a.percent-b.percent||b.attempts-a.attempts)[0]:null;
  return{areas,seenQuestions,dueQuestions,dueCaseIds,weakQuestions,nextDueAt,weakest};
 }
 function dueCases(bank,history,area='Todas',now=Date.now()){
  return bank.cases.filter(c=>(area==='Todas'||c.area===area)&&c.questions.some((q,i)=>due(history[c.id+'-'+i],now)));
 }
 function sortDue(cases,history,now=Date.now()){
  return cases.slice().sort((a,b)=>{
   function priority(c){
    let score=-Infinity;
    for(let i=0;i<c.questions.length;i++){
     const h=normalize(history[c.id+'-'+i]);
     if(!due(h,now))continue;
     const lateness=h.dueAt?Math.min(90,Math.max(0,(now-h.dueAt)/DAY)):90;
     score=Math.max(score,100+lateness+h.wrong*3-h.streak*2);
    }
    return score;
   }
   return priority(b)-priority(a)||a.id.localeCompare(b.id);
  });
 }
 return Object.freeze({DAY,INTERVALS,normalize,record,due,weak,scores,dueCases,sortDue});
});
