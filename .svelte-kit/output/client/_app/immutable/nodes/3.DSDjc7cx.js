import"../chunks/CWj6FrbW.js";import{b as De,h as O,B as oe,a as Te,c as K,ah as Oe,au as Ue,at as Be,F as pe,O as Ee,d as Re,E as Fe,ay as Le,R as qe,G as Ce,W as Je,J as Pe,I as Ve,Y as x,z as b,A as g,X as $,x as k,f as v,a2 as L,w as X,a0 as B,j as $e,K as W,y as ee,k as U,az as Ye,aA as ze,n as Ie}from"../chunks/CFVXtXxR.js";import{d as _e,e as Ze,t as A,a as _,c as N,b as Ge}from"../chunks/Dsl7IYrX.js";import{o as He,a as I,b as Ke,s as We,p as Qe,f as Xe}from"../chunks/BFjOTyUr.js";import{e as V,i as Y,b as et,a as tt,c as rt,d as at}from"../chunks/Dx6KWIGS.js";import{c as he,i as P}from"../chunks/Cjx9aoqd.js";import{s as ge,r as nt,p as Q}from"../chunks/EnqQmAHH.js";import{b as ot}from"../chunks/BmWFtLKB.js";import{s as st}from"../chunks/DhxKS0LD.js";import{b as it}from"../chunks/CikVSojY.js";import"../chunks/BCzi4U7i.js";function Ae(e,t,a,n,i){var l=e,u="",d;De(()=>{if(u===(u=t()??"")){O&&oe();return}d!==void 0&&(Re(d),d=void 0),u!==""&&(d=Te(()=>{if(O){K.data;for(var f=oe(),o=f;f!==null&&(f.nodeType!==8||f.data!=="");)o=f,f=Oe(f);if(f===null)throw Ue(),Be;_e(K,o),l=pe(f);return}var c=u+"",r=Ze(c);_e(Ee(r),r.lastChild),l.before(r)}))})}function be(e,t,a,n,i,l){let u=O;O&&oe();var d,f,o=null;O&&K.nodeType===1&&(o=K,oe());var c=O?K:e,r;De(()=>{const s=t()||null;var h=s==="svg"?Le:null;s!==d&&(r&&(s===null?Pe(r,()=>{r=null,f=null}):s===f?Ve(r):Re(r)),s&&s!==f&&(r=Te(()=>{if(o=O?o:h?document.createElementNS(h,s):document.createElement(s),_e(o,o),n){O&&He(s)&&o.append(document.createComment(""));var m=O?Ee(o):o.appendChild(qe());O&&(m===null?Ce(!1):pe(m)),n(o,m)}Je.nodes_end=o,c.before(o)})),d=s,d&&(f=d))},Fe),u&&(Ce(!0),pe(c))}var Se={},de={},fe=34,H=10,me=13;function je(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function lt(e,t){var a=je(e);return function(n,i){return t(a(n),i,e)}}function we(e){var t=Object.create(null),a=[];return e.forEach(function(n){for(var i in n)i in t||a.push(t[i]=i)}),a}function R(e,t){var a=e+"",n=a.length;return n<t?new Array(t-n+1).join(0)+a:a}function ct(e){return e<0?"-"+R(-e,6):e>9999?"+"+R(e,6):R(e,4)}function vt(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),n=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":ct(e.getUTCFullYear())+"-"+R(e.getUTCMonth()+1,2)+"-"+R(e.getUTCDate(),2)+(i?"T"+R(t,2)+":"+R(a,2)+":"+R(n,2)+"."+R(i,3)+"Z":n?"T"+R(t,2)+":"+R(a,2)+":"+R(n,2)+"Z":a||t?"T"+R(t,2)+":"+R(a,2)+"Z":"")}function ut(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function n(r,s){var h,m,p=i(r,function(y,C){if(h)return h(y,C-1);m=y,h=s?lt(y,s):je(y)});return p.columns=m||[],p}function i(r,s){var h=[],m=r.length,p=0,y=0,C,E=m<=0,S=!1;r.charCodeAt(m-1)===H&&--m,r.charCodeAt(m-1)===me&&--m;function M(){if(E)return de;if(S)return S=!1,Se;var T,D=p,j;if(r.charCodeAt(D)===fe){for(;p++<m&&r.charCodeAt(p)!==fe||r.charCodeAt(++p)===fe;);return(T=p)>=m?E=!0:(j=r.charCodeAt(p++))===H?S=!0:j===me&&(S=!0,r.charCodeAt(p)===H&&++p),r.slice(D+1,T-1).replace(/""/g,'"')}for(;p<m;){if((j=r.charCodeAt(T=p++))===H)S=!0;else if(j===me)S=!0,r.charCodeAt(p)===H&&++p;else if(j!==a)continue;return r.slice(D,T)}return E=!0,r.slice(D,m)}for(;(C=M())!==de;){for(var w=[];C!==Se&&C!==de;)w.push(C),C=M();s&&(w=s(w,y++))==null||h.push(w)}return h}function l(r,s){return r.map(function(h){return s.map(function(m){return c(h[m])}).join(e)})}function u(r,s){return s==null&&(s=we(r)),[s.map(c).join(e)].concat(l(r,s)).join(`
`)}function d(r,s){return s==null&&(s=we(r)),l(r,s).join(`
`)}function f(r){return r.map(o).join(`
`)}function o(r){return r.map(c).join(e)}function c(r){return r==null?"":r instanceof Date?vt(r):t.test(r+="")?'"'+r.replace(/"/g,'""')+'"':r}return{parse:n,parseRows:i,format:u,formatBody:d,formatRows:f,formatRow:o,formatValue:c}}var dt=ut(","),ft=dt.parse,mt=A('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function pt(e){var t=mt();_(e,t)}var _t=A('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function ht(e){var t=_t();_(e,t)}var gt=A('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function bt(e){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=gt(),n=x(b(a),2);V(n,17,()=>t,Y,(i,l)=>{let u=()=>v(l).tag,d=()=>v(l).text;var f=N(),o=$(f);be(o,u,!1,(c,r)=>{var s=Ge();k(()=>I(s,d())),_(r,s)}),_(i,f)}),g(a),_(e,a)}var yt=A("<p> </p>");function xt(e,t){var a=yt(),n=b(a);g(a),k(()=>I(n,`I am component A and my favorite number is ${t.number??""}.`)),_(e,a)}var Ct=A("<p> </p>");function At(e,t){var a=Ct(),n=b(a);g(a),k(()=>I(n,`I am component B and my name is ${t.name??""}.`)),_(e,a)}var St=A('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function wt(e){const t={A:xt,B:At},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var n=St(),i=x(b(n),2);V(i,17,()=>a,Y,(l,u)=>{var d=N();const f=L(()=>t[v(u).component]);var o=$(d);he(o,()=>v(f),(c,r)=>{r(c,ge(()=>v(u)))}),_(l,d)}),g(n),_(e,n)}var Dt=A("<div><!></div>");function Tt(e,t){X(t,!0);const[a,n]=We(),i=()=>Ke(v(u),"$value",a),l=nt(t,["$$slots","$$events","$$legacy"]);let u=B($e(t.value??0));const{root:d=null,top:f=0,bottom:o=0,increments:c=100,children:r}=l;let s=[],h=[],m=[],p=[],y;function C(){let w=0,T=0;for(let D=0;D<s.length;D++)s[D]>w&&(w=s[D],T=D);Qe(U(u,w>0?T:void 0,!0),"$value",a)}function E(w,T){const D=se=>{const ie=se[0].intersectionRatio;s[T]=ie,C()},j=f*-1,te=o*-1,re={root:d,rootMargin:`${j}px 0px ${te}px 0px`,threshold:h};p[T]&&p[T].disconnect();const ae=new IntersectionObserver(D,re);ae.observe(w),p[T]=ae}W(()=>{h=[];for(let w=0;w<=c;w++)h.push(w/c)}),W(()=>{y&&(m=y.querySelectorAll(":scope > *:not(iframe)"),m.forEach((w,T)=>E(w,T)))});var S=Dt(),M=b(S);r==null||r(M,()=>({active:i()})),g(S),ot(S,w=>y=w,()=>y),_(e,S),ee(),n()}var Et=A('<div><p class="svelte-12sq0x6"> </p></div>'),Rt=A('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function $t(e){let t=B(void 0);var a=Rt(),n=b(a),i=x(b(n)),l=b(i,!0);g(i),g(n);var u=x(n,4);Tt(u,{get value(){return v(t)},set value(d){U(t,d,!0)},children:(d,f)=>{var o=N(),c=$(o);V(c,16,()=>[0,1,2,3,4],Y,(r,s,h)=>{var m=Et();const p=L(()=>v(t)===h);let y;var C=b(m),E=b(C,!0);g(C),g(m),k(S=>{y=et(m,1,"step svelte-12sq0x6",null,y,S),I(E,s)},[()=>({active:v(p)})]),_(r,m)}),_(d,o)},$$slots:{default:!0}}),Ye(2),g(a),k(()=>I(l,v(t)||"-")),_(e,a)}const It=[{section:"intro",content:[{type:"h4",value:"An h4 element with no attributes"},{type:"text",value:"Some random text here, followed by an img tag."},{type:"img",value:{src:"../assets/demo/test.jpg",alt:"A cat"}},{type:"Test",value:{label:"I’m a custom component!",value:"50"}}]}],jt={body:It},kt=`{\r
	"meta": { "title": "Title TK", "description": "Description tk." },\r
	"body": [\r
		{\r
			"section": "intro",\r
			"content": [\r
				{ "type": "h4", "value": "An h4 element with no attributes" },\r
				{\r
					"type": "text",\r
					"value": "Some random text here, followed by an img tag."\r
				},\r
				{\r
					"type": "img",\r
					"value": { "src": "../assets/demo/test.jpg", "alt": "A cat" }\r
				},\r
				{\r
					"type": "Test",\r
					"value": { "label": "I’m a custom component!", "value": "50" }\r
				}\r
			]\r
		}\r
	]\r
}\r
`;var Mt=A("<p><!></p>"),Nt=A("<section><!></section>");function Ot(e,t){X(t,!0);let a=Q(t,"components",19,()=>({})),n=Q(t,"body",19,()=>[]);var i=N(),l=$(i);V(l,17,n,Y,(u,d)=>{let f=()=>v(d).section,o=()=>v(d).content;var c=Nt();const r=L(()=>f().toLowerCase().replace(/[^a-z0-9]/g,"")),s=L(()=>a()[f()]);var h=b(c);{var m=y=>{var C=N(),E=$(C);he(E,()=>v(s),(S,M)=>{M(S,ge(o))}),_(y,C)},p=y=>{var C=N(),E=$(C);V(E,17,o,Y,(S,M,w,T)=>{let D=()=>v(M).type,j=()=>v(M).value;var te=N();const re=L(()=>a()[D()]),ae=L(()=>typeof j()=="string");var se=$(te);{var ie=q=>{var ne=N(),le=$(ne);he(le,()=>v(re),(ce,F)=>{F(ce,ge(j))}),_(q,ne)},ke=(q,ne)=>{{var le=F=>{var z=Mt(),ve=b(z);Ae(ve,j),g(z),_(F,z)},ce=(F,z)=>{{var ve=J=>{var Z=N(),ue=$(Z);be(ue,D,!1,(ye,xe)=>{var G=N(),Ne=$(G);Ae(Ne,j),_(xe,G)}),_(J,Z)},Me=J=>{var Z=N(),ue=$(Z);be(ue,D,!1,(ye,xe)=>{let G;k(()=>G=rt(ye,G,{...j()}))}),_(J,Z)};P(F,J=>{v(ae)?J(ve):J(Me,!1)},z)}};P(q,F=>{D()==="text"?F(le):F(ce,!1)},ne)}};P(se,q=>{v(re)?q(ie):q(ke,!1)})}_(S,te)}),_(y,C)};P(h,y=>{v(s)?y(m):y(p,!1)})}g(c),k(()=>tt(c,"id",v(r))),_(u,c)}),_(e,i),ee()}var Ut=A('<p> </p> <progress max="100"></progress>',1);function Bt(e,t){let a=Q(t,"label",3,"A"),n=Q(t,"value",3,0);var i=Ut(),l=$(i),u=b(l,!0);g(l);var d=x(l,2);k(()=>{I(u,a()),at(d,n())}),_(e,i)}var Ft=A('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Lt(e,t){X(t,!0);const{body:a}=jt,n={Test:Bt};var i=Ft(),l=x(b(i),2),u=b(l),d=b(u,!0);g(u),g(l);var f=x(l,2);Ot(f,{components:n,body:a}),g(i),k(o=>I(d,o),[()=>kt.replace(/\t/g," ")]),_(e,i),ee()}const qt=(e,t=Ie)=>{var a=Jt(),n=b(a),i=b(n,!0);g(n);var l=x(n,2),u=b(l,!0);g(l),g(a),k(()=>{I(i,t().name),I(u,t().age)}),_(e,a)};var Jt=A('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Pt=(e,t)=>ze(t),Vt=(e,t)=>t.random(Math.floor(Math.random()*10)),Yt=A('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function zt(e,t){X(t,!0),Q(t,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let n=B(0),i=L(()=>v(n)*2),l=L(()=>v(n)*2),u=B(0);W(()=>{U(u,v(n)*2)});var d=Yt(),f=x($(d),4);f.__click=[Pt,n];var o=x(f,2),c=b(o);g(o);var r=x(o,2),s=b(r);g(r);var h=x(r,2),m=b(h);g(h);var p=x(h,4),y=b(p);st(y,()=>t.children??Ie),g(p);var C=x(p,4);C.__click=[Vt,t];var E=x(C,4);V(E,21,()=>a,Y,(S,M)=>{qt(S,()=>v(M))}),g(E),k(()=>{I(c,`${v(n)??""} doubled is ${v(i)??""} (derived)`),I(s,`${v(n)??""} doubled is ${v(l)??""} (derived by)`),I(m,`${v(n)??""} doubled is ${v(u)??""} ($effect)`)}),_(e,d),ee()}Xe(["click"]);const Zt=(e,t)=>{let a=B($e(e)),n=B(null),i=B(!0),l=B(void 0);const u=(o=!0)=>{U(i,o,!0),o===!0&&(U(l,null),U(n,null))},d=async()=>{try{const o=await fetch(v(a),t);if(!o.ok)throw new Error(`Unexpected error occurred (status ${o.status})`);let c;if(v(a).includes(".csv")){const r=await o.text();c=ft(r)}else c=await o.json();return[null,c]}catch(o){const{errorMessage:c="Unexpected error eccurred"}=o;return[c,null]}},f=async o=>{u(!0);const[c,r]=await d();if(o===v(a)){if(c){u(!1),U(l,c,!0);return}u(!1),U(n,r,!0)}};return W(()=>{f(v(a))}),{get data(){return v(n)},get loading(){return v(i)},get error(){return v(l)},get url(){return v(a)},set url(o){v(a)!==o&&U(a,o,!0)}}};var Gt=A("<p>loading data...</p>"),Ht=A("<p> </p>"),Kt=A("<p>data loaded</p> <pre> </pre>",1),Wt=A('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Qt(e,t){X(t,!0);const a=`${it}/assets/demo/test.csv`,n=Zt(a);W(()=>{});var i=Wt(),l=x(b(i),2),u=b(l);{var d=o=>{var c=Gt();_(o,c)},f=(o,c)=>{{var r=h=>{var m=Ht(),p=b(m);g(m),k(()=>I(p,`error: ${n.error??""}`)),_(h,m)},s=h=>{var m=Kt(),p=x($(m),2),y=b(p,!0);g(p),k(C=>I(y,C),[()=>JSON.stringify(n.data,null,2)]),_(h,m)};P(o,h=>{n.error?h(r):h(s,!1)},c)}};P(u,o=>{n.loading?o(d):o(f,!1)})}g(l),g(i),_(e,i),ee()}var Xt=A('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function er(e){let t=B(0);function a(s){console.log(s)}var n=Xt(),i=x(b(n),2);zt(i,{random:a,get value(){return v(t)},set value(s){U(t,s,!0)}});var l=x(i,2);pt(l);var u=x(l,2);ht(u);var d=x(u,2);bt(d);var f=x(d,2);wt(f);var o=x(f,2);Lt(o,{});var c=x(o,2);Qt(c,{});var r=x(c,2);$t(r),g(n),_(e,n)}function dr(e){er(e)}export{dr as component};
