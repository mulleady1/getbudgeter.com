(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Re="",Ie="";function qe(t){Re=t}function po(t=""){if(!Re){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;qe(n)}else{const o=[...document.getElementsByTagName("script")].find(r=>r.src.endsWith("webawesome.js")||r.src.endsWith("webawesome.loader.js")||r.src.endsWith("webawesome.ssr-loader.js"));if(o){const r=String(o.getAttribute("src"));qe(r.split("/").slice(0,-1).join("/"))}}}return Re.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function fo(t){Ie=t}function mo(){if(!Ie){const t=document.querySelector("[data-fa-kit-code]");t&&fo(t.getAttribute("data-fa-kit-code")||"")}return Ie}var dt="7.0.1";function bo(t,e,n){const o=mo(),r=o.length>0;let a="solid";return e==="notdog"?(n==="solid"&&(a="solid"),n==="duo-solid"&&(a="duo-solid"),`https://ka-p.fontawesome.com/releases/v${dt}/svgs/notdog-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="chisel"?`https://ka-p.fontawesome.com/releases/v${dt}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(o)}`:e==="etch"?`https://ka-p.fontawesome.com/releases/v${dt}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(o)}`:e==="jelly"?(n==="regular"&&(a="regular"),n==="duo-regular"&&(a="duo-regular"),n==="fill-regular"&&(a="fill-regular"),`https://ka-p.fontawesome.com/releases/v${dt}/svgs/jelly-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="slab"?((n==="solid"||n==="regular")&&(a="regular"),n==="press-regular"&&(a="press-regular"),`https://ka-p.fontawesome.com/releases/v${dt}/svgs/slab-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="thumbprint"?`https://ka-p.fontawesome.com/releases/v${dt}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(o)}`:e==="whiteboard"?`https://ka-p.fontawesome.com/releases/v${dt}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(o)}`:(e==="classic"&&(n==="thin"&&(a="thin"),n==="light"&&(a="light"),n==="regular"&&(a="regular"),n==="solid"&&(a="solid")),e==="sharp"&&(n==="thin"&&(a="sharp-thin"),n==="light"&&(a="sharp-light"),n==="regular"&&(a="sharp-regular"),n==="solid"&&(a="sharp-solid")),e==="duotone"&&(n==="thin"&&(a="duotone-thin"),n==="light"&&(a="duotone-light"),n==="regular"&&(a="duotone-regular"),n==="solid"&&(a="duotone")),e==="sharp-duotone"&&(n==="thin"&&(a="sharp-duotone-thin"),n==="light"&&(a="sharp-duotone-light"),n==="regular"&&(a="sharp-duotone-regular"),n==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),r?`https://ka-p.fontawesome.com/releases/v${dt}/svgs/${a}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${dt}/svgs/${a}/${t}.svg`)}var wo={name:"default",resolver:(t,e="classic",n="solid")=>bo(t,e,n),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:n,variant:o}=e;if(n==="duotone"||n==="sharp-duotone"||n==="notdog"&&o==="duo-solid"||n==="jelly"&&o==="duo-regular"||n==="thumbprint"){const r=[...t.querySelectorAll("path")],a=r.find(c=>!c.hasAttribute("opacity")),i=r.find(c=>c.hasAttribute("opacity"));if(!a||!i)return;if(a.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&i){const c=i.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",c),i.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},go=wo;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&vo(n)});async function vo(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),o=[...t.querySelectorAll(":not(:defined)")].map(i=>i.tagName.toLowerCase()).filter(i=>i.startsWith("wa-"));n&&!customElements.get(e)&&o.push(e);const r=[...new Set(o)],a=await Promise.allSettled(r.map(i=>yo(i)));for(const i of a)i.status==="rejected"&&console.warn(i.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function yo(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=po(`components/${e}/${e}.js`);return new Promise((o,r)=>{import(n).then(()=>o()).catch(()=>r(new Error(`Unable to autoload <${t}> from ${n}`)))})}const Be=new Set,Dt=new Map;let _t,Ke="ltr",Xe="en";const zn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(zn){const t=new MutationObserver(Pn);Ke=document.documentElement.dir||"ltr",Xe=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Tn(...t){t.map(e=>{const n=e.$code.toLowerCase();Dt.has(n)?Dt.set(n,Object.assign(Object.assign({},Dt.get(n)),e)):Dt.set(n,e),_t||(_t=e)}),Pn()}function Pn(){zn&&(Ke=document.documentElement.dir||"ltr",Xe=document.documentElement.lang||navigator.language),[...Be.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let xo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Be.add(this.host)}hostDisconnected(){Be.delete(this.host)}dir(){return`${this.host.dir||Ke}`.toLowerCase()}lang(){return`${this.host.lang||Xe}`.toLowerCase()}getTranslationData(e){var n,o;const r=new Intl.Locale(e.replace(/_/g,"-")),a=r?.language.toLowerCase(),i=(o=(n=r?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&o!==void 0?o:"",c=Dt.get(`${a}-${i}`),d=Dt.get(a);return{locale:r,language:a,region:i,primary:c,secondary:d}}exists(e,n){var o;const{primary:r,secondary:a}=this.getTranslationData((o=n.lang)!==null&&o!==void 0?o:this.lang());return n=Object.assign({includeFallback:!1},n),!!(r&&r[e]||a&&a[e]||n.includeFallback&&_t&&_t[e])}term(e,...n){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let a;if(o&&o[e])a=o[e];else if(r&&r[e])a=r[e];else if(_t&&_t[e])a=_t[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...n):a}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,n)}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Dn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};Tn(Dn);var ko=Dn;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var it=class extends xo{};Tn(ko);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function So(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Ee={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Co={name:"system",resolver:(t,e="classic",n="solid")=>{let r=Ee[n][t]??Ee.regular[t]??Ee.regular["circle-question"];return r?So(r):""}},$o=Co;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Eo="classic",Ao=[go,$o],Me=[];function _o(t){Me.push(t)}function Oo(t){Me=Me.filter(e=>e!==t)}function Ae(t){return Ao.find(e=>e.name===t)}function Lo(){return Eo}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var zo=Object.defineProperty,To=Object.getOwnPropertyDescriptor,Rn=t=>{throw TypeError(t)},s=(t,e,n,o)=>{for(var r=o>1?void 0:o?To(e,n):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(o?i(e,n,r):i(r))||r);return o&&r&&zo(e,n,r),r},In=(t,e,n)=>e.has(t)||Rn("Cannot "+n),Po=(t,e,n)=>(In(t,e,"read from private field"),e.get(t)),Do=(t,e,n)=>e.has(t)?Rn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Ro=(t,e,n,o)=>(In(t,e,"write to private field"),e.set(t,n),n);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Jt=`@layer wa-utilities {
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
}
`;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,Ye=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qn=Symbol(),cn=new WeakMap;let Io=class{constructor(e,n,o){if(this._$cssResult$=!0,o!==qn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(Ye&&e===void 0){const o=n!==void 0&&n.length===1;o&&(e=cn.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&cn.set(n,e))}return e}toString(){return this.cssText}};const Bn=t=>new Io(typeof t=="string"?t:t+"",void 0,qn),qo=(t,e)=>{if(Ye)t.adoptedStyleSheets=e.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of e){const o=document.createElement("style"),r=ae.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=n.cssText,t.appendChild(o)}},dn=Ye?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const o of e.cssRules)n+=o.cssText;return Bn(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Bo,defineProperty:Mo,getOwnPropertyDescriptor:Vo,getOwnPropertyNames:Fo,getOwnPropertySymbols:No,getPrototypeOf:Uo}=Object,me=globalThis,un=me.trustedTypes,Ho=un?un.emptyScript:"",Wo=me.reactiveElementPolyfillSupport,Kt=(t,e)=>t,le={toAttribute(t,e){switch(e){case Boolean:t=t?Ho:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Ge=(t,e)=>!Bo(t,e),hn={attribute:!0,type:String,converter:le,reflect:!1,useDefault:!1,hasChanged:Ge};Symbol.metadata??=Symbol("metadata"),me.litPropertyMetadata??=new WeakMap;let Pt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=hn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,n);r!==void 0&&Mo(this.prototype,e,r)}}static getPropertyDescriptor(e,n,o){const{get:r,set:a}=Vo(this.prototype,e)??{get(){return this[n]},set(i){this[n]=i}};return{get:r,set(i){const c=r?.call(this);a?.call(this,i),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??hn}static _$Ei(){if(this.hasOwnProperty(Kt("elementProperties")))return;const e=Uo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Kt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Kt("properties"))){const n=this.properties,o=[...Fo(n),...No(n)];for(const r of o)this.createProperty(r,n[r])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[o,r]of n)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[n,o]of this.elementProperties){const r=this._$Eu(n,o);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)n.unshift(dn(r))}else e!==void 0&&n.push(dn(e));return n}static _$Eu(e,n){const o=n.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const o of n.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return qo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,n,o){this._$AK(e,o)}_$ET(e,n){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:le).toAttribute(n,o.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,n){const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=o.getPropertyOptions(r),i=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:le;this._$Em=r;const c=i.fromAttribute(n,a.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(e,n,o){if(e!==void 0){const r=this.constructor,a=this[e];if(o??=r.getPropertyOptions(e),!((o.hasChanged??Ge)(a,n)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,n,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:o,reflect:r,wrapped:a},i){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??n??this[e]),a!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(n=void 0),this._$AL.set(e,n)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o){const{wrapped:i}=a,c=this[r];i!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,a,c)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(n)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};Pt.elementStyles=[],Pt.shadowRootOptions={mode:"open"},Pt[Kt("elementProperties")]=new Map,Pt[Kt("finalized")]=new Map,Wo?.({ReactiveElement:Pt}),(me.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=globalThis,ce=Qe.trustedTypes,pn=ce?ce.createPolicy("lit-html",{createHTML:t=>t}):void 0,Mn="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,Vn="?"+gt,jo=`<${Vn}>`,Lt=document,Yt=()=>Lt.createComment(""),Gt=t=>t===null||typeof t!="object"&&typeof t!="function",Ze=Array.isArray,Ko=t=>Ze(t)||typeof t?.[Symbol.iterator]=="function",_e=`[ 	
\f\r]`,Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fn=/-->/g,mn=/>/g,At=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bn=/'/g,wn=/"/g,Fn=/^(?:script|style|textarea|title)$/i,Xo=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=Xo(1),K=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),gn=new WeakMap,Ot=Lt.createTreeWalker(Lt,129);function Nn(t,e){if(!Ze(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return pn!==void 0?pn.createHTML(e):e}const Yo=(t,e)=>{const n=t.length-1,o=[];let r,a=e===2?"<svg>":e===3?"<math>":"",i=Ut;for(let c=0;c<n;c++){const d=t[c];let h,u,p=-1,m=0;for(;m<d.length&&(i.lastIndex=m,u=i.exec(d),u!==null);)m=i.lastIndex,i===Ut?u[1]==="!--"?i=fn:u[1]!==void 0?i=mn:u[2]!==void 0?(Fn.test(u[2])&&(r=RegExp("</"+u[2],"g")),i=At):u[3]!==void 0&&(i=At):i===At?u[0]===">"?(i=r??Ut,p=-1):u[1]===void 0?p=-2:(p=i.lastIndex-u[2].length,h=u[1],i=u[3]===void 0?At:u[3]==='"'?wn:bn):i===wn||i===bn?i=At:i===fn||i===mn?i=Ut:(i=At,r=void 0);const f=i===At&&t[c+1].startsWith("/>")?" ":"";a+=i===Ut?d+jo:p>=0?(o.push(h),d.slice(0,p)+Mn+d.slice(p)+gt+f):d+gt+(p===-2?c:f)}return[Nn(t,a+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class Qt{constructor({strings:e,_$litType$:n},o){let r;this.parts=[];let a=0,i=0;const c=e.length-1,d=this.parts,[h,u]=Yo(e,n);if(this.el=Qt.createElement(h,o),Ot.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=Ot.nextNode())!==null&&d.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Mn)){const m=u[i++],f=r.getAttribute(p).split(gt),b=/([.?@])?(.*)/.exec(m);d.push({type:1,index:a,name:b[2],strings:f,ctor:b[1]==="."?Qo:b[1]==="?"?Zo:b[1]==="@"?Jo:be}),r.removeAttribute(p)}else p.startsWith(gt)&&(d.push({type:6,index:a}),r.removeAttribute(p));if(Fn.test(r.tagName)){const p=r.textContent.split(gt),m=p.length-1;if(m>0){r.textContent=ce?ce.emptyScript:"";for(let f=0;f<m;f++)r.append(p[f],Yt()),Ot.nextNode(),d.push({type:2,index:++a});r.append(p[m],Yt())}}}else if(r.nodeType===8)if(r.data===Vn)d.push({type:2,index:a});else{let p=-1;for(;(p=r.data.indexOf(gt,p+1))!==-1;)d.push({type:7,index:a}),p+=gt.length-1}a++}}static createElement(e,n){const o=Lt.createElement("template");return o.innerHTML=e,o}}function It(t,e,n=t,o){if(e===K)return e;let r=o!==void 0?n._$Co?.[o]:n._$Cl;const a=Gt(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(t),r._$AT(t,n,o)),o!==void 0?(n._$Co??=[])[o]=r:n._$Cl=r),r!==void 0&&(e=It(t,r._$AS(t,e.values),r,o)),e}class Go{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:o}=this._$AD,r=(e?.creationScope??Lt).importNode(n,!0);Ot.currentNode=r;let a=Ot.nextNode(),i=0,c=0,d=o[0];for(;d!==void 0;){if(i===d.index){let h;d.type===2?h=new te(a,a.nextSibling,this,e):d.type===1?h=new d.ctor(a,d.name,d.strings,this,e):d.type===6&&(h=new tr(a,this,e)),this._$AV.push(h),d=o[++c]}i!==d?.index&&(a=Ot.nextNode(),i++)}return Ot.currentNode=Lt,r}p(e){let n=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,n),n+=o.strings.length-2):o._$AI(e[n])),n++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,o,r){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=It(this,e,n),Gt(e)?e===O||e==null||e===""?(this._$AH!==O&&this._$AR(),this._$AH=O):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ko(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==O&&Gt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Lt.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Qt.createElement(Nn(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(n);else{const a=new Go(r,this),i=a.u(this.options);a.p(n),this.T(i),this._$AH=a}}_$AC(e){let n=gn.get(e.strings);return n===void 0&&gn.set(e.strings,n=new Qt(e)),n}k(e){Ze(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let o,r=0;for(const a of e)r===n.length?n.push(o=new te(this.O(Yt()),this.O(Yt()),this,this.options)):o=n[r],o._$AI(a),r++;r<n.length&&(this._$AR(o&&o._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class be{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,o,r,a){this.type=1,this._$AH=O,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=O}_$AI(e,n=this,o,r){const a=this.strings;let i=!1;if(a===void 0)e=It(this,e,n,0),i=!Gt(e)||e!==this._$AH&&e!==K,i&&(this._$AH=e);else{const c=e;let d,h;for(e=a[0],d=0;d<a.length-1;d++)h=It(this,c[o+d],n,d),h===K&&(h=this._$AH[d]),i||=!Gt(h)||h!==this._$AH[d],h===O?e=O:e!==O&&(e+=(h??"")+a[d+1]),this._$AH[d]=h}i&&!r&&this.j(e)}j(e){e===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Qo extends be{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===O?void 0:e}}class Zo extends be{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==O)}}class Jo extends be{constructor(e,n,o,r,a){super(e,n,o,r,a),this.type=5}_$AI(e,n=this){if((e=It(this,e,n,0)??O)===K)return;const o=this._$AH,r=e===O&&o!==O||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==O&&(o===O||r);r&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class tr{constructor(e,n,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){It(this,e)}}const er=Qe.litHtmlPolyfillSupport;er?.(Qt,te),(Qe.litHtmlVersions??=[]).push("3.3.1");const nr=(t,e,n)=>{const o=n?.renderBefore??e;let r=o._$litPart$;if(r===void 0){const a=n?.renderBefore??null;o._$litPart$=r=new te(e.insertBefore(Yt(),a),a,void 0,n??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Je=globalThis;let Xt=class extends Pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};Xt._$litElement$=!0,Xt.finalized=!0,Je.litElementHydrateSupport?.({LitElement:Xt});const or=Je.litElementPolyfillSupport;or?.({LitElement:Xt});(Je.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rr=!1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=t=>(e,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ar={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:Ge},ir=(t=ar,e,n)=>{const{kind:o,metadata:r}=n;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(n.name,t),o==="accessor"){const{name:i}=n;return{set(c){const d=e.get.call(this);e.set.call(this,c),this.requestUpdate(i,d,t)},init(c){return c!==void 0&&this.C(i,void 0,t,c),c}}}if(o==="setter"){const{name:i}=n;return function(c){const d=this[i];e.call(this,c),this.requestUpdate(i,d,t)}}throw Error("Unsupported decorator location: "+o)};function l(t){return(e,n)=>typeof n=="object"?ir(t,e,n):((o,r,a)=>{const i=r.hasOwnProperty(a);return r.constructor.createProperty(a,o),i?Object.getOwnPropertyDescriptor(r,a):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const sr=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(t,e){return(n,o,r)=>{const a=i=>i.renderRoot?.querySelector(t)??null;return sr(n,o,{get(){return a(this)}})}}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var lr=`:host {
  box-sizing: border-box !important;
}

:host *,
:host *::before,
:host *::after {
  box-sizing: inherit !important;
}

[hidden] {
  display: none !important;
}
`,ie,D=class extends Xt{constructor(){super(),Do(this,ie,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{if(this.internals?.states)try{n?this.internals.states.add(e):this.internals.states.delete(e)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[lr,...t].map(e=>typeof e=="string"?Bn(e):e)}attributeChangedCallback(t,e,n){Po(this,ie)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),Ro(this,ie,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};ie=new WeakMap;s([l()],D.prototype,"dir",2);s([l()],D.prototype,"lang",2);s([l({type:Boolean,reflect:!0,attribute:"did-ssr"})],D.prototype,"didSSR",2);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var cr=`:host {
  --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375em 0.625em;
  color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
  font-size: max(var(--wa-font-size-2xs), 0.75em);
  font-weight: var(--wa-font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  border-color: transparent;
  border-radius: var(--wa-border-radius-s);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
  user-select: none;
  -webkit-user-select: none;
  cursor: inherit;
}

/* Appearance modifiers */
:host([appearance='outlined']) {
  --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

  color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
  background-color: transparent;
  border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
}

:host([appearance='filled']) {
  --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

  color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
  background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
  border-color: transparent;
}

:host([appearance='filled-outlined']) {
  --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

  color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
  background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
  border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
}

:host([appearance='accent']) {
  --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

  color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
  background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  border-color: transparent;
}

/* Pill modifier */
:host([pill]) {
  border-radius: var(--wa-border-radius-pill);
}

/* Pulse attention */
:host([attention='pulse']) {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--pulse-color);
  }
  70% {
    box-shadow: 0 0 0 0.5rem transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

/* Bounce attention */
:host([attention='bounce']) {
  animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

::slotted(wa-icon) {
  margin-inline-end: var(--wa-space-2xs, 0.25em);
  opacity: 90%;
  line-height: 1;
  height: 0.85em;
}
`,zt=class extends D{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return g` <slot part="base" role="status"></slot>`}};zt.css=[Jt,cr];s([l({reflect:!0})],zt.prototype,"variant",2);s([l({reflect:!0})],zt.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],zt.prototype,"pill",2);s([l({reflect:!0})],zt.prototype,"attention",2);zt=s([P("wa-badge")],zt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Un=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let o=!0;if("checkValidity"in e&&(o=e.checkValidity()),o)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const r in e.validity){if(r==="valid")continue;const a=r;e.validity[a]&&n.invalidKeys.push(a)}return n}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Hn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},dr=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),F=class extends D{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Hn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[dr()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const o of e)n.append(this.name,o);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,n,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let o="";for(const r of t){const{isValid:a,message:i,invalidKeys:c}=r.checkValidity(this);a||(o||(o=i),c?.length>=0&&c.forEach(d=>e[d]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,n)}};F.formAssociated=!0;s([l({reflect:!0})],F.prototype,"name",2);s([l({type:Boolean})],F.prototype,"disabled",2);s([l({state:!0,attribute:!1})],F.prototype,"valueHasChanged",2);s([l({state:!0,attribute:!1})],F.prototype,"hasInteracted",2);s([l({attribute:"custom-error",reflect:!0})],F.prototype,"customError",2);s([l({attribute:!1,state:!0,type:Object})],F.prototype,"validity",1);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ct=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const o=n.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var $t=`@layer wa-utilities {
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
}
`;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function W(t,e){const n={waitUntilFirstUpdate:!1,...e};return(o,r)=>{const{update:a}=o,i=Array.isArray(t)?t:[t];o.update=function(c){i.forEach(d=>{const h=d;if(c.has(h)){const u=c.get(h),p=this[h];u!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](u,p)}}),a.call(this,c)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},tn=t=>(...e)=>({_$litDirective$:t,values:e});let en=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,o){this._$Ct=e,this._$AM=n,this._$Ci=o}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=tn(class extends en{constructor(t){if(super(t),t.type!==wt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}const n=t.element.classList;for(const o of this.st)o in e||(n.remove(o),this.st.delete(o));for(const o in e){const r=!!e[o];r===this.st.has(o)||this.nt?.has(o)||(r?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return K}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>t??O;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wn=Symbol.for(""),ur=t=>{if(t?.r===Wn)return t?._$litStatic$},vn=(t,...e)=>({_$litStatic$:e.reduce(((n,o,r)=>n+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[r+1]),t[0]),r:Wn}),yn=new Map,hr=t=>(e,...n)=>{const o=n.length;let r,a;const i=[],c=[];let d,h=0,u=!1;for(;h<o;){for(d=e[h];h<o&&(a=n[h],(r=ur(a))!==void 0);)d+=r+e[++h],u=!0;h!==o&&c.push(a),i.push(d),h++}if(h===o&&i.push(e[o]),u){const p=i.join("$$lit$$");(e=yn.get(p))===void 0&&(i.raw=i,yn.set(p,e=i)),n=c}return t(e,...n)},Oe=hr(g);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var pr=`@layer wa-component {
  :host {
    display: inline-block;

    /* Workaround because Chrome doesn't like :host(:has()) below
     * https://issues.chromium.org/issues/40062355
     * Firefox doesn't like this nested rule, so both are needed */
    &:has(wa-badge) {
      position: relative;
    }
  }

  /* Apply relative positioning only when needed to position wa-badge
   * This avoids creating a new stacking context for every button */
  :host(:has(wa-badge)) {
    position: relative;
  }
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  vertical-align: middle;
  transition-property: background, border, box-shadow, color;
  transition-duration: var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);
  cursor: pointer;
  padding: 0 var(--wa-form-control-padding-inline);
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--wa-font-weight-action);
  line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
  height: var(--wa-form-control-height);
  width: 100%;

  background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
  border-color: transparent;
  color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
}

/* Appearance modifiers */
:host([appearance='plain']) {
  .button {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance='outlined']) {
  .button {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance='filled']) {
  .button {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-hover)
      );
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance='filled-outlined']) {
  .button {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-hover)
      );
    }
  }
  .button:not(.disabled):not(.loading):active {
    color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
      var(--wa-color-mix-active)
    );
  }
}

