const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mainNav.classList.toggle('open', !isOpen);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}));

document.querySelectorAll('[data-demo-action]').forEach((button) => {
  button.addEventListener('click', () => showToast(`${button.dataset.demoAction}: demonstração visual, sem integração ativa.`));
});

const profileDialog = document.querySelector('#profile-dialog');
const profileCards = [...document.querySelectorAll('.professional-card')];
profileCards.forEach((card) => {
  card.querySelector('[data-open-profile]').addEventListener('click', () => {
    document.querySelector('#dialog-name').textContent = card.dataset.name;
    document.querySelector('#dialog-role').textContent = card.dataset.role;
    document.querySelector('#dialog-location').textContent = `⌖ ${card.dataset.location}`;
    document.querySelector('#dialog-description').textContent = card.dataset.description;
    document.querySelector('#dialog-avatar').textContent = card.dataset.initials;
    document.querySelector('#dialog-price').textContent = card.dataset.price;
    document.querySelector('#dialog-rating').textContent = card.querySelector('.rating').childNodes[1].textContent.trim();
    profileDialog.showModal();
  });
});
document.querySelector('#dialog-close').addEventListener('click', () => profileDialog.close());
profileDialog.addEventListener('click', (event) => {
  if (event.target === profileDialog) profileDialog.close();
});

const queryInput = document.querySelector('#service-query');
const locationInput = document.querySelector('#location-query');
const categoryButtons = [...document.querySelectorAll('.category-card')];
const resultsStatus = document.querySelector('#results-status');
const emptyState = document.querySelector('#empty-state');
let activeCategory = '';

function filterProfiles() {
  const query = queryInput.value.trim().toLocaleLowerCase('pt-BR');
  const location = locationInput.value.trim().toLocaleLowerCase('pt-BR');
  let visibleCount = 0;
  profileCards.forEach((card) => {
    const searchable = `${card.dataset.name} ${card.dataset.role} ${card.dataset.category} ${card.dataset.location}`.toLocaleLowerCase('pt-BR');
    const matches = (!query || searchable.includes(query)) && (!location || card.dataset.location.toLocaleLowerCase('pt-BR').includes(location)) && (!activeCategory || card.dataset.category === activeCategory || card.dataset.role.toLocaleLowerCase('pt-BR').includes(activeCategory.toLocaleLowerCase('pt-BR')));
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  emptyState.hidden = visibleCount > 0;
  resultsStatus.textContent = query || location || activeCategory ? `${visibleCount} perfil(is) fictício(s) de demonstração encontrado(s).` : '';
  document.querySelector('#profissionais').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  filterProfiles();
});
categoryButtons.forEach((button) => button.addEventListener('click', () => {
  activeCategory = activeCategory === button.dataset.category ? '' : button.dataset.category;
  categoryButtons.forEach((item) => item.classList.toggle('selected', item.dataset.category === activeCategory));
  queryInput.value = '';
  filterProfiles();
}));
document.querySelector('#show-all-categories').addEventListener('click', () => {
  activeCategory = '';
  queryInput.value = '';
  locationInput.value = '';
  categoryButtons.forEach((item) => item.classList.remove('selected'));
  profileCards.forEach((card) => { card.hidden = false; });
  emptyState.hidden = true;
  resultsStatus.textContent = '';
  document.querySelector('#categorias').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('#clear-search').addEventListener('click', () => {
  activeCategory = '';
  queryInput.value = '';
  locationInput.value = '';
  categoryButtons.forEach((item) => item.classList.remove('selected'));
  profileCards.forEach((card) => { card.hidden = false; });
  emptyState.hidden = true;
  resultsStatus.textContent = '';
});

const professionalGrid = document.querySelector('#professional-grid');
document.querySelector('#scroll-left').addEventListener('click', () => professionalGrid.scrollBy({ left: -280, behavior: 'smooth' }));
document.querySelector('#scroll-right').addEventListener('click', () => professionalGrid.scrollBy({ left: 280, behavior: 'smooth' }));
