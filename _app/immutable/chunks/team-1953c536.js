import{S as me,i as ve,s as ge,l as d,r as se,a as B,m as b,n as k,u as ae,h,c as D,p as i,aa as K,W as Q,b as U,I as m,v as re,f as J,g as pe,t as ee,d as de,a8 as he,L as be,w as ye,x as Ee,y as Le,B as ke,e as oe,a7 as ne}from"./index-cd411dc4.js";import{b as we}from"./paths-1c47712a.js";import{o as Ie,I as Ce}from"./sprites-f9e5c6f3.js";const Ue={width:24,height:24,body:'<path fill="currentColor" d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14Z"/>'};function ie(r,t,s){const e=r.slice();return e[6]=t[s],e}function ce(r,t,s){const e=r.slice();return e[9]=t[s],e[11]=s,e}function fe(r){let t,s,e,a;return s=new Ce({props:{inline:!0,icon:Ue}}),{c(){t=d("a"),ye(s.$$.fragment),this.h()},l(o){t=b(o,"A",{href:!0});var n=k(t);Ee(s.$$.fragment,n),n.forEach(h),this.h()},h(){i(t,"href",e=`/?q=${encodeURIComponent(r[0].name)}`)},m(o,n){U(o,t,n),Le(s,t,null),a=!0},p(o,n){(!a||n&1&&e!==(e=`/?q=${encodeURIComponent(o[0].name)}`))&&i(t,"href",e)},i(o){a||(J(s.$$.fragment,o),a=!0)},o(o){ee(s.$$.fragment,o),a=!1},d(o){o&&h(t),ke(s)}}}function ue(r){let t,s,e,a,o,n,g;return{c(){t=d("div"),s=d("div"),e=d("img"),n=B(),this.h()},l(u){t=b(u,"DIV",{class:!0});var c=k(t);s=b(c,"DIV",{class:!0});var E=k(s);e=b(E,"IMG",{src:!0,alt:!0,crossorigin:!0,class:!0}),E.forEach(h),n=D(c),c.forEach(h),this.h()},h(){var u;K(e.src,a=r[4](r[9]))||i(e,"src",a),i(e,"alt",o=(u=r[9].name)==null?void 0:u.en),i(e,"crossorigin","anonymous"),i(e,"class","svelte-1x6y83n"),Q(e,"pixelated",!r[3]),i(s,"class","circle svelte-1x6y83n"),i(t,"class",g=ne(r[6].toLowerCase()+(r[11]+1))+" svelte-1x6y83n")},m(u,c){U(u,t,c),m(t,s),m(s,e),m(t,n)},p(u,c){var E;c&17&&!K(e.src,a=u[4](u[9]))&&i(e,"src",a),c&1&&o!==(o=(E=u[9].name)==null?void 0:E.en)&&i(e,"alt",o),c&8&&Q(e,"pixelated",!u[3]),c&1&&g!==(g=ne(u[6].toLowerCase()+(u[11]+1))+" svelte-1x6y83n")&&i(t,"class",g)},d(u){u&&h(t)}}}function _e(r){let t,s=r[0].pokemon[r[6]],e=[];for(let a=0;a<s.length;a+=1)e[a]=ue(ce(r,s,a));return{c(){for(let a=0;a<e.length;a+=1)e[a].c();t=oe()},l(a){for(let o=0;o<e.length;o+=1)e[o].l(a);t=oe()},m(a,o){for(let n=0;n<e.length;n+=1)e[n].m(a,o);U(a,t,o)},p(a,o){if(o&25){s=a[0].pokemon[a[6]];let n;for(n=0;n<s.length;n+=1){const g=ce(a,s,n);e[n]?e[n].p(g,o):(e[n]=ue(g),e[n].c(),e[n].m(t.parentNode,t))}for(;n<e.length;n+=1)e[n].d(1);e.length=s.length}},d(a){he(e,a),a&&h(t)}}}function Ae(r){var le,te;let t,s,e=((le=r[0])==null?void 0:le.name)+"",a,o,n,g,u,c,E=((te=r[0])==null?void 0:te.player)+"",j,G,N,L,A,X,P,w,R,W,Y,S,Z,$,I,z,F,y,_=r[2]&&fe(r),q=Object.keys(r[0].pokemon),v=[];for(let l=0;l<q.length;l+=1)v[l]=_e(ie(r,q,l));return{c(){t=d("h2"),s=d("a"),a=se(e),n=B(),_&&_.c(),g=B(),u=d("h3"),c=d("a"),j=se(E),N=B(),L=d("div"),A=d("div");for(let l=0;l<v.length;l+=1)v[l].c();X=B(),P=d("div"),w=d("picture"),R=d("source"),Y=B(),S=d("source"),$=B(),I=d("img"),this.h()},l(l){t=b(l,"H2",{class:!0});var f=k(t);s=b(f,"A",{href:!0,"sveltekit:prefetch":!0});var C=k(s);a=ae(C,e),C.forEach(h),n=D(f),_&&_.l(f),f.forEach(h),g=D(l),u=b(l,"H3",{class:!0});var H=k(u);c=b(H,"A",{href:!0,class:!0});var M=k(c);j=ae(M,E),M.forEach(h),H.forEach(h),N=D(l),L=b(l,"DIV",{class:!0});var V=k(L);A=b(V,"DIV",{class:!0});var p=k(A);for(let x=0;x<v.length;x+=1)v[x].l(p);p.forEach(h),X=D(V),P=b(V,"DIV",{class:!0});var T=k(P);w=b(T,"PICTURE",{class:!0});var O=k(w);R=b(O,"SOURCE",{srcset:!0,type:!0}),Y=D(O),S=b(O,"SOURCE",{srcset:!0,type:!0}),$=D(O),I=b(O,"IMG",{src:!0,alt:!0,class:!0}),O.forEach(h),T.forEach(h),V.forEach(h),this.h()},h(){var l,f;i(s,"href",o="/teams/"+((l=r[0])==null?void 0:l.player.toLocaleLowerCase())),i(s,"sveltekit:prefetch",""),i(t,"class","svelte-1x6y83n"),i(c,"href",G="/teams/"+((f=r[0])==null?void 0:f.player.toLocaleLowerCase())),i(c,"class","svelte-1x6y83n"),i(u,"class","svelte-1x6y83n"),i(A,"class","mons svelte-1x6y83n"),i(R,"srcset",W=r[5](r[0].logo.avif)),i(R,"type","image/avif"),i(S,"srcset",Z=r[5](r[0].logo.webp)),i(S,"type","image/webp"),K(I.src,z=r[5](r[0].logo.webp))||i(I,"src",z),i(I,"alt",F="Logo von "+r[0].player),i(I,"class","svelte-1x6y83n"),i(w,"class","svelte-1x6y83n"),i(P,"class","logo svelte-1x6y83n"),i(L,"class","container svelte-1x6y83n"),Q(L,"reversed",r[1])},m(l,f){U(l,t,f),m(t,s),m(s,a),m(t,n),_&&_.m(t,null),U(l,g,f),U(l,u,f),m(u,c),m(c,j),U(l,N,f),U(l,L,f),m(L,A);for(let C=0;C<v.length;C+=1)v[C].m(A,null);m(L,X),m(L,P),m(P,w),m(w,R),m(w,Y),m(w,S),m(w,$),m(w,I),y=!0},p(l,[f]){var C,H,M,V;if((!y||f&1)&&e!==(e=((C=l[0])==null?void 0:C.name)+"")&&re(a,e),(!y||f&1&&o!==(o="/teams/"+((H=l[0])==null?void 0:H.player.toLocaleLowerCase())))&&i(s,"href",o),l[2]?_?(_.p(l,f),f&4&&J(_,1)):(_=fe(l),_.c(),J(_,1),_.m(t,null)):_&&(pe(),ee(_,1,1,()=>{_=null}),de()),(!y||f&1)&&E!==(E=((M=l[0])==null?void 0:M.player)+"")&&re(j,E),(!y||f&1&&G!==(G="/teams/"+((V=l[0])==null?void 0:V.player.toLocaleLowerCase())))&&i(c,"href",G),f&25){q=Object.keys(l[0].pokemon);let p;for(p=0;p<q.length;p+=1){const T=ie(l,q,p);v[p]?v[p].p(T,f):(v[p]=_e(T),v[p].c(),v[p].m(A,null))}for(;p<v.length;p+=1)v[p].d(1);v.length=q.length}(!y||f&1&&W!==(W=l[5](l[0].logo.avif)))&&i(R,"srcset",W),(!y||f&1&&Z!==(Z=l[5](l[0].logo.webp)))&&i(S,"srcset",Z),(!y||f&1&&!K(I.src,z=l[5](l[0].logo.webp)))&&i(I,"src",z),(!y||f&1&&F!==(F="Logo von "+l[0].player))&&i(I,"alt",F),f&2&&Q(L,"reversed",l[1])},i(l){y||(J(_),y=!0)},o(l){ee(_),y=!1},d(l){l&&h(t),_&&_.d(),l&&h(g),l&&h(u),l&&h(N),l&&h(L),he(v,l)}}}function Ve(r,t,s){let e,a;be(r,Ie,c=>s(3,a=c));let{team:o}=t,{reverseLogoPosition:n=!1}=t,{filterButtonEnabled:g=!1}=t;const u=c=>we+"/logos/"+c;return r.$$set=c=>{"team"in c&&s(0,o=c.team),"reverseLogoPosition"in c&&s(1,n=c.reverseLogoPosition),"filterButtonEnabled"in c&&s(2,g=c.filterButtonEnabled)},r.$$.update=()=>{r.$$.dirty&8&&s(4,e=c=>a?c.officialArtworkUrl:c.imageUrl)},[o,n,g,a,e,u]}class Re extends me{constructor(t){super(),ve(this,t,Ve,Ae,ge,{team:0,reverseLogoPosition:1,filterButtonEnabled:2})}}export{Re as T};
