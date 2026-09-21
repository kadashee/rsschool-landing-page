const themeButton = document.querySelector('.theme-toggle');
const themeIcon = themeButton.querySelector('img');
const burgerIcon = document.querySelector('.burger img');

const savedTheme = localStorage.getItem('theme') || 'light';

function updateIcons(theme) {
  if (theme === 'dark') {
    themeIcon.src = './assets/icons/light.svg';
    burgerIcon.src = './assets/icons/burger-light.svg';
  } else {
    themeIcon.src = './assets/icons/dark.svg';
    burgerIcon.src = './assets/icons/burger-dark.svg';
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateIcons(theme);
}

setTheme(savedTheme);

themeButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
