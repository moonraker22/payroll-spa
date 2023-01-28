import{R as c,G as _,T as L,C as T,a as D,r as v,j as b,b as U,c as N}from"./index.esm-5bedf466.js";import{r as q,P as F}from"./index.esm-2be1a8a4.js";import{E as W,t as G,a as H}from"./theme-cc0de6a7.js";import{T as B,s as K,h as V,a as Y,d as M,j as Z,o as J,b as Q,c as x,A as X,O as j}from"./firebase-1cff0f71.js";import{C as S}from"./constants-4856e09f.js";import{c as O}from"./currency.es-57f74176.js";import{t as y}from"./index-9ba3ed2e.js";import{r as w,t as C}from"./index-75959897.js";import{g as R}from"./index-b31f775c.js";import{s as g}from"./store-105db165.js";import"./motion-91c60b2e.js";import"./index.esm-3d7316f0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();var k={},E=q.exports;k.createRoot=E.createRoot,k.hydrateRoot=E.hydrateRoot;var A=`
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
`,ee=()=>c.createElement(_,{styles:A}),te=()=>c.createElement(_,{styles:`
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

      ${A}
    `}),ae=o=>{const{children:t,colorModeManager:e,portalZIndex:r,resetCSS:i=!0,theme:a={},environment:l,cssVarsRoot:p}=o,u=c.createElement(W,{environment:l},t);return c.createElement(L,{theme:a,cssVarsRoot:p},c.createElement(T,{colorModeManager:e,options:a.config},i?c.createElement(te,null):c.createElement(ee,null),c.createElement(D,null),r?c.createElement(F,{zIndex:r},u):u))},ie=o=>function({children:e,theme:r=o,toastOptions:i,...a}){return c.createElement(ae,{theme:r,...a},e,c.createElement(B,{...i}))},oe=ie(G);function ne(o,t){var e,r,i,a,l,p,u,n;w(1,arguments);var m=R(),d=C((e=(r=(i=(a=t==null?void 0:t.weekStartsOn)!==null&&a!==void 0?a:t==null||(l=t.locale)===null||l===void 0||(p=l.options)===null||p===void 0?void 0:p.weekStartsOn)!==null&&i!==void 0?i:m.weekStartsOn)!==null&&r!==void 0?r:(u=m.locale)===null||u===void 0||(n=u.options)===null||n===void 0?void 0:n.weekStartsOn)!==null&&e!==void 0?e:0);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=y(o),h=s.getDay(),f=(h<d?7:0)+h-d;return s.setDate(s.getDate()-f),s.setHours(0,0,0,0),s}function re(o,t){var e,r,i,a,l,p,u,n;w(1,arguments);var m=R(),d=C((e=(r=(i=(a=t==null?void 0:t.weekStartsOn)!==null&&a!==void 0?a:t==null||(l=t.locale)===null||l===void 0||(p=l.options)===null||p===void 0?void 0:p.weekStartsOn)!==null&&i!==void 0?i:m.weekStartsOn)!==null&&r!==void 0?r:(u=m.locale)===null||u===void 0||(n=u.options)===null||n===void 0?void 0:n.weekStartsOn)!==null&&e!==void 0?e:0);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=y(o),h=s.getDay(),f=(h<d?-7:0)+6-(h-d);return s.setDate(s.getDate()+f),s.setHours(23,59,59,999),s}function z(o,t){w(2,arguments);var e=y(o),r=y(t);return e.getTime()===r.getTime()}function le(o){const t=[];return o.forEach(e=>{const r=ne(y(e.date)),i=re(y(e.date)),a=t.find(l=>z(l.weekStart,r)&&z(l.weekEnd,i));a?(a.backhaul+=e.backhaul,a.endingMiles+=e.endingMiles,a.payMiles+=e.payMiles,a.startingMiles+=e.startingMiles,a.totalMiles+=e.totalMiles,a.finalMiles+=$({totalMiles:e.totalMiles,payMiles:e.payMiles}),a.totalPay+=Number(P({totalMiles:e.totalMiles,payMiles:e.payMiles,backhaul:e.backhaul}))):t.push({weekStart:r,weekEnd:i,backhaul:e.backhaul,endingMiles:e.endingMiles,payMiles:e.payMiles,startingMiles:e.startingMiles,totalMiles:e.totalMiles,finalMiles:$({totalMiles:e.totalMiles,payMiles:e.payMiles}),totalPay:Number(P({totalMiles:e.totalMiles,payMiles:e.payMiles,backhaul:e.backhaul}))})}),t}function P({totalMiles:o,payMiles:t,backhaul:e=0}){return o>t?O(o,{precision:2}).multiply(.515).add(e):O(t,{precision:2}).multiply(.515).add(e)}function $({totalMiles:o,payMiles:t}){return o>t?o:t}function se(){const[o,t]=v.exports.useState(null),[e,r]=v.exports.useState(!0),[i,a]=v.exports.useState(!1),l=()=>{t(null),r(!1),a(!1),g.clear()},p=async n=>{var s;if(r(!0),!n){l();return}if(n.isAnonymous){l();return}n.email&&(t({uid:n.uid,email:n.email}),g.setUserEmail(n.email));const m=X(M,"users",`${n.uid}`),d=await j(m);g.setAvatar(((s=d.data())==null?void 0:s.avatar)||n.photoURL),g.setIsSignedIn(!0),g.setUserId(n.uid),n!=null&&n.email&&a(n!==null),r(!1)};v.exports.useEffect(()=>{if(i&&o!==null&&o.uid!==null){const n=K(Y(M,S.USERS,`${o.uid}`,`${S.PAYSHEETS}`),V("date","desc")),m=Z(n,d=>{const s=d.docs.map(f=>({uid:f.id,startingMiles:f.data().startingMiles,endingMiles:f.data().endingMiles,date:f.data().date,totalMiles:f.data().totalMiles,payMiles:f.data().payMiles,backhaul:f.data().backhaul}));g.setPaysheets(s);const h=le(s);g.setWeeks(h)});return()=>m()}},[i,o]);const u=()=>Q(x).then(l);return v.exports.useEffect(()=>{const n=J(x,p);return()=>n()},[]),{authUser:o,isLoading:e,isSignedIn:i,signOut:u}}const de=v.exports.createContext({authUser:null,isLoading:!0,isSignedIn:!1,signOut:async()=>{}});function ue({children:o}){const t=se();return b(de.Provider,{value:t,children:o})}function ce(){return b(oe,{theme:H,children:b(ue,{children:b(U,{router:N})})})}const I=document.getElementById("root");if(!I)throw new Error("Failed to find the root element");const pe=k.createRoot(I);pe.render(b(c.StrictMode,{children:b(ce,{})}));
//# sourceMappingURL=index-387d578a.js.map
