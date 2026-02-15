import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Raty from 'raty-js';
import starOn from '../../assets/raty/star-on.svg?url';
import starOff from '../../assets/raty/star-off.svg?url';
import { createFeedback } from '../api/feedback-api';

// базові налаштування для модального вікна та форми відгуку
const refs = {
  modalRoot: document.getElementById('modal-root'),
};

// дефолтне значення рейтингу для нових відгуків
const DEFAULT_RATING = 0; 

// правила валідації для полів форми
const VALIDATION = {
  name: { min: 2, max: 30 },
  descr: { min: 10, max: 300 },
  rating: { min: 1, max: 5 },
};

let escHandler = null;

// функція для створення HTML-розмітки модального вікна з формою відгуку
const buildModalMarkup = () => `
  <div class="modal__content modal__content--feedback" role="dialog" aria-modal="true">
    <button class="feedback-modal__close-btn" type="button" aria-label="Close modal">&times;</button>

    <h2 class="feedback-modal__title">Submit feedback</h2>

    <form class="feedback-modal__form" autocomplete="off" novalidate>
      <label class="feedback-modal__label">
        <span class="feedback-modal__label-text">Name</span>
        <input class="feedback-modal__input" type="text" name="name" placeholder="Name" required />
      </label>

      <label class="feedback-modal__label">
        <span class="feedback-modal__label-text">Message</span>
        <textarea class="feedback-modal__textarea" name="descr" placeholder="Type your message..." required></textarea>
      </label>

      <div class="feedback-modal__rating">
        <div class="feedback-modal__stars" aria-label="Rating stars"></div>
        <input type="hidden" name="rating" value="${DEFAULT_RATING}" />
      </div>

      <button class="feedback-modal__submit" type="submit">Submit</button>
    </form>
  </div>
`;

// функція для відкриття модального вікна з формою відгуку
const openModal = () => {
  if (!refs.modalRoot) return;

  refs.modalRoot.classList.add('modal--feedback');

  refs.modalRoot.innerHTML = buildModalMarkup();

 // показуємо модалку
  refs.modalRoot.style.display = 'flex';

  document.body.classList.add('more-open');

  initInteractiveStars(refs.modalRoot);

  const closeBtn = refs.modalRoot.querySelector('.feedback-modal__close-btn');
  const form = refs.modalRoot.querySelector('.feedback-modal__form');

  if (!closeBtn || !form) {
    closeModal();
    return;
  }

  closeBtn.addEventListener('click', closeModal);

  // обробник для закриття модалки по кліку на бекдроп
  refs.modalRoot.addEventListener('click', e => {
    if (e.target === refs.modalRoot) closeModal();
  });

  // обробник для закриття модалки по клавіші Escape
  escHandler = e => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);

  form.addEventListener('submit', onSubmit);
};

// функція для закриття модального вікна та очищення ресурсів
const closeModal = () => {
  if (!refs.modalRoot) return;

  refs.modalRoot.innerHTML = '';
  refs.modalRoot.style.display = 'none';

  refs.modalRoot.classList.remove('modal--feedback');
  document.body.classList.remove('more-open');

  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
};

// функція для ініціалізації інтерактивного рейтингу зірок у формі відгуку
const initInteractiveStars = root => {
  const starsBox = root.querySelector('.feedback-modal__stars');
  const ratingInput = root.querySelector('input[name="rating"]');

  if (!starsBox || !ratingInput) return;

  starsBox.innerHTML = '';
  
  const instance = new Raty(starsBox, {
    readOnly: false,
    score: DEFAULT_RATING,
    number: 5,
    starType: 'img',
    path: '',
    starOn,
    starOff,
    click: score => {
      ratingInput.value = String(score);
    },
  });

  instance.init();
};

// функція для валідації даних форми відгуку
const validate = ({ name, descr, rating }) => {
  const trimmedName = String(name ?? '').trim();
  const trimmedDescr = String(descr ?? '').trim();
  const ratingNum = Number(rating);

  if (
    trimmedName.length < VALIDATION.name.min ||
    trimmedName.length > VALIDATION.name.max
  ) {
    return `Name must contain ${VALIDATION.name.min} to ${VALIDATION.name.max} characters. Please check your input.`;
  }

  if (
    trimmedDescr.length < VALIDATION.descr.min ||
    trimmedDescr.length > VALIDATION.descr.max
  ) {
    return `Message must contain ${VALIDATION.descr.min} to ${VALIDATION.descr.max} characters. Please check your input.`;
  }

  if (
    Number.isNaN(ratingNum) ||
    ratingNum < VALIDATION.rating.min ||
    ratingNum > VALIDATION.rating.max
  ) {
    return `Please select a rating between ${VALIDATION.rating.min} and ${VALIDATION.rating.max} stars.`;
  }

  return null;
};

// функція для обробки відправки форми відгуку
const onSubmit = async e => {
  e.preventDefault(); // запобігаємо стандартній поведінці форми

  const form = e.currentTarget; // отримуємо посилання на форму, яка була відправлена
  const submitBtn = form.querySelector('.feedback-modal__submit');

  const formData = new FormData(form);

  
  // формуємо об'єкт з даними форми для валідації та відправки на сервер
  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    descr: String(formData.get('descr') ?? '').trim(),
    rating: Number(formData.get('rating') ?? DEFAULT_RATING),
  };

  const errorMessage = validate(payload);

  if (errorMessage) {
    iziToast.error({
      title: 'Validation error',
      message: errorMessage,
      position: 'topRight',
    });
    return;
  }

  submitBtn.disabled = true;

  try {
    await createFeedback(payload);

    iziToast.success({
      title: 'Success',
      message: 'Thank you! Your feedback has been submitted.',
      position: 'topRight',
    });

    closeModal();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to send feedback. Please try again.',
      position: 'topRight',
    });
  } finally {
    submitBtn.disabled = false;
  }
};

export const openFeedbackModal = () => openModal();
