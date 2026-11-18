const nav = document.querySelector("#nav");
const openButton = document.querySelector("#open-menu-icon");
const closeButton = document.querySelector("#close-menu-icon");

function setMenuOpen(isOpen) {
  if (!nav || !openButton) return;
  nav.classList.toggle("visible", isOpen);
  openButton.setAttribute("aria-expanded", String(isOpen));
}

openButton?.addEventListener("click", () => setMenuOpen(true));
closeButton?.addEventListener("click", () => setMenuOpen(false));

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
