const STORAGE_KEY = "note-app";
const NOTE_COLORS = ["lavender", "peach", "mint", "blue", "cream"];

const elements = {
  app: document.getElementById("notes-grid"),
  template: document.getElementById("note-template"),
  createButton: document.getElementById("create-note"),
  emptyCreate: document.getElementById("empty-create"),
  emptyState: document.getElementById("empty-state"),
  emptyTitle: document.getElementById("empty-title"),
  emptyDescription: document.getElementById("empty-description"),
  notesHeading: document.getElementById("notes-heading"),
  visibleCount: document.getElementById("visible-count"),
  allCount: document.getElementById("all-count"),
  pinnedCount: document.getElementById("pinned-count"),
  tabAllCount: document.getElementById("tab-all-count"),
  tabPinnedCount: document.getElementById("tab-pinned-count"),
  statTotal: document.getElementById("stat-total"),
  statPinned: document.getElementById("stat-pinned"),
  statWords: document.getElementById("stat-words"),
  search: document.getElementById("search-input"),
  sort: document.getElementById("sort-select"),
  viewToggle: document.getElementById("view-toggle"),
  dateLabel: document.getElementById("date-label"),
  sidebar: document.getElementById("sidebar"),
  menuToggle: document.getElementById("menu-toggle"),
  mobileScrim: document.getElementById("mobile-scrim"),
  toast: document.getElementById("toast"),
};

let activeFilter = "all";
let notes = loadNotes();
let toastTimeout = null;
let isListView = false;

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

function getWordCount(value) {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function isValidDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function loadNotes() {
  let stored;

  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("No se pudieron leer las notas guardadas.", error);
    return [];
  }

  if (!Array.isArray(stored)) {
    return [];
  }

  let needsMigration = false;
  const now = new Date().toISOString();

  const normalized = stored
    .filter((note) => note && typeof note === "object")
    .map((note, index) => {
      const color = NOTE_COLORS.includes(note.color) ? note.color : NOTE_COLORS[index % NOTE_COLORS.length];
      const content = typeof note.content === "string" ? note.content : "";
      const title = typeof note.title === "string" ? note.title : "";
      const id = note.id === undefined || note.id === null ? createId() : String(note.id);
      const createdAt = isValidDate(note.createdAt) ? note.createdAt : now;
      const updatedAt = isValidDate(note.updatedAt) ? note.updatedAt : createdAt;

      if (
        typeof note.id !== "string" ||
        typeof note.title !== "string" ||
        !NOTE_COLORS.includes(note.color) ||
        typeof note.pinned !== "boolean" ||
        !isValidDate(note.createdAt) ||
        !isValidDate(note.updatedAt)
      ) {
        needsMigration = true;
      }

      return {
        id,
        title,
        content,
        color,
        pinned: Boolean(note.pinned),
        createdAt,
        updatedAt,
      };
    });

  if (needsMigration) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      console.error("No se pudo actualizar el formato de las notas.", error);
    }
  }

  return normalized;
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error("No se pudieron guardar las notas.", error);
    showToast("No se pudo guardar. Revisá el espacio disponible.");
    return false;
  }
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "RECIÉN CREADA";

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  if (isToday) return "HOY";

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  }).format(date).replace(".", "").toUpperCase();
}

function updateDateLabel() {
  const today = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  elements.dateLabel.textContent = today.toLocaleUpperCase("es-AR");
}

function getVisibleNotes() {
  const query = elements.search.value.trim().toLocaleLowerCase("es-AR");
  const sortOrder = elements.sort.value;

  return notes
    .filter((note) => activeFilter !== "pinned" || note.pinned)
    .filter((note) => {
      if (!query) return true;
      return (note.title + " " + note.content).toLocaleLowerCase("es-AR").includes(query);
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
    });
}

function updateStats() {
  const pinned = notes.filter((note) => note.pinned).length;
  const words = notes.reduce((total, note) => total + getWordCount(note.title) + getWordCount(note.content), 0);

  elements.allCount.textContent = notes.length;
  elements.pinnedCount.textContent = pinned;
  elements.tabAllCount.textContent = notes.length;
  elements.tabPinnedCount.textContent = pinned;
  elements.statTotal.textContent = notes.length;
  elements.statPinned.textContent = pinned;
  elements.statWords.textContent = words.toLocaleString("es-AR");
}

function createNoteCard(note) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".note-card");
  const title = fragment.querySelector(".note-title");
  const body = fragment.querySelector(".note-body");
  const date = fragment.querySelector(".note-date");
  const pinButton = fragment.querySelector('[data-action="pin"]');

  card.dataset.id = note.id;
  card.dataset.color = note.color;
  title.value = note.title;
  body.value = note.content;
  date.textContent = formatDate(note.updatedAt);
  pinButton.classList.toggle("is-pinned", note.pinned);
  pinButton.setAttribute("aria-pressed", String(note.pinned));
  pinButton.setAttribute("aria-label", note.pinned ? "Desfijar nota" : "Fijar nota");
  pinButton.title = note.pinned ? "Desfijar nota" : "Fijar nota";

  fragment.querySelector(".note-word-count").textContent =
    getWordCount(note.content).toLocaleString("es-AR") + " PALABRAS";

  fragment.querySelectorAll(".color-dot").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.color === note.color));
  });

  return fragment;
}

