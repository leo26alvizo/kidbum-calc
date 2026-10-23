'use strict';
/* Pure, deterministic examples for learning. NO patient information. Each entry
   supplies every input; never interpret missing or default inputs as absent. */
(function(global){
const examples=Object.freeze({
 pecarn:{
  infant:{gcs:'no',fracture:'no',hematoma:'yes',loc:'no',mechanism:'no',parent:'no'},
  older:{gcs:'no',fracture:'no',loc:'no',vomit:'yes',mechanism:'no',headache:'no'}},
 silverman:{chest:'1',intercostal:'1',xiphoid:'1',nasal:'0',grunt:'1'},
 ballard:{b0:'3',b1:'3',b2:'2',b3:'2',b4:'1',b5:'1',b6:'3',b7:'2',b8:'3',b9:'2',b10:'3',b11:'3'},
 pram:{sat:'1',supra:'0',scalene:'0',air:'1',wheeze:'1'},
 kdigo:{baseline:'1',current:'1.9',delta48:'no',within7:'yes',urine:'1',rrt:'no'},
 heart:{history:'1',ecg:'1',age:'1',risk:'1',trop:'0'},
 grace:{age:'66',heart:'102',sbp:'108',creat:'1.4',killip:'2',st:'yes',arrest:'no',trop:'yes'},
 meld:{female:'0',bilirubin:'2.5',inr:'1.7',cr:'1.3',na:'133',albumin:'3',dialysis:'no'},
 ich:{gcs:'1',age:'no',volume:'yes',ventricle:'no',infratentorial:'no'},
 bisap:{bun:'yes',mental:'no',sirs:'yes',age:'no',effusion:'no'},
 aims65:{alb:'yes',inr:'no',mental:'no',sbp:'no',age:'yes'},
 appendicitis:{
  alvarado:{migration:'1',anorexia:'1',nausea:'1',tender:'2',rebound:'0',fever:'1',wbc:'2',left:'0'},
  air:{vomit:'1',pain:'1',rebound:'2',fever:'0',pmn:'1',wbc:'1',crp:'1'}},
 westley:{stridor:'1',retractions:'1',air:'0',cyanosis:'0',mental:'0'},
 pews:{behavior:'1',cv:'1',resp:'1',nebs:'0',vomiting:'0'},
 nexus:{midline:'yes',neuro:'no',alert:'no',intox:'no',distract:'no'},
 ottawa:{
  ankle:{pain:'yes',lat:'yes',med:'no',steps:'no'},
  foot:{pain:'yes',nav:'no',fifth:'yes',steps:'no'}},
 meows:{temp:'37.2',sbp:'145',dbp:'85',hr:'108',rr:'22',neuro:'no',bleed:'no'},
 fullpiers:{ga:'33',spo2:'94',platelet:'92',creatinine:'1.3',ast:'85',chest:'no'},
 at4:{alert:'0',amt4:'1',attention:'1',acute:'4'},
 frailty:{cfs:'5'}
});
const cardio=Object.freeze({
 geneva:{age:'no',history:'no',surgery:'no',cancer:'no',pain:'yes',blood:'no',hr:'98',leg:'no'},
 pesi:{age:'64',sex:'female',cancer:'no',heart:'no',lung:'no',hr:'100',sbp:'115',rr:'22',temp:'36.8',spo2:'95',mental:'no'},
 bova:{sbp:'95',hr:'112',trop:'yes',rv:'yes'},
 sgarbossa:{context:'lbbb',stecon:'0',stdcon:'0',stedisc:'3',swave:'10'}
});
const capurro=Object.freeze({
 neuro:{ear:16,mammary:10,skin:10,soles:10,scarf:6,head:8},
 somatic:{ear:16,mammary:10,nipple:10,skin:10,soles:10}
});
const wallace=Object.freeze(['chest','abdomen','rarm-f']);
function clone(item){if(!item||typeof item!=='object')return null;return Array.isArray(item)?[...item]:{...item}}
function twenty(id,variant){const item=examples[id];return clone(variant&&item&&item[variant]?item[variant]:item)}
function forCardio(id){return clone(cardio[id])}
function forCapurro(mode){return clone(capurro[mode])}
function forWallace(){return clone(wallace)}
global.KidBumFictitiousExamples=Object.freeze({twenty,forCardio,forCapurro,forWallace});
})(window);
