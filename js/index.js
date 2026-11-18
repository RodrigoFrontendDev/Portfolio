const nav = document.querySelector("#nav");
const openButton = document.querySelector("#open-menu-icon");
const closeButton = document.querySelector("#close-menu-icon");
const backdrop = document.querySelector("#menu-backdrop");
const mobileMenu = window.matchMedia("(max-width: 900px)");

function setMenuOpen(isOpen) {
  if (!nav || !openButton) return;

  // The drawer can only open on an explicit button click in mobile layout.
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

openButton?.addEventListener("click", () => {
  if (!mobileMenu.matches) return;
  nav?.classList.add("menu-ready");
  setMenuOpen(true);
});

closeButton?.addEventListener("click", () => setMenuOpen(false));
backdrop?.addEventListener("click", () => setMenuOpen(false));

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

// Reset to a closed state whenever the layout crosses the mobile breakpoint.
// Enable the drawer transition on the next frame, after its hidden position is applied.
mobileMenu.addEventListener("change", (event) => {
  setMenuOpen(false);
  nav?.classList.remove("menu-ready");

  if (event.matches) {
    window.requestAnimationFrame(() => nav?.classList.add("menu-ready"));
  }
});

setMenuOpen(false);
if (mobileMenu.matches) {
  window.requestAnimationFrame(() => nav?.classList.add("menu-ready"));
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