:host([appearance='accent']) {
  .button {
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
  }
  @media (hover: hover) {
    .button:not(.disabled):not(.loading):hover {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-hover)
      );
    }
  }
  .button:not(.disabled):not(.loading):active {
    background-color: color-mix(
      in oklab,
      var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
      var(--wa-color-mix-active)
    );
  }
}

/* Focus states */
.button:focus {
  outline: none;
}

.button:focus-visible {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled state */
.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* When disabled, prevent mouse events from bubbling up from children */
.button.disabled * {
  pointer-events: none;
}

/* Keep it last so Safari doesn't stop parsing this block */
.button::-moz-focus-inner {
  border: 0;
}

/* Icon buttons */
.button.is-icon-button {
  outline-offset: 2px;
  width: var(--wa-form-control-height);
  aspect-ratio: 1;
}

.button.is-icon-button:has(wa-icon) {
  width: auto;
}

/* Pill modifier */
:host([pill]) .button {
  border-radius: var(--wa-border-radius-pill);
}

/*
 * Label
 */

.start,
.end {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.label {
  display: inline-block;
}

.is-icon-button .label {
  display: flex;
}

.label::slotted(wa-icon) {
  align-self: center;
}

/*
 * Caret modifier
 */

wa-icon[part='caret'] {
  display: flex;
  align-self: center;
  align-items: center;

  &::part(svg) {
    width: 0.875em;
    height: 0.875em;
  }

  .button:has(&) .end {
    display: none;
  }
}

/*
 * Loading modifier
 */

.loading {
  position: relative;
  cursor: wait;

  .start,
  .label,
  .end,
  .caret {
    visibility: hidden;
  }

  wa-spinner {
    --indicator-color: currentColor;
    --track-color: color-mix(in oklab, currentColor, transparent 90%);

    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }
}

/*
 * Badges
 */

.button ::slotted(wa-badge) {
  border-color: var(--wa-color-surface-default);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  translate: 50% -50%;
  pointer-events: none;
}

:host(:dir(rtl)) ::slotted(wa-badge) {
  translate: -50% -50%;
}

/*
* Button spacing
*/

slot[name='start']::slotted(*) {
  margin-inline-end: 0.75em;
}

slot[name='end']::slotted(*),
.button:not(.visually-hidden-label) [part='caret'] {
  margin-inline-start: 0.75em;
}

/*
 * Button group border radius modifications
 */

/* Remove border radius from all grouped buttons by default */
:host(.wa-button-group__button) .button {
  border-radius: 0;
}

/* Horizontal orientation */
:host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-form-control-border-radius);
  border-end-start-radius: var(--wa-form-control-border-radius);
}

:host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
  border-start-end-radius: var(--wa-form-control-border-radius);
  border-end-end-radius: var(--wa-form-control-border-radius);
}

/* Vertical orientation */
:host(.wa-button-group__vertical) {
  flex: 1 1 auto;
}

:host(.wa-button-group__vertical) .button {
  width: 100%;
  justify-content: start;
}

:host(.wa-button-group__vertical.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-form-control-border-radius);
  border-start-end-radius: var(--wa-form-control-border-radius);
}

:host(.wa-button-group__vertical.wa-button-group__button-last) .button {
  border-end-start-radius: var(--wa-form-control-border-radius);
  border-end-end-radius: var(--wa-form-control-border-radius);
}

/* Handle pill modifier for button groups */
:host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-border-radius-pill);
  border-end-start-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
  border-start-end-radius: var(--wa-border-radius-pill);
  border-end-end-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
  border-start-start-radius: var(--wa-border-radius-pill);
  border-start-end-radius: var(--wa-border-radius-pill);
}

