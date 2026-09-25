(function () {
  // --- DOM elements
  const utilityBar = document.querySelector(".nav-utility");
  const mainHeader = document.querySelector(".nav-main-header");
  const osbRow = document.querySelector(".nav-osb");
  const bodyEl = document.body;

  // --- Helper: update sticky state based on exact combined height of top sections
  function updateSticky() {
    if (!mainHeader || !osbRow) return;

    const utilityHeight = utilityBar ? utilityBar.getBoundingClientRect().height : 0;
    const mainHeaderHeight = mainHeader.getBoundingClientRect().height;
    const totalTopHeight = utilityHeight + mainHeaderHeight;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const shouldStick = scrollY > totalTopHeight;

    if (shouldStick) {
      if (!bodyEl.classList.contains("nav-scrolled")) {
        bodyEl.classList.add("nav-scrolled");
        void bodyEl.offsetHeight;
        const osbHeight = osbRow.getBoundingClientRect().height;
        bodyEl.style.paddingTop = osbHeight + "px";
      } else {
        const osbHeight = osbRow.getBoundingClientRect().height;
        bodyEl.style.paddingTop = osbHeight + "px";
      }
    } else {
      if (bodyEl.classList.contains("nav-scrolled")) {
        bodyEl.classList.remove("nav-scrolled");
        bodyEl.style.paddingTop = "";
      }
    }
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateSticky();
        ticking = false;
      });
      ticking = true;
    }
  }

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSticky();
      if (overlay && overlay.classList.contains("open")) {
        const mobileContent = overlay.querySelector(".mobile-menu-sections");
        if (mobileContent) {
          mobileContent.style.opacity = "0.99";
          setTimeout(() => {
            mobileContent.style.opacity = "";
          }, 10);
        }
      }
    }, 100);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  setTimeout(updateSticky, 100);
  updateSticky();

  // --- Mobile overlay toggle
  const burger = document.getElementById("burgerBtn");
  const overlay = document.getElementById("mobileOverlay");
  const closeBtn = document.getElementById("closeOverlayBtn");

  function openOverlay() {
    if (overlay) {
      overlay.classList.add("open");
      bodyEl.classList.add("menu-open");
      document.body.style.overflow = "hidden";
      void overlay.offsetWidth;
    }
  }

  function closeOverlay() {
    if (overlay) {
      overlay.classList.remove("open");
      bodyEl.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  }

  if (burger) burger.addEventListener("click", openOverlay);
  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("open")) {
      closeOverlay();
    }
  });

  // ========================
  // MOBILE MENU DATA
  // ========================

  // OSB navigation data (mirrors the desktop .osb-nav in .nav-main-header)
  const osbNavItems = [
    {
      title: "About OSB",
      links: [
        { text: "Meet the Dean", url: "/osb/about/Pages/Meet-the-Dean.aspx" },
        { text: "Mission And Vision", url: "/osb/about/Pages/default.aspx" },
        { text: "About Suliman Saleh Olayan", url: "/osb/about/Pages/Olayan-.aspx" },
        { text: "International Advisory Board", url: "https://www.aub.edu.lb/osb/Pages/advisoryboard.aspx", external: true },
        { text: "Global Recognitions & Labels", url: "/osb/about/Pages/Global-Recognition-.aspx" },
        { text: "Governance", url: "/osb/about/Pages/Governance.aspx" },
        { text: "Faculty and Staff Resources", url: "/osb/about/Pages/recources.aspx" },
        { text: "OSB 125", url: "/osb/125/Pages/default.aspx", external: true },
        { text: "OSB Strategic Plan 2029", url: "https://sites.aub.edu.lb/osb2029/", external: true },
        { text: "Job Opportunities", url: "https://www.aub.edu.lb/osb/about/Pages/Employment.aspx", external: true }
      ]
    },
    {
      title: "Academic Programs",
      links: [
        { text: "Undergraduate Program", url: "/osb/UndergradProgram", external: true },
        { text: "Specialized Masters", url: "/osb/Pages/SpecializedMasters.aspx", external: true },
        { text: "MBA", url: "/osb/MBA", external: true },
        { text: "MBA Online", url: "/osb/OMBA/Pages/default.aspx", external: true },
        { text: "Executive MBA", url: "/osb/EMBA", external: true }
      ]
    },
    {
      title: "Executive Education",
      links: [
        { text: "About Executive Education", url: "https://www.aub.edu.lb/osb/executiveeducation/Site/index.html", external: true },
        { text: "Our Impact", url: "https://www.aub.edu.lb/osb/executiveeducation/Site/our-impact.html", external: true },
        { text: "Open Enrollment Programs", url: "https://www.aub.edu.lb/osb/executiveeducation/Site/open-enrollment-programs/index.html", external: true },
        { text: "Customized Programs", url: "https://www.aub.edu.lb/osb/executiveeducation/Site/custom-programs/index.html", external: true },
        { text: "Contact Us", url: "https://www.aub.edu.lb/osb/executiveeducation/Site/contact-us.html", external: true }
      ]
    },
    {
      title: "OSB Online Programs",
      links: [
        { text: "Entrepreneurship & Innovation", url: "https://www.aub.edu.lb/online/Entrepreneurship-Innovation-online-diploma/Pages/default.aspx", external: true },
        { text: "Combating Trade-Based Financial Crime", url: "https://www.aub.edu.lb/osb/online/combating-trade-based-financial-crime-certificate/Pages/default.aspx", external: true },
        { text: "Strategic Branding in the Digital Era", url: "https://www.aub.edu.lb/osb/online/strategic_branding/Pages/default.aspx", external: true },
        { text: "Investment Analysis and Modern Portfolio Management", url: "https://www.aub.edu.lb/osb/online/investment-analysis-modern-portfolio-management/Pages/default.aspx", external: true },
        { text: "Fintech and AI", url: "https://www.aub.edu.lb/osb/online/Pages/fintech-AI.html", external: true }
      ]
    },
    {
      title: "Faculty",
      url: "/osb/Pages/Faculty.aspx",
      isLink: true
    },
    {
      title: "Research",
      url: "https://www.aub.edu.lb/osb/facultyresearch/Pages/default.aspx",
      external: true,
      isLink: true
    },
    {
      title: "News",
      url: "https://www.aub.edu.lb/osb/news/Pages/default.aspx",
      isLink: true
    },
    {
      title: "OSB Impacts",
      url: "https://www.aub.edu.lb/osb/impact/Pages/default.aspx",
      external: true,
      isLink: true
    }
  ];

  // Executive MBA navigation data (mirrors the desktop .osb-nav.mba-nav in .nav-osb)
  const embaNavItems = [
    { text: "About OSB", url: "https://www.aub.edu.lb/osb", external: true },
    { text: "Executive MBA", url: "index.html" },
    { text: "The Program", url: "program.html", active: true },
    { text: "Career Impact", url: "career-impact.html" },
    { text: "Class Profile & Network", url: "class-profile-network.html" },
    { text: "Admissions", url: "admissions.html" },
    { text: "Tuition & Funding", url: "tuition-funding.html" }
  ];

  // Helper function to create links
  function createLink(linkData, className = "") {
    const a = document.createElement("a");
    a.href = linkData.url;
    a.textContent = linkData.text;
    if (className) a.className = className;
    if (linkData.active) a.classList.add("is-active");
    if (linkData.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  // Build mobile OSB navigation
  function buildMobileOsb() {
    const container = document.getElementById("mobileOsbNav");
    if (!container) return;
    container.innerHTML = "";

    osbNavItems.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "mobile-nav-item";

      if (item.isLink && item.url) {
        const link = createLink({ text: item.title, url: item.url, external: item.external }, "mobile-nav-link");
        wrapper.appendChild(link);
      } else if (item.links && item.links.length > 0) {
        const button = document.createElement("div");
        button.className = "mobile-nav-link has-sub";
        button.setAttribute("data-osb-id", index);
        button.innerHTML = `<span>${item.title}</span><span class="chevron-icon"></span>`;

        const submenu = document.createElement("div");
        submenu.className = "mobile-submenu";

        item.links.forEach(link => {
          const anchor = createLink(link);
          submenu.appendChild(anchor);
        });

        button.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();

          document.querySelectorAll("#mobileOsbNav .mobile-nav-link.has-sub.open").forEach(openBtn => {
            if (openBtn !== button) {
              openBtn.classList.remove("open");
              const siblingSubmenu = openBtn.parentElement?.querySelector(".mobile-submenu");
              if (siblingSubmenu) siblingSubmenu.classList.remove("open");
            }
          });

          button.classList.toggle("open");
          submenu.classList.toggle("open");
        });

        wrapper.appendChild(button);
        wrapper.appendChild(submenu);
      }

      container.appendChild(wrapper);
    });
  }

  // Build mobile Executive MBA navigation (flat list of links), appended right
  // after the OSB section since the markup has no dedicated container for it
  function buildMobileEmba() {
    if (document.getElementById("mobileEmbaNav")) return; // avoid duplicates

    const sectionsContainer = document.querySelector(".mobile-menu-sections");
    if (!sectionsContainer) return;

    const section = document.createElement("div");
    section.className = "mobile-section";

    const title = document.createElement("div");
    title.className = "mobile-section-title";
    title.textContent = "Executive MBA";
    section.appendChild(title);

    const container = document.createElement("div");
    container.id = "mobileEmbaNav";
    section.appendChild(container);

    embaNavItems.forEach(item => {
      const wrapper = document.createElement("div");
      wrapper.className = "mobile-nav-item";
      const link = createLink(item, "mobile-nav-link");
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    });

    // Insert after the OSB section (which contains #mobileOsbNav)
    const osbSection = document.getElementById("mobileOsbNav")?.closest(".mobile-section");
    if (osbSection && osbSection.parentNode === sectionsContainer) {
      osbSection.insertAdjacentElement("afterend", section);
    } else {
      sectionsContainer.appendChild(section);
    }
  }

  // Remove a mobile menu section entirely, given the id of its inner content container
  function removeMobileSection(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const section = container.closest(".mobile-section");
    if (section) section.remove();
  }

  // Initialize mobile menus when DOM is ready
  function initMobileMenu() {
    removeMobileSection("mobileUtilityGrid"); // removes the "Quick Links" section
    removeMobileSection("mobileMainNav");     // removes the "Main Navigation" section
    buildMobileOsb();
    buildMobileEmba();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }
})();