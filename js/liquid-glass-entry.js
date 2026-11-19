import { createLiquidGlass, supportsRefraction } from "./vendor/liquid-glass.js";

const optionsBySelector = [
  [".project-card", { radius: 24, rim: 1.2, blur: 2.4, saturate: 1.16, reflect: true, reflectStrength: 2.3 }],
  [".skill-item", { radius: 14, rim: 1.1, blur: 1.7, saturate: 1.12, reflect: false }],
  [".about-note, .contact-form", { radius: 24, rim: 1.2, blur: 2.3, saturate: 1.16, reflect: true, reflectStrength: 2.2 }],
  [".floating-card", { radius: 16, rim: 1.1, blur: 1.9, saturate: 1.14, reflect: true, reflectStrength: 2.1 }],
];

function initLiquidGlass() {
  const optionsByHost = new Map();
  for (const [selector, options] of optionsBySelector) {
    document.querySelectorAll(selector).forEach((host) => optionsByHost.set(host, options));
  }

  document.documentElement.classList.toggle("liquid-glass-fallback", !supportsRefraction);

  const mount = (host) => {
    if (host.dataset.liquidGlassMounted === "true") return;
    host.dataset.liquidGlassMounted = "true";
    host.setAttribute("data-lg-dark", "");
    try {
      createLiquidGlass(host, { ...optionsByHost.get(host), promote: false });
    } catch (error) {
      delete host.dataset.liquidGlassMounted;
      console.warn("[Liquid Glass] Could not mount glass:", error);
    }
  };

  if (!("IntersectionObserver" in window)) {
    optionsByHost.forEach((_, host) => mount(host));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      mount(entry.target);
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "180px 0px", threshold: 0.02 });

  optionsByHost.forEach((_, host) => observer.observe(host));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLiquidGlass, { once: true });
} else {
  initLiquidGlass();
}
