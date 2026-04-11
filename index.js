// ==================== DOM ELEMENTS ====================
const DOM = {
  elements: {},

  get(selector) {
    return document.querySelector(selector);
  },

  getAll(selector) {
    return document.querySelectorAll(selector);
  },

  cache() {
    this.elements = {
      loadingScreen: this.get("#loadingScreen"),
      nav: this.get("#mainNav"),
      header: this.get("header"),
      navLinks: this.getAll(".nav-link"),
      sections: this.getAll("section"),
      playBtn: this.get("#playVideo"),
      videoOverlay: this.get("#videoOverlay"),
      closeBtn: this.get("#closeVideo"),
      iframe: this.get("#videoFrame"),
      themeToggle: this.get("#floatingThemeToggle"),
      themeIcon: this.get("#floatingThemeIcon"),
      slides: this.get("#slides"),
      dots: this.getAll(".dot"),
      prevBtn: this.get("#prevBtn"),
      nextBtn: this.get("#nextBtn"),
      sliderWrapper: this.get(".slides-wrapper"),
      techItems: this.getAll(".tech-item"),
      portfolioSlides: this.get("#portfolioSlides"),
      portfolioDots: this.get("#portfolioDots"),
      prevPortfolio: this.get("#prevPortfolio"),
      nextPortfolio: this.get("#nextPortfolio"),
      contactForm: this.get("#contact-form"),
    };
  },
};

// ==================== STATE ====================
const AppState = {
  lastScroll: 0,
  scrollTimeout: null,
  zoomTimeout: null,
  isZooming: false,
  hasHeroAnimated: false,
  isDarkMode: false,
  currentSlide: 0,
  currentPortfolioSlide: 0,
  touchStartX: 0,
  touchEndX: 0,
};

// ==================== TECH DATABASE ====================

const TechDatabase = {
  react: { name: "React", icon: "bx bxl-react" },
  nodejs: { name: "Node.js", icon: "bx bxl-nodejs" },
  mongodb: { name: "MongoDB", icon: "bx bxl-mongodb" },
  vue: { name: "Vue.js", icon: "bx bxl-vuejs" },
  laravel: { name: "Laravel", icon: "bx bxl-laravel" },
  angular: { name: "Angular", icon: "bx bxl-angular" },
  python: { name: "Python", icon: "bx bxl-python" },
  tensorflow: { name: "TensorFlow", icon: "bx bx-brain" },
  firebase: { name: "Firebase", icon: "bx bxl-firebase" },
  docker: { name: "Docker", icon: "bx bxl-docker" },
  kubernetes: { name: "Kubernetes", icon: "bx bx-cloud" },
  graphql: { name: "GraphQL", icon: "bx bx-code-alt" },
  typescript: { name: "TypeScript", icon: "bx bxl-typescript" },
  aws: { name: "AWS", icon: "bx bxl-aws" },
  mysql: { name: "MySQL", icon: "bx bxl-mysql" },
  postgresql: { name: "PostgreSQL", icon: "bx bxl-postgresql" },
  tailwind: { name: "Tailwind CSS", icon: "bx bxl-tailwind-css" },
  nextjs: { name: "Next.js", icon: "bx bxl-react" },
  redux: { name: "Redux", icon: "bx bxl-redux" },
  jest: { name: "Jest", icon: "bx bx-check-shield" },
  git: { name: "Git", icon: "bx bxl-git" },
  github: { name: "GitHub", icon: "bx bxl-github" },
  html5: { name: "HTML5", icon: "bx bxl-html5" },
  css3: { name: "CSS3", icon: "bx bxl-css3" },
  javascript: { name: "JavaScript", icon: "bx bxl-javascript" },
  php: { name: "PHP", icon: "bx bxl-php" },
  java: { name: "Java", icon: "bx bxl-java" },
  swift: { name: "Swift", icon: "bx bxl-swift" },
  flutter: { name: "Flutter", icon: "bx bxl-flutter" },
  django: { name: "Django", icon: "bx bxl-django" },
  express: { name: "Express.js", icon: "bx bx-code" },
  redis: { name: "Redis", icon: "bx bx-data" },
  nginx: { name: "Nginx", icon: "bx bx-server" },
  jenkins: { name: "Jenkins", icon: "bx bx-buildings" },
  terraform: { name: "Terraform", icon: "bx bx-cloud" },
  prometheus: { name: "Prometheus", icon: "bx bx-line-chart" },
  grafana: { name: "Grafana", icon: "bx bx-line-chart" },
  threejs: { name: "Three.js", icon: "bx bx-cube" },
  web3: { name: "Web3", icon: "bx bx-link-alt" },
  blockchain: { name: "Blockchain", icon: "bx bx-link" },
  ai: { name: "Artificial Intelligence", icon: "bx bx-brain" },
  figma: { name: "Figma", icon: "bx bxl-figma" },
  wordpress: { name: "WordPress", icon: "bx bxl-wordpress" },
  linux: { name: "Linux", icon: "bx bxl-linux" },
  android: { name: "Android", icon: "bx bxl-android" },
  ios: { name: "iOS", icon: "bx bxl-apple" },
};

