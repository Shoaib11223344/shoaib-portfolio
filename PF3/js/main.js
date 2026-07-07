/**
 * Main portfolio JavaScript
 * Handles UI interactions, animations, and dynamic content rendering.
 */
(function () {
  "use strict";

  /* ─── Configuration ─── */
  const TYPING_PHRASES = [
    "AR/VR/MR/XR Engineer",
    "Spatial Computing Specialist",
    "Immersive Technologies Developer",
    "Computer Vision & AI Enthusiast"
  ];

  const TECH_CAROUSEL_ITEMS = [
    "Unity", "Unreal Engine", "OpenXR", "ARKit", "ARCore", "MRTK",
    "Apple Vision Pro", "Meta Quest", "WebXR", "Three.js", "Blender",
    "Python", "C#", "C++", "PyTorch", "TensorFlow", "OpenCV",
    "SLAM", "Computer Vision", "Spatial Audio", "Wwise", "FMOD",
    "Azure Spatial Anchors", "Photon", "Git", "Docker", "CI/CD"
  ];

  /* ─── DOM Ready ─── */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initLoader();
    initTheme();
    initNavigation();
    initTypingEffect();
    initScrollProgress();
    initBackToTop();
    initProjects();
    initTechCarousel();
    initIntersectionObserver();
    initContactForm();
    initGalleryLightbox();
    initVideoEmbeds();
    initCurrentYear();

    if (window.Particles) {
      window.Particles.init();
    }
  }

  /* ─── Loading Screen ─── */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("loader--hidden");
        loader.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
      }, 1200);
    });
  }

  /* ─── Theme Toggle ─── */
  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const saved = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "light" || (!saved && !prefersDark)) {
      document.documentElement.setAttribute("data-theme", "light");
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const next = isLight ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("portfolio-theme", next);
        toggle.setAttribute("aria-pressed", String(!isLight));
      });

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
    }
  }

  /* ─── Navigation ─── */
  function initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav__link");
    const header = document.getElementById("header");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("nav__menu--open");
        document.body.classList.toggle("no-scroll");
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navToggle.setAttribute("aria-expanded", "false");
          navMenu.classList.remove("nav__menu--open");
          document.body.classList.remove("no-scroll");
        });
      });
    }

  /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = header ? header.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });

    /* Header scroll effect */
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      if (header) {
        header.classList.toggle("header--scrolled", current > 50);
      }
      lastScroll = current;
    }, { passive: true });

    /* Active nav link highlighting */
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + (header ? header.offsetHeight + 20 : 100);
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav__link[href="#${id}"]`);
        if (link && scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((l) => l.classList.remove("nav__link--active"));
          link.classList.add("nav__link--active");
        }
      });
    }, { passive: true });
  }

  /* ─── Typing Effect ─── */
  function initTypingEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.textContent = TYPING_PHRASES[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = TYPING_PHRASES[phraseIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        delay = 500;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ─── Scroll Progress Bar ─── */
  function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
      bar.setAttribute("aria-valuenow", String(Math.round(progress)));
    }, { passive: true });
  }

  /* ─── Back to Top ─── */
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("back-to-top--visible", window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ─── Intersection Observer Animations ─── */
  function initIntersectionObserver() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("[data-animate], [data-animate-stagger]");

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("animate--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("animate--visible")) {
        observer.observe(el);
      }
    });
  }

  /* ─── Render Projects ─── */
  function initProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid || typeof PROJECTS === "undefined") return;

    grid.innerHTML = PROJECTS.map((project) => `
      <article class="project-card glass" data-animate="fade-up">
        <div class="project-card__image-wrap">
          <img
            class="project-card__image"
            src="${project.thumbnail}"
            alt="${project.title} thumbnail"
            loading="lazy"
            width="400"
            height="225"
            onerror="this.src='../images/placeholder-project.svg'"
          />
          <div class="project-card__overlay">
            <a href="${project.videoUrl}" class="project-card__play" target="_blank" rel="noopener noreferrer" aria-label="Watch ${project.title} video demo">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </a>
          </div>
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__tech">
            ${project.technologies.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="project-card__links">
            <a href="${project.githubUrl}" class="btn btn--sm btn--outline" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="${project.demoUrl}" class="btn btn--sm btn--primary" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              Live Demo
            </a>
            <a href="${project.videoUrl}" class="btn btn--sm btn--ghost" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              Video
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  /* ─── Technologies Carousel ─── */
  function initTechCarousel() {
    const track = document.getElementById("tech-carousel-track");
    if (!track) return;

    const items = [...TECH_CAROUSEL_ITEMS, ...TECH_CAROUSEL_ITEMS];
    track.innerHTML = items
      .map((tech) => `<span class="tech-carousel__item">${tech}</span>`)
      .join("");
  }

  /* ─── Contact Form ─── */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = "Message Sent!";
        btn.classList.add("btn--success");
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove("btn--success");
        }, 3000);
      }, 1500);
    });
  }

  /* ─── Gallery Lightbox ─── */
  function initGalleryLightbox() {
    const items = document.querySelectorAll(".gallery__item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");

    if (!lightbox || !lightboxImg) return;

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add("lightbox--open");
          lightbox.setAttribute("aria-hidden", "false");
          document.body.classList.add("no-scroll");
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("lightbox--open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("lightbox--open")) {
        closeLightbox();
      }
    });
  }

  /* ─── Video Embeds ─── */
  function initVideoEmbeds() {
    const placeholders = document.querySelectorAll(".video-card__placeholder");
    placeholders.forEach((placeholder) => {
      const btn = placeholder.querySelector(".video-card__play-btn");
      const videoId = placeholder.dataset.videoId;
      if (btn && videoId) {
        btn.addEventListener("click", () => {
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          iframe.title = placeholder.dataset.videoTitle || "Video";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.className = "video-card__iframe";
          placeholder.replaceWith(iframe);
        });
      }
    });
  }

  /* ─── Footer Year ─── */
  function initCurrentYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
})();
