document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     CURSOR
  ========================= */
  const cur = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");

  if (cur && ring) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    });

    function loop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.style.width = "28px";
        cur.style.height = "28px";
        cur.style.background = "var(--lime)";
        ring.style.width = "60px";
        ring.style.height = "60px";
      });

      el.addEventListener("mouseleave", () => {
        cur.style.width = "12px";
        cur.style.height = "12px";
        cur.style.background = "var(--pink)";
        ring.style.width = "40px";
        ring.style.height = "40px";
      });
    });
  }

  /* =========================
     NAVBAR SCROLL
  ========================= */
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

  /* =========================
     HAMBURGER MENU
  ========================= */
  const hamburger = document.getElementById("hamburger");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }

  /* =========================
     LOCOMOTIVE SCROLL
  ========================= */
  let scrollInstance = null;

  if (typeof LocomotiveScroll !== "undefined") {
    const scrollContainer = document.querySelector("#js-scroll");

    if (scrollContainer) {
      scrollInstance = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 1,
        lerp: 0.06,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    }
  }

  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const reveals = document.querySelectorAll("[data-reveal]");

  function checkReveal() {
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add("revealed");
      }
    });
  }

  if (scrollInstance) {
    scrollInstance.on("scroll", checkReveal);
  } else {
    window.addEventListener("scroll", checkReveal);
  }

  setTimeout(checkReveal, 300);

  /* =========================
     STAT COUNTERS
  ========================= */
  function animCount(el, target, suffix = "", isFloat = false) {
    let start = null;
    const duration = 1800;

    function step(timestamp) {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const value = isFloat
        ? (ease * target).toFixed(1)
        : Math.floor(ease * target);

      el.innerHTML = value + `<span class="sfx">${suffix}</span>`;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statRow = document.querySelector(".stat-row");

  if (statRow) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".stat-num[data-target]")
              .forEach((n) => {
                animCount(
                  n,
                  parseFloat(n.dataset.target),
                  n.dataset.suffix || "",
                  n.dataset.float === "true",
                );
              });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(statRow);
  }
});

/* =========================
   FORM SUBMIT (Global)
========================= */
function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector(".cf-submit");
  if (!btn) return;

  btn.textContent = "Sending…";
  btn.style.opacity = ".7";

  setTimeout(() => {
    btn.innerHTML = "Sent! ✓";
    btn.style.background = "rgba(168,255,62,.2)";
    btn.style.color = "var(--lime)";
    btn.style.border = "1px solid rgba(168,255,62,.3)";
    btn.style.boxShadow = "none";

    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }

    e.target.reset();

    setTimeout(() => {
      btn.innerHTML = 'Send Message <span class="arr">→</span>';
      btn.style.cssText = "";
    }, 3000);
  }, 1200);
}
