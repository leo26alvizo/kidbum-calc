/* KIDBUM Medical Atlas Editorial · visual-only illustration library.
 * Original vector scientific illustrations: educational visual aids, not diagnostic plates.
 * No network, no telemetry; every clinical ID maps to its own composition.
 */
(function(root){
'use strict';
const categoryMap=Object.freeze({
 'Química clínica':'anion','Antropometría':'bmi','Hemodinámica':'map','Función renal':'egfr',
 'Hepatología':'fib4','Escalas clínicas':'gcs','Ginecología y obstetricia':'agfum','Pediatría':'pedwfa'
});
const ids=['anion','osm','bmi','bsa','map','shock','egfr','cg','fib4','qsofa','curb',
 'correctedna','news2','wellsdvt','wellspe','perc','childpugh','agfum','fppfum','fppus','bishop','obshock','gcs','pedwfa','pedlhfa','pedhcfa','pedbmifa','pedwfl','pediou','pedbalance','pedholliday','ped421','pedneofluids','pedcorrected','peddehydration','pedinsensible','pedgir','pedsolutions','pedvitals','pedformulavol','pedmilkcal','pedfoodcal','pedmaxverify','pedaccess','pedsupp'];
const anatomy=Object.freeze({
 anion:'Tubos sanguíneos y moléculas de equilibrio ácido-base',
 osm:'Distribución de agua y solutos del plasma',
 bmi:'Composición corporal y tejidos humanos',
 bsa:'Contorno anatómico y superficie corporal',
 map:'Corazón y árbol arterial',
 shock:'Circulación y perfusión periférica',
 egfr:'Riñones y glomérulo',
 cg:'Riñón y túbulos renales',
 fib4:'Parénquima hepático y fibrosis',
 qsofa:'Corazón, pulmones y perfusión sistémica',
 curb:'Pulmones y árbol bronquial',
 correctedna:'Plasma, glucosa y electrolitos',
 news2:'Sistema respiratorio y circulación',
 wellsdvt:'Venas profundas de la extremidad inferior',
 wellspe:'Arterias pulmonares y trombo',
 perc:'Circulación pulmonar y vasos',
 childpugh:'Hígado y circulación portal',
 agfum:'Útero gestante y desarrollo fetal',
 fppfum:'Gestación y cronología obstétrica',
 fppus:'Ultrasonografía obstétrica',
 bishop:'Cuello uterino y pelvis',
 obshock:'Circulación materno-placentaria',
 gcs:'Cerebro y tronco encefálico',
 pedwfa:'Crecimiento ponderal y antropometría infantil',
 pedlhfa:'Crecimiento lineal y medición de talla',
 pedhcfa:'Cráneo infantil y medición de perímetro cefálico',
 pedbmifa:'Composición corporal y crecimiento pediátrico',
 pedwfl:'Peso relativo a la longitud o talla',
 pediou:'Riñón y fisiología de producción urinaria infantil',
 pedbalance:'Intercambio de agua, riñón y fluidoterapia',
 pedholliday:'Distribución del agua corporal pediátrica',
 ped421:'Mantenimiento hídrico y flujos por peso',
 pedneofluids:'Fisiología de líquidos del neonato',
 pedcorrected:'Prematuridad y cronología del desarrollo',
 peddehydration:'Cambios de peso y estado de hidratación',
 pedinsensible:'Evaporación cutánea y superficie corporal',
 pedgir:'Glucosa intravenosa y metabolismo celular',
 pedsolutions:'Concentraciones de cloruro de sodio y dextrosa',
 pedvitals:'Corazón y pulmones: signos vitales por edad',
 pedformulavol:'Alimentación láctea del lactante',
 pedmilkcal:'Leche y balance energético',
 pedfoodcal:'Macronutrientes y digestión',
 pedmaxverify:'Seguridad de medicamento y dosis por peso',
 pedaccess:'Sistema venoso periférico y central',
 pedsupp:'Suplementación y nutrición infantil'
});
const P={
  pink:'#d99689',red:'#a94c45',darkred:'#873b3e',blue:'#426d89',teal:'#397b7e',ivory:'#f0d9b7',
  gold:'#d8b881',brown:'#94644e'
};
const path=(d,fill,stroke='#6c4742',w=2,extra='')=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'" stroke-linejoin="round" '+extra+'/>';
const line=(d,color=P.blue,w=3,extra='')=>'<path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" '+extra+'/>';
const circle=(x,y,r,fill,stroke='none',w=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'"/>';
const ellipse=(x,y,rx,ry,fill,stroke='none',w=1)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'"/>';
const defs='<defs>'
 +'<linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f6e8d9"/><stop offset=".58" stop-color="#e7ddd1"/><stop offset="1" stop-color="#d1e4e7"/></linearGradient>'
 +'<linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#efb8aa"/><stop offset=".52" stop-color="#c67b70"/><stop offset="1" stop-color="#8a4543"/></linearGradient>'
 +'<linearGradient id="v" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#95aebc"/><stop offset=".52" stop-color="#547a95"/><stop offset="1" stop-color="#344c70"/></linearGradient>'
 +'<linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c38259"/><stop offset=".5" stop-color="#93523b"/><stop offset="1" stop-color="#6c3d36"/></linearGradient>'
 +'<linearGradient id="k" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b8857a"/><stop offset=".5" stop-color="#985c58"/><stop offset="1" stop-color="#723f45"/></linearGradient>'
 +'<linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e7b0a6"/><stop offset="1" stop-color="#a96366"/></linearGradient>'
 +'<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dce6e6" stop-opacity=".9"/><stop offset="1" stop-color="#89adb6" stop-opacity=".4"/></linearGradient>'
 +'<pattern id="grain" width="17" height="17" patternUnits="userSpaceOnUse"><circle cx="2" cy="5" r=".6" fill="#9a755c" opacity=".24"/><circle cx="12" cy="14" r=".7" fill="#7c7890" opacity=".2"/></pattern>'
 +'<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="2" dy="6" stdDeviation="6" flood-color="#402922" flood-opacity=".19"/></filter>'
 +'</defs>';
function bg(){
 return '<rect width="520" height="300" rx="22" fill="url(#t)"/>'
 +'<rect width="520" height="300" rx="22" fill="url(#grain)" opacity=".75"/>'
 +line('M-10 254 Q75 225 135 264 M357 18 Q439 67 535 31','#b3b4a3',1.1,'opacity=".4"');
}
function heart(x=260,y=75,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=path('M-12 25 C-76-18 -101 64 -62 106 C-33 136 -4 164 15 174 C40 152 76 118 80 76 C85 16 45 4 16 39 C10 19 1 19 -12 25Z','url(#f)',P.darkred,3);
 g+=line('M-8 20 C-5-20 16-39 27-64 M22 35 C31-14 60-16 76-36',P.red,17);
 g+=line('M-8 20 C-5-20 16-39 27-64 M22 35 C31-14 60-16 76-36','#ecaea0',8);
 g+=line('M-30 57 C-44 24 -53 3 -72-5 M-24 72 C-2 64 18 65 43 87',P.blue,12);
 g+=line('M-25 90 C-19 115 -8 126 13 145 M13 82 C18 110 18 141 15 160','#f0c6a6',2.5);
 g+=line('M-47 76 Q-16 51 -5 84 M27 53 Q48 69 50 97','#753f48',1.7);
 return g+'</g>';
}
function lungs(x=260,y=34,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=path('M-35 56 C-56 38 -72 59 -99 105 C-127 170 -137 242 -88 245 C-40 250 -14 211 -17 164 L-23 86Z','url(#b)','#9f6965',2);
 g+=path('M34 56 C57 38 78 67 97 103 C127 159 144 249 87 245 C43 246 18 219 15 175 L23 81Z','url(#b)','#9f6965',2);
 g+=path('M-9 3 L-9 64 L-39 102 M9 3 L9 64 L43 105','none','#b88b75',20);
 g+=line('M0 0 L0 60 M-1 60 L-39 103 M1 60 L42 104','#e8d3bb',11);
 for(let i=0;i<8;i++)g+=line('M-8 '+(7+i*7)+' h16','#be9d91',1.5);
 for(const side of [-1,1])for(let i=0;i<5;i++){
 const yy=112+i*22;g+=line('M'+(side*43)+' 91 Q'+(side*(63+i*4))+' '+(yy-7)+' '+(side*(83+i*3))+' '+yy,'#a4757a',2.4);
 g+=line('M'+(side*(83+i*3))+' '+yy+' l'+(side*15)+' -9','#b68883',1.2);
 }
 return g+'</g>';
}
function kidney(x=265,y=38,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 for(const side of [-1,1]){
  const shift=side*65;g+='<g transform="translate('+shift+' 0) scale('+side+' 1)">';
  g+=path('M-20 20 C-85 11 -90 84 -66 161 C-45 227 15 233 39 181 C56 148 22 142 23 125 C29 103 58 86 39 54 C28 33 7 22 -20 20Z','url(#k)','#7f4b49',3);
  g+=line('M12 54 C-8 66 -30 99 -24 136 Q-25 173 9 194','#d9a49b',2);
  g+=line('M35 120 C8 130 -14 146 -24 165','#ebc8a5',5);
  g+='</g>';
 }
 g+=line('M0 0 V240',P.blue,18)+line('M24 0 V240',P.red,13);
 g+=line('M0 128 L-43 117 M0 130 L48 123',P.blue,10);
 g+=line('M24 138 L-39 130 M24 136 L51 132',P.red,7);
 g+=line('M-25 184 Q-42 220 -22 255 M40 184 Q55 221 40 255','#deb98b',7);
 return g+'</g>';
}
function nephron(){
 let p='<g transform="translate(392 167)">';
 p+=circle(0,0,82,'#eed5b2','#a97b64',2);
 p+=circle(-7,-10,32,'#b86560','#ad6f5d',2);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;p+=ellipse(-7+15*Math.cos(a),-10+15*Math.sin(a),8,10,'#d59a8b','#965a59',1)}
 p+=line('M23 6 Q48 15 26 33 Q-17 48 4 63 Q26 81 45 59 Q60 42 30 36','#b27b62',11);
 p+=line('M23 6 Q48 15 26 33 Q-17 48 4 63 Q26 81 45 59 Q60 42 30 36','#efd0ab',6);
 p+='</g>';return p;
}
function liver(x=264,y=66,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=path('M-157 40 Q-123 -19 -33 0 Q0 24 32 16 C102 5 160 28 151 93 C121 148 43 172 -4 136 C-88 188 -158 162 -162 103Z','url(#l)','#824632',3);
 g+=line('M-11 13 C-6 43 -14 100 -2 139','#d8a57e',5);
 g+=line('M-139 87 Q-65 42 -26 103 M27 112 Q99 65 137 87','#ab755f',2);
 g+=path('M-9 151 Q-4 209 24 192 Q41 174 14 147Z','#9b9d56','#5d694d',2);
 g+=line('M-4 -14 V43',P.blue,14)+line('M-4 43 Q-44 65 -79 58',P.blue,7);
 g+=line('M24 154 Q39 196 46 224','#9b9857',7);
 return g+'</g>';
}
function brain(x=264,y=56,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=path('M-125 123 C-182 60 -132 -12 -59 -11 C4 -43 91 -8 125 50 C173 133 104 200 57 188 C20 213 -20 203 -52 176 C-95 173 -110 148 -125 123Z','url(#f)','#945b59',3);
 for(const [a,b,c,d] of [[-111,51,-53,29],[-106,93,-42,66],[-118,124,-38,106],[-53,12,-27,71],[-18,9,10,67],[20,20,54,84],[59,13,85,87],[91,39,120,109],[-59,113,-14,173],[26,108,95,168]]){
 g+=line('M'+a+' '+b+' q'+(c-a)/2+' -19 '+(c-a)+' '+(d-b)+'','#9c5c57',4);
 }
 g+=path('M-13 82 Q32 53 54 93 C58 119 20 143 17 161 L10 215 L-17 215 L-11 130Z','#d8bdab','#9c786d',2);
 g+=ellipse(58,173,48,37,'#b77c70','#945b54',2);
 for(let j=0;j<6;j++)g+=line('M23 '+(157+j*6)+' Q63 '+(148+j*8)+' 94 '+(164+j*4),'#e3c3ac',1.4);
 return g+'</g>';
}
function uterus(x=270,y=16,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=path('M-74 94 C-100 32 -58 3 -4 5 C74 0 113 52 83 110 C95 171 63 203 23 213 L17 264 L-15 264 L-19 215 C-78 199 -103 159 -74 94Z','url(#f)','#a65e59',5);
 g+=path('M-53 95 C-75 53 -33 24 1 27 C46 19 87 58 61 99 C62 156 45 180 5 185 C-36 184 -65 147 -53 95Z','#ecbcb3','#c37f7b',2);
 g+=path('M-15 217 Q0 200 17 217 L14 255 L-12 255Z','#efc6b8','#ba7a74',2);
 g+=circle(11,114,45,'#f3d5bf','#be887b',2);
 g+=path('M-2 92 C4 68 32 72 37 88 Q58 107 28 125 C52 138 25 155 5 149 Q-24 146 -24 121 Q-16 106 -2 92Z','#d6a08a','#a46c66',2);
 g+=circle(15,79,14,'#d9a38c','#a86d64',1.5);
 g+=line('M-1 135 Q-14 158 11 166 Q28 168 36 151','#bd8a9c',6);
 g+=line('M-55 97 Q-73 58 -33 38','#b16568',11);
 return g+'</g>';
}
function tubes(){
 let g='<g transform="translate(240 24)" filter="url(#shadow)">';
 for(const [xx,hh,col] of [[-95,210,'#b55b54'],[-17,237,'#d7ae66'],[58,184,'#6b9bae'],[127,216,'#bf7267']]){
 g+='<g transform="translate('+xx+' '+(245-hh)+')">';
 g+='<rect x="-23" y="5" width="46" height="'+(hh-15)+'" rx="12" fill="url(#glass)" stroke="#658494" stroke-width="3"/>';
 g+='<rect x="-16" y="'+(hh*.42)+'" width="32" height="'+(hh*.55-20)+'" rx="6" fill="'+col+'" opacity=".85"/>';
 g+='<rect x="-26" y="0" width="52" height="20" rx="5" fill="#66829a" stroke="#395568" stroke-width="2"/>';
 g+=line('M-11 31 V'+(hh-30),'white',3,'opacity=".5"')+'</g>';
 }
 return g+'</g>';
}
function body(x=265,y=17,s=1){
 let g='<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#shadow)">';
 g+=circle(0,28,29,'#d4a78e','#966e63',2);
 g+=path('M-49 59 Q-87 63 -94 101 L-120 205 L-97 211 L-67 120 L-55 153 L-48 250 L-11 250 L0 178 L13 250 L50 250 L57 154 L68 123 L97 212 L120 205 L96 101 Q85 65 49 59 Q20 75 0 69 Q-20 77 -49 59Z','#d2a48c','#986e61',3);
 g+=path('M-42 85 Q0 72 43 85 L40 157 Q7 168 0 151 Q-10 168 -40 157Z','#bd8776','#96695a',2);
 g+=line('M0 84 V153 M-34 112 Q-8 120 0 137 M34 112 Q8 120 0 137','#e7bda7',2);
 return g+'</g>';
}
function veins(){
 let g='<g transform="translate(236 14)" filter="url(#shadow)">';
 g+=path('M-42 0 C-64 67 -36 130 -44 197 L-49 273 L20 273 C28 199 34 131 45 68 Q49 32 28 0Z','#d1a28b','#936d63',3);
 g+=line('M-17 255 Q-13 185 -3 137 Q-22 87 -2 27',P.blue,18);
 g+=line('M-17 255 Q-13 185 -3 137 Q-22 87 -2 27','#83a6ba',5);
 g+=ellipse(-5,149,16,26,P.darkred,'#5c2835',2);
 g+=line('M2 214 Q19 191 23 170 M-4 111 Q24 92 15 43','#567c92',5);
 return g+'</g>';
}
function vascular(){
 let g=heart(267,49,.85);
 g+=line('M233 195 Q164 229 135 245 M290 194 Q364 223 401 248',P.blue,8);
 g+=line('M245 203 Q190 241 162 264 M281 205 Q337 234 370 263',P.red,6);
 for(let i=0;i<5;i++){const a=145+i*30;g+=line('M'+a+' 241 l'+(i%2?-9:8)+' 20','#bc8180',2)}
 return g;
}
function focus(id){
 let g='';
 if(id==='anion'){g=tubes();g+=circle(100,78,15,'#c28379','#9f665f',2)+circle(145,110,12,'#8aacb0','#5a8389',2);g+=line('M100 78 L145 110','#b29588',2); }
 if(id==='osm'){g=tubes();for(let i=0;i<10;i++){const x=60+i*36,y=60+(i%4)*40;g+=circle(x,y,5+(i%3),'#75acbf','#3f7385',1)}}
 if(id==='correctedna'){g=tubes();g+=ellipse(430,115,48,57,'#ccaa81','#a77768',3);for(let i=0;i<9;i++)g+=circle(384+(i%3)*23,77+Math.floor(i/3)*31,9,['#7daec0','#b78181','#d5bf90'][i%3])}
 if(id==='bmi'){g=body();g+=ellipse(426,191,64,53,'#dfb79b','#aa7d69',2);g+=ellipse(426,191,43,36,'#b67565','#a0645a',1)}
 if(id==='bsa'){g=body();g+=line('M132 249 Q130 64 149 37 M384 249 Q400 83 374 30',P.blue,3,'stroke-dasharray="6 8"')}
 if(id==='map'){g=heart();g+=line('M344 130 Q400 97 450 112 M336 147 Q408 154 466 198',P.red,10);}
 if(id==='shock'){g=vascular();g+=ellipse(418,180,46,25,'#ebc0a8','#b87976',2);}
 if(id==='obshock'){g=heart(164,81,.72)+uterus(378,38,.63);g+=line('M222 188 Q260 200 297 191',P.red,8);}
 if(id==='egfr'){g=kidney(223,35,.9)+nephron();}
 if(id==='cg'){g=kidney(260,31,.9);g+=line('M391 93 Q442 116 428 147 Q411 166 447 187 Q463 196 446 227','#ddba94',12);}
 if(id==='fib4'){g=liver();for(let i=0;i<25;i++){let a=(i*31)%220-100,b=(i*47)%108+94;g+=circle(260+a,6+b,3+(i%3),'#c59c71','#a87b56',.7)}}
 if(id==='childpugh'){g=liver();g+=line('M270 225 Q330 215 370 251',P.blue,12);}
 if(id==='qsofa'){g=lungs(265,12,.76)+heart(258,137,.46);g+=line('M115 260 Q255 270 415 257',P.blue,5);}
 if(id==='curb'){g=lungs();g+=circle(402,195,45,'#f0c3ab','#b47b71',2);for(let i=0;i<7;i++)g+=circle(390+(i%3)*15,181+Math.floor(i/3)*14,7,'#cc9993','#9f6f65',1);}
 if(id==='news2'){g=lungs(219,28,.82)+heart(394,118,.54);}
 if(id==='wellsdvt'){g=veins();g+=ellipse(354,135,40,25,'#e4ba9e','#ab7b67',2);}
 if(id==='wellspe'){g=lungs(252,25,.92);g+=ellipse(322,143,19,12,P.darkred,'#6e3541',1);g+=line('M309 130 Q332 121 351 107','#943e48',5);}
 if(id==='perc'){g=lungs(247,25,.8);g+=line('M349 189 C379 158 415 155 456 179',P.blue,13);g+=ellipse(407,166,12,9,P.darkred);}
 if(id==='agfum'){g=uterus();g+=ellipse(405,108,38,32,'#f0d7bf','#c99789',2);}
 if(id==='fppfum'){g=uterus(191,26,.78);g+=path('M347 100 H466 V218 H347Z','#f1eee6','#a88b74',3);g+=line('M347 137 H466 M370 98 V119 M441 98 V119','#967b72',3);for(let a=0;a<6;a++)g+=circle(367+(a%3)*37,162+Math.floor(a/3)*34,6,'#b59a86');}
 if(id==='fppus'){g=uterus(185,22,.62);g+='<rect x="302" y="66" width="172" height="161" rx="9" fill="#354957" stroke="#7e929c" stroke-width="9"/>';g+=ellipse(389,149,59,61,'#70818a','#b7b5ac',2);g+=ellipse(390,124,26,31,'#c3bfb4','#a49b94',1);}
 if(id==='bishop'){g=uterus(261,16,.96);g+=line('M256 215 L256 278','#8b4446',9);g+=ellipse(260,251,24,12,'#c97f72','#8b4945',2);}
 if(id==='gcs'){g=brain();g+=line('M157 215 Q185 244 203 253','#b79a75',3);}

 // Pediatric clinical visuals: distinct original local diagrams, not diagnostic anatomy plates.
 if(id==='pedwfa'){g=body(212,20,.83);g+=line('M357 50 V241','#397b7e',4);for(let i=0;i<6;i++)g+=line('M349 '+(65+i*33)+' H370','#397b7e',2);g+=ellipse(423,220,60,20,'#d8bd9e','#957f66',2);}
 if(id==='pedlhfa'){g=body(224,19,.84);g+=line('M361 31 V260 M351 31 H373 M351 260 H373','#397b7e',4);for(let i=0;i<11;i++)g+=line('M361 '+(31+i*23)+' H'+(i%2?374:383),'#7a8791',2);}
 if(id==='pedhcfa'){g=circle(253,102,88,'#dfb5a2','#a87764',3);g+=path('M182 126 C182 55 315 26 327 113 Q315 170 252 179 Q200 186 182 126Z','#dfb5a2','#a87764',3);g+=line('M180 99 C230 50 291 59 339 111','#3e8d89',8);g+=line('M180 99 C230 50 291 59 339 111','#e9d5bb',3);}
 if(id==='pedbmifa'){g=body(228,20,.80);g+=ellipse(403,165,61,52,'#e7c1a6','#ab7867',3);g+=path('M384 127 Q422 118 442 165 Q456 204 413 217 Q364 216 366 177Z','#c1876b','#9c6659',2);}
 if(id==='pedwfl'){g=body(213,24,.79);g+=line('M338 55 L338 258 M327 55 H354 M327 258 H354','#487f86',4);g+=ellipse(410,236,54,19,'#d4a480','#9b7164',2);}
 if(id==='pediou'){g=kidney(248,39,.81);g+=path('M399 160 C368 197 370 220 399 234 C429 223 428 203 399 160Z','#7daec4','#4f7e91',3);}
 if(id==='pedbalance'){g=tubes();g+=line('M84 225 H436','#4c7b8b',6);g+=line('M122 205 L122 248 M380 205 L380 248','#4c7b8b',4);g+=ellipse(136,200,50,20,'#d0b08e','#937762',2);g+=ellipse(377,200,50,20,'#a4bbc0','#638c95',2);}
 if(id==='pedholliday'){g=body(205,28,.82);g+=line('M339 73 V237 M370 100 V237 M401 133 V237','#558e9a',14);g+=line('M339 73 V237 M370 100 V237 M401 133 V237','#b8ddda',5);}
 if(id==='ped421'){g=body(216,22,.79);g+=line('M343 58 V250','#638d93',9);g+=line('M381 105 V250','#a7bb9c',9);g+=line('M418 157 V250','#c9a782',9);}
 if(id==='pedneofluids'){g=uterus(228,31,.80);g+=path('M427 128 Q376 180 427 239 Q480 181 427 128Z','#87b0bc','#568390',3);}
 if(id==='pedcorrected'){g=uterus(184,23,.75);g+=circle(399,138,80,'#e4cbb8','#a7856f',2);g+=line('M399 74 V138 L431 151','#4a7d88',7);g+=circle(399,138,7,'#4a7d88');}
 if(id==='peddehydration'){g=body(208,21,.83);g+=path('M409 103 C378 151 368 185 409 220 C450 190 450 146 409 103Z','#7ba9b9','#4d8194',3);g+=line('M400 170 Q388 192 410 204','white',3);}

 if(id==='pedinsensible'){g=body(211,19,.83);for(let i=0;i<6;i++)g+=path('M'+(342+i*21)+' '+(100+i%2*33)+' q-25 -25 0 -44 q25 20 0 44Z','#84adbb','#557e90',1);}
 if(id==='pedgir'){g=tubes();g+=ellipse(426,182,56,44,'#eed2b4','#a88068',2);for(let i=0;i<5;i++)g+=circle(397+(i%3)*23,164+Math.floor(i/3)*26,9,['#c48373','#85a8b1','#b9b06e'][i%3]);}
 if(id==='pedsolutions'){g=tubes();g+=line('M348 91 L471 162','#5f8b99',6);for(let i=0;i<7;i++)g+=circle(378+(i%3)*30,130+Math.floor(i/3)*25,7,i%2?'#749ba8':'#d59f8b');}
 if(id==='pedvitals'){g=lungs(186,23,.7)+heart(385,112,.55);g+=line('M109 258 H149 L164 234 L183 278 L204 244 L220 260 H446','#348c8a',5);}
 if(id==='pedformulavol'){g=body(174,25,.67);g+=path('M332 92 L402 92 L417 240 Q374 273 326 235Z','#e8dad0','#a08376',3);g+=path('M337 175 H408 L405 233 Q374 246 336 230Z','#e4caab','#aa8b74',1);g+=ellipse(375,91,42,14,'#9fb4c0','#6c8391',2);}
 if(id==='pedmilkcal'){g=ellipse(235,153,99,108,'#d4e4e1','#6e9895',3);g+=ellipse(235,154,70,85,'#f3e5ce','#bd9b78',2);g+=line('M353 62 V241','#bd8d72',6);for(let i=0;i<6;i++)g+=line('M352 '+(77+i*31)+' H'+(i%2?380:392),'#8c9d98',2);}
 if(id==='pedfoodcal'){g=liver(160,69,.67);for(let i=0;i<12;i++)g+=circle(340+(i%4)*29,102+Math.floor(i/4)*34,12,['#e4bb7a','#c37e79','#87a9a6'][i%3],'#ae8c7a',1);}
 if(id==='pedmaxverify'){g=body(179,15,.68);g+=path('M344 82 L444 82 L465 226 L324 226Z','#e2e6e3','#69858a',3);g+=circle(394,132,28,'#bf837b','#9a6666',2);g+=line('M393 119 V146 M381 132 H406','white',5);}
 if(id==='pedaccess'){g=veins();g+=line('M356 40 V257','#567e98',13);g+=line('M356 148 Q410 139 441 104','#a56c65',5);}
 if(id==='pedsupp'){g=body(205,20,.78);g+=circle(420,134,64,'#eed5b4','#ac9476',2);g+=path('M390 130 H450 M420 99 V161','#5e8989','none',9);}
 return g;
}
function svg(id){
 if(!ids.includes(id))id='qsofa';
 const linework='<path d="M19 229 Q100 260 168 268 M358 38 Q437 21 495 54" stroke="#aaaba4" stroke-width="1" opacity=".5" fill="none"/>';
 const stamp='<circle cx="475" cy="44" r="21" stroke="#9f9687" stroke-width="1" fill="none" opacity=".4"/>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" aria-hidden="true">'
 +defs+bg()+linework+stamp+focus(id)+'</svg>';
}
const cache=new Map();
function src(id){if(!cache.has(id))cache.set(id,'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg(id)));return cache.get(id)}
function img(id,cls='atlas-img',alt='Ilustración médica editorial',eager=false){
 const safe=ids.includes(id)?id:'qsofa';
 // Hero image is a separately composed atlas illustration. Each individual calculator has its own raster plate.
 const path=safe.startsWith('ped')?src(safe):(eager&&safe==='qsofa'?'./assets/portada-atlas-usuario.webp':'./assets/atlas-'+safe+'.jpg');
 const alternative='./icon.svg';
 const description=String(alt).replace(/[<>"&]/g,'');
 return '<img class="'+cls+'" src="'+path+'" alt="'+description+'" '
 +(eager?'fetchpriority="high" loading="eager"':'loading="lazy"')
 +' decoding="async" onerror="this.onerror=null;this.src=\''+alternative+'\'"/>';
}
root.KidBumAtlas=Object.freeze({ids:Object.freeze(ids),anatomy,categoryMap,svg,src,img});
})(typeof globalThis!=='undefined'?globalThis:this);