// ==================== MODAL MANAGER ====================
const ModalManager = {
  getElements() {
    return {
      modal: DOM.get("#techModal"),
      icon: DOM.get(".modal-icon"),
      title: DOM.get(".modal-title"),
      description: DOM.get(".modal-description"),
      featuresList: DOM.get(".modal-features-list"),
      statsGrid: DOM.get(".stats-grid"),
      closeBtn: DOM.get(".close-modal"),
    };
  },

  show(techId) {
    const tech = TechDatabase[techId];
    if (!tech) return;

    const elements = this.getElements();
    if (!elements.modal) return;

    elements.icon?.setAttribute("class", `modal-icon ${tech.icon}`);
    if (elements.title) elements.title.textContent = tech.name;
    if (elements.description)
      elements.description.textContent = tech.description;

    this.populateList(elements.featuresList, tech.features);
    this.populateStats(elements.statsGrid, tech.stats);

    elements.modal.style.display = "block";
    document.body.style.overflow = "hidden";
  },

  populateList(container, items) {
    if (container && items) {
      container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }
  },

  populateStats(container, stats) {
    if (container && stats) {
      container.innerHTML = Object.entries(stats)
        .map(
          ([key, value]) => `
          <div class="stat-card">
            <span class="stat-value">${value}</span>
            <span class="stat-label">${this.formatLabel(key)}</span>
          </div>
        `
        )
        .join("");
    }
  },

  formatLabel(key) {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
    );
  },

  close() {
    const modal = this.getElements().modal;
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  },

  handleOutsideClick(e) {
    if (e.target === this.getElements().modal) this.close();
  },

  handleEscape(e) {
    if (
      e.key === "Escape" &&
      this.getElements().modal?.style.display === "block"
    )
      this.close();
  },

  init() {
    const elements = this.getElements();
    if (!elements.modal) return;

    elements.closeBtn?.addEventListener("click", () => this.close());
    window.addEventListener("click", this.handleOutsideClick.bind(this));
    document.addEventListener("keydown", this.handleEscape.bind(this));

    DOM.elements.techItems.forEach((item) => {
      const techId = item.getAttribute("data-tech");
      if (techId) {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          this.show(techId);
        });
      }
    });
  },
};

// ==================== VIDEO MANAGER ====================
const VideoManager = {
  videoUrl: "https://www.youtube.com/embed/5MgkCi_jScs?autoplay=1",

  open(e) {
    e?.preventDefault();
    const { videoOverlay, iframe } = DOM.elements;
    if (videoOverlay && iframe) {
      videoOverlay.classList.add("active");
      iframe.src = this.videoUrl;
    }
  },

  close() {
    const { videoOverlay, iframe } = DOM.elements;
    if (videoOverlay) {
      videoOverlay.classList.remove("active");
      if (iframe) iframe.src = "";
    }
  },

  handleVideoPlayback(video, container) {
    let isPlaying = false;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const play = () =>
      video.play().catch(() => console.warn("Playback failed"));
    const pause = () => !video.paused && video.pause();

    if (!isMobile) {
      container.addEventListener("mouseenter", () =>
        play().then(() => (isPlaying = true))
      );
      container.addEventListener("mouseleave", () => {
        if (isPlaying) {
          pause();
          isPlaying = false;
          video.currentTime = 1;
        }
      });
    }

    container.addEventListener("click", (e) => {
      if (e.target.closest(".tech-item") || e.target.closest("a")) return;
      isPlaying
        ? (pause(), (isPlaying = false))
        : play().then(() => (isPlaying = true));
    });

    video.addEventListener("ended", () => {
      isPlaying = false;
      video.currentTime = 0;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && isPlaying) {
        pause();
        isPlaying = false;
      }
    });
  },

  initPortfolioVideos() {
    const videos = DOM.getAll(".video-container video");
    videos.forEach((video) =>
      this.handleVideoPlayback(video, video.parentElement)
    );
  },

  init() {
    const { playBtn, videoOverlay, closeBtn } = DOM.elements;
    if (playBtn && videoOverlay && closeBtn) {
      playBtn.addEventListener("click", this.open.bind(this));
      closeBtn.addEventListener("click", this.close.bind(this));
      videoOverlay.addEventListener("click", (e) => {
        if (e.target === videoOverlay) this.close();
      });
    }
    this.initPortfolioVideos();
  },
};

