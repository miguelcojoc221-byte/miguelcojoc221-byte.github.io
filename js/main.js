/* ============================================================
   PORTAFOLIO — Miguel Angel Cojoc Caal
   JavaScript vanilla (sin dependencias)
   ------------------------------------------------------------
   - Menú móvil accesible (aria-expanded)
   - Encabezado y barra de progreso al hacer scroll
   - Enlace activo según la sección visible
   - Animaciones de entrada (IntersectionObserver)
   - Contadores y barras de habilidades
   - Formulario de contacto con validación (abre el correo)
   ============================================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Elementos ---------- */
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const progressBar = document.getElementById("progressBar");
  const toTop = document.getElementById("toTop");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menú móvil ---------- */
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  const openMenu = () => {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar el menú al pulsar un enlace o fuera de él
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("is-open") &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Cerrar con la tecla Escape (accesibilidad)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------- Scroll: encabezado, barra de progreso, botón arriba ---------- */
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Encabezado con fondo al desplazarse
    header.classList.toggle("is-scrolled", scrollTop > 30);

    // Barra de progreso de lectura
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    // Botón flotante "volver arriba"
    if (scrollTop > 500) {
      toTop.hidden = false;
      requestAnimationFrame(() => toTop.classList.add("is-visible"));
    } else {
      toTop.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ---------- Enlace activo según la sección visible ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isActive);
            if (isActive) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Animaciones de entrada (reveal) ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Contadores de estadísticas ---------- */
  const counters = document.querySelectorAll("[data-count]");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReducedMotion || target === 0) {
      el.textContent = `${target}+`;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Easing suave (easeOutCubic)
      const eased = 1 - Math.pow(1 - ratio, 3);
      el.textContent = `${Math.round(target * eased)}+`;
      if (ratio < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Barras de habilidades ---------- */
  const skillBars = document.querySelectorAll(".skill__fill");

  const fillBar = (bar) => {
    const level = Math.min(Math.max(parseInt(bar.dataset.level, 10) || 0, 0), 100);
    bar.style.width = `${level}%`;
  };

  if ("IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          fillBar(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    skillBars.forEach((bar) => barObserver.observe(bar));
  } else {
    skillBars.forEach(fillBar);
  }

  /* ---------- Formulario de contacto ---------- */
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const showError = (field, message) => {
    field.classList.toggle("is-invalid", Boolean(message));
    const errorEl = contactForm.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message || "";
  };

  const validateField = (field) => {
    const value = field.value.trim();

    if (!value) {
      showError(field, "Este campo es obligatorio.");
      return false;
    }
    if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
      showError(field, "Escribe un correo válido.");
      return false;
    }
    if (field.name === "message" && value.length < 10) {
      showError(field, "Escribe al menos 10 caracteres.");
      return false;
    }

    showError(field, "");
    return true;
  };

  if (contactForm) {
    const fields = Array.from(contactForm.querySelectorAll("input, textarea"));

    // Validación en vivo al salir de cada campo
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) validateField(field);
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const isValid = fields.map(validateField).every(Boolean);
      if (!isValid) {
        formNote.textContent = "Revisa los campos marcados.";
        formNote.classList.remove("is-success");
        const firstInvalid = contactForm.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = new FormData(contactForm);
      const subject = encodeURIComponent(data.get("subject").trim());
      const body = encodeURIComponent(
        `Nombre: ${data.get("name").trim()}\n` +
          `Correo: ${data.get("email").trim()}\n\n` +
          `${data.get("message").trim()}`
      );

      // Sin backend: se abre la aplicación de correo del usuario
      window.location.href = `mailto:miguelcojoc221@gmail.com?subject=${subject}&body=${body}`;

      formNote.textContent = "Listo. Se abrió tu correo con el mensaje listo para enviar.";
      formNote.classList.add("is-success");
      contactForm.reset();
    });
  }

  /* ---------- Año actual en el pie de página ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Desplazamiento suave respetando reduced-motion ---------- */
  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = "auto";
  }
});
