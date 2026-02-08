import{i as y,a as v}from"./assets/vendor-CK1Rzdhu.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();let n=null,a=null;const w=300;let f=0;const b=()=>{n=document.createElement("div"),n.className="loader",n.innerHTML='<div class="spinner"></div>',document.body.appendChild(n)},A=()=>{n||b(),n.classList.contains("is-visible")||(f=Date.now(),n.classList.add("is-visible")),a&&(clearTimeout(a),a=null)},M=()=>{const t=Date.now()-f,e=Math.max(0,w-t);a&&clearTimeout(a),a=setTimeout(()=>{n&&n.classList.remove("is-visible"),a=null},e)},E={position:"topRight",timeout:3e3,closeOnClick:!0,pauseOnHover:!0,progressBar:!0,animateInside:!1},u=(t,e,i,o={})=>{y[t]({title:e,message:i,...E,...o})},O={success:(t,e)=>u("success","Success",t,e),error:(t,e)=>u("error","Error",t,{timeout:5e3,...e}),info:(t,e)=>u("info","Info",t,e)},p=v.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:1e4});let l=0;const T=()=>{l+=1,A()},d=()=>{l=Math.max(0,l-1),l===0&&M()};p.interceptors.request.use(t=>(T(),t),t=>(d(),Promise.reject(t)));p.interceptors.response.use(t=>(d(),t),t=>{var o,s,r;d();const e=(o=t.response)==null?void 0:o.status,i=((r=(s=t.response)==null?void 0:s.data)==null?void 0:r.message)||(e?`Error: ${e}`:"Network error. Please check your connection.");return O.error(i),Promise.reject({message:i,status:e,original:t})});const I=t=>p.get("/artists",{params:t}).then(({data:e})=>e),N=async t=>(await I(t)).artists||[],$=document.querySelector(".artists__list"),g=async({limit:t,page:e})=>N({limit:t,page:e}),P=document.querySelector(".artists__button");let m=1,h={limit:8,page:m};P.addEventListener("click",()=>{m+=1,h={limit:8,page:m},_()});async function _(){const t=await g(h);j(t)}_();function S(t){const{_id:e,strArtist:i,strBiographyEN:o,strArtistThumb:s,genres:r}=t,c=Array.isArray(r)&&r.length?r.map(L=>`<li class="artists__genre">${L}</li>`).join(""):"";return`<li class="artists__item">
        <img class="artists__img" src="${s}" alt="${i}" />
        <div class="artists__info">
          <ul class="artists__genres">
            ${c}
          </ul>
          <h3 class="artists__name">${i}</h3>
          <p class="artists__desc">${o}</p>
        </div>
       <button class="artists__learn-more" data-id="${e}">
          Learn More <svg class="artists__learn-more-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 14L8 7L0 0V14Z" fill="white" />
</svg>
        </button>
      </li>
`}function B(t){return t.map(S).join("")}function j(t){const e=B(t);$.insertAdjacentHTML("beforeend",e)}document.addEventListener("DOMContentLoaded",()=>{g({limit:8,page:1})});
//# sourceMappingURL=index.js.map
