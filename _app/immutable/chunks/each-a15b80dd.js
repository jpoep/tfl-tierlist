import{F as q,t as z,f as B}from"./index-a742bca5.js";function E(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function C(n,d){z(n,1,1,()=>{d.delete(n.key)})}function G(n,d){n.f(),C(n,d)}function H(n,d,x,S,A,m,h,F,p,j,u,k){let i=n.length,c=m.length,f=i;const w={};for(;f--;)w[n[f].key]=f;const o=[],a=new Map,y=new Map,_=[];for(f=c;f--;){const e=k(A,m,f),s=x(e);let t=h.get(s);t?S&&_.push(()=>t.p(e,d)):(t=j(s,e),t.c()),a.set(s,o[f]=t),s in w&&y.set(s,Math.abs(f-w[s]))}const M=new Set,v=new Set;function g(e){B(e,1),e.m(F,u),h.set(e.key,e),u=e.first,c--}for(;i&&c;){const e=o[c-1],s=n[i-1],t=e.key,l=s.key;e===s?(u=e.first,i--,c--):a.has(l)?!h.has(t)||M.has(t)?g(e):v.has(l)?i--:y.get(t)>y.get(l)?(v.add(t),g(e)):(M.add(l),i--):(p(s,h),i--)}for(;i--;){const e=n[i];a.has(e.key)||p(e,h)}for(;c;)g(o[c-1]);return q(_),o}export{E as e,G as f,C as o,H as u};