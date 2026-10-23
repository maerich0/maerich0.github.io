document.documentElement.classList.add("js-enabled");

// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function closeMenu() {
  if (!menuToggle || !mobileNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  mobileNav.hidden = true;
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// PROJECT FILTERS
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(category) {
  projectCards.forEach((card) => {
    const matches =
      category === "all" ||
      card.dataset.category === category;

    card.classList.toggle("is-filtered", !matches);
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterProjects(button.dataset.filter);
  });
});

// ACTIVE NAVIGATION SECTION
const sections = document.querySelectorAll(
  "#projects, #activities, #about, #contact"
);

const desktopLinks = document.querySelectorAll(".desktop-nav a");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = `#${entry.target.id}`;

        [...desktopLinks, ...mobileLinks].forEach((link) => {
          if (link.getAttribute("href") === activeId) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
          } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// IMAGE LIGHTBOX (EXPAND IMAGE)
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.querySelector('.modal-close');
const projectImages = document.querySelectorAll('.project-image');

function openModal(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.offsetHeight; // Force reflow for transition
  modal.classList.add('is-open');
}

function closeModal() {
  modal.classList.remove('is-open');
  setTimeout(() => {
    modal.hidden = true;
    modalImg.src = '';
    document.body.style.overflow = '';
  }, 300);
}

projectImages.forEach(container => {
  container.addEventListener('click', () => {
    const img = container.querySelector('img');
    if (img) openModal(img.src, img.alt);
  });
  
  // Accessibility: Allow triggering with Enter key
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const img = container.querySelector('img');
      if (img) openModal(img.src, img.alt);
    }
  });
});

if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // Close when clicking outside image
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal(); // Close on Esc key
  });
}

// FALLBACK FOR BROWSERS WITHOUT SCROLL OBSERVATION
if (!("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}