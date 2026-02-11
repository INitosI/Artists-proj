import{i as $,a as E,R as S,S as T,N as q,P as B}from"./assets/vendor-CEL2a_m2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const x=()=>{const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),r=document.querySelectorAll(".mobile-menu__nav-link");t.addEventListener("click",()=>{e.classList.add("is-open"),document.body.classList.add("no-scroll")}),a.addEventListener("click",s),r.forEach(i=>i.addEventListener("click",s));function s(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll")}},N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABYSURBVHgBnZBLDYAwEES3KEACEnAETqgTcIQEJCBh2AnHpu/Ql8xhsy/ZT0g6gtDPmZlJMHdmIcE8jaQWSysJ5s1s7hdX0adOwRQasQ8tiWfioy7Bq2sAHyW4yLy/Kip1AAAAAElFTkSuQmCC";let o=null,c=null;const I=300;let y=0;const C=()=>{o=document.createElement("div"),o.className="loader",o.innerHTML='<div class="spinner"></div>',document.body.appendChild(o)},O=()=>{o||C(),o.classList.contains("is-visible")||(y=Date.now(),o.classList.add("is-visible")),c&&(clearTimeout(c),c=null)},H=()=>{const e=Date.now()-y,t=Math.max(0,I-e);c&&clearTimeout(c),c=setTimeout(()=>{o&&o.classList.remove("is-visible"),c=null},t)},P={position:"topRight",timeout:3e3,closeOnClick:!0,pauseOnHover:!0,progressBar:!0,animateInside:!1},_=(e,t,a,r={})=>{$[e]({title:t,message:a,...P,...r})},R={success:(e,t)=>_("success","Success",e,t),error:(e,t)=>_("error","Error",e,{timeout:5e3,...t}),info:(e,t)=>_("info","Info",e,t)},l=E.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:1e4});let m=0;const F=()=>{m+=1,O()},g=()=>{m=Math.max(0,m-1),m===0&&H()};l.interceptors.request.use(e=>(F(),e),e=>(g(),Promise.reject(e)));l.interceptors.response.use(e=>(g(),e),e=>{var r,s,i;g();const t=(r=e.response)==null?void 0:r.status,a=((i=(s=e.response)==null?void 0:s.data)==null?void 0:i.message)||(t?`Error: ${t}`:"Network error. Please check your connection.");return R.error(a),Promise.reject({message:a,status:t,original:e})});const j=e=>l.get("/artists",{params:e}).then(({data:t})=>t),D=async e=>(await j(e)).artists||[],Q=async e=>(await l.get(`/artists/${e}`)).data||null,Y=async e=>{const{data:t}=await l.get(`/artists/${e}/albums`);return t.albumsList||t||[]},U=document.querySelector(".artists__list"),L=async({limit:e,page:t})=>D({limit:e,page:t}),w=document.querySelector(".artists__button");let h=1,v={limit:8,page:1};w.addEventListener("click",()=>{h+=1,v={limit:8,page:h},k()});async function k(){const e=await L(v);K(e),e.length<v.limit&&(w.style.display="none")}k();function V(e){const{_id:t,strArtist:a,strBiographyEN:r,strArtistThumb:s,genres:i}=e,d=Array.isArray(i)&&i.length?i.map(M=>`<li class="artists__genre">${M}</li>`).join(""):"";return`<li class="artists__item">
        <img class="artists__img" src="${s}" alt="${a}" />
        <div class="artists__info">
          <ul class="artists__genres">
            ${d}
          </ul>
          <h3 class="artists__name">${a}</h3>
          <p class="artists__desc">${r}</p>
        </div>
       <button class="artists__learn-more" data-id="${t}">
          Learn More <img class="artists__learn-more-icon" src="${N}" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`}function W(e){return e.map(V).join("")}function K(e){const t=W(e);U.insertAdjacentHTML("beforeend",t)}const X=async e=>await l.get("/feedbacks",{params:e}).then(({data:t})=>t),z=async e=>(await X(e)).data||[],G="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23764191'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",J="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23fff'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",Z=(e=document)=>{e.querySelectorAll(".feedback__rating").forEach(a=>{const r=Number(a.dataset.rating)||0;a.innerHTML="",new S(a,{readOnly:!0,score:r,number:5,starType:"img",path:"",starOn:G,starOff:J}).init()})},n={section:document.querySelector(".feedback"),wrapper:document.querySelector(".feedback__wrapper"),dotFirst:document.querySelector(".feedback__dot--first"),dotMiddle:document.querySelector(".feedback__dot--middle"),dotLast:document.querySelector(".feedback__dot--last")},A=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),ee=()=>{[n.dotFirst,n.dotMiddle,n.dotLast].forEach(e=>{e&&e.classList.remove("is-active")})},u=e=>{ee(),e==="first"&&n.dotFirst&&n.dotFirst.classList.add("is-active"),e==="middle"&&n.dotMiddle&&n.dotMiddle.classList.add("is-active"),e==="last"&&n.dotLast&&n.dotLast.classList.add("is-active")},p=(e,t)=>{if(t<=1){u("first");return}if(e===0){u("first");return}if(e===t-1){u("last");return}u("middle")},te=e=>{const t=A((e==null?void 0:e.name)??"Anonymous"),a=A((e==null?void 0:e.descr)??""),r=Number(e==null?void 0:e.rating),s=isNaN(r)?0:Math.round(r);return`
    <li class="feedback__slide swiper-slide" role="listitem">
      <div 
        class="feedback__rating"
        data-rating="${s}"
        aria-label="Rating ${s} out of 5">
      </div>
      <blockquote class="feedback__quote">"${a}"</blockquote>
      <p class="feedback__author">${t}</p>
    </li>
  `},se=e=>{n.wrapper&&(n.wrapper.innerHTML=e.map(te).join(""))};let f=null;const b=e=>{f&&f.destroy(!0,!0),f=new T(".feedback__slider",{modules:[q,B],slidesPerView:1,spaceBetween:24,loop:!1,navigation:{nextEl:".feedback__nav--next",prevEl:".feedback__nav--prev"},on:{init(t){p(t.activeIndex,e)},slideChange(t){p(t.activeIndex,e)}}})},ae=async()=>{if(!(!n.section||!n.wrapper))try{const e=await z({limit:10,page:1});if(!e.length){n.wrapper.innerHTML=`
        <li class="feedback__slide swiper-slide">
          <blockquote class="feedback__quote">"No feedbacks yet."</blockquote>
          <p class="feedback__author">—</p>
        </li>
      `,b(1),p(0,1);return}const t=e.slice(0,10);se(t),b(t.length),Z(n.wrapper),p(0,t.length)}catch{}},ie=()=>{const e=document.getElementById("modal-root");document.addEventListener("click",async t=>{const a=t.target.closest("[data-id]");if(!a)return;const r=a.dataset.id;e.innerHTML=`
      <div class="modal__content">
        <div class="modal__loader"></div>
      </div>
    `,e.style.display="flex",document.body.classList.add("more-open");try{const[s,i]=await Promise.all([Q(r),Y(r)]);if(!s){e.style.display="none";return}re(s,i,e)}catch{e.style.display="none"}}),e.addEventListener("click",t=>{(t.target===e||t.target.classList.contains("modal__close-btn"))&&ne(e)})},re=(e,t,a)=>{a.innerHTML=`
    <div class="modal__content" role="dialog" aria-modal="true">

      <div class="modal__header">
        <button class="modal__close-btn" aria-label="Close modal">&times;</button>
        <h2 class="modal__title">${e.strArtist}</h2>
      </div>

      <div class="modal__body">
        <div class="modal__artist-info">
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
    
              <div class="modal__description-bio">
                <h3 class="modal__description-bio-title">Biography</h3>
    
                <div class="modal__description-bio-scroll">
                  <p class="modal__description-bio-text">${e.strBiographyEN}</p>
                </div>
              </div>
    
              <ul class="modal__description-genres-list">
                ${e.genres.map(r=>`<li class="modal__description-genres-item">${r}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
        ${oe(t)}
      </div>
    </div>
  `,a.style.display="grid"},ne=e=>{e.innerHTML="",e.style.display="none",document.body.classList.remove("more-open")},oe=e=>!e||!e.length?"":`
    <div class="modal__albums">
      <h3 class="modal__albums-title">Albums</h3>
      <div class="modal__albums-list">
        ${e.map(ce).join("")}
      </div>
    </div>
  `,ce=e=>{const t=e.tracks||[];return`
    <div class="modal__album-card">
      <div class="album-card__header">
        <h4 class="album-card__title">${e.strAlbum}</h4>
        <span class="album-card__year">${e.intYearReleased||"N/A"}</span>
      </div>
      <div class="album-card__tracks">
        ${t.map(a=>`
          <div class="album-card__track">
            <span class="album-card__track-name">${a.strTrack}</span>
            <span class="album-card__track-time">${le(a.intDuration)}</span>
            ${a.movie?`<a class="album-card__link" href="${a.movie}" target="_blank" rel="noopener noreferrer">
                   <svg width="20" height="20">
                     <use href="/img/icons.svg#icon-Youtube"></use>
                   </svg>
                 </a>`:'<span class="album-card__link-placeholder"></span>'}
          </div>
        `).join("")}
      </div>
    </div>
  `},le=e=>{if(!e)return"0:00";const t=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3);return`${t}:${a.toString().padStart(2,"0")}`};document.addEventListener("DOMContentLoaded",()=>{x(),L({limit:8,page:1}),ae(),ie()});
//# sourceMappingURL=index.js.map
