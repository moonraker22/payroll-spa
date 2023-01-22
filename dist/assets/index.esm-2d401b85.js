var er=Object.defineProperty;var tr=(e,t,r)=>t in e?er(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var De=(e,t,r)=>(tr(e,typeof t!="symbol"?t+"":t,r),r);import{r as c,_ as he,R as y,e as ne,n as Ze,f as C,d as w,o as rr}from"./index.esm-09f2711e.js";import{L as Be,m as Ke,d as nr}from"./motion-6436106a.js";import{u as or,b as T,_ as ze,c as ar,A as ir,a as ur,C as cr}from"./index.esm-d752f8ac.js";import{m as Le}from"./index.esm-58215cd6.js";import{S as sr,s as We,a as lr,f as dr}from"./index.esm-0dd58088.js";const fr=c.exports.createContext(null),vr=e=>!e.isLayoutDirty&&e.willUpdate(!1);function Ge(){const e=new Set,t=new WeakMap,r=()=>e.forEach(vr);return{add:n=>{e.add(n),t.set(n,n.addEventListener("willUpdate",r))},remove:n=>{var o;e.delete(n),(o=t.get(n))===null||o===void 0||o(),t.delete(n),r()},dirty:r}}const Qe=e=>e===!0,mr=e=>Qe(e===!0)||e==="id",Lo=({children:e,id:t,inheritId:r,inherit:n=!0})=>{r!==void 0&&(n=r);const o=c.exports.useContext(Be),a=c.exports.useContext(fr),[i,u]=or(),l=c.exports.useRef(null),d=o.id||a;l.current===null&&(mr(n)&&d&&(t=t?d+"-"+t:d),l.current={id:t,group:Qe(n)&&o.group||Ge()});const v=c.exports.useMemo(()=>({...l.current,forceRender:i}),[u]);return c.exports.createElement(Be.Provider,{value:v},e)};function pr(e){return e!=null&&typeof e=="object"&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE}function hr(e){if(!pr(e))return!1;const t=e.ownerDocument.defaultView??window;return e instanceof t.HTMLElement}var br=e=>e.hasAttribute("tabindex");function yr(e){return Boolean(e.getAttribute("disabled"))===!0||Boolean(e.getAttribute("aria-disabled"))===!0}function Je(e){return e.parentElement&&Je(e.parentElement)?!0:e.hidden}function gr(e){const t=e.getAttribute("contenteditable");return t!=="false"&&t!=null}function xr(e){if(!hr(e)||Je(e)||yr(e))return!1;const{localName:t}=e;if(["input","select","textarea","button"].indexOf(t)>=0)return!0;const n={a:()=>e.hasAttribute("href"),audio:()=>e.hasAttribute("controls"),video:()=>e.hasAttribute("controls")};return t in n?n[t]():gr(e)?!0:br(e)}var Er=["input:not(:disabled):not([disabled])","select:not(:disabled):not([disabled])","textarea:not(:disabled):not([disabled])","embed","iframe","object","a[href]","area[href]","button:not(:disabled):not([disabled])","[tabindex]","audio[controls]","video[controls]","*[tabindex]:not([aria-disabled])","*[contenteditable]"],Sr=Er.join(),Cr=e=>e.offsetWidth>0&&e.offsetHeight>0;function wr(e){const t=Array.from(e.querySelectorAll(Sr));return t.unshift(e),t.filter(r=>xr(r)&&Cr(r))}var Fr=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},B=new WeakMap,Z=new WeakMap,K={},se=0,et=function(e){return e&&(e.host||et(e.parentNode))},Pr=function(e,t){return t.map(function(r){if(e.contains(r))return r;var n=et(r);return n&&e.contains(n)?n:(console.error("aria-hidden",r,"in not contained inside",e,". Doing nothing"),null)}).filter(function(r){return Boolean(r)})},Mr=function(e,t,r,n){var o=Pr(t,Array.isArray(e)?e:[e]);K[r]||(K[r]=new WeakMap);var a=K[r],i=[],u=new Set,l=new Set(o),d=function(s){!s||u.has(s)||(u.add(s),d(s.parentNode))};o.forEach(d);var v=function(s){!s||l.has(s)||Array.prototype.forEach.call(s.children,function(m){if(u.has(m))v(m);else{var p=m.getAttribute(n),b=p!==null&&p!=="false",f=(B.get(m)||0)+1,h=(a.get(m)||0)+1;B.set(m,f),a.set(m,h),i.push(m),f===1&&b&&Z.set(m,!0),h===1&&m.setAttribute(r,"true"),b||m.setAttribute(n,"true")}})};return v(t),u.clear(),se++,function(){i.forEach(function(s){var m=B.get(s)-1,p=a.get(s)-1;B.set(s,m),a.set(s,p),m||(Z.has(s)||s.removeAttribute(n),Z.delete(s)),p||s.removeAttribute(r)}),se--,se||(B=new WeakMap,B=new WeakMap,Z=new WeakMap,K={})}},_r=function(e,t,r){r===void 0&&(r="data-aria-hidden");var n=Array.from(Array.isArray(e)?e:[e]),o=t||Fr(e);return o?(n.push.apply(n,Array.from(o.querySelectorAll("[aria-live]"))),Mr(n,o,r,"aria-hidden")):function(){return null}};function kr(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}var be="data-focus-lock",tt="data-focus-lock-disabled",Nr="data-no-focus-lock",Tr="data-autofocus-inside",Or="data-no-autofocus";function Ar(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Ir(e,t){var r=c.exports.useState(function(){return{value:e,callback:t,facade:{get current(){return r.value},set current(n){var o=r.value;o!==n&&(r.value=n,r.callback(n,o))}}}})[0];return r.callback=t,r.facade}function rt(e,t){return Ir(t||null,function(r){return e.forEach(function(n){return Ar(n,r)})})}var le={width:"1px",height:"0px",padding:0,overflow:"hidden",position:"fixed",top:"1px",left:"1px"};function nt(e){return e}function ot(e,t){t===void 0&&(t=nt);var r=[],n=!1,o={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:e},useMedium:function(a){var i=t(a,n);return r.push(i),function(){r=r.filter(function(u){return u!==i})}},assignSyncMedium:function(a){for(n=!0;r.length;){var i=r;r=[],i.forEach(a)}r={push:function(u){return a(u)},filter:function(){return r}}},assignMedium:function(a){n=!0;var i=[];if(r.length){var u=r;r=[],u.forEach(a),i=r}var l=function(){var v=i;i=[],v.forEach(a)},d=function(){return Promise.resolve().then(l)};d(),r={push:function(v){i.push(v),d()},filter:function(v){return i=i.filter(v),r}}}};return o}function we(e,t){return t===void 0&&(t=nt),ot(e,t)}function at(e){e===void 0&&(e={});var t=ot(null);return t.options=T({async:!0,ssr:!1},e),t}var it=function(e){var t=e.sideCar,r=ze(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=t.read();if(!n)throw new Error("Sidecar medium not found");return c.exports.createElement(n,T({},r))};it.isSideCarExport=!0;function Rr(e,t){return e.useMedium(t),it}var ut=we({},function(e){var t=e.target,r=e.currentTarget;return{target:t,currentTarget:r}}),ct=we(),Dr=we(),Br=at({async:!0}),Lr=[],Fe=c.exports.forwardRef(function(t,r){var n,o=c.exports.useState(),a=o[0],i=o[1],u=c.exports.useRef(),l=c.exports.useRef(!1),d=c.exports.useRef(null),v=t.children,s=t.disabled,m=t.noFocusGuards,p=t.persistentFocus,b=t.crossFrame,f=t.autoFocus;t.allowTextSelection;var h=t.group,g=t.className,S=t.whiteList,F=t.hasPositiveIndices,P=t.shards,E=P===void 0?Lr:P,_=t.as,k=_===void 0?"div":_,x=t.lockProps,N=x===void 0?{}:x,ae=t.sideCar,q=t.returnFocus,Ut=t.focusOptions,ie=t.onActivation,ue=t.onDeactivation,jt=c.exports.useState({}),$t=jt[0],Vt=c.exports.useCallback(function(){d.current=d.current||document&&document.activeElement,u.current&&ie&&ie(u.current),l.current=!0},[ie]),Xt=c.exports.useCallback(function(){l.current=!1,ue&&ue(u.current)},[ue]);c.exports.useEffect(function(){s||(d.current=null)},[]);var Yt=c.exports.useCallback(function(A){var j=d.current;if(j&&j.focus){var ce=typeof q=="function"?q(j):q;if(ce){var Re=typeof ce=="object"?ce:void 0;d.current=null,A?Promise.resolve().then(function(){return j.focus(Re)}):j.focus(Re)}}},[q]),qt=c.exports.useCallback(function(A){l.current&&ut.useMedium(A)},[]),Zt=ct.useMedium,Kt=c.exports.useCallback(function(A){u.current!==A&&(u.current=A,i(A))},[]),zt=he((n={},n[tt]=s&&"disabled",n[be]=h,n),N),Ie=m!==!0,Qt=Ie&&m!=="tail",Jt=rt([r,Kt]);return c.exports.createElement(c.exports.Fragment,null,Ie&&[c.exports.createElement("div",{key:"guard-first","data-focus-guard":!0,tabIndex:s?-1:0,style:le}),F?c.exports.createElement("div",{key:"guard-nearest","data-focus-guard":!0,tabIndex:s?-1:1,style:le}):null],!s&&c.exports.createElement(ae,{id:$t,sideCar:Br,observed:a,disabled:s,persistentFocus:p,crossFrame:b,autoFocus:f,whiteList:S,shards:E,onActivation:Vt,onDeactivation:Xt,returnFocus:Yt,focusOptions:Ut}),c.exports.createElement(k,he({ref:Jt},zt,{className:g,onBlur:Zt,onFocus:qt}),v),Qt&&c.exports.createElement("div",{"data-focus-guard":!0,tabIndex:s?-1:0,style:le}))});Fe.propTypes={};Fe.defaultProps={children:void 0,disabled:!1,returnFocus:!1,focusOptions:void 0,noFocusGuards:!1,autoFocus:!0,persistentFocus:!1,crossFrame:!0,hasPositiveIndices:void 0,allowTextSelection:void 0,group:void 0,className:void 0,whiteList:void 0,shards:void 0,as:"div",lockProps:{},onActivation:void 0,onDeactivation:void 0};const st=Fe;function ye(e,t){return ye=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},ye(e,t)}function Wr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ye(e,t)}function V(e){return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function Gr(e,t){if(V(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(V(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Hr(e){var t=Gr(e,"string");return V(t)==="symbol"?t:String(t)}function Ur(e,t,r){return t=Hr(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function jr(e,t){function r(n){return n.displayName||n.name||"Component"}return function(o){var a=[],i;function u(){i=e(a.map(function(d){return d.props})),t(i)}var l=function(d){Wr(v,d);function v(){return d.apply(this,arguments)||this}v.peek=function(){return i};var s=v.prototype;return s.componentDidMount=function(){a.push(this),u()},s.componentDidUpdate=function(){u()},s.componentWillUnmount=function(){var p=a.indexOf(this);a.splice(p,1),u()},s.render=function(){return y.createElement(o,this.props)},v}(c.exports.PureComponent);return Ur(l,"displayName","SideEffect("+r(o)+")"),l}}var M=function(e){for(var t=Array(e.length),r=0;r<e.length;++r)t[r]=e[r];return t},ge=function(e){return Array.isArray(e)?e:[e]},$r=function(e){if(e.nodeType!==Node.ELEMENT_NODE)return!1;var t=window.getComputedStyle(e,null);return!t||!t.getPropertyValue?!1:t.getPropertyValue("display")==="none"||t.getPropertyValue("visibility")==="hidden"},lt=function(e){return e.parentNode&&e.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.parentNode.host:e.parentNode},dt=function(e){return e===document||e&&e.nodeType===Node.DOCUMENT_NODE},Vr=function(e,t){return!e||dt(e)||!$r(e)&&t(lt(e))},ft=function(e,t){var r=e.get(t);if(r!==void 0)return r;var n=Vr(t,ft.bind(void 0,e));return e.set(t,n),n},Xr=function(e,t){return e&&!dt(e)?Zr(e)?t(lt(e)):!1:!0},vt=function(e,t){var r=e.get(t);if(r!==void 0)return r;var n=Xr(t,vt.bind(void 0,e));return e.set(t,n),n},mt=function(e){return e.dataset},Yr=function(e){return e.tagName==="BUTTON"},pt=function(e){return e.tagName==="INPUT"},ht=function(e){return pt(e)&&e.type==="radio"},qr=function(e){return!((pt(e)||Yr(e))&&(e.type==="hidden"||e.disabled))},Zr=function(e){var t=e.getAttribute(Or);return![!0,"true",""].includes(t)},Pe=function(e){var t;return Boolean(e&&((t=mt(e))===null||t===void 0?void 0:t.focusGuard))},te=function(e){return!Pe(e)},Kr=function(e){return Boolean(e)},zr=function(e,t){var r=e.tabIndex-t.tabIndex,n=e.index-t.index;if(r){if(!e.tabIndex)return 1;if(!t.tabIndex)return-1}return r||n},bt=function(e,t,r){return M(e).map(function(n,o){return{node:n,index:o,tabIndex:r&&n.tabIndex===-1?(n.dataset||{}).focusGuard?0:-1:n.tabIndex}}).filter(function(n){return!t||n.tabIndex>=0}).sort(zr)},Qr=["button:enabled","select:enabled","textarea:enabled","input:enabled","a[href]","area[href]","summary","iframe","object","embed","audio[controls]","video[controls]","[tabindex]","[contenteditable]","[autofocus]"],Me=Qr.join(","),Jr="".concat(Me,", [data-focus-guard]"),yt=function(e,t){var r;return M(((r=e.shadowRoot)===null||r===void 0?void 0:r.children)||e.children).reduce(function(n,o){return n.concat(o.matches(t?Jr:Me)?[o]:[],yt(o))},[])},_e=function(e,t){return e.reduce(function(r,n){return r.concat(yt(n,t),n.parentNode?M(n.parentNode.querySelectorAll(Me)).filter(function(o){return o===n}):[])},[])},en=function(e){var t=e.querySelectorAll("[".concat(Tr,"]"));return M(t).map(function(r){return _e([r])}).reduce(function(r,n){return r.concat(n)},[])},ke=function(e,t){return M(e).filter(function(r){return ft(t,r)}).filter(function(r){return qr(r)})},He=function(e,t){return t===void 0&&(t=new Map),M(e).filter(function(r){return vt(t,r)})},xe=function(e,t,r){return bt(ke(_e(e,r),t),!0,r)},Ue=function(e,t){return bt(ke(_e(e),t),!1)},tn=function(e,t){return ke(en(e),t)},X=function(e,t){return e.shadowRoot?X(e.shadowRoot,t):Object.getPrototypeOf(e).contains!==void 0&&Object.getPrototypeOf(e).contains.call(e,t)?!0:M(e.children).some(function(r){return X(r,t)})},rn=function(e){for(var t=new Set,r=e.length,n=0;n<r;n+=1)for(var o=n+1;o<r;o+=1){var a=e[n].compareDocumentPosition(e[o]);(a&Node.DOCUMENT_POSITION_CONTAINED_BY)>0&&t.add(o),(a&Node.DOCUMENT_POSITION_CONTAINS)>0&&t.add(n)}return e.filter(function(i,u){return!t.has(u)})},gt=function(e){return e.parentNode?gt(e.parentNode):e},Ne=function(e){var t=ge(e);return t.filter(Boolean).reduce(function(r,n){var o=n.getAttribute(be);return r.push.apply(r,o?rn(M(gt(n).querySelectorAll("[".concat(be,'="').concat(o,'"]:not([').concat(tt,'="disabled"])')))):[n]),r},[])},xt=function(e){return e.activeElement?e.activeElement.shadowRoot?xt(e.activeElement.shadowRoot):e.activeElement:void 0},Te=function(){return document.activeElement?document.activeElement.shadowRoot?xt(document.activeElement.shadowRoot):document.activeElement:void 0},nn=function(e){return e===document.activeElement},on=function(e){return Boolean(M(e.querySelectorAll("iframe")).some(function(t){return nn(t)}))},Et=function(e){var t=document&&Te();return!t||t.dataset&&t.dataset.focusGuard?!1:Ne(e).some(function(r){return X(r,t)||on(r)})},an=function(){var e=document&&Te();return e?M(document.querySelectorAll("[".concat(Nr,"]"))).some(function(t){return X(t,e)}):!1},un=function(e,t){return t.filter(ht).filter(function(r){return r.name===e.name}).filter(function(r){return r.checked})[0]||e},Oe=function(e,t){return ht(e)&&e.name?un(e,t):e},cn=function(e){var t=new Set;return e.forEach(function(r){return t.add(Oe(r,e))}),e.filter(function(r){return t.has(r)})},je=function(e){return e[0]&&e.length>1?Oe(e[0],e):e[0]},$e=function(e,t){return e.length>1?e.indexOf(Oe(e[t],e)):t},St="NEW_FOCUS",sn=function(e,t,r,n){var o=e.length,a=e[0],i=e[o-1],u=Pe(r);if(!(r&&e.indexOf(r)>=0)){var l=r!==void 0?t.indexOf(r):-1,d=n?t.indexOf(n):l,v=n?e.indexOf(n):-1,s=l-d,m=t.indexOf(a),p=t.indexOf(i),b=cn(t),f=r!==void 0?b.indexOf(r):-1,h=f-(n?b.indexOf(n):l),g=$e(e,0),S=$e(e,o-1);if(l===-1||v===-1)return St;if(!s&&v>=0)return v;if(l<=m&&u&&Math.abs(s)>1)return S;if(l>=p&&u&&Math.abs(s)>1)return g;if(s&&Math.abs(h)>1)return v;if(l<=m)return S;if(l>p)return g;if(s)return Math.abs(s)>1?v:(o+v+s)%o}},ln=function(e){return function(t){var r,n=(r=mt(t))===null||r===void 0?void 0:r.autofocus;return t.autofocus||n!==void 0&&n!=="false"||e.indexOf(t)>=0}},dn=function(e,t,r){var n=e.map(function(a){var i=a.node;return i}),o=He(n.filter(ln(r)));return o&&o.length?je(o):je(He(t))},Ee=function(e,t){return t===void 0&&(t=[]),t.push(e),e.parentNode&&Ee(e.parentNode.host||e.parentNode,t),t},de=function(e,t){for(var r=Ee(e),n=Ee(t),o=0;o<r.length;o+=1){var a=r[o];if(n.indexOf(a)>=0)return a}return!1},Ct=function(e,t,r){var n=ge(e),o=ge(t),a=n[0],i=!1;return o.filter(Boolean).forEach(function(u){i=de(i||u,u)||i,r.filter(Boolean).forEach(function(l){var d=de(a,l);d&&(!i||X(d,i)?i=d:i=de(d,i))})}),i},fn=function(e,t){return e.reduce(function(r,n){return r.concat(tn(n,t))},[])},vn=function(e,t){var r=new Map;return t.forEach(function(n){return r.set(n.node,n)}),e.map(function(n){return r.get(n)}).filter(Kr)},mn=function(e,t){var r=document&&Te(),n=Ne(e).filter(te),o=Ct(r||e,e,n),a=new Map,i=Ue(n,a),u=xe(n,a).filter(function(p){var b=p.node;return te(b)});if(!(!u[0]&&(u=i,!u[0]))){var l=Ue([o],a).map(function(p){var b=p.node;return b}),d=vn(l,u),v=d.map(function(p){var b=p.node;return b}),s=sn(v,l,r,t);if(s===St){var m=dn(i,v,fn(n,a));if(m)return{node:m};console.warn("focus-lock: cannot find any node to move focus into");return}return s===void 0?s:d[s]}},pn=function(e){var t=Ne(e).filter(te),r=Ct(e,e,t),n=new Map,o=xe([r],n,!0),a=xe(t,n).filter(function(i){var u=i.node;return te(u)}).map(function(i){var u=i.node;return u});return o.map(function(i){var u=i.node,l=i.index;return{node:u,index:l,lockItem:a.indexOf(u)>=0,guard:Pe(u)}})},hn=function(e,t){"focus"in e&&e.focus(t),"contentWindow"in e&&e.contentWindow&&e.contentWindow.focus()},fe=0,ve=!1,bn=function(e,t,r){r===void 0&&(r={});var n=mn(e,t);if(!ve&&n){if(fe>2){console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"),ve=!0,setTimeout(function(){ve=!1},1);return}fe++,hn(n.node,r.focusOptions),fe--}};const wt=bn;function Ft(e){var t=window,r=t.setImmediate;typeof r<"u"?r(e):setTimeout(e,1)}var yn=function(){return document&&document.activeElement===document.body},gn=function(){return yn()||an()},H=null,G=null,U=null,Y=!1,xn=function(){return!0},En=function(t){return(H.whiteList||xn)(t)},Sn=function(t,r){U={observerNode:t,portaledElement:r}},Cn=function(t){return U&&U.portaledElement===t};function Ve(e,t,r,n){var o=null,a=e;do{var i=n[a];if(i.guard)i.node.dataset.focusAutoGuard&&(o=i);else if(i.lockItem){if(a!==e)return;o=null}else break}while((a+=r)!==t);o&&(o.node.tabIndex=0)}var wn=function(t){return t&&"current"in t?t.current:t},Fn=function(t){return t?Boolean(Y):Y==="meanwhile"},Pn=function e(t,r,n){return r&&(r.host===t&&(!r.activeElement||n.contains(r.activeElement))||r.parentNode&&e(t,r.parentNode,n))},Mn=function(t,r){return r.some(function(n){return Pn(t,n,n)})},re=function(){var t=!1;if(H){var r=H,n=r.observed,o=r.persistentFocus,a=r.autoFocus,i=r.shards,u=r.crossFrame,l=r.focusOptions,d=n||U&&U.portaledElement,v=document&&document.activeElement;if(d){var s=[d].concat(i.map(wn).filter(Boolean));if((!v||En(v))&&(o||Fn(u)||!gn()||!G&&a)&&(d&&!(Et(s)||v&&Mn(v,s)||Cn(v))&&(document&&!G&&v&&!a?(v.blur&&v.blur(),document.body.focus()):(t=wt(s,G,{focusOptions:l}),U={})),Y=!1,G=document&&document.activeElement),document){var m=document&&document.activeElement,p=pn(s),b=p.map(function(f){var h=f.node;return h}).indexOf(m);b>-1&&(p.filter(function(f){var h=f.guard,g=f.node;return h&&g.dataset.focusAutoGuard}).forEach(function(f){var h=f.node;return h.removeAttribute("tabIndex")}),Ve(b,p.length,1,p),Ve(b,-1,-1,p))}}}return t},Pt=function(t){re()&&t&&(t.stopPropagation(),t.preventDefault())},Ae=function(){return Ft(re)},_n=function(t){var r=t.target,n=t.currentTarget;n.contains(r)||Sn(n,r)},kn=function(){return null},Mt=function(){Y="just",setTimeout(function(){Y="meanwhile"},0)},Nn=function(){document.addEventListener("focusin",Pt),document.addEventListener("focusout",Ae),window.addEventListener("blur",Mt)},Tn=function(){document.removeEventListener("focusin",Pt),document.removeEventListener("focusout",Ae),window.removeEventListener("blur",Mt)};function On(e){return e.filter(function(t){var r=t.disabled;return!r})}function An(e){var t=e.slice(-1)[0];t&&!H&&Nn();var r=H,n=r&&t&&t.id===r.id;H=t,r&&!n&&(r.onDeactivation(),e.filter(function(o){var a=o.id;return a===r.id}).length||r.returnFocus(!t)),t?(G=null,(!n||r.observed!==t.observed)&&t.onActivation(),re(),Ft(re)):(Tn(),G=null)}ut.assignSyncMedium(_n);ct.assignMedium(Ae);Dr.assignMedium(function(e){return e({moveFocusInside:wt,focusInside:Et})});const In=jr(On,An)(kn);var _t=c.exports.forwardRef(function(t,r){return c.exports.createElement(st,he({sideCar:In,ref:r},t))}),kt=st.propTypes||{};kt.sideCar;kr(kt,["sideCar"]);_t.propTypes={};const Rn=_t;var Nt=e=>{const{initialFocusRef:t,finalFocusRef:r,contentRef:n,restoreFocus:o,children:a,isDisabled:i,autoFocus:u,persistentFocus:l,lockFocusAcrossFrames:d}=e,v=c.exports.useCallback(()=>{t!=null&&t.current?t.current.focus():n!=null&&n.current&&wr(n.current).length===0&&requestAnimationFrame(()=>{var b;(b=n.current)==null||b.focus()})},[t,n]),s=c.exports.useCallback(()=>{var p;(p=r==null?void 0:r.current)==null||p.focus()},[r]),m=o&&!r;return y.createElement(Rn,{crossFrame:d,persistentFocus:l,autoFocus:u,disabled:i,onActivation:v,onDeactivation:s,returnFocus:m},a)};Nt.displayName="FocusLock";var J="right-scroll-bar-position",ee="width-before-scroll-bar",Dn="with-scroll-bars-hidden",Bn="--removed-body-scroll-bar-size",Tt=at(),me=function(){},oe=c.exports.forwardRef(function(e,t){var r=c.exports.useRef(null),n=c.exports.useState({onScrollCapture:me,onWheelCapture:me,onTouchMoveCapture:me}),o=n[0],a=n[1],i=e.forwardProps,u=e.children,l=e.className,d=e.removeScrollBar,v=e.enabled,s=e.shards,m=e.sideCar,p=e.noIsolation,b=e.inert,f=e.allowPinchZoom,h=e.as,g=h===void 0?"div":h,S=ze(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),F=m,P=rt([r,t]),E=T(T({},S),o);return c.exports.createElement(c.exports.Fragment,null,v&&c.exports.createElement(F,{sideCar:Tt,removeScrollBar:d,shards:s,noIsolation:p,inert:b,setCallbacks:a,allowPinchZoom:!!f,lockRef:r}),i?c.exports.cloneElement(c.exports.Children.only(u),T(T({},E),{ref:P})):c.exports.createElement(g,T({},E,{className:l,ref:P}),u))});oe.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};oe.classNames={fullWidth:ee,zeroRight:J};var Ln=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Wn(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Ln();return t&&e.setAttribute("nonce",t),e}function Gn(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Hn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var Un=function(){var e=0,t=null;return{add:function(r){e==0&&(t=Wn())&&(Gn(t,r),Hn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},jn=function(){var e=Un();return function(t,r){c.exports.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&r])}},Ot=function(){var e=jn(),t=function(r){var n=r.styles,o=r.dynamic;return e(n,o),null};return t},$n={left:0,top:0,right:0,gap:0},pe=function(e){return parseInt(e||"",10)||0},Vn=function(e){var t=window.getComputedStyle(document.body),r=t[e==="padding"?"paddingLeft":"marginLeft"],n=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[pe(r),pe(n),pe(o)]},Xn=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return $n;var t=Vn(e),r=document.documentElement.clientWidth,n=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,n-r+t[2]-t[0])}},Yn=Ot(),qn=function(e,t,r,n){var o=e.left,a=e.top,i=e.right,u=e.gap;return r===void 0&&(r="margin"),`
  .`.concat(Dn,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(u,"px ").concat(n,`;
  }
  body {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(n,";"),r==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(i,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(u,"px ").concat(n,`;
    `),r==="padding"&&"padding-right: ".concat(u,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(J,` {
    right: `).concat(u,"px ").concat(n,`;
  }
  
  .`).concat(ee,` {
    margin-right: `).concat(u,"px ").concat(n,`;
  }
  
  .`).concat(J," .").concat(J,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(ee," .").concat(ee,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body {
    `).concat(Bn,": ").concat(u,`px;
  }
`)},Zn=function(e){var t=e.noRelative,r=e.noImportant,n=e.gapMode,o=n===void 0?"margin":n,a=c.exports.useMemo(function(){return Xn(o)},[o]);return c.exports.createElement(Yn,{styles:qn(a,!t,o,r?"":"!important")})},Se=!1;if(typeof window<"u")try{var z=Object.defineProperty({},"passive",{get:function(){return Se=!0,!0}});window.addEventListener("test",z,z),window.removeEventListener("test",z,z)}catch{Se=!1}var L=Se?{passive:!1}:!1,Kn=function(e){return e.tagName==="TEXTAREA"},At=function(e,t){var r=window.getComputedStyle(e);return r[t]!=="hidden"&&!(r.overflowY===r.overflowX&&!Kn(e)&&r[t]==="visible")},zn=function(e){return At(e,"overflowY")},Qn=function(e){return At(e,"overflowX")},Xe=function(e,t){var r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var n=It(e,r);if(n){var o=Rt(e,r),a=o[1],i=o[2];if(a>i)return!0}r=r.parentNode}while(r&&r!==document.body);return!1},Jn=function(e){var t=e.scrollTop,r=e.scrollHeight,n=e.clientHeight;return[t,r,n]},eo=function(e){var t=e.scrollLeft,r=e.scrollWidth,n=e.clientWidth;return[t,r,n]},It=function(e,t){return e==="v"?zn(t):Qn(t)},Rt=function(e,t){return e==="v"?Jn(t):eo(t)},to=function(e,t){return e==="h"&&t==="rtl"?-1:1},ro=function(e,t,r,n,o){var a=to(e,window.getComputedStyle(t).direction),i=a*n,u=r.target,l=t.contains(u),d=!1,v=i>0,s=0,m=0;do{var p=Rt(e,u),b=p[0],f=p[1],h=p[2],g=f-h-a*b;(b||g)&&It(e,u)&&(s+=g,m+=b),u=u.parentNode}while(!l&&u!==document.body||l&&(t.contains(u)||t===u));return(v&&(o&&s===0||!o&&i>s)||!v&&(o&&m===0||!o&&-i>m))&&(d=!0),d},Q=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Ye=function(e){return[e.deltaX,e.deltaY]},qe=function(e){return e&&"current"in e?e.current:e},no=function(e,t){return e[0]===t[0]&&e[1]===t[1]},oo=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},ao=0,W=[];function io(e){var t=c.exports.useRef([]),r=c.exports.useRef([0,0]),n=c.exports.useRef(),o=c.exports.useState(ao++)[0],a=c.exports.useState(function(){return Ot()})[0],i=c.exports.useRef(e);c.exports.useEffect(function(){i.current=e},[e]),c.exports.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var f=ar([e.lockRef.current],(e.shards||[]).map(qe),!0).filter(Boolean);return f.forEach(function(h){return h.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),f.forEach(function(h){return h.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var u=c.exports.useCallback(function(f,h){if("touches"in f&&f.touches.length===2)return!i.current.allowPinchZoom;var g=Q(f),S=r.current,F="deltaX"in f?f.deltaX:S[0]-g[0],P="deltaY"in f?f.deltaY:S[1]-g[1],E,_=f.target,k=Math.abs(F)>Math.abs(P)?"h":"v";if("touches"in f&&k==="h"&&_.type==="range")return!1;var x=Xe(k,_);if(!x)return!0;if(x?E=k:(E=k==="v"?"h":"v",x=Xe(k,_)),!x)return!1;if(!n.current&&"changedTouches"in f&&(F||P)&&(n.current=E),!E)return!0;var N=n.current||E;return ro(N,h,f,N==="h"?F:P,!0)},[]),l=c.exports.useCallback(function(f){var h=f;if(!(!W.length||W[W.length-1]!==a)){var g="deltaY"in h?Ye(h):Q(h),S=t.current.filter(function(E){return E.name===h.type&&E.target===h.target&&no(E.delta,g)})[0];if(S&&S.should){h.cancelable&&h.preventDefault();return}if(!S){var F=(i.current.shards||[]).map(qe).filter(Boolean).filter(function(E){return E.contains(h.target)}),P=F.length>0?u(h,F[0]):!i.current.noIsolation;P&&h.cancelable&&h.preventDefault()}}},[]),d=c.exports.useCallback(function(f,h,g,S){var F={name:f,delta:h,target:g,should:S};t.current.push(F),setTimeout(function(){t.current=t.current.filter(function(P){return P!==F})},1)},[]),v=c.exports.useCallback(function(f){r.current=Q(f),n.current=void 0},[]),s=c.exports.useCallback(function(f){d(f.type,Ye(f),f.target,u(f,e.lockRef.current))},[]),m=c.exports.useCallback(function(f){d(f.type,Q(f),f.target,u(f,e.lockRef.current))},[]);c.exports.useEffect(function(){return W.push(a),e.setCallbacks({onScrollCapture:s,onWheelCapture:s,onTouchMoveCapture:m}),document.addEventListener("wheel",l,L),document.addEventListener("touchmove",l,L),document.addEventListener("touchstart",v,L),function(){W=W.filter(function(f){return f!==a}),document.removeEventListener("wheel",l,L),document.removeEventListener("touchmove",l,L),document.removeEventListener("touchstart",v,L)}},[]);var p=e.removeScrollBar,b=e.inert;return c.exports.createElement(c.exports.Fragment,null,b?c.exports.createElement(a,{styles:oo(o)}):null,p?c.exports.createElement(Zn,{gapMode:"margin"}):null)}const uo=Rr(Tt,io);var Dt=c.exports.forwardRef(function(e,t){return c.exports.createElement(oe,T({},e,{ref:t,sideCar:uo}))});Dt.classNames=oe.classNames;const co=Dt;var I=(...e)=>e.filter(Boolean).join(" ");function $(...e){return function(r){e.some(n=>(n==null||n(r),r==null?void 0:r.defaultPrevented))}}var so=class{constructor(){De(this,"modals");this.modals=[]}add(e){this.modals.push(e)}remove(e){this.modals=this.modals.filter(t=>t!==e)}isTopModal(e){return this.modals[this.modals.length-1]===e}},Ce=new so;function lo(e,t){c.exports.useEffect(()=>(t&&Ce.add(e),()=>{Ce.remove(e)}),[t,e])}function fo(e){const{isOpen:t,onClose:r,id:n,closeOnOverlayClick:o=!0,closeOnEsc:a=!0,useInert:i=!0,onOverlayClick:u,onEsc:l}=e,d=c.exports.useRef(null),v=c.exports.useRef(null),[s,m,p]=mo(n,"chakra-modal","chakra-modal--header","chakra-modal--body");vo(d,t&&i),lo(d,t);const b=c.exports.useRef(null),f=c.exports.useCallback(x=>{b.current=x.target},[]),h=c.exports.useCallback(x=>{x.key==="Escape"&&(x.stopPropagation(),a&&(r==null||r()),l==null||l())},[a,r,l]),[g,S]=c.exports.useState(!1),[F,P]=c.exports.useState(!1),E=c.exports.useCallback((x={},N=null)=>({role:"dialog",...x,ref:Le(N,d),id:s,tabIndex:-1,"aria-modal":!0,"aria-labelledby":g?m:void 0,"aria-describedby":F?p:void 0,onClick:$(x.onClick,ae=>ae.stopPropagation())}),[p,F,s,m,g]),_=c.exports.useCallback(x=>{x.stopPropagation(),b.current===x.target&&Ce.isTopModal(d)&&(o&&(r==null||r()),u==null||u())},[r,o,u]),k=c.exports.useCallback((x={},N=null)=>({...x,ref:Le(N,v),onClick:$(x.onClick,_),onKeyDown:$(x.onKeyDown,h),onMouseDown:$(x.onMouseDown,f)}),[h,f,_]);return{isOpen:t,onClose:r,headerId:m,bodyId:p,setBodyMounted:P,setHeaderMounted:S,dialogRef:d,overlayRef:v,getDialogProps:E,getDialogContainerProps:k}}function vo(e,t){const r=e.current;c.exports.useEffect(()=>{if(!(!e.current||!t))return _r(e.current)},[t,e,r])}function mo(e,...t){const r=c.exports.useId(),n=e||r;return c.exports.useMemo(()=>t.map(o=>`${o}-${n}`),[n,t])}var[po,R]=ne({name:"ModalStylesContext",errorMessage:`useModalStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Modal />" `}),[ho,O]=ne({strict:!0,name:"ModalContext",errorMessage:"useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`"}),Bt=e=>{const t={scrollBehavior:"outside",autoFocus:!0,trapFocus:!0,returnFocusOnClose:!0,blockScrollOnMount:!0,allowPinchZoom:!1,motionPreset:"scale",lockFocusAcrossFrames:!0,...e},{portalProps:r,children:n,autoFocus:o,trapFocus:a,initialFocusRef:i,finalFocusRef:u,returnFocusOnClose:l,blockScrollOnMount:d,allowPinchZoom:v,preserveScrollBarGap:s,motionPreset:m,lockFocusAcrossFrames:p,onCloseComplete:b}=t,f=Ze("Modal",t),g={...fo(t),autoFocus:o,trapFocus:a,initialFocusRef:i,finalFocusRef:u,returnFocusOnClose:l,blockScrollOnMount:d,allowPinchZoom:v,preserveScrollBarGap:s,motionPreset:m,lockFocusAcrossFrames:p};return y.createElement(ho,{value:g},y.createElement(po,{value:f},y.createElement(ir,{onExitComplete:b},g.isOpen&&y.createElement(ur,{...r},n))))};Bt.displayName="Modal";var bo=C((e,t)=>{const{className:r,...n}=e,{bodyId:o,setBodyMounted:a}=O();c.exports.useEffect(()=>(a(!0),()=>a(!1)),[a]);const i=I("chakra-modal__body",r),u=R();return y.createElement(w.div,{ref:t,className:i,id:o,...n,__css:u.body})});bo.displayName="ModalBody";var yo=C((e,t)=>{const{onClick:r,className:n,...o}=e,{onClose:a}=O(),i=I("chakra-modal__close-btn",n),u=R();return y.createElement(cr,{ref:t,__css:u.closeButton,className:i,onClick:$(r,l=>{l.stopPropagation(),a()}),...o})});yo.displayName="ModalCloseButton";function Lt(e){const{autoFocus:t,trapFocus:r,dialogRef:n,initialFocusRef:o,blockScrollOnMount:a,allowPinchZoom:i,finalFocusRef:u,returnFocusOnClose:l,preserveScrollBarGap:d,lockFocusAcrossFrames:v}=O(),[s,m]=nr();return c.exports.useEffect(()=>{!s&&m&&setTimeout(m)},[s,m]),y.createElement(Nt,{autoFocus:t,isDisabled:!r,initialFocusRef:o,finalFocusRef:u,restoreFocus:l,contentRef:n,lockFocusAcrossFrames:v},y.createElement(co,{removeScrollBar:!d,allowPinchZoom:i,enabled:a,forwardProps:!0},e.children))}var go={slideInBottom:{...We,custom:{offsetY:16,reverse:!0}},slideInRight:{...We,custom:{offsetX:16,reverse:!0}},scale:{...lr,custom:{initialScale:.95,reverse:!0}},none:{}},xo=w(Ke.section),Eo=e=>go[e||"none"],Wt=c.exports.forwardRef((e,t)=>{const{preset:r,motionProps:n=Eo(r),...o}=e;return y.createElement(xo,{ref:t,...n,...o})});Wt.displayName="ModalTransition";var Gt=C((e,t)=>{const{className:r,children:n,containerProps:o,motionProps:a,...i}=e,{getDialogProps:u,getDialogContainerProps:l}=O(),d=u(i,t),v=l(o),s=I("chakra-modal__content",r),m=R(),p={display:"flex",flexDirection:"column",position:"relative",width:"100%",outline:0,...m.dialog},b={display:"flex",width:"100vw",height:"$100vh",position:"fixed",left:0,top:0,...m.dialogContainer},{motionPreset:f}=O();return y.createElement(Lt,null,y.createElement(w.div,{...v,className:"chakra-modal__content-container",tabIndex:-1,__css:b},y.createElement(Wt,{preset:f,motionProps:a,className:s,...d,__css:p},n)))});Gt.displayName="ModalContent";var So=C((e,t)=>{const{className:r,...n}=e,o=I("chakra-modal__footer",r),i={display:"flex",alignItems:"center",justifyContent:"flex-end",...R().footer};return y.createElement(w.footer,{ref:t,...n,__css:i,className:o})});So.displayName="ModalFooter";var Co=C((e,t)=>{const{className:r,...n}=e,{headerId:o,setHeaderMounted:a}=O();c.exports.useEffect(()=>(a(!0),()=>a(!1)),[a]);const i=I("chakra-modal__header",r),l={flex:0,...R().header};return y.createElement(w.header,{ref:t,className:i,id:o,...n,__css:l})});Co.displayName="ModalHeader";var wo=w(Ke.div),Fo=C((e,t)=>{const{className:r,transition:n,motionProps:o,...a}=e,i=I("chakra-modal__overlay",r),l={pos:"fixed",left:"0",top:"0",w:"100vw",h:"100vh",...R().overlay},{motionPreset:d}=O(),s=o||(d==="none"?{}:dr);return y.createElement(wo,{...s,__css:l,ref:t,className:i,...a})});Fo.displayName="ModalOverlay";function Wo(e){const{leastDestructiveRef:t,...r}=e;return y.createElement(Bt,{...r,initialFocusRef:t})}var Go=C((e,t)=>y.createElement(Gt,{ref:t,role:"alertdialog",...e})),[Ho,Po]=ne(),Mo=w(sr),_o=C((e,t)=>{const{className:r,children:n,motionProps:o,containerProps:a,...i}=e,{getDialogProps:u,getDialogContainerProps:l,isOpen:d}=O(),v=u(i,t),s=l(a),m=I("chakra-modal__content",r),p=R(),b={display:"flex",flexDirection:"column",position:"relative",width:"100%",outline:0,...p.dialog},f={display:"flex",width:"100vw",height:"$100vh",position:"fixed",left:0,top:0,...p.dialogContainer},{placement:h}=Po();return y.createElement(Lt,null,y.createElement(w.div,{...s,className:"chakra-modal__content-container",__css:f},y.createElement(Mo,{motionProps:o,direction:h,in:d,className:m,...v,__css:b},n)))});_o.displayName="DrawerContent";var Ht=(...e)=>e.filter(Boolean).join(" "),[ko,D]=ne({name:"TableStylesContext",errorMessage:`useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `}),No=C((e,t)=>{const r=Ze("Table",e),{className:n,layout:o,...a}=rr(e);return y.createElement(ko,{value:r},y.createElement(w.table,{ref:t,__css:{tableLayout:o,...r.table},className:Ht("chakra-table",n),...a}))});No.displayName="Table";var Uo=C((e,t)=>{const{overflow:r,overflowX:n,className:o,...a}=e;return y.createElement(w.div,{ref:t,className:Ht("chakra-table__container",o),...a,__css:{display:"block",whiteSpace:"nowrap",WebkitOverflowScrolling:"touch",overflowX:r??n??"auto",overflowY:"hidden",maxWidth:"100%"}})}),To=C((e,t)=>{const{placement:r="bottom",...n}=e,o=D();return y.createElement(w.caption,{...n,ref:t,__css:{...o.caption,captionSide:r}})});To.displayName="TableCaption";var jo=C((e,t)=>{const r=D();return y.createElement(w.thead,{...e,ref:t,__css:r.thead})}),$o=C((e,t)=>{const r=D();return y.createElement(w.tbody,{...e,ref:t,__css:r.tbody})}),Vo=C((e,t)=>{const r=D();return y.createElement(w.tfoot,{...e,ref:t,__css:r.tfoot})}),Xo=C(({isNumeric:e,...t},r)=>{const n=D();return y.createElement(w.th,{...t,ref:r,__css:n.th,"data-is-numeric":e})}),Yo=C((e,t)=>{const r=D();return y.createElement(w.tr,{...e,ref:t,__css:r.tr})}),qo=C(({isNumeric:e,...t},r)=>{const n=D();return y.createElement(w.td,{...t,ref:r,__css:n.td,"data-is-numeric":e})});export{Wo as A,Lo as L,Fo as M,qo as T,Go as a,Co as b,yo as c,bo as d,So as e,Uo as f,No as g,To as h,jo as i,Yo as j,Xo as k,$o as l,Vo as m,Bt as n,Gt as o};
//# sourceMappingURL=index.esm-2d401b85.js.map