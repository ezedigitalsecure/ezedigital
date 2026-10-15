fetch('nav-menu.html')
    .then(res => {
        if (!res.ok) throw new Error('nav-menu.html not found');
        return res.text();
    })
    .then(html => {
        document.getElementById('nav-container').innerHTML = html;
        // Function created AFTER menu exists — this was the missing piece
        window.toggleMenu = function () {
            const ham = document.getElementById('hamburger');
            const menu = document.getElementById('dropdownMenu');
            if (ham) ham.classList.toggle('open');
            if (menu) menu.classList.toggle('open');
        };
    })
    .catch(err => console.error('Nav error:', err));
