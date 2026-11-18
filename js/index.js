const nav = document.querySelector("#nav");
const openButton = document.querySelector("#open-menu-icon");
const closeButton = document.querySelector("#close-menu-icon");
const backdrop = document.querySelector("#menu-backdrop");
const mobileMenu = window.matchMedia("(max-width: 900px)");

function setMenuOpen(isOpen) {
  if (!nav || !openButton) return;

  const shouldOpen = Boolean(isOpen && mobileMenu.matches);
  nav.classList.toggle("visible", shouldOpen);
  backdrop?.classList.toggle("visible", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
  openButton.setAttribute("aria-expanded", String(shouldOpen));

  if (mobileMenu.matches) {
    nav.setAttribute("aria-hidden", String(!shouldOpen));
  } else {
    nav.removeAttribute("aria-hidden");
  }
}

openButton?.addEventListener("click", () => setMenuOpen(true));
closeButton?.addEventListener("click", () => setMenuOpen(false));
backdrop?.addEventListener("click", () => setMenuOpen(false));

// Never carry an open mobile drawer across responsive breakpoints.
mobileMenu.addEventListener("change", () => setMenuOpen(false));

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

setMenuOpen(false);

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
