'use strict';
// Run after changing any cached file and before publishing.
const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');process.chdir(path.resolve(__dirname,'..'));
const file='sw.js',sw=fs.readFileSync(file,'utf8');
const all=JSON.parse(sw.match(/const ASSETS=(\[[\s\S]*?\]);/)[1].replaceAll("'","\""));
const excluded=[...sw.slice(sw.indexOf('const BUNDLED_SOURCE_FILES'),sw.indexOf('const CORE_ASSETS')).matchAll(/'(\.\/[^']+)'/g)].map(m=>m[1]);
const extras=[...sw.slice(sw.indexOf('const CORE_ASSETS'),sw.indexOf('const SHELL_URL')).matchAll(/'(\.\/[^']+)'/g)].map(m=>m[1]);
const core=[...new Set([...all.filter(p=>p!=='./'&&!excluded.includes(p)),...extras])];
const hashes=Object.fromEntries(core.map(p=>{const b=fs.readFileSync(p);return [p,crypto.createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')]}));
const next=sw.replace(/const ASSET_HASHES=\{[^\n]*\};/,'const ASSET_HASHES='+JSON.stringify(hashes)+';');if(!next.includes('const ASSET_HASHES='+JSON.stringify(hashes)+';'))throw Error('Manifest anchor missing');fs.writeFileSync(file,next);console.log('Offline integrity:',core.length,'files');
