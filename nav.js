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
  // FIX: click listener on .hamburger-circle (outer element), NOT .hamburger (which has pointer-events: none)
  const hamburgerCircle = document.querySelector('.hamburger-circle');
  const hamburger = document.querySelector('.hamburger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (!hamburgerCircle || !hamburger || !dropdownMenu) return;

  // Toggle menu — click on the circle
  hamburgerCircle.addEventListener('click', (e) => {
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
