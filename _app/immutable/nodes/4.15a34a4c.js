import{s as i,e as c,c as d,g as u,i as p,n as o,d as m,o as g}from"../chunks/scheduler.acaf567e.js";import{S as f,i as h}from"../chunks/index.5c00e781.js";import{o as _}from"../chunks/auth0-spa-js.production.esm.ce0ccc5c.js";import{c as x}from"../chunks/singletons.366093a2.js";const l=x("goto");function y(s){let t,n="Loading...";return{c(){t=c("p"),t.textContent=n},l(e){t=d(e,"P",{"data-svelte-h":!0}),u(t)!=="svelte-qdsr2u"&&(t.textContent=n)},m(e,r){p(e,t,r)},p:o,i:o,o,d(e){e&&m(t)}}}function C(s){let t=null;g(async()=>{await n();const e=window.location.search;if(e.includes("code=")&&e.includes("state="))try{const a=await t?.handleRedirectCallback();a&&a.appState&&a.appState.targetUrl?l(a.appState.targetUrl):l("/"),console.log("Logged in!")}catch(a){console.log("Error parsing redirect:",a)}});const n=async()=>{t=await _({domain:"dev-p2vt4a2r3z7lnna4.us.auth0.com",clientId:"uxd2OTEJV5e94Qszy0MyMPPZnbbh5S2U"})};return[]}class b extends f{constructor(t){super(),h(this,t,C,y,i,{})}}export{b as component};