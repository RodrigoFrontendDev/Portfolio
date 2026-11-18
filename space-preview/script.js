(() => {
  document.documentElement.classList.add("js-enabled");
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#main-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
      navigation.classList.toggle("is-open", !open);
    });
    navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
      navigation.classList.remove("is-open");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        navigation.classList.remove("is-open");
      }
    });
  }
  const progressBar = document.querySelector("#progress-bar");
  const journey = document.querySelector("#mission-journey");
  const stage = document.querySelector("#journey-stage");
  const entries = journey ? Array.from(journey.querySelectorAll("article.journey-entry")) : [];
  const stageTitle = document.querySelector("#journey-stage-title");
  const stageYear = document.querySelector("#journey-stage-year");
  const stageType = document.querySelector("#journey-stage-type");
  const stageIndex = document.querySelector("#journey-stage-index");
  const stagePercent = document.querySelector("#journey-stage-percent");
  const fill = document.querySelector("#journey-stage-progress");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = -1;
  let ticking = false;
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const activate = entry => {
    const i = entries.indexOf(entry);
    if (i < 0 || i === active) return;
    active = i;
    entries.forEach((item,n) => {
      const current = n === i;
      item.classList.toggle("is-active",current);
      if (current) item.setAttribute("aria-current","step");
      else item.removeAttribute("aria-current");
    });
    if (stage) {
      stage.classList.remove("is-changing");
      stage.dataset.scene = entry.dataset.scene || "orbit";
      if (!reduced) requestAnimationFrame(() => stage.classList.add("is-changing"));
    }
    if (stageTitle) stageTitle.textContent = entry.dataset.title || "";
    if (stageYear) stageYear.textContent = entry.dataset.year || "";
    if (stageType) stageType.textContent = entry.dataset.type || "";
    const count = entries.length || 1;
    const current = i + 1;
    if (stageIndex) stageIndex.textContent = String(current).padStart(2,"0") + " / " + String(count).padStart(2,"0");
    if (stagePercent) stagePercent.textContent = String(Math.round(current / count * 100)).padStart(2,"0") + "%";
    if (fill) fill.style.transform = "scaleX(" + current / count + ")";
  };
  if (entries.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(changes => {
      const visible = changes.filter(item => item.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio);
      if (visible[0]) activate(visible[0].target);
    },{threshold:[0.25,0.45,0.6,0.75],rootMargin:"-12% 0px -12% 0px"});
    entries.forEach(entry => observer.observe(entry));
  } else if (entries.length) {
    activate(entries[0]);
  }
  const updateScroll = () => {
    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = clamp(max > 0 ? window.scrollY / max * 100 : 0,0,100) + "%";
    }
    if (journey && stage && !reduced) {
      const rect = journey.getBoundingClientRect();
      const range = rect.height + window.innerHeight;
      const amount = range > 0 ? clamp((window.innerHeight - rect.top) / range,0,1) : 0;
      stage.style.setProperty("--journey-parallax",((amount - 0.5) * 62).toFixed(1) + "px");
    }
    ticking = false;
  };
  window.addEventListener("scroll",() => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  },{passive:true});
  updateScroll();
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const revealObserver = new IntersectionObserver((changes,observer) => {
      changes.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
          observer.unobserve(item.target);
        }
      });
    },{threshold:0.12,rootMargin:"0px 0px -35px 0px"});
    reveals.forEach(item => revealObserver.observe(item));
  } else {
    reveals.forEach(item => item.classList.add("is-visible"));
  }
})();