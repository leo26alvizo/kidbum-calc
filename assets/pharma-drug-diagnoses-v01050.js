/* KidBum Pharma 0.10.50 · Relación EXPLÍCITA principio activo → diagnóstico/contexto.
 * Nivel editorial: usos orientativos para descubrir información, NO equivalen a
 * indicación aprobada, selección terapéutica por guía, cobertura mexicana ni
 * recomendación de dosis. Ninguna relación de esta tabla habilita prescripción.
 * No se infieren usos automáticamente por clase ni por nombre de grupo.
 */
(function(root){
'use strict';
const lib=root.KidBumPharmaCore;
if(!lib)return;
const CLUSTERS=[
/* Antibacterianos: solo tras valoración microbiológica/contexto local */
['Infección bacteriana de piel y tejidos blandos','ceftobiprol ceftarolina cefalexina cefadroxilo dicloxacilina flucloxacilina cloxacilina delafloxacino omadaciclina tedizolid quinupristina-dalfopristina'],
['Infección bacteriana grave por gramnegativos multirresistentes susceptibles','ceftolozano-tazobactam ceftazidima-avibactam meropenem-vaborbactam imipenem-cilastatina-relebactam colistimetato polimixina-b'],
['Infección intraabdominal bacteriana complicada','imipenem-cilastatina ertapenem doripenem cefoperazona-sulbactam ticarcilina-clavulanato tigeciclina eravaciclina'],
['Otitis media aguda bacteriana','cefdinir cefaclor ceftibuteno cefradina cefpodoxima'],
['Infección bacteriana por microorganismos susceptibles','ampicilina-sulbactam aztreonam fosfomicina-iv'],
['Neumonía adquirida en la comunidad bacteriana','moxifloxacino gemifloxacino'],
['Infección urinaria bacteriana','ofloxacino nitroxolina'],
['Acné vulgar inflamatorio','tetraciclina minociclina'],
['Colitis por Clostridioides difficile','fidaxomicina'],
['Encefalopatía hepática con hiperamonemia','rifaximina'],
['Tuberculosis por Mycobacterium tuberculosis','rifapentina estreptomicina'],
['Infección por complejo Mycobacterium avium','rifabutina'],
['Tuberculosis farmacorresistente (manejo especializado)','bedaquilina delamanid pretomanid clofazimina capreomicina'],
['Infección grave por bacterias grampositivas susceptibles','linezolid-iv'],
/* Antivirales y antifúngicos */
['Infección por citomegalovirus en inmunosupresión o trasplante','ganciclovir valganciclovir foscarnet cidofovir maribavir'],
['Prevención de enfermedad por citomegalovirus tras trasplante','letermovir'],
['COVID-19 por SARS-CoV-2 en paciente elegible','remdesivir nirmatrelvir-ritonavir'],
['Influenza por virus de la gripe','baloxavir zanamivir peramivir'],
['Hepatitis B crónica','entecavir tenofovir-disoproxil tenofovir-alafenamida'],
['Infección por VIH','lamivudina emtricitabina dolutegravir bictegravir raltegravir darunavir atazanavir efavirenz nevirapina'],
['Hepatitis C crónica','sofosbuvir-velpatasvir glecaprevir-pibrentasvir ledipasvir-sofosbuvir'],
['Aspergilosis invasiva o profilaxis de micosis invasivas en alto riesgo','posaconazol isavuconazol'],
['Histoplasmosis u otras micosis sistémicas susceptibles','itraconazol'],
['Dermatofitosis superficial (según formulación)','ketoconazol'],
['Onicomicosis por dermatofitos','terbinafina'],
['Tiña capitis por dermatofitos','griseofulvina'],
['Candidiasis invasiva','micafungina caspofungina anidulafungina'],
['Candidiasis oral o mucocutánea','nystatina'],
['Meningitis criptocócica (tratamiento combinado)','flucitosina'],
/* Parásitos y enfermedades tropicales */
['Helmintiasis intestinal','albendazol mebendazol pamoato-pirantel'],
['Escabiosis (sarna)','ivermectina'],
['Esquistosomiasis','praziquantel'],
['Teniasis intestinal','niclosamida'],
['Criptosporidiosis','nitazoxanida'],
['Giardiasis','secnidazol tinidazol'],
['Amebiasis intestinal (tratamiento luminal)','paromomicina'],
['Leishmaniasis','miltefosina anfotericina-b-desoxicolato'],
['Malaria por Plasmodium (esquema según especie y sensibilidad)','atovacuona-proguanil artemeter-lumefantrina artesunato cloroquina'],
['Malaria por Plasmodium vivax/ovale (cura radical tras evaluar G6PD)','primaquina tafenoquina'],
['Toxoplasmosis','pirimetamina sulfadiazina'],
['Enfermedad de Chagas','benznidazol nifurtimox'],
/* Cardiología y metabolismo */
['Dislipidemia con elevación de colesterol LDL','atorvastatina rosuvastatina simvastatina pravastatina fluvastatina pitavastatina ezetimiba colestiramina colesevelam evolocumab alirocumab inclisiran ácido-bempedoico'],
['Hipertrigliceridemia','fenofibrato gemfibrozilo'],
['Insuficiencia cardiaca con fracción de eyección reducida','vericiguat'],
['Hipertensión pulmonar tromboembólica crónica','riociguat'],
['Hipertensión arterial pulmonar','sildenafil tadalafil bosentan ambrisentan macitentan selexipag'],
['Angina de pecho crónica estable','ranolazina isosorbide-dinitrato isosorbide-mononitrato'],
['Hipertensión arterial sistémica','nebivolol atenolol amilorida triamtereno'],
['Fibrilación auricular o taquiarritmia supraventricular seleccionada','flecainida propafenona dronedarona'],
['Taquiarritmia ventricular o supraventricular seleccionada','sotalol'],
['Edema por insuficiencia cardiaca congestiva','torasemida bumetanida'],
/* Endocrino y hueso */
['Diabetes mellitus tipo 2','acarbosa miglitol repaglinida nateglinida exenatida lixisenatida alogliptina saxagliptina'],
['Diabetes mellitus con requerimiento de insulina','insulina-aspart insulina-glulisina insulina-detemir insulina-degludec insulina-isofana-combinada'],
['Diabetes mellitus tratada con insulina (tratamiento adyuvante seleccionado)','pramlintida'],
['Hiperprolactinemia o prolactinoma','cabergolina bromocriptina'],
['Diabetes insípida central','desmopresina'],
['Acromegalia','octreotida lanreotida'],
['Trastorno mineral óseo asociado a enfermedad renal crónica','calcitriol'],
['Deficiencia de vitamina D','colecalciferol ergocalciferol'],
['Osteoporosis con riesgo de fractura','alendronato risedronato ibandronato ácido-zoledrónico denosumab teriparatida romosozumab'],
/* Neurología y psiquiatría */
['Epilepsia con crisis focales','lacosamida oxcarbazepina eslicarbazepina brivaracetam perampanel zonisamida tiagabina'],
['Espasmos epilépticos infantiles o epilepsia refractaria','vigabatrina'],
['Epilepsia con crisis de ausencia','etosuximida'],
['Migraña aguda','rimegepant ubrogepant rizatriptan zolmitriptan eletriptan naratriptan'],
['Prevención de migraña','atogepant erenumab fremanezumab galcanezumab eptinezumab'],
['Trastorno depresivo mayor','duloxetina venlafaxina desvenlafaxina mirtazapina paroxetina citalopram nortriptilina imipramina'],
['Trastorno obsesivo compulsivo','fluvoxamina clomipramina'],
['Esquizofrenia u otro trastorno psicótico','aripiprazol ziprasidona lurasidona paliperidona clozapina brexpiprazol'],
['Demencia por enfermedad de Alzheimer','donepezilo rivastigmina galantamina memantina'],
['Enfermedad de Parkinson','levodopa-carbidopa pramipexol ropinirol rasagilina selegilina entacapona amantadina'],
/* Neumología y alergia */
['Enfermedad pulmonar obstructiva crónica (EPOC) estable','formoterol salmeterol indacaterol olodaterol aclidinio umeclidinio glicopirronio fluticasona-umeclidinio-vilanterol budesonida-glicopirronio-formoterol'],
['Asma bronquial persistente (control antiinflamatorio según escalón)','beclometasona mometasona ciclesonida'],
['Asma alérgica grave','omalizumab'],
['Asma eosinofílica grave','mepolizumab benralizumab'],
['Dermatitis atópica moderada o grave','dupilumab'],
['Asma grave no controlada','tezepelumab'],
['Rinitis alérgica','cetirizina levocetirizina loratadina desloratadina fexofenadina bilastina azelastina'],
['Conjuntivitis alérgica','olopatadina'],
/* Gastroenterología y hepatología */
['Enfermedad por reflujo gastroesofágico (ERGE)','esomeprazol lansoprazol rabeprazol dexlansoprazol'],
['Diarrea aguda inespecífica (tratamiento sintomático seleccionado)','bismuto-subsalicilato'],
['Infección por Helicobacter pylori (como componente combinado)','bismuto-subcitrato'],
['Estreñimiento crónico','prucaloprida polietilenglicol bisacodilo senosidos psilio'],
['Síndrome de intestino irritable con estreñimiento','linaclotida lubiprostona tenapanor'],
['Distensión abdominal por gases','simeticona'],
['Enfermedad de Crohn','budesonida-oral ustekinumab'],
['Enfermedad inflamatoria intestinal (Crohn o colitis ulcerosa; según producto)','vedolizumab infliximab adalimumab'],
['Colitis ulcerosa activa','tofacitinib upadacitinib'],
['Diarrea del viajero no invasiva por bacterias susceptibles','rifamicina-sv'],
['Síndrome de intestino irritable con diarrea','eluxadolina'],
['Colangitis biliar primaria (verificar situación regulatoria vigente)','obeticholico-acido'],
/* Nefrología, urología */
['Hiperfosfatemia por enfermedad renal crónica','sevelamero carbonato-lantano'],
['Litiasis renal por hipocitraturia','citrato-potasio'],
['Hiperpotasemia','patiromer ciclosilicato-zirconio-sodio'],
['Anemia por enfermedad renal crónica','eritropoyetina-alfa darbepoetina metoxipolietilenglicol-epoetina'],
['Deficiencia de hierro / anemia ferropénica','hierro-sacarosa carboximaltosa-ferrica hierro-isomaltosido'],
['Enfermedad renal crónica asociada a diabetes tipo 2','finerenona'],
['Hiperplasia prostática benigna con síntomas urinarios','tamsulosina alfuzosina silodosina doxazosina finasterida dutasterida'],
['Vejiga hiperactiva','solifenacina tolterodina mirabegron vibegron fesoterodina'],
/* Ginecología / reproducción */
['Planificación familiar / anticoncepción','levonorgestrel etonogestrel desogestrel drospirenona etinilestradiol'],
['Síntomas por deficiencia estrogénica en menopausia','estradiol'],
['Endometriosis','dienogest'],
['Trastorno de sangrado uterino o anticoncepción, según presentación','acetato-medroxiprogesterona acetato-noretisterona'],
['Infertilidad por anovulación','clomifeno'],
['Cáncer de mama con receptores hormonales positivos','letrozol anastrozol exemestano'],
['Infertilidad por disfunción ovulatoria (tratamiento de reproducción asistida)','gonadotropina-corionica menotropinas'],
['Cáncer de próstata hormonosensible','triptorelina goserelina leuprorelina'],
['Interrupción farmacológica del embarazo o manejo ginecológico especializado','mifepristona'],
['Prevención de hemorragia posparto','carbetocina'],
/* Dermatología */
['Impétigo bacteriano','mupirocina ácido-fusidico retapamulina'],
['Acné vulgar inflamatorio','clindamicina-topica peroxido-benzoilo adapaleno tretinoina-topica isotretinoina'],
['Psoriasis en placas','tazaroteno calcipotriol ácido-salicilico-topico'],
['Dermatitis atópica','tacrolimus-topico pimecrolimus'],
['Dermatosis inflamatoria que responde a corticoide tópico','clobetasol mometasona-topica betametasona-topica'],
['Dermatofitosis cutánea','ketoconazol-topico ciclopirox'],
['Dermatitis seborreica del cuero cabelludo','selenio-sulfuro'],
['Escabiosis','permethrina'],
['Xerosis / hiperqueratosis cutánea','urea-topica'],
['Melasma e hiperpigmentación adquirida','hidroquinona ácido-azelaico'],
/* Oftalmología y ORL */
['Glaucoma de ángulo abierto o hipertensión ocular','latanoprost travoprost bimatoprost tafluprost timolol-oftalmico brimonidina dorzolamida brinzolamida pilocarpina'],
['Evaluación oftalmológica con midriasis diagnóstica','ciclopentolato tropicamida fenilefrina-oftalmica'],
['Inflamación ocular no infecciosa seleccionada','fluorometolona loteprednol prednisolona-oftalmica'],
['Conjuntivitis bacteriana o infección ocular susceptible','ciprofloxacino-oftalmico moxifloxacino-oftalmico tobramicina-oftalmica ofloxacino-oftalmico'],
['Queratitis fúngica','natamicina'],
['Secreciones óticas espesas (uso por producto a verificar)','acetilcisteina-otica'],
['Otitis externa bacteriana','ciprofloxacino-otico ofloxacino-otico'],
['Enfermedad de Ménière / vértigo vestibular seleccionado','betahistina'],
/* Hematología, nutrición */
['Deficiencia de folato / anemia megaloblástica','ácido-folico'],
['Deficiencia de vitamina B12 / anemia megaloblástica','cianocobalamina hidroxocobalamina'],
['Deficiencia de tiamina','tiamina'],
['Deficiencia de vitamina B6','piridoxina'],
['Coagulopatía por déficit de vitamina K','fitomenadiona'],
['Sobrecarga de hierro / hemocromatosis transfusional','deferasirox deferoxamina deferiprona'],
['Trombocitopenia inmune crónica','eltrombopag romiplostim'],
['Trombocitopenia en enfermedad hepática crónica previa a procedimiento','avatrombopag'],
['Hemorragia asociada a hiperfibrinólisis','ácido-aminocaproico'],
['Hemofilia A','factor-viii-recombinante emicizumab'],
['Hemofilia B','factor-ix-recombinante'],
/* Reumatología e inmunología */
['Artritis inflamatoria crónica o dolor inflamatorio articular','naproxeno-sodico meloxicam piroxicam etoricoxib salsalato'],
['Crisis aguda de gota','indometacina'],
['Psoriasis en placas moderada o grave','secukinumab ixekizumab guselkumab risankizumab'],
['Artritis reumatoide moderada o grave','abatacept rituximab tocilizumab sarilumab baricitinib'],
['Enfermedad autoinflamatoria por IL-1 o enfermedad de Still','anakinra canakinumab'],
['Lupus eritematoso sistémico','belimumab'],
['Nefritis lúpica','micofenolato-mofetilo'],
['Prevención de rechazo de trasplante de órgano sólido','tacrolimus-sistemico'],
/* Analgesia y perioperatorio */
['Dolor moderado o intenso seleccionado','codeina tapentadol nalbufina butorfanol'],
['Trastorno por consumo de opioides (tratamiento de mantenimiento seleccionado)','metadona'],
['Anestesia general y analgesia intraoperatoria','remifentanilo alfentanilo sufentanilo'],
['Inducción y mantenimiento de anestesia general','etomidato tiopental sevoflurano desflurano isoflurano'],
['Reversión del bloqueo neuromuscular tras anestesia','sugammadex neostigmina'],
['Intoxicación grave por antimuscarínicos (según protocolo toxicológico)','fisostigmina'],
['Intoxicación por organofosforados','pralidoxima'],
['Intoxicación por paracetamol','acetilcisteina-oral'],
['Intoxicación oral seleccionada para descontaminación gastrointestinal','carbón-activado'],
['Náuseas y vómitos (profilaxis o tratamiento seleccionado)','ondansetron-odt']
/* Catálogo preexistente: antibióticos, antivirales y antimicóticos */
,['Cistitis aguda bacteriana','nitrofurantoina fosfomicina trimetoprima trimetoprima-sulfametoxazol cefixima']
,['Infección urinaria complicada por microorganismos susceptibles','ciprofloxacino levofloxacino ceftazidima']
,['Neumonía bacteriana o infección respiratoria seleccionada','doxiciclina claritromicina eritromicina cefuroxima azitromicina-iv']
,['Infección grave por bacterias grampositivas susceptibles','clindamicina linezolid daptomicina oxacilina']
,['Candidiasis mucosa o sistémica (según formulación)','fluconazol']
,['Aspergilosis invasiva','voriconazol']
,['Micosis sistémica invasiva grave','anfotericina-b anfotericina-b-liposomal']
,['Infección por virus herpes simple','aciclovir valaciclovir']
,['Influenza','oseltamivir']
,['Infección abdominal bacteriana susceptible','cefoxitina']
,['Sífilis por Treponema pallidum (según estadio)','penicilina-g']
,['Faringitis estreptocócica','penicilina-v']
,['Infección bacteriana por Listeria monocytogenes','ampicilina']
,['Tuberculosis activa por Mycobacterium tuberculosis','rifampicina isoniazida etambutol pirazinamida']
,['Tuberculosis farmacorresistente con tratamiento especializado','cicloserina']
/* Cardiovascular */
,['Hipertensión arterial sistémica','enalapril lisinopril ramipril valsartan candesartan olmesartan telmisartan hidroclorotiazida clortalidona indapamida bisoprolol carvedilol labetalol hidralazina nicardipina nifedipina diltiazem verapamilo']
,['Prevención de migraña en adulto seleccionado','propranolol']
,['Insuficiencia cardiaca con fracción de eyección reducida','espironolactona eplerenona sacubitrilo-valsartan ivabradina']
,['Fibrilación auricular con respuesta ventricular rápida (control de frecuencia)','digoxina']
,['Síndrome coronario agudo / dolor torácico isquémico (contexto elegido)','nitroglicerina']
,['Emergencia hipertensiva seleccionada con monitorización','nitroprusiato']
/* Endocrinología */
,['Diabetes mellitus tipo 2','empagliflozina dapagliflozina canagliflozina semaglutida liraglutida dulaglutida tirzepatida sitagliptina linagliptina glimepirida glipizida glibenclamida pioglitazona']
,['Hipoglucemia grave','glucagon']
/* Neurología y psiquiatría */
,['Trastorno de ansiedad o prurito asociado a alergia (según formulación)','hidroxizina']
,['Epilepsia','levetiracetam valproato lamotrigina carbamazepina fenitoina fenobarbital clobazam topiramato']
,['Dolor neuropático','gabapentina pregabalina']
,['Trastorno depresivo mayor','amitriptilina sertralina fluoxetina escitalopram bupropion trazodona']
,['Trastorno de ansiedad generalizada','buspirona']
,['Dolor moderado o intenso','tramadol']
,['Esquizofrenia u otro trastorno psicótico','risperidona quetiapina haloperidol olanzapina']
,['Trastorno bipolar','litio']
/* Neumología */
,['Crisis asmática con broncoconstricción','salbutamol ipratropio']
,['Asma persistente (control antiinflamatorio)','budesonida fluticasona budesonida-formoterol fluticasona-salmeterol']
,['Enfermedad pulmonar obstructiva crónica (EPOC)','tiotropio umeclidinio-vilanterol']
,['Rinitis alérgica o asma alérgica en tratamiento complementario','montelukast']
,['Secreciones bronquiales espesas','acetilcisteina']
/* Urgencias y anestesia */
,['Necesidad de anestesia general o sedación procedimental','propofol ketamina dexmedetomidina']
,['Estado epiléptico o convulsión aguda seleccionada','midazolam lorazepam diazepam']
,['Necesidad de intubación o relajación neuromuscular durante anestesia','rocuronio vecuronio succinilcolina cisatracurio']
,['Choque cardiogénico con bajo gasto','dobutamina dopamina']
,['Choque vasodilatador refractario seleccionado','vasopresina fenilefrina']
,['Hemorragia traumática o perioperatoria con indicación antifibrinolítica','acido-tranexamico']
,['Intoxicación por opioides','naloxona']
,['Intoxicación por benzodiacepinas (casos muy seleccionados)','flumazenilo']
,['Taquiarritmia ventricular seleccionada','lidocaina-iv']
,['Hemorragia por heparina con necesidad de reversión','protamina']
/* Antitrombóticos */
,['Fibrilación auricular con indicación de prevención de embolia','rivaroxaban dabigatran edoxaban']
,['Síndrome coronario agudo o prevención secundaria aterotrombótica','clopidogrel acido-acetilsalicilico']
,['Ictus isquémico agudo o tromboembolia con indicación de trombólisis','alteplasa tenecteplasa']
/* Reumatología y oncología */
,['Artritis reumatoide','metotrexato leflunomida sulfasalazina hidroxicloroquina']
,['Prevención del rechazo en trasplante de órgano sólido','ciclosporina azatioprina']
,['Neoplasia hematológica (protocolo oncológico específico)','vincristina vinblastina']
,['Neoplasia sólida con indicación de quimioterapia basada en platino','cisplatino carboplatino']
,['Neoplasia susceptible a antraciclinas (protocolo oncológico)','doxorrubicina']
/* Gastroenterología */
,['Enfermedad por reflujo gastroesofágico','pantoprazol famotidina sucralfato']
,['Colitis ulcerosa','mesalazina']
,['Encefalopatía hepática o estreñimiento (según indicación)','lactulosa']
,['Diarrea aguda no disentérica (uso sintomático seleccionado)','loperamida']
,['Náuseas y vómitos (uso condicionado a seguridad del producto)','domperidona']
,['Colestasis por enfermedad hepatobiliar susceptible','acido-ursodesoxicolico']
/* Obstetricia y ginecología */
,['Hemorragia posparto por atonía uterina o prevención según protocolo','oxitocina misoprostol metilergonovina']
,['Amenaza de parto pretérmino con indicación de tocólisis','atosiban']
,['Maduración pulmonar fetal ante riesgo de parto pretérmino','betametasona']
,['Deficiencia de progesterona / soporte hormonal de embarazo seleccionado','progesterona']
/* Electrolitos y soluciones */
,['Hiponatremia grave sintomática','sodio-hipertonico']
,['Hipofosfatemia con necesidad de reposición intravenosa','fosfato-potasio-iv']
,['Hipoglucemia grave con necesidad de glucosa intravenosa','dextrosa-hipertonica']
,['Hiperpotasemia con cambios electrocardiográficos','cloruro-calcio']
,['Glaucoma o hipertensión intracraneal seleccionada','acetazolamida']
/* Corticoides y tiroides */
,['Enfermedad inflamatoria o autoinmunitaria susceptible a glucocorticoide','prednisolona metilprednisolona dexametasona']
,['Insuficiencia suprarrenal primaria o crisis suprarrenal','hidrocortisona']
,['Coma mixedematoso / hipotiroidismo grave hospitalario','levotiroxina-sodica-iv']
,['Hipertiroidismo por enfermedad de Graves','propiltiouracilo metimazol']
,['Hiperparatiroidismo secundario por enfermedad renal','cinacalcet']
/* Analgesia */
,['Dolor intenso seleccionado','buprenorfina hidromorfona oxycodona']
,['Dolor e inflamación musculoesquelética','naproxeno diclofenaco celecoxib']
/* Núcleo original 46 */
,['Infección bacteriana respiratoria susceptible','amoxicilina amoxicilina-clavulanato azitromicina']
,['Profilaxis antibiótica perioperatoria','cefazolina']
,['Neumonía bacteriana grave o infección invasiva susceptible','ceftriaxona cefotaxima']
,['Infección grave por microorganismos gramnegativos susceptibles','cefepima piperacilina-tazobactam meropenem amikacina gentamicina']
,['Infección grave por grampositivos resistentes susceptibles','vancomicina']
,['Infección bacteriana anaerobia / absceso intraabdominal','metronidazol']
,['Dolor agudo o fiebre','paracetamol ibuprofeno metamizol']
,['Dolor agudo intenso de corta duración','ketorolaco morfina']
,['Analgesia en anestesia o dolor intenso monitorizado','fentanilo']
,['Enfermedad ácido-péptica o reflujo gastroesofágico','omeprazol']
,['Náuseas y vómitos','ondansetron metoclopramida']
,['Diabetes mellitus con requerimiento de insulina','insulina-regular insulina-nph insulina-glargina insulina-lispro']
,['Diabetes mellitus tipo 2','metformina']
,['Trombosis venosa profunda / profilaxis tromboembólica indicada','enoxaparina heparina']
,['Fibrilación auricular con indicación de prevención de embolia','warfarina apixaban']
,['Anafilaxia','adrenalina']
,['Choque séptico con vasoplejía persistente','noradrenalina']
,['Bradicardia sintomática seleccionada','atropina']
,['Taquicardia supraventricular paroxística regular','adenosina']
,['Taquiarritmia ventricular / fibrilación auricular seleccionada','amiodarona']
,['Preeclampsia grave o eclampsia','sulfato-magnesio']
,['Hipopotasemia con indicación de reposición IV','potasio-iv']
,['Hipocalcemia sintomática','gluconato-calcio']
,['Acidosis metabólica grave con indicación específica de bicarbonato','bicarbonato-sodio']
,['Sobrecarga de volumen por insuficiencia cardiaca','furosemida']
,['Hipertensión arterial sistémica','losartan amlodipino metoprolol']
,['Hipotiroidismo primario','levotiroxina']
,['Enfermedad inflamatoria sensible a glucocorticoides','prednisona']
/* Rutas añadidas antes del índice de 416 */
,['Crisis aguda de gota','colchicina']
,['Gota con necesidad de reducción mantenida de uratos','alopurinol febuxostat']
,['Crisis aguda de migraña','sumatriptan']

];
function groupIds(){const map=Object.create(null);for(const [d,ids] of CLUSTERS){if(!d||!ids)throw Error('Pharma diagnosis: empty condition');for(const id of ids.split(/\s+/)){if(!lib.byId[id])throw Error('Pharma diagnosis: unknown id '+id);(map[id]||(map[id]=[])).push(Object.freeze({name:d,status:'orientative',reviewed:false,source:null}));}}return map;}
const mutable=groupIds();
const byId=Object.freeze(Object.fromEntries(lib.records.map(m=>[m.id,Object.freeze(mutable[m.id]||[])])));
const missingIds=Object.freeze(lib.records.filter(m=>!byId[m.id].length).map(m=>m.id));
const coverage=Object.freeze({total:lib.records.length,mapped:lib.records.length-missingIds.length,missing:missingIds.length,verifiedIndependently:0});
function related(id){return byId[id]||[];}
const norm=t=>String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function search(q){const t=norm(q);return lib.records.filter(m=>!t||related(m.id).some(c=>norm(c.name).includes(t)));}
root.KidBumPharmaDiagnosisCatalog=Object.freeze({byId,related,search,coverage,missingIds,status:'ORIENTATIVO — pendiente de cotejo individual'}); 
})(typeof window!=='undefined'?window:globalThis);
