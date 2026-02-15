import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { fetchFeedbacks } from '../api/feedback-api';
import { initFeedbackStars } from '../utils/feedback-stars';
import { openFeedbackModal } from '../utils/feedback-modal';

/**
 * Feedback section
 * ВІДПОВІДАЛЬНІСТЬ ФАЙЛУ:
 * - отримання даних відгуків з API
 * - рендеринг відгуків у вигляді слайдів у Swiper
 * - ініціалізація пагінації та навігації для слайдера
 * - обробка кліку на кнопку "Leave feedback" для відкриття модального вікна з формою відгуку
 */

//  посилання на елементи DOM для подальшого використання в функціях
const refs = {
  section: document.querySelector('.feedback'),
  wrapper: document.querySelector('.feedback__wrapper'),
  pagination: document.querySelector('.feedback__pagination'), 
  dotFirst: document.querySelector('.feedback__dot--first'),
  dotMiddle: document.querySelector('.feedback__dot--middle'),
  dotLast: document.querySelector('.feedback__dot--last'),
  leaveBtn: document.querySelector('.feedback__leave-btn'),
};

//  функція для безпечного виводу тексту в HTML
const escapeHtml = value => {
  const str = String(value ?? '');
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

/* ---------- Pagination (індикатор 3 елементи) ----------------------*/

// фунція скидання активного класу з усіх трьох точок
const clearActiveDots = () => {
  [refs.dotFirst, refs.dotMiddle, refs.dotLast].forEach(dot => {
    if (dot) dot.classList.remove('is-active');
  });
};

// функція для встановлення активного класу на потрібну точку
const setActiveDot = type => {
  clearActiveDots();

  if (type === 'first' && refs.dotFirst)
    refs.dotFirst.classList.add('is-active');
  if (type === 'middle' && refs.dotMiddle)
    refs.dotMiddle.classList.add('is-active');
  if (type === 'last' && refs.dotLast) refs.dotLast.classList.add('is-active');
};

// функція для анімації середньої точки при переході між слайдами
const animateMiddleDot = direction => {
  if (!refs.dotMiddle) return;

  // якщо анімація вже є, скасовуємо її, щоб не було конфліктів при швидкій навігації
  if (refs.dotMiddle.__anim) {
    refs.dotMiddle.__anim.cancel();
    refs.dotMiddle.__anim = null;
  }

  const offset = direction === 'left' ? -10 : 10;

  // створюємо анімацію для середньої точки, яка зміщує її вліво або вправо на 10px і повертає назад
  refs.dotMiddle.__anim = refs.dotMiddle.animate(
    [
      { transform: 'translateX(0)' },
      { transform: `translateX(${offset}px)` },
      { transform: 'translateX(0)' },
    ],
    {
      duration: 220,
      easing: 'ease-in-out',
    }
  );

  refs.dotMiddle.__anim.onfinish = () => {
    refs.dotMiddle.__anim = null;
  };
};

// функція для оновлення пагінації на основі поточного індексу слайда і загальної кількості слайдів
export const updateFeedbackPagination = (activeIndex, totalSlides) => {
  //якщо є лише один слайд, то активуємо першу точку і виходимо
  if (totalSlides <= 1) {
    setActiveDot('first');
    return;
  }

  //якщо корисиувач на  першому слайді, то активуємо першу точку
  if (activeIndex === 0) {
    setActiveDot('first');
    return;
  }

  //якщо користувач на останньому слайді, то активуємо останню точку
  if (activeIndex === totalSlides - 1) {
    setActiveDot('last');
    return;
  }

  //у всіх інших випадках активуємо середню точку
  setActiveDot('middle');
};

/* ---------- Markup ------------------------------------*/

// функція для створення HTML-розмітки одного слайду на основі даних відгуку
const buildSlideMarkup = item => {
  const name = escapeHtml(item?.name ?? 'Anonymous'); //обробка на безпечний вивід + перевірка на наявність і якщо його немає, призначення дефолтного значення
  const text = escapeHtml(item?.descr ?? '');

  // округлення рейтингу до найближчого цілого числа, якщо це можливо, і призначення 0, якщо рейтинг не є числом
  const ratingRaw = Number(item?.rating);
  const ratingRounded = isNaN(ratingRaw) ? 0 : Math.round(ratingRaw);

  // Пояснення структури розмітки:
  // - .feedback__slide — це обгортка для одного відгуку, яка буде слайдом у Swiper.
  // - .feedback__rating — це контейнер для зірочок рейтингу, який буде ініціалізований через raty-js.
  return `
    <li class="feedback__slide swiper-slide" role="listitem">
      <div 
        class="feedback__rating"
        data-rating="${ratingRounded}"
        aria-label="Rating ${ratingRounded} out of 5">
      </div>
      <blockquote class="feedback__quote">"${text}"</blockquote>
      <p class="feedback__author">${name}</p>
    </li>
  `;
};

// функція для рендерингу масиву відгуків у вигляді слайдів у Swiper
const renderSlides = items => {
  if (!refs.wrapper) return;
  refs.wrapper.innerHTML = items.map(buildSlideMarkup).join('');
};

/* ------------ Swiper ---------------------- */

let swiperInstance = null;

// функція для ініціалізації Swiper з потрібними налаштуваннями та обробниками подій
const initSwiper = slidesCount => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }
    swiperInstance = new Swiper('.feedback__slider', {
    
    modules: [Navigation],
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
        swiper.__prevIndex = swiper.activeIndex; // запам'ятовуємо стартовий індекс
      },
      slideChange(swiper) {
        const prev = swiper.__prevIndex ?? 0;
        const current = swiper.activeIndex;

        if (current > prev) {
          animateMiddleDot('right');
        } else if (current < prev) {
          animateMiddleDot('left');
        }

        updateFeedbackPagination(current, slidesCount);
        swiper.__prevIndex = current;
      },
    },
  });
};

/* ---------- Init ----------*/

// головна функція для ініціалізації секції відгуків
export const initFeedback = async () => {
  if (!refs.section || !refs.wrapper) return;

  if (refs.leaveBtn) {
  refs.leaveBtn.addEventListener('click', openFeedbackModal);
  }

  try {
    // отримуємо відгуки з API
    const feedbacks = await fetchFeedbacks({ limit: 10, page: 1 });

    // якщо відгуків немає, показуємо повідомлення і встановлюємо пагінацію на 0 з 1
    if (!feedbacks.length) {
      refs.wrapper.innerHTML = `
        <li class="feedback__slide swiper-slide">
          <blockquote class="feedback__quote">"No feedbacks yet."</blockquote>
          <p class="feedback__author">—</p>
        </li>
      `;
      initSwiper(1);
      updateFeedbackPagination(0, 1);
      return;
    }

    // рендеримо максимум 10 відгуків (на випадок, якщо API поверне більше)
    const limited = feedbacks.slice(0, 10);
    renderSlides(limited);

    // ініціалізуємо Swiper після рендеру слайдів, передаючи кількість відгуків для коректної роботи пагінації
    initSwiper(limited.length);

    // ініціалізуємо зірочки рейтингу для відображення після рендеру
    initFeedbackStars(refs.wrapper);

    // по дефолту активуємо першу точку пагінації
    updateFeedbackPagination(0, limited.length);
  } catch (error) {
    // помилки показуються через axios-instance (toast)
  }
};

