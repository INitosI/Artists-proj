import '../scss/styles.scss';

import { initHeader } from './sections/header';
import { initHero } from './sections/hero';
import { initAbout } from './sections/about';
import { initArtists } from './sections/artists';
import { initFeedback } from './sections/feedback';
import { initFooter } from './sections/footer';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHero();
  initArtists();
  initAbout();
  initFeedback();
  initFooter();
});
