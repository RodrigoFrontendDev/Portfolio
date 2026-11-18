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
  const title = document.querySelector("#journey-stage-title");
  const year = document.querySelector("#journey-stage-year");
  const type = document.querySelector("#journey-stage-type");
  const indexLabel = document.querySelector("#journey-stage-index");
  const percentLabel = document.querySelector("#journey-stage-percent");
  const progressFill = document.querySelector("#journey-stage-progress");
  const layers = stage ? [stage.querySelector(".journey-art-a"), stage.querySelector(".journey-art-b")] : [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sceneAssets = {
    moon: "https://images-assets.nasa.gov/image/art002e015231/art002e015231~large.jpg",
    apollo: "https://images-assets.nasa.gov/image/as11-40-5875/as11-40-5875~large.jpg",
    voyager: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/voyager/one-light-day/1LD-Voyager_One_Light-Day_Infographic_Final-High-Res.jpg",
    observatory: "https://cdn.esawebb.org/archives/images/wallpaper2/weic2216b.jpg",
    mars: "https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA24838.jpg",
    cassini: "https://photojournal.jpl.nasa.gov/jpeg/PIA08823.jpg",
    "deep-space": "https://cdn.esawebb.org/archives/images/wallpaper2/weic2216b.jpg",
    artemis: "https://images-assets.nasa.gov/image/art002e015231/art002e015231~large.jpg",
    roman: "https://cdn.esawebb.org/archives/images/wallpaper2/weic2216b.jpg",
    mmx: "https://d2pn8kiwq2w21t.cloudfront.net/original_images/1-MMX.jpg",
    interstellar: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/voyager/one-light-day/1LD-Voyager_One_Light-Day_Infographic_Final-High-Res.jpg"
  };
  const sceneGradients = {
    sputnik: "radial-gradient(circle at 64% 43%,#aab7c4 0 3.2%,#596b7b 3.4% 5%,transparent 5.4%),radial-gradient(ellipse at 64% 43%,rgba(153,190,220,.24),transparent 23%),radial-gradient(ellipse at 25% 78%,rgba(34,91,128,.26),transparent 36%),linear-gradient(145deg,#172b40,#050a13 72%)",
    human: "radial-gradient(ellipse at 68% 60%,rgba(82,151,195,.48),transparent 33%),radial-gradient(ellipse at 28% 30%,rgba(50,83,126,.3),transparent 40%),linear-gradient(145deg,#182e46,#060b14 72%)",
    station: "radial-gradient(ellipse at 66% 42%,rgba(105,152,191,.42),transparent 31%),linear-gradient(145deg,#25384d,#080e18 72%)",
    shuttle: "radial-gradient(ellipse at 52% 79%,rgba(226,142,91,.34),transparent 25%),linear-gradient(150deg,#263a52,#070c15 72%)"
  };
  const imagePromises = new Map();
  let activeLayer = 0;
  let displayedScene = "";
  let sceneRequest = 0;
  let activeIndex = -1;
  let ticking = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const pad = value => String(value).padStart(2, "0");

  const loadImage = url => {
    if (!url) return Promise.resolve(false);
    if (imagePromises.has(url)) return imagePromises.get(url);
    const promise = new Promise(resolve => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = url;
      if (image.complete) resolve(image.naturalWidth > 0);
    });
    imagePromises.set(url, promise);
    return promise;
  };

  const applyScene = async scene => {
    if (!stage || !layers[0] || !layers[1] || scene === displayedScene) return;
    displayedScene = scene;
    stage.dataset.scene = scene;
    const request = ++sceneRequest;
    const imageUrl = sceneAssets[scene] || "";
    const loaded = imageUrl ? await loadImage(imageUrl) : false;
    if (request !== sceneRequest) return;
    const nextIndex = 1 - activeLayer;
    const next = layers[nextIndex];
    const previous = layers[activeLayer];
    const fallback = sceneGradients[scene] || "radial-gradient(ellipse at 58% 42%,rgba(74,126,173,.34),transparent 36%),linear-gradient(145deg,#1a2b42,#060b14 72%)";
    const overlay = "linear-gradient(180deg,rgba(5,9,18,.08),rgba(5,9,18,.58))";
    next.style.backgroundImage = loaded ? overlay + ',url("' + imageUrl + '")' : fallback;
    requestAnimationFrame(() => {
      if (request !== sceneRequest) return;
      next.classList.add("is-visible");
      previous.classList.remove("is-visible");
      activeLayer = nextIndex;
    });
  };

  const activateMission = index => {
    if (index < 0 || index >= entries.length || index === activeIndex) return;
    activeIndex = index;
    const entry = entries[index];
    entries.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    if (title) title.textContent = entry.dataset.title || "";
    if (year) year.textContent = entry.dataset.year || "";
    if (type) type.textContent = entry.dataset.type || "";
    const current = index + 1;
    const count = entries.length || 1;
    if (indexLabel) indexLabel.textContent = pad(current) + " / " + pad(count);
    if (percentLabel) percentLabel.textContent = pad(Math.round(current / count * 100)) + "%";
    if (progressFill) progressFill.style.transform = "scaleX(" + current / count + ")";
    applyScene(entry.dataset.scene || "orbit");
  };

  const updateActiveMission = () => {
    if (!entries.length) return;
    const focus = window.innerHeight * 0.53;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    let currentDistance = Infinity;
    entries.forEach((entry, index) => {
      const rect = entry.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - focus);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
      if (index === activeIndex) currentDistance = distance;
    });
    if (activeIndex < 0) activateMission(nearestIndex);
    else if (nearestIndex !== activeIndex && currentDistance > nearestDistance + 72) activateMission(nearestIndex);
  };

  const updateScroll = () => {
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable * 100 : 0;
      progressBar.style.width = clamp(progress, 0, 100) + "%";
    }
    if (journey && stage && !reducedMotion) {
      const rect = journey.getBoundingClientRect();
      const usableRange = Math.max(1, rect.height - window.innerHeight * 0.3);
      const progress = clamp((window.innerHeight * 0.65 - rect.top) / usableRange, 0, 1);
      const movement = (progress - 0.5) * 280;
      stage.style.setProperty("--journey-parallax", movement.toFixed(1) + "px");
    }
    updateActiveMission();
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  if (entries.length) activateMission(0);
  updateScroll();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((changes, observer) => {
      changes.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
          observer.unobserve(item.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
})();