:host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
  border-end-start-radius: var(--wa-border-radius-pill);
  border-end-end-radius: var(--wa-border-radius-pill);
}
`,C=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Ct(this,"[default]","start","end"),this.localize=new it(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,Un()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new Hn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,o=!1,r=!1;[...t].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){const i=a;i.localName==="wa-icon"?(n=!0,e||(e=i.label!==void 0)):r=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(o=!0)}),this.isIconButton=n&&!o&&!r,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?vn`a`:vn`button`;return Oe`
      <${e}
        part="base"
        class=${Q({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${A(t?void 0:this.disabled)}
        type=${A(t?void 0:this.type)}
        title=${this.title}
        name=${A(t?void 0:this.name)}
        value=${A(t?void 0:this.value)}
        href=${A(t?this.href:void 0)}
        target=${A(t?this.target:void 0)}
        download=${A(t?this.download:void 0)}
        rel=${A(t&&this.rel?this.rel:void 0)}
        role=${A(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Oe`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Oe`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};C.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};C.css=[pr,Jt,$t];s([z(".button")],C.prototype,"button",2);s([z("slot:not([name])")],C.prototype,"labelSlot",2);s([H()],C.prototype,"invalid",2);s([H()],C.prototype,"isIconButton",2);s([l()],C.prototype,"title",2);s([l({reflect:!0})],C.prototype,"variant",2);s([l({reflect:!0})],C.prototype,"appearance",2);s([l({reflect:!0})],C.prototype,"size",2);s([l({attribute:"with-caret",type:Boolean,reflect:!0})],C.prototype,"withCaret",2);s([l({type:Boolean})],C.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],C.prototype,"loading",2);s([l({type:Boolean,reflect:!0})],C.prototype,"pill",2);s([l()],C.prototype,"type",2);s([l({reflect:!0})],C.prototype,"name",2);s([l({reflect:!0})],C.prototype,"value",2);s([l({reflect:!0})],C.prototype,"href",2);s([l()],C.prototype,"target",2);s([l()],C.prototype,"rel",2);s([l()],C.prototype,"download",2);s([l({reflect:!0})],C.prototype,"form",2);s([l({attribute:"formaction"})],C.prototype,"formAction",2);s([l({attribute:"formenctype"})],C.prototype,"formEnctype",2);s([l({attribute:"formmethod"})],C.prototype,"formMethod",2);s([l({attribute:"formnovalidate",type:Boolean})],C.prototype,"formNoValidate",2);s([l({attribute:"formtarget"})],C.prototype,"formTarget",2);s([W("disabled",{waitUntilFirstUpdate:!0})],C.prototype,"handleDisabledChange",1);C=s([P("wa-button")],C);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var fr=`:host {
  --track-width: 2px;
  --track-color: var(--wa-color-neutral-fill-normal);
  --indicator-color: var(--wa-color-brand-fill-loud);
  --speed: 2s;

  /* Resizing a spinner element using anything but font-size will break the animation because the animation uses em units.
   Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can grow/shrink and
   break the animation. The use of \`flex: none\` on the host element prevents this by always having the spinner sized
   according to its actual dimensions.
  */
  flex: none;
  display: inline-flex;
  width: 1em;
  height: 1em;
}

svg {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  animation: spin var(--speed) linear infinite;
}

.track {
  stroke: var(--track-color);
}

.indicator {
  stroke: var(--indicator-color);
  stroke-dasharray: 75, 100;
  stroke-dashoffset: -5;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`,Ve=class extends D{constructor(){super(...arguments),this.localize=new it(this)}render(){return g`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};Ve.css=fr;Ve=s([P("wa-spinner")],Ve);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var mr=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const br=(t,e)=>t?._$litType$!==void 0,wr=t=>t.strings===void 0,gr={},vr=(t,e=gr)=>t._$AH=e;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var yr=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},xr=`:host {
  --primary-color: currentColor;
  --primary-opacity: 1;
  --secondary-color: currentColor;
  --secondary-opacity: 0.4;

  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: -0.125em;
}

/* Standard */
:host(:not([auto-width])) {
  width: 1.25em;
  height: 1em;
}

/* Auto-width */
:host([auto-width]) {
  width: auto;
  height: 1em;
}

svg {
  height: 1em;
  fill: currentColor;
  overflow: visible;

  /* Duotone colors with path-specific opacity fallback */
  path[data-duotone-primary] {
    color: var(--primary-color);
    opacity: var(--path-opacity, var(--primary-opacity));
  }

  path[data-duotone-secondary] {
    color: var(--secondary-color);
    opacity: var(--path-opacity, var(--secondary-opacity));
  }
}
`,Ht=Symbol(),ne=Symbol(),Le,ze=new Map,V=class extends D{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=g`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(o,this),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?Ht:ne}catch{return ne}try{const o=document.createElement("div");o.innerHTML=await n.text();const r=o.firstElementChild;if(r?.tagName?.toLowerCase()!=="svg")return Ht;Le||(Le=new DOMParser);const i=Le.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Ht}catch{return Ht}}}connectedCallback(){super.connectedCallback(),_o(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Oo(this)}getIconSource(){const t=Ae(this.library),e=this.family||Lo();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?Ae(this.library):void 0;if(!t){this.svg=null;return}let o=ze.get(t);o||(o=this.resolveIcon(t,n),ze.set(t,o));const r=await o;if(r===ne&&ze.delete(t),t===this.getIconSource().url){if(br(r)){this.svg=r;return}switch(r){case ne:case Ht:this.svg=null,this.dispatchEvent(new yr);break;default:this.svg=r.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new mr)}}}updated(t){super.updated(t);const e=Ae(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:g`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};V.css=xr;s([H()],V.prototype,"svg",2);s([l({reflect:!0})],V.prototype,"name",2);s([l({reflect:!0})],V.prototype,"family",2);s([l({reflect:!0})],V.prototype,"variant",2);s([l({attribute:"auto-width",type:Boolean,reflect:!0})],V.prototype,"autoWidth",2);s([l({attribute:"swap-opacity",type:Boolean,reflect:!0})],V.prototype,"swapOpacity",2);s([l()],V.prototype,"src",2);s([l()],V.prototype,"label",2);s([l({reflect:!0})],V.prototype,"library",2);s([W("label")],V.prototype,"handleLabelChange",1);s([W(["family","name","library","variant","src","autoWidth","swapOpacity"])],V.prototype,"setIcon",1);V=s([P("wa-icon")],V);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var kr=`:host {
  display: inline-flex;
}

.button-group {
  display: flex;
  position: relative;
  isolation: isolate;
  flex-wrap: wrap;
  gap: 1px;

  @media (hover: hover) {
    > :hover,
    &::slotted(:hover) {
      z-index: 1;
    }
  }

  /* Focus and checked are always on top */
  > :focus,
  &::slotted(:focus),
  > [aria-checked='true'],
  &::slotted([aria-checked='true']),
  > [checked],
  &::slotted([checked]) {
    z-index: 2 !important;
  }
}
:host([orientation='vertical']) .button-group {
  flex-direction: column;
}

/* Button groups with at least one outlined button will not have a gap and instead have borders overlap */
.button-group.has-outlined {
  gap: 0;

  &:not([aria-orientation='vertical']):not(.button-group-vertical)::slotted(:not(:first-child)) {
    margin-inline-start: calc(-1 * var(--border-width));
  }

  &:is([aria-orientation='vertical'], .button-group-vertical)::slotted(:not(:first-child)) {
    margin-block-start: calc(-1 * var(--border-width));
  }
}
`,ht=class extends D{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal",this.variant="neutral"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){Wt(t.target)?.classList.add("button-focus")}handleBlur(t){Wt(t.target)?.classList.remove("button-focus")}handleMouseOver(t){Wt(t.target)?.classList.add("button-hover")}handleMouseOut(t){Wt(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const n=t.indexOf(e),o=Wt(e);o&&(o.appearance==="outlined"&&(this.hasOutlined=!0),o.classList.add("wa-button-group__button"),o.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),o.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),o.classList.toggle("wa-button-group__button-first",n===0),o.classList.toggle("wa-button-group__button-inner",n>0&&n<t.length-1),o.classList.toggle("wa-button-group__button-last",n===t.length-1),o.classList.toggle("wa-button-group__button-radio",o.tagName.toLowerCase()==="wa-radio-button"))})}render(){return g`
      <slot
        part="base"
        class=${Q({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};ht.css=[Jt,kr];s([z("slot")],ht.prototype,"defaultSlot",2);s([H()],ht.prototype,"disableRole",2);s([H()],ht.prototype,"hasOutlined",2);s([l()],ht.prototype,"label",2);s([l({reflect:!0})],ht.prototype,"orientation",2);s([l({reflect:!0})],ht.prototype,"variant",2);ht=s([P("wa-button-group")],ht);function Wt(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Sr=`:host {
  display: flex;
  position: relative;
  align-items: stretch;
  border-radius: var(--wa-panel-border-radius);
  background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
  border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  border-style: var(--wa-panel-border-style);
  border-width: var(--wa-panel-border-width);
  color: var(--wa-color-text-normal);
  padding: 1em;
}

/* Appearance modifiers */
:host([appearance~='plain']) {
  background-color: transparent;
  border-color: transparent;
}

:host([appearance~='outlined']) {
  background-color: transparent;
  border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
}

:host([appearance~='filled']) {
  background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
  border-color: transparent;
}

:host([appearance~='filled-outlined']) {
  border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
}

:host([appearance~='accent']) {
  color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
  background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  border-color: transparent;

  [part~='icon'] {
    color: currentColor;
  }
}

[part~='icon'] {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: var(--wa-color-on-quiet);
  font-size: 1.25em;
}

::slotted([slot='icon']) {
  margin-inline-end: var(--wa-form-control-padding-inline);
}

[part~='message'] {
  flex: 1 1 auto;
  display: block;
  overflow: hidden;
}
`,qt=class extends D{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return g`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};qt.css=[Sr,Jt,$t];s([l({reflect:!0})],qt.prototype,"variant",2);s([l({reflect:!0})],qt.prototype,"appearance",2);s([l({reflect:!0})],qt.prototype,"size",2);qt=s([P("wa-callout")],qt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Cr=`:host {
  --spacing: var(--wa-space-l);

  /* Internal calculated properties */
  --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

  display: flex;
  flex-direction: column;
  background-color: var(--wa-color-surface-default);
  border-color: var(--wa-color-surface-border);
  border-radius: var(--wa-panel-border-radius);
  border-style: var(--wa-panel-border-style);
  box-shadow: var(--wa-shadow-s);
  border-width: var(--wa-panel-border-width);
  color: var(--wa-color-text-normal);
}

/* Appearance modifiers */
:host([appearance~='plain']) {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}

:host([appearance~='outlined']) {
  background-color: var(--wa-color-surface-default);
  border-color: var(--wa-color-surface-border);
}

:host([appearance~='filled']) {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: transparent;
}

:host([appearance~='filled'][appearance~='outlined']) {
  border-color: var(--wa-color-neutral-border-quiet);
}

:host([appearance~='accent']) {
  color: var(--wa-color-neutral-on-loud);
  background-color: var(--wa-color-neutral-fill-loud);
  border-color: transparent;
}

/* Take care of top and bottom radii */
.media,
:host(:not([with-media])) .header,
:host(:not([with-media], [with-header])) .body {
  border-start-start-radius: var(--inner-border-radius);
  border-start-end-radius: var(--inner-border-radius);
}

:host(:not([with-footer])) .body,
.footer {
  border-end-start-radius: var(--inner-border-radius);
  border-end-end-radius: var(--inner-border-radius);
}

.media {
  display: flex;
  overflow: hidden;

  &::slotted(*) {
    display: block;
    width: 100%;
    border-radius: 0 !important;
  }
}

/* Round all corners for plain appearance */
:host([appearance='plain']) .media {
  border-radius: var(--inner-border-radius);

  &::slotted(*) {
    border-radius: inherit !important;
  }
}

.header {
  display: block;
  border-block-end-style: inherit;
  border-block-end-color: var(--wa-color-surface-border);
  border-block-end-width: var(--wa-panel-border-width);
  padding: calc(var(--spacing) / 2) var(--spacing);
}

.body {
  display: block;
  padding: var(--spacing);
}

.footer {
  display: block;
  border-block-start-style: inherit;
  border-block-start-color: var(--wa-color-surface-border);
  border-block-start-width: var(--wa-panel-border-width);
  padding: var(--spacing);
}

/* Push slots to sides when the action slots renders */
.has-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:host(:not([with-header])) .header,
:host(:not([with-footer])) .footer,
:host(:not([with-media])) .media {
  display: none;
}

/* Orientation Styles */
:host([orientation='horizontal']) {
  flex-direction: row;

  .media {
    border-start-start-radius: var(--inner-border-radius);
    border-end-start-radius: var(--inner-border-radius);
    border-start-end-radius: 0;

    &::slotted(*) {
      block-size: 100%;
      inline-size: 100%;
      object-fit: cover;
    }
  }
}

:host([orientation='horizontal']) ::slotted([slot='body']) {
  display: block;
  height: 100%;
  margin: 0;
}

:host([orientation='horizontal']) ::slotted([slot='actions']) {
  display: flex;
  align-items: center;
  padding: var(--spacing);
}
`,vt=class extends D{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"footer","header","media"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?g`
        <slot name="media" part="media" class="media"></slot>
        <slot part="body" class="body"></slot>
        <slot name="actions" part="actions" class="actions"></slot>
      `:g`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?g` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:g` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <slot part="body" class="body"></slot>
      ${this.hasSlotController.test("footer-actions")?g` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:g` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};vt.css=[$t,Cr];s([l({reflect:!0})],vt.prototype,"appearance",2);s([l({attribute:"with-header",type:Boolean,reflect:!0})],vt.prototype,"withHeader",2);s([l({attribute:"with-media",type:Boolean,reflect:!0})],vt.prototype,"withMedia",2);s([l({attribute:"with-footer",type:Boolean,reflect:!0})],vt.prototype,"withFooter",2);s([l({reflect:!0})],vt.prototype,"orientation",2);vt=s([P("wa-card")],vt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var jn=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const o={observedAttributes:["required"],message:e.validationMessage,checkValidity(r){const a={message:"",isValid:!0,invalidKeys:[]};return(r.required??r.hasAttribute("required"))&&!r[n]&&(a.message=typeof o.message=="function"?o.message(r):o.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return o};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var nn=`:host {
  display: flex;
  flex-direction: column;
}

/* Label */
:is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
  display: inline-flex;
  color: var(--wa-form-control-label-color);
  font-weight: var(--wa-form-control-label-font-weight);
  line-height: var(--wa-form-control-label-line-height);
  margin-block-end: 0.5em;
}

:host([required]) :is([part~='form-control-label'], [part~='label'])::after {
  content: var(--wa-form-control-required-content);
  margin-inline-start: var(--wa-form-control-required-content-offset);
  color: var(--wa-form-control-required-content-color);
}

/* Help text */
[part~='hint'] {
  display: block;
  color: var(--wa-form-control-hint-color);
  font-weight: var(--wa-form-control-hint-font-weight);
  line-height: var(--wa-form-control-hint-line-height);
  margin-block-start: 0.5em;
  font-size: var(--wa-font-size-smaller);
  line-height: var(--wa-form-control-label-line-height);

  &:not(.has-slotted) {
    display: none;
  }
}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe=tn(class extends en{constructor(t){if(super(t),t.type!==wt.PROPERTY&&t.type!==wt.ATTRIBUTE&&t.type!==wt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===K||e===O)return e;const n=t.element,o=t.name;if(t.type===wt.PROPERTY){if(e===n[o])return K}else if(t.type===wt.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(o))return K}else if(t.type===wt.ATTRIBUTE&&n.getAttribute(o)===e+"")return K;return vr(t),e}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var $r=`:host {
  --checked-icon-color: var(--wa-color-brand-on-loud);
  --checked-icon-scale: 0.8;

  display: inline-flex;
  color: var(--wa-form-control-value-color);
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  user-select: none;
  -webkit-user-select: none;
}

[part~='control'] {
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
  align-items: center;
  justify-content: center;
  width: var(--wa-form-control-toggle-size);
  height: var(--wa-form-control-toggle-size);
  border-color: var(--wa-form-control-border-color);
  border-radius: min(
    calc(var(--wa-form-control-toggle-size) * 0.375),
    var(--wa-border-radius-s)
  ); /* min prevents entirely circular checkbox */
  border-style: var(--wa-border-style);
  border-width: var(--wa-form-control-border-width);
  background-color: var(--wa-form-control-background-color);
  transition:
    background var(--wa-transition-normal),
    border-color var(--wa-transition-fast),
    box-shadow var(--wa-transition-fast),
    color var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);

  margin-inline-end: 0.5em;
}

[part~='base'] {
  display: flex;
  align-items: flex-start;
  position: relative;
  color: currentColor;
  vertical-align: middle;
  cursor: pointer;
}

[part~='label'] {
  display: inline;
}

/* Checked */
[part~='control']:has(:checked, :indeterminate) {
  color: var(--checked-icon-color);
  border-color: var(--wa-form-control-activated-color);
  background-color: var(--wa-form-control-activated-color);
}

/* Focus */
[part~='control']:has(> input:focus-visible:not(:disabled)) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled */
:host [part~='base']:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  position: absolute;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  pointer-events: none;
}

[part~='icon'] {
  display: flex;
  scale: var(--checked-icon-scale);

  /* Without this, Safari renders the icon slightly to the left */
  &::part(svg) {
    translate: 0.0009765625em;
  }

  input:not(:checked, :indeterminate) + & {
    visibility: hidden;
  }
}

:host([required]) [part~='label']::after {
  content: var(--wa-form-control-required-content);
  color: var(--wa-form-control-required-content-color);
  margin-inline-start: var(--wa-form-control-required-content-offset);
}
`,L=class extends F{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[jn({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,o=n?"indeterminate":"check",r=n?"indeterminate":"check";return g`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${A(this._value)}
            .indeterminate=${Fe(this.indeterminate)}
            .checked=${Fe(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${r}-icon icon" library="system" name=${o}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${Q({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};L.css=[nn,$t,$r];L.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};s([z('input[type="checkbox"]')],L.prototype,"input",2);s([l()],L.prototype,"title",2);s([l({reflect:!0})],L.prototype,"name",2);s([l({reflect:!0})],L.prototype,"value",1);s([l({reflect:!0})],L.prototype,"size",2);s([l({type:Boolean})],L.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],L.prototype,"indeterminate",2);s([l({type:Boolean,attribute:!1})],L.prototype,"checked",2);s([l({type:Boolean,reflect:!0,attribute:"checked"})],L.prototype,"defaultChecked",2);s([l({reflect:!0})],L.prototype,"form",2);s([l({type:Boolean,reflect:!0})],L.prototype,"required",2);s([l()],L.prototype,"hint",2);s([W("defaultChecked")],L.prototype,"handleDefaultCheckedChange",1);s([W(["checked","indeterminate"])],L.prototype,"handleStateChange",1);s([W("disabled")],L.prototype,"handleDisabledChange",1);L=s([P("wa-checkbox")],L);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Er(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Ne=new Set;function Ar(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function _r(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function de(t){if(Ne.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const e=Ar()+_r();let n=getComputedStyle(document.documentElement).scrollbarGutter;(!n||n==="auto")&&(n="stable"),e<2&&(n=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",n),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function ue(t){Ne.delete(t),Ne.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function Or(t,e,n="vertical",o="smooth"){const r=Er(t,e),a=r.top+e.scrollTop,i=r.left+e.scrollLeft,c=e.scrollLeft,d=e.scrollLeft+e.offsetWidth,h=e.scrollTop,u=e.scrollTop+e.offsetHeight;(n==="horizontal"||n==="both")&&(i<c?e.scrollTo({left:i,behavior:o}):i+t.clientWidth>d&&e.scrollTo({left:i-e.offsetWidth+t.clientWidth,behavior:o})),(n==="vertical"||n==="both")&&(a<h?e.scrollTo({top:a,behavior:o}):a+t.clientHeight>u&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:o}))}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Kn(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var we=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},ge=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},ve=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},ye=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function B(t,e){return new Promise(n=>{const o=new AbortController,{signal:r}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let a=()=>{t.classList.remove(e),n(),o.abort()};t.addEventListener("animationend",a,{once:!0,signal:r}),t.addEventListener("animationcancel",a,{once:!0,signal:r})})}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Lr=`:host {
  --width: 31rem;
  --spacing: var(--wa-space-l);
  --show-duration: 200ms;
  --hide-duration: 200ms;

  display: none;
}

:host([open]) {
  display: block;
}

.dialog {
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: var(--width);
  max-width: calc(100% - var(--wa-space-2xl));
  max-height: calc(100% - var(--wa-space-2xl));
  background-color: var(--wa-color-surface-raised);
  border-radius: var(--wa-panel-border-radius);
  border: none;
  box-shadow: var(--wa-shadow-l);
  padding: 0;
  margin: auto;

  &.show {
    animation: show-dialog var(--show-duration) ease;

    &::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }
  }

  &.hide {
    animation: show-dialog var(--hide-duration) ease reverse;

    &::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }
  }

  &.pulse {
    animation: pulse 250ms ease;
  }
}

.dialog:focus {
  outline: none;
}

/* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
@media screen and (max-width: 420px) {
  .dialog {
    max-height: 80vh;
  }
}

.open {
  display: flex;
  opacity: 1;
}

.header {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: nowrap;

  padding-inline-start: var(--spacing);
  padding-block-end: 0;

  /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
  padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
  padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
}

.title {
  align-self: center;
  flex: 1 1 auto;
  font-family: inherit;
  font-size: var(--wa-font-size-l);
  font-weight: var(--wa-font-weight-heading);
  line-height: var(--wa-line-height-condensed);
  margin: 0;
}

.header-actions {
  align-self: start;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--wa-space-2xs);
  padding-inline-start: var(--spacing);
}

.header-actions wa-button,
.header-actions ::slotted(wa-button) {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.body {
  flex: 1 1 auto;
  display: block;
  padding: var(--spacing);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }
}

.footer {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: var(--wa-space-xs);
  justify-content: end;
  padding: var(--spacing);
  padding-block-start: 0;
}

.footer ::slotted(wa-button:not(:first-of-type)) {
  margin-inline-start: var(--wa-spacing-xs);
}

.dialog::backdrop {
  /*
    NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
    remove the fallback values here.
  */
  background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
}

@keyframes pulse {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.02;
  }
  100% {
    scale: 1;
  }
}

@keyframes show-dialog {
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (forced-colors: active) {
  .dialog {
    border: solid 1px white;
  }
}
`,pt=class extends D{constructor(){super(...arguments),this.localize=new it(this),this.hasSlotController=new Ct(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),de(this))}disconnectedCallback(){super.disconnectedCallback(),ue(this),this.removeOpenListeners()}async requestClose(t){const e=new ve({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,B(this.dialog,"pulse");return}this.removeOpenListeners(),await B(this.dialog,"hide"),this.open=!1,this.dialog.close(),ue(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new we)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&this.requestClose(this.dialog)}handleDialogClick(t){const n=t.target.closest('[data-dialog="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await B(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new ye;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),de(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await B(this.dialog,"show"),this.dispatchEvent(new ge)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return g`
      <dialog
        part="dialog"
        class=${Q({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?g`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"​"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${n=>this.requestClose(n.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?g`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};pt.css=Lr;s([z(".dialog")],pt.prototype,"dialog",2);s([l({type:Boolean,reflect:!0})],pt.prototype,"open",2);s([l({reflect:!0})],pt.prototype,"label",2);s([l({attribute:"without-header",type:Boolean,reflect:!0})],pt.prototype,"withoutHeader",2);s([l({attribute:"light-dismiss",type:Boolean})],pt.prototype,"lightDismiss",2);s([W("open",{waitUntilFirstUpdate:!0})],pt.prototype,"handleOpenChange",1);pt=s([P("wa-dialog")],pt);document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[n,o]=Kn(e.getAttribute("data-dialog")||"");if(n==="open"&&o?.length){const a=e.getRootNode().getElementById(o);a?.localName==="wa-dialog"?a.open=!0:console.warn(`A dialog with an ID of "${o}" could not be found in this document.`)}}});document.addEventListener("pointerdown",()=>{});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var zr=`:host {
  --color: var(--wa-color-surface-border);
  --width: var(--wa-border-width-s);
  --spacing: var(--wa-space-m);
}

:host(:not([orientation='vertical'])) {
  display: block;
  border-top: solid var(--width) var(--color);
  margin: var(--spacing) 0;
}

:host([orientation='vertical']) {
  display: inline-block;
  height: 100%;
  border-inline-start: solid var(--width) var(--color);
  margin: 0 var(--spacing);
  min-block-size: 1lh;
}
`,Zt=class extends D{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};Zt.css=zr;s([l({reflect:!0})],Zt.prototype,"orientation",2);s([W("orientation")],Zt.prototype,"handleVerticalChange",1);Zt=s([P("wa-divider")],Zt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Tr=`:host {
  --size: 25rem;
  --spacing: var(--wa-space-l);
  --show-duration: 200ms;
  --hide-duration: 200ms;

  display: none;
}

:host([open]) {
  display: block;
}

.drawer {
  display: flex;
  flex-direction: column;
  top: 0;
  inset-inline-start: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  background-color: var(--wa-color-surface-raised);
  border: none;
  box-shadow: var(--wa-shadow-l);
  overflow: auto;
  padding: 0;
  margin: 0;
  animation-duration: var(--show-duration);
  animation-timing-function: ease;

  &.show::backdrop {
    animation: show-backdrop var(--show-duration, 200ms) ease;
  }

  &.hide::backdrop {
    animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
  }

  &.show.top {
    animation: show-drawer-from-top var(--show-duration) ease;
  }

  &.hide.top {
    animation: show-drawer-from-top var(--hide-duration) ease reverse;
  }

  &.show.end {
    animation: show-drawer-from-end var(--show-duration) ease;

    &:dir(rtl) {
      animation-name: show-drawer-from-start;
    }
  }

  &.hide.end {
    animation: show-drawer-from-end var(--hide-duration) ease reverse;

    &:dir(rtl) {
      animation-name: show-drawer-from-start;
    }
  }

  &.show.bottom {
    animation: show-drawer-from-bottom var(--show-duration) ease;
  }

  &.hide.bottom {
    animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
  }

  &.show.start {
    animation: show-drawer-from-start var(--show-duration) ease;

    &:dir(rtl) {
      animation-name: show-drawer-from-end;
    }
  }

  &.hide.start {
    animation: show-drawer-from-start var(--hide-duration) ease reverse;

    &:dir(rtl) {
      animation-name: show-drawer-from-end;
    }
  }

  &.pulse {
    animation: pulse 250ms ease;
  }
}

.drawer:focus {
  outline: none;
}

.top {
  top: 0;
  inset-inline-end: auto;
  bottom: auto;
  inset-inline-start: 0;
  width: 100%;
  height: var(--size);
}

.end {
  top: 0;
  inset-inline-end: 0;
  bottom: auto;
  inset-inline-start: auto;
  width: var(--size);
  height: 100%;
}

.bottom {
  top: auto;
  inset-inline-end: auto;
  bottom: 0;
  inset-inline-start: 0;
  width: 100%;
  height: var(--size);
}

.start {
  top: 0;
  inset-inline-end: auto;
  bottom: auto;
  inset-inline-start: 0;
  width: var(--size);
  height: 100%;
}

.header {
  display: flex;
  flex-wrap: nowrap;
  padding-inline-start: var(--spacing);
  padding-block-end: 0;

  /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
  padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
  padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
}

.title {
  align-self: center;
  flex: 1 1 auto;
  font: inherit;
  font-size: var(--wa-font-size-l);
  font-weight: var(--wa-font-weight-heading);
  line-height: var(--wa-line-height-condensed);
  margin: 0;
}

.header-actions {
  align-self: start;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--wa-space-2xs);
  padding-inline-start: var(--spacing);
}

.header-actions wa-button,
.header-actions ::slotted(wa-button) {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.body {
  flex: 1 1 auto;
  display: block;
  padding: var(--spacing);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }
}

.footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wa-space-xs);
  justify-content: end;
  padding: var(--spacing);
  padding-block-start: 0;
}

.footer ::slotted(wa-button:not(:last-of-type)) {
  margin-inline-end: var(--wa-spacing-xs);
}

.drawer::backdrop {
  /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
  background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
}

@keyframes pulse {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.01;
  }
  100% {
    scale: 1;
  }
}

@keyframes show-drawer {
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

@keyframes show-drawer-from-top {
  from {
    opacity: 0;
    translate: 0 -100%;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes show-drawer-from-end {
  from {
    opacity: 0;
    translate: 100%;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes show-drawer-from-bottom {
  from {
    opacity: 0;
    translate: 0 100%;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes show-drawer-from-start {
  from {
    opacity: 0;
    translate: -100% 0;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (forced-colors: active) {
  .drawer {
    border: solid 1px white;
  }
}
`,rt=class extends D{constructor(){super(...arguments),this.localize=new it(this),this.hasSlotController=new Ct(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),de(this))}disconnectedCallback(){super.disconnectedCallback(),ue(this),this.removeOpenListeners()}async requestClose(t){const e=new ve({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,B(this.drawer,"pulse");return}this.removeOpenListeners(),await B(this.drawer,"hide"),this.open=!1,this.drawer.close(),ue(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new we)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.drawer.classList.contains("hide")&&t.target===this.drawer&&this.requestClose(this.drawer)}handleDialogClick(t){const n=t.target.closest('[data-drawer="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await B(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new ye;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),de(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await B(this.drawer,"show"),this.dispatchEvent(new ge)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return g`
      <dialog
        part="dialog"
        class=${Q({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?g`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"​"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${n=>this.requestClose(n.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?g`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};rt.css=Tr;s([z(".drawer")],rt.prototype,"drawer",2);s([l({type:Boolean,reflect:!0})],rt.prototype,"open",2);s([l({reflect:!0})],rt.prototype,"label",2);s([l({reflect:!0})],rt.prototype,"placement",2);s([l({attribute:"without-header",type:Boolean,reflect:!0})],rt.prototype,"withoutHeader",2);s([l({attribute:"light-dismiss",type:Boolean})],rt.prototype,"lightDismiss",2);s([W("open",{waitUntilFirstUpdate:!0})],rt.prototype,"handleOpenChange",1);rt=s([P("wa-drawer")],rt);document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[n,o]=Kn(e.getAttribute("data-drawer")||"");if(n==="open"&&o?.length){const a=e.getRootNode().getElementById(o);a?.localName==="wa-drawer"?a.open=!0:console.warn(`A drawer with an ID of "${o}" could not be found in this document.`)}}});document.body.addEventListener("pointerdown",()=>{});const Pr="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let Dr=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Pr[n[t]&63];return e};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Rr(t=""){return`${t}${Dr()}`}const yt=Math.min,N=Math.max,he=Math.round,oe=Math.floor,ot=t=>({x:t,y:t}),Ir={left:"right",right:"left",bottom:"top",top:"bottom"},qr={start:"end",end:"start"};function Ue(t,e,n){return N(t,yt(e,n))}function Vt(t,e){return typeof t=="function"?t(e):t}function xt(t){return t.split("-")[0]}function Ft(t){return t.split("-")[1]}function Xn(t){return t==="x"?"y":"x"}function on(t){return t==="y"?"height":"width"}const Br=new Set(["top","bottom"]);function ut(t){return Br.has(xt(t))?"y":"x"}function rn(t){return Xn(ut(t))}function Mr(t,e,n){n===void 0&&(n=!1);const o=Ft(t),r=rn(t),a=on(r);let i=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(i=pe(i)),[i,pe(i)]}function Vr(t){const e=pe(t);return[He(t),e,He(e)]}function He(t){return t.replace(/start|end/g,e=>qr[e])}const xn=["left","right"],kn=["right","left"],Fr=["top","bottom"],Nr=["bottom","top"];function Ur(t,e,n){switch(t){case"top":case"bottom":return n?e?kn:xn:e?xn:kn;case"left":case"right":return e?Fr:Nr;default:return[]}}function Hr(t,e,n,o){const r=Ft(t);let a=Ur(xt(t),n==="start",o);return r&&(a=a.map(i=>i+"-"+r),e&&(a=a.concat(a.map(He)))),a}function pe(t){return t.replace(/left|right|bottom|top/g,e=>Ir[e])}function Wr(t){return{top:0,right:0,bottom:0,left:0,...t}}function Yn(t){return typeof t!="number"?Wr(t):{top:t,right:t,bottom:t,left:t}}function fe(t){const{x:e,y:n,width:o,height:r}=t;return{width:o,height:r,top:n,left:e,right:e+o,bottom:n+r,x:e,y:n}}function Sn(t,e,n){let{reference:o,floating:r}=t;const a=ut(e),i=rn(e),c=on(i),d=xt(e),h=a==="y",u=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2,m=o[c]/2-r[c]/2;let f;switch(d){case"top":f={x:u,y:o.y-r.height};break;case"bottom":f={x:u,y:o.y+o.height};break;case"right":f={x:o.x+o.width,y:p};break;case"left":f={x:o.x-r.width,y:p};break;default:f={x:o.x,y:o.y}}switch(Ft(e)){case"start":f[i]-=m*(n&&h?-1:1);break;case"end":f[i]+=m*(n&&h?-1:1);break}return f}const jr=async(t,e,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:a=[],platform:i}=n,c=a.filter(Boolean),d=await(i.isRTL==null?void 0:i.isRTL(e));let h=await i.getElementRects({reference:t,floating:e,strategy:r}),{x:u,y:p}=Sn(h,o,d),m=o,f={},b=0;for(let w=0;w<c.length;w++){const{name:k,fn:y}=c[w],{x:S,y:E,data:T,reset:_}=await y({x:u,y:p,initialPlacement:o,placement:m,strategy:r,middlewareData:f,rects:h,platform:i,elements:{reference:t,floating:e}});u=S??u,p=E??p,f={...f,[k]:{...f[k],...T}},_&&b<=50&&(b++,typeof _=="object"&&(_.placement&&(m=_.placement),_.rects&&(h=_.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:r}):_.rects),{x:u,y:p}=Sn(h,m,d)),w=-1)}return{x:u,y:p,placement:m,strategy:r,middlewareData:f}};async function an(t,e){var n;e===void 0&&(e={});const{x:o,y:r,platform:a,rects:i,elements:c,strategy:d}=t,{boundary:h="clippingAncestors",rootBoundary:u="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=Vt(e,t),b=Yn(f),k=c[m?p==="floating"?"reference":"floating":p],y=fe(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(k)))==null||n?k:k.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(c.floating)),boundary:h,rootBoundary:u,strategy:d})),S=p==="floating"?{x:o,y:r,width:i.floating.width,height:i.floating.height}:i.reference,E=await(a.getOffsetParent==null?void 0:a.getOffsetParent(c.floating)),T=await(a.isElement==null?void 0:a.isElement(E))?await(a.getScale==null?void 0:a.getScale(E))||{x:1,y:1}:{x:1,y:1},_=fe(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:S,offsetParent:E,strategy:d}):S);return{top:(y.top-_.top+b.top)/T.y,bottom:(_.bottom-y.bottom+b.bottom)/T.y,left:(y.left-_.left+b.left)/T.x,right:(_.right-y.right+b.right)/T.x}}const Kr=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:r,rects:a,platform:i,elements:c,middlewareData:d}=e,{element:h,padding:u=0}=Vt(t,e)||{};if(h==null)return{};const p=Yn(u),m={x:n,y:o},f=rn(r),b=on(f),w=await i.getDimensions(h),k=f==="y",y=k?"top":"left",S=k?"bottom":"right",E=k?"clientHeight":"clientWidth",T=a.reference[b]+a.reference[f]-m[f]-a.floating[b],_=m[f]-a.reference[f],X=await(i.getOffsetParent==null?void 0:i.getOffsetParent(h));let R=X?X[E]:0;(!R||!await(i.isElement==null?void 0:i.isElement(X)))&&(R=c.floating[E]||a.floating[b]);const lt=T/2-_/2,et=R/2-w[b]/2-1,j=yt(p[y],et),ft=yt(p[S],et),nt=j,mt=R-w[b]-ft,I=R/2-w[b]/2+lt,Et=Ue(nt,I,mt),ct=!d.arrow&&Ft(r)!=null&&I!==Et&&a.reference[b]/2-(I<nt?j:ft)-w[b]/2<0,Y=ct?I<nt?I-nt:I-mt:0;return{[f]:m[f]+Y,data:{[f]:Et,centerOffset:I-Et-Y,...ct&&{alignmentOffset:Y}},reset:ct}}}),Xr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:r,middlewareData:a,rects:i,initialPlacement:c,platform:d,elements:h}=e,{mainAxis:u=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:w=!0,...k}=Vt(t,e);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const y=xt(r),S=ut(c),E=xt(c)===c,T=await(d.isRTL==null?void 0:d.isRTL(h.floating)),_=m||(E||!w?[pe(c)]:Vr(c)),X=b!=="none";!m&&X&&_.push(...Hr(c,w,b,T));const R=[c,..._],lt=await an(e,k),et=[];let j=((o=a.flip)==null?void 0:o.overflows)||[];if(u&&et.push(lt[y]),p){const I=Mr(r,i,T);et.push(lt[I[0]],lt[I[1]])}if(j=[...j,{placement:r,overflows:et}],!et.every(I=>I<=0)){var ft,nt;const I=(((ft=a.flip)==null?void 0:ft.index)||0)+1,Et=R[I];if(Et&&(!(p==="alignment"?S!==ut(Et):!1)||j.every(G=>ut(G.placement)===S?G.overflows[0]>0:!0)))return{data:{index:I,overflows:j},reset:{placement:Et}};let ct=(nt=j.filter(Y=>Y.overflows[0]<=0).sort((Y,G)=>Y.overflows[1]-G.overflows[1])[0])==null?void 0:nt.placement;if(!ct)switch(f){case"bestFit":{var mt;const Y=(mt=j.filter(G=>{if(X){const bt=ut(G.placement);return bt===S||bt==="y"}return!0}).map(G=>[G.placement,G.overflows.filter(bt=>bt>0).reduce((bt,ho)=>bt+ho,0)]).sort((G,bt)=>G[1]-bt[1])[0])==null?void 0:mt[0];Y&&(ct=Y);break}case"initialPlacement":ct=c;break}if(r!==ct)return{reset:{placement:ct}}}return{}}}},Yr=new Set(["left","top"]);async function Gr(t,e){const{placement:n,platform:o,elements:r}=t,a=await(o.isRTL==null?void 0:o.isRTL(r.floating)),i=xt(n),c=Ft(n),d=ut(n)==="y",h=Yr.has(i)?-1:1,u=a&&d?-1:1,p=Vt(e,t);let{mainAxis:m,crossAxis:f,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return c&&typeof b=="number"&&(f=c==="end"?b*-1:b),d?{x:f*u,y:m*h}:{x:m*h,y:f*u}}const Qr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:r,y:a,placement:i,middlewareData:c}=e,d=await Gr(e,t);return i===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:r+d.x,y:a+d.y,data:{...d,placement:i}}}}},Zr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:r}=e,{mainAxis:a=!0,crossAxis:i=!1,limiter:c={fn:k=>{let{x:y,y:S}=k;return{x:y,y:S}}},...d}=Vt(t,e),h={x:n,y:o},u=await an(e,d),p=ut(xt(r)),m=Xn(p);let f=h[m],b=h[p];if(a){const k=m==="y"?"top":"left",y=m==="y"?"bottom":"right",S=f+u[k],E=f-u[y];f=Ue(S,f,E)}if(i){const k=p==="y"?"top":"left",y=p==="y"?"bottom":"right",S=b+u[k],E=b-u[y];b=Ue(S,b,E)}const w=c.fn({...e,[m]:f,[p]:b});return{...w,data:{x:w.x-n,y:w.y-o,enabled:{[m]:a,[p]:i}}}}}},Jr=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:r,rects:a,platform:i,elements:c}=e,{apply:d=()=>{},...h}=Vt(t,e),u=await an(e,h),p=xt(r),m=Ft(r),f=ut(r)==="y",{width:b,height:w}=a.floating;let k,y;p==="top"||p==="bottom"?(k=p,y=m===(await(i.isRTL==null?void 0:i.isRTL(c.floating))?"start":"end")?"left":"right"):(y=p,k=m==="end"?"top":"bottom");const S=w-u.top-u.bottom,E=b-u.left-u.right,T=yt(w-u[k],S),_=yt(b-u[y],E),X=!e.middlewareData.shift;let R=T,lt=_;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(lt=E),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(R=S),X&&!m){const j=N(u.left,0),ft=N(u.right,0),nt=N(u.top,0),mt=N(u.bottom,0);f?lt=b-2*(j!==0||ft!==0?j+ft:N(u.left,u.right)):R=w-2*(nt!==0||mt!==0?nt+mt:N(u.top,u.bottom))}await d({...e,availableWidth:lt,availableHeight:R});const et=await i.getDimensions(c.floating);return b!==et.width||w!==et.height?{reset:{rects:!0}}:{}}}};function xe(){return typeof window<"u"}function Nt(t){return Gn(t)?(t.nodeName||"").toLowerCase():"#document"}function U(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function st(t){var e;return(e=(Gn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Gn(t){return xe()?t instanceof Node||t instanceof U(t).Node:!1}function Z(t){return xe()?t instanceof Element||t instanceof U(t).Element:!1}function at(t){return xe()?t instanceof HTMLElement||t instanceof U(t).HTMLElement:!1}function Cn(t){return!xe()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof U(t).ShadowRoot}const ta=new Set(["inline","contents"]);function ee(t){const{overflow:e,overflowX:n,overflowY:o,display:r}=J(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!ta.has(r)}const ea=new Set(["table","td","th"]);function na(t){return ea.has(Nt(t))}const oa=[":popover-open",":modal"];function ke(t){return oa.some(e=>{try{return t.matches(e)}catch{return!1}})}const ra=["transform","translate","scale","rotate","perspective"],aa=["transform","translate","scale","rotate","perspective","filter"],ia=["paint","layout","strict","content"];function Se(t){const e=sn(),n=Z(t)?J(t):t;return ra.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||aa.some(o=>(n.willChange||"").includes(o))||ia.some(o=>(n.contain||"").includes(o))}function sa(t){let e=kt(t);for(;at(e)&&!Bt(e);){if(Se(e))return e;if(ke(e))return null;e=kt(e)}return null}function sn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const la=new Set(["html","body","#document"]);function Bt(t){return la.has(Nt(t))}function J(t){return U(t).getComputedStyle(t)}function Ce(t){return Z(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function kt(t){if(Nt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Cn(t)&&t.host||st(t);return Cn(e)?e.host:e}function Qn(t){const e=kt(t);return Bt(e)?t.ownerDocument?t.ownerDocument.body:t.body:at(e)&&ee(e)?e:Qn(e)}function Mt(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const r=Qn(t),a=r===((o=t.ownerDocument)==null?void 0:o.body),i=U(r);if(a){const c=We(i);return e.concat(i,i.visualViewport||[],ee(r)?r:[],c&&n?Mt(c):[])}return e.concat(r,Mt(r,[],n))}function We(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Zn(t){const e=J(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=at(t),a=r?t.offsetWidth:n,i=r?t.offsetHeight:o,c=he(n)!==a||he(o)!==i;return c&&(n=a,o=i),{width:n,height:o,$:c}}function ln(t){return Z(t)?t:t.contextElement}function Rt(t){const e=ln(t);if(!at(e))return ot(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:a}=Zn(e);let i=(a?he(n.width):n.width)/o,c=(a?he(n.height):n.height)/r;return(!i||!Number.isFinite(i))&&(i=1),(!c||!Number.isFinite(c))&&(c=1),{x:i,y:c}}const ca=ot(0);function Jn(t){const e=U(t);return!sn()||!e.visualViewport?ca:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function da(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==U(t)?!1:e}function Tt(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const r=t.getBoundingClientRect(),a=ln(t);let i=ot(1);e&&(o?Z(o)&&(i=Rt(o)):i=Rt(t));const c=da(a,n,o)?Jn(a):ot(0);let d=(r.left+c.x)/i.x,h=(r.top+c.y)/i.y,u=r.width/i.x,p=r.height/i.y;if(a){const m=U(a),f=o&&Z(o)?U(o):o;let b=m,w=We(b);for(;w&&o&&f!==b;){const k=Rt(w),y=w.getBoundingClientRect(),S=J(w),E=y.left+(w.clientLeft+parseFloat(S.paddingLeft))*k.x,T=y.top+(w.clientTop+parseFloat(S.paddingTop))*k.y;d*=k.x,h*=k.y,u*=k.x,p*=k.y,d+=E,h+=T,b=U(w),w=We(b)}}return fe({width:u,height:p,x:d,y:h})}function $e(t,e){const n=Ce(t).scrollLeft;return e?e.left+n:Tt(st(t)).left+n}function to(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-$e(t,n),r=n.top+e.scrollTop;return{x:o,y:r}}function ua(t){let{elements:e,rect:n,offsetParent:o,strategy:r}=t;const a=r==="fixed",i=st(o),c=e?ke(e.floating):!1;if(o===i||c&&a)return n;let d={scrollLeft:0,scrollTop:0},h=ot(1);const u=ot(0),p=at(o);if((p||!p&&!a)&&((Nt(o)!=="body"||ee(i))&&(d=Ce(o)),at(o))){const f=Tt(o);h=Rt(o),u.x=f.x+o.clientLeft,u.y=f.y+o.clientTop}const m=i&&!p&&!a?to(i,d):ot(0);return{width:n.width*h.x,height:n.height*h.y,x:n.x*h.x-d.scrollLeft*h.x+u.x+m.x,y:n.y*h.y-d.scrollTop*h.y+u.y+m.y}}function ha(t){return Array.from(t.getClientRects())}function pa(t){const e=st(t),n=Ce(t),o=t.ownerDocument.body,r=N(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),a=N(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let i=-n.scrollLeft+$e(t);const c=-n.scrollTop;return J(o).direction==="rtl"&&(i+=N(e.clientWidth,o.clientWidth)-r),{width:r,height:a,x:i,y:c}}const $n=25;function fa(t,e){const n=U(t),o=st(t),r=n.visualViewport;let a=o.clientWidth,i=o.clientHeight,c=0,d=0;if(r){a=r.width,i=r.height;const u=sn();(!u||u&&e==="fixed")&&(c=r.offsetLeft,d=r.offsetTop)}const h=$e(o);if(h<=0){const u=o.ownerDocument,p=u.body,m=getComputedStyle(p),f=u.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(o.clientWidth-p.clientWidth-f);b<=$n&&(a-=b)}else h<=$n&&(a+=h);return{width:a,height:i,x:c,y:d}}const ma=new Set(["absolute","fixed"]);function ba(t,e){const n=Tt(t,!0,e==="fixed"),o=n.top+t.clientTop,r=n.left+t.clientLeft,a=at(t)?Rt(t):ot(1),i=t.clientWidth*a.x,c=t.clientHeight*a.y,d=r*a.x,h=o*a.y;return{width:i,height:c,x:d,y:h}}function En(t,e,n){let o;if(e==="viewport")o=fa(t,n);else if(e==="document")o=pa(st(t));else if(Z(e))o=ba(e,n);else{const r=Jn(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return fe(o)}function eo(t,e){const n=kt(t);return n===e||!Z(n)||Bt(n)?!1:J(n).position==="fixed"||eo(n,e)}function wa(t,e){const n=e.get(t);if(n)return n;let o=Mt(t,[],!1).filter(c=>Z(c)&&Nt(c)!=="body"),r=null;const a=J(t).position==="fixed";let i=a?kt(t):t;for(;Z(i)&&!Bt(i);){const c=J(i),d=Se(i);!d&&c.position==="fixed"&&(r=null),(a?!d&&!r:!d&&c.position==="static"&&!!r&&ma.has(r.position)||ee(i)&&!d&&eo(t,i))?o=o.filter(u=>u!==i):r=c,i=kt(i)}return e.set(t,o),o}function ga(t){let{element:e,boundary:n,rootBoundary:o,strategy:r}=t;const i=[...n==="clippingAncestors"?ke(e)?[]:wa(e,this._c):[].concat(n),o],c=i[0],d=i.reduce((h,u)=>{const p=En(e,u,r);return h.top=N(p.top,h.top),h.right=yt(p.right,h.right),h.bottom=yt(p.bottom,h.bottom),h.left=N(p.left,h.left),h},En(e,c,r));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}}function va(t){const{width:e,height:n}=Zn(t);return{width:e,height:n}}function ya(t,e,n){const o=at(e),r=st(e),a=n==="fixed",i=Tt(t,!0,a,e);let c={scrollLeft:0,scrollTop:0};const d=ot(0);function h(){d.x=$e(r)}if(o||!o&&!a)if((Nt(e)!=="body"||ee(r))&&(c=Ce(e)),o){const f=Tt(e,!0,a,e);d.x=f.x+e.clientLeft,d.y=f.y+e.clientTop}else r&&h();a&&!o&&r&&h();const u=r&&!o&&!a?to(r,c):ot(0),p=i.left+c.scrollLeft-d.x-u.x,m=i.top+c.scrollTop-d.y-u.y;return{x:p,y:m,width:i.width,height:i.height}}function Te(t){return J(t).position==="static"}function An(t,e){if(!at(t)||J(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return st(t)===n&&(n=n.ownerDocument.body),n}function no(t,e){const n=U(t);if(ke(t))return n;if(!at(t)){let r=kt(t);for(;r&&!Bt(r);){if(Z(r)&&!Te(r))return r;r=kt(r)}return n}let o=An(t,e);for(;o&&na(o)&&Te(o);)o=An(o,e);return o&&Bt(o)&&Te(o)&&!Se(o)?n:o||sa(t)||n}const xa=async function(t){const e=this.getOffsetParent||no,n=this.getDimensions,o=await n(t.floating);return{reference:ya(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function ka(t){return J(t).direction==="rtl"}const se={convertOffsetParentRelativeRectToViewportRelativeRect:ua,getDocumentElement:st,getClippingRect:ga,getOffsetParent:no,getElementRects:xa,getClientRects:ha,getDimensions:va,getScale:Rt,isElement:Z,isRTL:ka};function oo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Sa(t,e){let n=null,o;const r=st(t);function a(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function i(c,d){c===void 0&&(c=!1),d===void 0&&(d=1),a();const h=t.getBoundingClientRect(),{left:u,top:p,width:m,height:f}=h;if(c||e(),!m||!f)return;const b=oe(p),w=oe(r.clientWidth-(u+m)),k=oe(r.clientHeight-(p+f)),y=oe(u),E={rootMargin:-b+"px "+-w+"px "+-k+"px "+-y+"px",threshold:N(0,yt(1,d))||1};let T=!0;function _(X){const R=X[0].intersectionRatio;if(R!==d){if(!T)return i();R?i(!1,R):o=setTimeout(()=>{i(!1,1e-7)},1e3)}R===1&&!oo(h,t.getBoundingClientRect())&&i(),T=!1}try{n=new IntersectionObserver(_,{...E,root:r.ownerDocument})}catch{n=new IntersectionObserver(_,E)}n.observe(t)}return i(!0),a}function ro(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:a=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:d=!1}=o,h=ln(t),u=r||a?[...h?Mt(h):[],...Mt(e)]:[];u.forEach(y=>{r&&y.addEventListener("scroll",n,{passive:!0}),a&&y.addEventListener("resize",n)});const p=h&&c?Sa(h,n):null;let m=-1,f=null;i&&(f=new ResizeObserver(y=>{let[S]=y;S&&S.target===h&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var E;(E=f)==null||E.observe(e)})),n()}),h&&!d&&f.observe(h),f.observe(e));let b,w=d?Tt(t):null;d&&k();function k(){const y=Tt(t);w&&!oo(w,y)&&n(),w=y,b=requestAnimationFrame(k)}return n(),()=>{var y;u.forEach(S=>{r&&S.removeEventListener("scroll",n),a&&S.removeEventListener("resize",n)}),p?.(),(y=f)==null||y.disconnect(),f=null,d&&cancelAnimationFrame(b)}}const ao=Qr,io=Zr,so=Xr,_n=Jr,Ca=Kr,lo=(t,e,n)=>{const o=new Map,r={platform:se,...n},a={...r.platform,_c:o};return jr(t,e,{...r,platform:a})};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var $a=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};function*co(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*co(t.shadowRoot.activeElement)))}var Ea=`:host {
  --show-duration: 50ms;
  --hide-duration: 50ms;
  display: contents;
}

#menu {
  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 0;
  padding: 0.25em;
  border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  background-color: var(--wa-color-surface-raised);
  box-shadow: var(--wa-shadow-m);
  color: var(--wa-color-text-normal);
  text-align: start;
  user-select: none;
  overflow: auto;
  max-width: var(--auto-size-available-width) !important;
  max-height: var(--auto-size-available-height) !important;

  &.show {
    animation: show var(--show-duration) ease;
  }

  &.hide {
    animation: show var(--hide-duration) ease reverse;
  }

  ::slotted(h1),
  ::slotted(h2),
  ::slotted(h3),
  ::slotted(h4),
  ::slotted(h5),
  ::slotted(h6) {
    display: block !important;
    margin: 0.25em 0 !important;
    padding: 0.25em 0.75em !important;
    color: var(--wa-color-text-quiet) !important;
    font-family: var(--wa-font-family-body) !important;
    font-weight: var(--wa-font-weight-semibold) !important;
    font-size: var(--wa-font-size-smaller) !important;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em; /* Component-specific, left as-is */
  }
}

wa-popup[data-current-placement^='top'] #menu {
  transform-origin: bottom;
}

wa-popup[data-current-placement^='bottom'] #menu {
  transform-origin: top;
}

wa-popup[data-current-placement^='left'] #menu {
  transform-origin: right;
}

wa-popup[data-current-placement^='right'] #menu {
  transform-origin: left;
}

wa-popup[data-current-placement='left-start'] #menu {
  transform-origin: right top;
}

wa-popup[data-current-placement='left-end'] #menu {
  transform-origin: right bottom;
}

wa-popup[data-current-placement='right-start'] #menu {
  transform-origin: left top;
}

wa-popup[data-current-placement='right-end'] #menu {
  transform-origin: left bottom;
}

@keyframes show {
  from {
    scale: 0.9;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
`,Pe=new Set,M=class extends D{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new it(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"){const u=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,u?.focus();return}const n=[...co()].find(u=>u.localName==="wa-dropdown-item"),o=n?.localName==="wa-dropdown-item",r=this.getCurrentSubmenuItem(),a=!!r;let i,c,d;a?(i=this.getSubmenuItems(r),c=i.find(u=>u.active||u===n),d=c?i.indexOf(c):-1):(i=this.getItems(),c=i.find(u=>u.active||u===n),d=c?i.indexOf(c):-1);let h;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),d>0?h=i[d-1]:h=i[i.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),d!==-1&&d<i.length-1?h=i[d+1]:h=i[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&o&&c&&c.hasSubmenu){t.preventDefault(),t.stopPropagation(),c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{const u=this.getSubmenuItems(c);u.length>0&&(u.forEach((p,m)=>p.active=m===0),u[0].focus())},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&a){t.preventDefault(),t.stopPropagation();const u=this.removeFromSubmenuStack();u&&(u.submenuOpen=!1,setTimeout(()=>{u.focus(),u.active=!0,(u.slot==="submenu"?this.getSubmenuItems(u.parentElement):this.getItems()).forEach(m=>{m!==u&&(m.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),h=t.key==="Home"?i[0]:i[i.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,i.some(u=>{const p=(u.textContent||"").trim().toLowerCase(),m=this.userTypedQuery.trim().toLowerCase();return p.startsWith(m)?(h=u,!0):!1})),h){t.preventDefault(),t.stopPropagation(),i.forEach(u=>u.active=u===h),h.focus();return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&o&&c&&(t.preventDefault(),t.stopPropagation(),c.hasSubmenu?(c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{const u=this.getSubmenuItems(c);u.length>0&&(u.forEach((p,m)=>p.active=m===0),u[0].focus())},0)):this.makeSelection(c))},this.handleDocumentPointerDown=t=>{t.composedPath().some(o=>o instanceof HTMLElement?o===this||o.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const n=e.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl",r=o?n.right:n.left,a=o?Math.max(t.clientX,r):Math.min(t.clientX,r),i=Math.max(n.top,Math.min(t.clientY,n.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${a}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${i}px`);const c=e.matches(":hover"),d=e.submenuElement?.matches(":hover")||!!t.composedPath().find(h=>h instanceof HTMLElement&&h.closest('[part="submenu"]')===e.submenuElement);!c&&!d&&setTimeout(()=>{!e.matches(":hover")&&!e.submenuElement?.matches(":hover")&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){t.has("open")&&(this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())),t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(n=>n.localName==="wa-dropdown-item");return t?e:e.filter(n=>!n.disabled)}getSubmenuItems(t,e=!1){const n=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!n)return[];const o=n.assignedElements({flatten:!0}).filter(r=>r.localName==="wa-dropdown-item");return e?o:o.filter(r=>!r.disabled)}syncItemSizes(){this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let n;e?n=this.getSubmenuItems(e,!0):n=this.getItems(!0),n.forEach(o=>{o!==t&&o.submenuOpen&&(o.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger())return;const e=new ye;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}Pe.forEach(o=>o.open=!1),this.popup.active=!0,this.open=!0,Pe.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await B(this.menu,"show");const n=this.getItems();n.length>0&&(n.forEach((o,r)=>o.active=r===0),n[0].focus()),this.dispatchEvent(new ge)}async hideMenu(){const t=new ve({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,Pe.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await B(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new we)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(o=>o.updateComplete)),this.syncItemSizes();const e=t.some(o=>o.type==="checkbox"),n=t.some(o=>o.hasSubmenu);t.forEach((o,r)=>{o.active=r===0,o.checkboxAdjacent=e,o.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=ro(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const n=t.submenuElement.querySelector('slot[name="submenu"]');n&&(n.removeEventListener("slotchange",M.handleSubmenuSlotChange),n.addEventListener("slotchange",M.handleSubmenuSlotChange),M.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const n=e.assignedElements().filter(a=>a.localName==="wa-dropdown-item");if(n.length===0)return;const o=n.some(a=>a.hasSubmenu),r=n.some(a=>a.type==="checkbox");n.forEach(a=>{a.submenuAdjacent=o,a.checkboxAdjacent=r})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),n=e.some(o=>o.hasSubmenu);e.forEach(o=>{o.submenuAdjacent=n})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const n=this.localize.dir()==="rtl"?"left-start":"right-start";lo(t,t.submenuElement,{placement:n,middleware:[ao({mainAxis:0,crossAxis:-5}),so({fallbackStrategy:"bestFit"}),io({padding:8})]}).then(({x:o,y:r,placement:a})=>{t.submenuElement.setAttribute("data-placement",a),Object.assign(t.submenuElement.style,{left:`${o}px`,top:`${r}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const n=t.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${n.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${n.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const n=new $a({item:t});this.dispatchEvent(n),n.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",Rr("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup.active:this.open;return g`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};M.css=[$t,Ea];s([z("slot:not([name])")],M.prototype,"defaultSlot",2);s([z("#menu")],M.prototype,"menu",2);s([z("wa-popup")],M.prototype,"popup",2);s([l({type:Boolean,reflect:!0})],M.prototype,"open",2);s([l({reflect:!0})],M.prototype,"size",2);s([l({reflect:!0})],M.prototype,"placement",2);s([l({type:Number})],M.prototype,"distance",2);s([l({type:Number})],M.prototype,"skidding",2);M=s([P("wa-dropdown")],M);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Aa=`:host {
  display: flex;
  position: relative;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: var(--wa-border-radius-s);
  isolation: isolate;
  color: var(--wa-color-text-normal);
  line-height: var(--wa-line-height-condensed);
  cursor: pointer;
  transition:
    100ms background-color ease,
    100ms color ease;
}

@media (hover: hover) {
  :host(:hover:not(:state(disabled))) {
    background-color: var(--wa-color-neutral-fill-normal);
  }
}

:host(:focus-visible) {
  z-index: 1;
  outline: var(--wa-focus-ring);
  background-color: var(--wa-color-neutral-fill-normal);
}

:host(:state(disabled)) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Danger variant */
:host([variant='danger']),
:host([variant='danger']) #details {
  color: var(--wa-color-danger-on-quiet);
}

@media (hover: hover) {
  :host([variant='danger']:hover) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }
}

:host([variant='danger']:focus-visible) {
  background-color: var(--wa-color-danger-fill-normal);
  color: var(--wa-color-danger-on-normal);
}

:host([checkbox-adjacent]) {
  padding-inline-start: 2em;
}

/* Only add padding when item actually has a submenu */
:host([submenu-adjacent]:not(:state(has-submenu))) #details {
  padding-inline-end: 0;
}

:host(:state(has-submenu)[submenu-adjacent]) #details {
  padding-inline-end: 1.75em;
}

#check {
  visibility: hidden;
  margin-inline-start: -1.5em;
  margin-inline-end: 0.5em;
  font-size: var(--wa-font-size-smaller);
}

:host(:state(checked)) #check {
  visibility: visible;
}

#icon ::slotted(*) {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin-inline-end: 0.75em !important;
  font-size: var(--wa-font-size-smaller);
}

#label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#details {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: end;
  color: var(--wa-color-text-quiet);
  font-size: var(--wa-font-size-smaller) !important;
}

#details ::slotted(*) {
  margin-inline-start: 2em !important;
}

/* Submenu indicator icon */
#submenu-indicator {
  position: absolute;
  inset-inline-end: 1em;
  color: var(--wa-color-neutral-on-quiet);
  font-size: var(--wa-font-size-smaller);
}

/* Flip chevron icon when RTL */
:host(:dir(rtl)) #submenu-indicator {
  transform: scaleX(-1);
}

/* Submenu styles */
#submenu {
  display: flex;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  width: max-content;
  margin: 0;
  padding: 0.25em;
  border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  background-color: var(--wa-color-surface-raised);
  box-shadow: var(--wa-shadow-m);
  color: var(--wa-color-text-normal);
  text-align: start;
  user-select: none;

  /* Override default popover styles */
  &[popover] {
    margin: 0;
    inset: auto;
    padding: 0.25em;
    overflow: visible;
    border-radius: var(--wa-border-radius-m);
  }

  &.show {
    animation: submenu-show var(--show-duration, 50ms) ease;
  }

  &.hide {
    animation: submenu-show var(--show-duration, 50ms) ease reverse;
  }

  /* Submenu placement transform origins */
  &[data-placement^='top'] {
    transform-origin: bottom;
  }

  &[data-placement^='bottom'] {
    transform-origin: top;
  }

  &[data-placement^='left'] {
    transform-origin: right;
  }

  &[data-placement^='right'] {
    transform-origin: left;
  }

  &[data-placement='left-start'] {
    transform-origin: right top;
  }

  &[data-placement='left-end'] {
    transform-origin: right bottom;
  }

  &[data-placement='right-start'] {
    transform-origin: left top;
  }

  &[data-placement='right-end'] {
    transform-origin: left bottom;
  }

  /* Safe triangle styling */
  &::before {
    display: none;
    z-index: 9;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    content: '';
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
    pointer-events: auto; /* Enable mouse events on the triangle */
  }

  &[data-visible]::before {
    display: block;
  }
}

::slotted(wa-dropdown-item) {
  font-size: inherit;
}

::slotted(wa-divider) {
  --spacing: 0.25em;
}

@keyframes submenu-show {
  from {
    scale: 0.9;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
`,q=class extends D{constructor(){super(...arguments),this.hasSlotController=new Ct(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.notifyParentOfOpening(),this.submenuElement.showPopover(),this.submenuElement.hidden=!1,this.submenuElement.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await B(this.submenuElement,"show"),setTimeout(()=>{const t=this.getSubmenuItems();t.length>0&&(t.forEach((e,n)=>e.active=n===0),t[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(o=>o!==this&&o.localName==="wa-dropdown-item"&&o.getAttribute("slot")===this.getAttribute("slot")&&o.submenuOpen).forEach(o=>{o.submenuOpen=!1})}async closeSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),this.submenuElement.hidden||(await B(this.submenuElement,"hide"),this.submenuElement.hidden=!0,this.submenuElement.removeAttribute("data-visible"),this.submenuElement.hidePopover()))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return g`
      ${this.type==="checkbox"?g`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?g`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?g`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};q.css=Aa;s([z("#submenu")],q.prototype,"submenuElement",2);s([l({type:Boolean})],q.prototype,"active",2);s([l({reflect:!0})],q.prototype,"variant",2);s([l({reflect:!0})],q.prototype,"size",2);s([l({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],q.prototype,"checkboxAdjacent",2);s([l({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],q.prototype,"submenuAdjacent",2);s([l()],q.prototype,"value",2);s([l({reflect:!0})],q.prototype,"type",2);s([l({type:Boolean})],q.prototype,"checked",2);s([l({type:Boolean,reflect:!0})],q.prototype,"disabled",2);s([l({type:Boolean,reflect:!0})],q.prototype,"submenuOpen",2);s([H()],q.prototype,"hasSubmenu",2);q=s([P("wa-dropdown-item")],q);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var _a=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};function Oa(t){return La(t)}function De(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function La(t){for(let e=t;e;e=De(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=De(t);e;e=De(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||Se(n)||e.tagName==="BODY"))return e}return null}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var za=`:host {
  --arrow-color: black;
  --arrow-size: var(--wa-tooltip-arrow-size);
  --show-duration: 100ms;
  --hide-duration: 100ms;

  /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
  --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
  --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

  display: contents;
}

.popup {
  position: absolute;
  isolation: isolate;
  max-width: var(--auto-size-available-width, none);
  max-height: var(--auto-size-available-height, none);

  /* Clear UA styles for [popover] */
  :where(&) {
    inset: unset;
    padding: unset;
    margin: unset;
    width: unset;
    height: unset;
    color: unset;
    background: unset;
    border: unset;
    overflow: unset;
  }
}

.popup-fixed {
  position: fixed;
}

.popup:not(.popup-active) {
  display: none;
}

.arrow {
  position: absolute;
  width: calc(var(--arrow-size-diagonal) * 2);
  height: calc(var(--arrow-size-diagonal) * 2);
  rotate: 45deg;
  background: var(--arrow-color);
  z-index: 3;
}

:host([data-current-placement~='left']) .arrow {
  rotate: -45deg;
}

:host([data-current-placement~='right']) .arrow {
  rotate: 135deg;
}

:host([data-current-placement~='bottom']) .arrow {
  rotate: 225deg;
}

/* Hover bridge */
.popup-hover-bridge:not(.popup-hover-bridge-visible) {
  display: none;
}

.popup-hover-bridge {
  position: fixed;
  z-index: 899;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  clip-path: polygon(
    var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
    var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
    var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
    var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
  );
}

/* Built-in animations */
.show {
  animation: show var(--show-duration) ease;
}

.hide {
  animation: show var(--hide-duration) ease reverse;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.show-with-scale {
  animation: show-with-scale var(--show-duration) ease;
}

.hide-with-scale {
  animation: show-with-scale var(--hide-duration) ease reverse;
}

@keyframes show-with-scale {
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
`;function On(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var re=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),$=class extends D{constructor(){super(...arguments),this.localize=new it(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let o=0,r=0,a=0,i=0,c=0,d=0,h=0,u=0;n?t.top<e.top?(o=t.left,r=t.bottom,a=t.right,i=t.bottom,c=e.left,d=e.top,h=e.right,u=e.top):(o=e.left,r=e.bottom,a=e.right,i=e.bottom,c=t.left,d=t.top,h=t.right,u=t.top):t.left<e.left?(o=t.right,r=t.top,a=e.left,i=e.top,c=t.right,d=t.bottom,h=e.left,u=e.bottom):(o=e.right,r=e.top,a=t.left,i=t.top,c=e.right,d=e.bottom,h=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${i}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||On(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=ro(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[ao({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(_n({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=a?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;re&&!On(this.anchor)&&this.boundary==="scroll"&&(e=Mt(this.anchorEl).filter(o=>o instanceof Element)),this.flip&&t.push(so({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(io({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(_n({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Ca({element:this.arrowEl,padding:this.arrowPadding}));const n=re?o=>se.getOffsetParent(o,Oa):se.getOffsetParent;lo(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:re?"absolute":"fixed",platform:{...se,getOffsetParent:n}}).then(({x:o,y:r,middlewareData:a,placement:i})=>{const c=this.localize.dir()==="rtl",d={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const h=a.arrow.x,u=a.arrow.y;let p="",m="",f="",b="";if(this.arrowPlacement==="start"){const w=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=c?w:"",b=c?"":w}else if(this.arrowPlacement==="end"){const w=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=c?"":w,b=c?w:"",f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof h=="number"?`${h}px`:"",p=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:p,right:m,bottom:f,left:b,[d]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new _a)}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Q({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${Q({popup:!0,"popup-active":this.active,"popup-fixed":!re,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};$.css=za;s([z(".popup")],$.prototype,"popup",2);s([z(".arrow")],$.prototype,"arrowEl",2);s([l()],$.prototype,"anchor",2);s([l({type:Boolean,reflect:!0})],$.prototype,"active",2);s([l({reflect:!0})],$.prototype,"placement",2);s([l()],$.prototype,"boundary",2);s([l({type:Number})],$.prototype,"distance",2);s([l({type:Number})],$.prototype,"skidding",2);s([l({type:Boolean})],$.prototype,"arrow",2);s([l({attribute:"arrow-placement"})],$.prototype,"arrowPlacement",2);s([l({attribute:"arrow-padding",type:Number})],$.prototype,"arrowPadding",2);s([l({type:Boolean})],$.prototype,"flip",2);s([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],$.prototype,"flipFallbackPlacements",2);s([l({attribute:"flip-fallback-strategy"})],$.prototype,"flipFallbackStrategy",2);s([l({type:Object})],$.prototype,"flipBoundary",2);s([l({attribute:"flip-padding",type:Number})],$.prototype,"flipPadding",2);s([l({type:Boolean})],$.prototype,"shift",2);s([l({type:Object})],$.prototype,"shiftBoundary",2);s([l({attribute:"shift-padding",type:Number})],$.prototype,"shiftPadding",2);s([l({attribute:"auto-size"})],$.prototype,"autoSize",2);s([l()],$.prototype,"sync",2);s([l({type:Object})],$.prototype,"autoSizeBoundary",2);s([l({attribute:"auto-size-padding",type:Number})],$.prototype,"autoSizePadding",2);s([l({attribute:"hover-bridge",type:Boolean})],$.prototype,"hoverBridge",2);$=s([P("wa-popup")],$);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var uo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Ta(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&Pa(e)})}function Pa(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const o=n.find(r=>r.type==="submit"&&!r.matches(":disabled"));o&&(["input","button"].includes(o.localName)?e.requestSubmit(o):o.click())}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Da=`:host {
  border-width: 0;
}

.text-field {
  flex: auto;
  display: flex;
  align-items: stretch;
  justify-content: start;
  position: relative;
  transition: inherit;
  height: var(--wa-form-control-height);
  border-color: var(--wa-form-control-border-color);
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-form-control-border-style);
  border-width: var(--wa-form-control-border-width);
  cursor: text;
  color: var(--wa-form-control-value-color);
  font-size: var(--wa-form-control-value-font-size);
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  vertical-align: middle;
  width: 100%;
  transition:
    background-color var(--wa-transition-normal),
    border var(--wa-transition-normal),
    outline var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);
  background-color: var(--wa-form-control-background-color);
  box-shadow: var(--box-shadow);
  padding: 0 var(--wa-form-control-padding-inline);

  &:focus-within {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Style disabled inputs */
  &:has(:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Appearance modifiers */
:host([appearance='outlined']) .text-field {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance='filled']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance='filled-outlined']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-form-control-border-color);
}

:host([pill]) .text-field {
  border-radius: var(--wa-border-radius-pill) !important;
}

.text-field {
  /* Show autofill styles over the entire text field, not just the native <input> */
  &:has(:autofill),
  &:has(:-webkit-autofill) {
    background-color: var(--wa-color-brand-fill-quiet) !important;
  }

  input,
  textarea {
    /*
    Fixes an alignment issue with placeholders.
    https://github.com/shoelace-style/webawesome/issues/342
  */
    height: 100%;

    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
    font: inherit;

    /* Turn off Safari's autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-background-clip: text;
      background-color: transparent;
      -webkit-text-fill-color: inherit;
    }
  }
}

input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  transition: inherit;

  /* prettier-ignore */
  background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
  height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
  padding-block: 0;
  color: inherit;

  &:autofill {
    &,
    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      caret-color: var(--wa-form-control-value-color);
    }
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }
}

textarea {
  &:autofill {
    &,
    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      caret-color: var(--wa-form-control-value-color);
    }
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }
}

.start,
.end {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  cursor: default;

  &::slotted(wa-icon) {
    color: var(--wa-color-neutral-on-quiet);
  }
}

.start::slotted(*) {
  margin-inline-end: var(--wa-form-control-padding-inline);
}

.end::slotted(*) {
  margin-inline-start: var(--wa-form-control-padding-inline);
}

/*
 * Clearable + Password Toggle
 */

.clear,
.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  color: var(--wa-color-neutral-on-quiet);
  border: none;
  background: none;
  padding: 0;
  transition: var(--wa-transition-normal) color;
  cursor: pointer;
  margin-inline-start: var(--wa-form-control-padding-inline);

  @media (hover: hover) {
    &:hover {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  &:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  &:focus {
    outline: none;
  }
}

/* Don't show the browser's password toggle in Edge */
::-ms-reveal {
  display: none;
}

/* Hide the built-in number spinner */
:host([without-spin-buttons]) input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
}
`,v=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ct(this,"hint","label"),this.localize=new it(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Un()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new uo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){Ta(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,o="preserve"){const r=e??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(t,r,a,o),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,r=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&r&&(typeof this.value=="number"||this.value&&this.value.length>0);return g`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${n?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${A(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${A(this.placeholder)}
          minlength=${A(this.minlength)}
          maxlength=${A(this.maxlength)}
          min=${A(this.min)}
          max=${A(this.max)}
          step=${A(this.step)}
          .value=${Fe(this.value??"")}
          autocapitalize=${A(this.autocapitalize)}
          autocomplete=${A(this.autocomplete)}
          autocorrect=${A(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${A(this.pattern)}
          enterkeyhint=${A(this.enterkeyhint)}
          inputmode=${A(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?g`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?g`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?g`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:g`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${Q({"has-slotted":o})}
        aria-hidden=${o?"false":"true"}
        >${this.hint}</slot
      >
    `}};v.css=[$t,nn,Da];v.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};s([z("input")],v.prototype,"input",2);s([l()],v.prototype,"title",2);s([l({reflect:!0})],v.prototype,"type",2);s([H()],v.prototype,"value",1);s([l({attribute:"value",reflect:!0})],v.prototype,"defaultValue",2);s([l({reflect:!0})],v.prototype,"size",2);s([l({reflect:!0})],v.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],v.prototype,"pill",2);s([l()],v.prototype,"label",2);s([l({attribute:"hint"})],v.prototype,"hint",2);s([l({attribute:"with-clear",type:Boolean})],v.prototype,"withClear",2);s([l()],v.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],v.prototype,"readonly",2);s([l({attribute:"password-toggle",type:Boolean})],v.prototype,"passwordToggle",2);s([l({attribute:"password-visible",type:Boolean})],v.prototype,"passwordVisible",2);s([l({attribute:"without-spin-buttons",type:Boolean})],v.prototype,"withoutSpinButtons",2);s([l({reflect:!0})],v.prototype,"form",2);s([l({type:Boolean,reflect:!0})],v.prototype,"required",2);s([l()],v.prototype,"pattern",2);s([l({type:Number})],v.prototype,"minlength",2);s([l({type:Number})],v.prototype,"maxlength",2);s([l()],v.prototype,"min",2);s([l()],v.prototype,"max",2);s([l()],v.prototype,"step",2);s([l()],v.prototype,"autocapitalize",2);s([l()],v.prototype,"autocorrect",2);s([l()],v.prototype,"autocomplete",2);s([l({type:Boolean})],v.prototype,"autofocus",2);s([l()],v.prototype,"enterkeyhint",2);s([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],v.prototype,"spellcheck",2);s([l()],v.prototype,"inputmode",2);s([l({attribute:"with-label",type:Boolean})],v.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],v.prototype,"withHint",2);s([W("step",{waitUntilFirstUpdate:!0})],v.prototype,"handleStepChange",1);v=s([P("wa-input")],v);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Ln(t,e){return new Promise(n=>{function o(r){r.target===t&&(t.removeEventListener(e,o),n())}t.addEventListener(e,o)})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class je extends en{constructor(e){if(super(e),this.it=O,e.type!==wt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===O||e==null)return this._t=void 0,this.it=e;if(e===K)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}je.directiveName="unsafeHTML",je.resultType=1;const Ra=tn(je);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ia=`:host {
  --tag-max-size: 10ch;
  --show-duration: 100ms;
  --hide-duration: 100ms;
}

/* Add ellipses to multi select options */
:host wa-tag::part(content) {
  display: initial;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: var(--tag-max-size);
}

:host .disabled [part~='combobox'] {
  opacity: 0.5;
  cursor: not-allowed;
  outline: none;
}

:host .enabled:is(.open, :focus-within) [part~='combobox'] {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/** The popup */
.select {
  flex: 1 1 auto;
  display: inline-flex;
  width: 100%;
  position: relative;
  vertical-align: middle;

  /* Pass through from select to the popup */
  --show-duration: inherit;
  --hide-duration: inherit;

  &::part(popup) {
    z-index: 900;
  }

  &[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  &[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }
}

/* Combobox */
.combobox {
  flex: 1;
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  justify-content: start;

  min-height: var(--wa-form-control-height);

  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
  border-radius: var(--wa-form-control-border-radius);
  border-style: var(--wa-form-control-border-style);
  border-width: var(--wa-form-control-border-width);
  color: var(--wa-form-control-value-color);
  cursor: pointer;
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  overflow: hidden;
  padding: 0 var(--wa-form-control-padding-inline);
  position: relative;
  vertical-align: middle;
  width: 100%;
  transition:
    background-color var(--wa-transition-normal),
    border var(--wa-transition-normal),
    outline var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);

  :host([multiple]) .select:not(.placeholder-visible) & {
    padding-inline-start: 0;
    padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
  }

  /* Pills */
  :host([pill]) & {
    border-radius: var(--wa-border-radius-pill);
  }
}

/* Appearance modifiers */
:host([appearance='outlined']) .combobox {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance='filled']) .combobox {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance='filled-outlined']) .combobox {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-form-control-border-color);
}

.display-input {
  position: relative;
  width: 100%;
  font: inherit;
  border: none;
  background: none;
  line-height: var(--wa-form-control-value-line-height);
  color: var(--wa-form-control-value-color);
  cursor: inherit;
  overflow: hidden;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--wa-form-control-placeholder-color);
  }
}

/* Visually hide the display input when multiple is enabled */
:host([multiple]) .select:not(.placeholder-visible) .display-input {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.value-input {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 0;
  margin: 0;
}

.tags {
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;
  margin-inline-start: 0.25em;
  gap: 0.25em;

  &::slotted(wa-tag) {
    cursor: pointer !important;
  }

  .disabled &,
  .disabled &::slotted(wa-tag) {
    cursor: not-allowed !important;
  }
}

/* Start and End */

.start,
.end {
  flex: 0;
  display: inline-flex;
  align-items: center;
  color: var(--wa-color-neutral-on-quiet);
}

.end::slotted(*) {
  margin-inline-start: var(--wa-form-control-padding-inline);
}

.start::slotted(*) {
  margin-inline-end: var(--wa-form-control-padding-inline);
}

:host([multiple]) .start::slotted(*) {
  margin-inline: var(--wa-form-control-padding-inline);
}

/* Clear button */
[part~='clear-button'] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  color: var(--wa-color-neutral-on-quiet);
  border: none;
  background: none;
  padding: 0;
  transition: color var(--wa-transition-normal);
  cursor: pointer;
  margin-inline-start: var(--wa-form-control-padding-inline);

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  &:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }
}

/* Expand icon */
.expand-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: var(--wa-color-neutral-on-quiet);
  transition: rotate var(--wa-transition-slow) ease;
  rotate: 0deg;
  margin-inline-start: var(--wa-form-control-padding-inline);

  .open & {
    rotate: -180deg;
  }
}

/* Listbox */
.listbox {
  display: block;
  position: relative;
  font: inherit;
  box-shadow: var(--wa-shadow-m);
  background: var(--wa-color-surface-raised);
  border-color: var(--wa-color-surface-border);
  border-radius: var(--wa-border-radius-m);
  border-style: var(--wa-border-style);
  border-width: var(--wa-border-width-s);
  padding-block: 0.5em;
  padding-inline: 0;
  overflow: auto;
  overscroll-behavior: none;

  /* Make sure it adheres to the popup's auto size */
  max-width: var(--auto-size-available-width);
  max-height: var(--auto-size-available-height);

  &::slotted(wa-divider) {
    --spacing: 0.5em;
  }
}

slot:not([name])::slotted(small) {
  display: block;
  font-size: var(--wa-font-size-smaller);
  font-weight: var(--wa-font-weight-semibold);
  color: var(--wa-color-text-quiet);
  padding-block: 0.5em;
  padding-inline: 2.25em;
}
`,x=class extends F{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ct(this,"hint","label"),this.localize=new it(this),this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.form=null,this.required=!1,this.getTag=t=>g`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,n=e.closest('[part~="clear-button"]')!==null,o=e.closest("wa-button")!==null;if(!(n||o)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const r=this.getAllOptions(),a=r.indexOf(this.currentOption);let i=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(i=a+1,i>r.length-1&&(i=0)):t.key==="ArrowUp"?(i=a-1,i<0&&(i=r.length-1)):t.key==="Home"?i=0:t.key==="End"&&(i=r.length-1),this.setCurrentOption(r[i])}if(t.key?.length===1||t.key==="Backspace"){const r=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const a of r)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[jn({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(n=>!n.disabled).map(n=>n.value));let e=t;return t!=null&&(e=t.filter(n=>this.optionValues.has(n)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(n=>n.hasAttribute("selected")||n.defaultSelected);if(e.length>0){const n=e.map(o=>o.value);this._defaultValue=this.multiple?n:n[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const n=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="wa-button");this.disabled||n||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new uo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const n=t.target.closest("wa-option");n&&!n.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(n):this.setSelectedOptions(n),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;let n=e;if(!n){const o=t.target.closest("wa-tag[part~=tag]");if(o){const r=this.shadowRoot?.querySelector('[part="tags"]');if(r){const i=Array.from(r.children).indexOf(o);i>=0&&i<this.selectedOptions.length&&(n=this.selectedOptions[i])}}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(n=>{n.current=!1,n.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),n=Array.isArray(t)?t:[t];e.forEach(o=>{n.includes(o)||(o.selected=!1)}),n.length&&n.forEach(o=>o.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions();this.selectedOptions=t.filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){const o=this.defaultValue,r=Array.isArray(o)?o:[o];return n.hasAttribute("selected")||n.defaultSelected||n.selected||r?.includes(n.value)}return n.selected});let e=new Set(this.selectedOptions.map(n=>n.value));if(e.size>0||this._value){const n=this._value;if(this._value==null){let o=this.defaultValue??[];this._value=Array.isArray(o)?o:[o]}this._value=this._value?.filter(o=>!this.optionValues?.has(o))??null,this._value?.unshift(...e),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(t,e);return n?typeof n=="string"?Ra(n):n:null}else if(e===this.maxOptionsVisible)return g`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new ye;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await B(this.popup.popup,"show"),this.currentOption&&Or(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new ge)}else{const t=new ve;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await B(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new we)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Ln(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Ln(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,r=(this.hasUpdated||rr)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,a=!!(this.placeholder&&(!this.value||this.value.length===0));return g`
      <div
        part="form-control"
        class=${Q({"form-control":!0,"form-control-has-label":n})}
      >
        <label
          id="label"
          part="form-control-label label"
          class="label"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${Q({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":a})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?g`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${r?g`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${Q({"has-slotted":o})}
          aria-hidden=${o?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};x.css=[Ia,nn,$t];s([z(".select")],x.prototype,"popup",2);s([z(".combobox")],x.prototype,"combobox",2);s([z(".display-input")],x.prototype,"displayInput",2);s([z(".value-input")],x.prototype,"valueInput",2);s([z(".listbox")],x.prototype,"listbox",2);s([H()],x.prototype,"displayLabel",2);s([H()],x.prototype,"currentOption",2);s([H()],x.prototype,"selectedOptions",2);s([H()],x.prototype,"optionValues",2);s([l()],x.prototype,"name",2);s([l({attribute:!1})],x.prototype,"defaultValue",1);s([l({attribute:"value",reflect:!1})],x.prototype,"value",1);s([l({reflect:!0})],x.prototype,"size",2);s([l()],x.prototype,"placeholder",2);s([l({type:Boolean,reflect:!0})],x.prototype,"multiple",2);s([l({attribute:"max-options-visible",type:Number})],x.prototype,"maxOptionsVisible",2);s([l({type:Boolean})],x.prototype,"disabled",2);s([l({attribute:"with-clear",type:Boolean})],x.prototype,"withClear",2);s([l({type:Boolean,reflect:!0})],x.prototype,"open",2);s([l({reflect:!0})],x.prototype,"appearance",2);s([l({type:Boolean,reflect:!0})],x.prototype,"pill",2);s([l()],x.prototype,"label",2);s([l({reflect:!0})],x.prototype,"placement",2);s([l({attribute:"hint"})],x.prototype,"hint",2);s([l({attribute:"with-label",type:Boolean})],x.prototype,"withLabel",2);s([l({attribute:"with-hint",type:Boolean})],x.prototype,"withHint",2);s([l({reflect:!0})],x.prototype,"form",2);s([l({type:Boolean,reflect:!0})],x.prototype,"required",2);s([l({attribute:!1})],x.prototype,"getTag",2);s([W("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1);s([W("value",{waitUntilFirstUpdate:!0})],x.prototype,"handleValueChange",1);s([W("open",{waitUntilFirstUpdate:!0})],x.prototype,"handleOpenChange",1);x=s([P("wa-select")],x);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var qa=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},Ba=`@layer wa-component {
  :host {
    display: inline-flex;
    gap: 0.5em;
    border-radius: var(--wa-border-radius-m);
    align-items: center;
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    font-size: inherit;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    height: calc(var(--wa-form-control-height) * 0.8);
    line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
    padding: 0 0.75em;
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
  }

  :host([appearance='filled']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
    background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
    border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
  }

  :host([appearance='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
  }
}

.content {
  font-size: var(--wa-font-size-smaller);
}

[part='remove-button'] {
  color: inherit;
  line-height: 1;
}

[part='remove-button']::part(base) {
  padding: 0;
  height: 1em;
  width: 1em;
}

@media (hover: hover) {
  :host(:hover) > [part='remove-button']::part(base) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }
}

:host(:active) > [part='remove-button']::part(base) {
  color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
}

/*
 * Pill modifier
 */
:host([pill]) {
  border-radius: var(--wa-border-radius-pill);
}
`,St=class extends D{constructor(){super(...arguments),this.localize=new it(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new qa)}render(){return g`
      <slot part="content" class="content"></slot>

      ${this.withRemove?g`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};St.css=[Ba,Jt,$t];s([l({reflect:!0})],St.prototype,"variant",2);s([l({reflect:!0})],St.prototype,"appearance",2);s([l({reflect:!0})],St.prototype,"size",2);s([l({type:Boolean,reflect:!0})],St.prototype,"pill",2);s([l({attribute:"with-remove",type:Boolean})],St.prototype,"withRemove",2);St=s([P("wa-tag")],St);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function jt(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(r=>jt(r,--e)).join("");let n=t;if(n.nodeType===Node.TEXT_NODE)return n.textContent??"";if(n.nodeType===Node.ELEMENT_NODE){let o=n;if(o.hasAttribute("slot")||o.matches("style, script"))return"";if(o instanceof HTMLSlotElement){let r=o.assignedNodes({flatten:!0});if(r.length>0)return jt(r,--e)}return e>-1?jt(o,--e):o.textContent??""}return n.hasChildNodes()?jt(n.childNodes,--e):""}var Ma=`:host {
  display: block;
  color: var(--wa-color-text-normal);
  -webkit-user-select: none;
  user-select: none;

  position: relative;
  display: flex;
  align-items: center;
  font: inherit;
  padding: 0.5em 1em 0.5em 0.25em;
  line-height: var(--wa-line-height-condensed);
  transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
  cursor: pointer;
}

:host(:focus) {
  outline: none;
}

@media (hover: hover) {
  :host(:not([disabled], :state(current)):is(:state(hover), :hover)) {
    background-color: var(--wa-color-neutral-fill-normal);
    color: var(--wa-color-neutral-on-normal);
  }
}

:host(:state(current)),
:host([disabled]:state(current)) {
  background-color: var(--wa-color-brand-fill-loud);
  color: var(--wa-color-brand-on-loud);
  opacity: 1;
}

:host([disabled]) {
  outline: none;
  opacity: 0.5;
  cursor: not-allowed;
}

.label {
  flex: 1 1 auto;
  display: inline-block;
}

.check {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--wa-font-size-smaller);
  visibility: hidden;
  width: 2em;
}

:host(:state(selected)) .check {
  visibility: visible;
}

.start,
.end {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.start::slotted(*) {
  margin-inline-end: 0.5em;
}

.end::slotted(*) {
  margin-inline-start: 0.5em;
}

@media (forced-colors: active) {
  :host(:hover:not([aria-disabled='true'])) {
    outline: dashed 1px SelectedItem;
    outline-offset: -1px;
  }
}
`,tt=class extends D{constructor(){super(...arguments),this.localize=new it(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=jt(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return g`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};tt.css=Ma;s([z(".label")],tt.prototype,"defaultSlot",2);s([H()],tt.prototype,"current",2);s([l({reflect:!0})],tt.prototype,"value",2);s([l({type:Boolean})],tt.prototype,"disabled",2);s([l({type:Boolean,attribute:!1})],tt.prototype,"selected",2);s([l({type:Boolean,attribute:"selected"})],tt.prototype,"defaultSelected",2);s([l()],tt.prototype,"label",1);s([H()],tt.prototype,"defaultLabel",2);tt=s([P("wa-option")],tt);qe("/static/vendor/webawesome");