// ==================== THEME MANAGER ====================
const ThemeManager = {
  setTheme(isDark) {
    const { themeIcon, themeToggle } = DOM.elements;

    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeIcon?.classList.replace("bx-sun", "bx-moon");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeIcon?.classList.replace("bx-moon", "bx-sun");
    }

    AppState.isDarkMode = isDark;
    themeToggle?.classList.add("theme-changing");
    setTimeout(() => themeToggle?.classList.remove("theme-changing"), 500);
  },

  toggle() {
    this.setTheme(!AppState.isDarkMode);
  },

  load() {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    this.setTheme(saved === "dark" || (!saved && prefersDark));
  },
};

// ==================== SCROLL HANDLER ====================
const ScrollHandler = {
  updateActiveSection() {
    const scrollPos = window.scrollY + 100;
    let current = "";

    DOM.elements.sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) current = section.id;
    });

    DOM.elements.navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${current}`);
    });
  },

  fadeInSections() {
    const scrollPos = window.scrollY;
    DOM.elements.sections.forEach((section) => {
      if (section.id === "home" && AppState.hasHeroAnimated) return;
      const revealPoint = section.offsetTop + section.offsetHeight * 0.1;
      if (scrollPos + window.innerHeight > revealPoint) {
        section.classList.add("active");
      }
    });
  },

  handleZoom() {
    if (window.scrollY > AppState.lastScroll && !AppState.isZooming) {
      document.documentElement.style.setProperty("--zoom-factor", "1.05");
      AppState.isZooming = true;

      clearTimeout(AppState.zoomTimeout);
      AppState.zoomTimeout = setTimeout(() => {
        document.documentElement.style.setProperty("--zoom-factor", "1");
        AppState.isZooming = false;
      }, 800);
    }
    AppState.lastScroll = window.scrollY;
  },

  handle() {
    if (AppState.scrollTimeout) return;

    AppState.scrollTimeout = setTimeout(() => {
      const scrollPos = window.scrollY;
      const { nav, header } = DOM.elements;

      if (nav) nav.classList.toggle("scrolled", scrollPos > 50);
      if (header) header.classList.toggle("scrolled", scrollPos > 50);

      this.updateActiveSection();
      this.fadeInSections();
      this.handleZoom();

      AppState.scrollTimeout = null;
    }, 100);
  },
};

// ==================== SECTION OBSERVER ====================
const SectionObserver = {
  observer: null,

  create() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target.id === "home" && AppState.hasHeroAnimated) return;

          entry.target.classList.add("active");
          const id = entry.target.id;
          DOM.elements.navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${id}`);
          });
        });
      },
      { threshold: 0.3, rootMargin: "-70px 0px -30px 0px" }
    );
  },

  init() {
    this.observer = this.create();
    DOM.elements.sections.forEach((section) => {
      if (section.id !== "home" || !AppState.hasHeroAnimated) {
        this.observer.observe(section);
      }
    });
  },

  disconnect() {
    this.observer?.disconnect();
  },
};

// ==================== SMOOTH SCROLL ====================
const SmoothScroll = {
  handle(e, link) {
    const targetId = link.getAttribute("href");
    if (!targetId?.startsWith("#")) return;

    e.preventDefault();
    const target = DOM.get(targetId);
    if (!target) return;

    SectionObserver.disconnect();
    window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });

    setTimeout(() => {
      DOM.elements.sections.forEach((section) => {
        if (section.id !== "home" || !AppState.hasHeroAnimated) {
          SectionObserver.observer?.observe(section);
        }
      });
    }, 1000);
  },

  init() {
    DOM.elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handle(e, link));
    });
  },
};

