import Raty from 'raty-js';

import starOn from '../../assets/raty/star-on.svg?url';
import starOff from '../../assets/raty/star-off.svg?url';

// Функція для ініціалізації зірочок рейтингу в контейнерах з класом .feedback__rating
export const initFeedbackStars = (root = document) => {
  const nodes = root.querySelectorAll('.feedback__rating');

  nodes.forEach(node => {
    const score = Number(node.dataset.rating) || 0;

    // очищаємо контейнер на випадок повторної ініціалізації
    node.innerHTML = '';

    const instance = new Raty(node, {
  readOnly: true,
  score,
  number: 5,
  starType: 'img',
  path: '',
  starOn,
  starOff,
    });
    instance.init();
  });
};