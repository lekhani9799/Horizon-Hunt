
"use strict";

/*
  Horizon Hunt — DEMO MVP
  All listings and application addresses are fictional placeholders.
  Replace DEMO_OPPORTUNITIES with verified data before public launch.
*/

const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "horizon-hunt-saved-v1";

const CATEGORY_NAMES = {
  hackathon: "Hackathon",
  competition: "Competition",
  research: "Research",
  scholarship: "Scholarship",
  workshop: "Workshop"
};

const DEMO_OPPORTUNITIES = [
  {
    id: "demo-01",
    title: "Future Builders Hackathon",
    provider: "Fictional demo organizer",
    category: "hackathon",
    icon: "⌘",
    art: "art-purple",
    daysUntilDeadline: 4,
    addedAt: "2026-10-10",
    eligibility: "Illustrative eligibility: school and college students.",
    description: "A fictional hackathon concept for students exploring software, AI and creative technology.",
    about: "This sample listing demonstrates how a student-focused hackathon could appear on Opportunity Radar. The event, organizer and deadline are invented for the interface demo.",
    skills: "Coding, teamwork, problem-solving",
    link: "https://example.com"
  },
  {
    id: "demo-02",
    title: "Young Innovators Challenge",
    provider: "Fictional demo organizer",
    category: "competition",
    icon: "⚡",
    art: "art-orange",
    daysUntilDeadline: 12,
    addedAt: "2026-10-12",
    eligibility: "Illustrative eligibility: students aged 14–19.",
    description: "A fictional challenge focused on identifying everyday problems and proposing practical solutions.",
    about: "This example demonstrates a competition card with eligibility details, a deadline and a longer description. It is not an announced or verified competition.",
    skills: "Innovation, research, presentation",
    link: "https://example.com"
  },
  {
    id: "demo-03",
    title: "Student Research Explorer",
    provider: "Fictional demo organizer",
    category: "research",
    icon: "⌕",
    art: "art-blue",
    daysUntilDeadline: 25,
    addedAt: "2026-10-08",
    eligibility: "Illustrative eligibility: senior school and undergraduate students.",
    description: "A fictional research experience concept for students interested in science and emerging technology.",
    about: "This placeholder illustrates how research opportunities can be described and organized for students. No real institution or research placement is represented.",
    skills: "Scientific thinking, writing, curiosity",
    link: "https://example.com"
  },
  {
    id: "demo-04",
    title: "Future Scholars Award",
    provider: "Fictional demo organizer",
    category: "scholarship",
    icon: "✧",
    art: "art-green",
    daysUntilDeadline: 38,
    addedAt: "2026-10-11",
    eligibility: "Illustrative eligibility: students pursuing further education.",
    description: "A fictional scholarship example demonstrating how financial-support opportunities could be listed.",
    about: "This card is a UI placeholder only. It does not represent a real scholarship, funding amount, application process or selection committee.",
    skills: "Academic planning, applications",
    link: "https://example.com"
  },
  {
    id: "demo-05",
    title: "Creative Minds Design Sprint",
    provider: "Fictional demo organizer",
    category: "workshop",
    icon: "✎",
    art: "art-pink",
    daysUntilDeadline: 7,
    addedAt: "2026-10-09",
    eligibility: "Illustrative eligibility: students interested in design.",
    description: "A fictional short workshop concept exploring design thinking, prototypes and visual communication.",
    about: "This placeholder demonstrates a workshop listing. The date, provider and workshop itself are fictional and should not be treated as a real event.",
    skills: "Design, creativity, prototyping",
    link: "https://example.com"
  },
  {
    id: "demo-06",
    title: "NextGen Science Challenge",
    provider: "Fictional demo organizer",
    category: "competition",
    icon: "✦",
    art: "art-yellow",
    daysUntilDeadline: 18,
    addedAt: "2026-10-07",
    eligibility: "Illustrative eligibility: secondary school students.",
    description: "A fictional science challenge for students interested in physics, engineering and experimentation.",
    about: "This demo entry shows how a subject-focused competition could be presented. It is not an official science event or verified application opportunity.",
    skills: "Physics, engineering, experimentation",
    link: "https://example.com"
  },
  {
    id: "demo-07",
    title: "Open Source Starter Sprint",
    provider: "Fictional demo organizer",
    category: "hackathon",
    icon: "⌘",
    art: "art-purple",
    daysUntilDeadline: 55,
    addedAt: "2026-10-06",
    eligibility: "Illustrative eligibility: beginner and intermediate student developers.",
    description: "A fictional beginner-friendly project sprint exploring collaborative software development.",
    about: "This sample demonstrates a longer-deadline opportunity. It is not connected to any real open-source organization or project.",
    skills: "Programming, Git, collaboration",
    link: "https://example.com"
  },
  {
    id: "demo-08",
    title: "Independent Learning Lab",
    provider: "Fictional demo organizer",
    category: "research",
    icon: "⌕",
    art: "art-blue",
    daysUntilDeadline: null,
    addedAt: "2026-10-13",
    eligibility: "Illustrative eligibility: curious school and college students.",
    description: "A fictional self-directed learning program concept for exploring questions and documenting findings.",
    about: "This sample has no deadline to demonstrate how the dashboard handles entries without a listed closing date. The program is fictional.",
    skills: "Independent learning, documentation",
    link: "https://example.com"
  }
];