// ==================== SERVICE SLIDER ====================
const ServiceSlider = {
  update() {
    const { slides, dots } = DOM.elements;
    if (slides) {
      slides.style.transform = `translateX(-${AppState.currentSlide * 100}%)`;
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === AppState.currentSlide)
      );
    }
  },

  next() {
    const total = DOM.elements.dots.length;
    if (total) {
      AppState.currentSlide = (AppState.currentSlide + 1) % total;
      this.update();
    }
  },

  prev() {
    const total = DOM.elements.dots.length;
    if (total) {
      AppState.currentSlide = (AppState.currentSlide - 1 + total) % total;
      this.update();
    }
  },

  goTo(index) {
    AppState.currentSlide = index;
    this.update();
  },

  handleTouchStart(e) {
    AppState.touchStartX = e.changedTouches[0].screenX;
  },

  handleTouchEnd(e) {
    const diff = AppState.touchStartX - e.changedTouches[0].screenX;
    if (diff > 50) this.next();
    else if (diff < -50) this.prev();
  },

  init() {
    const { slides, dots, prevBtn, nextBtn, sliderWrapper } = DOM.elements;
    if (!slides || !dots.length || !prevBtn || !nextBtn) return;

    this.update();
    prevBtn.addEventListener("click", () => this.prev());
    nextBtn.addEventListener("click", () => this.next());
    dots.forEach((dot, i) => dot.addEventListener("click", () => this.goTo(i)));

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      else if (e.key === "ArrowRight") this.next();
    });

    if (sliderWrapper) {
      sliderWrapper.addEventListener(
        "touchstart",
        this.handleTouchStart.bind(this)
      );
      sliderWrapper.addEventListener(
        "touchend",
        this.handleTouchEnd.bind(this)
      );
    }
  },
};

// ==================== PORTFOLIO SLIDER ====================
const PortfolioSlider = {
  slidesPerView: 3,
  autoPlayInterval: null,

  updateSlidesPerView() {
    const width = window.innerWidth;
    if (width < 768) this.slidesPerView = 1;
    else if (width < 992) this.slidesPerView = 2;
    else this.slidesPerView = 3;
  },

  createDots() {
    const { portfolioDots } = DOM.elements;
    if (!portfolioDots) return;

    const slides = DOM.getAll(".portfolio-item");
    const totalDots = Math.ceil(slides.length / this.slidesPerView);
    portfolioDots.innerHTML = "";

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot";
      dot.addEventListener("click", () => this.goTo(i));
      portfolioDots.appendChild(dot);
    }
  },

  update() {
    const slides = DOM.getAll(".portfolio-item");
    if (!slides.length) return;

    const slideWidth = slides[0]?.offsetWidth || 0;
    const offset = -(AppState.currentPortfolioSlide * (slideWidth + 30));
    DOM.elements.portfolioSlides.style.transform = `translateX(${offset}px)`;

    const currentDot = Math.floor(
      AppState.currentPortfolioSlide / this.slidesPerView
    );
    const dots = DOM.getAll(".slider-dot");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentDot));

    const { prevPortfolio, nextPortfolio } = DOM.elements;
    if (prevPortfolio && nextPortfolio) {
      prevPortfolio.disabled = AppState.currentPortfolioSlide === 0;
      nextPortfolio.disabled =
        AppState.currentPortfolioSlide + this.slidesPerView >= slides.length;
    }
  },

  next() {
    const slides = DOM.getAll(".portfolio-item");
    if (AppState.currentPortfolioSlide + this.slidesPerView < slides.length) {
      AppState.currentPortfolioSlide++;
    } else {
      AppState.currentPortfolioSlide = 0;
    }
    this.update();
  },

  prev() {
    const slides = DOM.getAll(".portfolio-item");
    if (AppState.currentPortfolioSlide > 0) {
      AppState.currentPortfolioSlide--;
    } else {
      AppState.currentPortfolioSlide = Math.max(
        0,
        slides.length - this.slidesPerView
      );
    }
    this.update();
  },

  goTo(index) {
    const slides = DOM.getAll(".portfolio-item");
    AppState.currentPortfolioSlide = index * this.slidesPerView;
    if (AppState.currentPortfolioSlide + this.slidesPerView > slides.length) {
      AppState.currentPortfolioSlide = Math.max(
        0,
        slides.length - this.slidesPerView
      );
    }
    this.update();
  },

  startAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  },

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },

  init() {
    if (!DOM.elements.portfolioSlides) return;

    this.updateSlidesPerView();
    this.createDots();
    this.update();

    DOM.elements.prevPortfolio?.addEventListener("click", () => this.prev());
    DOM.elements.nextPortfolio?.addEventListener("click", () => this.next());

    window.addEventListener("resize", () => {
      this.updateSlidesPerView();
      this.createDots();
      this.update();
    });

    const slider = DOM.get(".portfolio-slider");
    if (slider) {
      slider.addEventListener("mouseenter", () => this.stopAutoPlay());
      slider.addEventListener("mouseleave", () => this.startAutoPlay());
    }

    this.startAutoPlay();
  },
};

