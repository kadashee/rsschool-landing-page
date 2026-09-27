const burgerButton = document.querySelector('.burger');
const menuIcon = burgerButton.querySelector('img');
const navLinks = document.querySelectorAll('.nav-list a');
const themeToggle = document.querySelector('.theme-toggle');

function updateMenuIcon() {
  const isOpen = document.body.classList.contains('menu-open');
  const iconName = isOpen ? 'close' : 'burger';
  const color = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  menuIcon.src = `./assets/icons/${iconName}-${color}.svg`;
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  updateMenuIcon();
}

burgerButton.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
  updateMenuIcon();
});

themeToggle.addEventListener('click', updateMenuIcon);

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
