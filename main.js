// main.js
document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     A. STAR BACKGROUND
  =============================== */
  const starsContainer = document.getElementById("stars-container");
  if (starsContainer) {
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 3 + 2;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;

      starsContainer.appendChild(star);
    }
  }

  /* ==============================
     B. TECH DOCK ICON CLONING
  =============================== */
  const taskbarContainer = document.getElementById("taskbar-icons");
  let originalSetWidth = 0;

  if (taskbarContainer) {
    const originalIcons = Array.from(taskbarContainer.querySelectorAll(".icon"));

    originalIcons.forEach(icon => {
      const style = window.getComputedStyle(icon);
      const iconWidth = icon.offsetWidth;
      const totalMargin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);

      originalSetWidth += iconWidth + totalMargin;

      const clonedIcon = icon.cloneNode(true);
      clonedIcon.setAttribute("aria-hidden", "true");
      taskbarContainer.appendChild(clonedIcon);
    });

    taskbarContainer.style.setProperty(
      "--original-set-width",
      `${originalSetWidth}px`
    );
    taskbarContainer.style.width = `${originalSetWidth * 2}px`;
  }

  /* ==============================
     C. PROJECT VIDEO PATH FIX
  =============================== */
  const projectVideos = document.querySelectorAll(".project-vidbox video");
  if (projectVideos && projectVideos.length >= 2) {
    projectVideos[1].src = "video/project2.mp4"; // adjust if needed
    projectVideos[1].load();
  }

  /* ==============================
     D. GSAP + SCROLLTRIGGER
  =============================== */
  if (typeof gsap === "undefined") {
    console.warn("GSAP not found. Load GSAP before main.js to run animations.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ duration: 1.05, ease: "power3.out" });

  /* 1) General entrance for main sections (NOT the Hi There cards) */
  const entranceTargets = [
    ".home .container-home",
    ".my-project .project-card",
    ".designer-coder-section .content-col",
    ".designer-coder-section .brain-wrapper"
    // footer removed from animations as requested
  ];

  entranceTargets.forEach(sel => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 48,
        delay: 0.06 * i,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true
        }
      });
    });
  });

  /* 2) "Hello, There" section – title + cards together */
  const infoSection = document.querySelector(".info-section");
  if (infoSection) {
    const cards = gsap.utils.toArray(".info-cards .card");
    const title = infoSection.querySelector(".section-title");

    // Start them slightly down & invisible
    gsap.set([title, ...cards], { opacity: 0, y: 40 });

    const tlInfo = gsap.timeline({
      scrollTrigger: {
        trigger: infoSection,
        start: "top 80%",
        once: true
      }
    });

    tlInfo
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      })
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "back.out(1.6)"
        },
        "-=0.2"
      );
  }

  /* 3) Brain float + glow */
  gsap.to(".brain-img", {
    y: -16,
    repeat: -1,
    yoyo: true,
    duration: 6,
    ease: "sine.inOut",
    force3D: true
  });

  gsap.to(".brain-img", {
    scale: 1.02,
    repeat: -1,
    yoyo: true,
    duration: 7,
    ease: "sine.inOut"
  });

  gsap.to(".glow-effect", {
    opacity: 0.95,
    scale: 1.06,
    repeat: -1,
    yoyo: true,
    duration: 3.6,
    ease: "sine.inOut"
  });

  /* 4) Floating motion on tech icons + horizontal scroll */
  if (taskbarContainer) {
    gsap.utils.toArray(".tech-dock .icon").forEach((el, index) => {
      el.classList.add("float");

      const dur = 3.6 + Math.random() * 2.4;
      const yOffset = 6 + Math.random() * 10;
      const xOffset = -3 + Math.random() * 6;
      const rot = -3 + Math.random() * 6;

      gsap.to(el, {
        y: `+=${yOffset}`,
        x: `+=${xOffset}`,
        rotation: rot,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: dur,
        delay: index * 0.08
      });
    });

    gsap.to("#taskbar-icons", {
      x: -originalSetWidth,
      duration: 28,
      ease: "none",
      repeat: -1
    });
  }

  /* 5) Parallax on brain + glow while scrolling */
  if (document.querySelector(".designer-coder-section")) {
    ScrollTrigger.create({
      trigger: ".designer-coder-section",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
      onUpdate: self => {
        const p = self.progress;
        gsap.to(".glow-effect", {
          x: p * 30 - 15,
          y: -p * 20,
          overwrite: true,
          ease: "sine.out"
        });
        gsap.to(".brain-img", {
          rotation: p * 3 - 1.5,
          x: p * 12 - 6,
          overwrite: true
        });
      }
    });
  }

  /* 6) Project video hover: scale + brightness + play/pause */
  document.querySelectorAll(".project-vidbox").forEach(box => {
    const video = box.querySelector("video");
    const hoverSign = box.querySelector(".hover-sign");
    if (!video) return;

    gsap.set(video, {
      scale: 1,
      filter: "brightness(0.95) saturate(0.95)"
    });

    box.addEventListener("mouseenter", () => {
      gsap.to(video, { scale: 1.04, duration: 0.6, ease: "power3.out" });
      gsap.to(video, {
        filter: "brightness(1.05) saturate(1.05)",
        duration: 0.6
      });

      try {
        video.play();
      } catch (e) {}

      if (hoverSign) hoverSign.classList.add("active");
    });

    box.addEventListener("mouseleave", () => {
      gsap.to(video, { scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.to(video, {
        filter: "brightness(0.95) saturate(0.95)",
        duration: 0.6
      });

      try {
        video.pause();
      } catch (e) {}

      if (hoverSign) hoverSign.classList.remove("active");
    });
  });

  /* 7) Header entrance (footer animation already removed) */
  gsap.from(".header", {
    y: -18,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out"
  });
});