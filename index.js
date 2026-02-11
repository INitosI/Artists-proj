import{i as M,a as S,R as q,S as T,N as $,P as B}from"./assets/vendor-CEL2a_m2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=i(s);fetch(s.href,a)}})();const x=()=>{const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),i=document.querySelector("[data-menu-close]"),r=document.querySelectorAll(".mobile-menu__nav-link");t.addEventListener("click",()=>{e.classList.add("is-open"),document.body.classList.add("no-scroll")}),i.addEventListener("click",s),r.forEach(a=>a.addEventListener("click",s));function s(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll")}},I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABYSURBVHgBnZBLDYAwEES3KEACEnAETqgTcIQEJCBh2AnHpu/Ql8xhsy/ZT0g6gtDPmZlJMHdmIcE8jaQWSysJ5s1s7hdX0adOwRQasQ8tiWfioy7Bq2sAHyW4yLy/Kip1AAAAAElFTkSuQmCC";let n=null,c=null;const N=300;let b=0;const O=()=>{n=document.createElement("div"),n.className="loader",n.innerHTML='<div class="spinner"></div>',document.body.appendChild(n)},C=()=>{n||O(),n.classList.contains("is-visible")||(b=Date.now(),n.classList.add("is-visible")),c&&(clearTimeout(c),c=null)},H=()=>{const e=Date.now()-b,t=Math.max(0,N-e);c&&clearTimeout(c),c=setTimeout(()=>{n&&n.classList.remove("is-visible"),c=null},t)},F={position:"topRight",timeout:3e3,closeOnClick:!0,pauseOnHover:!0,progressBar:!0,animateInside:!1},_=(e,t,i,r={})=>{M[e]({title:t,message:i,...F,...r})},P={success:(e,t)=>_("success","Success",e,t),error:(e,t)=>_("error","Error",e,{timeout:5e3,...t}),info:(e,t)=>_("info","Info",e,t)},d=S.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:1e4});let m=0;const R=()=>{m+=1,C()},g=()=>{m=Math.max(0,m-1),m===0&&H()};d.interceptors.request.use(e=>(R(),e),e=>(g(),Promise.reject(e)));d.interceptors.response.use(e=>(g(),e),e=>{var r,s,a;g();const t=(r=e.response)==null?void 0:r.status,i=((a=(s=e.response)==null?void 0:s.data)==null?void 0:a.message)||(t?`Error: ${t}`:"Network error. Please check your connection.");return P.error(i),Promise.reject({message:i,status:t,original:e})});const j=e=>d.get("/artists",{params:e}).then(({data:t})=>t),Q=async e=>(await j(e)).artists||[],D=async e=>(await d.get(`/artists/${e}`)).data||null,U=document.querySelector(".artists__list"),L=async({limit:e,page:t})=>Q({limit:e,page:t}),w=document.querySelector(".artists__button");let v=1,A={limit:8,page:1};w.addEventListener("click",()=>{v+=1,A={limit:8,page:v},k()});async function k(){const e=await L(A);W(e),e.length<A.limit&&(w.style.display="none")}k();function Y(e){const{_id:t,strArtist:i,strBiographyEN:r,strArtistThumb:s,genres:a}=e,l=Array.isArray(a)&&a.length?a.map(E=>`<li class="artists__genre">${E}</li>`).join(""):"";return`<li class="artists__item">
        <img class="artists__img" src="${s}" alt="${i}" />
        <div class="artists__info">
          <ul class="artists__genres">
            ${l}
          </ul>
          <h3 class="artists__name">${i}</h3>
          <p class="artists__desc">${r}</p>
        </div>
       <button class="artists__learn-more" data-id="${t}">
          Learn More <img class="artists__learn-more-icon" src="${I}" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`}function V(e){return e.map(Y).join("")}function W(e){const t=V(e);U.insertAdjacentHTML("beforeend",t)}const K=async e=>await d.get("/feedbacks",{params:e}).then(({data:t})=>t),X=async e=>(await K(e)).data||[],z="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23764191'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",G="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23fff'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",J=(e=document)=>{e.querySelectorAll(".feedback__rating").forEach(i=>{const r=Number(i.dataset.rating)||0;i.innerHTML="",new q(i,{readOnly:!0,score:r,number:5,starType:"img",path:"",starOn:z,starOff:G}).init()})},o={section:document.querySelector(".feedback"),wrapper:document.querySelector(".feedback__wrapper"),dotFirst:document.querySelector(".feedback__dot--first"),dotMiddle:document.querySelector(".feedback__dot--middle"),dotLast:document.querySelector(".feedback__dot--last")},h=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),Z=()=>{[o.dotFirst,o.dotMiddle,o.dotLast].forEach(e=>{e&&e.classList.remove("is-active")})},u=e=>{Z(),e==="first"&&o.dotFirst&&o.dotFirst.classList.add("is-active"),e==="middle"&&o.dotMiddle&&o.dotMiddle.classList.add("is-active"),e==="last"&&o.dotLast&&o.dotLast.classList.add("is-active")},p=(e,t)=>{if(t<=1){u("first");return}if(e===0){u("first");return}if(e===t-1){u("last");return}u("middle")},ee=e=>{const t=h((e==null?void 0:e.name)??"Anonymous"),i=h((e==null?void 0:e.descr)??""),r=Number(e==null?void 0:e.rating),s=isNaN(r)?0:Math.round(r);return`
    <li class="feedback__slide swiper-slide" role="listitem">
      <div 
        class="feedback__rating"
        data-rating="${s}"
        aria-label="Rating ${s} out of 5">
      </div>
      <blockquote class="feedback__quote">"${i}"</blockquote>
      <p class="feedback__author">${t}</p>
    </li>
  `},te=e=>{o.wrapper&&(o.wrapper.innerHTML=e.map(ee).join(""))};let f=null;const y=e=>{f&&f.destroy(!0,!0),f=new T(".feedback__slider",{modules:[$,B],slidesPerView:1,spaceBetween:24,loop:!1,navigation:{nextEl:".feedback__nav--next",prevEl:".feedback__nav--prev"},on:{init(t){p(t.activeIndex,e)},slideChange(t){p(t.activeIndex,e)}}})},se=async()=>{if(!(!o.section||!o.wrapper))try{const e=await X({limit:10,page:1});if(!e.length){o.wrapper.innerHTML=`
        <li class="feedback__slide swiper-slide">
          <blockquote class="feedback__quote">"No feedbacks yet."</blockquote>
          <p class="feedback__author">—</p>
        </li>
      `,y(1),p(0,1);return}const t=e.slice(0,10);te(t),y(t.length),J(o.wrapper),p(0,t.length)}catch{}},ie=()=>{const e=document.getElementById("modal-root");document.addEventListener("click",async t=>{const i=t.target.closest("[data-id]");if(!i)return;const r=i.dataset.id;e.innerHTML=`
      <div class="modal__content">
        <div class="modal__loader"></div>
      </div>
    `,e.style.display="flex",document.body.classList.add("more-open");try{const s=await D(r);if(!s){e.style.display="none";return}ae(s,e)}catch{e.style.display="none"}}),e.addEventListener("click",t=>{(t.target===e||t.target.classList.contains("modal__close-btn"))&&re(e)})},ae=(e,t)=>{t.innerHTML=`
    <div class="modal__content" role="dialog" aria-modal="true">

      <div class="modal__header">
        <button class="modal__close-btn" aria-label="Close modal">&times;</button>
        <h2 class="modal__title">${e.strArtist}</h2>
      </div>

      <div class="modal__body">
        <div class="modal__image-artist">
          <img class="modal__image-artist-img" src="${e.strArtistThumb}" alt="${e.strArtistThumb}">
        </div>

        <div class="modal__description">
          <div class="modal__description-grid">
            <div class="modal__description-item" id="left-item">
              <h3 class="modal__description-title">Years active</h3>
              <p class="modal__description-value">${e.yearsActive}</p>

              <h3 class="modal__description-title marg" id="members-title">Members</h3>
              <p class="modal__description-value" id="members-value">${e.intMembers}</p>
            </div>

            <div class="modal__description-item" id="right-item">
              <h3 class="modal__description-title" id="sex-title">Sex</h3>
              <p class="modal__description-value" id="sex-value">${e.strGender}</p>

              <h3 class="modal__description-title marg">Country</h3>
              <p class="modal__description-value">${e.strCountry}</p>
            </div>
          </div>

          <div class="modal__description-bio">
            <h3 class="modal__description-bio-title">Biography</h3>
            <div class="modal__description-bio-scroll">
              <p class="modal__description-bio-text">${e.strBiographyEN}</p>
            </div>
          </div>

          <ul class="modal__description-genres-list">
            ${e.genres.map(i=>`<li class="modal__description-genres-item">${i}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `,t.style.display="flex"},re=e=>{e.innerHTML="",e.style.display="none",document.body.classList.remove("more-open")};document.addEventListener("DOMContentLoaded",()=>{x(),L({limit:8,page:1}),se(),ie()});
//# sourceMappingURL=index.js.map
