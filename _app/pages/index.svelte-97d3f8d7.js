var Le=Object.defineProperty,Ue=Object.defineProperties;var Ae=Object.getOwnPropertyDescriptors;var ue=Object.getOwnPropertySymbols;var Be=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable;var fe=(r,e,t)=>e in r?Le(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ne=(r,e)=>{for(var t in e||(e={}))Be.call(e,t)&&fe(r,t,e[t]);if(ue)for(var t of ue(e))Ce.call(e,t)&&fe(r,t,e[t]);return r},re=(r,e)=>Ue(r,Ae(e));import{L as Ge,D as Ne,S as Y,i as Z,s as z,e as E,c as D,a as V,d as m,b as g,g as S,M as x,n as G,o as N,p as O,q as w,N as le,O as Oe,P as Ve,Q as Re,w as R,x as j,y as q,K as H,B as K,R as je,T as ae,t as U,h as A,U as ee,J as b,j as W,k as F,m as M,V as oe,W as te,X as _e,Y as Q,v as qe,l as X,Z as Te,_ as Ke,$ as We,a0 as He,a1 as ze,a2 as Pe,a3 as Je,a4 as Qe,a5 as Xe,a6 as de,a7 as Ye}from"../chunks/vendor-5973ba0b.js";let Se="en";Se=localStorage.getItem("language");const C=Ne(Se||"en");C.subscribe(r=>localStorage.setItem("language",r));const Ze=()=>{C.update(r=>r==="de"?"en":"de")};let Fe;Fe=localStorage.getItem("theme")||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";const se=Ne(Fe),he=Ge(se,r=>r==="dark",r=>r?"dark":"light");se.subscribe(r=>{document.documentElement.setAttribute("data-theme",r),localStorage.setItem("theme",r)}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r=>{se.set(r.matches?"dark":"light")});function xe(r){let e,t;return e=new Ve({props:{icon:Re}}),{c(){R(e.$$.fragment)},l(l){j(e.$$.fragment,l)},m(l,s){q(e,l,s),t=!0},p:H,i(l){t||(w(e.$$.fragment,l),t=!0)},o(l){N(e.$$.fragment,l),t=!1},d(l){K(e,l)}}}function et(r){let e,t;return e=new Ve({props:{icon:je}}),{c(){R(e.$$.fragment)},l(l){j(e.$$.fragment,l)},m(l,s){q(e,l,s),t=!0},p:H,i(l){t||(w(e.$$.fragment,l),t=!0)},o(l){N(e.$$.fragment,l),t=!1},d(l){K(e,l)}}}function tt(r){let e,t,l,s,i,o;const a=[et,xe],n=[];function u(f,p){return f[0]?0:1}return t=u(r),l=n[t]=a[t](r),{c(){e=E("button"),l.c(),this.h()},l(f){e=D(f,"BUTTON",{class:!0});var p=V(e);l.l(p),p.forEach(m),this.h()},h(){g(e,"class","svelte-1cwi06j")},m(f,p){S(f,e,p),n[t].m(e,null),s=!0,i||(o=x(e,"click",r[1]),i=!0)},p(f,[p]){let v=t;t=u(f),t===v?n[t].p(f,p):(G(),N(n[v],1,1,()=>{n[v]=null}),O(),l=n[t],l?l.p(f,p):(l=n[t]=a[t](f),l.c()),w(l,1),l.m(e,null))},i(f){s||(w(l),s=!0)},o(f){N(l),s=!1},d(f){f&&m(e),n[t].d(),i=!1,o()}}}function lt(r,e,t){let l;return le(r,he,i=>t(0,l=i)),[l,()=>Oe(he,l=!l,l)]}class nt extends Y{constructor(e){super();Z(this,e,lt,tt,z,{})}}class rt{constructor(e){Object.assign(this,e)}get localName(){return this.name[ae(C)]}get localForm(){var e;return(e=this.form)==null?void 0:e[ae(C)]}get localNotes(){var e;return(e=this.notes)==null?void 0:e[ae(C)]}}function me(r){let e,t=B[r[1]][r[2]]+"",l,s;return{c(){e=E("span"),l=U(t),this.h()},l(i){e=D(i,"SPAN",{class:!0});var o=V(e);l=A(o,t),o.forEach(m),this.h()},h(){g(e,"class",s=ee(r[1])+" svelte-rb7ane")},m(i,o){S(i,e,o),b(e,l)},p(i,o){o&6&&t!==(t=B[i[1]][i[2]]+"")&&W(l,t),o&2&&s!==(s=ee(i[1])+" svelte-rb7ane")&&g(e,"class",s)},d(i){i&&m(e)}}}function at(r){let e,t,l=B[r[0]][r[2]]+"",s,i,o,a=r[1]&&me(r);return{c(){e=E("div"),t=E("span"),s=U(l),o=F(),a&&a.c(),this.h()},l(n){e=D(n,"DIV",{class:!0});var u=V(e);t=D(u,"SPAN",{class:!0});var f=V(t);s=A(f,l),f.forEach(m),o=M(u),a&&a.l(u),u.forEach(m),this.h()},h(){g(t,"class",i=ee(r[0])+" svelte-rb7ane"),g(e,"class","svelte-rb7ane")},m(n,u){S(n,e,u),b(e,t),b(t,s),b(e,o),a&&a.m(e,null)},p(n,[u]){u&5&&l!==(l=B[n[0]][n[2]]+"")&&W(s,l),u&1&&i!==(i=ee(n[0])+" svelte-rb7ane")&&g(t,"class",i),n[1]?a?a.p(n,u):(a=me(n),a.c(),a.m(e,null)):a&&(a.d(1),a=null)},i:H,o:H,d(n){n&&m(e),a&&a.d()}}}const B={normal:{de:"Normal",en:"Normal"},fire:{de:"Feuer",en:"Fire"},water:{de:"Wasser",en:"Water"},electric:{de:"Elektro",en:"Electric"},grass:{de:"Pflanze",en:"Grass"},ice:{de:"Eis",en:"Ice"},fighting:{de:"Kampf",en:"Fighting"},poison:{de:"Gift",en:"Poison"},ground:{de:"Boden",en:"Ground"},flying:{de:"Flug",en:"Flying"},psychic:{de:"Psycho",en:"Psychic"},bug:{de:"K\xE4fer",en:"Bug"},rock:{de:"Gestein",en:"Rock"},ghost:{de:"Geist",en:"Ghost"},dragon:{de:"Drache",en:"Dragon"},dark:{de:"Unlicht",en:"Dark"},steel:{de:"Stahl",en:"Steel"},fairy:{de:"Fee",en:"Fairy"}};function st(r,e,t){let l;le(r,C,o=>t(2,l=o));let{type1:s}=e,{type2:i=null}=e;return r.$$set=o=>{"type1"in o&&t(0,s=o.type1),"type2"in o&&t(1,i=o.type2)},[s,i,l]}class ot extends Y{constructor(e){super();Z(this,e,st,at,z,{type1:0,type2:1})}}function pe(r){let e,t,l,s,i;return{c(){e=E("div"),this.h()},l(o){e=D(o,"DIV",{class:!0}),V(e).forEach(m),this.h()},h(){g(e,"class","pokemon-note svelte-1n9h46v")},m(o,a){S(o,e,a),l=!0,s||(i=x(e,"click",r[2]),s=!0)},p:H,i(o){l||(oe(()=>{t||(t=te(e,Q,{y:-10,duration:300},!0)),t.run(1)}),l=!0)},o(o){t||(t=te(e,Q,{y:-10,duration:300},!1)),t.run(0),l=!1},d(o){o&&m(e),o&&t&&t.end(),s=!1,i()}}}function ge(r){let e,t=(r[1].localNotes||"")+"",l,s,i,o,a;return{c(){e=E("div"),l=U(t),this.h()},l(n){e=D(n,"DIV",{class:!0});var u=V(e);l=A(u,t),u.forEach(m),this.h()},h(){g(e,"class","modal svelte-1n9h46v")},m(n,u){S(n,e,u),b(e,l),i=!0,o||(a=x(e,"click",r[2]),o=!0)},p(n,u){(!i||u&2)&&t!==(t=(n[1].localNotes||"")+"")&&W(l,t)},i(n){i||(oe(()=>{s||(s=te(e,Q,{y:50,duration:300},!0)),s.run(1)}),i=!0)},o(n){s||(s=te(e,Q,{y:50,duration:300},!1)),s.run(0),i=!1},d(n){n&&m(e),n&&s&&s.end(),o=!1,a()}}}function it(r){let e,t,l,s,i,o,a,n,u=r[1].localName+"",f,p,v,$=(r[1].localForm||"")+"",P,L,T,I,d,y,c=r[0].notes&&!r[1].noteActive&&pe(r),_=r[1].noteActive&&ge(r);return I=new ot({props:{type1:r[0].typing[0],type2:r[0].typing[1]}}),{c(){e=E("a"),t=E("img"),i=F(),c&&c.c(),o=F(),_&&_.c(),a=F(),n=E("div"),f=U(u),p=F(),v=E("div"),P=U($),L=F(),T=E("div"),R(I.$$.fragment),this.h()},l(h){e=D(h,"A",{class:!0,href:!0,target:!0});var k=V(e);t=D(k,"IMG",{src:!0,alt:!0,class:!0}),i=M(k),c&&c.l(k),o=M(k),_&&_.l(k),a=M(k),n=D(k,"DIV",{class:!0});var J=V(n);f=A(J,u),J.forEach(m),p=M(k),v=D(k,"DIV",{class:!0});var ie=V(v);P=A(ie,$),ie.forEach(m),L=M(k),T=D(k,"DIV",{class:!0});var ce=V(T);j(I.$$.fragment,ce),ce.forEach(m),k.forEach(m),this.h()},h(){_e(t.src,l=r[0].imageUrl)||g(t,"src",l),g(t,"alt",s=r[1].localName),g(t,"class","svelte-1n9h46v"),g(n,"class","pokemon-name"),g(v,"class","pokemon-form secondary svelte-1n9h46v"),g(T,"class","pokemon-typing svelte-1n9h46v"),g(e,"class","pokemon svelte-1n9h46v"),g(e,"href",d=r[0].pokemonDbUrl),g(e,"target","_blank")},m(h,k){S(h,e,k),b(e,t),b(e,i),c&&c.m(e,null),b(e,o),_&&_.m(e,null),b(e,a),b(e,n),b(n,f),b(e,p),b(e,v),b(v,P),b(e,L),b(e,T),q(I,T,null),y=!0},p(h,[k]){(!y||k&1&&!_e(t.src,l=h[0].imageUrl))&&g(t,"src",l),(!y||k&2&&s!==(s=h[1].localName))&&g(t,"alt",s),h[0].notes&&!h[1].noteActive?c?(c.p(h,k),k&3&&w(c,1)):(c=pe(h),c.c(),w(c,1),c.m(e,o)):c&&(G(),N(c,1,1,()=>{c=null}),O()),h[1].noteActive?_?(_.p(h,k),k&2&&w(_,1)):(_=ge(h),_.c(),w(_,1),_.m(e,a)):_&&(G(),N(_,1,1,()=>{_=null}),O()),(!y||k&2)&&u!==(u=h[1].localName+"")&&W(f,u),(!y||k&2)&&$!==($=(h[1].localForm||"")+"")&&W(P,$);const J={};k&1&&(J.type1=h[0].typing[0]),k&1&&(J.type2=h[0].typing[1]),I.$set(J),(!y||k&1&&d!==(d=h[0].pokemonDbUrl))&&g(e,"href",d)},i(h){y||(w(c),w(_),w(I.$$.fragment,h),y=!0)},o(h){N(c),N(_),N(I.$$.fragment,h),y=!1},d(h){h&&m(e),c&&c.d(),_&&_.d(),K(I)}}}function ct(r,e,t){let l,{pokemon:s}=e;const i=o=>{t(1,l.noteActive=!l.noteActive,l),o.preventDefault()};return r.$$set=o=>{"pokemon"in o&&t(0,s=o.pokemon)},r.$$.update=()=>{r.$$.dirty&1&&t(1,l=new rt(s))},[s,l,i]}class Me extends Y{constructor(e){super();Z(this,e,ct,it,z,{pokemon:0})}}function ve(r,e,t){const l=r.slice();return l[3]=e[t],l}function ke(r,e,t){const l=r.slice();return l[3]=e[t],l}function ut(r){let e=[],t=new Map,l,s,i=r[0].pokemon;const o=a=>a[3].id;for(let a=0;a<i.length;a+=1){let n=ve(r,i,a),u=o(n);t.set(u,e[a]=be(u,n))}return{c(){for(let a=0;a<e.length;a+=1)e[a].c();l=X()},l(a){for(let n=0;n<e.length;n+=1)e[n].l(a);l=X()},m(a,n){for(let u=0;u<e.length;u+=1)e[u].m(a,n);S(a,l,n),s=!0},p(a,n){n&1&&(i=a[0].pokemon,G(),e=Te(e,n,o,1,a,i,t,l.parentNode,He,be,l,ve),O())},i(a){if(!s){for(let n=0;n<i.length;n+=1)w(e[n]);s=!0}},o(a){for(let n=0;n<e.length;n+=1)N(e[n]);s=!1},d(a){for(let n=0;n<e.length;n+=1)e[n].d(a);a&&m(l)}}}function ft(r){let e=[],t=new Map,l,s,i=r[0].pokemon;const o=a=>a[3].id;for(let a=0;a<i.length;a+=1){let n=ke(r,i,a),u=o(n);t.set(u,e[a]=ye(u,n))}return{c(){for(let a=0;a<e.length;a+=1)e[a].c();l=X()},l(a){for(let n=0;n<e.length;n+=1)e[n].l(a);l=X()},m(a,n){for(let u=0;u<e.length;u+=1)e[u].m(a,n);S(a,l,n),s=!0},p(a,n){if(n&1){i=a[0].pokemon,G();for(let u=0;u<e.length;u+=1)e[u].r();e=Te(e,n,o,1,a,i,t,l.parentNode,ze,ye,l,ke);for(let u=0;u<e.length;u+=1)e[u].a();O()}},i(a){if(!s){for(let n=0;n<i.length;n+=1)w(e[n]);s=!0}},o(a){for(let n=0;n<e.length;n+=1)N(e[n]);s=!1},d(a){for(let n=0;n<e.length;n+=1)e[n].d(a);a&&m(l)}}}function be(r,e){let t,l,s,i;return l=new Me({props:{pokemon:e[3]}}),{key:r,first:null,c(){t=E("div"),R(l.$$.fragment),s=F(),this.h()},l(o){t=D(o,"DIV",{class:!0});var a=V(t);j(l.$$.fragment,a),s=M(a),a.forEach(m),this.h()},h(){g(t,"class","pokemon-animation-wrapper svelte-19dyuwh"),this.first=t},m(o,a){S(o,t,a),q(l,t,null),b(t,s),i=!0},p(o,a){e=o;const n={};a&1&&(n.pokemon=e[3]),l.$set(n)},i(o){i||(w(l.$$.fragment,o),i=!0)},o(o){N(l.$$.fragment,o),i=!1},d(o){o&&m(t),K(l)}}}function ye(r,e){let t,l,s,i,o=H,a;return l=new Me({props:{pokemon:e[3]}}),{key:r,first:null,c(){t=E("div"),R(l.$$.fragment),s=F(),this.h()},l(n){t=D(n,"DIV",{class:!0});var u=V(t);j(l.$$.fragment,u),s=M(u),u.forEach(m),this.h()},h(){g(t,"class","pokemon-animation-wrapper svelte-19dyuwh"),this.first=t},m(n,u){S(n,t,u),q(l,t,null),b(t,s),a=!0},p(n,u){e=n;const f={};u&1&&(f.pokemon=e[3]),l.$set(f)},r(){i=t.getBoundingClientRect()},f(){Ke(t),o()},a(){o(),o=We(t,i,Je,{duration:1e3,easing:Pe})},i(n){a||(w(l.$$.fragment,n),a=!0)},o(n){N(l.$$.fragment,n),a=!1},d(n){n&&m(t),K(l)}}}function _t(r){let e,t,l=r[0].name+"",s,i,o,a,n=r[1](r[0])+"",u,f,p,v,$,P;const L=[ft,ut],T=[];function I(d,y){return d[0].rank===1?0:1}return v=I(r),$=T[v]=L[v](r),{c(){e=E("div"),t=E("h2"),s=U(l),o=F(),a=E("p"),u=U(n),f=F(),p=E("div"),$.c(),this.h()},l(d){e=D(d,"DIV",{class:!0});var y=V(e);t=D(y,"H2",{id:!0,class:!0});var c=V(t);s=A(c,l),c.forEach(m),o=M(y),a=D(y,"P",{class:!0});var _=V(a);u=A(_,n),_.forEach(m),f=M(y),p=D(y,"DIV",{class:!0});var h=V(p);$.l(h),h.forEach(m),y.forEach(m),this.h()},h(){g(t,"id",i=r[0].name),g(t,"class","svelte-19dyuwh"),g(a,"class","tier-subtitle secondary svelte-19dyuwh"),g(p,"class","svelte-19dyuwh"),g(e,"class","tier svelte-19dyuwh")},m(d,y){S(d,e,y),b(e,t),b(t,s),b(e,o),b(e,a),b(a,u),b(e,f),b(e,p),T[v].m(p,null),P=!0},p(d,[y]){(!P||y&1)&&l!==(l=d[0].name+"")&&W(s,l),(!P||y&1&&i!==(i=d[0].name))&&g(t,"id",i),(!P||y&1)&&n!==(n=d[1](d[0])+"")&&W(u,n);let c=v;v=I(d),v===c?T[v].p(d,y):(G(),N(T[c],1,1,()=>{T[c]=null}),O(),$=T[v],$?$.p(d,y):($=T[v]=L[v](d),$.c()),w($,1),$.m(p,null))},i(d){P||(w($),P=!0)},o(d){N($),P=!1},d(d){d&&m(e),T[v].d()}}}function dt(r,e,t){let{tier:l}=e;const s=Math.floor(Math.random()*l.subtitles.length),i=o=>o.subtitles[s]||"";return qe(()=>{}),r.$$set=o=>{"tier"in o&&t(0,l=o.tier)},[l,i]}class ht extends Y{constructor(e){super();Z(this,e,dt,_t,z,{tier:0})}}function $e(r){let e,t,l=r[0].toUpperCase()+"",s,i,o,a,n,u;return{c(){e=E("div"),t=E("button"),s=U(l),this.h()},l(f){e=D(f,"DIV",{class:!0});var p=V(e);t=D(p,"BUTTON",{class:!0});var v=V(t);s=A(v,l),v.forEach(m),p.forEach(m),this.h()},h(){g(t,"class","svelte-wvk003"),g(e,"class","svelte-wvk003")},m(f,p){S(f,e,p),b(e,t),b(t,s),a=!0,n||(u=x(t,"click",Ze),n=!0)},p(f,p){r=f,(!a||p&1)&&l!==(l=r[0].toUpperCase()+"")&&W(s,l)},i(f){a||(oe(()=>{o&&o.end(1),i=Qe(e,Q,{duration:we,y:Ee,easing:r[1]}),i.start()}),a=!0)},o(f){i&&i.invalidate(),o=Xe(e,Q,{duration:we,y:-Ee,easing:r[1]}),a=!1},d(f){f&&m(e),f&&o&&o.end(),n=!1,u()}}}function mt(r){let e,t=r[0],l,s=$e(r);return{c(){e=E("div"),s.c(),this.h()},l(i){e=D(i,"DIV",{class:!0});var o=V(e);s.l(o),o.forEach(m),this.h()},h(){g(e,"class","language-button-wrapper svelte-wvk003")},m(i,o){S(i,e,o),s.m(e,null),l=!0},p(i,[o]){o&1&&z(t,t=i[0])?(G(),N(s,1,1,H),O(),s=$e(i),s.c(),w(s),s.m(e,null)):s.p(i,o)},i(i){l||(w(s),l=!0)},o(i){N(s),l=!1},d(i){i&&m(e),s.d(i)}}}const we=1e3,Ee=25;function pt(r,e,t){let l;return le(r,C,i=>t(0,l=i)),[l,Pe]}class gt extends Y{constructor(e){super();Z(this,e,pt,mt,z,{})}}function De(r,e,t){const l=r.slice();return l[7]=e[t],l}function Ie(r){let e,t;return e=new ht({props:{tier:r[7]}}),{c(){R(e.$$.fragment)},l(l){j(e.$$.fragment,l)},m(l,s){q(e,l,s),t=!0},p(l,s){const i={};s&2&&(i.tier=l[7]),e.$set(i)},i(l){t||(w(e.$$.fragment,l),t=!0)},o(l){N(e.$$.fragment,l),t=!1},d(l){K(e,l)}}}function vt(r){let e,t,l,s,i,o,a,n,u,f,p,v,$,P,L,T;o=new nt({}),n=new gt({});let I=r[1],d=[];for(let c=0;c<I.length;c+=1)d[c]=Ie(De(r,I,c));const y=c=>N(d[c],1,1,()=>{d[c]=null});return{c(){e=E("div"),t=E("input"),l=F(),s=E("div"),i=F(),R(o.$$.fragment),a=F(),R(n.$$.fragment),u=F(),f=E("h1"),p=U("Tierlist f\xFCr TFL Season 3"),v=F();for(let c=0;c<d.length;c+=1)d[c].c();$=X(),this.h()},l(c){e=D(c,"DIV",{class:!0});var _=V(e);t=D(_,"INPUT",{type:!0,placeholder:!0,class:!0}),l=M(_),s=D(_,"DIV",{class:!0}),V(s).forEach(m),i=M(_),j(o.$$.fragment,_),a=M(_),j(n.$$.fragment,_),_.forEach(m),u=M(c),f=D(c,"H1",{class:!0});var h=V(f);p=A(h,"Tierlist f\xFCr TFL Season 3"),h.forEach(m),v=M(c);for(let k=0;k<d.length;k+=1)d[k].l(c);$=X(),this.h()},h(){g(t,"type","text"),g(t,"placeholder","Nach Pok\xE9mon oder Typen filtern"),g(t,"class","svelte-4gugbt"),g(s,"class","spacer svelte-4gugbt"),g(e,"class","top-bar"),g(f,"class","svelte-4gugbt")},m(c,_){S(c,e,_),b(e,t),de(t,r[0]),b(e,l),b(e,s),b(e,i),q(o,e,null),b(e,a),q(n,e,null),S(c,u,_),S(c,f,_),b(f,p),S(c,v,_);for(let h=0;h<d.length;h+=1)d[h].m(c,_);S(c,$,_),P=!0,L||(T=x(t,"input",r[5]),L=!0)},p(c,[_]){if(_&1&&t.value!==c[0]&&de(t,c[0]),_&2){I=c[1];let h;for(h=0;h<I.length;h+=1){const k=De(c,I,h);d[h]?(d[h].p(k,_),w(d[h],1)):(d[h]=Ie(k),d[h].c(),w(d[h],1),d[h].m($.parentNode,$))}for(G(),h=I.length;h<d.length;h+=1)y(h);O()}},i(c){if(!P){w(o.$$.fragment,c),w(n.$$.fragment,c);for(let _=0;_<I.length;_+=1)w(d[_]);P=!0}},o(c){N(o.$$.fragment,c),N(n.$$.fragment,c),d=d.filter(Boolean);for(let _=0;_<d.length;_+=1)N(d[_]);P=!1},d(c){c&&m(e),K(o),K(n),c&&m(u),c&&m(f),c&&m(v),Ye(d,c),c&&m($),L=!1,T()}}}function kt(r,e,t){let l,s,i;le(r,C,f=>t(4,i=f));let{tierlist:o}=e,a="";const n=(f,p)=>{var v,$,P,L,T,I,d,y;return[(v=f.form)==null?void 0:v.de,($=f.form)==null?void 0:$.en,f.name.de,f.name.en,(P=B[f.typing[0]])==null?void 0:P.de,(L=B[f.typing[0]])==null?void 0:L.en,(I=B[(T=f.typing)==null?void 0:T[1]])==null?void 0:I.de,(y=B[(d=f.typing)==null?void 0:d[1]])==null?void 0:y.en].some(c=>c==null?void 0:c.toLowerCase().includes(p.toLowerCase()))};function u(){a=this.value,t(0,a)}return r.$$set=f=>{"tierlist"in f&&t(2,o=f.tierlist)},r.$$.update=()=>{r.$$.dirty&20&&t(3,l=o.map(f=>re(ne({},f),{pokemon:f.pokemon.sort((p,v)=>p.name[i].localeCompare(v.name[i]))}))),r.$$.dirty&9&&t(1,s=l.map(f=>re(ne({},f),{pokemon:f.pokemon.filter(p=>n(p,a))})))},[a,s,o,l,i,u]}class $t extends Y{constructor(e){super();Z(this,e,kt,vt,z,{tierlist:2})}}export{$t as default};