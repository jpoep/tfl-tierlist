import{D as b,E as w,F as k,s as m,G as q}from"./index-a742bca5.js";function A(n,f){const o={},r={},i={$$scope:1};let u=n.length;for(;u--;){const c=n[u],e=f[u];if(e){for(const t in c)t in e||(r[t]=1);for(const t in e)i[t]||(o[t]=e[t],i[t]=1);n[u]=e}else for(const t in c)i[t]=1}for(const c in r)c in o||(o[c]=void 0);return o}function E(n){return typeof n=="object"&&n!==null?n:{}}const l=[];function j(n,f){return{subscribe:x(n,f).subscribe}}function x(n,f=b){let o;const r=new Set;function i(e){if(m(n,e)&&(n=e,o)){const t=!l.length;for(const s of r)s[1](),l.push(s,n);if(t){for(let s=0;s<l.length;s+=2)l[s][0](l[s+1]);l.length=0}}}function u(e){i(e(n))}function c(e,t=b){const s=[e,t];return r.add(s),r.size===1&&(o=f(i,u)||b),e(n),()=>{r.delete(s),r.size===0&&o&&(o(),o=null)}}return{set:i,update:u,subscribe:c}}function $(n,f,o){const r=!Array.isArray(n),i=r?[n]:n;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const u=f.length<2;return j(o,(c,e)=>{let t=!1;const s=[];let d=0,p=b;const y=()=>{if(d)return;p();const a=f(r?s[0]:s,c,e);u?c(a):p=q(a)?a:b},_=i.map((a,g)=>w(a,h=>{s[g]=h,d&=~(1<<g),t&&y()},()=>{d|=1<<g}));return t=!0,y(),function(){k(_),p(),t=!1}})}export{E as a,$ as d,A as g,x as w};