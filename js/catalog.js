import { pets } from './pets-data.js';

const petsGrid = document.querySelector('.pets-grid');
const categoryButtons = document.querySelectorAll('.category-button');
const showMoreButton = document.querySelector('.show-more');

let currentCategory = 'all';
let isExpanded = false;

function getInitialCount() {
  return window.innerWidth <= 768 ? 4 : 8;
}

function createPetCard(pet) {
  const card = document.createElement('article');

  card.classList.add('pet-card');
  card.dataset.id = pet.id;

  card.innerHTML = `
    <img src="${pet.image}" alt="${pet.type} ${pet.name}">

    <div class="pet-card-content">
      <h3>${pet.name}</h3>
      <p>${pet.description}</p>
      <span>${pet.type} · ${pet.age}</span>
    </div>
  `;

  return card;
}

function getFilteredPets() {
  if (currentCategory === 'all') {
    return pets;
  }

  return pets.filter((pet) => pet.category === currentCategory);
}

function renderPets() {
  const filteredPets = getFilteredPets();

  petsGrid.innerHTML = '';

  if (filteredPets.length === 0) {
    petsGrid.innerHTML = '<p>В этой категории пока нет подопечных.</p>';
    showMoreButton.hidden = true;
    return;
  }

  const visibleCount = isExpanded
      ? filteredPets.length
      : getInitialCount();

  const visiblePets = filteredPets.slice(0, visibleCount);

  visiblePets.forEach((pet) => {
    const card = createPetCard(pet);
    petsGrid.append(card);
  });

  showMoreButton.hidden = visiblePets.length >= filteredPets.length;
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    isExpanded = false;

    categoryButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    renderPets();
  });
});

showMoreButton.addEventListener('click', () => {
  isExpanded = true;
  renderPets();
});

window.addEventListener('resize', () => {
  renderPets();
});

renderPets();
