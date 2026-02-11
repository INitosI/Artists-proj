import{i as E,a as S,R as q,S as x,N as T,P as B}from"./assets/vendor-CEL2a_m2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const I=()=>{const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),s=document.querySelector("[data-menu-close]"),i=document.querySelectorAll(".mobile-menu__nav-link");t.addEventListener("click",()=>{e.classList.add("is-open"),document.body.classList.add("no-scroll")}),s.addEventListener("click",a),i.forEach(n=>n.addEventListener("click",a));function a(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll")}},N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABYSURBVHgBnZBLDYAwEES3KEACEnAETqgTcIQEJCBh2AnHpu/Ql8xhsy/ZT0g6gtDPmZlJMHdmIcE8jaQWSysJ5s1s7hdX0adOwRQasQ8tiWfioy7Bq2sAHyW4yLy/Kip1AAAAAElFTkSuQmCC";let o=null,c=null;const C=300;let L=0;const O=()=>{o=document.createElement("div"),o.className="loader",o.innerHTML='<div class="spinner"></div>',document.body.appendChild(o)},H=()=>{o||O(),o.classList.contains("is-visible")||(L=Date.now(),o.classList.add("is-visible")),c&&(clearTimeout(c),c=null)},P=()=>{const e=Date.now()-L,t=Math.max(0,C-e);c&&clearTimeout(c),c=setTimeout(()=>{o&&o.classList.remove("is-visible"),c=null},t)},R={position:"topRight",timeout:3e3,closeOnClick:!0,pauseOnHover:!0,progressBar:!0,animateInside:!1},p=(e,t,s,i={})=>{E[e]({title:t,message:s,...R,...i})},F={success:(e,t)=>p("success","Success",e,t),error:(e,t)=>p("error","Error",e,{timeout:5e3,...t}),info:(e,t)=>p("info","Info",e,t)},l=S.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:1e4});let m=0;const j=()=>{m+=1,H()},g=()=>{m=Math.max(0,m-1),m===0&&P()};l.interceptors.request.use(e=>(j(),e),e=>(g(),Promise.reject(e)));l.interceptors.response.use(e=>(g(),e),e=>{var i,a,n;g();const t=(i=e.response)==null?void 0:i.status,s=((n=(a=e.response)==null?void 0:a.data)==null?void 0:n.message)||(t?`Error: ${t}`:"Network error. Please check your connection.");return F.error(s),Promise.reject({message:s,status:t,original:e})});const D=e=>l.get("/artists",{params:e}).then(({data:t})=>t),Q=async e=>(await D(e)).artists||[],Y=async e=>(await l.get(`/artists/${e}`)).data||null,X=async e=>{const{data:t}=await l.get(`/artists/${e}/albums`);return t.albumsList||t||[]},U=document.querySelector(".artists__list"),w=async({limit:e,page:t})=>Q({limit:e,page:t}),k=document.querySelector(".artists__button");let h=1,v={limit:8,page:1};k.addEventListener("click",()=>{h+=1,v={limit:8,page:h},M()});async function M(){const e=await w(v);K(e),e.length<v.limit&&(k.style.display="none")}M();function V(e){const{_id:t,strArtist:s,strBiographyEN:i,strArtistThumb:a,genres:n}=e,d=Array.isArray(n)&&n.length?n.map($=>`<li class="artists__genre">${$}</li>`).join(""):"";return`<li class="artists__item">
        <img class="artists__img" src="${a}" alt="${s}" />
        <div class="artists__info">
          <ul class="artists__genres">
            ${d}
          </ul>
          <h3 class="artists__name">${s}</h3>
          <p class="artists__desc">${i}</p>
        </div>
       <button class="artists__learn-more" data-id="${t}">
          Learn More <img class="artists__learn-more-icon" src="${N}" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`}function W(e){return e.map(V).join("")}function K(e){const t=W(e);U.insertAdjacentHTML("beforeend",t)}const z=async e=>await l.get("/feedbacks",{params:e}).then(({data:t})=>t),G=async e=>(await z(e)).data||[],J="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23764191'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",Z="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='19'%20fill='none'%20viewBox='0%200%2020%2019'%3e%3cpath%20fill='%23fff'%20d='M9.07.612c.345-.816%201.515-.816%201.86%200l2.028%204.82c.145.343.473.579.849.608l5.266.417c.892.071%201.254%201.171.574%201.746L15.635%2011.6a.99.99%200%200%200-.324.985l1.225%205.077c.208.86-.74%201.54-1.503%201.08l-4.508-2.721a1.02%201.02%200%200%200-1.05%200l-4.508%202.72c-.764.461-1.711-.219-1.503-1.079l1.225-5.077a.99.99%200%200%200-.324-.985L.353%208.203c-.68-.575-.318-1.675.574-1.746l5.266-.417c.377-.03.704-.265.85-.609z'/%3e%3c/svg%3e",ee=(e=document)=>{e.querySelectorAll(".feedback__rating").forEach(s=>{const i=Number(s.dataset.rating)||0;s.innerHTML="",new q(s,{readOnly:!0,score:i,number:5,starType:"img",path:"",starOn:J,starOff:Z}).init()})},r={section:document.querySelector(".feedback"),wrapper:document.querySelector(".feedback__wrapper"),pagination:document.querySelector(".feedback__pagination"),dotFirst:document.querySelector(".feedback__dot--first"),dotMiddle:document.querySelector(".feedback__dot--middle"),dotLast:document.querySelector(".feedback__dot--last")},A=e=>String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),te=()=>{[r.dotFirst,r.dotMiddle,r.dotLast].forEach(e=>{e&&e.classList.remove("is-active")})},u=e=>{te(),e==="first"&&r.dotFirst&&r.dotFirst.classList.add("is-active"),e==="middle"&&r.dotMiddle&&r.dotMiddle.classList.add("is-active"),e==="last"&&r.dotLast&&r.dotLast.classList.add("is-active")},b=e=>{if(!r.dotMiddle)return;r.dotMiddle.__anim&&(r.dotMiddle.__anim.cancel(),r.dotMiddle.__anim=null);const t=e==="left"?-10:10;r.dotMiddle.__anim=r.dotMiddle.animate([{transform:"translateX(0)"},{transform:`translateX(${t}px)`},{transform:"translateX(0)"}],{duration:220,easing:"ease-in-out"}),r.dotMiddle.__anim.onfinish=()=>{r.dotMiddle.__anim=null}},_=(e,t)=>{if(t<=1){u("first");return}if(e===0){u("first");return}if(e===t-1){u("last");return}u("middle")},se=e=>{const t=A((e==null?void 0:e.name)??"Anonymous"),s=A((e==null?void 0:e.descr)??""),i=Number(e==null?void 0:e.rating),a=isNaN(i)?0:Math.round(i);return`
    <li class="feedback__slide swiper-slide" role="listitem">
      <div 
        class="feedback__rating"
        data-rating="${a}"
        aria-label="Rating ${a} out of 5">
      </div>
      <blockquote class="feedback__quote">"${s}"</blockquote>
      <p class="feedback__author">${t}</p>
    </li>
  `},ae=e=>{r.wrapper&&(r.wrapper.innerHTML=e.map(se).join(""))};let f=null;const y=e=>{f&&f.destroy(!0,!0),f=new x(".feedback__slider",{modules:[T,B],slidesPerView:1,spaceBetween:24,loop:!1,navigation:{nextEl:".feedback__nav--next",prevEl:".feedback__nav--prev"},on:{init(t){_(t.activeIndex,e),t.__prevIndex=t.activeIndex},slideChange(t){const s=t.__prevIndex??0,i=t.activeIndex;i>s?b("right"):i<s&&b("left"),_(i,e),t.__prevIndex=i}}})},ie=async()=>{if(!(!r.section||!r.wrapper))try{const e=await G({limit:10,page:1});if(!e.length){r.wrapper.innerHTML=`
        <li class="feedback__slide swiper-slide">
          <blockquote class="feedback__quote">"No feedbacks yet."</blockquote>
          <p class="feedback__author">—</p>
        </li>
      `,y(1),_(0,1);return}const t=e.slice(0,10);ae(t),y(t.length),ee(r.wrapper),_(0,t.length)}catch{}},re=()=>{const e=document.getElementById("modal-root");document.addEventListener("click",async t=>{const s=t.target.closest("[data-id]");if(!s)return;const i=s.dataset.id;e.innerHTML=`
      <div class="modal__content">
        <div class="modal__loader"></div>
      </div>
    `,e.style.display="flex",document.body.classList.add("more-open");try{const[a,n]=await Promise.all([Y(i),X(i)]);if(!a){e.style.display="none";return}ne(a,n,e)}catch{e.style.display="none"}}),e.addEventListener("click",t=>{(t.target===e||t.target.classList.contains("modal__close-btn"))&&oe(e)})},ne=(e,t,s)=>{s.innerHTML=`
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
    
             <div class="modal__description-item-column">
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
        </div>
        ${ce(t)}
      </div>
    </div>
  `,s.style.display="grid"},oe=e=>{e.innerHTML="",e.style.display="none",document.body.classList.remove("more-open")},ce=e=>!e||!e.length?"":`
    <div class="modal__albums">
      <h3 class="modal__albums-title">Albums</h3>
      <div class="modal__albums-list">
        ${e.map(le).join("")}
      </div>
    </div>
  `,le=e=>{const t=e.tracks||[];return`
    <div class="modal__album-card">
      <div class="album-card__header">
        <h4 class="album-card__title">${e.strAlbum}</h4>
        <span class="album-card__year">${e.intYearReleased||"N/A"}</span>
      </div>
      <div class="album-card__tracks">
        ${t.map(s=>`
          <div class="album-card__track">
            <span class="album-card__track-name">${s.strTrack}</span>
            <span class="album-card__track-time">${de(s.intDuration)}</span>
            ${s.movie?`<a class="album-card__link" href="${s.movie}" target="_blank" rel="noopener noreferrer">
                   <svg width="20" height="20">
                     <use href="/img/icons.svg#icon-Youtube"></use>
                   </svg>
                 </a>`:'<span class="album-card__link-placeholder"></span>'}
          </div>
        `).join("")}
      </div>
    </div>
  `},de=e=>{if(!e)return"0:00";const t=Math.floor(e/6e4),s=Math.floor(e%6e4/1e3);return`${t}:${s.toString().padStart(2,"0")}`};document.addEventListener("DOMContentLoaded",()=>{I(),w({limit:8,page:1}),ie(),re()});
//# sourceMappingURL=index.js.map
