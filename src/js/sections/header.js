export const initHeader = () => {
    const menu = document.querySelector('[data-menu]');
    const openBtn = document.querySelector('[data-menu-open]');
    const closeBtn = document.querySelector('[data-menu-close]');
    const menuLinks = document.querySelectorAll('.mobile-menu__nav-link');
  openBtn.addEventListener('click', () => {
  menu.classList.add('is-open');
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

function closeMenu() {
  menu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}
};
