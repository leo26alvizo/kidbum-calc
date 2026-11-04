/* KidBum Pharma Pro 0.10.43 · Massive NON-PRESCRIPTIVE discovery index.
 * Names and group placement for search; none is a verified Mexican formulary entry,
 * indication, pediatric authorization, individualized dose, safety clearance or
 * confirmed ISMP risk classification. Existing 15 guideline pathways remain separate.
 * Sources explain taxonomy and editorial strategy, NOT verification of each entry.
 */
(function(root){
'use strict';
const base=root.KidBumPharmaExpansion;
if(!base)return;
const medicationGroups={
'Antimicrobianos · antibacterianos':[
'ceftobiprol|Ceftobiprol','ceftarolina|Ceftarolina','ceftolozano-tazobactam|Ceftolozano / tazobactam','ceftazidima-avibactam|Ceftazidima / avibactam','meropenem-vaborbactam|Meropenem / vaborbactam','imipenem-cilastatina|Imipenem / cilastatina','imipenem-cilastatina-relebactam|Imipenem / cilastatina / relebactam','ertapenem|Ertapenem','doripenem|Doripenem','cefoperazona-sulbactam|Cefoperazona / sulbactam','cefalexina|Cefalexina','cefadroxilo|Cefadroxilo','cefpodoxima|Cefpodoxima','cefdinir|Cefdinir','ceftibuteno|Ceftibuteno','cefaclor|Cefaclor','cefradina|Cefradina','ampicilina-sulbactam|Ampicilina / sulbactam','ticarcilina-clavulanato|Ticarcilina / clavulanato','dicloxacilina|Dicloxacilina','flucloxacilina|Flucloxacilina','cloxacilina|Cloxacilina','moxifloxacino|Moxifloxacino','ofloxacino|Ofloxacino','delafloxacino|Delafloxacino','gemifloxacino|Gemifloxacino','tetraciclina|Tetraciclina','minociclina|Minociclina','tigeciclina|Tigeciclina','eravaciclina|Eravaciclina','omadaciclina|Omadaciclina','tedizolid|Tedizolid','quinupristina-dalfopristina|Quinupristina / dalfopristina','colistimetato|Colistimetato sódico','polimixina-b|Polimixina B','aztreonam|Aztreonam','fosfomicina-iv|Fosfomicina IV (formulación diferenciada)','nitroxolina|Nitroxolina','fidaxomicina|Fidaxomicina','rifaximina|Rifaximina','rifabutina|Rifabutina','rifapentina|Rifapentina','bedaquilina|Bedaquilina','delamanid|Delamanid','pretomanid|Pretomanid','clofazimina|Clofazimina','estreptomicina|Estreptomicina','capreomicina|Capreomicina','linezolid-iv|Linezolid IV (formulación diferenciada)'
],
'Antimicrobianos · antivirales y antifúngicos':[
'ganciclovir|Ganciclovir','valganciclovir|Valganciclovir','foscarnet|Foscarnet','cidofovir|Cidofovir','letermovir|Letermovir','maribavir|Maribavir','remdesivir|Remdesivir','nirmatrelvir-ritonavir|Nirmatrelvir / ritonavir','baloxavir|Baloxavir','zanamivir|Zanamivir','peramivir|Peramivir','entecavir|Entecavir','tenofovir-disoproxil|Tenofovir disoproxilo','tenofovir-alafenamida|Tenofovir alafenamida','lamivudina|Lamivudina','emtricitabina|Emtricitabina','dolutegravir|Dolutegravir','bictegravir|Bictegravir','raltegravir|Raltegravir','darunavir|Darunavir','atazanavir|Atazanavir','efavirenz|Efavirenz','nevirapina|Nevirapina','sofosbuvir-velpatasvir|Sofosbuvir / velpatasvir','glecaprevir-pibrentasvir|Glecaprevir / pibrentasvir','ledipasvir-sofosbuvir|Ledipasvir / sofosbuvir','posaconazol|Posaconazol','isavuconazol|Isavuconazol','itraconazol|Itraconazol','ketoconazol|Ketoconazol','terbinafina|Terbinafina','griseofulvina|Griseofulvina','micafungina|Micafungina','caspofungina|Caspofungina','anidulafungina|Anidulafungina','nystatina|Nistatina','flucitosina|Flucitosina'
],
'Antiparasitarios y medicina tropical':[
'albendazol|Albendazol','mebendazol|Mebendazol','ivermectina|Ivermectina','praziquantel|Praziquantel','niclosamida|Niclosamida','pamoato-pirantel|Pamoato de pirantel','nitazoxanida|Nitazoxanida','secnidazol|Secnidazol','tinidazol|Tinidazol','paromomicina|Paromomicina','miltefosina|Miltefosina','anfotericina-b-desoxicolato|Anfotericina B desoxicolato (ver presentación)','atovacuona-proguanil|Atovacuona / proguanil','artemeter-lumefantrina|Arteméter / lumefantrina','artesunato|Artesunato','cloroquina|Cloroquina','primaquina|Primaquina','tafenoquina|Tafenoquina','pirimetamina|Pirimetamina','sulfadiazina|Sulfadiazina','benznidazol|Benznidazol','nifurtimox|Nifurtimox'
],
'Cardiología y metabolismo lipídico':[
'atorvastatina|Atorvastatina','rosuvastatina|Rosuvastatina','simvastatina|Simvastatina','pravastatina|Pravastatina','fluvastatina|Fluvastatina','pitavastatina|Pitavastatina','ezetimiba|Ezetimiba','fenofibrato|Fenofibrato','gemfibrozilo|Gemfibrozilo','colestiramina|Colestiramina','colesevelam|Colesevelam','evolocumab|Evolocumab','alirocumab|Alirocumab','inclisiran|Inclisirán','ácido-bempedoico|Ácido bempedoico','vericiguat|Vericiguat','riociguat|Riociguat','sildenafil|Sildenafilo','tadalafil|Tadalafilo','bosentan|Bosentán','ambrisentan|Ambrisentán','macitentan|Macitentán','selexipag|Selexipag','ranolazina|Ranolazina','isosorbide-dinitrato|Dinitrato de isosorbida','isosorbide-mononitrato|Mononitrato de isosorbida','nebivolol|Nebivolol','atenolol|Atenolol','sotalol|Sotalol','flecainida|Flecainida','propafenona|Propafenona','dronedarona|Dronedarona','torasemida|Torasemida','bumetanida|Bumetanida','amilorida|Amilorida','triamtereno|Triamtereno'
],
'Endocrinología y salud ósea':[
'acarbosa|Acarbosa','miglitol|Miglitol','repaglinida|Repaglinida','nateglinida|Nateglinida','exenatida|Exenatida','lixisenatida|Lixisenatida','alogliptina|Alogliptina','saxagliptina|Saxagliptina','insulina-aspart|Insulina aspart','insulina-glulisina|Insulina glulisina','insulina-detemir|Insulina detemir','insulina-degludec|Insulina degludec','insulina-isofana-combinada|Insulina premezclada (formulación por verificar)','pramlintida|Pramlintida','cabergolina|Cabergolina','bromocriptina|Bromocriptina','desmopresina|Desmopresina','octreotida|Octreotida','lanreotida|Lanreotida','calcitriol|Calcitriol','colecalciferol|Colecalciferol','ergocalciferol|Ergocalciferol','alendronato|Alendronato','risedronato|Risedronato','ibandronato|Ibandronato','ácido-zoledrónico|Ácido zoledrónico','denosumab|Denosumab','teriparatida|Teriparatida','romosozumab|Romosozumab'
],
'Neurología y psiquiatría':[
'lacosamida|Lacosamida','oxcarbazepina|Oxcarbazepina','eslicarbazepina|Eslicarbazepina','brivaracetam|Brivaracetam','perampanel|Perampanel','zonisamida|Zonisamida','vigabatrina|Vigabatrina','etosuximida|Etosuximida','tiagabina|Tiagabina','rimegepant|Rimegepant','ubrogepant|Ubrogepant','atogepant|Atogepant','erenumab|Erenumab','fremanezumab|Fremanezumab','galcanezumab|Galcanezumab','eptinezumab|Eptinezumab','rizatriptan|Rizatriptán','zolmitriptan|Zolmitriptán','eletriptan|Eletriptán','naratriptan|Naratriptán','duloxetina|Duloxetina','venlafaxina|Venlafaxina','desvenlafaxina|Desvenlafaxina','mirtazapina|Mirtazapina','paroxetina|Paroxetina','citalopram|Citalopram','fluvoxamina|Fluvoxamina','clomipramina|Clomipramina','nortriptilina|Nortriptilina','imipramina|Imipramina','aripiprazol|Aripiprazol','ziprasidona|Ziprasidona','lurasidona|Lurasidona','paliperidona|Paliperidona','clozapina|Clozapina','brexpiprazol|Brexpiprazol','donepezilo|Donepezilo','rivastigmina|Rivastigmina','galantamina|Galantamina','memantina|Memantina','levodopa-carbidopa|Levodopa / carbidopa','pramipexol|Pramipexol','ropinirol|Ropinirol','rasagilina|Rasagilina','selegilina|Selegilina','entacapona|Entacapona','amantadina|Amantadina'
],
'Neumología y alergología':[
'formoterol|Formoterol','salmeterol|Salmeterol','indacaterol|Indacaterol','olodaterol|Olodaterol','aclidinio|Aclidinio','umeclidinio|Umeclidinio','glicopirronio|Glicopirronio','beclometasona|Beclometasona','mometasona|Mometasona','ciclesonida|Ciclesonida','fluticasona-umeclidinio-vilanterol|Fluticasona / umeclidinio / vilanterol','budesonida-glicopirronio-formoterol|Budesonida / glicopirronio / formoterol','omalizumab|Omalizumab','mepolizumab|Mepolizumab','benralizumab|Benralizumab','dupilumab|Dupilumab','tezepelumab|Tezepelumab','cetirizina|Cetirizina','levocetirizina|Levocetirizina','loratadina|Loratadina','desloratadina|Desloratadina','fexofenadina|Fexofenadina','bilastina|Bilastina','azelastina|Azelastina','olopatadina|Olopatadina'
],
'Gastroenterología y hepatología':[
'esomeprazol|Esomeprazol','lansoprazol|Lansoprazol','rabeprazol|Rabeprazol','dexlansoprazol|Dexlansoprazol','bismuto-subsalicilato|Subsalicilato de bismuto','bismuto-subcitrato|Subcitrato de bismuto','prucaloprida|Prucaloprida','linaclotida|Linaclotida','lubiprostona|Lubiprostona','polietilenglicol|Polietilenglicol (macrogol)','bisacodilo|Bisacodilo','senosidos|Senósidos','psilio|Psyllium / psilio','simeticona|Simeticona','budesonida-oral|Budesonida oral (formulación específica)','vedolizumab|Vedolizumab','ustekinumab|Ustekinumab','infliximab|Infliximab','adalimumab|Adalimumab','tofacitinib|Tofacitinib','upadacitinib|Upadacitinib','rifamicina-sv|Rifamicina SV oral no absorbible','eluxadolina|Eluxadolina','obeticholico-acido|Ácido obeticólico','tenapanor|Tenapanor'
],
'Nefrología y urología':[
'sevelamero|Sevelámero','carbonato-lantano|Carbonato de lantano','citrato-potasio|Citrato de potasio','patiromer|Patirómero','ciclosilicato-zirconio-sodio|Ciclosilicato de zirconio y sodio','eritropoyetina-alfa|Epoetina alfa','darbepoetina|Darbepoetina alfa','metoxipolietilenglicol-epoetina|Metoxipolietilenglicol-epoetina beta','hierro-sacarosa|Hierro sacarosa','carboximaltosa-ferrica|Carboximaltosa férrica','hierro-isomaltosido|Derisomaltosa férrica','finerenona|Finerenona','tamsulosina|Tamsulosina','alfuzosina|Alfuzosina','silodosina|Silodosina','doxazosina|Doxazosina','finasterida|Finasterida','dutasterida|Dutasterida','solifenacina|Solifenacina','tolterodina|Tolterodina','mirabegron|Mirabegrón','vibegron|Vibegrón','fesoterodina|Fesoterodina'
],
'Ginecología y reproducción':[
'levonorgestrel|Levonorgestrel','etonogestrel|Etonogestrel','desogestrel|Desogestrel','drospirenona|Drospirenona','etinilestradiol|Etinilestradiol','estradiol|Estradiol','dienogest|Dienogest','acetato-medroxiprogesterona|Acetato de medroxiprogesterona','acetato-noretisterona|Acetato de noretisterona','clomifeno|Clomifeno','letrozol|Letrozol','anastrozol|Anastrozol','exemestano|Exemestano','gonadotropina-corionica|Gonadotropina coriónica humana','menotropinas|Menotropinas','triptorelina|Triptorelina','goserelina|Goserelina','leuprorelina|Leuprorelina','mifepristona|Mifepristona','carbetocina|Carbetocina'
],
'Dermatología y tratamientos tópicos':[
'mupirocina|Mupirocina','ácido-fusidico|Ácido fusídico','retapamulina|Retapamulina','clindamicina-topica|Clindamicina tópica (formulación específica)','peroxido-benzoilo|Peróxido de benzoilo','adapaleno|Adapaleno','tretinoina-topica|Tretinoína tópica','isotretinoina|Isotretinoína','tazaroteno|Tazaroteno','calcipotriol|Calcipotriol','tacrolimus-topico|Tacrolimus tópico','pimecrolimus|Pimecrolimus','clobetasol|Clobetasol','mometasona-topica|Mometasona tópica','betametasona-topica|Betametasona tópica','ketoconazol-topico|Ketoconazol tópico','ciclopirox|Ciclopirox','selenio-sulfuro|Sulfuro de selenio','permethrina|Permetrina','ácido-salicilico-topico|Ácido salicílico tópico','urea-topica|Urea tópica','hidroquinona|Hidroquinona','ácido-azelaico|Ácido azelaico'
],
'Oftalmología y otorrinolaringología':[
'latanoprost|Latanoprost','travoprost|Travoprost','bimatoprost|Bimatoprost','tafluprost|Tafluprost','timolol-oftalmico|Timolol oftálmico','brimonidina|Brimonidina','dorzolamida|Dorzolamida','brinzolamida|Brinzolamida','pilocarpina|Pilocarpina','ciclopentolato|Ciclopentolato','tropicamida|Tropicamida','fenilefrina-oftalmica|Fenilefrina oftálmica','fluorometolona|Fluorometolona','loteprednol|Loteprednol','prednisolona-oftalmica|Prednisolona oftálmica','ciprofloxacino-oftalmico|Ciprofloxacino oftálmico','moxifloxacino-oftalmico|Moxifloxacino oftálmico','tobramicina-oftalmica|Tobramicina oftálmica','natamicina|Natamicina','acetilcisteina-otica|Acetilcisteína ótica (formulación por confirmar)','ciprofloxacino-otico|Ciprofloxacino ótico','ofloxacino-otico|Ofloxacino ótico','ofloxacino-oftalmico|Ofloxacino oftálmico','betahistina|Betahistina'
],
'Hematología y nutrición':[
'ácido-folico|Ácido fólico','cianocobalamina|Cianocobalamina (vitamina B12)','hidroxocobalamina|Hidroxocobalamina','tiamina|Tiamina (vitamina B1)','piridoxina|Piridoxina (vitamina B6)','fitomenadiona|Fitomenadiona (vitamina K1)','deferasirox|Deferasirox','deferoxamina|Deferoxamina','deferiprona|Deferiprona','eltrombopag|Eltrombopag','romiplostim|Romiplostim','avatrombopag|Avatrombopag','ácido-aminocaproico|Ácido aminocaproico','factor-viii-recombinante|Factor VIII recombinante','factor-ix-recombinante|Factor IX recombinante','emicizumab|Emicizumab'
],
'Reumatología e inmunología':[
'naproxeno-sodico|Naproxeno sódico (formulación diferenciada)','meloxicam|Meloxicam','piroxicam|Piroxicam','etoricoxib|Etoricoxib','indometacina|Indometacina','salsalato|Salsalato','secukinumab|Secukinumab','ixekizumab|Ixekizumab','guselkumab|Guselkumab','risankizumab|Risankizumab','abatacept|Abatacept','rituximab|Rituximab','tocilizumab|Tocilizumab','sarilumab|Sarilumab','baricitinib|Baricitinib','anakinra|Anakinra','canakinumab|Canakinumab','belimumab|Belimumab','micofenolato-mofetilo|Micofenolato de mofetilo','tacrolimus-sistemico|Tacrolimus sistémico'
],
'Analgesia, urgencias y cuidados paliativos':[
'codeina|Codeína','tapentadol|Tapentadol','nalbufina|Nalbufina','butorfanol|Butorfanol','metadona|Metadona','remifentanilo|Remifentanilo','alfentanilo|Alfentanilo','sufentanilo|Sufentanilo','etomidato|Etomidato','tiopental|Tiopental','sevoflurano|Sevoflurano','desflurano|Desflurano','isoflurano|Isoflurano','sugammadex|Sugammadex','neostigmina|Neostigmina','fisostigmina|Fisostigmina','pralidoxima|Pralidoxima','acetilcisteina-oral|Acetilcisteína oral (formulación diferenciada)','carbón-activado|Carbón activado','ondansetron-odt|Ondansetrón bucodispersable (formulación diferenciada)'
]
};
const clinicalGroups={
'Cardiología y vascular':[
'infarto-con-elevacion-st|Infarto con elevación del ST|stemi iam cests',
'infarto-sin-elevacion-st|Infarto sin elevación del ST|nstemi iamsest',
'angina-inestable|Angina inestable|sindrome coronario agudo',
'angina-estable|Angina estable|cardiopatia isquemica cronica',
'fibrilacion-auricular|Fibrilación auricular|fa arritmia',
'flutter-auricular|Flutter auricular|aleteo auricular',
'taquicardia-supraventricular|Taquicardia supraventricular|tsv',
'bradicardia-sintomatica|Bradicardia sintomática|bloqueo sinusal',
'bloqueo-auriculoventricular|Bloqueo auriculoventricular|bav bloqueo cardiaco',
'insuficiencia-cardiaca|Insuficiencia cardiaca|ic congestiva',
'edema-agudo-pulmon|Edema agudo pulmonar cardiogénico|eap',
'endocarditis-infecciosa|Endocarditis infecciosa|endocarditis',
'pericarditis-aguda|Pericarditis aguda|dolor pericardico',
'miocarditis|Miocarditis|inflamacion miocardio',
'taponamiento-cardiaco|Taponamiento cardiaco|derrame pericardico',
'tromboembolismo-pulmonar|Tromboembolismo pulmonar|tep embolia pulmonar',
'trombosis-venosa-profunda|Trombosis venosa profunda|tvp dvt',
'diseccion-aortica|Disección aórtica|sindrome aortico agudo',
'aneurisma-aortico|Aneurisma aórtico|aneurisma aorta',
'arteriopatia-periferica|Enfermedad arterial periférica|eap arteriopatia piernas'
],
'Neumología y alergología':[
'asma|Asma bronquial|asma persistente',
'exacerbacion-asma|Exacerbación asmática|crisis asmatica',
'epoc|Enfermedad pulmonar obstructiva crónica|epoc copd',
'exacerbacion-epoc|Exacerbación aguda de EPOC|epoc agudizado',
'neumonia-comunitaria|Neumonía adquirida en la comunidad|nac cap',
'neumonia-nosocomial|Neumonía hospitalaria|nah nosocomial',
'bronquiectasias|Bronquiectasias|bronquiectasia',
'derrame-pleural|Derrame pleural|efusion pleural',
'neumotorax|Neumotórax|colapso pulmonar',
'embolia-pulmonar|Embolia pulmonar|tep tromboembolia',
'apnea-sueno|Apnea obstructiva del sueño|saos',
'fibrosis-pulmonar|Fibrosis pulmonar|intersticial',
'hipertension-pulmonar|Hipertensión pulmonar|hpap',
'anafilaxia|Anafilaxia|reaccion alergica grave',
'urticaria|Urticaria|ronchas alergia'
],
'Infectología':[
'sepsis|Sepsis|infeccion organo disfuncion',
'choque-septico|Choque séptico|shock sepsis',
'meningitis-bacteriana|Meningitis bacteriana|meningitis',
'encefalitis-infecciosa|Encefalitis infecciosa|encefalitis',
'bacteriemia|Bacteriemia|hemocultivo',
'infeccion-urinaria|Infección de vías urinarias|ivu itu',
'pielonefritis|Pielonefritis aguda|infeccion renal',
'urosepsis|Urosepsis|sepsis origen urinario',
'celulitis|Celulitis bacteriana|piel infeccion',
'fascitis-necrosante|Fascitis necrosante|infeccion tejidos blandos',
'osteomielitis|Osteomielitis|infeccion hueso',
'artritis-septica|Artritis séptica|infeccion articular',
'tuberculosis-pulmonar|Tuberculosis pulmonar|tb pulmonar',
'tuberculosis-extrapulmonar|Tuberculosis extrapulmonar|tb extrapulmonar',
'vih|Infección por VIH|virus inmunodeficiencia humana',
'hepatitis-b|Hepatitis B|vhb',
'hepatitis-c|Hepatitis C|vhc',
'influenza|Influenza|gripe',
'covid-19|COVID-19|sars cov 2',
'paludismo|Paludismo|malaria',
'enfermedad-chagas|Enfermedad de Chagas|tripanosomiasis americana',
'dengue|Dengue|fiebre rompehuesos',
'chikungunya|Chikungunya|arbovirosis',
'zika|Infección por virus Zika|zika',
'leptospirosis|Leptospirosis|zoonosis'
],
'Gastroenterología y hepatología':[
'hemorragia-digestiva-alta|Hemorragia digestiva alta|hda hematemesis melena',
'hemorragia-digestiva-baja|Hemorragia digestiva baja|hdb rectorragia',
'enfermedad-reflujo|Enfermedad por reflujo gastroesofágico|erge gerd',
'ulcera-peptica|Úlcera péptica|ulcera gastrica duodenal',
'infeccion-helicobacter|Infección por Helicobacter pylori|h pylori',
'pancreatitis-aguda|Pancreatitis aguda|pancreas',
'pancreatitis-cronica|Pancreatitis crónica|pancreas cronica',
'colecistitis|Colecistitis aguda|vesicula inflamacion',
'colangitis|Colangitis aguda|infeccion biliar',
'coledocolitiasis|Coledocolitiasis|calculo colédoco',
'apendicitis|Apendicitis aguda|abdomen agudo',
'diverticulitis|Diverticulitis|diverticulos',
'obstruccion-intestinal|Obstrucción intestinal|oclusion ileo',
'cirrosis|Cirrosis hepática|hepatopatia cronica',
'encefalopatia-hepatica|Encefalopatía hepática|cirrosis confusión',
'ascitis|Ascitis|liquido abdominal',
'hepatitis-autoinmune|Hepatitis autoinmune|hepatitis inmunitaria',
'enfermedad-crohn|Enfermedad de Crohn|eii',
'colitis-ulcerosa|Colitis ulcerosa|eii',
'sindrome-intestino-irritable|Síndrome de intestino irritable|sii colon irritable',
'enfermedad-celiaca|Enfermedad celíaca|celiaquia',
'estreñimiento-cronico|Estreñimiento crónico|constipacion'
],
'Endocrinología y metabolismo':[
'diabetes-tipo-1|Diabetes mellitus tipo 1|dm1',
'diabetes-tipo-2|Diabetes mellitus tipo 2|dm2',
'cetoacidosis-diabetica|Cetoacidosis diabética|cad dka',
'estado-hiperosmolar|Estado hiperglucémico hiperosmolar|ehh hhs',
'hipoglucemia|Hipoglucemia|glucosa baja',
'hipotiroidismo|Hipotiroidismo|tsh alta',
'hipertiroidismo|Hipertiroidismo|tirotoxicosis',
'tormenta-tiroidea|Tormenta tiroidea|crisis tirotoxica',
'coma-mixedematoso|Coma mixedematoso|hipotiroidismo severo',
'insuficiencia-suprarrenal|Insuficiencia suprarrenal|addison',
'crisis-suprarrenal|Crisis suprarrenal|crisis adrenal',
'sindrome-cushing|Síndrome de Cushing|hipercortisolismo',
'hiperparatiroidismo|Hiperparatiroidismo|pTH',
'osteoporosis|Osteoporosis|fragilidad osea',
'dislipidemia|Dislipidemia|colesterol trigliceridos',
'hipertrigliceridemia|Hipertrigliceridemia|trigliceridos altos',
'obesidad|Obesidad|adiposidad excesiva'
],
'Nefrología y electrolitos':[
'lesion-renal-aguda|Lesión renal aguda|lra aki',
'enfermedad-renal-cronica|Enfermedad renal crónica|erc ckd',
'sindrome-nefrotico|Síndrome nefrótico|proteinuria',
'sindrome-nefritico|Síndrome nefrítico|hematuria glomerular',
'glomerulonefritis|Glomerulonefritis|inflamacion glomerular',
'hiponatremia|Hiponatremia|sodio bajo',
'hipernatremia|Hipernatremia|sodio alto',
'hipopotasemia|Hipopotasemia|hipokalemia',
'hiperpotasemia|Hiperpotasemia|hiperkalemia',
'hipocalcemia|Hipocalcemia|calcio bajo',
'hipercalcemia|Hipercalcemia|calcio alto',
'hipomagnesemia|Hipomagnesemia|magnesio bajo',
'hipermagnesemia|Hipermagnesemia|magnesio alto',
'acidosis-metabolica|Acidosis metabólica|bicarbonato bajo',
'alcalosis-metabolica|Alcalosis metabólica|bicarbonato alto',
'acidosis-respiratoria|Acidosis respiratoria|co2 alto',
'alcalosis-respiratoria|Alcalosis respiratoria|co2 bajo'
],
'Neurología y psiquiatría':[
'ictus-isquemico|Ictus isquémico|evc isquemico stroke',
'hemorragia-intracerebral|Hemorragia intracerebral|evc hemorragico',
'hemorragia-subaracnoidea|Hemorragia subaracnoidea|hsa',
'ataque-isquemico-transitorio|Ataque isquémico transitorio|ait tia',
'epilepsia|Epilepsia|convulsiones',
'estado-epileptico|Estado epiléptico|estatus convulsivo',
'migrana|Migraña|jaqueca',
'cefalea-tensional|Cefalea tensional|dolor cabeza tension',
'cefalea-racimos|Cefalea en racimos|cluster headache',
'enfermedad-parkinson|Enfermedad de Parkinson|parkinsonismo',
'enfermedad-alzheimer|Enfermedad de Alzheimer|demencia',
'delirium|Delirium|sindrome confusional agudo',
'neuropatia-diabetica|Neuropatía diabética|dolor neuropatico',
'guillain-barre|Síndrome de Guillain-Barré|polirradiculoneuropatia',
'miastenia-gravis|Miastenia gravis|debilidad fatigable',
'depresion-mayor|Trastorno depresivo mayor|depresion',
'trastorno-ansiedad-generalizada|Trastorno de ansiedad generalizada|tag ansiedad',
'trastorno-bipolar|Trastorno bipolar|mania hipomania',
'esquizofrenia|Esquizofrenia|psicosis',
'trastorno-consumo-alcohol|Trastorno por consumo de alcohol|alcoholismo'
],
'Obstetricia, ginecología y neonatología':[
'preeclampsia|Preeclampsia|hipertension embarazo',
'eclampsia|Eclampsia|convulsiones embarazo',
'sindrome-hellp|Síndrome HELLP|hemolisis hepatico plaquetas',
'hemorragia-posparto|Hemorragia posparto|hemorragia obstetrica',
'embarazo-ectopico|Embarazo ectópico|gestacion extrauterina',
'aborto-espontaneo|Aborto espontáneo|perdida gestacional',
'amenaza-parto-pretermino|Amenaza de parto pretérmino|prematuridad',
'ruptura-prematura-membranas|Rotura prematura de membranas|rpm',
'diabetes-gestacional|Diabetes gestacional|dg embarazo',
'endometriosis|Endometriosis|dolor pelvico',
'sindrome-ovario-poliquistico|Síndrome de ovario poliquístico|sop',
'miomatosis-uterina|Miomatosis uterina|fibromas',
'enfermedad-inflamatoria-pelvica|Enfermedad inflamatoria pélvica|eip',
'ictericia-neonatal|Ictericia neonatal|hiperbilirrubinemia',
'sepsis-neonatal|Sepsis neonatal|infeccion neonatal',
'enterocolitis-necrosante|Enterocolitis necrosante|neonatal nec',
'sindrome-dificultad-respiratoria-neonatal|Síndrome de dificultad respiratoria neonatal|membrana hialina',
'hipoglucemia-neonatal|Hipoglucemia neonatal|glucosa rn'
],
'Pediatría':[
'bronquiolitis|Bronquiolitis|lactante sibilancias',
'crup|Crup|laringotraqueitis',
'otitis-media-aguda|Otitis media aguda|oma',
'faringoamigdalitis|Faringoamigdalitis|faringitis amigdalitis',
'neumonia-pediatrica|Neumonía pediátrica|neumonia infantil',
'gastroenteritis-aguda|Gastroenteritis aguda|diarrea aguda',
'deshidratacion-pediatrica|Deshidratación pediátrica|deshidratacion lactante',
'enfermedad-kawasaki|Enfermedad de Kawasaki|vasculitis infantil',
'infeccion-urinaria-pediatrica|Infección urinaria pediátrica|itu infantil',
'purpura-iga|Vasculitis por IgA|purpura henoch schonlein',
'convulsion-febril|Convulsión febril|crisis febril',
'desnutricion-infantil|Desnutrición infantil|desnutricion pediatrica',
'anemia-ferropenica|Anemia ferropénica|deficiencia hierro',
'asma-pediatrica|Asma pediátrica|asma infantil'
],
'Dermatología, ojos y ORL':[
'dermatitis-atopica|Dermatitis atópica|eccema',
'psoriasis|Psoriasis|placas piel',
'acne-vulgar|Acné vulgar|comedones',
'rosacea|Rosácea|eritema facial',
'escabiosis|Escabiosis|sarna',
'impetigo|Impétigo|pioderma',
'alopecia-areata|Alopecia areata|perdida cabello',
'urticaria-cronica|Urticaria crónica|habones',
'glaucoma|Glaucoma|presion intraocular',
'conjuntivitis|Conjuntivitis|ojo rojo',
'uveitis|Uveítis|inflamacion uvea',
'queratitis|Queratitis|cornea',
'desprendimiento-retina|Desprendimiento de retina|moscas volantes fotopsias',
'degeneracion-macular|Degeneración macular|macula',
'retinopatia-diabetica|Retinopatía diabética|retina diabetes',
'catarata|Catarata|opacidad cristalino',
'otitis-externa|Otitis externa|oido nadador',
'rinosinusitis|Rinosinusitis|sinusitis',
'vertigo-posicional|Vértigo posicional paroxístico benigno|vppb'
],
'Reumatología, hematología y oncología':[
'artritis-reumatoide|Artritis reumatoide|artritis cronica',
'gota|Gota|cristales urato',
'lupus|Lupus eritematoso sistémico|les autoinmune',
'vasculitis|Vasculitis sistémica|vasos inflamacion',
'espondiloartritis|Espondiloartritis|espondilitis',
'osteoartritis|Osteoartritis|artrosis',
'osteoporosis-fragilidad|Osteoporosis con fractura por fragilidad|fractura',
'anemia-hemolitica|Anemia hemolítica|hemolisis',
'anemia-megaloblastica|Anemia megaloblástica|deficiencia b12 folato',
'trombocitopenia-inmune|Trombocitopenia inmune|pti itp',
'coagulacion-intravascular-diseminada|Coagulación intravascular diseminada|cid dic',
'leucemia-linfoblastica|Leucemia linfoblástica aguda|lla',
'leucemia-mieloide|Leucemia mieloide|lma lmc',
'linfoma|Linfoma|hodgkin no hodgkin',
'mieloma-multiple|Mieloma múltiple|plasmocitos',
'cancer-mama|Cáncer de mama|tumor mamario',
'cancer-pulmon|Cáncer de pulmón|neoplasia pulmonar',
'cancer-colorrectal|Cáncer colorrectal|neoplasia colon recto'
]
};
const CHECKS='Ficha índice de búsqueda únicamente: NO se han cotejado dosis, contraindicaciones, formulación, disponibilidad, aprobación en México ni clasificación de alto riesgo. Verificar IPP y Farmacia.';
const USE='Entrada terminológica del catálogo ampliado. Su categoría NO demuestra una indicación ni autoriza tratamiento.';
const clean=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const medSeen=new Set(base.catalog.map(x=>x[0]));
const medRows=[];
for(const [group,arr] of Object.entries(medicationGroups))for(const line of arr){
 const [id,name]=line.split('|');
 if(!id||!name||!/^[-\p{L}0-9]+$/u.test(id))throw Error('Medication entry invalid '+line);
 if(medSeen.has(id))continue;
 medSeen.add(id);
 medRows.push(Object.freeze([id,name,group,'A',USE,CHECKS,0]));
}
const diseaseSeen=new Set();
const diseaseRows=[];
for(const [category,arr] of Object.entries(clinicalGroups))for(const line of arr){
 const [id,name,aliases='']=line.split('|');
 if(!id||!name||diseaseSeen.has(id))throw Error('Duplicate or incomplete disease '+line);
 diseaseSeen.add(id);
 diseaseRows.push(Object.freeze({id,name,aliases,category,review:'Índice diagnóstico · SIN ruta terapéutica cotejada',source:'https://www.who.int/standards/classifications/classification-of-diseases'}));
}
const normalize=s=>clean(s).replace(/[^a-z0-9 ]/g,' ');
const index=Object.freeze({
 medicationRows:Object.freeze(medRows),
 newDrugIds:Object.freeze(medRows.map(x=>x[0])),
 diseases:Object.freeze(diseaseRows),
 sourceReferences:Object.freeze({
 whoEML:'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists/',
 imss:'https://www.imss.gob.mx/profesionales-salud/cuadros-basicos/medicamentos',
 csg:'https://www.gob.mx/csg/articulos/acuerdos-por-el-que-se-actualiza-el-compendio-nacional-de-insumos-para-la-salud',
 icd:'https://www.who.int/standards/classifications/classification-of-diseases'
 }),
 searchDiseases(query='',category='all'){
  const term=normalize(query.trim());
  return diseaseRows.filter(x=>(category==='all'||x.category===category)&&(!term||normalize(x.name+' '+x.aliases+' '+x.category).includes(term)));
 },
 searchExtraDrugs(query=''){
  const term=normalize(query.trim());
  return medRows.filter(x=>!term||normalize(x[1]+' '+x[2]).includes(term));
 }
});
root.KidBumPharmaExpansionIndex=index;
root.KidBumPharmaExpansion=Object.freeze({...base,catalog:Object.freeze([...base.catalog,...medRows])});
})(typeof window!=='undefined'?window:globalThis);
