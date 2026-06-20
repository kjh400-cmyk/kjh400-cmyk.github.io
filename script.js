(function () {
  const body = document.body;
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".primary-nav");
  const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      body.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.2, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));

  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      document.querySelectorAll(".accordion-item").forEach((other) => {
        if (other !== item) {
          other.removeAttribute("open");
        }
      });
    });
  });

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      const parent = image.closest(".hero-media");
      if (parent) {
        parent.classList.add("image-missing");
      }
      image.classList.add("image-missing");
    });
  });
})();
