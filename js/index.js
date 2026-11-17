const nav = document.querySelector("#nav");
const open = document.querySelector("#open-menu-icon");
const close = document.querySelector("#close-menu-icon");
const menuLinks = document.querySelectorAll('.nav-list a');

const isMobile = () => window.innerWidth <= 1024;

const toggleMenu = (show) => {
    if (isMobile()) {
        nav.classList.toggle('visible', show);
        open.style.display = show ? 'none' : 'block';
        close.style.display = show ? 'block' : 'none';
    }
};

open.addEventListener("click", () => toggleMenu(true));
close.addEventListener("click", () => toggleMenu(false));

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile()) {
            toggleMenu(false);
        }
    });
});

document.addEventListener('click', (e) => {
    if (isMobile() && nav.classList.contains('visible') && !nav.contains(e.target) && !open.contains(e.target)) {
        toggleMenu(false);
    }
});

window.addEventListener('resize', () => {
    if (!isMobile()) {
        nav.classList.remove('visible');
        open.style.display = 'none';
        close.style.display = 'none';
    } else {
        open.style.display = nav.classList.contains('visible') ? 'none' : 'block';
    }
});
