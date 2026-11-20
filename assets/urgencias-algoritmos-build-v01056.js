/* KidBum Urgencias/UCI v0.10.56 · graph assembly and pure decision API */
(function(root){
'use strict';
const draft=root.KidBumCriticalDraft;
if(!draft)throw Error('Urgencias: fuente del motor no cargada');
const algorithms=Object.freeze([...draft.algorithms]);
if(algorithms.length!==40)throw Error('Se esperaban 40 rutas clínicas de urgencias');
const byId=Object.freeze(Object.fromEntries(algorithms.map(a=>[a.id,a])));
if(Object.keys(byId).length!==algorithms.length)throw Error('IDs duplicados en Urgencias');
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
function search(query='',category='all'){
 const q=normalize(query);
 return algorithms.filter(a=>(category==='all'||a.category===category)&&(!q||normalize(a.id+' '+a.title+' '+a.subtitle+' '+a.category+' '+a.scope).includes(q)));
}
function getStep(id,nodeId){
 const a=byId[id];if(!a)return null;
 const n=nodeId||a.start;
 return a.nodes[n]?{kind:'question',data:a.nodes[n],id:n}:a.outcomes[n]?{kind:'outcome',data:a.outcomes[n],id:n}:null;
}
function transition(id,node,index){
 const step=getStep(id,node);
 if(!step||step.kind!=='question'||!Number.isInteger(index))return null;
 const next=step.data.choices[index]?.next;
 return next&&getStep(id,next)?next:null;
}
function validate(){
 const errors=[];
 for(const a of algorithms){
  if(!a.scope||!a.sources?.length||a.scope.indexOf('Adultos')<0)errors.push(a.id+': scope/fuentes adultos incompletos');
  const visited=new Set(),stack=new Set();
  function walk(n){
   if(stack.has(n)){errors.push(a.id+': ciclo '+n);return;}
   if(visited.has(n))return;
   const step=getStep(a.id,n);
   if(!step){errors.push(a.id+': nodo no encontrado '+n);return;}
   visited.add(n);
   if(step.kind==='question'){
    stack.add(n);
    const ch=step.data.choices;
    if(ch.length<2||ch.length>4)errors.push(a.id+': decisiones inválidas '+n);
    for(const c of ch){if(!c.label||!c.next)errors.push(a.id+': enlace incompleto');else walk(c.next);}
    stack.delete(n);
   }else if(!['warning','danger'].includes(step.data.tone)||step.data.actions.length<2)errors.push(a.id+': desenlace inseguro '+n);
  }
  walk(a.start);
  for(const n of [...Object.keys(a.nodes),...Object.keys(a.outcomes)])if(!visited.has(n))errors.push(a.id+': rama no alcanzable '+n);
  if(!a.nodes[a.start]?.choices.some(c=>c.tone==='danger'))errors.push(a.id+': no inicia con peligro');
  if(!a.nodes[a.start]?.choices.some(c=>/determinar|valorar|informaci[oó]n|confirmar|certeza/i.test(c.label)))errors.push(a.id+': sin salida de incertidumbre');
 }
 return errors;
}
const lib=Object.freeze({version:'0.10.56',algorithms,byId,normalize,search,getStep,transition,validate});
const errors=validate();if(errors.length)throw Error('Grafo Urgencias inválido: '+errors.join('; '));
root.KidBumCriticalAlgorithms=lib;
delete root.KidBumCriticalDraft;
})(typeof window!=='undefined'?window:globalThis);
