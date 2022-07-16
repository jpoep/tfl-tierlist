import{S as Be,i as He,s as Ke,e as fe,b as xe,E as ue,h as J,o as ze,Z as Ye,C as Z,_ as de,$ as Ge,a0 as Je,n as Ze,a1 as he,z as Xe,a2 as We,a3 as ge}from"./index-3e568538.js";import{d as $e,w as D}from"./index-66fd6d2b.js";const P=/^[a-z0-9]+(-[a-z0-9]+)*$/,S=Object.freeze({left:0,top:0,width:16,height:16,rotate:0,vFlip:!1,hFlip:!1});function oe(e){return{...S,...e}}const Q=(e,t,n,i="")=>{const o=e.split(":");if(e.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;i=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const c=o.pop(),a=o.pop(),l={provider:o.length>0?o[0]:i,prefix:a,name:c};return t&&!M(l)?null:l}const r=o[0],s=r.split("-");if(s.length>1){const c={provider:i,prefix:s.shift(),name:s.join("-")};return t&&!M(c)?null:c}if(n&&i===""){const c={provider:i,prefix:"",name:r};return t&&!M(c,n)?null:c}return null},M=(e,t)=>e?!!((e.provider===""||e.provider.match(P))&&(t&&e.prefix===""||e.prefix.match(P))&&e.name.match(P)):!1;function et(e,t){const n={...e};for(const i in S){const o=i;if(t[o]!==void 0){const r=t[o];if(n[o]===void 0){n[o]=r;continue}switch(o){case"rotate":n[o]=(n[o]+r)%4;break;case"hFlip":case"vFlip":n[o]=r!==n[o];break;default:n[o]=r}}}return n}function pe(e,t,n=!1){function i(r,s){if(e.icons[r]!==void 0)return Object.assign({},e.icons[r]);if(s>5)return null;const c=e.aliases;if(c&&c[r]!==void 0){const l=c[r],f=i(l.parent,s+1);return f&&et(f,l)}const a=e.chars;return!s&&a&&a[r]!==void 0?i(a[r],s+1):null}const o=i(t,0);if(o)for(const r in S)o[r]===void 0&&e[r]!==void 0&&(o[r]=e[r]);return o&&n?oe(o):o}function tt(e){for(const t in S)if(e[t]!==void 0)return!0;return!1}function je(e,t,n){n=n||{};const i=[];if(typeof e!="object"||typeof e.icons!="object")return i;e.not_found instanceof Array&&e.not_found.forEach(s=>{t(s,null),i.push(s)});const o=e.icons;Object.keys(o).forEach(s=>{const c=pe(e,s,!0);c&&(t(s,c),i.push(s))});const r=n.aliases||"all";if(r!=="none"&&typeof e.aliases=="object"){const s=e.aliases;Object.keys(s).forEach(c=>{if(r==="variations"&&tt(s[c]))return;const a=pe(e,c,!0);a&&(t(c,a),i.push(c))})}return i}const X={provider:"string",aliases:"object",not_found:"object"};for(const e in S)X[e]=typeof S[e];function ke(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object")return null;for(const o in X)if(e[o]!==void 0&&typeof e[o]!==X[o])return null;const n=t.icons;for(const o in n){const r=n[o];if(!o.match(P)||typeof r.body!="string")return null;for(const s in S)if(r[s]!==void 0&&typeof r[s]!=typeof S[s])return null}const i=t.aliases;if(i)for(const o in i){const r=i[o],s=r.parent;if(!o.match(P)||typeof s!="string"||!n[s]&&!i[s])return null;for(const c in S)if(r[c]!==void 0&&typeof r[c]!=typeof S[c])return null}return t}const nt=1;let U=Object.create(null);try{const e=window||self;e&&e._iconifyStorage.version===nt&&(U=e._iconifyStorage.storage)}catch{}function ot(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:Object.create(null)}}function O(e,t){U[e]===void 0&&(U[e]=Object.create(null));const n=U[e];return n[t]===void 0&&(n[t]=ot(e,t)),n[t]}function re(e,t){if(!ke(t))return[];const n=Date.now();return je(t,(i,o)=>{o?e.icons[i]=o:e.missing[i]=n})}function rt(e,t,n){try{if(typeof n.body=="string")return e.icons[t]=Object.freeze(oe(n)),!0}catch{}return!1}function it(e,t){const n=e.icons[t];return n===void 0?null:n}let T=!1;function Oe(e){return typeof e=="boolean"&&(T=e),T}function st(e){const t=typeof e=="string"?Q(e,!0,T):e;return t?it(O(t.provider,t.prefix),t.name):null}function ct(e,t){const n=Q(e,!0,T);if(!n)return!1;const i=O(n.provider,n.prefix);return rt(i,n.name,t)}function lt(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=typeof e.provider=="string"?e.provider:""),T&&t===""&&(typeof e.prefix!="string"||e.prefix==="")){let i=!1;return ke(e)&&(e.prefix="",je(e,(o,r)=>{r&&ct(o,r)&&(i=!0)})),i}if(typeof e.prefix!="string"||!M({provider:t,prefix:e.prefix,name:"a"}))return!1;const n=O(t,e.prefix);return!!re(n,e)}const me=Object.freeze({inline:!1,width:null,height:null,hAlign:"center",vAlign:"middle",slice:!1,hFlip:!1,vFlip:!1,rotate:0});function at(e,t){const n={};for(const i in e){const o=i;if(n[o]=e[o],t[o]===void 0)continue;const r=t[o];switch(o){case"inline":case"slice":typeof r=="boolean"&&(n[o]=r);break;case"hFlip":case"vFlip":r===!0&&(n[o]=!n[o]);break;case"hAlign":case"vAlign":typeof r=="string"&&r!==""&&(n[o]=r);break;case"width":case"height":(typeof r=="string"&&r!==""||typeof r=="number"&&r||r===null)&&(n[o]=r);break;case"rotate":typeof r=="number"&&(n[o]+=r);break}}return n}const ft=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ut=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function B(e,t,n){if(t===1)return e;if(n=n===void 0?100:n,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const i=e.split(ft);if(i===null||!i.length)return e;const o=[];let r=i.shift(),s=ut.test(r);for(;;){if(s){const c=parseFloat(r);isNaN(c)?o.push(r):o.push(Math.ceil(c*t*n)/n)}else o.push(r);if(r=i.shift(),r===void 0)return o.join("");s=!s}}function dt(e){let t="";switch(e.hAlign){case"left":t+="xMin";break;case"right":t+="xMax";break;default:t+="xMid"}switch(e.vAlign){case"top":t+="YMin";break;case"bottom":t+="YMax";break;default:t+="YMid"}return t+=e.slice?" slice":" meet",t}function ht(e,t){const n={left:e.left,top:e.top,width:e.width,height:e.height};let i=e.body;[e,t].forEach(c=>{const a=[],l=c.hFlip,f=c.vFlip;let u=c.rotate;l?f?u+=2:(a.push("translate("+(n.width+n.left).toString()+" "+(0-n.top).toString()+")"),a.push("scale(-1 1)"),n.top=n.left=0):f&&(a.push("translate("+(0-n.left).toString()+" "+(n.height+n.top).toString()+")"),a.push("scale(1 -1)"),n.top=n.left=0);let d;switch(u<0&&(u-=Math.floor(u/4)*4),u=u%4,u){case 1:d=n.height/2+n.top,a.unshift("rotate(90 "+d.toString()+" "+d.toString()+")");break;case 2:a.unshift("rotate(180 "+(n.width/2+n.left).toString()+" "+(n.height/2+n.top).toString()+")");break;case 3:d=n.width/2+n.left,a.unshift("rotate(-90 "+d.toString()+" "+d.toString()+")");break}u%2===1&&((n.left!==0||n.top!==0)&&(d=n.left,n.left=n.top,n.top=d),n.width!==n.height&&(d=n.width,n.width=n.height,n.height=d)),a.length&&(i='<g transform="'+a.join(" ")+'">'+i+"</g>")});let o,r;t.width===null&&t.height===null?(r="1em",o=B(r,n.width/n.height)):t.width!==null&&t.height!==null?(o=t.width,r=t.height):t.height!==null?(r=t.height,o=B(r,n.width/n.height)):(o=t.width,r=B(o,n.height/n.width)),o==="auto"&&(o=n.width),r==="auto"&&(r=n.height),o=typeof o=="string"?o:o.toString()+"",r=typeof r=="string"?r:r.toString()+"";const s={attributes:{width:o,height:r,preserveAspectRatio:dt(t),viewBox:n.left.toString()+" "+n.top.toString()+" "+n.width.toString()+" "+n.height.toString()},body:i};return t.inline&&(s.inline=!0),s}const gt=/\sid="(\S+)"/g,pt="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let mt=0;function yt(e,t=pt){const n=[];let i;for(;i=gt.exec(e);)n.push(i[1]);return n.length&&n.forEach(o=>{const r=typeof t=="function"?t(o):t+(mt++).toString(),s=o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+s+')([")]|\\.[a-z])',"g"),"$1"+r+"$3")}),e}const W=Object.create(null);function bt(e,t){W[e]=t}function $(e){return W[e]||W[""]}function ie(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path===void 0?"/":e.path,maxURL:e.maxURL?e.maxURL:500,rotate:e.rotate?e.rotate:750,timeout:e.timeout?e.timeout:5e3,random:e.random===!0,index:e.index?e.index:0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const se=Object.create(null),C=["https://api.simplesvg.com","https://api.unisvg.com"],q=[];for(;C.length>0;)C.length===1||Math.random()>.5?q.push(C.shift()):q.push(C.pop());se[""]=ie({resources:["https://api.iconify.design"].concat(q)});function vt(e,t){const n=ie(t);return n===null?!1:(se[e]=n,!0)}function ce(e){return se[e]}const Ee=(e,t)=>{let n=e,i=n.indexOf("?")!==-1;function o(r){switch(typeof r){case"boolean":return r?"true":"false";case"number":return encodeURIComponent(r);case"string":return encodeURIComponent(r);default:throw new Error("Invalid parameter")}}return Object.keys(t).forEach(r=>{let s;try{s=o(t[r])}catch{return}n+=(i?"&":"?")+encodeURIComponent(r)+"="+s,i=!0}),n},Ae={},V={},wt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}return null};let ye=wt();function It(e,t){const n=ce(e);if(!n)return 0;let i;if(!n.maxURL)i=0;else{let r=0;n.resources.forEach(c=>{r=Math.max(r,c.length)});const s=Ee(t+".json",{icons:""});i=n.maxURL-r-n.path.length-s.length}const o=e+":"+t;return V[e]=n.path,Ae[o]=i,i}function St(e){return e===404}const xt=(e,t,n)=>{const i=[];let o=Ae[t];o===void 0&&(o=It(e,t));const r="icons";let s={type:r,provider:e,prefix:t,icons:[]},c=0;return n.forEach((a,l)=>{c+=a.length+1,c>=o&&l>0&&(i.push(s),s={type:r,provider:e,prefix:t,icons:[]},c=a.length),s.icons.push(a)}),i.push(s),i};function jt(e){if(typeof e=="string"){if(V[e]===void 0){const t=ce(e);if(!t)return"/";V[e]=t.path}return V[e]}return"/"}const kt=(e,t,n)=>{if(!ye){n("abort",424);return}let i=jt(t.provider);switch(t.type){case"icons":{const r=t.prefix,c=t.icons.join(",");i+=Ee(r+".json",{icons:c});break}case"custom":{const r=t.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:n("abort",400);return}let o=503;ye(e+i).then(r=>{const s=r.status;if(s!==200){setTimeout(()=>{n(St(s)?"abort":"next",s)});return}return o=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{n("next",o)});return}setTimeout(()=>{n("success",r)})}).catch(()=>{n("next",o)})},Ot={prepare:xt,send:kt};function Et(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((o,r)=>o.provider!==r.provider?o.provider.localeCompare(r.provider):o.prefix!==r.prefix?o.prefix.localeCompare(r.prefix):o.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return e.forEach(o=>{if(i.name===o.name&&i.prefix===o.prefix&&i.provider===o.provider)return;i=o;const r=o.provider,s=o.prefix,c=o.name;n[r]===void 0&&(n[r]=Object.create(null));const a=n[r];a[s]===void 0&&(a[s]=O(r,s));const l=a[s];let f;l.icons[c]!==void 0?f=t.loaded:s===""||l.missing[c]!==void 0?f=t.missing:f=t.pending;const u={provider:r,prefix:s,name:c};f.push(u)}),t}const x=Object.create(null),H=Object.create(null);function Ce(e,t){e.forEach(n=>{const i=n.provider;if(x[i]===void 0)return;const o=x[i],r=n.prefix,s=o[r];s&&(o[r]=s.filter(c=>c.id!==t))})}function At(e,t){H[e]===void 0&&(H[e]=Object.create(null));const n=H[e];n[t]||(n[t]=!0,setTimeout(()=>{if(n[t]=!1,x[e]===void 0||x[e][t]===void 0)return;const i=x[e][t].slice(0);if(!i.length)return;const o=O(e,t);let r=!1;i.forEach(s=>{const c=s.icons,a=c.pending.length;c.pending=c.pending.filter(l=>{if(l.prefix!==t)return!0;const f=l.name;if(o.icons[f]!==void 0)c.loaded.push({provider:e,prefix:t,name:f});else if(o.missing[f]!==void 0)c.missing.push({provider:e,prefix:t,name:f});else return r=!0,!0;return!1}),c.pending.length!==a&&(r||Ce([{provider:e,prefix:t}],s.id),s.callback(c.loaded.slice(0),c.missing.slice(0),c.pending.slice(0),s.abort))})}))}let Ct=0;function _t(e,t,n){const i=Ct++,o=Ce.bind(null,n,i);if(!t.pending.length)return o;const r={id:i,icons:t,callback:e,abort:o};return n.forEach(s=>{const c=s.provider,a=s.prefix;x[c]===void 0&&(x[c]=Object.create(null));const l=x[c];l[a]===void 0&&(l[a]=[]),l[a].push(r)}),o}function Pt(e,t=!0,n=!1){const i=[];return e.forEach(o=>{const r=typeof o=="string"?Q(o,!1,n):o;(!t||M(r,n))&&i.push({provider:r.provider,prefix:r.prefix,name:r.name})}),i}var be={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Mt(e,t,n,i){const o=e.resources.length,r=e.random?Math.floor(Math.random()*o):e.index;let s;if(e.random){let h=e.resources.slice(0);for(s=[];h.length>1;){const y=Math.floor(Math.random()*h.length);s.push(h[y]),h=h.slice(0,y).concat(h.slice(y+1))}s=s.concat(h)}else s=e.resources.slice(r).concat(e.resources.slice(0,r));const c=Date.now();let a="pending",l=0,f,u=null,d=[],g=[];typeof i=="function"&&g.push(i);function b(){u&&(clearTimeout(u),u=null)}function v(){a==="pending"&&(a="aborted"),b(),d.forEach(h=>{h.status==="pending"&&(h.status="aborted")}),d=[]}function E(h,y){y&&(g=[]),typeof h=="function"&&g.push(h)}function m(){return{startTime:c,payload:t,status:a,queriesSent:l,queriesPending:d.length,subscribe:E,abort:v}}function p(){a="failed",g.forEach(h=>{h(void 0,f)})}function w(){d.forEach(h=>{h.status==="pending"&&(h.status="aborted")}),d=[]}function L(h,y,A){const R=y!=="success";switch(d=d.filter(j=>j!==h),a){case"pending":break;case"failed":if(R||!e.dataAfterTimeout)return;break;default:return}if(y==="abort"){f=A,p();return}if(R){f=A,d.length||(s.length?I():p());return}if(b(),w(),!e.random){const j=e.resources.indexOf(h.resource);j!==-1&&j!==e.index&&(e.index=j)}a="completed",g.forEach(j=>{j(A)})}function I(){if(a!=="pending")return;b();const h=s.shift();if(h===void 0){if(d.length){u=setTimeout(()=>{b(),a==="pending"&&(w(),p())},e.timeout);return}p();return}const y={status:"pending",resource:h,callback:(A,R)=>{L(y,A,R)}};d.push(y),l++,u=setTimeout(I,e.rotate),n(h,t,y.callback)}return setTimeout(I),m}function Tt(e){if(typeof e!="object"||typeof e.resources!="object"||!(e.resources instanceof Array)||!e.resources.length)throw new Error("Invalid Reduncancy configuration");const t=Object.create(null);let n;for(n in be)e[n]!==void 0?t[n]=e[n]:t[n]=be[n];return t}function _e(e){const t=Tt(e);let n=[];function i(){n=n.filter(c=>c().status==="pending")}function o(c,a,l){const f=Mt(t,c,a,(u,d)=>{i(),l&&l(u,d)});return n.push(f),f}function r(c){const a=n.find(l=>c(l));return a!==void 0?a:null}return{query:o,find:r,setIndex:c=>{t.index=c},getIndex:()=>t.index,cleanup:i}}function ve(){}const K=Object.create(null);function Dt(e){if(K[e]===void 0){const t=ce(e);if(!t)return;const n=_e(t),i={config:t,redundancy:n};K[e]=i}return K[e]}function Ft(e,t,n){let i,o;if(typeof e=="string"){const r=$(e);if(!r)return n(void 0,424),ve;o=r.send;const s=Dt(e);s&&(i=s.redundancy)}else{const r=ie(e);if(r){i=_e(r);const s=e.resources?e.resources[0]:"",c=$(s);c&&(o=c.send)}}return!i||!o?(n(void 0,424),ve):i.query(t,o,n)().abort}const ee={};function we(){}const k=Object.create(null),z=Object.create(null),Y=Object.create(null),G=Object.create(null);function Lt(e,t){Y[e]===void 0&&(Y[e]=Object.create(null));const n=Y[e];n[t]||(n[t]=!0,setTimeout(()=>{n[t]=!1,At(e,t)}))}const Ie=Object.create(null);function Rt(e,t,n){function i(){const c=(e===""?"":"@"+e+":")+t,a=Math.floor(Date.now()/6e4);Ie[c]<a&&(Ie[c]=a,console.error('Unable to retrieve icons for "'+c+'" because API is not configured properly.'))}z[e]===void 0&&(z[e]=Object.create(null));const o=z[e];G[e]===void 0&&(G[e]=Object.create(null));const r=G[e];k[e]===void 0&&(k[e]=Object.create(null));const s=k[e];o[t]===void 0?o[t]=n:o[t]=o[t].concat(n).sort(),r[t]||(r[t]=!0,setTimeout(()=>{r[t]=!1;const c=o[t];delete o[t];const a=$(e);if(!a){i();return}a.prepare(e,t,c).forEach(f=>{Ft(e,f,(u,d)=>{const g=O(e,t);if(typeof u!="object"){if(d!==404)return;const b=Date.now();f.icons.forEach(v=>{g.missing[v]=b})}else try{const b=re(g,u);if(!b.length)return;const v=s[t];b.forEach(E=>{delete v[E]}),ee.store&&ee.store(e,u)}catch(b){console.error(b)}Lt(e,t)})})}))}const Nt=(e,t)=>{const n=Pt(e,!0,Oe()),i=Et(n);if(!i.pending.length){let l=!0;return t&&setTimeout(()=>{l&&t(i.loaded,i.missing,i.pending,we)}),()=>{l=!1}}const o=Object.create(null),r=[];let s,c;i.pending.forEach(l=>{const f=l.provider,u=l.prefix;if(u===c&&f===s)return;s=f,c=u,r.push({provider:f,prefix:u}),k[f]===void 0&&(k[f]=Object.create(null));const d=k[f];d[u]===void 0&&(d[u]=Object.create(null)),o[f]===void 0&&(o[f]=Object.create(null));const g=o[f];g[u]===void 0&&(g[u]=[])});const a=Date.now();return i.pending.forEach(l=>{const f=l.provider,u=l.prefix,d=l.name,g=k[f][u];g[d]===void 0&&(g[d]=a,o[f][u].push(d))}),r.forEach(l=>{const f=l.provider,u=l.prefix;o[f][u].length&&Rt(f,u,o[f][u])}),t?_t(t,i,r):we},Pe="iconify2",F="iconify",Me=F+"-count",Te=F+"-version",De=36e5,Ut=168,le={local:!0,session:!0};let te=!1;const Fe={local:0,session:0},Le={local:[],session:[]};let N=typeof window>"u"?{}:window;function Re(e){const t=e+"Storage";try{if(N&&N[t]&&typeof N[t].length=="number")return N[t]}catch{}return le[e]=!1,null}function ae(e,t,n){try{return e.setItem(Me,n.toString()),Fe[t]=n,!0}catch{return!1}}function Ne(e){const t=e.getItem(Me);if(t){const n=parseInt(t);return n||0}return 0}function qt(e,t){try{e.setItem(Te,Pe)}catch{}ae(e,t,0)}function Vt(e){try{const t=Ne(e);for(let n=0;n<t;n++)e.removeItem(F+n.toString())}catch{}}const Ue=()=>{if(te)return;te=!0;const e=Math.floor(Date.now()/De)-Ut;function t(n){const i=Re(n);if(!i)return;const o=r=>{const s=F+r.toString(),c=i.getItem(s);if(typeof c!="string")return!1;let a=!0;try{const l=JSON.parse(c);if(typeof l!="object"||typeof l.cached!="number"||l.cached<e||typeof l.provider!="string"||typeof l.data!="object"||typeof l.data.prefix!="string")a=!1;else{const f=l.provider,u=l.data.prefix,d=O(f,u);a=re(d,l.data).length>0}}catch{a=!1}return a||i.removeItem(s),a};try{const r=i.getItem(Te);if(r!==Pe){r&&Vt(i),qt(i,n);return}let s=Ne(i);for(let c=s-1;c>=0;c--)o(c)||(c===s-1?s--:Le[n].push(c));ae(i,n,s)}catch{}}for(const n in le)t(n)},Qt=(e,t)=>{te||Ue();function n(i){if(!le[i])return!1;const o=Re(i);if(!o)return!1;let r=Le[i].shift();if(r===void 0&&(r=Fe[i],!ae(o,i,r+1)))return!1;try{const s={cached:Math.floor(Date.now()/De),provider:e,data:t};o.setItem(F+r.toString(),JSON.stringify(s))}catch{return!1}return!0}!Object.keys(t.icons).length||(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))},qe=/[\s,]+/;function Bt(e,t){t.split(qe).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Ht(e,t){t.split(qe).forEach(n=>{const i=n.trim();switch(i){case"left":case"center":case"right":e.hAlign=i;break;case"top":case"middle":case"bottom":e.vAlign=i;break;case"slice":case"crop":e.slice=!0;break;case"meet":e.slice=!1}})}function Kt(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function i(o){for(;o<0;)o+=4;return o%4}if(n===""){const o=parseInt(e);return isNaN(o)?0:i(o)}else if(n!==e){let o=0;switch(n){case"%":o=25;break;case"deg":o=90}if(o){let r=parseFloat(e.slice(0,e.length-n.length));return isNaN(r)?0:(r=r/o,r%1===0?i(r):0)}}return t}const zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"};function Yt(e,t){const n=at(me,t),i={...zt};let o=typeof t.style=="string"?t.style:"";for(let a in t){const l=t[a];if(l!==void 0)switch(a){case"icon":case"style":case"onLoad":break;case"inline":case"hFlip":case"vFlip":n[a]=l===!0||l==="true"||l===1;break;case"flip":typeof l=="string"&&Bt(n,l);break;case"align":typeof l=="string"&&Ht(n,l);break;case"color":o=o+(o.length>0&&o.trim().slice(-1)!==";"?";":"")+"color: "+l+"; ";break;case"rotate":typeof l=="string"?n[a]=Kt(l):typeof l=="number"&&(n[a]=l);break;case"ariaHidden":case"aria-hidden":l!==!0&&l!=="true"&&delete i["aria-hidden"];break;default:if(a.slice(0,3)==="on:")break;me[a]===void 0&&(i[a]=l)}}const r=ht(e,n);for(let a in r.attributes)i[a]=r.attributes[a];r.inline&&(o="vertical-align: -0.125em; "+o),o!==""&&(i.style=o);let s=0,c=t.id;return typeof c=="string"&&(c=c.replace(/-/g,"_")),{attributes:i,body:yt(r.body,c?()=>c+"ID"+s++:"iconifySvelte")}}Oe(!0);bt("",Ot);if(typeof document<"u"&&typeof window<"u"){ee.store=Qt,Ue();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!lt(i))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const i="IconifyProviders["+n+"] is invalid.";try{const o=t[n];if(typeof o!="object"||!o||o.resources===void 0)continue;vt(n,o)||console.error(i)}catch{console.error(i)}}}}function Gt(e,t,n,i,o){function r(){t.loading&&(t.loading.abort(),t.loading=null)}if(typeof e=="object"&&e!==null&&typeof e.body=="string")return t.name="",r(),{data:oe(e)};let s;if(typeof e!="string"||(s=Q(e,!1,!0))===null)return r(),null;const c=st(s);if(c===null)return n&&(!t.loading||t.loading.name!==e)&&(r(),t.name="",t.loading={name:e,abort:Nt([s],i)}),null;r(),t.name!==e&&(t.name=e,o&&!t.destroyed&&o(e));const a=["iconify"];return s.prefix!==""&&a.push("iconify--"+s.prefix),s.provider!==""&&a.push("iconify--"+s.provider),{data:c,classes:a}}function Jt(e,t){return e?Yt(e,t):null}function Se(e){let t,n=e[0].body+"",i=[e[0].attributes],o={};for(let r=0;r<i.length;r+=1)o=Z(o,i[r]);return{c(){t=Ge("svg"),this.h()},l(r){t=Je(r,"svg",{});var s=Ze(t);s.forEach(J),this.h()},h(){he(t,o)},m(r,s){xe(r,t,s),t.innerHTML=n},p(r,s){s&1&&n!==(n=r[0].body+"")&&(t.innerHTML=n),he(t,o=Xe(i,[s&1&&r[0].attributes]))},d(r){r&&J(t)}}}function Zt(e){let t,n=e[0]!==null&&Se(e);return{c(){n&&n.c(),t=fe()},l(i){n&&n.l(i),t=fe()},m(i,o){n&&n.m(i,o),xe(i,t,o)},p(i,[o]){i[0]!==null?n?n.p(i,o):(n=Se(i),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:ue,o:ue,d(i){n&&n.d(i),i&&J(t)}}}function Xt(e,t,n){const i={name:"",loading:null,destroyed:!1};let o=!1,r=0,s;const c=l=>{typeof t.onLoad=="function"&&t.onLoad(l),We()("load",{icon:l})};function a(){n(3,r++,r)}return ze(()=>{n(2,o=!0)}),Ye(()=>{n(1,i.destroyed=!0,i),i.loading&&(i.loading.abort(),n(1,i.loading=null,i))}),e.$$set=l=>{n(6,t=Z(Z({},t),de(l)))},e.$$.update=()=>{{const l=Gt(t.icon,i,o,a,c);n(0,s=l?Jt(l.data,t):null),s&&l.classes&&n(0,s.attributes.class=(typeof t.class=="string"?t.class+" ":"")+l.classes.join(" "),s)}},t=de(t),[s,i,o,r]}class rn extends Be{constructor(t){super(),He(this,t,Xt,Zt,Ke,{})}}function Wt(e,t,n,i){var o,r,s=!1,c="withOld"in n,a=(m,p)=>{if(o=p,c&&(r=m),!s){let w=t(m,p);if(t.length<2)p(w);else return w}s=!1},l=$e(e,a,i),f=!Array.isArray(e),u=m=>{f?(s=!0,e.set(m)):m.forEach((p,w)=>{s=!0,e[w].set(p)}),s=!1};c&&(n=n.withOld);var d=n.length>=(c?3:2),g=null;function b(m){if(g&&(g(),g=null),c)var p=n(m,r,u);else var p=n(m,u);d?typeof p=="function"&&(g=p):u(p)}var v=!1;function E(m){var p,w,L,I;if(v){I=m(ge(l)),o(I);return}var h=l.subscribe(y=>{v?p?w=!0:p=!0:L=y});I=m(L),v=!0,o(I),h(),v=!1,w&&(I=ge(l)),p&&b(I)}return{subscribe:l.subscribe,set(m){E(()=>m)},update:E}}let _="en";_=localStorage.getItem("language")||"en",(_!=="de"||_!=="en")&&(_="en");const Ve=D(_);Ve.subscribe(e=>localStorage.setItem("language",e));const sn=()=>{Ve.update(e=>e==="de"?"en":"de")};let Qe=null;Qe=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");const ne=D(Qe),cn=Wt(ne,e=>e==="dark",e=>e?"dark":"light");ne.subscribe(e=>{e&&(document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e))}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{ne.set(e.matches?"dark":"light")});const $t=D();$t.subscribe(e=>{const t=new URL(window.location.href);(e==null?void 0:e.length)>0?t.searchParams.set("q",e):t.searchParams.delete("q"),window.history.replaceState(null,"",t.toString())});const ln=D(!1),en=D(localStorage.getItem("officialArtworkEnabled")==="true"||!1);en.subscribe(e=>localStorage.setItem("officialArtworkEnabled",e.toString()));function tn(e){const t=e-1;return t*t*t+1}function an(e){return e===1?e:1-Math.pow(2,-10*e)}function fn(e,{delay:t=0,duration:n=400,easing:i=tn,x:o=0,y:r=0,opacity:s=0}={}){const c=getComputedStyle(e),a=+c.opacity,l=c.transform==="none"?"":c.transform,f=a*(1-s);return{delay:t,duration:n,easing:i,css:(u,d)=>`
			transform: ${l} translate(${(1-u)*o}px, ${(1-u)*r}px);
			opacity: ${a-f*d}`}}export{rn as I,ln as a,$t as b,tn as c,cn as d,an as e,fn as f,Ve as l,en as o,sn as t};
