import{b as E,h as c,B as N,E as R,H as S,C as F,D as H,F as k,G as p,I as A,a as I,J as T,U as C,c as _}from"./CFVXtXxR.js";function O(i,r,[e,a]=[0,0]){c&&e===0&&N();var s=i,f=null,t=null,n=C,h=e>0?R:0,u=!1;const g=(o,l=!0)=>{u=!0,b(l,o)},b=(o,l)=>{if(n===(n=o))return;let m=!1;if(c&&a!==-1){if(e===0){const v=s.data;v===S?a=0:v===F?a=1/0:(a=parseInt(v.substring(1)),a!==a&&(a=n?1/0:-1))}const D=a>e;!!n===D&&(s=H(),k(s),p(!1),m=!0,a=-1)}n?(f?A(f):l&&(f=I(()=>l(s))),t&&T(t,()=>{t=null})):(t?A(t):l&&(t=I(()=>l(s,[e+1,a]))),f&&T(f,()=>{f=null})),m&&p(!0)};E(()=>{u=!1,r(g),u||b(null,null)},h),c&&(s=_)}function U(i,r,e){c&&N();var a=i,s,f;E(()=>{s!==(s=r())&&(f&&(T(f),f=null),s&&(f=I(()=>e(a,s))))},R),c&&(a=_)}export{U as c,O as i};