function updateHeading() {
  const query = elements.search.value.trim();
  const heading = activeFilter === "pinned" ? "Notas fijadas" : "Todas las notas";
  elements.notesHeading.firstChild.textContent = heading + " ";

  if (query) {
    elements.emptyTitle.textContent = "No encontramos esa nota.";
    elements.emptyDescription.textContent = "Probá con otra palabra o frase para encontrar lo que buscás.";
  } else if (activeFilter === "pinned") {
    elements.emptyTitle.textContent = "Todavía no fijaste ninguna nota.";
    elements.emptyDescription.textContent = "Marcá una nota con el pin para tenerla siempre a mano.";
  } else {
    elements.emptyTitle.textContent = "Las buenas ideas empiezan acá.";
    elements.emptyDescription.textContent = "Creá tu primera nota y empezá a darle forma a tus pensamientos.";
  }
}

function renderNotes() {
  const visible = getVisibleNotes();
  const fragment = document.createDocumentFragment();

  visible.forEach((note) => fragment.appendChild(createNoteCard(note)));
  elements.app.replaceChildren(fragment);
  elements.app.classList.toggle("is-list", isListView);

  elements.visibleCount.textContent = visible.length;
  elements.emptyState.hidden = visible.length !== 0;
  updateHeading();
  updateStats();

  document.querySelectorAll("[data-filter]").forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));

    if (button.classList.contains("nav-item")) {
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2200);
}

function closeMobileMenu() {
  elements.sidebar.classList.remove("is-open");
  elements.menuToggle.setAttribute("aria-expanded", "false");
  elements.mobileScrim.hidden = true;
  document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  const shouldOpen = !elements.sidebar.classList.contains("is-open");
  elements.sidebar.classList.toggle("is-open", shouldOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  elements.mobileScrim.hidden = !shouldOpen;
  document.body.classList.toggle("menu-open", shouldOpen);
}

function addNote() {
  const now = new Date().toISOString();
  const note = {
    id: createId(),
    title: "",
    content: "",
    color: NOTE_COLORS[notes.length % NOTE_COLORS.length],
    pinned: false,
    createdAt: now,
    updatedAt: now,
  };

  notes.unshift(note);
  activeFilter = "all";
  elements.search.value = "";
  elements.sort.value = "newest";
  saveNotes();
  renderNotes();
  closeMobileMenu();

  const card = elements.app.querySelector('[data-id="' + CSS.escape(note.id) + '"]');
  const titleInput = card && card.querySelector(".note-title");
  if (titleInput) {
    titleInput.focus();
    showToast("Nueva nota lista para escribir.");
  }
}

function findNote(id) {
  return notes.find((note) => note.id === id);
}

function updateNoteFromInput(event) {
  const field = event.target.closest(".note-title, .note-body");
  if (!field) return;

  const card = field.closest(".note-card");
  if (!card) return;

  const note = findNote(card.dataset.id);
  if (!note) return;

  if (field.name === "title") note.title = field.value;
  if (field.name === "content") note.content = field.value;

  note.updatedAt = new Date().toISOString();
  saveNotes();

  const date = card.querySelector(".note-date");
  const count = card.querySelector(".note-word-count");
  if (date) date.textContent = "EDITADA AHORA";
  if (count) count.textContent = getWordCount(note.content).toLocaleString("es-AR") + " PALABRAS";
  updateStats();
}

function handleCardAction(event) {
  const button = event.target.closest("button[data-action], button[data-color]");
  if (!button) return;

  const card = button.closest(".note-card");
  if (!card) return;

  const note = findNote(card.dataset.id);
  if (!note) return;

  if (button.dataset.action === "pin") {
    note.pinned = !note.pinned;
    note.updatedAt = new Date().toISOString();
    saveNotes();
    renderNotes();
    showToast(note.pinned ? "Nota fijada." : "Nota desfijada.");
    return;
  }

  if (button.dataset.action === "delete") {
    const confirmed = window.confirm("¿Querés eliminar esta nota? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    notes = notes.filter((item) => item.id !== note.id);
    saveNotes();
    renderNotes();
    showToast("Nota eliminada.");
    return;
  }

  if (button.dataset.color) {
    note.color = button.dataset.color;
    note.updatedAt = new Date().toISOString();
    saveNotes();
    renderNotes();
    showToast("Color actualizado.");
  }
}

function handleFilter(event) {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeFilter = button.dataset.filter;
  renderNotes();
  closeMobileMenu();
}

elements.createButton.addEventListener("click", addNote);
elements.emptyCreate.addEventListener("click", addNote);
elements.app.addEventListener("input", updateNoteFromInput);
elements.app.addEventListener("click", handleCardAction);
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", handleFilter));

elements.search.addEventListener("input", renderNotes);
elements.sort.addEventListener("change", renderNotes);

elements.viewToggle.addEventListener("click", () => {
  isListView = !isListView;
  elements.app.classList.toggle("is-list", isListView);
  elements.viewToggle.setAttribute("aria-label", isListView ? "Cambiar a vista de cuadrícula" : "Cambiar a vista de lista");
  showToast(isListView ? "Vista de lista." : "Vista de cuadrícula.");
});

elements.menuToggle.addEventListener("click", toggleMobileMenu);
elements.mobileScrim.addEventListener("click", closeMobileMenu);

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const shortcut = event.metaKey || event.ctrlKey;

  if (shortcut && key === "k") {
    event.preventDefault();
    elements.search.focus();
  }

  if (shortcut && key === "n") {
    event.preventDefault();
    addNote();
  }

  if (event.key === "Escape") closeMobileMenu();
});

updateDateLabel();
renderNotes();