// The dates are generated relative to the current day so demo deadlines
// continue to exercise the urgency system when the project is revisited.
const opportunities = DEMO_OPPORTUNITIES.map(item => ({
  ...item,
  deadline: item.daysUntilDeadline === null
    ? null
    : dateAfterDays(item.daysUntilDeadline)
}));

function dateAfterDays(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const elements = {
  grid: document.getElementById("opportunityGrid"),
  search: document.getElementById("searchInput"),
  searchForm: document.getElementById("searchForm"),
  categoryFilter: document.getElementById("categoryFilter"),
  deadlineFilter: document.getElementById("deadlineFilter"),
  sortFilter: document.getElementById("sortFilter"),
  clearFilters: document.getElementById("clearFilters"),
  emptyReset: document.getElementById("emptyReset"),
  emptyState: document.getElementById("emptyState"),
  emptyTitle: document.getElementById("emptyTitle"),
  emptyMessage: document.getElementById("emptyMessage"),
  resultsCount: document.getElementById("resultsCount"),
  totalStat: document.getElementById("totalStat"),
  closingStat: document.getElementById("closingStat"),
  savedStat: document.getElementById("savedStat"),
  savedNavCount: document.getElementById("savedNavCount"),
  sectionTitle: document.getElementById("sectionTitle"),
  sectionSubtitle: document.getElementById("sectionSubtitle"),
  breadcrumbPage: document.getElementById("breadcrumbPage"),
  modal: document.getElementById("opportunityModal"),
  modalPanel: document.querySelector(".modal-panel"),
  modalClose: document.getElementById("modalClose"),
  modalTitle: document.getElementById("modalTitle"),
  modalCategory: document.getElementById("modalCategory"),
  modalUrgency: document.getElementById("modalUrgency"),
  modalProvider: document.getElementById("modalProvider"),
  modalDescription: document.getElementById("modalDescription"),
  modalDeadline: document.getElementById("modalDeadline"),
  modalEligibility: document.getElementById("modalEligibility"),
  modalAbout: document.getElementById("modalAbout"),
  modalSave: document.getElementById("modalSave"),
  modalApply: document.getElementById("modalApply"),
  toast: document.getElementById("toast"),
  sidebar: document.getElementById("sidebar"),
  mobileMenu: document.getElementById("mobileMenu")
};

let currentView = "discover";
let activeOpportunityId = null;
let previouslyFocusedElement = null;
let toastTimer = null;
let savedIds = loadSavedIds();

function loadSavedIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored)) {
      return new Set(stored.filter(id =>
        opportunities.some(item => item.id === id)
      ));
    }
  } catch (error) {
    console.warn("Saved items could not be loaded from this browser.");
  }
  return new Set();
}

function persistSavedIds() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedIds]));
    return true;
  } catch (error) {
    showToast("Browser storage is unavailable. Your changes may not persist.");
    return false;
  }
}