// ==================== FORM HANDLER ====================
const FormHandler = {
  validateForm(inputs) {
    if (Object.values(inputs).some((v) => !v)) {
      this.showPopup("⚠️ Please fill in all fields.", "error");
      return false;
    }

    if (!inputs.email.includes("@") || !inputs.email.includes(".")) {
      this.showPopup("📧 Please enter a valid email address.", "error");
      return false;
    }

    return true;
  },

  getFormData(form) {
    return {
      name: form.querySelector('input[name="name"]')?.value.trim(),
      email: form.querySelector('input[name="email"]')?.value.trim(),
      phone: form.querySelector('input[name="phone"]')?.value.trim(),
      subject: form.querySelector('input[name="subject"]')?.value.trim(),
      message: form.querySelector('textarea[name="message"]')?.value.trim(),
    };
  },

  showPopup(message, type = "success") {
    const existingPopup = document.querySelector(".form-popup");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.className = `form-popup form-popup-${type}`;
    const icon = type === "success" ? "✓" : "⚠️";

    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-icon">${icon}</span>
        <span class="popup-message">${message}</span>
        <button class="popup-close">&times;</button>
      </div>
      <div class="popup-progress"></div>
    `;

    document.body.appendChild(popup);

    popup
      .querySelector(".popup-close")
      .addEventListener("click", () => this.closePopup(popup));
    setTimeout(() => this.closePopup(popup), 4000);
  },

  closePopup(popup) {
    popup.classList.add("form-popup-hide");
    setTimeout(() => popup.remove(), 300);
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = this.getFormData(e.target);

    if (this.validateForm(formData)) {
      this.showPopup(
        "Message sent successfully! We'll get back soon.",
        "success"
      );
      e.target.reset();
    }
  },

  init() {
    const form = DOM.elements.contactForm;
    if (form) form.addEventListener("submit", this.handleSubmit.bind(this));
  },
};

// ==================== LOADING SCREEN ====================
const LoadingScreen = {
  hide() {
    const { loadingScreen } = DOM.elements;
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        const hero = DOM.get("#home");
        if (hero && !AppState.hasHeroAnimated) {
          hero.classList.add("active");
          AppState.hasHeroAnimated = true;
        }
      }, 500);
    }
  },

  init() {
    if (DOM.elements.loadingScreen) {
      setTimeout(() => this.hide(), 1500);
    } else {
      const hero = DOM.get("#home");
      if (hero && !AppState.hasHeroAnimated) {
        hero.classList.add("active");
        AppState.hasHeroAnimated = true;
      }
    }
  },
};

// ==================== HIRE BUTTON HANDLER ====================
const HireButtonHandler = {
  init() {
    const hireButton = DOM.get("#hireButton");
    const contactSection = DOM.get("#contact");

    if (hireButton && contactSection) {
      hireButton.addEventListener("click", (e) => {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  },
};

// ==================== COUNTER ANIMATOR ====================
const CounterAnimator = {
  counters: null,
  animated: false,

  animate(counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const steps = duration / 20;
    const increment = target / steps;
    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  },

  init() {
    this.counters = DOM.getAll(".counter-value");
    if (!this.counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.counters.forEach((counter) => this.animate(counter));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = DOM.get(".counter-section");
    if (section) observer.observe(section);
  },
};

// ==================== PROGRESS BARS ====================
const ProgressBars = {
  init() {
    const bars = DOM.getAll(".progress-line");
    const animated = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.has(entry.target)) {
            const width = entry.target.getAttribute("data-width");
            if (width) {
              entry.target.style.width = width + "%";
              animated.add(entry.target);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    bars.forEach((bar) => {
      observer.observe(bar);
      bar.style.width = "0%";
    });
  },
};

// ==================== UTILITIES ====================
const Utils = {
  enhanceFloatingEffect() {
    const toggle = DOM.elements.themeToggle;
    if (!toggle) return;

    let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
      const diff = Math.abs(window.scrollY - lastScroll);
      if (diff > 10) {
        toggle.style.transform = `translateY(${Math.min(diff * 0.2, 15)}px)`;
        setTimeout(() => (toggle.style.transform = ""), 300);
      }
      lastScroll = window.scrollY;
    });
  },

  initBackgroundOverlay() {
    const overlay = DOM.get(".background-overlay");
    if (!overlay) return;

    const update = () => {
      const opacity =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--overlay-opacity")
          .trim() || "0.7";
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    };

    update();
    new MutationObserver(update).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  },
};

// ==================== INITIALIZATION ====================
const App = {
  init() {
    DOM.cache();
    ThemeManager.load();
    LoadingScreen.init();
    HireButtonHandler.init();

    window.addEventListener("scroll", () => ScrollHandler.handle());
    ScrollHandler.handle();

    SectionObserver.init();
    SmoothScroll.init();
    VideoManager.init();
    ServiceSlider.init();

    DOM.elements.themeToggle?.addEventListener("click", () =>
      ThemeManager.toggle()
    );

    ModalManager.init();
    CounterAnimator.init();
    PortfolioSlider.init();
    ProgressBars.init();
    FormHandler.init();

    Utils.enhanceFloatingEffect();
    Utils.initBackgroundOverlay();
  },
};

// Start the application
document.addEventListener("DOMContentLoaded", () => App.init());

document.addEventListener("DOMContentLoaded", function () {
  // Slider Configuration
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".logo-slide");
  const prevBtn = document.querySelector(".prev-arrow");
  const nextBtn = document.querySelector(".next-arrow");
  const dotsContainer = document.querySelector(".slider-dots1");

  let currentIndex = 0;
  let slidesToShow = 3;
  let totalSlides = slides.length;
  let maxIndex = totalSlides - slidesToShow;
  let autoPlayInterval;
  let isPlaying = true;
  const autoPlayDelay = 4000;

  // Update slides to show based on screen size
  function updateSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 992) {
      slidesToShow = 3;
    } else if (width >= 768) {
      slidesToShow = 2;
    } else {
      slidesToShow = 1;
    }
    maxIndex = totalSlides - slidesToShow;

    if (currentIndex > maxIndex) {
      currentIndex = Math.max(0, maxIndex);
    }

    createDots();
    updateSlider();
  }

  // Function to update slider position
  function updateSlider() {
    const slideWidth = slides[0]?.offsetWidth || 0;
    const gap = parseInt(getComputedStyle(sliderTrack).gap) || 30;
    const offset = currentIndex * (slideWidth + gap);
    sliderTrack.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  // Function to update pagination dots
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Function to create pagination dots
  function createDots() {
    dotsContainer.innerHTML = "";
    const totalDots = maxIndex + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Function to go to specific slide
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  }

  // Function to go to next slide
  function nextSlide() {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
    resetAutoPlay();
  }

  // Function to go to previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateSlider();
    resetAutoPlay();
  }

  // Auto-play functionality
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (isPlaying) {
        nextSlide();
      }
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function resetAutoPlay() {
    if (isPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  // Handle window resize
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSlidesToShow();
    }, 250);
  }

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  window.addEventListener("resize", handleResize);

  // Pause auto-play on hover
  const sliderContainer = document.querySelector(".slider-container1");
  sliderContainer.addEventListener("mouseenter", () => {
    isPlaying = false;
  });

  sliderContainer.addEventListener("mouseleave", () => {
    isPlaying = true;
    resetAutoPlay();
  });

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      resetAutoPlay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      resetAutoPlay();
    }
  });

  // Initialize slider
  function initSlider() {
    updateSlidesToShow();
    startAutoPlay();
  }

  initSlider();
});

// --------------------------------------------------------------
// TESTIMONIAL DATA (dynamic)
// --------------------------------------------------------------
let testimonialsData = [
  {
    name: "Raleigh Friend",
    designation: "CEO, Seoly",
    text: "Lorem Ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    rating: 4,
  },
  {
    name: "Jessica Harper",
    designation: "Product Lead, Nexify",
    text: "Amazing experience! The team delivered beyond expectations. The platform is intuitive and the results were outstanding. Highly recommended for any business.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    designation: "CTO, BrightCore",
    text: "Incredible support and robust features. Our conversion rates improved by 34% after implementation. Truly a game-changer in the digital space.",
    rating: 5,
  },
  {
    name: "Sophia Rodriguez",
    designation: "Marketing Director, Velora",
    text: "A seamless and delightful journey from start to finish. The design thinking and execution are top-notch. Best decision we've made this year!",
    rating: 4,
  },
  {
    name: "David O'Malley",
    designation: "Founder, StrideUp",
    text: "Finally a solution that combines elegance with performance. The attention to detail is remarkable. Will definitely partner again.",
    rating: 5,
  },
  {
    name: "Elena Vasquez",
    designation: "Head of Sales, Apexora",
    text: "Professional, creative, and results-driven. Our clients love the new interface, and we’ve seen a massive boost in engagement. 5 stars!",
    rating: 5,
  },
];

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

function renderStars(rating) {
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHtml += `<li><div class="star-icon star-fill"></div></li>`;
    } else {
      starsHtml += `<li><div class="star-icon star-blank"></div></li>`;
    }
  }
  return `<ul class="review">${starsHtml}</ul>`;
}

function createSlideHTML(item) {
  return `
<div class="testimonial-slider-single-item">
  <div class="inner-shape inner-shape-top-right"></div>
  <div class="contet1">
    <span class="icon">“</span>
    <p class="text">${escapeHtml(item.text)}</p>
    <div class="info">
      <div class="author">
        <h4 class="name">${escapeHtml(item.name)}</h4>
        <span class="designation">${escapeHtml(item.designation)}</span>
      </div>
      ${renderStars(item.rating)}
    </div>
  </div>
</div>
`;
}

// ------------------- SLIDER CLASS (pure js) -------------------
class PureTestimonialSlider {
  constructor(trackElement, dotsContainer1, prevBtn, nextBtn, getDataFn) {
    this.track = trackElement;
    this.dotsContainer1 = dotsContainer1;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.getDataFn = getDataFn;
    this.currentIndex = 0;
    this.slideElements = [];
    this.slidesPerView = 1;
    this.maxIndex = 0;
    this.init();
    this.bindEvents();
    this.updateDimensions();
    window.addEventListener("resize", () => this.updateDimensions());
  }

  refreshSlides() {
    const items = this.getDataFn();
    if (!items.length) return;
    let slidesHTML = "";
    items.forEach((item) => {
      slidesHTML += createSlideHTML(item);
    });
    this.track.innerHTML = slidesHTML;
    this.slideElements = Array.from(this.track.children);
    this.updateDimensions(true);
  }

  init() {
    this.refreshSlides();
  }

  updateDimensions(resetIndex = false) {
    const container = this.track.parentElement;
    if (!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    const trackStyle = getComputedStyle(this.track);
    let gap = parseFloat(trackStyle.gap) || 32;
    if (isNaN(gap)) gap = 32;
    let newSlidesPerView = 1;
    if (containerWidth >= 1280) newSlidesPerView = 3;
    else if (containerWidth >= 1024) newSlidesPerView = 3;
    else if (containerWidth >= 768) newSlidesPerView = 2;
    else newSlidesPerView = 1;
    this.slidesPerView = newSlidesPerView;
    const totalGapSpace = gap * (this.slidesPerView - 1);
    const slideWidth = (containerWidth - totalGapSpace) / this.slidesPerView;
    this.slideElements.forEach((slide) => {
      slide.style.flex = `0 0 ${slideWidth}px`;
    });
    const total = this.getDataFn().length;
    const maxPossible = Math.max(0, total - this.slidesPerView);
    this.maxIndex = maxPossible;
    if (resetIndex || this.currentIndex > this.maxIndex) this.currentIndex = 0;
    if (this.currentIndex < 0) this.currentIndex = 0;
    this.updateSliderPosition(false);
    this.updateDots();
  }

  updateSliderPosition(animate = true) {
    if (!this.slideElements.length) return;
    const firstSlide = this.slideElements[0];
    const slideWidth = firstSlide.offsetWidth;
    const trackStyle = getComputedStyle(this.track);
    const gap = parseFloat(trackStyle.gap) || 32;
    const offset = -(this.currentIndex * (slideWidth + gap));
    if (animate)
      this.track.style.transition =
        "transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
    else this.track.style.transition = "none";
    this.track.style.transform = `translateX(${offset}px)`;
    if (!animate) this.track.offsetHeight;
  }

  updateDots() {
    if (!this.dotsContainer) return;
    const dotsCount = this.maxIndex + 1;
    let dotsHtml = "";
    for (let i = 0; i < dotsCount; i++) {
      const activeClass = i === this.currentIndex ? "active" : "";
      dotsHtml += `<div class="dot ${activeClass}" data-index="${i}"></div>`;
    }
    this.dotsContainer.innerHTML = dotsHtml;
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const idx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(idx) && idx >= 0 && idx <= this.maxIndex) {
          this.currentIndex = idx;
          this.updateSliderPosition(true);
          this.updateDots();
        }
      });
    });
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) this.currentIndex++;
    else if (this.maxIndex >= 0 && this.currentIndex === this.maxIndex)
      this.currentIndex = 0;
    this.updateSliderPosition(true);
    this.updateDots();
  }
  prevSlide() {
    if (this.currentIndex > 0) this.currentIndex--;
    else if (this.currentIndex === 0 && this.maxIndex > 0)
      this.currentIndex = this.maxIndex;
    this.updateSliderPosition(true);
    this.updateDots();
  }
  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
  }
  addNewTestimonialAndRefresh() {
    this.refreshSlides();
    const total = this.getDataFn().length;
    const newMax = Math.max(0, total - this.slidesPerView);
    this.maxIndex = newMax;
    this.currentIndex = 0;
    this.updateSliderPosition(true);
    this.updateDots();
  }
}

const getTestimonials = () => testimonialsData;
let sliderInstance = null;

// ----- Modal star rating state -----
let modalSelectedRating = 0;
function initModalStarRating() {
  const stars = document.querySelectorAll("#modalStarRatingWidget span");
  const ratingLabel = document.getElementById("modalRatingValueLabel");
  if (!stars.length) return;
  stars.forEach((star) => {
    star.style.cursor = "pointer";
    star.addEventListener("mouseover", function () {
      highlightStars(parseInt(this.dataset.value));
    });
    star.addEventListener("mouseout", function () {
      highlightStars(modalSelectedRating);
    });
    star.addEventListener("click", function () {
      modalSelectedRating = parseInt(this.dataset.value);
      highlightStars(modalSelectedRating);
      if (ratingLabel) ratingLabel.innerText = `(${modalSelectedRating}/5)`;
    });
  });
  function highlightStars(rating) {
    stars.forEach((star) => {
      const val = parseInt(star.dataset.value);
      if (val <= rating) star.innerHTML = "★";
      else star.innerHTML = "☆";
      star.style.color = val <= rating ? "#fbbf24" : "#cbd5e1";
    });
  }
  highlightStars(0);
  if (ratingLabel) ratingLabel.innerText = "(0/5)";
}

function showModalFeedback(msg, isError = false) {
  const feedbackDiv = document.getElementById("modalFeedback");
  if (!feedbackDiv) return;
  const className = isError ? "error-message" : "success-message";
  feedbackDiv.innerHTML = `<div class="${className}">${msg}</div>`;
  setTimeout(() => {
    if (feedbackDiv) feedbackDiv.innerHTML = "";
  }, 4000);
}

function addTestimonialFromModal() {
  const nameInput = document.getElementById("modalClientName");
  const titleInput = document.getElementById("modalClientTitle");
  const commentInput = document.getElementById("modalClientComment");
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const commentText = commentInput.value.trim();

  if (!name) {
    showModalFeedback("Please enter your name", true);
    return;
  }
  if (!title) {
    showModalFeedback("Please enter your title/company", true);
    return;
  }
  if (!commentText) {
    showModalFeedback("Please write your testimonial", true);
    return;
  }
  if (modalSelectedRating === 0) {
    showModalFeedback("Please select a star rating (1-5)", true);
    return;
  }

  const newTestimonial = {
    name: name,
    designation: title,
    text: commentText,
    rating: modalSelectedRating,
  };
  testimonialsData.unshift(newTestimonial);
  if (sliderInstance) sliderInstance.addNewTestimonialAndRefresh();

  // Reset modal form
  nameInput.value = "";
  titleInput.value = "";
  commentInput.value = "";
  modalSelectedRating = 0;
  initModalStarRating();
  const ratingLabel = document.getElementById("modalRatingValueLabel");
  if (ratingLabel) ratingLabel.innerText = "(0/5)";
  showModalFeedback(
    "✨ Thank you! Your testimonial has been added to the slider!",
    false
  );

  // Close modal after 1.2 seconds
  setTimeout(() => {
    closeModal();
  }, 1200);
}

// Modal controls
const modalOverlay = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

function openModal() {
  modalOverlay.classList.add("active");
  document.container1.style.overflow = "hidden";
}
function closeModal() {
  modalOverlay.classList.remove("active");
  document.container1.style.overflow = "";
}
if (openBtn) openBtn.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// DOM ready init
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonialTrack");
  const dots = document.getElementById("dotsContainer");
  const prev = document.getElementById("prevSlideBtn");
  const next = document.getElementById("nextSlideBtn");
  if (track && prev && next) {
    sliderInstance = new PureTestimonialSlider(
      track,
      dots,
      prev,
      next,
      getTestimonials
    );
  }
  initModalStarRating();
  const submitModalBtn = document.getElementById("submitModalBtn");
  if (submitModalBtn)
    submitModalBtn.addEventListener("click", addTestimonialFromModal);
});
