// Load shared navigation
fetch('nav-menu.html')
  .then(res => {
    if (!res.ok) throw new Error('Nav menu not found');
    return res.text();
  })
  .then(html => {
    document.getElementById('nav-container').innerHTML = html;
    initHamburger();
  })
  .catch(err => console.error('Nav load error:', err));

function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (!hamburger || !dropdownMenu) return;

  // Toggle menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    dropdownMenu.classList.toggle('open');
  });

  // Close when clicking ANYWHERE on page
  document.addEventListener('click', () => {
    hamburger.classList.remove('open');
    dropdownMenu.classList.remove('open');
  });

  // Keep open when clicking INSIDE menu
  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close when clicking a link
  const links = dropdownMenu.querySelectorAll('.dropdown-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      dropdownMenu.classList.remove('open');
    });
  });
}