function getDaysLeft(deadline) {
  if (!deadline) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(`${deadline}T00:00:00`);
  if (Number.isNaN(end.getTime())) return null;

  return Math.round((end.getTime() - today.getTime()) / DAY_MS);
}

function formatDate(deadline) {
  if (!deadline) return "No deadline listed";

  const date = new Date(`${deadline}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Date not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function getUrgency(deadline) {
  const days = getDaysLeft(deadline);

  if (days === null) {
    return { label: "No deadline", className: "no-deadline" };
  }
  if (days < 0) {
    return { label: "Deadline passed", className: "urgent" };
  }
  if (days === 0) {
    return { label: "Closes today", className: "urgent" };
  }
  if (days <= 7) {
    return { label: `${days} day${days === 1 ? "" : "s"} left`, className: "urgent" };
  }
  if (days <= 14) {
    return { label: `${days} days left`, className: "soon" };
  }
  return { label: "Open for longer", className: "open" };
}

function getDeadlineDescription(deadline) {
  const days = getDaysLeft(deadline);

  if (days === null) return "Deadline not listed";
  if (days < 0) return "Demo deadline has passed";
  if (days === 0) return "Demo deadline is today";
  if (days === 1) return "1 day remaining";
  return `${days} days remaining`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getFilteredOpportunities() {
  const query = elements.search.value.trim().toLowerCase();
  const category = elements.categoryFilter.value;
  const deadlineRange = elements.deadlineFilter.value;

  let results = opportunities.filter(item => {
    const searchableText = [
      item.title,
      item.provider,
      item.category,
      item.description,
      item.eligibility,
      item.skills
    ].join(" ").toLowerCase();

    if (query && !searchableText.includes(query)) return false;
    if (category !== "all" && item.category !== category) return false;

    if (currentView === "saved" && !savedIds.has(item.id)) return false;

    const days = getDaysLeft(item.deadline);

    if (deadlineRange === "no-date" && item.deadline !== null) return false;
    if (deadlineRange === "7" && (days === null || days < 0 || days > 7)) return false;
    if (deadlineRange === "30" && (days === null || days < 0 || days > 30)) return false;
    if (deadlineRange === "upcoming" && (days === null || days <= 30)) return false;

    return true;
  });

  const sortBy = elements.sortFilter.value;

  results.sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "newest") {
      return b.addedAt.localeCompare(a.addedAt) ||
        a.title.localeCompare(b.title);
    }

    const daysA = getDaysLeft(a.deadline);
    const daysB = getDaysLeft(b.deadline);

    // Items with a known deadline appear before items without one.
    if (daysA === null && daysB !== null) return 1;
    if (daysA !== null && daysB === null) return -1;
    if (daysA === null && daysB === null) return a.title.localeCompare(b.title);

    return daysA - daysB || a.title.localeCompare(b.title);
  });

  return results;
}

function createCard(item) {
  const urgency = getUrgency(item.deadline);
  const saved = savedIds.has(item.id);

  return `
    <article class="opportunity-card">
      <div class="card-top">
        <div class="card-art ${escapeHTML(item.art)}" aria-hidden="true">${escapeHTML(item.icon)}</div>
        <button
          class="save-button ${saved ? "saved" : ""}"
          type="button"
          data-action="save"
          data-id="${escapeHTML(item.id)}"
          aria-pressed="${saved}"
          aria-label="${saved ? "Unsave" : "Save"} ${escapeHTML(item.title)}"
          title="${saved ? "Remove from saved" : "Save opportunity"}"
        >${saved ? "♥" : "♡"}</button>
      </div>

      <div class="card-badges">
        <span class="category-badge" data-category="${escapeHTML(item.category)}">
          ${escapeHTML(CATEGORY_NAMES[item.category])}
        </span>
        <span class="urgency-badge ${urgency.className}">
          ${escapeHTML(urgency.label)}
        </span>
      </div>

      <h3 class="card-title">${escapeHTML(item.title)}</h3>
      <p class="card-provider">${escapeHTML(item.provider)} · Fictional demo</p>
      <p class="card-description">${escapeHTML(item.description)}</p>

      <div class="card-bottom">
        <span class="deadline-text">◷ ${escapeHTML(formatDate(item.deadline))}</span>
        <button
          class="details-button"
          type="button"
          data-action="details"
          data-id="${escapeHTML(item.id)}"
          aria-label="View details for ${escapeHTML(item.title)}"
        >View details →</button>
      </div>
    </article>
  `;
}

function renderOpportunities() {
  const results = getFilteredOpportunities();

  elements.grid.innerHTML = results.map(createCard).join("");
  elements.emptyState.hidden = results.length > 0;
  elements.grid.hidden = results.length === 0;

  if (results.length === 0) {
    if (currentView === "saved" && savedIds.size === 0) {
      elements.emptyTitle.textContent = "Nothing saved yet";
      elements.emptyMessage.textContent =
        "Use the heart button on any demo opportunity to save it here.";
    } else {
      elements.emptyTitle.textContent = "No matching opportunities";
      elements.emptyMessage.textContent =
        "Try another keyword, deadline range or category.";
    }
  }

  elements.resultsCount.textContent =
    `${results.length} ${results.length === 1 ? "opportunity" : "opportunities"} found`;

  elements.sectionTitle.textContent =
    currentView === "saved" ? "Your saved opportunities" : "Explore opportunities";

  elements.sectionSubtitle.textContent =
    currentView === "saved"
      ? "Your saved demo listings in one place."
      : "Find a challenge worth taking on.";

  elements.breadcrumbPage.textContent =
    currentView === "saved" ? "Saved" : "Discover";

  document.querySelectorAll("[data-view]").forEach(button => {
    const active = button.dataset.view === currentView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });

  document.querySelectorAll(".chip").forEach(button => {
    const active = button.dataset.category === elements.categoryFilter.value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updateStats();
}

function updateStats() {
  const closingSoon = opportunities.filter(item => {
    const days = getDaysLeft(item.deadline);
    return days !== null && days >= 0 && days <= 7;
  }).length;

  elements.totalStat.textContent = opportunities.length;
  elements.closingStat.textContent = closingSoon;
  elements.savedStat.textContent = savedIds.size;
  elements.savedNavCount.textContent = savedIds.size;
}

function setCategory(category) {
  elements.categoryFilter.value = category;
  renderOpportunities();
}

function clearFilters() {
  elements.search.value = "";
  elements.categoryFilter.value = "all";
  elements.deadlineFilter.value = "all";
  elements.sortFilter.value = "deadline";
  renderOpportunities();
}

function toggleSaved(id) {
  const item = opportunities.find(opportunity => opportunity.id === id);
  if (!item) return;

  if (savedIds.has(id)) {
    savedIds.delete(id);
    persistSavedIds();
    showToast("Removed from saved opportunities.");
  } else {
    savedIds.add(id);
    persistSavedIds();
    showToast("Opportunity saved in this browser.");
  }

  renderOpportunities();

  if (activeOpportunityId === id && !elements.modal.hidden) {
    updateModalSaveButton();
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.hidden = true;
  }, 2600);
}

function openModal(id, triggerElement) {
  const item = opportunities.find(opportunity => opportunity.id === id);
  if (!item) return;

  activeOpportunityId = id;
  previouslyFocusedElement = triggerElement || document.activeElement;

  const urgency = getUrgency(item.deadline);

  elements.modalCategory.textContent = CATEGORY_NAMES[item.category];
  elements.modalCategory.dataset.category = item.category;
  elements.modalUrgency.textContent = urgency.label;
  elements.modalUrgency.className = `urgency-badge ${urgency.className}`;
  elements.modalTitle.textContent = item.title;
  elements.modalProvider.textContent = `${item.provider} · Fictional demo listing`;
  elements.modalDescription.textContent = item.description;
  elements.modalDeadline.textContent = formatDate(item.deadline);
  elements.modalEligibility.textContent = item.eligibility;
  elements.modalAbout.textContent = item.about;

  // Never send users to a fake application destination.
  elements.modalApply.href = "#";
  elements.modalApply.textContent = "Demo link only ↗";
  elements.modalApply.setAttribute("aria-disabled", "true");
  elements.modalApply.setAttribute(
    "aria-label",
    "Not a real application link. This is a fictional demo listing."
  );

  updateModalSaveButton();

  elements.modal.hidden = false;
  document.body.style.overflow = "hidden";
  elements.modalPanel.focus();
}

function closeModal() {
  if (elements.modal.hidden) return;

  elements.modal.hidden = true;
  document.body.style.overflow = "";
  activeOpportunityId = null;

  if (previouslyFocusedElement && document.contains(previouslyFocusedElement)) {
    previouslyFocusedElement.focus();
  }

  previouslyFocusedElement = null;
}

function updateModalSaveButton() {
  if (!activeOpportunityId) return;

  const saved = savedIds.has(activeOpportunityId);
  elements.modalSave.textContent = saved ? "♥ Unsave opportunity" : "♡ Save opportunity";
  elements.modalSave.setAttribute("aria-pressed", String(saved));
}

function trapModalFocus(event) {
  if (event.key !== "Tab" || elements.modal.hidden) return;

  const focusable = [
    ...elements.modalPanel.querySelectorAll(
      'button:not([disabled]), a[href]:not([aria-disabled="true"]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ].filter(element => element.offsetParent !== null);

  if (focusable.length === 0) {
    event.preventDefault();
    elements.modalPanel.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function toggleMobileMenu() {
  const isOpen = elements.sidebar.classList.toggle("open");
  elements.mobileMenu.setAttribute("aria-expanded", String(isOpen));
  elements.mobileMenu.textContent = isOpen ? "×" : "☰";
  elements.mobileMenu.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
}

function closeMobileMenu() {
  elements.sidebar.classList.remove("open");
  elements.mobileMenu.setAttribute("aria-expanded", "false");
  elements.mobileMenu.textContent = "☰";
  elements.mobileMenu.setAttribute("aria-label", "Open navigation");
}

// Search and filters
elements.search.addEventListener("input", renderOpportunities);
elements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  renderOpportunities();
  elements.grid.scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.categoryFilter.addEventListener("change", renderOpportunities);
elements.deadlineFilter.addEventListener("change", renderOpportunities);
elements.sortFilter.addEventListener("change", renderOpportunities);

elements.clearFilters.addEventListener("click", clearFilters);
elements.emptyReset.addEventListener("click", clearFilters);

// Quick category buttons
document.querySelectorAll(".chip").forEach(button => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

// Sidebar navigation
document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    currentView = button.dataset.view;
    closeMobileMenu();
    renderOpportunities();
    document.querySelector(".catalogue-section").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Event delegation keeps buttons working after cards are re-rendered.
elements.grid.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;

  if (button.dataset.action === "save") {
    toggleSaved(id);
  } else if (button.dataset.action === "details") {
    openModal(id, button);
  }
});

// Modal interactions
elements.modalClose.addEventListener("click", closeModal);

elements.modal.addEventListener("click", event => {
  if (event.target === elements.modal) closeModal();
});

elements.modalSave.addEventListener("click", () => {
  if (activeOpportunityId) toggleSaved(activeOpportunityId);
});

elements.modalApply.addEventListener("click", event => {
  // Prevent accidental navigation to the example URL.
  event.preventDefault();
  showToast("Demo only: replace this with a verified official application URL.");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!elements.modal.hidden) {
      closeModal();
    } else if (elements.sidebar.classList.contains("open")) {
      closeMobileMenu();
      elements.mobileMenu.focus();
    }
  }

  trapModalFocus(event);
});

// Mobile navigation
elements.mobileMenu.addEventListener("click", toggleMobileMenu);

document.addEventListener("click", event => {
  if (
    elements.sidebar.classList.contains("open") &&
    !elements.sidebar.contains(event.target) &&
    !elements.mobileMenu.contains(event.target)
  ) {
    closeMobileMenu();
  }
});

// Recalculate urgency when the page becomes active again.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) renderOpportunities();
});

// Initial page render
elements.toast.hidden = true;
renderOpportunities();