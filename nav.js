fetch('nav-menu.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('nav-container').innerHTML = html;
    })
    .then(() => {
        window.toggleMenu = function () {
            document.getElementById('hamburger').classList.toggle('open');
            document.getElementById('dropdownMenu').classList.toggle('open');
        };
    });
