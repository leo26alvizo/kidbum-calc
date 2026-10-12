/* KidBum CALC — optional privacy-conscious Umami Cloud analytics.
 * Script loads only when WEBSITE_ID is valid, on the production host, online,
 * and the visitor has not opted out or enabled Do Not Track.
 * This module must never read clinical form fields or result values.
 */
(function(root){
'use strict';
const WEBSITE_ID='988ef93d-af5f-4370-9b81-769efcb0cb3d'; // Public Umami Cloud site identifier (not an API key).
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
 /* In Umami, both a normal pageview (no name) and a named custom event
    use type=event. Never block legitimate anonymous pageviews. */
 if(type!=='event'||!payload||typeof payload!=='object')return false;
 const name=payload.name;
 if(name!==undefined&&!EVENTS.includes(name))return false;
 /* Explicit allowlist, never copy arbitrary browser/patient fields.
    Umami needs website, hostname and URL, and accepts language/screen. */
 const safe={website:WEBSITE_ID,hostname:PRODUCTION_HOST,
  url:SAFE_PATH,title:'KidBum CALC'};
 if(typeof payload.language==='string')safe.language=payload.language.slice(0,16);
 if(typeof payload.screen==='string')safe.screen=payload.screen.slice(0,24);
 if(name!==undefined)safe.name=name;
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
