var Ze=Object.defineProperty,xe=Object.defineProperties;var et=Object.getOwnPropertyDescriptors;var be=Object.getOwnPropertySymbols;var tt=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable;var ye=(n,e,t)=>e in n?Ze(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ce=(n,e)=>{for(var t in e||(e={}))tt.call(e,t)&&ye(n,t,e[t]);if(be)for(var t of be(e))lt.call(e,t)&&ye(n,t,e[t]);return n},fe=(n,e)=>xe(n,et(e));import{L as nt,D as me,S as se,i as re,s as ee,e as $,c as w,a as D,d as m,b as h,g as I,M as W,n as B,o as T,p as C,q as b,N as le,O as he,P as Ke,Q as st,w as J,x as Q,y as X,K as x,B as Y,R as rt,T as ue,t as U,h as j,U as ae,J as k,j as G,k as P,m as L,V as oe,W as pe,X as ie,Y as ne,Z as at,_ as Z,$ as $e,v as ot,l as R,a0 as de,a1 as He,a2 as it,a3 as ct,a4 as ft,a5 as ut,a6 as Je,a7 as _t,a8 as mt,a9 as ht,aa as we}from"../chunks/vendor-58404c5c.js";let Qe="en";Qe=localStorage.getItem("language");const H=me(Qe||"en");H.subscribe(n=>localStorage.setItem("language",n));const pt=()=>{H.update(n=>n==="de"?"en":"de")};let Xe;Xe=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");const _e=me(Xe),Ee=nt(_e,n=>n==="dark",n=>n?"dark":"light");_e.subscribe(n=>{document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",n=>{_e.set(n.matches?"dark":"light")});const te=me("");te.subscribe(n=>{const e=new URL(window.location.href);(n==null?void 0:n.length)>0?e.searchParams.set("q",n):e.searchParams.delete("q"),window.history.replaceState(null,"",e.toString())});function dt(n){let e,t;return e=new Ke({props:{icon:st}}),{c(){J(e.$$.fragment)},l(l){Q(e.$$.fragment,l)},m(l,s){X(e,l,s),t=!0},p:x,i(l){t||(b(e.$$.fragment,l),t=!0)},o(l){T(e.$$.fragment,l),t=!1},d(l){Y(e,l)}}}function gt(n){let e,t;return e=new Ke({props:{icon:rt}}),{c(){J(e.$$.fragment)},l(l){Q(e.$$.fragment,l)},m(l,s){X(e,l,s),t=!0},p:x,i(l){t||(b(e.$$.fragment,l),t=!0)},o(l){T(e.$$.fragment,l),t=!1},d(l){Y(e,l)}}}function vt(n){let e,t,l,s,o,a;const c=[gt,dt],u=[];function i(r,f){return r[0]?0:1}return t=i(n),l=u[t]=c[t](n),{c(){e=$("button"),l.c(),this.h()},l(r){e=w(r,"BUTTON",{class:!0});var f=D(e);l.l(f),f.forEach(m),this.h()},h(){h(e,"class","svelte-1cwi06j")},m(r,f){I(r,e,f),u[t].m(e,null),s=!0,o||(a=W(e,"click",n[1]),o=!0)},p(r,[f]){let _=t;t=i(r),t===_?u[t].p(r,f):(B(),T(u[_],1,1,()=>{u[_]=null}),C(),l=u[t],l?l.p(r,f):(l=u[t]=c[t](r),l.c()),b(l,1),l.m(e,null))},i(r){s||(b(l),s=!0)},o(r){T(l),s=!1},d(r){r&&m(e),u[t].d(),o=!1,a()}}}function kt(n,e,t){let l;return le(n,Ee,o=>t(0,l=o)),[l,()=>he(Ee,l=!l,l)]}class bt extends se{constructor(e){super();re(this,e,kt,vt,ee,{})}}class yt{constructor(e){Object.assign(this,e)}get localName(){return this.name[ue(H)]}get localForm(){var e;return(e=this.form)==null?void 0:e[ue(H)]}get localNotes(){var e;return(e=this.notes)==null?void 0:e[ue(H)]}}function De(n){let e,t=K[n[1]][n[2]]+"",l,s;return{c(){e=$("span"),l=U(t),this.h()},l(o){e=w(o,"SPAN",{class:!0});var a=D(e);l=j(a,t),a.forEach(m),this.h()},h(){h(e,"class",s=ae(n[1])+" svelte-1k8dmpb")},m(o,a){I(o,e,a),k(e,l)},p(o,a){a&6&&t!==(t=K[o[1]][o[2]]+"")&&G(l,t),a&2&&s!==(s=ae(o[1])+" svelte-1k8dmpb")&&h(e,"class",s)},d(o){o&&m(e)}}}function $t(n){let e,t,l=K[n[0]][n[2]]+"",s,o,a,c=n[1]&&De(n);return{c(){e=$("div"),t=$("span"),s=U(l),a=P(),c&&c.c(),this.h()},l(u){e=w(u,"DIV",{class:!0});var i=D(e);t=w(i,"SPAN",{class:!0});var r=D(t);s=j(r,l),r.forEach(m),a=L(i),c&&c.l(i),i.forEach(m),this.h()},h(){h(t,"class",o=ae(n[0])+" svelte-1k8dmpb"),h(e,"class","svelte-1k8dmpb")},m(u,i){I(u,e,i),k(e,t),k(t,s),k(e,a),c&&c.m(e,null)},p(u,[i]){i&5&&l!==(l=K[u[0]][u[2]]+"")&&G(s,l),i&1&&o!==(o=ae(u[0])+" svelte-1k8dmpb")&&h(t,"class",o),u[1]?c?c.p(u,i):(c=De(u),c.c(),c.m(e,null)):c&&(c.d(1),c=null)},i:x,o:x,d(u){u&&m(e),c&&c.d()}}}const K={normal:{de:"Normal",en:"Normal"},fire:{de:"Feuer",en:"Fire"},water:{de:"Wasser",en:"Water"},electric:{de:"Elektro",en:"Electric"},grass:{de:"Pflanze",en:"Grass"},ice:{de:"Eis",en:"Ice"},fighting:{de:"Kampf",en:"Fighting"},poison:{de:"Gift",en:"Poison"},ground:{de:"Boden",en:"Ground"},flying:{de:"Flug",en:"Flying"},psychic:{de:"Psycho",en:"Psychic"},bug:{de:"K\xE4fer",en:"Bug"},rock:{de:"Gestein",en:"Rock"},ghost:{de:"Geist",en:"Ghost"},dragon:{de:"Drache",en:"Dragon"},dark:{de:"Unlicht",en:"Dark"},steel:{de:"Stahl",en:"Steel"},fairy:{de:"Fee",en:"Fairy"}};function wt(n,e,t){let l;le(n,H,a=>t(2,l=a));let{type1:s}=e,{type2:o=null}=e;return n.$$set=a=>{"type1"in a&&t(0,s=a.type1),"type2"in a&&t(1,o=a.type2)},[s,o,l]}class Et extends se{constructor(e){super();re(this,e,wt,$t,ee,{type1:0,type2:1})}}function Ie(n){let e,t,l,s,o,a,c,u,i=n[2]&&Ne(n);return{c(){e=$("div"),t=$("img"),o=P(),i&&i.c(),this.h()},l(r){e=w(r,"DIV",{class:!0});var f=D(e);t=w(f,"IMG",{src:!0,alt:!0,class:!0}),o=L(f),i&&i.l(f),f.forEach(m),this.h()},h(){oe(t.src,l=n[8](n[0].team.logo))||h(t,"src",l),h(t,"alt",s="Logo von "+n[0].team.player),h(t,"class","svelte-1ybg2sa"),h(e,"class","pokemon-team")},m(r,f){I(r,e,f),k(e,t),k(e,o),i&&i.m(e,null),a=!0,c||(u=[W(e,"mouseover",n[5]),W(e,"focus",n[5]),W(e,"mouseout",n[6]),W(e,"blur",n[6]),W(e,"click",pe(n[7]))],c=!0)},p(r,f){(!a||f&1&&!oe(t.src,l=r[8](r[0].team.logo)))&&h(t,"src",l),(!a||f&1&&s!==(s="Logo von "+r[0].team.player))&&h(t,"alt",s),r[2]?i?(i.p(r,f),f&4&&b(i,1)):(i=Ne(r),i.c(),b(i,1),i.m(e,null)):i&&(B(),T(i,1,1,()=>{i=null}),C())},i(r){a||(b(i),a=!0)},o(r){T(i),a=!1},d(r){r&&m(e),i&&i.d(),c=!1,at(u)}}}function Ne(n){let e,t=n[0].team.name+"",l,s,o,a=n[0].team.player+"",c,u,i;return{c(){e=$("span"),l=U(t),s=P(),o=$("span"),c=U(a),this.h()},l(r){e=w(r,"SPAN",{class:!0});var f=D(e);l=j(f,t),s=L(f),o=w(f,"SPAN",{class:!0});var _=D(o);c=j(_,a),_.forEach(m),f.forEach(m),this.h()},h(){h(o,"class","player svelte-1ybg2sa"),h(e,"class","tooltip svelte-1ybg2sa")},m(r,f){I(r,e,f),k(e,l),k(e,s),k(e,o),k(o,c),i=!0},p(r,f){(!i||f&1)&&t!==(t=r[0].team.name+"")&&G(l,t),(!i||f&1)&&a!==(a=r[0].team.player+"")&&G(c,a)},i(r){i||(ie(()=>{u||(u=ne(e,Z,{y:15,duration:100},!0)),u.run(1)}),i=!0)},o(r){u||(u=ne(e,Z,{y:15,duration:100},!1)),u.run(0),i=!1},d(r){r&&m(e),r&&u&&u.end()}}}function Te(n){let e,t,l,s,o;return{c(){e=$("div"),this.h()},l(a){e=w(a,"DIV",{class:!0}),D(e).forEach(m),this.h()},h(){h(e,"class","pokemon-note svelte-1ybg2sa")},m(a,c){I(a,e,c),l=!0,s||(o=W(e,"click",pe(n[4])),s=!0)},p:x,i(a){l||(ie(()=>{t||(t=ne(e,Z,{y:-10,duration:300},!0)),t.run(1)}),l=!0)},o(a){t||(t=ne(e,Z,{y:-10,duration:300},!1)),t.run(0),l=!1},d(a){a&&m(e),a&&t&&t.end(),s=!1,o()}}}function Fe(n){let e,t=(n[3].localNotes||"")+"",l,s,o,a,c;return{c(){e=$("div"),l=U(t),this.h()},l(u){e=w(u,"DIV",{class:!0});var i=D(e);l=j(i,t),i.forEach(m),this.h()},h(){h(e,"class","modal svelte-1ybg2sa")},m(u,i){I(u,e,i),k(e,l),o=!0,a||(c=W(e,"click",pe(n[4])),a=!0)},p(u,i){(!o||i&8)&&t!==(t=(u[3].localNotes||"")+"")&&G(l,t)},i(u){o||(ie(()=>{s||(s=ne(e,Z,{y:50,duration:300},!0)),s.run(1)}),o=!0)},o(u){s||(s=ne(e,Z,{y:50,duration:300},!1)),s.run(0),o=!1},d(u){u&&m(e),u&&s&&s.end(),a=!1,c()}}}function Dt(n){let e,t,l,s,o,a,c,u,i,r,f=n[3].localName+"",_,d,S,M=(n[3].localForm||"")+"",O,q,y,A,p,v,g=n[0].team&&Ie(n),E=n[0].notes&&!n[1]&&Te(n),V=n[1]&&Fe(n);return A=new Et({props:{type1:n[0].typing[0],type2:n[0].typing[1]}}),{c(){e=$("a"),t=$("img"),o=P(),a=$("div"),g&&g.c(),c=P(),E&&E.c(),u=P(),V&&V.c(),i=P(),r=$("div"),_=U(f),d=P(),S=$("div"),O=U(M),q=P(),y=$("div"),J(A.$$.fragment),this.h()},l(F){e=w(F,"A",{class:!0,href:!0,target:!0});var N=D(e);t=w(N,"IMG",{src:!0,alt:!0,crossorigin:!0,class:!0}),o=L(N),a=w(N,"DIV",{class:!0});var z=D(a);g&&g.l(z),c=L(z),E&&E.l(z),z.forEach(m),u=L(N),V&&V.l(N),i=L(N),r=w(N,"DIV",{class:!0});var ge=D(r);_=j(ge,f),ge.forEach(m),d=L(N),S=w(N,"DIV",{class:!0});var ve=D(S);O=j(ve,M),ve.forEach(m),q=L(N),y=w(N,"DIV",{class:!0});var ke=D(y);Q(A.$$.fragment,ke),ke.forEach(m),N.forEach(m),this.h()},h(){oe(t.src,l=n[0].imageUrl)||h(t,"src",l),h(t,"alt",s=n[3].localName),h(t,"crossorigin","anonymous"),h(t,"class","svelte-1ybg2sa"),h(a,"class","notes-container svelte-1ybg2sa"),h(r,"class","pokemon-name"),h(S,"class","pokemon-form secondary svelte-1ybg2sa"),h(y,"class","pokemon-typing svelte-1ybg2sa"),h(e,"class","pokemon svelte-1ybg2sa"),h(e,"href",p=n[0].pokemonDbUrl),h(e,"target","_blank")},m(F,N){I(F,e,N),k(e,t),k(e,o),k(e,a),g&&g.m(a,null),k(a,c),E&&E.m(a,null),k(e,u),V&&V.m(e,null),k(e,i),k(e,r),k(r,_),k(e,d),k(e,S),k(S,O),k(e,q),k(e,y),X(A,y,null),v=!0},p(F,[N]){(!v||N&1&&!oe(t.src,l=F[0].imageUrl))&&h(t,"src",l),(!v||N&8&&s!==(s=F[3].localName))&&h(t,"alt",s),F[0].team?g?(g.p(F,N),N&1&&b(g,1)):(g=Ie(F),g.c(),b(g,1),g.m(a,c)):g&&(B(),T(g,1,1,()=>{g=null}),C()),F[0].notes&&!F[1]?E?(E.p(F,N),N&3&&b(E,1)):(E=Te(F),E.c(),b(E,1),E.m(a,null)):E&&(B(),T(E,1,1,()=>{E=null}),C()),F[1]?V?(V.p(F,N),N&2&&b(V,1)):(V=Fe(F),V.c(),b(V,1),V.m(e,i)):V&&(B(),T(V,1,1,()=>{V=null}),C()),(!v||N&8)&&f!==(f=F[3].localName+"")&&G(_,f),(!v||N&8)&&M!==(M=(F[3].localForm||"")+"")&&G(O,M);const z={};N&1&&(z.type1=F[0].typing[0]),N&1&&(z.type2=F[0].typing[1]),A.$set(z),(!v||N&1&&p!==(p=F[0].pokemonDbUrl))&&h(e,"href",p)},i(F){v||(b(g),b(E),b(V),b(A.$$.fragment,F),v=!0)},o(F){T(g),T(E),T(V),T(A.$$.fragment,F),v=!1},d(F){F&&m(e),g&&g.d(),E&&E.d(),V&&V.d(),Y(A)}}}function It(n,e,t){let l,s;le(n,te,d=>t(9,s=d));let{pokemon:o}=e,a=!1,c=!1;const u=()=>{t(1,a=!a)},i=()=>{t(2,c=!0)},r=()=>{t(2,c=!1)},f=()=>{he(te,s=l.team.name,s)},_=d=>"/logos/"+d;return n.$$set=d=>{"pokemon"in d&&t(0,o=d.pokemon)},n.$$.update=()=>{n.$$.dirty&1&&t(3,l=new yt(o))},[o,a,c,l,u,i,r,f,_]}class Ye extends se{constructor(e){super();re(this,e,It,Dt,ee,{pokemon:0})}}function Se(n,e,t){const l=n.slice();return l[8]=e[t],l}function Ve(n,e,t){const l=n.slice();return l[11]=e[t],l}function Pe(n,e,t){const l=n.slice();return l[8]=e[t],l}function Le(n,e,t){const l=n.slice();return l[11]=e[t],l}function Me(n){let e,t=n[4](n[0])+"",l,s,o,a,c,u;const i=[Tt,Nt],r=[];function f(_,d){return _[0].rank===1?0:1}return a=f(n),c=r[a]=i[a](n),{c(){e=$("p"),l=U(t),s=P(),o=$("div"),c.c(),this.h()},l(_){e=w(_,"P",{class:!0});var d=D(e);l=j(d,t),d.forEach(m),s=L(_),o=w(_,"DIV",{class:!0});var S=D(o);c.l(S),S.forEach(m),this.h()},h(){h(e,"class","tier-subtitle secondary svelte-1ojnhyq"),h(o,"class","svelte-1ojnhyq")},m(_,d){I(_,e,d),k(e,l),I(_,s,d),I(_,o,d),r[a].m(o,null),u=!0},p(_,d){(!u||d&1)&&t!==(t=_[4](_[0])+"")&&G(l,t);let S=a;a=f(_),a===S?r[a].p(_,d):(B(),T(r[S],1,1,()=>{r[S]=null}),C(),c=r[a],c?c.p(_,d):(c=r[a]=i[a](_),c.c()),b(c,1),c.m(o,null))},i(_){u||(b(c),u=!0)},o(_){T(c),u=!1},d(_){_&&m(e),_&&m(s),_&&m(o),r[a].d()}}}function Nt(n){let e=[],t=new Map,l,s,o,a=n[0].pokemon;const c=i=>i[11].id;for(let i=0;i<a.length;i+=1){let r=Ve(n,a,i),f=c(r);t.set(f,e[i]=qe(f,r))}let u=n[2]>0&&Ae(n);return{c(){for(let i=0;i<e.length;i+=1)e[i].c();l=P(),u&&u.c(),s=R()},l(i){for(let r=0;r<e.length;r+=1)e[r].l(i);l=L(i),u&&u.l(i),s=R()},m(i,r){for(let f=0;f<e.length;f+=1)e[f].m(i,r);I(i,l,r),u&&u.m(i,r),I(i,s,r),o=!0},p(i,r){r&1&&(a=i[0].pokemon,B(),e=He(e,r,c,1,i,a,t,l.parentNode,ft,qe,l,Ve),C()),i[2]>0?u?u.p(i,r):(u=Ae(i),u.c(),u.m(s.parentNode,s)):u&&(u.d(1),u=null)},i(i){if(!o){for(let r=0;r<a.length;r+=1)b(e[r]);o=!0}},o(i){for(let r=0;r<e.length;r+=1)T(e[r]);o=!1},d(i){for(let r=0;r<e.length;r+=1)e[r].d(i);i&&m(l),u&&u.d(i),i&&m(s)}}}function Tt(n){let e=[],t=new Map,l,s,o,a=n[0].pokemon;const c=i=>i[11].id;for(let i=0;i<a.length;i+=1){let r=Le(n,a,i),f=c(r);t.set(f,e[i]=je(f,r))}let u=n[2]>0&&Be(n);return{c(){for(let i=0;i<e.length;i+=1)e[i].c();l=P(),u&&u.c(),s=R()},l(i){for(let r=0;r<e.length;r+=1)e[r].l(i);l=L(i),u&&u.l(i),s=R()},m(i,r){for(let f=0;f<e.length;f+=1)e[f].m(i,r);I(i,l,r),u&&u.m(i,r),I(i,s,r),o=!0},p(i,r){if(r&1){a=i[0].pokemon,B();for(let f=0;f<e.length;f+=1)e[f].r();e=He(e,r,c,1,i,a,t,l.parentNode,ut,je,l,Le);for(let f=0;f<e.length;f+=1)e[f].a();C()}i[2]>0?u?u.p(i,r):(u=Be(i),u.c(),u.m(s.parentNode,s)):u&&(u.d(1),u=null)},i(i){if(!o){for(let r=0;r<a.length;r+=1)b(e[r]);o=!0}},o(i){for(let r=0;r<e.length;r+=1)T(e[r]);o=!1},d(i){for(let r=0;r<e.length;r+=1)e[r].d(i);i&&m(l),u&&u.d(i),i&&m(s)}}}function qe(n,e){let t,l,s;return l=new Ye({props:{pokemon:e[11]}}),{key:n,first:null,c(){t=$("div"),J(l.$$.fragment),this.h()},l(o){t=w(o,"DIV",{class:!0});var a=D(t);Q(l.$$.fragment,a),a.forEach(m),this.h()},h(){h(t,"class","pokemon-animation-wrapper svelte-1ojnhyq"),this.first=t},m(o,a){I(o,t,a),X(l,t,null),s=!0},p(o,a){e=o;const c={};a&1&&(c.pokemon=e[11]),l.$set(c)},i(o){s||(b(l.$$.fragment,o),s=!0)},o(o){T(l.$$.fragment,o),s=!1},d(o){o&&m(t),Y(l)}}}function Ae(n){let e,t=Array(n[2]),l=[];for(let s=0;s<t.length;s+=1)l[s]=Ue(Se(n,t,s));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();e=R()},l(s){for(let o=0;o<l.length;o+=1)l[o].l(s);e=R()},m(s,o){for(let a=0;a<l.length;a+=1)l[a].m(s,o);I(s,e,o)},p(s,o){if(o&4){const a=t.length;t=Array(s[2]);let c;for(c=a;c<t.length;c+=1)Se(s,t,c),l[c]||(l[c]=Ue(),l[c].c(),l[c].m(e.parentNode,e));for(c=t.length;c<a;c+=1)l[c].d(1);l.length=t.length}},d(s){de(l,s),s&&m(e)}}}function Ue(n){let e;return{c(){e=$("div"),this.h()},l(t){e=w(t,"DIV",{class:!0}),D(e).forEach(m),this.h()},h(){h(e,"class","pokemon-animation-wrapper svelte-1ojnhyq")},m(t,l){I(t,e,l)},d(t){t&&m(e)}}}function je(n,e){let t,l,s,o=x,a;return l=new Ye({props:{pokemon:e[11]}}),{key:n,first:null,c(){t=$("div"),J(l.$$.fragment),this.h()},l(c){t=w(c,"DIV",{class:!0});var u=D(t);Q(l.$$.fragment,u),u.forEach(m),this.h()},h(){h(t,"class","pokemon-animation-wrapper svelte-1ojnhyq"),this.first=t},m(c,u){I(c,t,u),X(l,t,null),a=!0},p(c,u){e=c;const i={};u&1&&(i.pokemon=e[11]),l.$set(i)},r(){s=t.getBoundingClientRect()},f(){it(t),o()},a(){o(),o=ct(t,s,_t,{duration:1e3,easing:Je})},i(c){a||(b(l.$$.fragment,c),a=!0)},o(c){T(l.$$.fragment,c),a=!1},d(c){c&&m(t),Y(l)}}}function Be(n){let e,t=Array(n[2]),l=[];for(let s=0;s<t.length;s+=1)l[s]=Ce(Pe(n,t,s));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();e=R()},l(s){for(let o=0;o<l.length;o+=1)l[o].l(s);e=R()},m(s,o){for(let a=0;a<l.length;a+=1)l[a].m(s,o);I(s,e,o)},p(s,o){if(o&4){const a=t.length;t=Array(s[2]);let c;for(c=a;c<t.length;c+=1)Pe(s,t,c),l[c]||(l[c]=Ce(),l[c].c(),l[c].m(e.parentNode,e));for(c=t.length;c<a;c+=1)l[c].d(1);l.length=t.length}},d(s){de(l,s),s&&m(e)}}}function Ce(n){let e;return{c(){e=$("div"),this.h()},l(t){e=w(t,"DIV",{class:!0}),D(e).forEach(m),this.h()},h(){h(e,"class","pokemon-animation-wrapper svelte-1ojnhyq")},m(t,l){I(t,e,l)},d(t){t&&m(e)}}}function Ft(n){let e,t,l=n[0].name+"",s,o,a,c,u,i,r,f=n[0].pokemon.length>0&&Me(n);return{c(){e=$("div"),t=$("h2"),s=U(l),o=P(),a=$("span"),c=U(n[3]),i=P(),f&&f.c(),this.h()},l(_){e=w(_,"DIV",{class:!0});var d=D(e);t=w(d,"H2",{id:!0,class:!0});var S=D(t);s=j(S,l),o=L(S),a=w(S,"SPAN",{class:!0});var M=D(a);c=j(M,n[3]),M.forEach(m),S.forEach(m),i=L(d),f&&f.l(d),d.forEach(m),this.h()},h(){h(a,"class","emptyText svelte-1ojnhyq"),h(t,"id",u=n[0].name),h(t,"class","svelte-1ojnhyq"),$e(t,"empty",n[1]),h(e,"class","tier svelte-1ojnhyq")},m(_,d){I(_,e,d),k(e,t),k(t,s),k(t,o),k(t,a),k(a,c),k(e,i),f&&f.m(e,null),r=!0},p(_,[d]){(!r||d&1)&&l!==(l=_[0].name+"")&&G(s,l),(!r||d&8)&&G(c,_[3]),(!r||d&1&&u!==(u=_[0].name))&&h(t,"id",u),d&2&&$e(t,"empty",_[1]),_[0].pokemon.length>0?f?(f.p(_,d),d&1&&b(f,1)):(f=Me(_),f.c(),b(f,1),f.m(e,null)):f&&(B(),T(f,1,1,()=>{f=null}),C())},i(_){r||(b(f),r=!0)},o(_){T(f),r=!1},d(_){_&&m(e),f&&f.d()}}}const St=150;function Vt(n,e,t){let l,s,o,a,{tier:c}=e;const u=Math.floor(Math.random()*c.subtitles.length),i=f=>f.subtitles[u]||"";let r;return ot(()=>{t(5,r=window.innerWidth),window.addEventListener("resize",()=>{t(5,r=window.innerWidth)})}),n.$$set=f=>{"tier"in f&&t(0,c=f.tier)},n.$$.update=()=>{n.$$.dirty&1&&t(1,l=c.pokemon.length===0),n.$$.dirty&3&&t(3,s=l?c.emptyText:""),n.$$.dirty&32&&t(6,o=Math.floor(r/St)),n.$$.dirty&65&&t(2,a=Math.max(o-c.pokemon.length,0))},[c,l,a,s,i,r,o]}class Pt extends se{constructor(e){super();re(this,e,Vt,Ft,ee,{tier:0})}}function Ge(n){let e,t,l=n[0].toUpperCase()+"",s,o,a,c,u,i;return{c(){e=$("div"),t=$("button"),s=U(l),this.h()},l(r){e=w(r,"DIV",{class:!0});var f=D(e);t=w(f,"BUTTON",{class:!0});var _=D(t);s=j(_,l),_.forEach(m),f.forEach(m),this.h()},h(){h(t,"class","svelte-wvk003"),h(e,"class","svelte-wvk003")},m(r,f){I(r,e,f),k(e,t),k(t,s),c=!0,u||(i=W(t,"click",pt),u=!0)},p(r,f){n=r,(!c||f&1)&&l!==(l=n[0].toUpperCase()+"")&&G(s,l)},i(r){c||(ie(()=>{a&&a.end(1),o=mt(e,Z,{duration:Oe,y:We,easing:n[1]}),o.start()}),c=!0)},o(r){o&&o.invalidate(),a=ht(e,Z,{duration:Oe,y:-We,easing:n[1]}),c=!1},d(r){r&&m(e),r&&a&&a.end(),u=!1,i()}}}function Lt(n){let e,t=n[0],l,s=Ge(n);return{c(){e=$("div"),s.c(),this.h()},l(o){e=w(o,"DIV",{class:!0});var a=D(e);s.l(a),a.forEach(m),this.h()},h(){h(e,"class","language-button-wrapper svelte-wvk003")},m(o,a){I(o,e,a),s.m(e,null),l=!0},p(o,[a]){a&1&&ee(t,t=o[0])?(B(),T(s,1,1,x),C(),s=Ge(o),s.c(),b(s),s.m(e,null)):s.p(o,a)},i(o){l||(b(s),l=!0)},o(o){T(s),l=!1},d(o){o&&m(e),s.d(o)}}}const Oe=1e3,We=25;function Mt(n,e,t){let l;return le(n,H,o=>t(0,l=o)),[l,Je]}class qt extends se{constructor(e){super();re(this,e,Mt,Lt,ee,{})}}function Re(n,e,t){const l=n.slice();return l[8]=e[t],l}function ze(n){let e,t;return e=new Pt({props:{tier:n[8]}}),{c(){J(e.$$.fragment)},l(l){Q(e.$$.fragment,l)},m(l,s){X(e,l,s),t=!0},p(l,s){const o={};s&2&&(o.tier=l[8]),e.$set(o)},i(l){t||(b(e.$$.fragment,l),t=!0)},o(l){T(e.$$.fragment,l),t=!1},d(l){Y(e,l)}}}function At(n){let e,t,l,s,o,a,c,u,i,r,f,_,d,S,M,O;a=new bt({}),u=new qt({});let q=n[1],y=[];for(let p=0;p<q.length;p+=1)y[p]=ze(Re(n,q,p));const A=p=>T(y[p],1,1,()=>{y[p]=null});return{c(){e=$("div"),t=$("input"),l=P(),s=$("div"),o=P(),J(a.$$.fragment),c=P(),J(u.$$.fragment),i=P(),r=$("h1"),f=U("Tierlist f\xFCr TFL Season 3"),_=P();for(let p=0;p<y.length;p+=1)y[p].c();d=R(),this.h()},l(p){e=w(p,"DIV",{class:!0});var v=D(e);t=w(v,"INPUT",{type:!0,placeholder:!0,class:!0}),l=L(v),s=w(v,"DIV",{class:!0}),D(s).forEach(m),o=L(v),Q(a.$$.fragment,v),c=L(v),Q(u.$$.fragment,v),v.forEach(m),i=L(p),r=w(p,"H1",{class:!0});var g=D(r);f=j(g,"Tierlist f\xFCr TFL Season 3"),g.forEach(m),_=L(p);for(let E=0;E<y.length;E+=1)y[E].l(p);d=R(),this.h()},h(){h(t,"type","search"),h(t,"placeholder","Nach Pok\xE9mon, Typen oder Teams filtern"),h(t,"class","svelte-16slp6x"),h(s,"class","spacer svelte-16slp6x"),h(e,"class","top-bar"),h(r,"class","svelte-16slp6x")},m(p,v){I(p,e,v),k(e,t),we(t,n[0]),k(e,l),k(e,s),k(e,o),X(a,e,null),k(e,c),X(u,e,null),I(p,i,v),I(p,r,v),k(r,f),I(p,_,v);for(let g=0;g<y.length;g+=1)y[g].m(p,v);I(p,d,v),S=!0,M||(O=W(t,"input",n[6]),M=!0)},p(p,[v]){if(v&1&&we(t,p[0]),v&2){q=p[1];let g;for(g=0;g<q.length;g+=1){const E=Re(p,q,g);y[g]?(y[g].p(E,v),b(y[g],1)):(y[g]=ze(E),y[g].c(),b(y[g],1),y[g].m(d.parentNode,d))}for(B(),g=q.length;g<y.length;g+=1)A(g);C()}},i(p){if(!S){b(a.$$.fragment,p),b(u.$$.fragment,p);for(let v=0;v<q.length;v+=1)b(y[v]);S=!0}},o(p){T(a.$$.fragment,p),T(u.$$.fragment,p),y=y.filter(Boolean);for(let v=0;v<y.length;v+=1)T(y[v]);S=!1},d(p){p&&m(e),Y(a),Y(u),p&&m(i),p&&m(r),p&&m(_),de(y,p),p&&m(d),M=!1,O()}}}function Ut(n,e,t){let l,s,o,a;le(n,te,f=>t(0,o=f)),le(n,H,f=>t(5,a=f));let{tierlist:c}=e,{initialFilter:u}=e;console.log(u),u&&he(te,o=u,o);const i=(f,_)=>{var d,S,M,O,q,y,A,p,v,g;return[(d=f.form)==null?void 0:d.de,(S=f.form)==null?void 0:S.en,f.name.de,f.name.en,(M=K[f.typing[0]])==null?void 0:M.de,(O=K[f.typing[0]])==null?void 0:O.en,(y=K[(q=f.typing)==null?void 0:q[1]])==null?void 0:y.de,(p=K[(A=f.typing)==null?void 0:A[1]])==null?void 0:p.en,(v=f.team)==null?void 0:v.name,(g=f.team)==null?void 0:g.player].some(E=>E==null?void 0:E.toLowerCase().includes(_.toLowerCase()))};function r(){o=this.value,te.set(o)}return n.$$set=f=>{"tierlist"in f&&t(2,c=f.tierlist),"initialFilter"in f&&t(3,u=f.initialFilter)},n.$$.update=()=>{n.$$.dirty&36&&t(4,l=c.map(f=>fe(ce({},f),{pokemon:f.pokemon.sort((_,d)=>_.name[a].localeCompare(d.name[a]))}))),n.$$.dirty&17&&t(1,s=l.map(f=>fe(ce({},f),{pokemon:f.pokemon.filter(_=>i(_,o))})))},[o,s,c,u,l,a,r]}class Ct extends se{constructor(e){super();re(this,e,Ut,At,ee,{tierlist:2,initialFilter:3})}}export{Ct as default};
