fetch('nav-menu.html')
  .then(response => { if (!response.ok) throw new Error('Navigation unavailable'); return response.text(); })
  .then(html => {
    const host = document.getElementById('nav-container');
    if (!host) return;
    host.innerHTML = html;
    const button = host.querySelector('.hamburger-circle');
    const icon = host.querySelector('.hamburger');
    const menu = host.querySelector('.dropdown-menu');
    if (!button || !icon || !menu) return;
    const close = () => { icon.classList.remove('open'); menu.classList.remove('open'); button.setAttribute('aria-expanded','false'); };
    button.addEventListener('click', event => {
      event.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      icon.classList.toggle('open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', event => { if (!host.contains(event.target)) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    const current = location.pathname.split('/').pop() || 'index.html';
    menu.querySelectorAll('a').forEach(link => {
      const active = link.getAttribute('href') === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','page');
    });
  })
  .catch(error => console.error('Navigation load error:', error));
