/* KidBum v0.10.36: match Android browser/PWA system bars to the active
   KidBum theme. Never changes the light theme's original theme-color.
   All clinical engines are unaffected. No storage, telemetry or network. */
(function(){
 'use strict';
 const root=document.documentElement;
 const meta=document.querySelector('meta[name="theme-color"]');
 if(!meta)return;
 const lightColor=meta.getAttribute('content');
 const apply=()=>{
  const dark=root.classList.contains('dark');
  const target=dark?'#0b0b0d':lightColor;
  if(meta.getAttribute('content')!==target)meta.setAttribute('content',target);
 };
 apply();
 if(typeof MutationObserver==='function'){
  new MutationObserver(apply).observe(root,{attributes:true,attributeFilter:['class']});
 }
})();
