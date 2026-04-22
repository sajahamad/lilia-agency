document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("main-content");
  const steps = document.querySelectorAll(".step");
  const serviceCards = document.querySelectorAll(".service-card");
  const statsSection = document.querySelector(".stats-section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const aboutSection = document.getElementById("about-us");
  console.log(document.getElementById("menuToggle"));
  console.log(document.getElementById("navLinks"));
  console.log(document.getElementById("navOverlay"));

  const menuToggle = document.getElementById("menuToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  const testimonialSlider = document.querySelector(".testimonial-slider");
  const testiCards = document.querySelectorAll(".testi-card");
  const dots = document.querySelectorAll(".slider-dots .dot");

  setTimeout(() => {
    if (loader) loader.style.display = "none";
    if (content) {
      content.style.visibility = "visible";
      content.style.opacity = "1";
    }
  }, 1000);

  if (menuToggle && navLinksContainer) {
    function toggleMenu() {
      menuToggle.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
      if (navOverlay) navOverlay.classList.toggle("active");
    }

    menuToggle.addEventListener("click", toggleMenu);
    menuToggle.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        toggleMenu();
      },
      { passive: false },
    );

    if (navOverlay) {
      navOverlay.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
        navOverlay.classList.remove("active");
      });
      navOverlay.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          menuToggle.classList.remove("active");
          navLinksContainer.classList.remove("active");
          navOverlay.classList.remove("active");
        },
        { passive: false },
      );
    }
  }

  function activateService(index) {
    steps.forEach((s) => s.classList.remove("active"));
    serviceCards.forEach((card) => {
      card.classList.remove("active");
      card.style.display = "none";
    });

    const targetStep =
      document.querySelector(`.step[data-index="${index}"]`) || steps[index];
    const targetCard =
      document.querySelector(`.service-card[data-index="${index}"]`) ||
      serviceCards[index];

    if (targetStep) targetStep.classList.add("active");
    if (targetCard) {
      targetCard.style.display = "block";
      setTimeout(() => targetCard.classList.add("active"), 50);
    }
  }

  steps.forEach((step, idx) => {
    const index = step.getAttribute("data-index") || idx;
    step.addEventListener("mouseenter", () => activateService(index));
    step.addEventListener("click", () => activateService(index));
  });

  if (serviceCards.length > 0) activateService(0);

  if (statsSection) {
    const startCounters = () => {
      const counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const update = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
          statsObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    statsObserver.observe(statsSection);
  }

  if (testimonialSlider && testiCards.length > 0) {
    let currentIndex = 0;

    function updateSlider() {
      const cardWidth = testiCards[0].offsetWidth + 20;
      testimonialSlider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });

    window.addEventListener("resize", updateSlider);
  }

  // --- 7. Reveal Animation ---
  const revealElements = document.querySelectorAll(
    ".team-member, .pricing-section .card, .portfolio-item",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  window.addEventListener("scroll", () => {
    let current = "";

    if (aboutSection && scrollTopBtn) {
      if (window.pageYOffset >= aboutSection.offsetTop - 200) {
        scrollTopBtn.style.display = "flex";
        setTimeout(() => (scrollTopBtn.style.opacity = "1"), 10);
      } else {
        scrollTopBtn.style.opacity = "0";
        setTimeout(() => (scrollTopBtn.style.display = "none"), 300);
      }
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (current && href && href.includes(current)) {
        link.classList.add("active");
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
