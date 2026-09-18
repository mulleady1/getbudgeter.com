(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ue="",He="";function We(t){Ue=t}function go(t=""){if(!Ue){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;We(n)}else{const o=[...document.getElementsByTagName("script")].find(r=>r.src.endsWith("webawesome.js")||r.src.endsWith("webawesome.loader.js")||r.src.endsWith("webawesome.ssr-loader.js"));if(o){const r=String(o.getAttribute("src"));We(r.split("/").slice(0,-1).join("/"))}}}return Ue.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function vo(t){He=t}function yo(){if(!He){const t=document.querySelector("[data-fa-kit-code]");t&&vo(t.getAttribute("data-fa-kit-code")||"")}return He}var ut="7.0.1";function xo(t,e,n){const o=yo(),r=o.length>0;let a="solid";return e==="notdog"?(n==="solid"&&(a="solid"),n==="duo-solid"&&(a="duo-solid"),`https://ka-p.fontawesome.com/releases/v${ut}/svgs/notdog-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="chisel"?`https://ka-p.fontawesome.com/releases/v${ut}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(o)}`:e==="etch"?`https://ka-p.fontawesome.com/releases/v${ut}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(o)}`:e==="jelly"?(n==="regular"&&(a="regular"),n==="duo-regular"&&(a="duo-regular"),n==="fill-regular"&&(a="fill-regular"),`https://ka-p.fontawesome.com/releases/v${ut}/svgs/jelly-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="slab"?((n==="solid"||n==="regular")&&(a="regular"),n==="press-regular"&&(a="press-regular"),`https://ka-p.fontawesome.com/releases/v${ut}/svgs/slab-${a}/${t}.svg?token=${encodeURIComponent(o)}`):e==="thumbprint"?`https://ka-p.fontawesome.com/releases/v${ut}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(o)}`:e==="whiteboard"?`https://ka-p.fontawesome.com/releases/v${ut}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(o)}`:(e==="classic"&&(n==="thin"&&(a="thin"),n==="light"&&(a="light"),n==="regular"&&(a="regular"),n==="solid"&&(a="solid")),e==="sharp"&&(n==="thin"&&(a="sharp-thin"),n==="light"&&(a="sharp-light"),n==="regular"&&(a="sharp-regular"),n==="solid"&&(a="sharp-solid")),e==="duotone"&&(n==="thin"&&(a="duotone-thin"),n==="light"&&(a="duotone-light"),n==="regular"&&(a="duotone-regular"),n==="solid"&&(a="duotone")),e==="sharp-duotone"&&(n==="thin"&&(a="sharp-duotone-thin"),n==="light"&&(a="sharp-duotone-light"),n==="regular"&&(a="sharp-duotone-regular"),n==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),r?`https://ka-p.fontawesome.com/releases/v${ut}/svgs/${a}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${ut}/svgs/${a}/${t}.svg`)}var ko={name:"default",resolver:(t,e="classic",n="solid")=>xo(t,e,n),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:n,variant:o}=e;if(n==="duotone"||n==="sharp-duotone"||n==="notdog"&&o==="duo-solid"||n==="jelly"&&o==="duo-regular"||n==="thumbprint"){const r=[...t.querySelectorAll("path")],a=r.find(c=>!c.hasAttribute("opacity")),s=r.find(c=>c.hasAttribute("opacity"));if(!a||!s)return;if(a.setAttribute("data-duotone-primary",""),s.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&s){const c=s.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",c),s.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Co=ko;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&So(n)});async function So(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),o=[...t.querySelectorAll(":not(:defined)")].map(s=>s.tagName.toLowerCase()).filter(s=>s.startsWith("wa-"));n&&!customElements.get(e)&&o.push(e);const r=[...new Set(o)],a=await Promise.allSettled(r.map(s=>$o(s)));for(const s of a)s.status==="rejected"&&console.warn(s.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function $o(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=go(`components/${e}/${e}.js`);return new Promise((o,r)=>{import(n).then(()=>o()).catch(()=>r(new Error(`Unable to autoload <${t}> from ${n}`)))})}const je=new Set,It=new Map;let Lt,Je="ltr",tn="en";const In=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(In){const t=new MutationObserver(Bn);Je=document.documentElement.dir||"ltr",tn=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function qn(...t){t.map(e=>{const n=e.$code.toLowerCase();It.has(n)?It.set(n,Object.assign(Object.assign({},It.get(n)),e)):It.set(n,e),Lt||(Lt=e)}),Bn()}function Bn(){In&&(Je=document.documentElement.dir||"ltr",tn=document.documentElement.lang||navigator.language),[...je.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Eo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){je.add(this.host)}hostDisconnected(){je.delete(this.host)}dir(){return`${this.host.dir||Je}`.toLowerCase()}lang(){return`${this.host.lang||tn}`.toLowerCase()}getTranslationData(e){var n,o;const r=new Intl.Locale(e.replace(/_/g,"-")),a=r?.language.toLowerCase(),s=(o=(n=r?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&o!==void 0?o:"",c=It.get(`${a}-${s}`),d=It.get(a);return{locale:r,language:a,region:s,primary:c,secondary:d}}exists(e,n){var o;const{primary:r,secondary:a}=this.getTranslationData((o=n.lang)!==null&&o!==void 0?o:this.lang());return n=Object.assign({includeFallback:!1},n),!!(r&&r[e]||a&&a[e]||n.includeFallback&&Lt&&Lt[e])}term(e,...n){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let a;if(o&&o[e])a=o[e];else if(r&&r[e])a=r[e];else if(Lt&&Lt[e])a=Lt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...n):a}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,n)}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Mn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};qn(Mn);var Ao=Mn;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var lt=class extends Eo{};qn(Ao);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function _o(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var De={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Oo={name:"system",resolver:(t,e="classic",n="solid")=>{let r=De[n][t]??De.regular[t]??De.regular["circle-question"];return r?_o(r):""}},Lo=Oo;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var zo="classic",fe=[Co,Lo],me=[];function To(t){me.push(t)}function Do(t){me=me.filter(e=>e!==t)}function Pe(t){return fe.find(e=>e.name===t)}function Po(t,e){Ro(t),fe.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),me.forEach(n=>{n.library===t&&n.setIcon()})}function Ro(t){fe=fe.filter(e=>e.name!==t)}function Io(){return zo}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var qo=Object.defineProperty,Bo=Object.getOwnPropertyDescriptor,Vn=t=>{throw TypeError(t)},i=(t,e,n,o)=>{for(var r=o>1?void 0:o?Bo(e,n):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(r=(o?s(e,n,r):s(r))||r);return o&&r&&qo(e,n,r),r},Fn=(t,e,n)=>e.has(t)||Vn("Cannot "+n),Mo=(t,e,n)=>(Fn(t,e,"read from private field"),e.get(t)),Vo=(t,e,n)=>e.has(t)?Vn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Fo=(t,e,n,o)=>(Fn(t,e,"write to private field"),e.set(t,n),n);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ee=`@layer wa-utilities {
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
 */const he=globalThis,en=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nn=Symbol(),mn=new WeakMap;let No=class{constructor(e,n,o){if(this._$cssResult$=!0,o!==Nn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(en&&e===void 0){const o=n!==void 0&&n.length===1;o&&(e=mn.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&mn.set(n,e))}return e}toString(){return this.cssText}};const Un=t=>new No(typeof t=="string"?t:t+"",void 0,Nn),Uo=(t,e)=>{if(en)t.adoptedStyleSheets=e.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of e){const o=document.createElement("style"),r=he.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=n.cssText,t.appendChild(o)}},bn=en?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const o of e.cssRules)n+=o.cssText;return Un(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ho,defineProperty:Wo,getOwnPropertyDescriptor:jo,getOwnPropertyNames:Ko,getOwnPropertySymbols:Xo,getPrototypeOf:Yo}=Object,$e=globalThis,wn=$e.trustedTypes,Go=wn?wn.emptyScript:"",Qo=$e.reactiveElementPolyfillSupport,Yt=(t,e)=>t,be={toAttribute(t,e){switch(e){case Boolean:t=t?Go:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},nn=(t,e)=>!Ho(t,e),gn={attribute:!0,type:String,converter:be,reflect:!1,useDefault:!1,hasChanged:nn};Symbol.metadata??=Symbol("metadata"),$e.litPropertyMetadata??=new WeakMap;let Rt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=gn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,n);r!==void 0&&Wo(this.prototype,e,r)}}static getPropertyDescriptor(e,n,o){const{get:r,set:a}=jo(this.prototype,e)??{get(){return this[n]},set(s){this[n]=s}};return{get:r,set(s){const c=r?.call(this);a?.call(this,s),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??gn}static _$Ei(){if(this.hasOwnProperty(Yt("elementProperties")))return;const e=Yo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Yt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Yt("properties"))){const n=this.properties,o=[...Ko(n),...Xo(n)];for(const r of o)this.createProperty(r,n[r])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[o,r]of n)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[n,o]of this.elementProperties){const r=this._$Eu(n,o);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)n.unshift(bn(r))}else e!==void 0&&n.push(bn(e));return n}static _$Eu(e,n){const o=n.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const o of n.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Uo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,n,o){this._$AK(e,o)}_$ET(e,n){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:be).toAttribute(n,o.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,n){const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=o.getPropertyOptions(r),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:be;this._$Em=r;const c=s.fromAttribute(n,a.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(e,n,o){if(e!==void 0){const r=this.constructor,a=this[e];if(o??=r.getPropertyOptions(e),!((o.hasChanged??nn)(a,n)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,n,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:o,reflect:r,wrapped:a},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??n??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(n=void 0),this._$AL.set(e,n)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o){const{wrapped:s}=a,c=this[r];s!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,a,c)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(n)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};Rt.elementStyles=[],Rt.shadowRootOptions={mode:"open"},Rt[Yt("elementProperties")]=new Map,Rt[Yt("finalized")]=new Map,Qo?.({ReactiveElement:Rt}),($e.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on=globalThis,we=on.trustedTypes,vn=we?we.createPolicy("lit-html",{createHTML:t=>t}):void 0,Hn="$lit$",kt=`lit$${Math.random().toFixed(9).slice(2)}$`,Wn="?"+kt,Zo=`<${Wn}>`,Tt=document,Qt=()=>Tt.createComment(""),Zt=t=>t===null||typeof t!="object"&&typeof t!="function",rn=Array.isArray,Jo=t=>rn(t)||typeof t?.[Symbol.iterator]=="function",Re=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yn=/-->/g,xn=/>/g,Ot=RegExp(`>|${Re}(?:([^\\s"'>=/]+)(${Re}*=${Re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kn=/'/g,Cn=/"/g,jn=/^(?:script|style|textarea|title)$/i,tr=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),g=tr(1),G=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),Sn=new WeakMap,zt=Tt.createTreeWalker(Tt,129);function Kn(t,e){if(!rn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return vn!==void 0?vn.createHTML(e):e}const er=(t,e)=>{const n=t.length-1,o=[];let r,a=e===2?"<svg>":e===3?"<math>":"",s=Wt;for(let c=0;c<n;c++){const d=t[c];let u,h,p=-1,m=0;for(;m<d.length&&(s.lastIndex=m,h=s.exec(d),h!==null);)m=s.lastIndex,s===Wt?h[1]==="!--"?s=yn:h[1]!==void 0?s=xn:h[2]!==void 0?(jn.test(h[2])&&(r=RegExp("</"+h[2],"g")),s=Ot):h[3]!==void 0&&(s=Ot):s===Ot?h[0]===">"?(s=r??Wt,p=-1):h[1]===void 0?p=-2:(p=s.lastIndex-h[2].length,u=h[1],s=h[3]===void 0?Ot:h[3]==='"'?Cn:kn):s===Cn||s===kn?s=Ot:s===yn||s===xn?s=Wt:(s=Ot,r=void 0);const f=s===Ot&&t[c+1].startsWith("/>")?" ":"";a+=s===Wt?d+Zo:p>=0?(o.push(u),d.slice(0,p)+Hn+d.slice(p)+kt+f):d+kt+(p===-2?c:f)}return[Kn(t,a+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class Jt{constructor({strings:e,_$litType$:n},o){let r;this.parts=[];let a=0,s=0;const c=e.length-1,d=this.parts,[u,h]=er(e,n);if(this.el=Jt.createElement(u,o),zt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=zt.nextNode())!==null&&d.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Hn)){const m=h[s++],f=r.getAttribute(p).split(kt),b=/([.?@])?(.*)/.exec(m);d.push({type:1,index:a,name:b[2],strings:f,ctor:b[1]==="."?or:b[1]==="?"?rr:b[1]==="@"?ar:Ee}),r.removeAttribute(p)}else p.startsWith(kt)&&(d.push({type:6,index:a}),r.removeAttribute(p));if(jn.test(r.tagName)){const p=r.textContent.split(kt),m=p.length-1;if(m>0){r.textContent=we?we.emptyScript:"";for(let f=0;f<m;f++)r.append(p[f],Qt()),zt.nextNode(),d.push({type:2,index:++a});r.append(p[m],Qt())}}}else if(r.nodeType===8)if(r.data===Wn)d.push({type:2,index:a});else{let p=-1;for(;(p=r.data.indexOf(kt,p+1))!==-1;)d.push({type:7,index:a}),p+=kt.length-1}a++}}static createElement(e,n){const o=Tt.createElement("template");return o.innerHTML=e,o}}function Bt(t,e,n=t,o){if(e===G)return e;let r=o!==void 0?n._$Co?.[o]:n._$Cl;const a=Zt(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(t),r._$AT(t,n,o)),o!==void 0?(n._$Co??=[])[o]=r:n._$Cl=r),r!==void 0&&(e=Bt(t,r._$AS(t,e.values),r,o)),e}class nr{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:o}=this._$AD,r=(e?.creationScope??Tt).importNode(n,!0);zt.currentNode=r;let a=zt.nextNode(),s=0,c=0,d=o[0];for(;d!==void 0;){if(s===d.index){let u;d.type===2?u=new ne(a,a.nextSibling,this,e):d.type===1?u=new d.ctor(a,d.name,d.strings,this,e):d.type===6&&(u=new ir(a,this,e)),this._$AV.push(u),d=o[++c]}s!==d?.index&&(a=zt.nextNode(),s++)}return zt.currentNode=Tt,r}p(e){let n=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,n),n+=o.strings.length-2):o._$AI(e[n])),n++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,o,r){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Bt(this,e,n),Zt(e)?e===L||e==null||e===""?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==G&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==L&&Zt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Tt.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Jt.createElement(Kn(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(n);else{const a=new nr(r,this),s=a.u(this.options);a.p(n),this.T(s),this._$AH=a}}_$AC(e){let n=Sn.get(e.strings);return n===void 0&&Sn.set(e.strings,n=new Jt(e)),n}k(e){rn(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let o,r=0;for(const a of e)r===n.length?n.push(o=new ne(this.O(Qt()),this.O(Qt()),this,this.options)):o=n[r],o._$AI(a),r++;r<n.length&&(this._$AR(o&&o._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,o,r,a){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=L}_$AI(e,n=this,o,r){const a=this.strings;let s=!1;if(a===void 0)e=Bt(this,e,n,0),s=!Zt(e)||e!==this._$AH&&e!==G,s&&(this._$AH=e);else{const c=e;let d,u;for(e=a[0],d=0;d<a.length-1;d++)u=Bt(this,c[o+d],n,d),u===G&&(u=this._$AH[d]),s||=!Zt(u)||u!==this._$AH[d],u===L?e=L:e!==L&&(e+=(u??"")+a[d+1]),this._$AH[d]=u}s&&!r&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class or extends Ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}}class rr extends Ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==L)}}class ar extends Ee{constructor(e,n,o,r,a){super(e,n,o,r,a),this.type=5}_$AI(e,n=this){if((e=Bt(this,e,n,0)??L)===G)return;const o=this._$AH,r=e===L&&o!==L||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==L&&(o===L||r);r&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ir{constructor(e,n,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Bt(this,e)}}const sr=on.litHtmlPolyfillSupport;sr?.(Jt,ne),(on.litHtmlVersions??=[]).push("3.3.1");const lr=(t,e,n)=>{const o=n?.renderBefore??e;let r=o._$litPart$;if(r===void 0){const a=n?.renderBefore??null;o._$litPart$=r=new ne(e.insertBefore(Qt(),a),a,void 0,n??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const an=globalThis;let Gt=class extends Rt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};Gt._$litElement$=!0,Gt.finalized=!0,an.litElementHydrateSupport?.({LitElement:Gt});const cr=an.litElementPolyfillSupport;cr?.({LitElement:Gt});(an.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dr=!1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=t=>(e,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hr={attribute:!0,type:String,converter:be,reflect:!1,hasChanged:nn},ur=(t=hr,e,n)=>{const{kind:o,metadata:r}=n;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(n.name,t),o==="accessor"){const{name:s}=n;return{set(c){const d=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,d,t)},init(c){return c!==void 0&&this.C(s,void 0,t,c),c}}}if(o==="setter"){const{name:s}=n;return function(c){const d=this[s];e.call(this,c),this.requestUpdate(s,d,t)}}throw Error("Unsupported decorator location: "+o)};function l(t){return(e,n)=>typeof n=="object"?ur(t,e,n):((o,r,a)=>{const s=r.hasOwnProperty(a);return r.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(r,a):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pr=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(t,e){return(n,o,r)=>{const a=s=>s.renderRoot?.querySelector(t)??null;return pr(n,o,{get(){return a(this)}})}}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var fr=`:host {
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
`,ue,P=class extends Gt{constructor(){super(),Vo(this,ue,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{if(this.internals?.states)try{n?this.internals.states.add(e):this.internals.states.delete(e)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[fr,...t].map(e=>typeof e=="string"?Un(e):e)}attributeChangedCallback(t,e,n){Mo(this,ue)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),Fo(this,ue,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};ue=new WeakMap;i([l()],P.prototype,"dir",2);i([l()],P.prototype,"lang",2);i([l({type:Boolean,reflect:!0,attribute:"did-ssr"})],P.prototype,"didSSR",2);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var mr=`:host {
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
`,Dt=class extends P{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return g` <slot part="base" role="status"></slot>`}};Dt.css=[ee,mr];i([l({reflect:!0})],Dt.prototype,"variant",2);i([l({reflect:!0})],Dt.prototype,"appearance",2);i([l({type:Boolean,reflect:!0})],Dt.prototype,"pill",2);i([l({reflect:!0})],Dt.prototype,"attention",2);Dt=i([z("wa-badge")],Dt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var sn=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let o=!0;if("checkValidity"in e&&(o=e.checkValidity()),o)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const r in e.validity){if(r==="valid")continue;const a=r;e.validity[a]&&n.invalidKeys.push(a)}return n}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Xn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},br=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),V=class extends P{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Xn))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[br()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const o of e)n.append(this.name,o);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,n,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let o="";for(const r of t){const{isValid:a,message:s,invalidKeys:c}=r.checkValidity(this);a||(o||(o=s),c?.length>=0&&c.forEach(d=>e[d]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,n)}};V.formAssociated=!0;i([l({reflect:!0})],V.prototype,"name",2);i([l({type:Boolean})],V.prototype,"disabled",2);i([l({state:!0,attribute:!1})],V.prototype,"valueHasChanged",2);i([l({state:!0,attribute:!1})],V.prototype,"hasInteracted",2);i([l({attribute:"custom-error",reflect:!0})],V.prototype,"customError",2);i([l({attribute:!1,state:!0,type:Object})],V.prototype,"validity",1);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var bt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const o=n.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var wt=`@layer wa-utilities {
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
`;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function R(t,e){const n={waitUntilFirstUpdate:!1,...e};return(o,r)=>{const{update:a}=o,s=Array.isArray(t)?t:[t];o.update=function(c){s.forEach(d=>{const u=d;if(c.has(u)){const h=c.get(u),p=this[u];h!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,p)}}),a.call(this,c)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},ln=t=>(...e)=>({_$litDirective$:t,values:e});let cn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,o){this._$Ct=e,this._$AM=n,this._$Ci=o}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=ln(class extends cn{constructor(t){if(super(t),t.type!==xt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}const n=t.element.classList;for(const o of this.st)o in e||(n.remove(o),this.st.delete(o));for(const o in e){const r=!!e[o];r===this.st.has(o)||this.nt?.has(o)||(r?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return G}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>t??L;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yn=Symbol.for(""),wr=t=>{if(t?.r===Yn)return t?._$litStatic$},$n=(t,...e)=>({_$litStatic$:e.reduce(((n,o,r)=>n+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[r+1]),t[0]),r:Yn}),En=new Map,gr=t=>(e,...n)=>{const o=n.length;let r,a;const s=[],c=[];let d,u=0,h=!1;for(;u<o;){for(d=e[u];u<o&&(a=n[u],(r=wr(a))!==void 0);)d+=r+e[++u],h=!0;u!==o&&c.push(a),s.push(d),u++}if(u===o&&s.push(e[o]),h){const p=s.join("$$lit$$");(e=En.get(p))===void 0&&(s.raw=s,En.set(p,e=s)),n=c}return t(e,...n)},Ie=gr(g);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var vr=`@layer wa-component {
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
`,S=class extends V{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new bt(this,"[default]","start","end"),this.localize=new lt(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,sn()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new Xn)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,o=!1,r=!1;[...t].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){const s=a;s.localName==="wa-icon"?(n=!0,e||(e=s.label!==void 0)):r=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(o=!0)}),this.isIconButton=n&&!o&&!r,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?$n`a`:$n`button`;return Ie`
      <${e}
        part="base"
        class=${U({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
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
        ${this.withCaret?Ie`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Ie`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};S.shadowRootOptions={...V.shadowRootOptions,delegatesFocus:!0};S.css=[vr,ee,wt];i([_(".button")],S.prototype,"button",2);i([_("slot:not([name])")],S.prototype,"labelSlot",2);i([j()],S.prototype,"invalid",2);i([j()],S.prototype,"isIconButton",2);i([l()],S.prototype,"title",2);i([l({reflect:!0})],S.prototype,"variant",2);i([l({reflect:!0})],S.prototype,"appearance",2);i([l({reflect:!0})],S.prototype,"size",2);i([l({attribute:"with-caret",type:Boolean,reflect:!0})],S.prototype,"withCaret",2);i([l({type:Boolean})],S.prototype,"disabled",2);i([l({type:Boolean,reflect:!0})],S.prototype,"loading",2);i([l({type:Boolean,reflect:!0})],S.prototype,"pill",2);i([l()],S.prototype,"type",2);i([l({reflect:!0})],S.prototype,"name",2);i([l({reflect:!0})],S.prototype,"value",2);i([l({reflect:!0})],S.prototype,"href",2);i([l()],S.prototype,"target",2);i([l()],S.prototype,"rel",2);i([l()],S.prototype,"download",2);i([l({reflect:!0})],S.prototype,"form",2);i([l({attribute:"formaction"})],S.prototype,"formAction",2);i([l({attribute:"formenctype"})],S.prototype,"formEnctype",2);i([l({attribute:"formmethod"})],S.prototype,"formMethod",2);i([l({attribute:"formnovalidate",type:Boolean})],S.prototype,"formNoValidate",2);i([l({attribute:"formtarget"})],S.prototype,"formTarget",2);i([R("disabled",{waitUntilFirstUpdate:!0})],S.prototype,"handleDisabledChange",1);S=i([z("wa-button")],S);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var yr=`:host {
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
`,Ke=class extends P{constructor(){super(...arguments),this.localize=new lt(this)}render(){return g`
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
    `}};Ke.css=yr;Ke=i([z("wa-spinner")],Ke);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var xr=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kr=(t,e)=>t?._$litType$!==void 0,Cr=t=>t.strings===void 0,Sr={},$r=(t,e=Sr)=>t._$AH=e;/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Er=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},Ar=`:host {
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
`,jt=Symbol(),le=Symbol(),qe,Be=new Map,W=class extends P{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=g`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(o,this),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?jt:le}catch{return le}try{const o=document.createElement("div");o.innerHTML=await n.text();const r=o.firstElementChild;if(r?.tagName?.toLowerCase()!=="svg")return jt;qe||(qe=new DOMParser);const s=qe.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):jt}catch{return jt}}}connectedCallback(){super.connectedCallback(),To(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Do(this)}getIconSource(){const t=Pe(this.library),e=this.family||Io();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?Pe(this.library):void 0;if(!t){this.svg=null;return}let o=Be.get(t);o||(o=this.resolveIcon(t,n),Be.set(t,o));const r=await o;if(r===le&&Be.delete(t),t===this.getIconSource().url){if(kr(r)){this.svg=r;return}switch(r){case le:case jt:this.svg=null,this.dispatchEvent(new Er);break;default:this.svg=r.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new xr)}}}updated(t){super.updated(t);const e=Pe(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:g`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};W.css=Ar;i([j()],W.prototype,"svg",2);i([l({reflect:!0})],W.prototype,"name",2);i([l({reflect:!0})],W.prototype,"family",2);i([l({reflect:!0})],W.prototype,"variant",2);i([l({attribute:"auto-width",type:Boolean,reflect:!0})],W.prototype,"autoWidth",2);i([l({attribute:"swap-opacity",type:Boolean,reflect:!0})],W.prototype,"swapOpacity",2);i([l()],W.prototype,"src",2);i([l()],W.prototype,"label",2);i([l({reflect:!0})],W.prototype,"library",2);i([R("label")],W.prototype,"handleLabelChange",1);i([R(["family","name","library","variant","src","autoWidth","swapOpacity"])],W.prototype,"setIcon",1);W=i([z("wa-icon")],W);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var _r=`:host {
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
`,ft=class extends P{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal",this.variant="neutral"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){Kt(t.target)?.classList.add("button-focus")}handleBlur(t){Kt(t.target)?.classList.remove("button-focus")}handleMouseOver(t){Kt(t.target)?.classList.add("button-hover")}handleMouseOut(t){Kt(t.target)?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const n=t.indexOf(e),o=Kt(e);o&&(o.appearance==="outlined"&&(this.hasOutlined=!0),o.classList.add("wa-button-group__button"),o.classList.toggle("wa-button-group__horizontal",this.orientation==="horizontal"),o.classList.toggle("wa-button-group__vertical",this.orientation==="vertical"),o.classList.toggle("wa-button-group__button-first",n===0),o.classList.toggle("wa-button-group__button-inner",n>0&&n<t.length-1),o.classList.toggle("wa-button-group__button-last",n===t.length-1),o.classList.toggle("wa-button-group__button-radio",o.tagName.toLowerCase()==="wa-radio-button"))})}render(){return g`
      <slot
        part="base"
        class=${U({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};ft.css=[ee,_r];i([_("slot")],ft.prototype,"defaultSlot",2);i([j()],ft.prototype,"disableRole",2);i([j()],ft.prototype,"hasOutlined",2);i([l()],ft.prototype,"label",2);i([l({reflect:!0})],ft.prototype,"orientation",2);i([l({reflect:!0})],ft.prototype,"variant",2);ft=i([z("wa-button-group")],ft);function Kt(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Or=`:host {
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
`,Mt=class extends P{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return g`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};Mt.css=[Or,ee,wt];i([l({reflect:!0})],Mt.prototype,"variant",2);i([l({reflect:!0})],Mt.prototype,"appearance",2);i([l({reflect:!0})],Mt.prototype,"size",2);Mt=i([z("wa-callout")],Mt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Lr=`:host {
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
`,Ct=class extends P{constructor(){super(...arguments),this.hasSlotController=new bt(this,"footer","header","media"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?g`
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
    `}};Ct.css=[wt,Lr];i([l({reflect:!0})],Ct.prototype,"appearance",2);i([l({attribute:"with-header",type:Boolean,reflect:!0})],Ct.prototype,"withHeader",2);i([l({attribute:"with-media",type:Boolean,reflect:!0})],Ct.prototype,"withMedia",2);i([l({attribute:"with-footer",type:Boolean,reflect:!0})],Ct.prototype,"withFooter",2);i([l({reflect:!0})],Ct.prototype,"orientation",2);Ct=i([z("wa-card")],Ct);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Gn=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const o={observedAttributes:["required"],message:e.validationMessage,checkValidity(r){const a={message:"",isValid:!0,invalidKeys:[]};return(r.required??r.hasAttribute("required"))&&!r[n]&&(a.message=typeof o.message=="function"?o.message(r):o.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return o};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ae=`:host {
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
 */const ge=ln(class extends cn{constructor(t){if(super(t),t.type!==xt.PROPERTY&&t.type!==xt.ATTRIBUTE&&t.type!==xt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Cr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===G||e===L)return e;const n=t.element,o=t.name;if(t.type===xt.PROPERTY){if(e===n[o])return G}else if(t.type===xt.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(o))return G}else if(t.type===xt.ATTRIBUTE&&n.getAttribute(o)===e+"")return G;return $r(t),e}});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var zr=`:host {
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
`,T=class extends V{constructor(){super(...arguments),this.hasSlotController=new bt(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[Gn({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,o=n?"indeterminate":"check",r=n?"indeterminate":"check";return g`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${A(this._value)}
            .indeterminate=${ge(this.indeterminate)}
            .checked=${ge(this.checked)}
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
        class="${U({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};T.css=[Ae,wt,zr];T.shadowRootOptions={...V.shadowRootOptions,delegatesFocus:!0};i([_('input[type="checkbox"]')],T.prototype,"input",2);i([l()],T.prototype,"title",2);i([l({reflect:!0})],T.prototype,"name",2);i([l({reflect:!0})],T.prototype,"value",1);i([l({reflect:!0})],T.prototype,"size",2);i([l({type:Boolean})],T.prototype,"disabled",2);i([l({type:Boolean,reflect:!0})],T.prototype,"indeterminate",2);i([l({type:Boolean,attribute:!1})],T.prototype,"checked",2);i([l({type:Boolean,reflect:!0,attribute:"checked"})],T.prototype,"defaultChecked",2);i([l({reflect:!0})],T.prototype,"form",2);i([l({type:Boolean,reflect:!0})],T.prototype,"required",2);i([l()],T.prototype,"hint",2);i([R("defaultChecked")],T.prototype,"handleDefaultCheckedChange",1);i([R(["checked","indeterminate"])],T.prototype,"handleStateChange",1);i([R("disabled")],T.prototype,"handleDisabledChange",1);T=i([z("wa-checkbox")],T);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Tr(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Xe=new Set;function Dr(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Pr(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function ve(t){if(Xe.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const e=Dr()+Pr();let n=getComputedStyle(document.documentElement).scrollbarGutter;(!n||n==="auto")&&(n="stable"),e<2&&(n=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",n),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function ye(t){Xe.delete(t),Xe.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function Rr(t,e,n="vertical",o="smooth"){const r=Tr(t,e),a=r.top+e.scrollTop,s=r.left+e.scrollLeft,c=e.scrollLeft,d=e.scrollLeft+e.offsetWidth,u=e.scrollTop,h=e.scrollTop+e.offsetHeight;(n==="horizontal"||n==="both")&&(s<c?e.scrollTo({left:s,behavior:o}):s+t.clientWidth>d&&e.scrollTo({left:s-e.offsetWidth+t.clientWidth,behavior:o})),(n==="vertical"||n==="both")&&(a<u?e.scrollTo({top:a,behavior:o}):a+t.clientHeight>h&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:o}))}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Qn(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var oe=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},re=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},ae=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},ie=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function M(t,e){return new Promise(n=>{const o=new AbortController,{signal:r}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let a=()=>{t.classList.remove(e),n(),o.abort()};t.addEventListener("animationend",a,{once:!0,signal:r}),t.addEventListener("animationcancel",a,{once:!0,signal:r})})}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ir=`:host {
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
`,mt=class extends P{constructor(){super(...arguments),this.localize=new lt(this),this.hasSlotController=new bt(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),ve(this))}disconnectedCallback(){super.disconnectedCallback(),ye(this),this.removeOpenListeners()}async requestClose(t){const e=new ae({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,M(this.dialog,"pulse");return}this.removeOpenListeners(),await M(this.dialog,"hide"),this.open=!1,this.dialog.close(),ye(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new oe)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&this.requestClose(this.dialog)}handleDialogClick(t){const n=t.target.closest('[data-dialog="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await M(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new ie;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),ve(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await M(this.dialog,"show"),this.dispatchEvent(new re)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return g`
      <dialog
        part="dialog"
        class=${U({dialog:!0,open:this.open})}
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
    `}};mt.css=Ir;i([_(".dialog")],mt.prototype,"dialog",2);i([l({type:Boolean,reflect:!0})],mt.prototype,"open",2);i([l({reflect:!0})],mt.prototype,"label",2);i([l({attribute:"without-header",type:Boolean,reflect:!0})],mt.prototype,"withoutHeader",2);i([l({attribute:"light-dismiss",type:Boolean})],mt.prototype,"lightDismiss",2);i([R("open",{waitUntilFirstUpdate:!0})],mt.prototype,"handleOpenChange",1);mt=i([z("wa-dialog")],mt);document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[n,o]=Qn(e.getAttribute("data-dialog")||"");if(n==="open"&&o?.length){const a=e.getRootNode().getElementById(o);a?.localName==="wa-dialog"?a.open=!0:console.warn(`A dialog with an ID of "${o}" could not be found in this document.`)}}});document.addEventListener("pointerdown",()=>{});/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var qr=`:host {
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
`,te=class extends P{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};te.css=qr;i([l({reflect:!0})],te.prototype,"orientation",2);i([R("orientation")],te.prototype,"handleVerticalChange",1);te=i([z("wa-divider")],te);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Br=`:host {
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
`,it=class extends P{constructor(){super(...arguments),this.localize=new lt(this),this.hasSlotController=new bt(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),ve(this))}disconnectedCallback(){super.disconnectedCallback(),ye(this),this.removeOpenListeners()}async requestClose(t){const e=new ae({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,M(this.drawer,"pulse");return}this.removeOpenListeners(),await M(this.drawer,"hide"),this.open=!1,this.drawer.close(),ye(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new oe)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),!this.drawer.classList.contains("hide")&&t.target===this.drawer&&this.requestClose(this.drawer)}handleDialogClick(t){const n=t.target.closest('[data-drawer="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await M(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new ie;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),ve(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await M(this.drawer,"show"),this.dispatchEvent(new re)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return g`
      <dialog
        part="dialog"
        class=${U({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
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
    `}};it.css=Br;i([_(".drawer")],it.prototype,"drawer",2);i([l({type:Boolean,reflect:!0})],it.prototype,"open",2);i([l({reflect:!0})],it.prototype,"label",2);i([l({reflect:!0})],it.prototype,"placement",2);i([l({attribute:"without-header",type:Boolean,reflect:!0})],it.prototype,"withoutHeader",2);i([l({attribute:"light-dismiss",type:Boolean})],it.prototype,"lightDismiss",2);i([R("open",{waitUntilFirstUpdate:!0})],it.prototype,"handleOpenChange",1);it=i([z("wa-drawer")],it);document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[n,o]=Qn(e.getAttribute("data-drawer")||"");if(n==="open"&&o?.length){const a=e.getRootNode().getElementById(o);a?.localName==="wa-drawer"?a.open=!0:console.warn(`A drawer with an ID of "${o}" could not be found in this document.`)}}});document.body.addEventListener("pointerdown",()=>{});const Mr="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let Vr=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Mr[n[t]&63];return e};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Zn(t=""){return`${t}${Vr()}`}const St=Math.min,K=Math.max,xe=Math.round,ce=Math.floor,at=t=>({x:t,y:t}),Fr={left:"right",right:"left",bottom:"top",top:"bottom"},Nr={start:"end",end:"start"};function Ye(t,e,n){return K(t,St(e,n))}function Nt(t,e){return typeof t=="function"?t(e):t}function $t(t){return t.split("-")[0]}function Ut(t){return t.split("-")[1]}function Jn(t){return t==="x"?"y":"x"}function dn(t){return t==="y"?"height":"width"}const Ur=new Set(["top","bottom"]);function pt(t){return Ur.has($t(t))?"y":"x"}function hn(t){return Jn(pt(t))}function Hr(t,e,n){n===void 0&&(n=!1);const o=Ut(t),r=hn(t),a=dn(r);let s=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(s=ke(s)),[s,ke(s)]}function Wr(t){const e=ke(t);return[Ge(t),e,Ge(e)]}function Ge(t){return t.replace(/start|end/g,e=>Nr[e])}const An=["left","right"],_n=["right","left"],jr=["top","bottom"],Kr=["bottom","top"];function Xr(t,e,n){switch(t){case"top":case"bottom":return n?e?_n:An:e?An:_n;case"left":case"right":return e?jr:Kr;default:return[]}}function Yr(t,e,n,o){const r=Ut(t);let a=Xr($t(t),n==="start",o);return r&&(a=a.map(s=>s+"-"+r),e&&(a=a.concat(a.map(Ge)))),a}function ke(t){return t.replace(/left|right|bottom|top/g,e=>Fr[e])}function Gr(t){return{top:0,right:0,bottom:0,left:0,...t}}function to(t){return typeof t!="number"?Gr(t):{top:t,right:t,bottom:t,left:t}}function Ce(t){const{x:e,y:n,width:o,height:r}=t;return{width:o,height:r,top:n,left:e,right:e+o,bottom:n+r,x:e,y:n}}function On(t,e,n){let{reference:o,floating:r}=t;const a=pt(e),s=hn(e),c=dn(s),d=$t(e),u=a==="y",h=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2,m=o[c]/2-r[c]/2;let f;switch(d){case"top":f={x:h,y:o.y-r.height};break;case"bottom":f={x:h,y:o.y+o.height};break;case"right":f={x:o.x+o.width,y:p};break;case"left":f={x:o.x-r.width,y:p};break;default:f={x:o.x,y:o.y}}switch(Ut(e)){case"start":f[s]-=m*(n&&u?-1:1);break;case"end":f[s]+=m*(n&&u?-1:1);break}return f}const Qr=async(t,e,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:a=[],platform:s}=n,c=a.filter(Boolean),d=await(s.isRTL==null?void 0:s.isRTL(e));let u=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:p}=On(u,o,d),m=o,f={},b=0;for(let w=0;w<c.length;w++){const{name:k,fn:y}=c[w],{x:C,y:E,data:I,reset:O}=await y({x:h,y:p,initialPlacement:o,placement:m,strategy:r,middlewareData:f,rects:u,platform:s,elements:{reference:t,floating:e}});h=C??h,p=E??p,f={...f,[k]:{...f[k],...I}},O&&b<=50&&(b++,typeof O=="object"&&(O.placement&&(m=O.placement),O.rects&&(u=O.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:r}):O.rects),{x:h,y:p}=On(u,m,d)),w=-1)}return{x:h,y:p,placement:m,strategy:r,middlewareData:f}};async function un(t,e){var n;e===void 0&&(e={});const{x:o,y:r,platform:a,rects:s,elements:c,strategy:d}=t,{boundary:u="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=Nt(e,t),b=to(f),k=c[m?p==="floating"?"reference":"floating":p],y=Ce(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(k)))==null||n?k:k.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(c.floating)),boundary:u,rootBoundary:h,strategy:d})),C=p==="floating"?{x:o,y:r,width:s.floating.width,height:s.floating.height}:s.reference,E=await(a.getOffsetParent==null?void 0:a.getOffsetParent(c.floating)),I=await(a.isElement==null?void 0:a.isElement(E))?await(a.getScale==null?void 0:a.getScale(E))||{x:1,y:1}:{x:1,y:1},O=Ce(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:C,offsetParent:E,strategy:d}):C);return{top:(y.top-O.top+b.top)/I.y,bottom:(O.bottom-y.bottom+b.bottom)/I.y,left:(y.left-O.left+b.left)/I.x,right:(O.right-y.right+b.right)/I.x}}const Zr=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:r,rects:a,platform:s,elements:c,middlewareData:d}=e,{element:u,padding:h=0}=Nt(t,e)||{};if(u==null)return{};const p=to(h),m={x:n,y:o},f=hn(r),b=dn(f),w=await s.getDimensions(u),k=f==="y",y=k?"top":"left",C=k?"bottom":"right",E=k?"clientHeight":"clientWidth",I=a.reference[b]+a.reference[f]-m[f]-a.floating[b],O=m[f]-a.reference[f],Q=await(s.getOffsetParent==null?void 0:s.getOffsetParent(u));let B=Q?Q[E]:0;(!B||!await(s.isElement==null?void 0:s.isElement(Q)))&&(B=c.floating[E]||a.floating[b]);const dt=I/2-O/2,ot=B/2-w[b]/2-1,Y=St(p[y],ot),gt=St(p[C],ot),rt=Y,vt=B-w[b]-gt,F=B/2-w[b]/2+dt,_t=Ye(rt,F,vt),ht=!d.arrow&&Ut(r)!=null&&F!==_t&&a.reference[b]/2-(F<rt?Y:gt)-w[b]/2<0,Z=ht?F<rt?F-rt:F-vt:0;return{[f]:m[f]+Z,data:{[f]:_t,centerOffset:F-_t-Z,...ht&&{alignmentOffset:Z}},reset:ht}}}),Jr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:r,middlewareData:a,rects:s,initialPlacement:c,platform:d,elements:u}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:w=!0,...k}=Nt(t,e);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const y=$t(r),C=pt(c),E=$t(c)===c,I=await(d.isRTL==null?void 0:d.isRTL(u.floating)),O=m||(E||!w?[ke(c)]:Wr(c)),Q=b!=="none";!m&&Q&&O.push(...Yr(c,w,b,I));const B=[c,...O],dt=await un(e,k),ot=[];let Y=((o=a.flip)==null?void 0:o.overflows)||[];if(h&&ot.push(dt[y]),p){const F=Hr(r,s,I);ot.push(dt[F[0]],dt[F[1]])}if(Y=[...Y,{placement:r,overflows:ot}],!ot.every(F=>F<=0)){var gt,rt;const F=(((gt=a.flip)==null?void 0:gt.index)||0)+1,_t=B[F];if(_t&&(!(p==="alignment"?C!==pt(_t):!1)||Y.every(J=>pt(J.placement)===C?J.overflows[0]>0:!0)))return{data:{index:F,overflows:Y},reset:{placement:_t}};let ht=(rt=Y.filter(Z=>Z.overflows[0]<=0).sort((Z,J)=>Z.overflows[1]-J.overflows[1])[0])==null?void 0:rt.placement;if(!ht)switch(f){case"bestFit":{var vt;const Z=(vt=Y.filter(J=>{if(Q){const yt=pt(J.placement);return yt===C||yt==="y"}return!0}).map(J=>[J.placement,J.overflows.filter(yt=>yt>0).reduce((yt,wo)=>yt+wo,0)]).sort((J,yt)=>J[1]-yt[1])[0])==null?void 0:vt[0];Z&&(ht=Z);break}case"initialPlacement":ht=c;break}if(r!==ht)return{reset:{placement:ht}}}return{}}}},ta=new Set(["left","top"]);async function ea(t,e){const{placement:n,platform:o,elements:r}=t,a=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=$t(n),c=Ut(n),d=pt(n)==="y",u=ta.has(s)?-1:1,h=a&&d?-1:1,p=Nt(e,t);let{mainAxis:m,crossAxis:f,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return c&&typeof b=="number"&&(f=c==="end"?b*-1:b),d?{x:f*h,y:m*u}:{x:m*u,y:f*h}}const na=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:r,y:a,placement:s,middlewareData:c}=e,d=await ea(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:r+d.x,y:a+d.y,data:{...d,placement:s}}}}},oa=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:r}=e,{mainAxis:a=!0,crossAxis:s=!1,limiter:c={fn:k=>{let{x:y,y:C}=k;return{x:y,y:C}}},...d}=Nt(t,e),u={x:n,y:o},h=await un(e,d),p=pt($t(r)),m=Jn(p);let f=u[m],b=u[p];if(a){const k=m==="y"?"top":"left",y=m==="y"?"bottom":"right",C=f+h[k],E=f-h[y];f=Ye(C,f,E)}if(s){const k=p==="y"?"top":"left",y=p==="y"?"bottom":"right",C=b+h[k],E=b-h[y];b=Ye(C,b,E)}const w=c.fn({...e,[m]:f,[p]:b});return{...w,data:{x:w.x-n,y:w.y-o,enabled:{[m]:a,[p]:s}}}}}},ra=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:r,rects:a,platform:s,elements:c}=e,{apply:d=()=>{},...u}=Nt(t,e),h=await un(e,u),p=$t(r),m=Ut(r),f=pt(r)==="y",{width:b,height:w}=a.floating;let k,y;p==="top"||p==="bottom"?(k=p,y=m===(await(s.isRTL==null?void 0:s.isRTL(c.floating))?"start":"end")?"left":"right"):(y=p,k=m==="end"?"top":"bottom");const C=w-h.top-h.bottom,E=b-h.left-h.right,I=St(w-h[k],C),O=St(b-h[y],E),Q=!e.middlewareData.shift;let B=I,dt=O;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(dt=E),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(B=C),Q&&!m){const Y=K(h.left,0),gt=K(h.right,0),rt=K(h.top,0),vt=K(h.bottom,0);f?dt=b-2*(Y!==0||gt!==0?Y+gt:K(h.left,h.right)):B=w-2*(rt!==0||vt!==0?rt+vt:K(h.top,h.bottom))}await d({...e,availableWidth:dt,availableHeight:B});const ot=await s.getDimensions(c.floating);return b!==ot.width||w!==ot.height?{reset:{rects:!0}}:{}}}};function _e(){return typeof window<"u"}function Ht(t){return eo(t)?(t.nodeName||"").toLowerCase():"#document"}function X(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function ct(t){var e;return(e=(eo(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function eo(t){return _e()?t instanceof Node||t instanceof X(t).Node:!1}function tt(t){return _e()?t instanceof Element||t instanceof X(t).Element:!1}function st(t){return _e()?t instanceof HTMLElement||t instanceof X(t).HTMLElement:!1}function Ln(t){return!_e()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof X(t).ShadowRoot}const aa=new Set(["inline","contents"]);function se(t){const{overflow:e,overflowX:n,overflowY:o,display:r}=et(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!aa.has(r)}const ia=new Set(["table","td","th"]);function sa(t){return ia.has(Ht(t))}const la=[":popover-open",":modal"];function Oe(t){return la.some(e=>{try{return t.matches(e)}catch{return!1}})}const ca=["transform","translate","scale","rotate","perspective"],da=["transform","translate","scale","rotate","perspective","filter"],ha=["paint","layout","strict","content"];function Le(t){const e=pn(),n=tt(t)?et(t):t;return ca.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||da.some(o=>(n.willChange||"").includes(o))||ha.some(o=>(n.contain||"").includes(o))}function ua(t){let e=Et(t);for(;st(e)&&!Vt(e);){if(Le(e))return e;if(Oe(e))return null;e=Et(e)}return null}function pn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const pa=new Set(["html","body","#document"]);function Vt(t){return pa.has(Ht(t))}function et(t){return X(t).getComputedStyle(t)}function ze(t){return tt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Et(t){if(Ht(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Ln(t)&&t.host||ct(t);return Ln(e)?e.host:e}function no(t){const e=Et(t);return Vt(e)?t.ownerDocument?t.ownerDocument.body:t.body:st(e)&&se(e)?e:no(e)}function Ft(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const r=no(t),a=r===((o=t.ownerDocument)==null?void 0:o.body),s=X(r);if(a){const c=Qe(s);return e.concat(s,s.visualViewport||[],se(r)?r:[],c&&n?Ft(c):[])}return e.concat(r,Ft(r,[],n))}function Qe(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function oo(t){const e=et(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=st(t),a=r?t.offsetWidth:n,s=r?t.offsetHeight:o,c=xe(n)!==a||xe(o)!==s;return c&&(n=a,o=s),{width:n,height:o,$:c}}function fn(t){return tt(t)?t:t.contextElement}function qt(t){const e=fn(t);if(!st(e))return at(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:a}=oo(e);let s=(a?xe(n.width):n.width)/o,c=(a?xe(n.height):n.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const fa=at(0);function ro(t){const e=X(t);return!pn()||!e.visualViewport?fa:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ma(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==X(t)?!1:e}function Pt(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const r=t.getBoundingClientRect(),a=fn(t);let s=at(1);e&&(o?tt(o)&&(s=qt(o)):s=qt(t));const c=ma(a,n,o)?ro(a):at(0);let d=(r.left+c.x)/s.x,u=(r.top+c.y)/s.y,h=r.width/s.x,p=r.height/s.y;if(a){const m=X(a),f=o&&tt(o)?X(o):o;let b=m,w=Qe(b);for(;w&&o&&f!==b;){const k=qt(w),y=w.getBoundingClientRect(),C=et(w),E=y.left+(w.clientLeft+parseFloat(C.paddingLeft))*k.x,I=y.top+(w.clientTop+parseFloat(C.paddingTop))*k.y;d*=k.x,u*=k.y,h*=k.x,p*=k.y,d+=E,u+=I,b=X(w),w=Qe(b)}}return Ce({width:h,height:p,x:d,y:u})}function Te(t,e){const n=ze(t).scrollLeft;return e?e.left+n:Pt(ct(t)).left+n}function ao(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-Te(t,n),r=n.top+e.scrollTop;return{x:o,y:r}}function ba(t){let{elements:e,rect:n,offsetParent:o,strategy:r}=t;const a=r==="fixed",s=ct(o),c=e?Oe(e.floating):!1;if(o===s||c&&a)return n;let d={scrollLeft:0,scrollTop:0},u=at(1);const h=at(0),p=st(o);if((p||!p&&!a)&&((Ht(o)!=="body"||se(s))&&(d=ze(o)),st(o))){const f=Pt(o);u=qt(o),h.x=f.x+o.clientLeft,h.y=f.y+o.clientTop}const m=s&&!p&&!a?ao(s,d):at(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-d.scrollLeft*u.x+h.x+m.x,y:n.y*u.y-d.scrollTop*u.y+h.y+m.y}}function wa(t){return Array.from(t.getClientRects())}function ga(t){const e=ct(t),n=ze(t),o=t.ownerDocument.body,r=K(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),a=K(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Te(t);const c=-n.scrollTop;return et(o).direction==="rtl"&&(s+=K(e.clientWidth,o.clientWidth)-r),{width:r,height:a,x:s,y:c}}const zn=25;function va(t,e){const n=X(t),o=ct(t),r=n.visualViewport;let a=o.clientWidth,s=o.clientHeight,c=0,d=0;if(r){a=r.width,s=r.height;const h=pn();(!h||h&&e==="fixed")&&(c=r.offsetLeft,d=r.offsetTop)}const u=Te(o);if(u<=0){const h=o.ownerDocument,p=h.body,m=getComputedStyle(p),f=h.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,b=Math.abs(o.clientWidth-p.clientWidth-f);b<=zn&&(a-=b)}else u<=zn&&(a+=u);return{width:a,height:s,x:c,y:d}}const ya=new Set(["absolute","fixed"]);function xa(t,e){const n=Pt(t,!0,e==="fixed"),o=n.top+t.clientTop,r=n.left+t.clientLeft,a=st(t)?qt(t):at(1),s=t.clientWidth*a.x,c=t.clientHeight*a.y,d=r*a.x,u=o*a.y;return{width:s,height:c,x:d,y:u}}function Tn(t,e,n){let o;if(e==="viewport")o=va(t,n);else if(e==="document")o=ga(ct(t));else if(tt(e))o=xa(e,n);else{const r=ro(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return Ce(o)}function io(t,e){const n=Et(t);return n===e||!tt(n)||Vt(n)?!1:et(n).position==="fixed"||io(n,e)}function ka(t,e){const n=e.get(t);if(n)return n;let o=Ft(t,[],!1).filter(c=>tt(c)&&Ht(c)!=="body"),r=null;const a=et(t).position==="fixed";let s=a?Et(t):t;for(;tt(s)&&!Vt(s);){const c=et(s),d=Le(s);!d&&c.position==="fixed"&&(r=null),(a?!d&&!r:!d&&c.position==="static"&&!!r&&ya.has(r.position)||se(s)&&!d&&io(t,s))?o=o.filter(h=>h!==s):r=c,s=Et(s)}return e.set(t,o),o}function Ca(t){let{element:e,boundary:n,rootBoundary:o,strategy:r}=t;const s=[...n==="clippingAncestors"?Oe(e)?[]:ka(e,this._c):[].concat(n),o],c=s[0],d=s.reduce((u,h)=>{const p=Tn(e,h,r);return u.top=K(p.top,u.top),u.right=St(p.right,u.right),u.bottom=St(p.bottom,u.bottom),u.left=K(p.left,u.left),u},Tn(e,c,r));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}}function Sa(t){const{width:e,height:n}=oo(t);return{width:e,height:n}}function $a(t,e,n){const o=st(e),r=ct(e),a=n==="fixed",s=Pt(t,!0,a,e);let c={scrollLeft:0,scrollTop:0};const d=at(0);function u(){d.x=Te(r)}if(o||!o&&!a)if((Ht(e)!=="body"||se(r))&&(c=ze(e)),o){const f=Pt(e,!0,a,e);d.x=f.x+e.clientLeft,d.y=f.y+e.clientTop}else r&&u();a&&!o&&r&&u();const h=r&&!o&&!a?ao(r,c):at(0),p=s.left+c.scrollLeft-d.x-h.x,m=s.top+c.scrollTop-d.y-h.y;return{x:p,y:m,width:s.width,height:s.height}}function Me(t){return et(t).position==="static"}function Dn(t,e){if(!st(t)||et(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return ct(t)===n&&(n=n.ownerDocument.body),n}function so(t,e){const n=X(t);if(Oe(t))return n;if(!st(t)){let r=Et(t);for(;r&&!Vt(r);){if(tt(r)&&!Me(r))return r;r=Et(r)}return n}let o=Dn(t,e);for(;o&&sa(o)&&Me(o);)o=Dn(o,e);return o&&Vt(o)&&Me(o)&&!Le(o)?n:o||ua(t)||n}const Ea=async function(t){const e=this.getOffsetParent||so,n=this.getDimensions,o=await n(t.floating);return{reference:$a(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Aa(t){return et(t).direction==="rtl"}const pe={convertOffsetParentRelativeRectToViewportRelativeRect:ba,getDocumentElement:ct,getClippingRect:Ca,getOffsetParent:so,getElementRects:Ea,getClientRects:wa,getDimensions:Sa,getScale:qt,isElement:tt,isRTL:Aa};function lo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function _a(t,e){let n=null,o;const r=ct(t);function a(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function s(c,d){c===void 0&&(c=!1),d===void 0&&(d=1),a();const u=t.getBoundingClientRect(),{left:h,top:p,width:m,height:f}=u;if(c||e(),!m||!f)return;const b=ce(p),w=ce(r.clientWidth-(h+m)),k=ce(r.clientHeight-(p+f)),y=ce(h),E={rootMargin:-b+"px "+-w+"px "+-k+"px "+-y+"px",threshold:K(0,St(1,d))||1};let I=!0;function O(Q){const B=Q[0].intersectionRatio;if(B!==d){if(!I)return s();B?s(!1,B):o=setTimeout(()=>{s(!1,1e-7)},1e3)}B===1&&!lo(u,t.getBoundingClientRect())&&s(),I=!1}try{n=new IntersectionObserver(O,{...E,root:r.ownerDocument})}catch{n=new IntersectionObserver(O,E)}n.observe(t)}return s(!0),a}function co(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:a=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:d=!1}=o,u=fn(t),h=r||a?[...u?Ft(u):[],...Ft(e)]:[];h.forEach(y=>{r&&y.addEventListener("scroll",n,{passive:!0}),a&&y.addEventListener("resize",n)});const p=u&&c?_a(u,n):null;let m=-1,f=null;s&&(f=new ResizeObserver(y=>{let[C]=y;C&&C.target===u&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var E;(E=f)==null||E.observe(e)})),n()}),u&&!d&&f.observe(u),f.observe(e));let b,w=d?Pt(t):null;d&&k();function k(){const y=Pt(t);w&&!lo(w,y)&&n(),w=y,b=requestAnimationFrame(k)}return n(),()=>{var y;h.forEach(C=>{r&&C.removeEventListener("scroll",n),a&&C.removeEventListener("resize",n)}),p?.(),(y=f)==null||y.disconnect(),f=null,d&&cancelAnimationFrame(b)}}const ho=na,uo=oa,po=Jr,Pn=ra,Oa=Zr,fo=(t,e,n)=>{const o=new Map,r={platform:pe,...n},a={...r.platform,_c:o};return Qr(t,e,{...r,platform:a})};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var La=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};function*mo(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*mo(t.shadowRoot.activeElement)))}var za=`:host {
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
`,Ve=new Set,H=class extends P{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new lt(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"){const h=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,h?.focus();return}const n=[...mo()].find(h=>h.localName==="wa-dropdown-item"),o=n?.localName==="wa-dropdown-item",r=this.getCurrentSubmenuItem(),a=!!r;let s,c,d;a?(s=this.getSubmenuItems(r),c=s.find(h=>h.active||h===n),d=c?s.indexOf(c):-1):(s=this.getItems(),c=s.find(h=>h.active||h===n),d=c?s.indexOf(c):-1);let u;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),d>0?u=s[d-1]:u=s[s.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),d!==-1&&d<s.length-1?u=s[d+1]:u=s[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&o&&c&&c.hasSubmenu){t.preventDefault(),t.stopPropagation(),c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{const h=this.getSubmenuItems(c);h.length>0&&(h.forEach((p,m)=>p.active=m===0),h[0].focus())},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&a){t.preventDefault(),t.stopPropagation();const h=this.removeFromSubmenuStack();h&&(h.submenuOpen=!1,setTimeout(()=>{h.focus(),h.active=!0,(h.slot==="submenu"?this.getSubmenuItems(h.parentElement):this.getItems()).forEach(m=>{m!==h&&(m.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),u=t.key==="Home"?s[0]:s[s.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,s.some(h=>{const p=(h.textContent||"").trim().toLowerCase(),m=this.userTypedQuery.trim().toLowerCase();return p.startsWith(m)?(u=h,!0):!1})),u){t.preventDefault(),t.stopPropagation(),s.forEach(h=>h.active=h===u),u.focus();return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&o&&c&&(t.preventDefault(),t.stopPropagation(),c.hasSubmenu?(c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{const h=this.getSubmenuItems(c);h.length>0&&(h.forEach((p,m)=>p.active=m===0),h[0].focus())},0)):this.makeSelection(c))},this.handleDocumentPointerDown=t=>{t.composedPath().some(o=>o instanceof HTMLElement?o===this||o.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const n=e.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl",r=o?n.right:n.left,a=o?Math.max(t.clientX,r):Math.min(t.clientX,r),s=Math.max(n.top,Math.min(t.clientY,n.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${a}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${s}px`);const c=e.matches(":hover"),d=e.submenuElement?.matches(":hover")||!!t.composedPath().find(u=>u instanceof HTMLElement&&u.closest('[part="submenu"]')===e.submenuElement);!c&&!d&&setTimeout(()=>{!e.matches(":hover")&&!e.submenuElement?.matches(":hover")&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){t.has("open")&&(this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())),t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(n=>n.localName==="wa-dropdown-item");return t?e:e.filter(n=>!n.disabled)}getSubmenuItems(t,e=!1){const n=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!n)return[];const o=n.assignedElements({flatten:!0}).filter(r=>r.localName==="wa-dropdown-item");return e?o:o.filter(r=>!r.disabled)}syncItemSizes(){this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let n;e?n=this.getSubmenuItems(e,!0):n=this.getItems(!0),n.forEach(o=>{o!==t&&o.submenuOpen&&(o.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger())return;const e=new ie;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}Ve.forEach(o=>o.open=!1),this.popup.active=!0,this.open=!0,Ve.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await M(this.menu,"show");const n=this.getItems();n.length>0&&(n.forEach((o,r)=>o.active=r===0),n[0].focus()),this.dispatchEvent(new re)}async hideMenu(){const t=new ae({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,Ve.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await M(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new oe)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(o=>o.updateComplete)),this.syncItemSizes();const e=t.some(o=>o.type==="checkbox"),n=t.some(o=>o.hasSubmenu);t.forEach((o,r)=>{o.active=r===0,o.checkboxAdjacent=e,o.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=co(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const n=t.submenuElement.querySelector('slot[name="submenu"]');n&&(n.removeEventListener("slotchange",H.handleSubmenuSlotChange),n.addEventListener("slotchange",H.handleSubmenuSlotChange),H.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const n=e.assignedElements().filter(a=>a.localName==="wa-dropdown-item");if(n.length===0)return;const o=n.some(a=>a.hasSubmenu),r=n.some(a=>a.type==="checkbox");n.forEach(a=>{a.submenuAdjacent=o,a.checkboxAdjacent=r})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),n=e.some(o=>o.hasSubmenu);e.forEach(o=>{o.submenuAdjacent=n})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const n=this.localize.dir()==="rtl"?"left-start":"right-start";fo(t,t.submenuElement,{placement:n,middleware:[ho({mainAxis:0,crossAxis:-5}),po({fallbackStrategy:"bestFit"}),uo({padding:8})]}).then(({x:o,y:r,placement:a})=>{t.submenuElement.setAttribute("data-placement",a),Object.assign(t.submenuElement.style,{left:`${o}px`,top:`${r}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const n=t.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${n.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${n.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const n=new La({item:t});this.dispatchEvent(n),n.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",Zn("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup.active:this.open;return g`
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
    `}};H.css=[wt,za];i([_("slot:not([name])")],H.prototype,"defaultSlot",2);i([_("#menu")],H.prototype,"menu",2);i([_("wa-popup")],H.prototype,"popup",2);i([l({type:Boolean,reflect:!0})],H.prototype,"open",2);i([l({reflect:!0})],H.prototype,"size",2);i([l({reflect:!0})],H.prototype,"placement",2);i([l({type:Number})],H.prototype,"distance",2);i([l({type:Number})],H.prototype,"skidding",2);H=i([z("wa-dropdown")],H);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ta=`:host {
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
`,N=class extends P{constructor(){super(...arguments),this.hasSlotController=new bt(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.notifyParentOfOpening(),this.submenuElement.showPopover(),this.submenuElement.hidden=!1,this.submenuElement.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await M(this.submenuElement,"show"),setTimeout(()=>{const t=this.getSubmenuItems();t.length>0&&(t.forEach((e,n)=>e.active=n===0),t[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(o=>o!==this&&o.localName==="wa-dropdown-item"&&o.getAttribute("slot")===this.getAttribute("slot")&&o.submenuOpen).forEach(o=>{o.submenuOpen=!1})}async closeSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),this.submenuElement.hidden||(await M(this.submenuElement,"hide"),this.submenuElement.hidden=!0,this.submenuElement.removeAttribute("data-visible"),this.submenuElement.hidePopover()))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return g`
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
    `}};N.css=Ta;i([_("#submenu")],N.prototype,"submenuElement",2);i([l({type:Boolean})],N.prototype,"active",2);i([l({reflect:!0})],N.prototype,"variant",2);i([l({reflect:!0})],N.prototype,"size",2);i([l({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],N.prototype,"checkboxAdjacent",2);i([l({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],N.prototype,"submenuAdjacent",2);i([l()],N.prototype,"value",2);i([l({reflect:!0})],N.prototype,"type",2);i([l({type:Boolean})],N.prototype,"checked",2);i([l({type:Boolean,reflect:!0})],N.prototype,"disabled",2);i([l({type:Boolean,reflect:!0})],N.prototype,"submenuOpen",2);i([j()],N.prototype,"hasSubmenu",2);N=i([z("wa-dropdown-item")],N);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Da=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};function Pa(t){return Ra(t)}function Fe(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Ra(t){for(let e=t;e;e=Fe(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Fe(t);e;e=Fe(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||Le(n)||e.tagName==="BODY"))return e}return null}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ia=`:host {
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
`;function Rn(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var de=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),$=class extends P{constructor(){super(...arguments),this.localize=new lt(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let o=0,r=0,a=0,s=0,c=0,d=0,u=0,h=0;n?t.top<e.top?(o=t.left,r=t.bottom,a=t.right,s=t.bottom,c=e.left,d=e.top,u=e.right,h=e.top):(o=e.left,r=e.bottom,a=e.right,s=e.bottom,c=t.left,d=t.top,u=t.right,h=t.top):t.left<e.left?(o=t.right,r=t.top,a=e.left,s=e.top,c=t.right,d=t.bottom,u=e.left,h=e.bottom):(o=e.right,r=e.top,a=t.left,s=t.top,c=e.right,d=e.bottom,u=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Rn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=co(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[ho({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Pn({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=a?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;de&&!Rn(this.anchor)&&this.boundary==="scroll"&&(e=Ft(this.anchorEl).filter(o=>o instanceof Element)),this.flip&&t.push(po({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(uo({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(Pn({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Oa({element:this.arrowEl,padding:this.arrowPadding}));const n=de?o=>pe.getOffsetParent(o,Pa):pe.getOffsetParent;fo(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:de?"absolute":"fixed",platform:{...pe,getOffsetParent:n}}).then(({x:o,y:r,middlewareData:a,placement:s})=>{const c=this.localize.dir()==="rtl",d={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const u=a.arrow.x,h=a.arrow.y;let p="",m="",f="",b="";if(this.arrowPlacement==="start"){const w=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=c?w:"",b=c?"":w}else if(this.arrowPlacement==="end"){const w=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=c?"":w,b=c?w:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof u=="number"?`${u}px`:"",p=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:p,right:m,bottom:f,left:b,[d]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Da)}render(){return g`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${U({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${U({popup:!0,"popup-active":this.active,"popup-fixed":!de,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?g`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};$.css=Ia;i([_(".popup")],$.prototype,"popup",2);i([_(".arrow")],$.prototype,"arrowEl",2);i([l()],$.prototype,"anchor",2);i([l({type:Boolean,reflect:!0})],$.prototype,"active",2);i([l({reflect:!0})],$.prototype,"placement",2);i([l()],$.prototype,"boundary",2);i([l({type:Number})],$.prototype,"distance",2);i([l({type:Number})],$.prototype,"skidding",2);i([l({type:Boolean})],$.prototype,"arrow",2);i([l({attribute:"arrow-placement"})],$.prototype,"arrowPlacement",2);i([l({attribute:"arrow-padding",type:Number})],$.prototype,"arrowPadding",2);i([l({type:Boolean})],$.prototype,"flip",2);i([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],$.prototype,"flipFallbackPlacements",2);i([l({attribute:"flip-fallback-strategy"})],$.prototype,"flipFallbackStrategy",2);i([l({type:Object})],$.prototype,"flipBoundary",2);i([l({attribute:"flip-padding",type:Number})],$.prototype,"flipPadding",2);i([l({type:Boolean})],$.prototype,"shift",2);i([l({type:Object})],$.prototype,"shiftBoundary",2);i([l({attribute:"shift-padding",type:Number})],$.prototype,"shiftPadding",2);i([l({attribute:"auto-size"})],$.prototype,"autoSize",2);i([l()],$.prototype,"sync",2);i([l({type:Object})],$.prototype,"autoSizeBoundary",2);i([l({attribute:"auto-size-padding",type:Number})],$.prototype,"autoSizePadding",2);i([l({attribute:"hover-bridge",type:Boolean})],$.prototype,"hoverBridge",2);$=i([z("wa-popup")],$);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var bo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function qa(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&Ba(e)})}function Ba(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const o=n.find(r=>r.type==="submit"&&!r.matches(":disabled"));o&&(["input","button"].includes(o.localName)?e.requestSubmit(o):o.click())}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ma=`:host {
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
`,v=class extends V{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new bt(this,"hint","label"),this.localize=new lt(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,sn()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new bo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){qa(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,o="preserve"){const r=e??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(t,r,a,o),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,r=this.withClear&&!this.disabled&&!this.readonly,a=this.hasUpdated&&r&&(typeof this.value=="number"||this.value&&this.value.length>0);return g`
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
          .value=${ge(this.value??"")}
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
        class=${U({"has-slotted":o})}
        aria-hidden=${o?"false":"true"}
        >${this.hint}</slot
      >
    `}};v.css=[wt,Ae,Ma];v.shadowRootOptions={...V.shadowRootOptions,delegatesFocus:!0};i([_("input")],v.prototype,"input",2);i([l()],v.prototype,"title",2);i([l({reflect:!0})],v.prototype,"type",2);i([j()],v.prototype,"value",1);i([l({attribute:"value",reflect:!0})],v.prototype,"defaultValue",2);i([l({reflect:!0})],v.prototype,"size",2);i([l({reflect:!0})],v.prototype,"appearance",2);i([l({type:Boolean,reflect:!0})],v.prototype,"pill",2);i([l()],v.prototype,"label",2);i([l({attribute:"hint"})],v.prototype,"hint",2);i([l({attribute:"with-clear",type:Boolean})],v.prototype,"withClear",2);i([l()],v.prototype,"placeholder",2);i([l({type:Boolean,reflect:!0})],v.prototype,"readonly",2);i([l({attribute:"password-toggle",type:Boolean})],v.prototype,"passwordToggle",2);i([l({attribute:"password-visible",type:Boolean})],v.prototype,"passwordVisible",2);i([l({attribute:"without-spin-buttons",type:Boolean})],v.prototype,"withoutSpinButtons",2);i([l({reflect:!0})],v.prototype,"form",2);i([l({type:Boolean,reflect:!0})],v.prototype,"required",2);i([l()],v.prototype,"pattern",2);i([l({type:Number})],v.prototype,"minlength",2);i([l({type:Number})],v.prototype,"maxlength",2);i([l()],v.prototype,"min",2);i([l()],v.prototype,"max",2);i([l()],v.prototype,"step",2);i([l()],v.prototype,"autocapitalize",2);i([l()],v.prototype,"autocorrect",2);i([l()],v.prototype,"autocomplete",2);i([l({type:Boolean})],v.prototype,"autofocus",2);i([l()],v.prototype,"enterkeyhint",2);i([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],v.prototype,"spellcheck",2);i([l()],v.prototype,"inputmode",2);i([l({attribute:"with-label",type:Boolean})],v.prototype,"withLabel",2);i([l({attribute:"with-hint",type:Boolean})],v.prototype,"withHint",2);i([R("step",{waitUntilFirstUpdate:!0})],v.prototype,"handleStepChange",1);v=i([z("wa-input")],v);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Se(t,e){return new Promise(n=>{function o(r){r.target===t&&(t.removeEventListener(e,o),n())}t.addEventListener(e,o)})}/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Va=`:host {
  --arrow-size: 0.375rem;
  --max-width: 25rem;
  --show-duration: 100ms;
  --hide-duration: 100ms;

  /* Internal calculated properties */
  --arrow-diagonal-size: calc((var(--arrow-size) * sin(45deg)));

  display: contents;

  /** Defaults for inherited CSS properties */
  font-size: var(--wa-font-size-m);
  line-height: var(--wa-line-height-normal);
  text-align: start;
  white-space: normal;
}

/* The native dialog element */
.dialog {
  display: none;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  overflow: visible;
  pointer-events: none;

  &:focus {
    outline: none;
  }

  &[open] {
    display: block;
  }
}

/* The <wa-popup> element */
.popover {
  --arrow-size: inherit;
  --show-duration: inherit;
  --hide-duration: inherit;

  pointer-events: auto;

  &::part(arrow) {
    background-color: var(--wa-color-surface-default);
    border-top: none;
    border-left: none;
    border-bottom: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
    border-right: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
    box-shadow: none;
  }
}

.popover[placement^='top']::part(popup) {
  transform-origin: bottom;
}

.popover[placement^='bottom']::part(popup) {
  transform-origin: top;
}

.popover[placement^='left']::part(popup) {
  transform-origin: right;
}

.popover[placement^='right']::part(popup) {
  transform-origin: left;
}

/* Body */
.body {
  display: flex;
  flex-direction: column;
  width: max-content;
  max-width: var(--max-width);
  padding: var(--wa-space-l);
  background-color: var(--wa-color-surface-default);
  border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
  border-radius: var(--wa-panel-border-radius);
  border-style: var(--wa-panel-border-style);
  box-shadow: var(--wa-shadow-l);
  color: var(--wa-color-text-normal);
  user-select: none;
  -webkit-user-select: none;
}
`,Ne=new Set,q=class extends P{constructor(){super(...arguments),this.anchor=null,this.placement="top",this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=t=>{t.target.closest('[data-popover="close"]')&&(t.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.preventDefault(),this.open=!1,this.anchor&&typeof this.anchor.focus=="function"&&this.anchor.focus())},this.handleDocumentClick=t=>{const e=t.target;this.anchor&&t.composedPath().includes(this.anchor)||e.closest("wa-popover")!==this&&(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||(this.id=Zn("wa-popover-"))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort()}firstUpdated(){this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(t){t.has("open")&&this.customStates.set("open",this.open)}async handleOpenChange(){if(this.open){const t=new ie;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}Ne.forEach(e=>e.open=!1),document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.show(),this.popup.active=!0,Ne.add(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await M(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new re)}else{const t=new ae;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),Ne.delete(this),await M(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new oe)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,n=this.anchor;if(e===n)return;const{signal:o}=this.eventController;e&&e.addEventListener("click",this.handleAnchorClick,{signal:o}),n&&n.removeEventListener("click",this.handleAnchorClick),this.anchor=e,this.for&&!e&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,Se(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Se(this,"wa-after-hide")}render(){return g`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${U({popover:!0,"popover-open":this.open})}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `}};q.css=Va;q.dependencies={"wa-popup":$};i([_("dialog")],q.prototype,"dialog",2);i([_(".body")],q.prototype,"body",2);i([_("wa-popup")],q.prototype,"popup",2);i([j()],q.prototype,"anchor",2);i([l()],q.prototype,"placement",2);i([l({type:Boolean,reflect:!0})],q.prototype,"open",2);i([l({type:Number})],q.prototype,"distance",2);i([l({type:Number})],q.prototype,"skidding",2);i([l()],q.prototype,"for",2);i([l({attribute:"without-arrow",type:Boolean,reflect:!0})],q.prototype,"withoutArrow",2);i([R("open",{waitUntilFirstUpdate:!0})],q.prototype,"handleOpenChange",1);i([R("for")],q.prototype,"handleForChange",1);i([R(["distance","placement","skidding"])],q.prototype,"handleOptionsChange",1);q=i([z("wa-popover")],q);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ze extends cn{constructor(e){if(super(e),this.it=L,e.type!==xt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===L||e==null)return this._t=void 0,this.it=e;if(e===G)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ze.directiveName="unsafeHTML",Ze.resultType=1;const Fa=ln(Ze);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Na=`:host {
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
`,x=class extends V{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new bt(this,"hint","label"),this.localize=new lt(this),this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.form=null,this.required=!1,this.getTag=t=>g`
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
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,n=e.closest('[part~="clear-button"]')!==null,o=e.closest("wa-button")!==null;if(!(n||o)){if(t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const r=this.getAllOptions(),a=r.indexOf(this.currentOption);let s=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(s=a+1,s>r.length-1&&(s=0)):t.key==="ArrowUp"?(s=a-1,s<0&&(s=r.length-1)):t.key==="Home"?s=0:t.key==="End"&&(s=r.length-1),this.setCurrentOption(r[s])}if(t.key?.length===1||t.key==="Backspace"){const r=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const a of r)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=[Gn({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),t==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(n=>!n.disabled).map(n=>n.value));let e=t;return t!=null&&(e=t.filter(n=>this.optionValues.has(n)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const e=this.getAllOptions().filter(n=>n.hasAttribute("selected")||n.defaultSelected);if(e.length>0){const n=e.map(o=>o.value);this._defaultValue=this.multiple?n:n[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const n=t.composedPath().some(o=>o instanceof Element&&o.tagName.toLowerCase()==="wa-button");this.disabled||n||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.value!==null&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new bo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const n=t.target.closest("wa-option");n&&!n.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(n):this.setSelectedOptions(n),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;let n=e;if(!n){const o=t.target.closest("wa-tag[part~=tag]");if(o){const r=this.shadowRoot?.querySelector('[part="tags"]');if(r){const s=Array.from(r.children).indexOf(o);s>=0&&s<this.selectedOptions.length&&(n=this.selectedOptions[s])}}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(n=>{n.current=!1,n.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),n=Array.isArray(t)?t:[t];e.forEach(o=>{n.includes(o)||(o.selected=!1)}),n.length&&n.forEach(o=>o.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions();this.selectedOptions=t.filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){const o=this.defaultValue,r=Array.isArray(o)?o:[o];return n.hasAttribute("selected")||n.defaultSelected||n.selected||r?.includes(n.value)}return n.selected});let e=new Set(this.selectedOptions.map(n=>n.value));if(e.size>0||this._value){const n=this._value;if(this._value==null){let o=this.defaultValue??[];this._value=Array.isArray(o)?o:[o]}this._value=this._value?.filter(o=>!this.optionValues?.has(o))??null,this._value?.unshift(...e),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(t,e);return n?typeof n=="string"?Fa(n):n:null}else if(e===this.maxOptionsVisible)return g`
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
        `;return null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],n=t.filter(o=>e.includes(o.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new ie;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await M(this.popup.popup,"show"),this.currentOption&&Rr(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new re)}else{const t=new ae;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await M(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new oe)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Se(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Se(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,r=(this.hasUpdated||dr)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,a=!!(this.placeholder&&(!this.value||this.value.length===0));return g`
      <div
        part="form-control"
        class=${U({"form-control":!0,"form-control-has-label":n})}
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
            class=${U({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":a})}
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
          class=${U({"has-slotted":o})}
          aria-hidden=${o?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};x.css=[Na,Ae,wt];i([_(".select")],x.prototype,"popup",2);i([_(".combobox")],x.prototype,"combobox",2);i([_(".display-input")],x.prototype,"displayInput",2);i([_(".value-input")],x.prototype,"valueInput",2);i([_(".listbox")],x.prototype,"listbox",2);i([j()],x.prototype,"displayLabel",2);i([j()],x.prototype,"currentOption",2);i([j()],x.prototype,"selectedOptions",2);i([j()],x.prototype,"optionValues",2);i([l()],x.prototype,"name",2);i([l({attribute:!1})],x.prototype,"defaultValue",1);i([l({attribute:"value",reflect:!1})],x.prototype,"value",1);i([l({reflect:!0})],x.prototype,"size",2);i([l()],x.prototype,"placeholder",2);i([l({type:Boolean,reflect:!0})],x.prototype,"multiple",2);i([l({attribute:"max-options-visible",type:Number})],x.prototype,"maxOptionsVisible",2);i([l({type:Boolean})],x.prototype,"disabled",2);i([l({attribute:"with-clear",type:Boolean})],x.prototype,"withClear",2);i([l({type:Boolean,reflect:!0})],x.prototype,"open",2);i([l({reflect:!0})],x.prototype,"appearance",2);i([l({type:Boolean,reflect:!0})],x.prototype,"pill",2);i([l()],x.prototype,"label",2);i([l({reflect:!0})],x.prototype,"placement",2);i([l({attribute:"hint"})],x.prototype,"hint",2);i([l({attribute:"with-label",type:Boolean})],x.prototype,"withLabel",2);i([l({attribute:"with-hint",type:Boolean})],x.prototype,"withHint",2);i([l({reflect:!0})],x.prototype,"form",2);i([l({type:Boolean,reflect:!0})],x.prototype,"required",2);i([l({attribute:!1})],x.prototype,"getTag",2);i([R("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1);i([R("value",{waitUntilFirstUpdate:!0})],x.prototype,"handleValueChange",1);i([R("open",{waitUntilFirstUpdate:!0})],x.prototype,"handleOpenChange",1);x=i([z("wa-select")],x);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var Ua=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},Ha=`@layer wa-component {
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
`,At=class extends P{constructor(){super(...arguments),this.localize=new lt(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new Ua)}render(){return g`
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
    `}};At.css=[Ha,ee,wt];i([l({reflect:!0})],At.prototype,"variant",2);i([l({reflect:!0})],At.prototype,"appearance",2);i([l({reflect:!0})],At.prototype,"size",2);i([l({type:Boolean,reflect:!0})],At.prototype,"pill",2);i([l({attribute:"with-remove",type:Boolean})],At.prototype,"withRemove",2);At=i([z("wa-tag")],At);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */function Xt(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(r=>Xt(r,--e)).join("");let n=t;if(n.nodeType===Node.TEXT_NODE)return n.textContent??"";if(n.nodeType===Node.ELEMENT_NODE){let o=n;if(o.hasAttribute("slot")||o.matches("style, script"))return"";if(o instanceof HTMLSlotElement){let r=o.assignedNodes({flatten:!0});if(r.length>0)return Xt(r,--e)}return e>-1?Xt(o,--e):o.textContent??""}return n.hasChildNodes()?Xt(n.childNodes,--e):""}var Wa=`:host {
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
`,nt=class extends P{constructor(){super(...arguments),this.localize=new lt(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-select")?.hasInteracted){const e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=Xt(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return g`
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
    `}};nt.css=Wa;i([_(".label")],nt.prototype,"defaultSlot",2);i([j()],nt.prototype,"current",2);i([l({reflect:!0})],nt.prototype,"value",2);i([l({type:Boolean})],nt.prototype,"disabled",2);i([l({type:Boolean,attribute:!1})],nt.prototype,"selected",2);i([l({type:Boolean,attribute:"selected"})],nt.prototype,"defaultSelected",2);i([l()],nt.prototype,"label",1);i([j()],nt.prototype,"defaultLabel",2);nt=i([z("wa-option")],nt);/*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license */var ja=`:host {
  --height: var(--wa-form-control-toggle-size);
  --width: calc(var(--height) * 1.75);
  --thumb-size: 0.75em;

  display: inline-flex;
  line-height: var(--wa-form-control-value-line-height);
}

label {
  position: relative;
  display: flex;
  align-items: center;
  font: inherit;
  color: var(--wa-form-control-value-color);
  vertical-align: middle;
  cursor: pointer;
}

.switch {
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width);
  height: var(--height);
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
  border-radius: var(--height);
  border-style: var(--wa-form-control-border-style);
  border-width: var(--wa-form-control-border-width);
  transition-property: translate, background, border-color, box-shadow;
  transition-duration: var(--wa-transition-normal);
  transition-timing-function: var(--wa-transition-easing);
}

.switch .thumb {
  aspect-ratio: 1 / 1;
  width: var(--thumb-size);
  height: var(--thumb-size);
  background-color: var(--wa-form-control-border-color);
  border-radius: 50%;
  translate: calc((var(--width) - var(--height)) / -2);
  transition: inherit;
}

.input {
  position: absolute;
  opacity: 0;
  padding: 0;
  margin: 0;
  pointer-events: none;
}

/* Focus */
label:not(.disabled) .input:focus-visible ~ .switch .thumb {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Checked */
.checked .switch {
  background-color: var(--wa-form-control-activated-color);
  border-color: var(--wa-form-control-activated-color);
}

.checked .switch .thumb {
  background-color: var(--wa-color-surface-default);
  translate: calc((var(--width) - var(--height)) / 2);
}

/* Disabled */
label:has(> :disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

[part~='label'] {
  display: inline-block;
  line-height: var(--height);
  margin-inline-start: 0.5em;
  user-select: none;
  -webkit-user-select: none;
}

:host([required]) [part~='label']::after {
  content: var(--wa-form-control-required-content);
  color: var(--wa-form-control-required-content-color);
  margin-inline-start: var(--wa-form-control-required-content-offset);
}

@media (forced-colors: active) {
  :checked:enabled + .switch:hover .thumb,
  :checked + .switch .thumb {
    background-color: ButtonText;
  }
}
`,D=class extends V{constructor(){super(...arguments),this.hasSlotController=new bt(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,sn()]}get value(){return this._value??"on"}set value(t){this._value=t}firstUpdated(t){super.firstUpdated(t),this.handleValueOrCheckedChange()}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(t??"on",e)}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){const t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=this.hint?!0:!!t;return g`
      <label
        part="base"
        class=${U({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${A(this.value)}
          .checked=${ge(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${U({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};D.shadowRootOptions={...V.shadowRootOptions,delegatesFocus:!0};D.css=[Ae,wt,ja];i([_('input[type="checkbox"]')],D.prototype,"input",2);i([l()],D.prototype,"title",2);i([l({reflect:!0})],D.prototype,"name",2);i([l({reflect:!0})],D.prototype,"value",1);i([l({reflect:!0})],D.prototype,"size",2);i([l({type:Boolean})],D.prototype,"disabled",2);i([l({type:Boolean,attribute:!1})],D.prototype,"checked",2);i([l({type:Boolean,attribute:"checked",reflect:!0})],D.prototype,"defaultChecked",2);i([l({reflect:!0})],D.prototype,"form",2);i([l({type:Boolean,reflect:!0})],D.prototype,"required",2);i([l({attribute:"hint"})],D.prototype,"hint",2);i([l({attribute:"with-hint",type:Boolean})],D.prototype,"withHint",2);i([R("defaultChecked")],D.prototype,"handleDefaultCheckedChange",1);i([R(["checked"])],D.prototype,"handleStateChange",1);i([R("disabled",{waitUntilFirstUpdate:!0})],D.prototype,"handleDisabledChange",1);D=i([z("wa-switch")],D);We("/static/vendor/webawesome");Po("tabler",{resolver:t=>`https://cdn.jsdelivr.net/npm/@tabler/icons@3.36.0/icons/outline/${t}.svg`,mutator:t=>{t.style.fill="none",t.setAttribute("stroke","currentColor")}});
