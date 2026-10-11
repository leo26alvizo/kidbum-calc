(function(root){
'use strict';
const ids=Object.freeze(['winter','deltaratio','fena','feurea']);
function numeric(value,name,min,max){
 let n=NaN;
 if(typeof value==='number') n=value;
 else if(typeof value==='string'){
   const clean=value.trim().replace(',','.');
   if(/^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(clean))n=Number(clean);
 }
 if(!Number.isFinite(n)||n<min||n>max)throw new Error(name+': dato obligatorio o fuera de rango ('+min+'–'+max+').');
 return n;
}
function choice(value,name,allowed){
 if(!allowed.includes(value))throw new Error(name+': selecciona una opción válida.');
 return value;
}
function output(value,unit,interpretation,notes,detail){
 if(!Number.isFinite(value))throw new Error('Resultado no finito; verifica los valores.');
 return {value,unit,interpretation,notes,detail};
}
function calculate(id,data){
 if(!ids.includes(id))return {error:['Calculadora hospitalaria desconocida.']};
 const x=data||{};
 try{
  if(id==='winter'){
    const h=numeric(x.hco3,'Bicarbonato',2,23.9);
    let measured=null;
    if(x.paco2!==undefined&&String(x.paco2).trim()!=='')measured=numeric(x.paco2,'PaCO₂ arterial medida',10,100);
    const center=1.5*h+8,low=center-2,high=center+2;
    const notes=[
      'Aplicar únicamente si la acidosis metabólica es el trastorno primario, confirmado con gasometría, pH y contexto clínico.',
      'Usar PaCO₂ arterial; la pCO₂ venosa no equivale directamente a la arterial.',
      'Una desviación de la compensación esperada sugiere un trastorno respiratorio asociado; no lo confirma aisladamente.'
    ];
    let interpretation='PaCO₂ esperada: '+low.toFixed(1)+'–'+high.toFixed(1)+' mmHg.';
    if(measured!==null){
       if(measured>high)interpretation+=' La PaCO₂ observada supera el intervalo: valorar acidosis respiratoria concomitante.';
       else if(measured<low)interpretation+=' La PaCO₂ observada está por debajo: valorar alcalosis respiratoria concomitante.';
       else interpretation+=' La PaCO₂ observada está dentro del intervalo estimado.';
    }
    return output(center,'mmHg',interpretation,notes,'Winter: PaCO₂ esperada = 1.5 × HCO₃⁻ + 8 ± 2 mmHg. Bicarbonato '+h+' mmol/L.'+(measured!==null?' PaCO₂ arterial observada '+measured+' mmHg.':''));
  }
  if(id==='deltaratio'){
    const ag=numeric(x.ag,'Brecha aniónica',0,80);
    const h=numeric(x.hco3,'Bicarbonato',2,40);
    const agref=numeric(x.agref,'AG de referencia sin potasio',3,20);
    const href=numeric(x.hcoref,'HCO₃⁻ de referencia',20,30);
    if(ag<=agref)return {error:['El delta ratio requiere brecha aniónica elevada sobre el valor de referencia.']};
    if(h>=href)return {error:['El HCO₃⁻ medido debe ser menor que el HCO₃⁻ de referencia: no se puede calcular un delta ratio interpretable.']};
    const da=ag-agref,dh=href-h,v=da/dh;
    const interpretation=v<0.8?'Delta ratio bajo: explorar acidosis metabólica de brecha normal coexistente.':v>2?'Delta ratio alto: explorar alcalosis metabólica u otra causa coexistente.':'Relación delta dentro de un intervalo orientativo; no descarta trastornos mixtos.';
    return output(v,'relación',interpretation,[
      'Calcular AG sin potasio y, si es posible, corregirlo por albúmina antes de este análisis. Usar el intervalo normal del laboratorio.',
      'El delta ratio es una pista, no un diagnóstico. Su relación varía entre etiologías y durante la evolución clínica.',
      'Correlacionar con gasometría, electrolitos, albúmina, lactato, cuerpos cetónicos y compensación respiratoria según el caso.'
    ],'ΔAG/ΔHCO₃ = (AG − AG referencia) / (HCO₃ referencia − HCO₃ medido) = '+da.toFixed(2)+' / '+dh.toFixed(2)+'.');
  }
  if(id==='fena'){
    const un=numeric(x.una,'Sodio urinario',0.1,300);
    const pn=numeric(x.pna,'Sodio plasmático',90,200);
    const uc=numeric(x.ucr,'Creatinina urinaria',0.1,500);
    const pc=numeric(x.pcr,'Creatinina plasmática',0.1,25);
    const diuretics=choice(x.diuretics,'Uso de diuréticos',['true','false']);
    const v=100*(un*pc)/(pn*uc);
    const notes=[
      'La FeNa NO diferencia por sí sola lesión renal prerrenal e intrínseca. El punto de corte clásico de 1 % no es absoluto.',
      'Se necesita muestra de orina y sangre idealmente cercanas en el tiempo; creatininas en la misma unidad (mg/dL).',
      'Interpretación limitada con enfermedad renal crónica, sepsis, lesión glomerular, contraste, obstrucción y otros contextos.',
      diuretics==='true'?'Se declaró uso de diuréticos: puede elevar la FeNa y modificar su interpretación.':'Incluso sin diuréticos, correlacionar con sedimento urinario, diuresis, volumen clínico y tendencia de creatinina.'
    ];
    return output(v,'%',v<1?'FeNa <1 %: retención renal relativa de sodio; no determina la causa de la lesión renal.':'FeNa ≥1 %: no define lesión tubular ni descarta hipoperfusión renal.',notes,'FeNa (%) = [(Na urinario × creatinina plasmática) / (Na plasmático × creatinina urinaria)] × 100.');
  }
  const uu=numeric(x.ureaU,'Urea/BUN urinario',0.1,3000);
  const up=numeric(x.ureaP,'Urea/BUN plasmático',0.1,1000);
  const uc=numeric(x.ucr,'Creatinina urinaria',0.1,500);
  const pc=numeric(x.pcr,'Creatinina plasmática',0.1,25);
  const units=choice(x.ureaunit,'Unidad de urea/BUN',['urea_mgdl','bun_mgdl','urea_mmoll']);
  const diuretics=choice(x.diuretics,'Uso de diuréticos',['true','false']);
  const v=100*(uu*pc)/(up*uc);
  const notes=[
    'Los valores de orina y plasma deben representar ambos UREA o ambos BUN y estar en la MISMA unidad; no mezclar urea mg/dL con BUN mg/dL.',
    'Las creatininas urinaria y plasmática deben estar expresadas ambas en mg/dL.',
    'FeUrea <35 % es un umbral clásico orientativo y NO confirma causa prerrenal ni excluye daño tubular.',
    'La evidencia es heterogénea, especialmente en UCI, sepsis, ERC y pacientes con diuréticos.',
    diuretics==='true'?'Con diuréticos, FeUrea podría aportar información adicional, pero su rendimiento sigue siendo variable.':'Sin diuréticos, tampoco debe interpretarse de forma aislada.'
  ];
  return output(v,'%',v<35?'FeUrea <35 %: patrón de conservación relativa de urea; requiere contexto clínico.':'FeUrea ≥35 %: no diagnostica daño renal intrínseco ni excluye hipoperfusión.',notes,'FeUrea (%) = [(Urea urinaria × creatinina plasmática) / (Urea plasmática × creatinina urinaria)] × 100. Forma declarada: '+({urea_mgdl:'urea mg/dL',bun_mgdl:'BUN mg/dL',urea_mmoll:'urea mmol/L'})[units]+'.');
 }catch(err){return {error:[String(err.message||err)]};}
}
root.KidBumHospital=Object.freeze({ids,calculate});
})(typeof globalThis!=='undefined'?globalThis:this);
