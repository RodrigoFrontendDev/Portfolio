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


// Track the section crossing a fixed viewport line.
// This is reliable for tall sections (such as the projects grid), where
// IntersectionObserver ratios can be misleading.
const sectionLinks = [...(nav?.querySelectorAll('.nav-list a[href^="#"]') ?? [])];
const sectionTargets = sectionLinks
  .map((link) => ({
    link,
    section: document.querySelector(link.getAttribute("href")),
  }))
  .filter((item) => item.section);

function setActiveSection(sectionId) {
  for (const { link } of sectionTargets) {
    if (link.hash === `#${sectionId}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

function updateActiveSection() {
  if (!sectionTargets.length) return;

  const activationLine = Math.min(window.innerHeight * 0.42, window.innerHeight - 120);
  let active = null;
  let lastPassed = null;

  for (const item of sectionTargets) {
    const rect = item.section.getBoundingClientRect();
    if (rect.top <= activationLine) lastPassed = item.section;
    if (rect.top <= activationLine && rect.bottom > activationLine) {
      active = item.section;
      break;
    }
  }

  // Keep the last section selected near the page bottom, after its lower
  // edge has passed the activation line.
  active ??= lastPassed;

  if (active) {
    setActiveSection(active.id);
  } else {
    for (const { link } of sectionTargets) link.removeAttribute("aria-current");
  }
}

let activeSectionFrame = 0;
function scheduleActiveSectionUpdate() {
  if (activeSectionFrame) return;
  activeSectionFrame = window.requestAnimationFrame(() => {
    activeSectionFrame = 0;
    updateActiveSection();
  });
}

window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate, { passive: true });
sectionLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveSection(link.hash.slice(1)));
});
updateActiveSection();
