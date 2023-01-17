import{R as r,r as l,j as m,a as L}from"./index-ad61e450.js";import{r as A,G as x,T as I,C as M,a as R,P as T,b as O,t as N,o as $,c as g,A as F,d as U,O as _,s as c,e as j,f as q,g as D,h as B}from"./routes-3ee497c9.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();var f={},y=A.exports;f.createRoot=y.createRoot,f.hydrateRoot=y.hydrateRoot;var w=`
  :root {
    --chakra-vh: 100vh;
  }

  @supports (height: -webkit-fill-available) {
    :root {
      --chakra-vh: -webkit-fill-available;
    }
  }

  @supports (height: -moz-fill-available) {
    :root {
      --chakra-vh: -moz-fill-available;
    }
  }

  @supports (height: 100dvh) {
    :root {
      --chakra-vh: 100dvh;
    }
  }
`,G=()=>r.createElement(x,{styles:w}),V=()=>r.createElement(x,{styles:`
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        font-family: system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        touch-action: manipulation;
      }

      body {
        position: relative;
        min-height: 100%;
        font-feature-settings: 'kern';
      }

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
      }

      main {
        display: block;
      }

      hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      pre,
      code,
      kbd,
      samp {
        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }

      a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
      }

      abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }

      b,
      strong {
        font-weight: bold;
      }

      small {
        font-size: 80%;
      }

      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      sub {
        bottom: -0.25em;
      }

      sup {
        top: -0.5em;
      }

      img {
        border-style: none;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      button,
      input {
        overflow: visible;
      }

      button,
      select {
        text-transform: none;
      }

      button::-moz-focus-inner,
      [type="button"]::-moz-focus-inner,
      [type="reset"]::-moz-focus-inner,
      [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }

      fieldset {
        padding: 0.35em 0.75em 0.625em;
      }

      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      progress {
        vertical-align: baseline;
      }

      textarea {
        overflow: auto;
      }

      [type="checkbox"],
      [type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }

      [type="number"]::-webkit-inner-spin-button,
      [type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      details {
        display: block;
      }

      summary {
        display: list-item;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      body,
      blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: 0;
      }

      button {
        background: transparent;
        padding: 0;
      }

      fieldset {
        margin: 0;
        padding: 0;
      }

      ol,
      ul {
        margin: 0;
        padding: 0;
      }

      textarea {
        resize: vertical;
      }

      button,
      [role="button"] {
        cursor: pointer;
      }

      button::-moz-focus-inner {
        border: 0 !important;
      }

      table {
        border-collapse: collapse;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        padding: 0;
        line-height: inherit;
        color: inherit;
      }

      img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
      }

      img,
      video {
        max-width: 100%;
        height: auto;
      }

      [data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled]) {
        outline: none;
        box-shadow: none;
      }

      select::-ms-expand {
        display: none;
      }

      ${w}
    `}),K={body:{classList:{add(){},remove(){}}},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createEvent(){return{initEvent(){}}},createElement(){return{children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName(){return[]}}}},E=K,p=()=>{},W={document:E,navigator:{userAgent:""},CustomEvent:function(){return this},addEventListener:p,removeEventListener:p,getComputedStyle(){return{getPropertyValue(){return""}}},matchMedia(){return{matches:!1,addListener:p,removeListener:p}},requestAnimationFrame(o){return typeof setTimeout>"u"?(o(),null):setTimeout(o,0)},cancelAnimationFrame(o){typeof setTimeout>"u"||clearTimeout(o)},setTimeout:()=>0,clearTimeout:p,setInterval:()=>0,clearInterval:p},Z=W,H={window:Z,document:E},k=typeof window<"u"?{window,document}:H,S=l.exports.createContext(k);S.displayName="EnvironmentContext";function z(o){const{children:i,environment:a}=o,[n,e]=l.exports.useState(null),[t,d]=l.exports.useState(!1);l.exports.useEffect(()=>d(!0),[]);const h=l.exports.useMemo(()=>{if(a)return a;const u=n==null?void 0:n.ownerDocument,s=n==null?void 0:n.ownerDocument.defaultView;return u?{document:u,window:s}:k},[n,a]);return r.createElement(S.Provider,{value:h},i,!a&&t&&r.createElement("span",{id:"__chakra_env",hidden:!0,ref:u=>{l.exports.startTransition(()=>{u&&e(u)})}}))}z.displayName="EnvironmentProvider";var J=o=>{const{children:i,colorModeManager:a,portalZIndex:n,resetCSS:e=!0,theme:t={},environment:d,cssVarsRoot:h}=o,u=r.createElement(z,{environment:d},i);return r.createElement(I,{theme:t,cssVarsRoot:h},r.createElement(M,{colorModeManager:a,options:t.config},e?r.createElement(V,null):r.createElement(G,null),r.createElement(R,null),n?r.createElement(T,{zIndex:n},u):u))},Q=o=>function({children:a,theme:n=o,toastOptions:e,...t}){return r.createElement(J,{theme:n,...t},a,r.createElement(O,{...e}))},X=Q(N);function Y(){const[o,i]=l.exports.useState(null),[a,n]=l.exports.useState(!0),[e,t]=l.exports.useState(!1),d=()=>{i(null),n(!1),t(!1),c.userId=null,c.avatar="",c.userEmail="",c.isSignedIn=!1},h=async s=>{var v;if(n(!0),!s){d();return}i({uid:s.uid,email:s.email});const b=F(U,"users",`${s.uid}`),C=await _(b);c.avatar=((v=C.data())==null?void 0:v.avatar)||s.photoURL,c.isSignedIn=!0,c.userId=s.uid,c.userEmail=s.email,t(s),n(!1)},u=()=>j(g).then(d);return l.exports.useEffect(()=>{const s=$(g,h);return()=>s()},[]),{authUser:o,isLoading:a,isSignedIn:e,signOut:u}}const ee=l.exports.createContext({authUser:null,isLoading:!0,isSignedIn:!1,signOut:async()=>{}});function te({children:o}){const i=Y();return m(ee.Provider,{value:i,children:o})}function ne(){return m(X,{theme:q,children:m(te,{children:m(D,{children:m(L,{router:B})})})})}const P=document.getElementById("root");if(!P)throw new Error("Failed to find the root element");const oe=f.createRoot(P);oe.render(m(r.StrictMode,{children:m(ne,{})}));
