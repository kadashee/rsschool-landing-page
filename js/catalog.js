import { pets, donationOptions } from './pets-data.js';

const petsGrid = document.querySelector('.pets-grid');
const categoryButtons = document.querySelectorAll('.category-button');
const showMoreButton = document.querySelector('.show-more');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modalAmounts = document.querySelector('.modal-amounts');
const donationResult = document.querySelector('.donation-result');

let currentCategory = 'all';
let isExpanded = false;
let selectedAmount;
let selectedFrequency;

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

function updateDonation() {
  modalOverlay.querySelectorAll('.category-button').forEach((button) => {
    const isActive = Number(button.dataset.amount) === selectedAmount
      || button.dataset.frequency === selectedFrequency;

    button.classList.toggle('active', isActive);
  });

  const period = selectedFrequency === 'Разовая' ? 'на месяц' : 'каждый месяц';

  donationResult.textContent = `${selectedFrequency} помощь ${selectedAmount} ₽ — это ${donationOptions[selectedAmount]} ${period}.`;
}

function openModal(pet) {
  modalContent.innerHTML = `
    <img src="${pet.image}" alt="${pet.type} ${pet.name}">
    <h3>${pet.name}</h3>
    <p>${pet.description}</p>
    <span>${pet.type} · ${pet.age}</span>
  `;

  modalAmounts.innerHTML = pet.donationAmounts
    .map((amount) => `<button class="category-button" type="button" data-amount="${amount}">${amount} ₽</button>`)
    .join('');

  selectedAmount = pet.donationAmounts[0];
  selectedFrequency = 'Разовая';
  updateDonation();

  modalOverlay.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.classList.remove('modal-open');
}

petsGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.pet-card');

  if (card) {
    openModal(pets.find((pet) => pet.id === Number(card.dataset.id)));
  }
});

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay || event.target.classList.contains('modal-close')) {
    closeModal();
  }

  if (event.target.dataset.amount) {
    selectedAmount = Number(event.target.dataset.amount);
    updateDonation();
  }

  if (event.target.dataset.frequency) {
    selectedFrequency = event.target.dataset.frequency;
    updateDonation();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

renderPets();
