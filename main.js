// main.js
document.addEventListener("DOMContentLoaded", () => {
  /* ==================================
     A. STAR BACKGROUND
  =================================== */
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

  /* ==================================
     B. TECH DOCK ICON DUPLICATION
  =================================== */
  const taskbarContainer = document.getElementById("taskbar-icons");
  if (taskbarContainer) {
    const originalIcons = Array.from(
      taskbarContainer.querySelectorAll(".icon")
    );
    let originalSetWidth = 0;

    originalIcons.forEach((icon) => {
      const style = window.getComputedStyle(icon);
      const iconWidth = icon.offsetWidth;
      const totalMargin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);

      originalSetWidth += iconWidth + totalMargin;

      // Clone each icon once to create seamless scrolling
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

  /* ==================================
     C. PROJECT2 PATH SAFETY (optional)
  =================================== */
  const projectVideos = document.querySelectorAll(".project-vidbox video");
  if (projectVideos && projectVideos.length >= 2) {
    // Ensure second video uses correct path if needed
    projectVideos[1].src = "video/project2.mp4";
    projectVideos[1].load();
  }

  /* ==================================
     D. RANDOM FLOAT DELAY FOR TECH ICONS
  =================================== */
  const dockIcons = document.querySelectorAll(".tech-dock .icon");
  dockIcons.forEach((icon) => {
    const delay = Math.random() * 2; // 0–2s
    icon.style.animationDelay = `${delay}s`;
  });

  /* ==================================
     E. PROJECT VIDEO HOVER PLAY / PAUSE
  =================================== */
  document.querySelectorAll(".project-vidbox").forEach((box) => {
    const video = box.querySelector("video");
    const hoverSign = box.querySelector(".hover-sign");
    if (!video) return;

    // Ensure muted for autoplay safety
    video.muted = true;

    box.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
      box.classList.add("hovered");
      if (hoverSign) hoverSign.classList.add("active");
    });

    box.addEventListener("mouseleave", () => {
      video.pause();
      box.classList.remove("hovered");
      if (hoverSign) hoverSign.classList.remove("active");
    });
  });

  /* ==================================
     F. INIT AOS (SCROLL ANIMATIONS)
  =================================== */
  if (window.AOS) {
    AOS.init({
      duration: 800, // ms
      easing: "ease-out-quart",
      once: true,
      offset: 80,
    });
  }
});