/* =========================================================
   CENTRAL NAVIGATION LOADER
   Include ONE line on every page:  <script src="nav.js"></script>
   (Place it at the END of <body>, right before </body>.)
   ========================================================= */
(function () {
    var container = document.getElementById('nav-container');
    if (!container) return;

    fetch('nav-menu.html')
        .then(function (res) {
            if (!res.ok) throw new Error('nav-menu.html not found');
            return res.text();
        })
        .then(function (html) {
            container.innerHTML = html;

            var circle   = container.querySelector('.hamburger-circle');
            var hamburger = container.querySelector('#hamburger');
            var dropdown  = container.querySelector('#dropdownMenu');

            function toggle() {
                if (hamburger) hamburger.classList.toggle('open');
                if (dropdown)  dropdown.classList.toggle('open');
            }
            function close() {
                if (hamburger) hamburger.classList.remove('open');
                if (dropdown)  dropdown.classList.remove('open');
            }

            // Click the circle → open/close the menu
            if (circle) circle.addEventListener('click', toggle);

            // Click a link → close menu (and show alert for "coming soon" items)
            if (dropdown) {
                dropdown.querySelectorAll('.dropdown-link').forEach(function (link) {
                    link.addEventListener('click', function (e) {
                        var alertMsg = link.getAttribute('data-alert');
                        if (alertMsg) {
                            e.preventDefault();
                            alert(alertMsg);
                        }
                        close();
                    });
                });
            }

            // Auto-highlight the current page (no more manual "active" edits)
            var current = location.pathname.split('/').pop() || 'index.html';
            if (dropdown) {
                dropdown.querySelectorAll('.dropdown-link').forEach(function (link) {
                    var href = link.getAttribute('href');
                    if (href && href === current) link.classList.add('active');
                });
            }
        })
        .catch(function (err) {
            console.error('Nav load error:', err);
        });
})();
