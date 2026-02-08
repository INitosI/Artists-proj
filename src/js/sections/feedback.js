import { Navigation, Pagination } from 'swiper/modules';

/* ---------- Swiper ---------------------- */

let swiperInstance = null;

const initSwiper = slidesCount => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }
  
    swiperInstance = new Swiper('.feedback__slider', {
    
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,

    navigation: {
      nextEl: '.feedback__nav--next',
      prevEl: '.feedback__nav--prev',
    },

    on: {
      init(swiper) {
        updateFeedbackPagination(swiper.activeIndex, slidesCount);
      },
      slideChange(swiper) {
        updateFeedbackPagination(swiper.activeIndex, slidesCount);
      },
    },
  });
};
