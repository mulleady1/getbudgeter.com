(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var ye="",xe="";function ke(t){ye=t}function Qn(t=""){if(!ye){const e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){const n=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;ke(n)}else{const o=[...document.getElementsByTagName("script")].find(r=>r.src.endsWith("webawesome.js")||r.src.endsWith("webawesome.loader.js")||r.src.endsWith("webawesome.ssr-loader.js"));if(o){const r=String(o.getAttribute("src"));ke(r.split("/").slice(0,-1).join("/"))}}}return ye.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function Zn(t){xe=t}function Jn(){if(!xe){const t=document.querySelector("[data-fa-kit-code]");t&&Zn(t.getAttribute("data-fa-kit-code")||"")}return xe}function to(t,e,n){const o=Jn(),r=o.length>0;let i="solid";return e==="classic"&&(n==="thin"&&(i="thin"),n==="light"&&(i="light"),n==="regular"&&(i="regular"),n==="solid"&&(i="solid")),e==="sharp"&&(n==="thin"&&(i="sharp-thin"),n==="light"&&(i="sharp-light"),n==="regular"&&(i="sharp-regular"),n==="solid"&&(i="sharp-solid")),e==="duotone"&&(n==="thin"&&(i="duotone-thin"),n==="light"&&(i="duotone-light"),n==="regular"&&(i="duotone-regular"),n==="solid"&&(i="duotone")),e==="sharp-duotone"&&(n==="thin"&&(i="sharp-duotone-thin"),n==="light"&&(i="sharp-duotone-light"),n==="regular"&&(i="sharp-duotone-regular"),n==="solid"&&(i="sharp-duotone-solid")),e==="brands"&&(i="brands"),r?`https://ka-p.fontawesome.com/releases/v6.7.2/svgs/${i}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v6.7.2/svgs/${i}/${t}.svg`}var eo={name:"default",resolver:(t,e="classic",n="solid")=>to(t,e,n)},no=eo;new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const n of e)n.nodeType===Node.ELEMENT_NODE&&oo(n)});async function oo(t){const e=t instanceof Element?t.tagName.toLowerCase():"",n=e?.startsWith("wa-"),o=[...t.querySelectorAll(":not(:defined)")].map(s=>s.tagName.toLowerCase()).filter(s=>s.startsWith("wa-"));n&&!customElements.get(e)&&o.push(e);const r=[...new Set(o)],i=await Promise.allSettled(r.map(s=>ro(s)));for(const s of i)s.status==="rejected"&&console.warn(s.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function ro(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),n=Qn(`components/${e}/${e}.js`);return new Promise((o,r)=>{import(n).then(()=>o()).catch(()=>r(new Error(`Unable to autoload <${t}> from ${n}`)))})}const Ee=new Set,St=new Map;let bt,Le="ltr",ze="en";const mn=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(mn){const t=new MutationObserver(bn);Le=document.documentElement.dir||"ltr",ze=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function gn(...t){t.map(e=>{const n=e.$code.toLowerCase();St.has(n)?St.set(n,Object.assign(Object.assign({},St.get(n)),e)):St.set(n,e),bt||(bt=e)}),bn()}function bn(){mn&&(Le=document.documentElement.dir||"ltr",ze=document.documentElement.lang||navigator.language),[...Ee.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let io=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ee.add(this.host)}hostDisconnected(){Ee.delete(this.host)}dir(){return`${this.host.dir||Le}`.toLowerCase()}lang(){return`${this.host.lang||ze}`.toLowerCase()}getTranslationData(e){var n,o;const r=new Intl.Locale(e.replace(/_/g,"-")),i=r?.language.toLowerCase(),s=(o=(n=r?.region)===null||n===void 0?void 0:n.toLowerCase())!==null&&o!==void 0?o:"",l=St.get(`${i}-${s}`),c=St.get(i);return{locale:r,language:i,region:s,primary:l,secondary:c}}exists(e,n){var o;const{primary:r,secondary:i}=this.getTranslationData((o=n.lang)!==null&&o!==void 0?o:this.lang());return n=Object.assign({includeFallback:!1},n),!!(r&&r[e]||i&&i[e]||n.includeFallback&&bt&&bt[e])}term(e,...n){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let i;if(o&&o[e])i=o[e];else if(r&&r[e])i=r[e];else if(bt&&bt[e])i=bt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...n):i}date(e,n){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),n).format(e)}number(e,n){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),n).format(e)}relativeTime(e,n,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,n)}};var wn={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};gn(wn);var so=wn,kt=class extends io{};gn(so);function ao(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var ue={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714, 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>'}},lo={name:"system",resolver:(t,e="classic",n="solid")=>{let r=ue[n][t]??ue.regular[t]??ue.regular["circle-question"];return r?ao(r):""}},co=lo,uo="classic",ho=[no,co],Se=[];function po(t){Se.push(t)}function fo(t){Se=Se.filter(e=>e!==t)}function he(t){return ho.find(e=>e.name===t)}function mo(){return uo}var go=Object.defineProperty,bo=Object.getOwnPropertyDescriptor,vn=t=>{throw TypeError(t)},a=(t,e,n,o)=>{for(var r=o>1?void 0:o?bo(e,n):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,n,r):s(r))||r);return o&&r&&go(e,n,r),r},yn=(t,e,n)=>e.has(t)||vn("Cannot "+n),wo=(t,e,n)=>(yn(t,e,"read from private field"),e.get(t)),vo=(t,e,n)=>e.has(t)?vn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),yo=(t,e,n,o)=>(yn(t,e,"write to private field"),e.set(t,n),n),xn=()=>({checkValidity(t){const e=t.input,n={message:"",isValid:!0,invalidKeys:[]};if(!e)return n;let o=!0;if("checkValidity"in e&&(o=e.checkValidity()),o)return n;if(n.isValid=!1,"validationMessage"in e&&(n.message=e.validationMessage),!("validity"in e))return n.invalidKeys.push("customError"),n;for(const r in e.validity){if(r==="valid")continue;const i=r;e.validity[i]&&n.invalidKeys.push(i)}return n}});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xt=globalThis,Te=Xt.ShadowRoot&&(Xt.ShadyCSS===void 0||Xt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kn=Symbol(),Ke=new WeakMap;let xo=class{constructor(e,n,o){if(this._$cssResult$=!0,o!==kn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(Te&&e===void 0){const o=n!==void 0&&n.length===1;o&&(e=Ke.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ke.set(n,e))}return e}toString(){return this.cssText}};const En=t=>new xo(typeof t=="string"?t:t+"",void 0,kn),ko=(t,e)=>{if(Te)t.adoptedStyleSheets=e.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of e){const o=document.createElement("style"),r=Xt.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=n.cssText,t.appendChild(o)}},Xe=Te?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const o of e.cssRules)n+=o.cssText;return En(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Eo,defineProperty:So,getOwnPropertyDescriptor:$o,getOwnPropertyNames:Co,getOwnPropertySymbols:Ao,getPrototypeOf:_o}=Object,re=globalThis,Ye=re.trustedTypes,Po=Ye?Ye.emptyScript:"",Oo=re.reactiveElementPolyfillSupport,Mt=(t,e)=>t,Qt={toAttribute(t,e){switch(e){case Boolean:t=t?Po:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Re=(t,e)=>!Eo(t,e),Ge={attribute:!0,type:String,converter:Qt,reflect:!1,useDefault:!1,hasChanged:Re};Symbol.metadata??=Symbol("metadata"),re.litPropertyMetadata??=new WeakMap;let Et=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=Ge){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,n);r!==void 0&&So(this.prototype,e,r)}}static getPropertyDescriptor(e,n,o){const{get:r,set:i}=$o(this.prototype,e)??{get(){return this[n]},set(s){this[n]=s}};return{get:r,set(s){const l=r?.call(this);i?.call(this,s),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ge}static _$Ei(){if(this.hasOwnProperty(Mt("elementProperties")))return;const e=_o(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Mt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Mt("properties"))){const n=this.properties,o=[...Co(n),...Ao(n)];for(const r of o)this.createProperty(r,n[r])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[o,r]of n)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[n,o]of this.elementProperties){const r=this._$Eu(n,o);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)n.unshift(Xe(r))}else e!==void 0&&n.push(Xe(e));return n}static _$Eu(e,n){const o=n.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const o of n.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ko(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,n,o){this._$AK(e,o)}_$ET(e,n){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const i=(o.converter?.toAttribute!==void 0?o.converter:Qt).toAttribute(n,o.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,n){const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const i=o.getPropertyOptions(r),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Qt;this._$Em=r;const l=s.fromAttribute(n,i.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,n,o){if(e!==void 0){const r=this.constructor,i=this[e];if(o??=r.getPropertyOptions(e),!((o.hasChanged??Re)(i,n)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,n,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:o,reflect:r,wrapped:i},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??n??this[e]),i!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(n=void 0),this._$AL.set(e,n)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,i]of o){const{wrapped:s}=i,l=this[r];s!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,i,l)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(n)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};Et.elementStyles=[],Et.shadowRootOptions={mode:"open"},Et[Mt("elementProperties")]=new Map,Et[Mt("finalized")]=new Map,Oo?.({ReactiveElement:Et}),(re.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=globalThis,Zt=De.trustedTypes,Qe=Zt?Zt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Sn="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,$n="?"+dt,Lo=`<${$n}>`,vt=document,It=()=>vt.createComment(""),qt=t=>t===null||typeof t!="object"&&typeof t!="function",Me=Array.isArray,zo=t=>Me(t)||typeof t?.[Symbol.iterator]=="function",pe=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Je=/>/g,mt=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tn=/'/g,en=/"/g,Cn=/^(?:script|style|textarea|title)$/i,To=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),$=To(1),j=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),nn=new WeakMap,wt=vt.createTreeWalker(vt,129);function An(t,e){if(!Me(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qe!==void 0?Qe.createHTML(e):e}const Ro=(t,e)=>{const n=t.length-1,o=[];let r,i=e===2?"<svg>":e===3?"<math>":"",s=Rt;for(let l=0;l<n;l++){const c=t[l];let h,d,p=-1,m=0;for(;m<c.length&&(s.lastIndex=m,d=s.exec(c),d!==null);)m=s.lastIndex,s===Rt?d[1]==="!--"?s=Ze:d[1]!==void 0?s=Je:d[2]!==void 0?(Cn.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=mt):d[3]!==void 0&&(s=mt):s===mt?d[0]===">"?(s=r??Rt,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,h=d[1],s=d[3]===void 0?mt:d[3]==='"'?en:tn):s===en||s===tn?s=mt:s===Ze||s===Je?s=Rt:(s=mt,r=void 0);const f=s===mt&&t[l+1].startsWith("/>")?" ":"";i+=s===Rt?c+Lo:p>=0?(o.push(h),c.slice(0,p)+Sn+c.slice(p)+dt+f):c+dt+(p===-2?l:f)}return[An(t,i+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class Nt{constructor({strings:e,_$litType$:n},o){let r;this.parts=[];let i=0,s=0;const l=e.length-1,c=this.parts,[h,d]=Ro(e,n);if(this.el=Nt.createElement(h,o),wt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=wt.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Sn)){const m=d[s++],f=r.getAttribute(p).split(dt),g=/([.?@])?(.*)/.exec(m);c.push({type:1,index:i,name:g[2],strings:f,ctor:g[1]==="."?Mo:g[1]==="?"?Bo:g[1]==="@"?Io:ie}),r.removeAttribute(p)}else p.startsWith(dt)&&(c.push({type:6,index:i}),r.removeAttribute(p));if(Cn.test(r.tagName)){const p=r.textContent.split(dt),m=p.length-1;if(m>0){r.textContent=Zt?Zt.emptyScript:"";for(let f=0;f<m;f++)r.append(p[f],It()),wt.nextNode(),c.push({type:2,index:++i});r.append(p[m],It())}}}else if(r.nodeType===8)if(r.data===$n)c.push({type:2,index:i});else{let p=-1;for(;(p=r.data.indexOf(dt,p+1))!==-1;)c.push({type:7,index:i}),p+=dt.length-1}i++}}static createElement(e,n){const o=vt.createElement("template");return o.innerHTML=e,o}}function Ct(t,e,n=t,o){if(e===j)return e;let r=o!==void 0?n._$Co?.[o]:n._$Cl;const i=qt(e)?void 0:e._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(t),r._$AT(t,n,o)),o!==void 0?(n._$Co??=[])[o]=r:n._$Cl=r),r!==void 0&&(e=Ct(t,r._$AS(t,e.values),r,o)),e}class Do{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:o}=this._$AD,r=(e?.creationScope??vt).importNode(n,!0);wt.currentNode=r;let i=wt.nextNode(),s=0,l=0,c=o[0];for(;c!==void 0;){if(s===c.index){let h;c.type===2?h=new Vt(i,i.nextSibling,this,e):c.type===1?h=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(h=new qo(i,this,e)),this._$AV.push(h),c=o[++l]}s!==c?.index&&(i=wt.nextNode(),s++)}return wt.currentNode=vt,r}p(e){let n=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,n),n+=o.strings.length-2):o._$AI(e[n])),n++}}class Vt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,o,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Ct(this,e,n),qt(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==j&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):zo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(vt.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Nt.createElement(An(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(n);else{const i=new Do(r,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(e){let n=nn.get(e.strings);return n===void 0&&nn.set(e.strings,n=new Nt(e)),n}k(e){Me(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let o,r=0;for(const i of e)r===n.length?n.push(o=new Vt(this.O(It()),this.O(It()),this,this.options)):o=n[r],o._$AI(i),r++;r<n.length&&(this._$AR(o&&o._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,o,r,i){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=_}_$AI(e,n=this,o,r){const i=this.strings;let s=!1;if(i===void 0)e=Ct(this,e,n,0),s=!qt(e)||e!==this._$AH&&e!==j,s&&(this._$AH=e);else{const l=e;let c,h;for(e=i[0],c=0;c<i.length-1;c++)h=Ct(this,l[o+c],n,c),h===j&&(h=this._$AH[c]),s||=!qt(h)||h!==this._$AH[c],h===_?e=_:e!==_&&(e+=(h??"")+i[c+1]),this._$AH[c]=h}s&&!r&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Mo extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}class Bo extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}}class Io extends ie{constructor(e,n,o,r,i){super(e,n,o,r,i),this.type=5}_$AI(e,n=this){if((e=Ct(this,e,n,0)??_)===j)return;const o=this._$AH,r=e===_&&o!==_||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==_&&(o===_||r);r&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class qo{constructor(e,n,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Ct(this,e)}}const No=De.litHtmlPolyfillSupport;No?.(Nt,Vt),(De.litHtmlVersions??=[]).push("3.3.1");const Vo=(t,e,n)=>{const o=n?.renderBefore??e;let r=o._$litPart$;if(r===void 0){const i=n?.renderBefore??null;o._$litPart$=r=new Vt(e.insertBefore(It(),i),i,void 0,n??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=globalThis;let Bt=class extends Et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Vo(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};Bt._$litElement$=!0,Bt.finalized=!0,Be.litElementHydrateSupport?.({LitElement:Bt});const Ho=Be.litElementPolyfillSupport;Ho?.({LitElement:Bt});(Be.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=t=>(e,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Uo={attribute:!0,type:String,converter:Qt,reflect:!1,hasChanged:Re},Fo=(t=Uo,e,n)=>{const{kind:o,metadata:r}=n;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(n.name,t),o==="accessor"){const{name:s}=n;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,c,t)},init(l){return l!==void 0&&this.C(s,void 0,t,l),l}}}if(o==="setter"){const{name:s}=n;return function(l){const c=this[s];e.call(this,l),this.requestUpdate(s,c,t)}}throw Error("Unsupported decorator location: "+o)};function u(t){return(e,n)=>typeof n=="object"?Fo(t,e,n):((o,r,i)=>{const s=r.hasOwnProperty(i);return r.constructor.createProperty(i,o),s?Object.getOwnPropertyDescriptor(r,i):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ht(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wo=(t,e,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,n),n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(t,e){return(n,o,r)=>{const i=s=>s.renderRoot?.querySelector(t)??null;return Wo(n,o,{get(){return i(this)}})}}var jo=`:host {
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
`,Yt,V=class extends Bt{constructor(){super(),vo(this,Yt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,n)=>{this.internals?.states&&(n?this.internals.states.add(e):this.internals.states.delete(e))},has:e=>this.internals?.states?this.internals.states.has(e):!1};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,n]of t.elementProperties)n.default==="inherit"&&n.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${n.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[jo,...t].map(e=>typeof e=="string"?En(e):e)}attributeChangedCallback(t,e,n){wo(this,Yt)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),yo(this,Yt,!0)),super.attributeChangedCallback(t,e,n)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,n)=>{t.has(n)&&this[n]==null&&(this[n]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){const n=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});n.error=e,this.dispatchEvent(n)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Yt=new WeakMap;a([u()],V.prototype,"dir",2);a([u()],V.prototype,"lang",2);a([u({type:Boolean,reflect:!0,attribute:"did-ssr"})],V.prototype,"didSSR",2);var _n=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},Ko=()=>({observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),H=class extends V{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new _n))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Ko()]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const n of e.observedAttributes)t.add(n);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const e=this.value;if(Array.isArray(e)){if(this.name){const n=new FormData;for(const o of e)n.append(this.name,o);this.setValue(n,n)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],n=t[1];let o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,n,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=!!this.required,e=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&n),this.customStates.set("user-valid",e&&n)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,n]=t;this.internals.setFormValue(e,n)}get allValidators(){const t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const t=this.allValidators;if(!t?.length)return;const e={customError:!!this.customError},n=this.validationTarget||this.input||void 0;let o="";for(const r of t){const{isValid:i,message:s,invalidKeys:l}=r.checkValidity(this);i||(o||(o=s),l?.length>=0&&l.forEach(c=>e[c]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,n)}};H.formAssociated=!0;a([u({reflect:!0})],H.prototype,"name",2);a([u({type:Boolean})],H.prototype,"disabled",2);a([u({state:!0,attribute:!1})],H.prototype,"valueHasChanged",2);a([u({state:!0,attribute:!1})],H.prototype,"hasInteracted",2);a([u({attribute:"custom-error",reflect:!0})],H.prototype,"customError",2);a([u({attribute:!1,state:!0,type:Object})],H.prototype,"validity",1);var Ot=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=n=>{const o=n.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},Ut=`@layer wa-utilities {
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
`;function st(t,e){const n={waitUntilFirstUpdate:!1,...e};return(o,r)=>{const{update:i}=o,s=Array.isArray(t)?t:[t];o.update=function(l){s.forEach(c=>{const h=c;if(l.has(h)){const d=l.get(h),p=this[h];d!==p&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](d,p)}}),i.call(this,l)}}}var Pn=`@layer wa-utilities {
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},On=t=>(...e)=>({_$litDirective$:t,values:e});let Ln=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,o){this._$Ct=e,this._$AM=n,this._$Ci=o}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=On(class extends Ln{constructor(t){if(super(t),t.type!==gt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}const n=t.element.classList;for(const o of this.st)o in e||(n.remove(o),this.st.delete(o));for(const o in e){const r=!!e[o];r===this.st.has(o)||this.nt?.has(o)||(r?(n.add(o),this.st.add(o)):(n.remove(o),this.st.delete(o)))}return j}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=t=>t??_;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zn=Symbol.for(""),Xo=t=>{if(t?.r===zn)return t?._$litStatic$},on=(t,...e)=>({_$litStatic$:e.reduce(((n,o,r)=>n+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+t[r+1]),t[0]),r:zn}),rn=new Map,Yo=t=>(e,...n)=>{const o=n.length;let r,i;const s=[],l=[];let c,h=0,d=!1;for(;h<o;){for(c=e[h];h<o&&(i=n[h],(r=Xo(i))!==void 0);)c+=r+e[++h],d=!0;h!==o&&l.push(i),s.push(c),h++}if(h===o&&s.push(e[o]),d){const p=s.join("$$lit$$");(e=rn.get(p))===void 0&&(s.raw=s,rn.set(p,e=s)),n=l}return t(e,...n)},fe=Yo($);var Go=`@layer wa-component {
  :host {
    display: inline-block;
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
:host([appearance~='plain']) {
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

:host([appearance~='outlined']) {
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

:host([appearance~='filled']) {
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

:host([appearance~='filled'][appearance~='outlined']) .button {
  border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
}

:host([appearance~='accent']) {
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
  display: flex;
}

.label::slotted(wa-icon) {
  align-self: center;
}

/*
 * Caret modifier
 */

wa-icon[part~='caret'] {
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

button ::slotted(wa-badge) {
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
.button:not(.visually-hidden-label) [part~='caret'] {
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
`,k=class extends H{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Ot(this,"[default]","start","end"),this.localize=new kt(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button",this.form=null}static get validators(){return[...super.validators,xn()]}constructLightDOMButton(){const t=document.createElement("button");return t.type=this.type,t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.name&&(t.name=this.name),t.value=this.value||"",["form","formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{this.hasAttribute(e)&&t.setAttribute(e,this.getAttribute(e))}),t}handleClick(){if(!this.getForm())return;const e=this.constructLightDOMButton();this.parentElement?.append(e),e.click(),e.remove()}handleInvalid(){this.dispatchEvent(new _n)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,n=!1,o="";[...t].forEach(r=>{r.nodeType===Node.ELEMENT_NODE&&r.localName==="wa-icon"&&(n=!0,e||(e=r.hasAttribute("label"))),r.nodeType===Node.TEXT_NODE&&(o+=r.textContent)}),this.isIconButton=o.trim()===""&&n,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?on`a`:on`button`;return fe`
      <${e}
        part="base"
        class=${yt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${C(t?void 0:this.disabled)}
        type=${C(t?void 0:this.type)}
        title=${this.title}
        name=${C(t?void 0:this.name)}
        value=${C(t?void 0:this.value)}
        href=${C(t?this.href:void 0)}
        target=${C(t?this.target:void 0)}
        download=${C(t?this.download:void 0)}
        rel=${C(t&&this.rel?this.rel:void 0)}
        role=${C(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?fe`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?fe`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};k.css=[Go,Pn,Ut];a([N(".button")],k.prototype,"button",2);a([N("slot:not([name])")],k.prototype,"labelSlot",2);a([Ht()],k.prototype,"invalid",2);a([Ht()],k.prototype,"isIconButton",2);a([u()],k.prototype,"title",2);a([u({reflect:!0})],k.prototype,"variant",2);a([u({reflect:!0})],k.prototype,"appearance",2);a([u({reflect:!0})],k.prototype,"size",2);a([u({attribute:"with-caret",type:Boolean,reflect:!0})],k.prototype,"withCaret",2);a([u({type:Boolean})],k.prototype,"disabled",2);a([u({type:Boolean,reflect:!0})],k.prototype,"loading",2);a([u({type:Boolean,reflect:!0})],k.prototype,"pill",2);a([u()],k.prototype,"type",2);a([u({reflect:!0})],k.prototype,"name",2);a([u({reflect:!0})],k.prototype,"value",2);a([u({reflect:!0})],k.prototype,"href",2);a([u()],k.prototype,"target",2);a([u()],k.prototype,"rel",2);a([u()],k.prototype,"download",2);a([u({reflect:!0})],k.prototype,"form",2);a([u({attribute:"formaction"})],k.prototype,"formAction",2);a([u({attribute:"formenctype"})],k.prototype,"formEnctype",2);a([u({attribute:"formmethod"})],k.prototype,"formMethod",2);a([u({attribute:"formnovalidate",type:Boolean})],k.prototype,"formNoValidate",2);a([u({attribute:"formtarget"})],k.prototype,"formTarget",2);a([st("disabled",{waitUntilFirstUpdate:!0})],k.prototype,"handleDisabledChange",1);k=a([Y("wa-button")],k);var Qo=`:host {
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
`,$e=class extends V{constructor(){super(...arguments),this.localize=new kt(this)}render(){return $`
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
    `}};$e.css=Qo;$e=a([Y("wa-spinner")],$e);var Zo=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jo=(t,e)=>t?._$litType$!==void 0,tr=t=>t.strings===void 0,er={},nr=(t,e=er)=>t._$AH=e;var or=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},rr=`:host {
  --primary-color: currentColor;
  --primary-opacity: 1;
  --secondary-color: currentColor;
  --secondary-opacity: 0.4;

  display: inline-flex;
  box-sizing: content-box !important;
  width: auto;
  height: 1em;
}

svg {
  display: inline-block;
  width: auto;
  height: inherit;
  fill: currentColor;

  .fa-primary {
    color: var(--primary-color);
    opacity: var(--primary-opacity);
  }

  .fa-secondary {
    color: var(--secondary-color);
    opacity: var(--secondary-opacity);
  }
}

:host([fixed-width]) {
  width: 1em;
  justify-content: center;
}
`,Dt=Symbol(),Wt=Symbol(),me,ge=new Map,B=class extends V{constructor(){super(...arguments),this.svg=null,this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),po(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),fo(this)}getIconSource(){const t=he(this.library),e=this.family||mo();return this.name&&t?{url:t.resolver(this.name,e,this.variant),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}async resolveIcon(t,e){let n;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=$`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(o),this.svg}try{if(n=await fetch(t,{mode:"cors"}),!n.ok)return n.status===410?Dt:Wt}catch{return Wt}try{const o=document.createElement("div");o.innerHTML=await n.text();const r=o.firstElementChild;if(r?.tagName?.toLowerCase()!=="svg")return Dt;me||(me=new DOMParser);const s=me.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):Dt}catch{return Dt}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),n=e?he(this.library):void 0;if(!t){this.svg=null;return}let o=ge.get(t);o||(o=this.resolveIcon(t,n),ge.set(t,o));const r=await o;if(r===Wt&&ge.delete(t),t===this.getIconSource().url){if(Jo(r)){this.svg=r;return}switch(r){case Wt:case Dt:this.svg=null,this.dispatchEvent(new or);break;default:this.svg=r.cloneNode(!0),n?.mutator?.(this.svg),this.dispatchEvent(new Zo)}}}updated(t){super.updated(t);const e=he(this.library),n=this.shadowRoot?.querySelector("svg");n&&e?.mutator?.(n)}render(){return this.hasUpdated?this.svg:$`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};B.css=rr;a([Ht()],B.prototype,"svg",2);a([u()],B.prototype,"name",2);a([u()],B.prototype,"family",2);a([u()],B.prototype,"variant",2);a([u({attribute:"fixed-width",type:Boolean,reflect:!0})],B.prototype,"fixedWidth",2);a([u()],B.prototype,"src",2);a([u()],B.prototype,"label",2);a([u()],B.prototype,"library",2);a([st("label")],B.prototype,"handleLabelChange",1);a([st(["family","name","library","variant","src"])],B.prototype,"setIcon",1);B=a([Y("wa-icon")],B);var ir=`:host {
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

:host([appearance~='filled'][appearance~='outlined']) {
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
`,At=class extends V{constructor(){super(...arguments),this.variant="brand",this.appearance="outlined filled",this.size="medium"}render(){return $`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};At.css=[ir,Pn,Ut];a([u({reflect:!0})],At.prototype,"variant",2);a([u({reflect:!0})],At.prototype,"appearance",2);a([u({reflect:!0})],At.prototype,"size",2);At=a([Y("wa-callout")],At);var sr=(t={})=>{let{validationElement:e,validationProperty:n}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),n||(n="value");const o={observedAttributes:["required"],message:e.validationMessage,checkValidity(r){const i={message:"",isValid:!0,invalidKeys:[]};return(r.required??r.hasAttribute("required"))&&!r[n]&&(i.message=typeof o.message=="function"?o.message(r):o.message||"",i.isValid=!1,i.invalidKeys.push("valueMissing")),i}};return o},Tn=`:host {
  display: flex;
  flex-direction: column;
}

/* Label */
:is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
  display: inline-block;
  color: var(--wa-form-control-label-color);
  font-weight: var(--wa-form-control-label-font-weight);
  line-height: var(--wa-form-control-label-line-height);
  margin-block-end: 0.5em;

  :host([required]) &::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }
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
 */const Ce=On(class extends Ln{constructor(t){if(super(t),t.type!==gt.PROPERTY&&t.type!==gt.ATTRIBUTE&&t.type!==gt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!tr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===j||e===_)return e;const n=t.element,o=t.name;if(t.type===gt.PROPERTY){if(e===n[o])return j}else if(t.type===gt.BOOLEAN_ATTRIBUTE){if(!!e===n.hasAttribute(o))return j}else if(t.type===gt.ATTRIBUTE&&n.getAttribute(o)===e+"")return j;return nr(t),e}});var ar=`:host {
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
`,P=class extends H{constructor(){super(...arguments),this.hasSlotController=new Ot(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){const t=[sr({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){return this._value??"on"}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,n=!this.checked&&this.indeterminate,o=n?"indeterminate":"check",r=n?"indeterminate":"check";return $`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${C(this._value)}
            .indeterminate=${Ce(this.indeterminate)}
            .checked=${Ce(this.checked)}
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
        class="${yt({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};P.css=[Tn,Ut,ar];P.shadowRootOptions={...H.shadowRootOptions,delegatesFocus:!0};a([N('input[type="checkbox"]')],P.prototype,"input",2);a([u()],P.prototype,"title",2);a([u({reflect:!0})],P.prototype,"name",2);a([u({reflect:!0})],P.prototype,"value",1);a([u({reflect:!0})],P.prototype,"size",2);a([u({type:Boolean})],P.prototype,"disabled",2);a([u({type:Boolean,reflect:!0})],P.prototype,"indeterminate",2);a([u({type:Boolean,attribute:!1})],P.prototype,"checked",2);a([u({type:Boolean,reflect:!0,attribute:"checked"})],P.prototype,"defaultChecked",2);a([u({reflect:!0})],P.prototype,"form",2);a([u({type:Boolean,reflect:!0})],P.prototype,"required",2);a([u()],P.prototype,"hint",2);a([st("defaultChecked")],P.prototype,"handleDefaultCheckedChange",1);a([st(["checked","indeterminate"])],P.prototype,"handleStateChange",1);a([st("disabled")],P.prototype,"handleDisabledChange",1);P=a([Y("wa-checkbox")],P);function Rn(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var Ae=new Set;function lr(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function cr(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Jt(t){if(Ae.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const e=lr()+cr();let n=getComputedStyle(document.documentElement).scrollbarGutter;(!n||n==="auto")&&(n="stable"),e<2&&(n=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",n),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function te(t){Ae.delete(t),Ae.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}var Ie=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},qe=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},Ne=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},Ve=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};function q(t,e){return new Promise(n=>{const o=new AbortController,{signal:r}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let i=()=>{t.classList.remove(e),n(),o.abort()};t.addEventListener("animationend",i,{once:!0,signal:r}),t.addEventListener("animationcancel",i,{once:!0,signal:r})})}var dr=`:host {
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
`,it=class extends V{constructor(){super(...arguments),this.localize=new kt(this),this.hasSlotController=new Ot(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Jt(this))}disconnectedCallback(){super.disconnectedCallback(),te(this),this.removeOpenListeners()}async requestClose(t){const e=new Ne({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,q(this.dialog,"pulse");return}this.removeOpenListeners(),await q(this.dialog,"hide"),this.open=!1,this.dialog.close(),te(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new Ie)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),this.dialog.classList.contains("hide")||this.requestClose(this.dialog)}handleDialogClick(t){const n=t.target.closest('[data-dialog="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await q(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new Ve;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Jt(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"&&e.focus()}),await q(this.dialog,"show"),this.dispatchEvent(new qe)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return $`
      <dialog
        part="dialog"
        class=${yt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?$`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
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

        ${e?$`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};it.css=dr;a([N(".dialog")],it.prototype,"dialog",2);a([u({type:Boolean,reflect:!0})],it.prototype,"open",2);a([u({reflect:!0})],it.prototype,"label",2);a([u({attribute:"without-header",type:Boolean,reflect:!0})],it.prototype,"withoutHeader",2);a([u({attribute:"light-dismiss",type:Boolean})],it.prototype,"lightDismiss",2);a([st("open",{waitUntilFirstUpdate:!0})],it.prototype,"handleOpenChange",1);it=a([Y("wa-dialog")],it);document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[n,o]=Rn(e.getAttribute("data-dialog")||"");if(n==="open"&&o?.length){const i=e.getRootNode().getElementById(o);i?.localName==="wa-dialog"?i.open=!0:console.warn(`A dialog with an ID of "${o}" could not be found in this document.`)}}});document.addEventListener("pointerdown",()=>{});var ur=`:host {
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
`,J=class extends V{constructor(){super(...arguments),this.localize=new kt(this),this.hasSlotController=new Ot(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),Jt(this))}disconnectedCallback(){super.disconnectedCallback(),te(this),this.removeOpenListeners()}async requestClose(t){const e=new Ne({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,q(this.drawer,"pulse");return}this.removeOpenListeners(),await q(this.drawer,"hide"),this.open=!1,this.drawer.close(),te(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new Ie)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),this.drawer.classList.contains("hide")||this.requestClose(this.drawer)}handleDialogClick(t){const n=t.target.closest('[data-drawer="close"]');n&&(t.stopPropagation(),this.requestClose(n))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await q(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new Ve;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),Jt(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"&&e.focus()}),await q(this.drawer,"show"),this.dispatchEvent(new qe)}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return $`
      <dialog
        part="dialog"
        class=${yt({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?$`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
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

        ${e?$`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};J.css=ur;a([N(".drawer")],J.prototype,"drawer",2);a([u({type:Boolean,reflect:!0})],J.prototype,"open",2);a([u({reflect:!0})],J.prototype,"label",2);a([u({reflect:!0})],J.prototype,"placement",2);a([u({attribute:"without-header",type:Boolean,reflect:!0})],J.prototype,"withoutHeader",2);a([u({attribute:"light-dismiss",type:Boolean})],J.prototype,"lightDismiss",2);a([st("open",{waitUntilFirstUpdate:!0})],J.prototype,"handleOpenChange",1);J=a([Y("wa-drawer")],J);document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[n,o]=Rn(e.getAttribute("data-drawer")||"");if(n==="open"&&o?.length){const i=e.getRootNode().getElementById(o);i?.localName==="wa-drawer"?i.open=!0:console.warn(`A drawer with an ID of "${o}" could not be found in this document.`)}}});document.body.addEventListener("pointerdown",()=>{});const hr="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let pr=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=hr[n[t]&63];return e};function fr(t=""){return`${t}${pr()}`}const ut=Math.min,D=Math.max,ee=Math.round,jt=Math.floor,Z=t=>({x:t,y:t}),mr={left:"right",right:"left",bottom:"top",top:"bottom"},gr={start:"end",end:"start"};function _e(t,e,n){return D(t,ut(e,n))}function Lt(t,e){return typeof t=="function"?t(e):t}function ht(t){return t.split("-")[0]}function zt(t){return t.split("-")[1]}function Dn(t){return t==="x"?"y":"x"}function He(t){return t==="y"?"height":"width"}const br=new Set(["top","bottom"]);function rt(t){return br.has(ht(t))?"y":"x"}function Ue(t){return Dn(rt(t))}function wr(t,e,n){n===void 0&&(n=!1);const o=zt(t),r=Ue(t),i=He(r);let s=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=ne(s)),[s,ne(s)]}function vr(t){const e=ne(t);return[Pe(t),e,Pe(e)]}function Pe(t){return t.replace(/start|end/g,e=>gr[e])}const sn=["left","right"],an=["right","left"],yr=["top","bottom"],xr=["bottom","top"];function kr(t,e,n){switch(t){case"top":case"bottom":return n?e?an:sn:e?sn:an;case"left":case"right":return e?yr:xr;default:return[]}}function Er(t,e,n,o){const r=zt(t);let i=kr(ht(t),n==="start",o);return r&&(i=i.map(s=>s+"-"+r),e&&(i=i.concat(i.map(Pe)))),i}function ne(t){return t.replace(/left|right|bottom|top/g,e=>mr[e])}function Sr(t){return{top:0,right:0,bottom:0,left:0,...t}}function Mn(t){return typeof t!="number"?Sr(t):{top:t,right:t,bottom:t,left:t}}function oe(t){const{x:e,y:n,width:o,height:r}=t;return{width:o,height:r,top:n,left:e,right:e+o,bottom:n+r,x:e,y:n}}function ln(t,e,n){let{reference:o,floating:r}=t;const i=rt(e),s=Ue(e),l=He(s),c=ht(e),h=i==="y",d=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2,m=o[l]/2-r[l]/2;let f;switch(c){case"top":f={x:d,y:o.y-r.height};break;case"bottom":f={x:d,y:o.y+o.height};break;case"right":f={x:o.x+o.width,y:p};break;case"left":f={x:o.x-r.width,y:p};break;default:f={x:o.x,y:o.y}}switch(zt(e)){case"start":f[s]-=m*(n&&h?-1:1);break;case"end":f[s]+=m*(n&&h?-1:1);break}return f}const $r=async(t,e,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:i=[],platform:s}=n,l=i.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(e));let h=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:d,y:p}=ln(h,o,c),m=o,f={},g=0;for(let b=0;b<l.length;b++){const{name:y,fn:v}=l[b],{x,y:S,data:O,reset:A}=await v({x:d,y:p,initialPlacement:o,placement:m,strategy:r,middlewareData:f,rects:h,platform:s,elements:{reference:t,floating:e}});d=x??d,p=S??p,f={...f,[y]:{...f[y],...O}},A&&g<=50&&(g++,typeof A=="object"&&(A.placement&&(m=A.placement),A.rects&&(h=A.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:r}):A.rects),{x:d,y:p}=ln(h,m,c)),b=-1)}return{x:d,y:p,placement:m,strategy:r,middlewareData:f}};async function Fe(t,e){var n;e===void 0&&(e={});const{x:o,y:r,platform:i,rects:s,elements:l,strategy:c}=t,{boundary:h="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:m=!1,padding:f=0}=Lt(e,t),g=Mn(f),y=l[m?p==="floating"?"reference":"floating":p],v=oe(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(y)))==null||n?y:y.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(l.floating)),boundary:h,rootBoundary:d,strategy:c})),x=p==="floating"?{x:o,y:r,width:s.floating.width,height:s.floating.height}:s.reference,S=await(i.getOffsetParent==null?void 0:i.getOffsetParent(l.floating)),O=await(i.isElement==null?void 0:i.isElement(S))?await(i.getScale==null?void 0:i.getScale(S))||{x:1,y:1}:{x:1,y:1},A=oe(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:x,offsetParent:S,strategy:c}):x);return{top:(v.top-A.top+g.top)/O.y,bottom:(A.bottom-v.bottom+g.bottom)/O.y,left:(v.left-A.left+g.left)/O.x,right:(A.right-v.right+g.right)/O.x}}const Cr=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:r,rects:i,platform:s,elements:l,middlewareData:c}=e,{element:h,padding:d=0}=Lt(t,e)||{};if(h==null)return{};const p=Mn(d),m={x:n,y:o},f=Ue(r),g=He(f),b=await s.getDimensions(h),y=f==="y",v=y?"top":"left",x=y?"bottom":"right",S=y?"clientHeight":"clientWidth",O=i.reference[g]+i.reference[f]-m[f]-i.floating[g],A=m[f]-i.reference[f],U=await(s.getOffsetParent==null?void 0:s.getOffsetParent(h));let L=U?U[S]:0;(!L||!await(s.isElement==null?void 0:s.isElement(U)))&&(L=l.floating[S]||i.floating[g]);const nt=O/2-A/2,G=L/2-b[g]/2-1,I=ut(p[v],G),at=ut(p[x],G),Q=I,lt=L-b[g]-at,z=L/2-b[g]/2+nt,ft=_e(Q,z,lt),ot=!c.arrow&&zt(r)!=null&&z!==ft&&i.reference[g]/2-(z<Q?I:at)-b[g]/2<0,F=ot?z<Q?z-Q:z-lt:0;return{[f]:m[f]+F,data:{[f]:ft,centerOffset:z-ft-F,...ot&&{alignmentOffset:F}},reset:ot}}}),Ar=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:r,middlewareData:i,rects:s,initialPlacement:l,platform:c,elements:h}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:b=!0,...y}=Lt(t,e);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const v=ht(r),x=rt(l),S=ht(l)===l,O=await(c.isRTL==null?void 0:c.isRTL(h.floating)),A=m||(S||!b?[ne(l)]:vr(l)),U=g!=="none";!m&&U&&A.push(...Er(l,b,g,O));const L=[l,...A],nt=await Fe(e,y),G=[];let I=((o=i.flip)==null?void 0:o.overflows)||[];if(d&&G.push(nt[v]),p){const z=wr(r,s,O);G.push(nt[z[0]],nt[z[1]])}if(I=[...I,{placement:r,overflows:G}],!G.every(z=>z<=0)){var at,Q;const z=(((at=i.flip)==null?void 0:at.index)||0)+1,ft=L[z];if(ft&&(!(p==="alignment"?x!==rt(ft):!1)||I.every(W=>rt(W.placement)===x?W.overflows[0]>0:!0)))return{data:{index:z,overflows:I},reset:{placement:ft}};let ot=(Q=I.filter(F=>F.overflows[0]<=0).sort((F,W)=>F.overflows[1]-W.overflows[1])[0])==null?void 0:Q.placement;if(!ot)switch(f){case"bestFit":{var lt;const F=(lt=I.filter(W=>{if(U){const ct=rt(W.placement);return ct===x||ct==="y"}return!0}).map(W=>[W.placement,W.overflows.filter(ct=>ct>0).reduce((ct,Gn)=>ct+Gn,0)]).sort((W,ct)=>W[1]-ct[1])[0])==null?void 0:lt[0];F&&(ot=F);break}case"initialPlacement":ot=l;break}if(r!==ot)return{reset:{placement:ot}}}return{}}}},_r=new Set(["left","top"]);async function Pr(t,e){const{placement:n,platform:o,elements:r}=t,i=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=ht(n),l=zt(n),c=rt(n)==="y",h=_r.has(s)?-1:1,d=i&&c?-1:1,p=Lt(e,t);let{mainAxis:m,crossAxis:f,alignmentAxis:g}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof g=="number"&&(f=l==="end"?g*-1:g),c?{x:f*d,y:m*h}:{x:m*h,y:f*d}}const Or=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:r,y:i,placement:s,middlewareData:l}=e,c=await Pr(e,t);return s===((n=l.offset)==null?void 0:n.placement)&&(o=l.arrow)!=null&&o.alignmentOffset?{}:{x:r+c.x,y:i+c.y,data:{...c,placement:s}}}}},Lr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:r}=e,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:y=>{let{x:v,y:x}=y;return{x:v,y:x}}},...c}=Lt(t,e),h={x:n,y:o},d=await Fe(e,c),p=rt(ht(r)),m=Dn(p);let f=h[m],g=h[p];if(i){const y=m==="y"?"top":"left",v=m==="y"?"bottom":"right",x=f+d[y],S=f-d[v];f=_e(x,f,S)}if(s){const y=p==="y"?"top":"left",v=p==="y"?"bottom":"right",x=g+d[y],S=g-d[v];g=_e(x,g,S)}const b=l.fn({...e,[m]:f,[p]:g});return{...b,data:{x:b.x-n,y:b.y-o,enabled:{[m]:i,[p]:s}}}}}},zr=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:r,rects:i,platform:s,elements:l}=e,{apply:c=()=>{},...h}=Lt(t,e),d=await Fe(e,h),p=ht(r),m=zt(r),f=rt(r)==="y",{width:g,height:b}=i.floating;let y,v;p==="top"||p==="bottom"?(y=p,v=m===(await(s.isRTL==null?void 0:s.isRTL(l.floating))?"start":"end")?"left":"right"):(v=p,y=m==="end"?"top":"bottom");const x=b-d.top-d.bottom,S=g-d.left-d.right,O=ut(b-d[y],x),A=ut(g-d[v],S),U=!e.middlewareData.shift;let L=O,nt=A;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(nt=S),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(L=x),U&&!m){const I=D(d.left,0),at=D(d.right,0),Q=D(d.top,0),lt=D(d.bottom,0);f?nt=g-2*(I!==0||at!==0?I+at:D(d.left,d.right)):L=b-2*(Q!==0||lt!==0?Q+lt:D(d.top,d.bottom))}await c({...e,availableWidth:nt,availableHeight:L});const G=await s.getDimensions(l.floating);return g!==G.width||b!==G.height?{reset:{rects:!0}}:{}}}};function se(){return typeof window<"u"}function Tt(t){return Bn(t)?(t.nodeName||"").toLowerCase():"#document"}function M(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function et(t){var e;return(e=(Bn(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Bn(t){return se()?t instanceof Node||t instanceof M(t).Node:!1}function K(t){return se()?t instanceof Element||t instanceof M(t).Element:!1}function tt(t){return se()?t instanceof HTMLElement||t instanceof M(t).HTMLElement:!1}function cn(t){return!se()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof M(t).ShadowRoot}const Tr=new Set(["inline","contents"]);function Ft(t){const{overflow:e,overflowX:n,overflowY:o,display:r}=X(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!Tr.has(r)}const Rr=new Set(["table","td","th"]);function Dr(t){return Rr.has(Tt(t))}const Mr=[":popover-open",":modal"];function ae(t){return Mr.some(e=>{try{return t.matches(e)}catch{return!1}})}const Br=["transform","translate","scale","rotate","perspective"],Ir=["transform","translate","scale","rotate","perspective","filter"],qr=["paint","layout","strict","content"];function le(t){const e=We(),n=K(t)?X(t):t;return Br.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||Ir.some(o=>(n.willChange||"").includes(o))||qr.some(o=>(n.contain||"").includes(o))}function Nr(t){let e=pt(t);for(;tt(e)&&!_t(e);){if(le(e))return e;if(ae(e))return null;e=pt(e)}return null}function We(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Vr=new Set(["html","body","#document"]);function _t(t){return Vr.has(Tt(t))}function X(t){return M(t).getComputedStyle(t)}function ce(t){return K(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function pt(t){if(Tt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||cn(t)&&t.host||et(t);return cn(e)?e.host:e}function In(t){const e=pt(t);return _t(e)?t.ownerDocument?t.ownerDocument.body:t.body:tt(e)&&Ft(e)?e:In(e)}function Pt(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const r=In(t),i=r===((o=t.ownerDocument)==null?void 0:o.body),s=M(r);if(i){const l=Oe(s);return e.concat(s,s.visualViewport||[],Ft(r)?r:[],l&&n?Pt(l):[])}return e.concat(r,Pt(r,[],n))}function Oe(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function qn(t){const e=X(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=tt(t),i=r?t.offsetWidth:n,s=r?t.offsetHeight:o,l=ee(n)!==i||ee(o)!==s;return l&&(n=i,o=s),{width:n,height:o,$:l}}function je(t){return K(t)?t:t.contextElement}function $t(t){const e=je(t);if(!tt(e))return Z(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:i}=qn(e);let s=(i?ee(n.width):n.width)/o,l=(i?ee(n.height):n.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const Hr=Z(0);function Nn(t){const e=M(t);return!We()||!e.visualViewport?Hr:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Ur(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==M(t)?!1:e}function xt(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const r=t.getBoundingClientRect(),i=je(t);let s=Z(1);e&&(o?K(o)&&(s=$t(o)):s=$t(t));const l=Ur(i,n,o)?Nn(i):Z(0);let c=(r.left+l.x)/s.x,h=(r.top+l.y)/s.y,d=r.width/s.x,p=r.height/s.y;if(i){const m=M(i),f=o&&K(o)?M(o):o;let g=m,b=Oe(g);for(;b&&o&&f!==g;){const y=$t(b),v=b.getBoundingClientRect(),x=X(b),S=v.left+(b.clientLeft+parseFloat(x.paddingLeft))*y.x,O=v.top+(b.clientTop+parseFloat(x.paddingTop))*y.y;c*=y.x,h*=y.y,d*=y.x,p*=y.y,c+=S,h+=O,g=M(b),b=Oe(g)}}return oe({width:d,height:p,x:c,y:h})}function de(t,e){const n=ce(t).scrollLeft;return e?e.left+n:xt(et(t)).left+n}function Vn(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-de(t,n),r=n.top+e.scrollTop;return{x:o,y:r}}function Fr(t){let{elements:e,rect:n,offsetParent:o,strategy:r}=t;const i=r==="fixed",s=et(o),l=e?ae(e.floating):!1;if(o===s||l&&i)return n;let c={scrollLeft:0,scrollTop:0},h=Z(1);const d=Z(0),p=tt(o);if((p||!p&&!i)&&((Tt(o)!=="body"||Ft(s))&&(c=ce(o)),tt(o))){const f=xt(o);h=$t(o),d.x=f.x+o.clientLeft,d.y=f.y+o.clientTop}const m=s&&!p&&!i?Vn(s,c):Z(0);return{width:n.width*h.x,height:n.height*h.y,x:n.x*h.x-c.scrollLeft*h.x+d.x+m.x,y:n.y*h.y-c.scrollTop*h.y+d.y+m.y}}function Wr(t){return Array.from(t.getClientRects())}function jr(t){const e=et(t),n=ce(t),o=t.ownerDocument.body,r=D(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),i=D(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+de(t);const l=-n.scrollTop;return X(o).direction==="rtl"&&(s+=D(e.clientWidth,o.clientWidth)-r),{width:r,height:i,x:s,y:l}}const dn=25;function Kr(t,e){const n=M(t),o=et(t),r=n.visualViewport;let i=o.clientWidth,s=o.clientHeight,l=0,c=0;if(r){i=r.width,s=r.height;const d=We();(!d||d&&e==="fixed")&&(l=r.offsetLeft,c=r.offsetTop)}const h=de(o);if(h<=0){const d=o.ownerDocument,p=d.body,m=getComputedStyle(p),f=d.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,g=Math.abs(o.clientWidth-p.clientWidth-f);g<=dn&&(i-=g)}else h<=dn&&(i+=h);return{width:i,height:s,x:l,y:c}}const Xr=new Set(["absolute","fixed"]);function Yr(t,e){const n=xt(t,!0,e==="fixed"),o=n.top+t.clientTop,r=n.left+t.clientLeft,i=tt(t)?$t(t):Z(1),s=t.clientWidth*i.x,l=t.clientHeight*i.y,c=r*i.x,h=o*i.y;return{width:s,height:l,x:c,y:h}}function un(t,e,n){let o;if(e==="viewport")o=Kr(t,n);else if(e==="document")o=jr(et(t));else if(K(e))o=Yr(e,n);else{const r=Nn(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return oe(o)}function Hn(t,e){const n=pt(t);return n===e||!K(n)||_t(n)?!1:X(n).position==="fixed"||Hn(n,e)}function Gr(t,e){const n=e.get(t);if(n)return n;let o=Pt(t,[],!1).filter(l=>K(l)&&Tt(l)!=="body"),r=null;const i=X(t).position==="fixed";let s=i?pt(t):t;for(;K(s)&&!_t(s);){const l=X(s),c=le(s);!c&&l.position==="fixed"&&(r=null),(i?!c&&!r:!c&&l.position==="static"&&!!r&&Xr.has(r.position)||Ft(s)&&!c&&Hn(t,s))?o=o.filter(d=>d!==s):r=l,s=pt(s)}return e.set(t,o),o}function Qr(t){let{element:e,boundary:n,rootBoundary:o,strategy:r}=t;const s=[...n==="clippingAncestors"?ae(e)?[]:Gr(e,this._c):[].concat(n),o],l=s[0],c=s.reduce((h,d)=>{const p=un(e,d,r);return h.top=D(p.top,h.top),h.right=ut(p.right,h.right),h.bottom=ut(p.bottom,h.bottom),h.left=D(p.left,h.left),h},un(e,l,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Zr(t){const{width:e,height:n}=qn(t);return{width:e,height:n}}function Jr(t,e,n){const o=tt(e),r=et(e),i=n==="fixed",s=xt(t,!0,i,e);let l={scrollLeft:0,scrollTop:0};const c=Z(0);function h(){c.x=de(r)}if(o||!o&&!i)if((Tt(e)!=="body"||Ft(r))&&(l=ce(e)),o){const f=xt(e,!0,i,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}else r&&h();i&&!o&&r&&h();const d=r&&!o&&!i?Vn(r,l):Z(0),p=s.left+l.scrollLeft-c.x-d.x,m=s.top+l.scrollTop-c.y-d.y;return{x:p,y:m,width:s.width,height:s.height}}function be(t){return X(t).position==="static"}function hn(t,e){if(!tt(t)||X(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return et(t)===n&&(n=n.ownerDocument.body),n}function Un(t,e){const n=M(t);if(ae(t))return n;if(!tt(t)){let r=pt(t);for(;r&&!_t(r);){if(K(r)&&!be(r))return r;r=pt(r)}return n}let o=hn(t,e);for(;o&&Dr(o)&&be(o);)o=hn(o,e);return o&&_t(o)&&be(o)&&!le(o)?n:o||Nr(t)||n}const ti=async function(t){const e=this.getOffsetParent||Un,n=this.getDimensions,o=await n(t.floating);return{reference:Jr(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function ei(t){return X(t).direction==="rtl"}const Gt={convertOffsetParentRelativeRectToViewportRelativeRect:Fr,getDocumentElement:et,getClippingRect:Qr,getOffsetParent:Un,getElementRects:ti,getClientRects:Wr,getDimensions:Zr,getScale:$t,isElement:K,isRTL:ei};function Fn(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function ni(t,e){let n=null,o;const r=et(t);function i(){var l;clearTimeout(o),(l=n)==null||l.disconnect(),n=null}function s(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),i();const h=t.getBoundingClientRect(),{left:d,top:p,width:m,height:f}=h;if(l||e(),!m||!f)return;const g=jt(p),b=jt(r.clientWidth-(d+m)),y=jt(r.clientHeight-(p+f)),v=jt(d),S={rootMargin:-g+"px "+-b+"px "+-y+"px "+-v+"px",threshold:D(0,ut(1,c))||1};let O=!0;function A(U){const L=U[0].intersectionRatio;if(L!==c){if(!O)return s();L?s(!1,L):o=setTimeout(()=>{s(!1,1e-7)},1e3)}L===1&&!Fn(h,t.getBoundingClientRect())&&s(),O=!1}try{n=new IntersectionObserver(A,{...S,root:r.ownerDocument})}catch{n=new IntersectionObserver(A,S)}n.observe(t)}return s(!0),i}function Wn(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=o,h=je(t),d=r||i?[...h?Pt(h):[],...Pt(e)]:[];d.forEach(v=>{r&&v.addEventListener("scroll",n,{passive:!0}),i&&v.addEventListener("resize",n)});const p=h&&l?ni(h,n):null;let m=-1,f=null;s&&(f=new ResizeObserver(v=>{let[x]=v;x&&x.target===h&&f&&(f.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var S;(S=f)==null||S.observe(e)})),n()}),h&&!c&&f.observe(h),f.observe(e));let g,b=c?xt(t):null;c&&y();function y(){const v=xt(t);b&&!Fn(b,v)&&n(),b=v,g=requestAnimationFrame(y)}return n(),()=>{var v;d.forEach(x=>{r&&x.removeEventListener("scroll",n),i&&x.removeEventListener("resize",n)}),p?.(),(v=f)==null||v.disconnect(),f=null,c&&cancelAnimationFrame(g)}}const jn=Or,Kn=Lr,Xn=Ar,pn=zr,oi=Cr,Yn=(t,e,n)=>{const o=new Map,r={platform:Gt,...n},i={...r.platform,_c:o};return $r(t,e,{...r,platform:i})};var ri=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},ii=`:host {
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
`,we=new Set,R=class extends V{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new kt(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e=this.localize.dir()==="rtl";if(t.key==="Escape"){const d=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,d?.focus();return}const n=document.activeElement,o=n?.localName==="wa-dropdown-item",r=this.getCurrentSubmenuItem(),i=!!r;let s,l,c;i?(s=this.getSubmenuItems(r),l=s.find(d=>d.active||d===n),c=l?s.indexOf(l):-1):(s=this.getItems(),l=s.find(d=>d.active||d===n),c=l?s.indexOf(l):-1);let h;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),c>0?h=s[c-1]:h=s[s.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),c!==-1&&c<s.length-1?h=s[c+1]:h=s[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&o&&l&&l.hasSubmenu){t.preventDefault(),t.stopPropagation(),l.submenuOpen=!0,this.addToSubmenuStack(l),setTimeout(()=>{const d=this.getSubmenuItems(l);d.length>0&&(d.forEach((p,m)=>p.active=m===0),d[0].focus())},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&i){t.preventDefault(),t.stopPropagation();const d=this.removeFromSubmenuStack();d&&(d.submenuOpen=!1,setTimeout(()=>{d.focus(),d.active=!0,(d.slot==="submenu"?this.getSubmenuItems(d.parentElement):this.getItems()).forEach(m=>{m!==d&&(m.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),h=t.key==="Home"?s[0]:s[s.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,s.some(d=>{const p=(d.textContent||"").trim().toLowerCase(),m=this.userTypedQuery.trim().toLowerCase();return p.startsWith(m)?(h=d,!0):!1})),h){t.preventDefault(),t.stopPropagation(),s.forEach(d=>d.active=d===h),h.focus();return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&o&&l&&(t.preventDefault(),t.stopPropagation(),l.hasSubmenu?(l.submenuOpen=!0,this.addToSubmenuStack(l),setTimeout(()=>{const d=this.getSubmenuItems(l);d.length>0&&(d.forEach((p,m)=>p.active=m===0),d[0].focus())},0)):this.makeSelection(l))},this.handleDocumentPointerDown=t=>{t.composedPath().some(o=>o instanceof HTMLElement?o===this||o.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const n=e.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl",r=o?n.right:n.left,i=o?Math.max(t.clientX,r):Math.min(t.clientX,r),s=Math.max(n.top,Math.min(t.clientY,n.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${i}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${s}px`);const l=e.matches(":hover"),c=e.submenuElement?.matches(":hover")||!!t.composedPath().find(h=>h instanceof HTMLElement&&h.closest('[part="submenu"]')===e.submenuElement);!l&&!c&&setTimeout(()=>{!e.matches(":hover")&&!e.submenuElement?.matches(":hover")&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){t.has("open")&&(this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())),t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=[...this.children].filter(n=>n.localName==="wa-dropdown-item"&&!n.hasAttribute("slot"));return t?e:e.filter(n=>!n.disabled)}getSubmenuItems(t,e=!1){const n=[...t.children].filter(o=>o.localName==="wa-dropdown-item"&&o.getAttribute("slot")==="submenu");return e?n:n.filter(o=>!o.disabled)}syncItemSizes(){this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let n;e?n=this.getSubmenuItems(e,!0):n=this.getItems(!0),n.forEach(o=>{o!==t&&o.submenuOpen&&(o.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger())return;const e=new Ve;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}we.forEach(o=>o.open=!1),this.popup.active=!0,this.open=!0,we.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await q(this.menu,"show");const n=this.getItems();n.length>0&&(n.forEach((o,r)=>o.active=r===0),n[0].focus()),this.dispatchEvent(new qe)}async hideMenu(){const t=new Ne({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,we.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await q(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new Ie)}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(o=>o.updateComplete)),this.syncItemSizes();const e=t.some(o=>o.type==="checkbox"),n=t.some(o=>o.hasSubmenu);t.forEach((o,r)=>{o.active=r===0,o.checkboxAdjacent=e,o.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=Wn(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const n=t.submenuElement.querySelector('slot[name="submenu"]');n&&(n.removeEventListener("slotchange",R.handleSubmenuSlotChange),n.addEventListener("slotchange",R.handleSubmenuSlotChange),R.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const n=e.assignedElements().filter(i=>i.localName==="wa-dropdown-item");if(n.length===0)return;const o=n.some(i=>i.hasSubmenu),r=n.some(i=>i.type==="checkbox");n.forEach(i=>{i.submenuAdjacent=o,i.checkboxAdjacent=r})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),n=e.some(o=>o.hasSubmenu);e.forEach(o=>{o.submenuAdjacent=n})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const n=this.localize.dir()==="rtl"?"left-start":"right-start";Yn(t,t.submenuElement,{placement:n,middleware:[jn({mainAxis:0,crossAxis:-5}),Xn({fallbackStrategy:"bestFit"}),Kn({padding:8})]}).then(({x:o,y:r,placement:i})=>{t.submenuElement.setAttribute("data-placement",i),Object.assign(t.submenuElement.style,{left:`${o}px`,top:`${r}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");const n=t.submenuElement.getBoundingClientRect(),o=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${n.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${o?n.right:n.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${n.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);const n=new ri({item:t});this.dispatchEvent(n),n.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",fr("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup.active:this.open;return $`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="8"
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
    `}};R.css=[Ut,ii];a([N("slot:not([name])")],R.prototype,"defaultSlot",2);a([N("#menu")],R.prototype,"menu",2);a([N("wa-popup")],R.prototype,"popup",2);a([u({type:Boolean,reflect:!0})],R.prototype,"open",2);a([u({reflect:!0})],R.prototype,"size",2);a([u({reflect:!0})],R.prototype,"placement",2);a([u({type:Number})],R.prototype,"distance",2);a([u({type:Number})],R.prototype,"skidding",2);R=a([Y("wa-dropdown")],R);var si=`:host {
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
`,T=class extends V{constructor(){super(...arguments),this.hasSlotController=new Ot(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.notifyParentOfOpening(),this.submenuElement.showPopover(),this.submenuElement.hidden=!1,this.submenuElement.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await q(this.submenuElement,"show"),setTimeout(()=>{const t=this.getSubmenuItems();t.length>0&&(t.forEach((e,n)=>e.active=n===0),t[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(o=>o!==this&&o.localName==="wa-dropdown-item"&&o.getAttribute("slot")===this.getAttribute("slot")&&o.submenuOpen).forEach(o=>{o.submenuOpen=!1})}async closeSubmenu(){!this.hasSubmenu||!this.submenuElement||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),this.submenuElement.hidden||(await q(this.submenuElement,"hide"),this.submenuElement.hidden=!0,this.submenuElement.removeAttribute("data-visible"),this.submenuElement.hidePopover()))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return $`
      ${this.type==="checkbox"?$`
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

      ${this.hasSubmenu?$`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?$`
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
    `}};T.css=si;a([N("#submenu")],T.prototype,"submenuElement",2);a([u({type:Boolean})],T.prototype,"active",2);a([u({reflect:!0})],T.prototype,"variant",2);a([u({reflect:!0})],T.prototype,"size",2);a([u({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],T.prototype,"checkboxAdjacent",2);a([u({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],T.prototype,"submenuAdjacent",2);a([u()],T.prototype,"value",2);a([u({reflect:!0})],T.prototype,"type",2);a([u({type:Boolean})],T.prototype,"checked",2);a([u({type:Boolean,reflect:!0})],T.prototype,"disabled",2);a([u({type:Boolean,reflect:!0})],T.prototype,"submenuOpen",2);a([Ht()],T.prototype,"hasSubmenu",2);T=a([Y("wa-dropdown-item")],T);var ai=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};function li(t){return ci(t)}function ve(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function ci(t){for(let e=t;e;e=ve(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=ve(t);e;e=ve(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||le(n)||e.tagName==="BODY"))return e}return null}var di=`:host {
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
`;function fn(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var Kt=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),E=class extends V{constructor(){super(...arguments),this.localize=new kt(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),n=this.placement.includes("top")||this.placement.includes("bottom");let o=0,r=0,i=0,s=0,l=0,c=0,h=0,d=0;n?t.top<e.top?(o=t.left,r=t.bottom,i=t.right,s=t.bottom,l=e.left,c=e.top,h=e.right,d=e.top):(o=e.left,r=e.bottom,i=e.right,s=e.bottom,l=t.left,c=t.top,h=t.right,d=t.top):t.left<e.left?(o=t.right,r=t.top,i=e.left,s=e.top,l=t.right,c=t.bottom,h=e.left,d=e.bottom):(o=e.right,r=e.top,i=t.left,s=t.top,l=e.right,c=e.bottom,h=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||fn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=Wn(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[jn({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(pn({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;Kt&&!fn(this.anchor)&&this.boundary==="scroll"&&(e=Pt(this.anchorEl).filter(o=>o instanceof Element)),this.flip&&t.push(Xn({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Kn({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(pn({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(oi({element:this.arrowEl,padding:this.arrowPadding}));const n=Kt?o=>Gt.getOffsetParent(o,li):Gt.getOffsetParent;Yn(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:Kt?"absolute":"fixed",platform:{...Gt,getOffsetParent:n}}).then(({x:o,y:r,middlewareData:i,placement:s})=>{const l=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const h=i.arrow.x,d=i.arrow.y;let p="",m="",f="",g="";if(this.arrowPlacement==="start"){const b=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",m=l?b:"",g=l?"":b}else if(this.arrowPlacement==="end"){const b=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=l?"":b,g=l?b:"",f=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(g=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof h=="number"?`${h}px`:"",p=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:p,right:m,bottom:f,left:g,[c]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new ai)}render(){return $`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${yt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${yt({popup:!0,"popup-active":this.active,"popup-fixed":!Kt,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?$`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};E.css=di;a([N(".popup")],E.prototype,"popup",2);a([N(".arrow")],E.prototype,"arrowEl",2);a([u()],E.prototype,"anchor",2);a([u({type:Boolean,reflect:!0})],E.prototype,"active",2);a([u({reflect:!0})],E.prototype,"placement",2);a([u()],E.prototype,"boundary",2);a([u({type:Number})],E.prototype,"distance",2);a([u({type:Number})],E.prototype,"skidding",2);a([u({type:Boolean})],E.prototype,"arrow",2);a([u({attribute:"arrow-placement"})],E.prototype,"arrowPlacement",2);a([u({attribute:"arrow-padding",type:Number})],E.prototype,"arrowPadding",2);a([u({type:Boolean})],E.prototype,"flip",2);a([u({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],E.prototype,"flipFallbackPlacements",2);a([u({attribute:"flip-fallback-strategy"})],E.prototype,"flipFallbackStrategy",2);a([u({type:Object})],E.prototype,"flipBoundary",2);a([u({attribute:"flip-padding",type:Number})],E.prototype,"flipPadding",2);a([u({type:Boolean})],E.prototype,"shift",2);a([u({type:Object})],E.prototype,"shiftBoundary",2);a([u({attribute:"shift-padding",type:Number})],E.prototype,"shiftPadding",2);a([u({attribute:"auto-size"})],E.prototype,"autoSize",2);a([u()],E.prototype,"sync",2);a([u({type:Object})],E.prototype,"autoSizeBoundary",2);a([u({attribute:"auto-size-padding",type:Number})],E.prototype,"autoSizePadding",2);a([u({attribute:"hover-bridge",type:Boolean})],E.prototype,"hoverBridge",2);E=a([Y("wa-popup")],E);var ui=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};function hi(t,e){const n=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!n&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&pi(e)})}function pi(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const n=[...e.elements];if(n.length===1){e.requestSubmit(null);return}const o=n.find(r=>r.type==="submit"&&!r.matches(":disabled"));o&&(["input","button"].includes(o.localName)?e.requestSubmit(o):o.click())}var fi=`:host {
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
:host([appearance~='outlined']) .text-field {
  background-color: var(--wa-form-control-background-color);
  border-color: var(--wa-form-control-border-color);
}

:host([appearance~='filled']) .text-field {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-color: var(--wa-color-neutral-fill-quiet);
}

:host([appearance~='filled'][appearance~='outlined']) .text-field {
  border-color: var(--wa-form-control-border-color);
}

:host([pill]) .text-field {
  border-radius: var(--wa-border-radius-pill) !important;
}

.text-field input,
.text-field textarea {
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
`,w=class extends H{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new Ot(this,"hint","label"),this.localize=new kt(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.form=null,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,xn()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new ui),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){hi(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,n="none"){this.input.setSelectionRange(t,e,n)}setRangeText(t,e,n,o="preserve"){const r=e??this.input.selectionStart,i=n??this.input.selectionEnd;this.input.setRangeText(t,r,i,o),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=this.label?!0:!!t,o=this.hint?!0:!!e,r=this.withClear&&!this.disabled&&!this.readonly,i=this.hasUpdated&&r&&(typeof this.value=="number"||this.value&&this.value.length>0);return $`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${n?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="input" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="base"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${C(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${C(this.placeholder)}
          minlength=${C(this.minlength)}
          maxlength=${C(this.maxlength)}
          min=${C(this.min)}
          max=${C(this.max)}
          step=${C(this.step)}
          .value=${Ce(this.value||"")}
          autocapitalize=${C(this.autocapitalize)}
          autocomplete=${C(this.autocomplete)}
          autocorrect=${C(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${C(this.pattern)}
          enterkeyhint=${C(this.enterkeyhint)}
          inputmode=${C(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${i?$`
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
        ${this.passwordToggle&&!this.disabled?$`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?$`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:$`
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
        class=${yt({"has-slotted":o})}
        aria-hidden=${o?"false":"true"}
        >${this.hint}</slot
      >
    `}};w.css=[Ut,Tn,fi];w.shadowRootOptions={...H.shadowRootOptions,delegatesFocus:!0};a([N("input")],w.prototype,"input",2);a([u()],w.prototype,"title",2);a([u({reflect:!0})],w.prototype,"type",2);a([Ht()],w.prototype,"value",1);a([u({attribute:"value",reflect:!0})],w.prototype,"defaultValue",2);a([u({reflect:!0})],w.prototype,"size",2);a([u({reflect:!0})],w.prototype,"appearance",2);a([u({type:Boolean,reflect:!0})],w.prototype,"pill",2);a([u()],w.prototype,"label",2);a([u({attribute:"hint"})],w.prototype,"hint",2);a([u({attribute:"with-clear",type:Boolean})],w.prototype,"withClear",2);a([u()],w.prototype,"placeholder",2);a([u({type:Boolean,reflect:!0})],w.prototype,"readonly",2);a([u({attribute:"password-toggle",type:Boolean})],w.prototype,"passwordToggle",2);a([u({attribute:"password-visible",type:Boolean})],w.prototype,"passwordVisible",2);a([u({attribute:"without-spin-buttons",type:Boolean})],w.prototype,"withoutSpinButtons",2);a([u({reflect:!0})],w.prototype,"form",2);a([u({type:Boolean,reflect:!0})],w.prototype,"required",2);a([u()],w.prototype,"pattern",2);a([u({type:Number})],w.prototype,"minlength",2);a([u({type:Number})],w.prototype,"maxlength",2);a([u()],w.prototype,"min",2);a([u()],w.prototype,"max",2);a([u()],w.prototype,"step",2);a([u()],w.prototype,"autocapitalize",2);a([u()],w.prototype,"autocorrect",2);a([u()],w.prototype,"autocomplete",2);a([u({type:Boolean})],w.prototype,"autofocus",2);a([u()],w.prototype,"enterkeyhint",2);a([u({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],w.prototype,"spellcheck",2);a([u()],w.prototype,"inputmode",2);a([u({attribute:"with-label",type:Boolean})],w.prototype,"withLabel",2);a([u({attribute:"with-hint",type:Boolean})],w.prototype,"withHint",2);a([st("step",{waitUntilFirstUpdate:!0})],w.prototype,"handleStepChange",1);w=a([Y("wa-input")],w);ke("/static/vendor/webawesome");
