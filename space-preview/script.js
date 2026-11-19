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
  const entries = journey ? Array.from(journey.querySelectorAll(".journey-entry")) : [];
  const hudIndex = document.querySelector("#journey-current-index");
  const hudTitle = document.querySelector("#journey-current-title");
  const hudYear = document.querySelector("#journey-current-year");
  const hudProgress = document.querySelector("#journey-current-progress");
  const starCanvas = document.querySelector("#journey-starfield");
  const sceneLayers = stage ? [
    stage.querySelector("#journey-scene-a"),
    stage.querySelector("#journey-scene-b")
  ] : [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const pad = value => String(value).padStart(2, "0");
  entries.forEach(entry => entry.classList.add("journey-cinematic"));

  const sceneAssets = {
    "sputnik": ["https://media.defense.gov/2023/Feb/21/2003165000/2000/2000/0/230221-F-IN811-001.JPG"],
    "luna3": [
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/f/First_Luna1-1.jpg?fit=clip&h=1200&w=1200",
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/f/First_Luna1-1.jpg"
    ],
    "vostok1": ["https://image.geo.de/30654468/t/rA/v4/w1440/r1.5/-/aufbruch-ins-nichts-picture-1239658039.jpg"],
    "apollo11": ["https://images-assets.nasa.gov/image/as11-40-5875/as11-40-5875~large.jpg"],
    "salyut1": [
      "https://www.nasa.gov/wp-content/uploads/2021/04/salyut_launch_8_from_soyuz_10_departure.jpg",
      "https://www.nasa.gov/wp-content/uploads/2021/04/salyut_launch_2_ria_novosti_artwork.jpg"
    ],
    "voyager-pair": [
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia04/pia04495/PIA04495.jpg",
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia04/pia04495/PIA04495.jpg?fit=clip&h=1200&w=1200"
    ],
    "columbia": ["https://s.hdnux.com/photos/01/17/40/35/20842362/4/rawImage.jpg"],
    "hubble": ["https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/07/hubble-space-telescope-hst-6.jpg?crop=faces%2Cfocalpoint&fit=crop&h=1200&w=1200"],
    "pathfinder": [
      "https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA04318.jpg",
      "https://assets.science.nasa.gov/content/dam/science/psd/mars/resources/detail_files/4/4067_pathfinder_PIA01551_modest-web.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
    ],
    "iss": ["https://planetary.s3.amazonaws.com/web/assets/pictures/_1200x630_crop_center-center_82_none/20151104_s106e5319.jpg?mtime=1753472122"],
    "cassini": [
      "https://solarsystem.nasa.gov/internal_resources/1517",
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia05/pia05425/PIA05425.jpg?fit=clip&h=1200&w=1200"
    ],
    "curiosity": [
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/6/36510_pia16238.jpg?crop=faces%2Cfocalpoint&fit=crop&h=1200&w=1200",
      "https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA24838.jpg"
    ],
    "new-horizons": ["https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/b/BIG_P_COLOR_2_TRUE_COLOR1_1980.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1980&w=1980"],
    "perseverance": ["https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/4955/Perseverance_and_Ingenuity-1.jpeg?crop=faces%2Cfocalpoint&fit=clip&h=1157&w=1600"],
    "webb": ["https://cdn.esawebb.org/archives/images/wallpaper2/weic2216b.jpg"],
    "artemis2": ["https://images-assets.nasa.gov/image/art002e015231/art002e015231~large.jpg"],
    "roman": ["https://stsci-opo.org/STScI-01EVSTEFYZD1CP2186PZF37KM6.jpg"],
    "mmx": [
      "https://www.isas.jaxa.jp/topics/assets_c/2022/10/topics_20221024-thumb-700xauto-11670.png",
      "https://d2pn8kiwq2w21t.cloudfront.net/original_images/1-MMX.jpg"
    ],
    "voyager-lightday": [
      "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/voyager/one-light-day/1LD-Voyager_One_Light-Day_Infographic_Final-High-Res.jpg?fit=clip&h=1600&w=1600",
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia04/pia04495/PIA04495.jpg"
    ]
  };

  // Ilustración vectorial local por misión: el panel siempre conserva una imagen visible.
  const fallbackArt = {
    "sputnik": '<g transform="translate(1060 450)"><path d="M-28-28L-255-255M25-28L255-255M-28 28L-255 255M28 28L255 255" stroke="#cbd8e2" stroke-width="12" stroke-linecap="round"/><circle r="138" fill="#718292" stroke="#d4dde4" stroke-width="12"/><ellipse cx="-42" cy="-50" rx="58" ry="72" fill="#e3ebef" opacity=".52"/><path d="M-100-65Q0-140 105-60" fill="none" stroke="#f5f8fa" stroke-width="14" opacity=".56"/><path d="M-120 68Q0 135 120 68" fill="none" stroke="#27394b" stroke-width="18" opacity=".66"/><circle r="12" fill="#f0f3f5" opacity=".6"/></g>',
    "luna3": '<circle cx="1100" cy="390" r="250" fill="#9ba8b5"/><path d="M920 230Q1100 100 1280 300Q1370 460 1180 600Q970 650 890 450Z" fill="#758595"/><g transform="translate(360 520) rotate(-18)"><path d="M-75-60H75L100 55H-100Z" fill="#c5a15f"/><circle r="35" fill="#263b4d" stroke="#e4d6b1" stroke-width="13"/><path d="M0-70V-210M-120 0H-220M120 0H220" stroke="#dce5ed" stroke-width="9"/><path d="M-220-24H-120V24H-220ZM120-24H220V24H120Z" fill="#547b98"/></g>',
    "vostok1": '<path d="M0 770Q450 630 900 760T1600 720V1000H0Z" fill="#17405f"/><path d="M0 810Q480 700 900 820T1600 770" fill="none" stroke="#7bb6d2" stroke-width="8"/><g transform="translate(850 420)"><path d="M-100 50Q-125-85 0-160Q125-85 100 50L65 150H-65Z" fill="#d6dce1" stroke="#889aa8" stroke-width="10"/><ellipse cy="-20" rx="55" ry="62" fill="#22394d" stroke="#e1c58a" stroke-width="14"/><path d="M-65 150H65L110 225H-110Z" fill="#aebbc5"/></g>',
    "apollo11": '<circle cx="1140" cy="390" r="260" fill="#8d99a6"/><path d="M0 780Q450 680 900 780T1600 740V1000H0Z" fill="#4f5964"/><g transform="translate(720 560)"><path d="M0-175L-72-65H72Z" fill="#dfca91"/><path d="M-72-65H72V5H-72Z" fill="#c9a766"/><path d="M-72 5L-150 95H150L72 5Z" fill="#a99b7c"/></g>',
    "salyut1": '<g transform="translate(800 500) rotate(-12)"><rect x="-320" y="-80" width="640" height="160" rx="80" fill="#c1cbd3" stroke="#778a9b" stroke-width="12"/><rect x="-90" y="-105" width="220" height="210" rx="28" fill="#899baa"/><circle cx="220" r="72" fill="#d8e0e5"/><path d="M-95-65V-260H-30V-65M-95 65V260H-30V65M100-65V-260H165V-65M100 65V260H165V65" fill="#517d9e" stroke="#cbd8e3" stroke-width="8"/></g>',
    "voyager-pair": '<g transform="translate(820 470) rotate(-18)"><ellipse rx="88" ry="62" fill="#c69a4e"/><circle r="38" fill="#edcf86"/><path d="M-65-25L-265-205L-230-240L-25-65M65 25L265 205L230 240L25 65" fill="#cfad6b"/><ellipse rx="220" ry="160" fill="none" stroke="#d5e0e8" stroke-width="9"/><path d="M0-60V-340M0-340L90-390" stroke="#d5e0e8" stroke-width="10"/></g>',
    "columbia": '<path d="M0 770Q420 660 830 760T1600 710V1000H0Z" fill="#183d59"/><g transform="translate(800 450) rotate(-22)"><path d="M-315 15L155-80L365 10L170 115L-285 75Z" fill="#e1e6e9" stroke="#8799a8" stroke-width="12"/><path d="M-315 15L-410-85L-285 75Z" fill="#c6d0d8"/><path d="M150-80L255-220L230-60Z" fill="#f3f5f5"/><path d="M-115 95L-35 330L45 100Z" fill="#ee8d4f" opacity=".9"/></g>',
    "hubble": '<g transform="translate(820 480) rotate(-12)"><rect x="-235" y="-95" width="470" height="190" rx="82" fill="#c4cdd3" stroke="#6b8295" stroke-width="14"/><ellipse cx="-235" rx="65" ry="95" fill="#728a9c"/><ellipse cx="235" rx="65" ry="95" fill="#e2e7e9"/><path d="M-120-95V-260H-70V-95M-120 95V260H-70V95M80-95V-260H130V-95M80 95V260H130V95" stroke="#dfc77f" stroke-width="13"/><path d="M-500-120H-275V120H-500ZM275-120H500V120H275Z" fill="#507b9d" stroke="#d0dce7" stroke-width="8"/></g>',
    "pathfinder": '<path d="M0 760Q420 670 830 760T1600 730V1000H0Z" fill="#a65337"/><g transform="translate(760 640)"><rect x="-140" y="-130" width="280" height="120" fill="#c9b47e"/><path d="M-140-130L-230-260H230L140-130Z" fill="#8fa2b0"/><path d="M-105-10L-155 130M105-10L155 130" stroke="#d6dbdd" stroke-width="13"/><circle cx="-160" cy="145" r="42" fill="#202b34" stroke="#d1b67a" stroke-width="10"/><circle cx="160" cy="145" r="42" fill="#202b34" stroke="#d1b67a" stroke-width="10"/></g>',
    "iss": '<g transform="translate(800 480) rotate(-10)"><path d="M-110 0H110M-30-220V220M-110-220H110M-110 220H110" stroke="#d1dce4" stroke-width="22"/><path d="M-110-220H-420V-70H-110ZM110-220H420V-70H110ZM-110 70H-420V220H-110ZM110 70H420V220H110Z" fill="#4e7b9a" stroke="#c1d0dc" stroke-width="9"/><rect x="-120" y="-78" width="240" height="156" rx="40" fill="#a9b7c2" stroke="#6b8294" stroke-width="12"/></g>',
    "cassini": '<circle cx="1050" cy="430" r="260" fill="#d4b176"/><path d="M720 390Q1040 210 1360 390Q1050 560 720 390Z" fill="none" stroke="#d8cdb9" stroke-width="70" opacity=".9"/><g transform="translate(355 475) rotate(20)"><ellipse rx="75" ry="50" fill="#be9149"/><path d="M-70-15L-245-95L-245-50L-70 20M70 15L245 95L245 50L70-20" fill="#cfaa66"/><path d="M0-50V-275M0-275L70-330" stroke="#dbe4eb" stroke-width="10"/></g>',
    "curiosity": '<path d="M0 760Q430 650 850 760T1600 720V1000H0Z" fill="#a95035"/><g transform="translate(800 620)"><rect x="-190" y="-110" width="380" height="150" rx="20" fill="#cbb985"/><rect x="-115" y="-210" width="230" height="100" fill="#748c9b"/><path d="M0-210V-390L60-440" stroke="#d0dce4" stroke-width="15"/><circle cx="70" cy="-448" r="38" fill="#d6c184"/><circle cx="-160" cy="145" r="50" fill="#252d36" stroke="#d0ba84" stroke-width="12"/><circle cx="160" cy="145" r="50" fill="#252d36" stroke="#d0ba84" stroke-width="12"/></g>',
    "new-horizons": '<circle cx="1060" cy="470" r="250" fill="#9b7a70"/><path d="M850 360Q1030 250 1250 390Q1290 530 1100 650Q900 660 820 500Z" fill="#e2d5ca"/><path d="M930 390L1010 460L1090 330L1170 430" fill="none" stroke="#f0e7de" stroke-width="25"/><g transform="translate(350 390) rotate(-18)"><ellipse rx="95" ry="35" fill="#bd914a"/><circle r="28" fill="#293f50"/><path d="M-85-10L-250-130M85 10L250 140" stroke="#e1e8ed" stroke-width="9"/></g>',
    "perseverance": '<path d="M0 760Q430 660 850 760T1600 720V1000H0Z" fill="#a54e33"/><g transform="translate(730 620)"><rect x="-185" y="-100" width="370" height="145" rx="20" fill="#d2bf8a"/><rect x="-105" y="-215" width="210" height="120" fill="#748b9b"/><path d="M0-215V-390L60-440" stroke="#d2dce2" stroke-width="15"/><circle cx="72" cy="-445" r="38" fill="#d5c28a"/><circle cx="-155" cy="80" r="45" fill="#242e36" stroke="#d6c18c" stroke-width="11"/><circle cx="155" cy="80" r="45" fill="#242e36" stroke="#d6c18c" stroke-width="11"/><path d="M340-170L500-300L565-220L455-130Z" fill="#e2e5e6" stroke="#71899b" stroke-width="8"/></g>',
    "webb": '<g transform="translate(820 480)"><path d="M-220 140L-345 320H345L220 140Z" fill="#527e9b"/><g fill="#c89a42" stroke="#ead8a7" stroke-width="8"><path d="M-180-100L-90-190L0-100L-90-10Z"/><path d="M0-100L90-190L180-100L90-10Z"/><path d="M-90-10L0-100L90-10L0 80Z"/><path d="M90-10L180-100L270-10L180 80Z"/><path d="M-180 80L-90-10L0 80L-90 170Z"/><path d="M0 80L90-10L180 80L90 170Z"/></g><path d="M0-200V-365M-220-50L-390-170M220-50L390-170" stroke="#dce5ec" stroke-width="10"/></g>',
    "artemis2": '<circle cx="1130" cy="380" r="260" fill="#919eab"/><path d="M0 790Q420 690 830 790T1600 750V1000H0Z" fill="#384758"/><g transform="translate(665 475) rotate(-16)"><path d="M0-180L-74-30L-55 125H55L74-30Z" fill="#e4e7e8" stroke="#8999a5" stroke-width="12"/><ellipse cy="-35" rx="53" ry="32" fill="#253f54"/><path d="M-55 125L-105 195H105L55 125Z" fill="#cda969"/></g>',
    "roman": '<g transform="translate(820 455) rotate(-12)"><ellipse cy="-20" rx="170" ry="185" fill="#aebbc6" stroke="#6d8497" stroke-width="15"/><ellipse cy="-35" rx="108" ry="120" fill="#1c3146" stroke="#dbe3e8" stroke-width="18"/><path d="M-155 80L-330 230L-280 275L-100 120M155 80L330 230L280 275L100 120" fill="#ad8246"/><path d="M-425-120H-165V-50H-425ZM165-120H425V-50H165Z" fill="#4e7a9a" stroke="#d0dce6" stroke-width="8"/></g>',
    "mmx": '<circle cx="1050" cy="470" r="245" fill="#b95337"/><circle cx="675" cy="280" r="72" fill="#83898b"/><path d="M675 205Q750 170 770 260Q740 340 670 345Q600 315 605 250Z" fill="#525c64"/><g transform="translate(350 475) rotate(-18)"><rect x="-75" y="-55" width="150" height="110" rx="16" fill="#d8bf80"/><path d="M-80-18L-250-120L-250-60L-80 20M80-18L250-120L250-60L80 20" fill="#547e9b" stroke="#c9d9e5" stroke-width="8"/><path d="M0-55V-230" stroke="#e1e7ec" stroke-width="10"/></g>',
    "voyager-lightday": '<path d="M120 800Q480 560 900 385T1510 120" fill="none" stroke="#d6a75b" stroke-width="5" stroke-dasharray="12 20"/><g transform="translate(900 450) rotate(-18)"><ellipse rx="92" ry="58" fill="#c39750"/><path d="M-75-15L-285-190L-250-230L-25-60M75 15L285 190L250 230L25 60" fill="#d2af6a"/><ellipse rx="225" ry="160" fill="none" stroke="#dbe5eb" stroke-width="9"/><path d="M0-60V-350M0-350L90-405" stroke="#dbe5eb" stroke-width="10"/></g>'
  };

  const makeFallbackImage = scene => {
    const stars = Array.from({ length: 56 }, (_, i) => {
      const x = (i * 173 + 61) % 1600;
      const y = (i * 97 + 31) % 1000;
      return '<circle cx="' + x + '" cy="' + y + '" r="' + (i % 8 === 0 ? 3 : 1.5) + '" fill="#dce8f2" opacity=".62"/>';
    }).join("");
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="space" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#13233a"/><stop offset=".6" stop-color="#080e1a"/><stop offset="1" stop-color="#02050b"/></linearGradient><radialGradient id="halo"><stop stop-color="#6b9bbb" stop-opacity=".34"/><stop offset="1" stop-color="#6b9bbb" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="1000" fill="url(#space)"/><ellipse cx="790" cy="520" rx="760" ry="520" fill="url(#halo)"/>' + stars + (fallbackArt[scene] || fallbackArt["voyager-pair"]) + '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };

  const imagePromises = new Map();

  const loadImage = url => {
    if (imagePromises.has(url)) return imagePromises.get(url);
    const promise = new Promise(resolve => {
      const image = new Image();
      let settled = false;
      const finish = loaded => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        resolve(loaded);
      };
      const timeout = window.setTimeout(() => finish(false), 8000);
      image.decoding = "async";
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = url;
      if (image.complete) finish(image.naturalWidth > 0);
    });
    imagePromises.set(url, promise);
    return promise;
  };

  const loadSceneImage = async scene => {
    for (const url of sceneAssets[scene] || []) {
      if (await loadImage(url)) return url;
    }
    return "";
  };

  let activeLayer = 0;
  let activeIndex = -1;
  let lastScrollY = window.scrollY;
  let lastFrameTime = 0;
  let scrollVelocity = 0;
  let ticking = false;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasContext = null;
  let starData = [];
  let starTravel = 0;
  let starCameraX = 0;
  let lastStarFrame = 0;
  let starAnimationFrame = 0;
  let cosmosVisible = false;

  let sceneTransitionId = 0;

  const setLayerScene = async (layer, scene) => {
    if (!layer) return false;
    const fallback = layer.querySelector(".journey-scene-fallback");
    const photo = layer.querySelector(".journey-scene-photo");
    if (!fallback || !photo) return false;

    layer.dataset.scene = scene;
    layer.classList.remove("has-photo");
    photo.onload = null;
    photo.onerror = null;
    photo.removeAttribute("src");
    fallback.src = makeFallbackImage(scene);

    const url = await loadSceneImage(scene);
    if (layer.dataset.scene !== scene) return false;
    if (!url) return true;

    const imageReady = new Promise(resolve => {
      let settled = false;
      const finish = loaded => {
        if (settled) return;
        settled = true;
        photo.onload = null;
        photo.onerror = null;
        resolve(loaded);
      };
      photo.onload = () => finish(true);
      photo.onerror = () => finish(false);
      photo.src = url;
      if (photo.complete) finish(photo.naturalWidth > 0);
    });

    let loaded = await imageReady;
    if (loaded && typeof photo.decode === "function") {
      try {
        await photo.decode();
      } catch {
        loaded = photo.complete && photo.naturalWidth > 0;
      }
    }
    if (layer.dataset.scene !== scene) return false;
    if (loaded && photo.complete && photo.naturalWidth > 0) layer.classList.add("has-photo");
    return true;
  };

  const preloadNearbyScenes = index => {
    [index - 1, index + 1].forEach(neighborIndex => {
      const neighbor = entries[neighborIndex];
      if (neighbor) loadSceneImage(neighbor.dataset.scene || "");
    });
  };

  const activateMission = index => {
    if (index < 0 || index >= entries.length || index === activeIndex) return;
    activeIndex = index;
    const transitionId = ++sceneTransitionId;
    const entry = entries[index];
    const scene = entry.dataset.scene || "sputnik";
    const nextLayerIndex = 1 - activeLayer;
    const nextLayer = sceneLayers[nextLayerIndex];
    const previousLayer = sceneLayers[activeLayer];

    entries.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    if (hudIndex) hudIndex.textContent = pad(index + 1);
    if (hudTitle) hudTitle.textContent = (entry.dataset.title || "").toUpperCase();
    if (hudYear) hudYear.textContent = (entry.dataset.year || "").replace(/[^0-9]/g, "").slice(-4);
    if (hudProgress) hudProgress.style.width = ((index + 1) / entries.length * 100) + "%";

    if (nextLayer) {
      nextLayer.classList.remove("is-visible");
      setLayerScene(nextLayer, scene).then(ready => {
        if (!ready || transitionId !== sceneTransitionId || activeIndex !== index) return;
        requestAnimationFrame(() => {
          if (transitionId !== sceneTransitionId || activeIndex !== index) return;
          nextLayer.classList.add("is-visible");
          if (previousLayer) previousLayer.classList.remove("is-visible");
          activeLayer = nextLayerIndex;
        });
      });
    }
    preloadNearbyScenes(index);
  };

  const resizeStarfield = () => {
    if (!starCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    const rect = starCanvas.getBoundingClientRect();
    canvasWidth = Math.max(1, Math.round(rect.width));
    canvasHeight = Math.max(1, Math.round(rect.height));
    starCanvas.width = Math.round(canvasWidth * dpr);
    starCanvas.height = Math.round(canvasHeight * dpr);
    canvasContext = starCanvas.getContext("2d", { alpha: true });
    if (!canvasContext) return;
    canvasContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    starData = Array.from({ length: 190 }, (_, index) => {
      const seed = index + 1;
      return {
        x: (seed * 127.1 % 997) / 997,
        y: (seed * 311.7 % 991) / 991,
        depth: 0.18 + (seed % 7) / 4,
        radius: seed % 11 === 0 ? 1.7 : seed % 4 === 0 ? 1.15 : 0.65,
        phase: seed * 1.91,
        drift: ((seed % 9) - 4) * 0.24
      };
    });
  };

  const drawStarfield = (travel, velocity, time = 0, cameraOffsetX = 0) => {
    if (!canvasContext || !canvasWidth || !canvasHeight) return;
    const ctx = canvasContext;
    const seconds = reducedMotion ? 0 : time * 0.001;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const warp = reducedMotion ? 0 : clamp(velocity / 24, 0, 1);
    for (const star of starData) {
      const depth = star.depth;
      const rawY = star.y * canvasHeight + travel * depth * 1.7 + seconds * depth * 0.62;
      const y = ((rawY % (canvasHeight + 80)) + (canvasHeight + 80)) % (canvasHeight + 80) - 40;
      const driftX = reducedMotion ? 0 : Math.cos(seconds * 0.12 + star.phase) * 7 * depth;
      const x = star.x * canvasWidth + Math.sin(travel * 0.0008 + star.phase) * 22 * depth + cameraOffsetX * depth * 0.075 + driftX;
      const twinkle = reducedMotion ? 1 : 0.68 + (Math.sin(seconds * 1.35 + star.phase) + 1) * 0.16;
      const alpha = (0.3 + Math.min(depth * 0.19, 0.55)) * twinkle;
      const streak = warp * (8 + depth * 86);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + star.drift * streak * 0.38, y + streak);
      ctx.strokeStyle = "rgba(208,229,255," + alpha + ")";
      ctx.lineWidth = star.radius * (warp > 0.12 ? 1.15 : 1);
      ctx.stroke();
      if (warp < 0.25) {
        ctx.beginPath();
        ctx.arc(x, y, star.radius * (0.8 + depth * 0.28), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(235,245,255," + (alpha + 0.08) + ")";
        ctx.fill();
      }
    }
    if (!reducedMotion) {
      const meteorPeriod = 14200;
      const cycle = Math.floor(time / meteorPeriod);
      const progress = (time % meteorPeriod) / meteorPeriod;
      if (progress < 0.085) {
        const flight = progress / 0.085;
        const sx = canvasWidth * (0.12 + (cycle * 23 % 58) / 100);
        const sy = canvasHeight * (0.12 + (cycle * 13 % 38) / 100);
        const x = sx + flight * canvasWidth * 0.34;
        const y = sy + flight * canvasHeight * 0.2;
        const tail = 120 * (1 - flight * 0.35);
        const gradient = ctx.createLinearGradient(x - tail, y - tail * 0.58, x, y);
        gradient.addColorStop(0, "rgba(151,205,255,0)");
        gradient.addColorStop(0.72, "rgba(151,205,255,0.13)");
        gradient.addColorStop(1, "rgba(235,248,255,0.9)");
        ctx.beginPath();
        ctx.moveTo(x - tail, y - tail * 0.58);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239,249,255," + (0.25 + Math.sin(flight * Math.PI) * 0.75) + ")";
        ctx.fill();
      }
    }
  };

  const stopStarfieldAnimation = () => {
    if (starAnimationFrame) cancelAnimationFrame(starAnimationFrame);
    starAnimationFrame = 0;
  };
  const animateStarfield = timestamp => {
    starAnimationFrame = 0;
    if (!cosmosVisible || document.hidden || reducedMotion) return;
    if (timestamp - lastStarFrame >= 40) {
      drawStarfield(starTravel, scrollVelocity, timestamp, starCameraX);
      lastStarFrame = timestamp;
    }
    starAnimationFrame = requestAnimationFrame(animateStarfield);
  };
  const setCosmosVisibility = visible => {
    cosmosVisible = visible;
    if (visible && !document.hidden && !reducedMotion) {
      if (!starAnimationFrame) starAnimationFrame = requestAnimationFrame(animateStarfield);
    } else stopStarfieldAnimation();
  };
  if (journey && !reducedMotion && "IntersectionObserver" in window) {
    const cosmosObserver = new IntersectionObserver(changes => {
      setCosmosVisibility(changes.some(change => change.isIntersecting));
    }, { rootMargin: "120px 0px" });
    cosmosObserver.observe(journey);
  } else setCosmosVisibility(Boolean(journey) && !reducedMotion);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopStarfieldAnimation();
    else setCosmosVisibility(cosmosVisible);
  });
  const updateFlight = () => {
    if (!journey || !entries.length) return;
    const viewportHeight = window.innerHeight || 1;
    const viewportWidth = window.innerWidth || 1;
    const focusY = viewportHeight * 0.5;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    let activeRect = null;
    entries.forEach((entry, index) => {
      const rect = entry.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height * 0.5 - focusY);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
        activeRect = rect;
      }
      if (rect.bottom > -viewportHeight && rect.top < viewportHeight * 2) {
        const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
        const reveal = clamp(Math.min(progress * 2.6, (1 - progress) * 2.6), 0, 1);
        entry.style.setProperty("--chapter-reveal", reveal.toFixed(3));
        entry.style.setProperty("--chapter-lift", ((0.5 - progress) * 150).toFixed(1) + "px");
      }
    });
    activateMission(nearestIndex);
    const rect = activeRect || entries[nearestIndex].getBoundingClientRect();
    const p = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
    const curve = Math.sin(p * Math.PI * 2 + nearestIndex * 0.83);
    const curveTwo = Math.cos(p * Math.PI * 2 + nearestIndex * 0.61);
    const travelX = curve * viewportWidth * 0.29;
    const travelY = (0.5 - p) * viewportHeight * 1.18;
    const zoom = 1.12 + p * 1.18;
    const rotation = curveTwo * 5.8;
    const ringTravel = (p - 0.5) * viewportHeight * 1.55;
    if (stage && !reducedMotion) {
      stage.style.setProperty("--camera-x", travelX.toFixed(1) + "px");
      stage.style.setProperty("--camera-y", travelY.toFixed(1) + "px");
      stage.style.setProperty("--camera-zoom", zoom.toFixed(3));
      stage.style.setProperty("--camera-rotation", rotation.toFixed(2) + "deg");
      stage.style.setProperty("--nebula-x", (-travelX * 0.78).toFixed(1) + "px");
      stage.style.setProperty("--nebula-y", (-travelY * 0.72).toFixed(1) + "px");
      stage.style.setProperty("--orbit-x", (curveTwo * viewportWidth * 0.48).toFixed(1) + "px");
      stage.style.setProperty("--orbit-y", ringTravel.toFixed(1) + "px");
      stage.style.setProperty("--orbit-rotation", (nearestIndex * 43 + p * 260).toFixed(1) + "deg");
      stage.style.setProperty("--lens-x", (viewportWidth * (0.5 + curve * 0.32)).toFixed(1) + "px");
      stage.style.setProperty("--lens-y", (viewportHeight * (0.42 + curveTwo * 0.26)).toFixed(1) + "px");
      stage.style.setProperty("--warp-intensity", clamp(scrollVelocity / 28, 0, 1).toFixed(3));
    }
    const sectionTop = journey.getBoundingClientRect().top + window.scrollY;
    const distanceTravelled = window.scrollY - sectionTop;
    starTravel = distanceTravelled + p * viewportHeight;
    starCameraX = travelX;
    if (reducedMotion) drawStarfield(starTravel, 0, 0, starCameraX);
    if (hudProgress) hudProgress.style.width = ((nearestIndex + p) / entries.length * 100) + "%";
    if (hudIndex) hudIndex.textContent = pad(nearestIndex + 1);
  };

  const updateScroll = timestamp => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    const elapsed = Math.max(8, timestamp - (lastFrameTime || timestamp - 16));
    scrollVelocity = reducedMotion ? 0 : Math.min(160, Math.abs(delta) * (16 / elapsed));
    lastScrollY = currentY;
    lastFrameTime = timestamp;
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? currentY / scrollable * 100 : 0;
      progressBar.style.width = clamp(progress, 0, 100) + "%";
    }
    updateFlight();
    ticking = false;
  };

  const scheduleScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  if (stage && entries.length) {
    resizeStarfield();
    activeIndex = 0;
    setLayerScene(sceneLayers[0], entries[0].dataset.scene || "sputnik");
    preloadNearbyScenes(0);
    window.addEventListener("resize", () => {
      resizeStarfield();
      scheduleScrollUpdate();
    }, { passive: true });
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    updateFlight();
  }

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