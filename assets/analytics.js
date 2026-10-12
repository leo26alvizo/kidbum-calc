/* KidBum CALC — optional privacy-conscious Umami Cloud analytics.
 * No network requests are made until WEBSITE_ID is configured.
 * Website IDs are public tracker identifiers, never API credentials.
 * This module must never read clinical form fields or result values.
 */
(function(root){
'use strict';
const WEBSITE_ID=''; // Paste the public data-website-id from Umami Cloud.
const TRACKER_URL='https://cloud.umami.is/script.js';
const PRODUCTION_HOST='leo26alvizo.github.io';
const OPT_OUT_KEY='kidbum-analytics-optout';
const SAFE_PATH='/kidbum-calc/';
const EVENTS=Object.freeze([
 'kidbum_open_app',
 'kidbum_open_browser',
 'kidbum_install_android'
]);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const configured=uuid.test(WEBSITE_ID);
function optedOut(){
 try{return root.localStorage?.getItem(OPT_OUT_KEY)==='1';}
 catch{return false;}
}
function setOptOut(value){
 try{
  if(value)root.localStorage.setItem(OPT_OUT_KEY,'1');
  else root.localStorage.removeItem(OPT_OUT_KEY);
  root.location.reload();
  return true;
 }catch{return false;}
}
function dnt(){
 return root.navigator?.doNotTrack==='1'||root.navigator?.msDoNotTrack==='1'
   ||root.doNotTrack==='1';
}
function isStandalone(){
 try{return root.matchMedia?.('(display-mode: standalone)').matches===true
  ||root.navigator?.standalone===true;}
 catch{return root.navigator?.standalone===true;}
}
const eligible=configured&&root.location?.hostname===PRODUCTION_HOST&&!optedOut()&&!dnt();
const state={configured,eligible};
root.KidBumAnalytics=Object.freeze({
 isConfigured:()=>state.configured,
 isEligible:()=>state.eligible,
 isOptedOut:optedOut,
 setOptOut
});
if(!eligible||!root.document||!root.navigator?.onLine)return;
/* Never forward URLs with query strings, URL fragments, referrers, or event data.
 * No clinical fields, results, calculator names, search terms or identifiers.
 */
root.kidbumAnalyticsBeforeSend=function(type,payload){
 if(!payload||typeof payload!=='object')return false;
 if(type==='event'&&!EVENTS.includes(payload.name))return false;
 const safe={...payload,url:SAFE_PATH,title:'KidBum CALC'};
 delete safe.referrer;
 delete safe.data;
 return safe;
};
function trackEvent(name){
 if(EVENTS.includes(name)&&typeof root.umami?.track==='function'){
  try{root.umami.track(name);}catch{ /* Analytics must never break calculators. */ }
 }
}
const script=root.document.createElement('script');
script.async=true;
script.src=TRACKER_URL;
script.referrerPolicy='no-referrer';
script.dataset.websiteId=WEBSITE_ID;
script.dataset.domains=PRODUCTION_HOST;
script.dataset.excludeSearch='true';
script.dataset.excludeHash='true';
script.dataset.doNotTrack='true';
script.dataset.beforeSend='kidbumAnalyticsBeforeSend';
script.onload=()=>{
 trackEvent(isStandalone()?'kidbum_open_app':'kidbum_open_browser');
};
root.addEventListener?.('appinstalled',()=>trackEvent('kidbum_install_android'));
root.document.head.appendChild(script);
})(typeof window!=='undefined'?window:globalThis);
