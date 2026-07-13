// main.js

// ── Master Animation Loop ──
const animCallbacks = new Set();
let masterRafId = null;

function masterTick(timestamp) {
  animCallbacks.forEach(cb => cb(timestamp));
  masterRafId = requestAnimationFrame(masterTick);
}

function registerAnim(fn) {
  animCallbacks.add(fn);
  if (!masterRafId) {
    masterRafId = requestAnimationFrame(masterTick);
  }
  return () => {
    animCallbacks.delete(fn);
    if (animCallbacks.size === 0) {
      cancelAnimationFrame(masterRafId);
      masterRafId = null;
    }
  };
}

// ── Debounce Utility ──
function debounce(fn, ms = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Skills Data ──────────────────────────────────────────────────────────────
const SKILLS = [
  // Inner orbit — Web Core
  { name: "HTML5", desc: "Semantic markup & structure for modern web apps", level: 95, tag: "Web Foundation", short: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", orbit: "inner" },
  { name: "CSS3", desc: "Advanced styling, animations & responsive layouts", level: 90, tag: "Web Foundation", short: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", orbit: "inner" },
  { name: "JavaScript", desc: "Dynamic scripting, DOM manipulation & async patterns", level: 85, tag: "Web Foundation", short: "JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", orbit: "inner" },

  // Middle orbit — .NET & Backend
  { name: "C#", desc: "Object-oriented language for .NET ecosystem", level: 92, tag: "Backend", short: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", orbit: "middle" },
  { name: "ASP.NET MVC", desc: "Model-View-Controller web framework for .NET", level: 88, tag: "Backend", short: "MVC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", orbit: "middle" },
  { name: "ASP.NET Core API", desc: "RESTful API development with .NET Core", level: 88, tag: "Backend", short: "API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", orbit: "middle" },
  { name: "Node.js", desc: "Server-side JavaScript runtime & event-driven APIs", level: 75, tag: "Backend", short: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", orbit: "middle" },
  { name: "SignalR", desc: "Real-time bidirectional communication for web apps", level: 80, tag: "Backend", short: "SignalR", svgPath: "M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2,6l-1.3,1.3a1,1,0,0,0,0,1.42,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29L5.75,19.38A10,10,0,1,0,12,2ZM12,18a6,6,0,1,1,6-6A6,6,0,0,1,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z", dataSkill: "signalr", orbit: "middle" },
  { name: "Git & GitHub", desc: "Version control, branching & collaborative workflows", level: 85, tag: "Tools", short: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", orbit: "middle" },

  // Outer orbit — Data & Languages
  { name: "SQL Server", desc: "Relational database design, queries & optimization", level: 85, tag: "Database", short: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", orbit: "outer" },
  { name: "MongoDB", desc: "NoSQL document database for flexible data models", level: 75, tag: "Database", short: "Mongo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", orbit: "outer" },
  { name: "Python", desc: "Scripting, automation & data processing", level: 70, tag: "Language", short: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", orbit: "outer" },
  { name: "C++", desc: "Systems programming, performance-critical applications", level: 75, tag: "Language", short: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", orbit: "outer" },
  { name: "SQLite", desc: "Lightweight embedded relational database", level: 80, tag: "Database", short: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", orbit: "outer" },
  { name: "Assembly (x86)", desc: "Low-level CPU instruction programming & system internals", level: 65, tag: "Language", short: "ASM", svgPath: "M19 13H17V9H19V13M19 17H17V15H19V17M19 7H17V5H19V7M22 6C22 5.4 21.6 5 21 5H20V4C20 2.9 19.1 2 18 2H17V1H15V2H13V1H11V2H9V1H7V2H6C4.9 2 4 2.9 4 4V5H3C2.4 5 2 5.4 2 6V7H1V9H2V11H1V13H2V15H1V17H2V18C2 19.1 2.9 20 4 20V21H6V22H8V21H10V22H12V21H14V22H16V21H18C19.1 21 20 20.1 20 19V18H21C21.6 18 22 17.6 22 17V16H23V14H22V12H23V10H22V9H23V7H22V6M16 19H8V5H16V19M15 6H9V18H15V6M14 7H10V17H14V7Z", dataSkill: "assembly", orbit: "outer" },
];

function renderSkills() {
  const orbits = {
    inner: document.getElementById("orbit-inner"),
    middle: document.getElementById("orbit-middle"),
    outer: document.getElementById("orbit-outer"),
  };

  const grouped = { inner: [], middle: [], outer: [] };
  SKILLS.forEach(s => grouped[s.orbit].push(s));

  ["inner", "middle", "outer"].forEach((orbit) => {
    const items = grouped[orbit];
    const container = orbits[orbit];
    if (!container || items.length === 0) return;

    const gap = 360 / items.length;

    items.forEach((skill, i) => {
      const angle = gap * i;

      const planet = document.createElement("div");
      planet.className = "skill-planet";
      planet.style.setProperty("--angle", `${angle}deg`);
      if (skill.dataSkill) {
        planet.dataset.skill = skill.dataSkill;
      }

      const card = document.createElement("div");
      card.className = "planet-card";
      card.dataset.name = skill.name;
      card.dataset.desc = skill.desc;
      card.dataset.level = skill.level;
      card.dataset.tag = skill.tag;

      if (skill.svgPath) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", skill.svgPath);
        svg.appendChild(path);
        card.appendChild(svg);
      } else {
        const img = document.createElement("img");
        img.src = skill.icon;
        img.alt = skill.name;
        img.loading = "lazy";
        img.width = 35;
        img.height = 35;
        card.appendChild(img);
      }

      const span = document.createElement("span");
      span.textContent = skill.short;
      card.appendChild(span);

      planet.appendChild(card);
      container.appendChild(planet);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initEntrance();
  initScrollAnimations();
  initShootingStars();
  initPlasmaLighter();
  renderSkills();
  initSkillConnector();
  initPlanetSystem();
  initContactSection();
  initCometCursor();
});

// --- Star Animation ---
function initStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let stars = [];
  let numStars = 800;
  let width, height;
  let cx = 0,
    cy = 0;
  let warp = 0; // 0 = calm, 1 = full hyperspace
  let warpTarget = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(makeStar());
    }
  }

  function makeStar() {
    return {
      // Position relative to center for radial warp
      x: Math.random() * width - cx,
      y: Math.random() * height - cy,
      z: Math.random() * width,
      size: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.05 + 0.01,
      depth: Math.random() * 0.2 + 0.1, // Parallax depth
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Ease warp factor toward target
    warp += (warpTarget - warp) * 0.06;

    const calm = warp < 0.01;

    stars.forEach((star) => {
      if (calm) {
        // --- Calm drifting stars (original behaviour) ---
        ctx.beginPath();
        ctx.arc(star.x + cx, star.y + cy, star.size, 0, Math.PI * 2);
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        star.y -= star.speed;
        if (star.y + cy < 0) {
          star.y = height - cy;
          star.x = Math.random() * width - cx;
        }

        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;
      } else {
        // --- Warp / hyperspace: stars rush outward from center ---
        star.z -= (4 + warp * 40) * (1 - star.z / width) + 2;
        if (star.z <= 1) {
          star.x = Math.random() * width - cx;
          star.y = Math.random() * height - cy;
          star.z = width;
          star.size = Math.random() * 1.5;
        }

        const k = 128 / star.z;
        const px = cx + star.x * k;
        const py = cy + star.y * k;

        // Previous position for streak length (longer as warp increases)
        const kPrev = 128 / (star.z + 6 + warp * 30);
        const pxp = cx + star.x * kPrev;
        const pyp = cy + star.y * kPrev;

        const a = Math.min(1, (1 - star.z / width) * (0.4 + warp));
        ctx.globalAlpha = a;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = star.size * k * 0.8 + 0.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(pxp, pyp);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }

  // Public controls
  window.startStarWarp = function () {
    warpTarget = 1;
  };
  window.stopStarWarp = function () {
    warpTarget = 0;
  };

  window.addEventListener("resize", debounce(resize));
  window.addEventListener("pagehide", () => {
    warpTarget = 0;
    warp = 0;
    document.body.classList.remove("portal-entering");
  });
  resize();
  registerAnim(draw);
}

// --- Entrance Animation ---
function initEntrance() {
  const splash = document.getElementById("splash");
  const enterBtn = document.getElementById("enter-btn");
  const mainContent = document.getElementById("main-content");
  const earth = document.getElementById("earth");
  const mouseGlow = document.getElementById("mouse-glow");

  if (!splash || !enterBtn || !mainContent || !earth) return;

  let isZooming = false;
  let isDragging = false;

  // Physics targets for spring animation
  let currentX = 0,
    currentY = 0;
  let targetX = 0,
    targetY = 0;
  let velX = 0,
    velY = 0;

  let currentStretch = 1;
  let targetStretch = 1;
  let velStretch = 0;

  const stiffness = 0.15;
  const damping = 0.8;

  function updatePhysics() {
    const fx = (targetX - currentX) * stiffness;
    velX = (velX + fx) * damping;
    currentX += velX;

    const fy = (targetY - currentY) * stiffness;
    velY = (velY + fy) * damping;
    currentY += velY;

    const fs = (targetStretch - currentStretch) * stiffness;
    velStretch = (velStretch + fs) * damping;
    currentStretch += velStretch;

    if (!isZooming) {
      const angle = Math.atan2(currentY, currentX) * (180 / Math.PI);
      earth.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg) scale(${currentStretch}, ${1 / currentStretch}) rotate(${-angle}deg)`;
    }

  }

  registerAnim(updatePhysics);

  earth.addEventListener("mousedown", (e) => {
    if (isZooming) return;
    isDragging = true;
  });

  earth.addEventListener("touchstart", (e) => {
    if (isZooming) return;
    isDragging = true;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    splash.style.setProperty("--mouse-x", `${x}px`);
    splash.style.setProperty("--mouse-y", `${y}px`);
    if (mouseGlow) {
      mouseGlow.style.left = `${x}px`;
      mouseGlow.style.top = `${y}px`;
    }
  }, { passive: true });

  window.addEventListener("mousemove", (e) => {
    if (isZooming) return;
    const x = e.clientX;
    const y = e.clientY;

    splash.style.setProperty("--mouse-x", `${x}px`);
    splash.style.setProperty("--mouse-y", `${y}px`);
    if (mouseGlow) {
      mouseGlow.style.left = `${x}px`;
      mouseGlow.style.top = `${y}px`;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (isDragging) {
      const maxDrag = 250;
      const resistanceFactor = 0.55;

      let tx = dx * resistanceFactor;
      let ty = dy * resistanceFactor;

      const d = Math.sqrt(tx * tx + ty * ty);
      if (d > maxDrag) {
        tx *= maxDrag / d;
        ty *= maxDrag / d;
      }

      targetX = tx;
      targetY = ty;
      targetStretch = 1 + dist / 800;
    } else {
      targetX = (dx / window.innerWidth) * 50;
      targetY = (dy / window.innerHeight) * 50;
      targetStretch = 1;
    }
  });

  window.addEventListener("touchmove", (e) => {
    if (isZooming || !isDragging) return;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    splash.style.setProperty("--mouse-x", `${x}px`);
    splash.style.setProperty("--mouse-y", `${y}px`);
    if (mouseGlow) {
      mouseGlow.style.left = `${x}px`;
      mouseGlow.style.top = `${y}px`;
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const maxDrag = 250;
    const resistanceFactor = 0.55;

    let tx = dx * resistanceFactor;
    let ty = dy * resistanceFactor;

    const d = Math.sqrt(tx * tx + ty * ty);
    if (d > maxDrag) {
      tx *= maxDrag / d;
      ty *= maxDrag / d;
    }

    targetX = tx;
    targetY = ty;
    targetStretch = 1 + dist / 800;
  }, { passive: true });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    targetX = 0;
    targetY = 0;
    targetStretch = 1;
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
    targetX = 0;
    targetY = 0;
    targetStretch = 1;
  });

  enterBtn.addEventListener("click", () => {
    isZooming = true;
    earth.classList.add("zooming");
    splash.classList.add("fading");
    const cd = document.getElementById("cursor-dot");
    if (cd) cd.classList.remove("cursor-hot");

    setTimeout(() => {
      splash.style.display = "none";
      mainContent.classList.add("visible");
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }, 800);
  });

  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "hidden";

  // Persistent Return Logic
  const returnScroll = localStorage.getItem("portfolio_return_scroll");
  if (returnScroll) {
    splash.style.display = "none";
    mainContent.style.display = "block"; // Force display first so layout height is correct
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

    // Jump to spot before showing content
    window.scrollTo(0, parseInt(returnScroll));

    // Now trigger the fade-in
    requestAnimationFrame(() => {
      mainContent.classList.add("visible");
      localStorage.removeItem("portfolio_return_scroll");
    });
  }
}

// --- Shooting Stars ---
function initShootingStars() {
  const container = document.querySelector(".shooting-stars");
  if (!container) return;

  function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";

    // Randomly spawn from top or left edge (outside viewport)
    const isTop = Math.random() > 0.5;
    if (isTop) {
      star.style.top = "-100px";
      star.style.left = Math.random() * 120 - 20 + "%";
    } else {
      star.style.left = "-100px";
      star.style.top = Math.random() * 120 - 20 + "%";
    }

    // Randomize speed/duration (Slower range: 8s to 15s)
    const duration = 8 + Math.random() * 7;
    star.style.animationDuration = duration + "s";

    container.appendChild(star);

    setTimeout(
      () => {
        star.remove();
      },
      duration * 1000 + 100,
    );
  }

  // Continuous Persistent Trigger (More subtle: one every 5 to 10s)
  function autoTrigger() {
    createShootingStar();
    setTimeout(autoTrigger, 5000 + Math.random() * 5000);
  }
  autoTrigger();

  window.triggerShootingStar = createShootingStar;
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const panels = document.querySelectorAll(".panel");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  panels.forEach((panel) => observer.observe(panel));
}

// --- Cyber Torch Reveal Logic ---
function initPlasmaLighter() {
  const torch = document.querySelector(".cyber-torch");
  const pedestal = document.querySelector(".torch-pedestal");
  const moduleClip = document.querySelector(".module-clip");
  const revealText = document.querySelector(".torch-reveal-text");
  const statusText = document.getElementById("decryption-status");

  if (!torch || !moduleClip) return;

  let isGrabbed = false;
  let decryptPercent = 0;
  let clickOffsetX = 0;
  let clickOffsetY = 0;

  function updateLightPosition(e) {
    if (!isGrabbed) return;

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    // Pure CSS Solar System implemented. No complex JS dependencies required for 3D orbits.

    // Calculate movement based on initial click offset
    const tx = clientX - clickOffsetX;
    const ty = clientY - clickOffsetY;

    torch.style.transform = `translate(${tx}px, ${ty}px) rotate(${tx * 0.05}deg)`;
    torch.style.transition = "none";

    // Update the flashlight beam (emanating from the torch flame tip, not the cursor)
    const torchRect = torch.getBoundingClientRect();
    const textRect = revealText.getBoundingClientRect();

    // lx/ly should be the flame position relative to the text box
    const lx = torchRect.left + torchRect.width / 2 - textRect.left;
    const ly = torchRect.top - textRect.top;

    revealText.style.setProperty("--light-x", `${lx}px`);
    revealText.style.setProperty("--light-y", `${ly}px`);

    // Check if we are over the text area (based on flame position)
    const clipRect = moduleClip.getBoundingClientRect();
    const cx = torchRect.left + torchRect.width / 2 - clipRect.left;
    const cy = torchRect.top - clipRect.top;
    if (cx > 0 && cx < clipRect.width && cy > 0 && cy < clipRect.height) {
      if (decryptPercent < 100) {
        decryptPercent = Math.min(100, decryptPercent + 0.3); // Faster on active move
        statusText.innerText = `DECRYPTING... ${Math.floor(decryptPercent)}%`;
        statusText.style.color = "var(--accent-cyan)";
        statusText.style.textShadow = "0 0 15px var(--accent-cyan)";
        statusText.classList.add("decryption-active");
      } else {
        completeDecryption();
      }
    } else {
      if (decryptPercent >= 100) {
        completeDecryption();
      } else {
        statusText.innerText = "WAITING...";
        statusText.style.color = "rgba(255,255,255,0.3)";
        statusText.style.textShadow = "none";
        statusText.classList.remove("decryption-active");
      }
    }
  }

  const completeDecryption = () => {
    const container = document.querySelector(".module-clip");
    const glassModule = document.querySelector(".about-glass-module");
    if (container) container.classList.add("decrypted");
    if (glassModule) glassModule.classList.add("decrypted");

    revealText.classList.add("decrypted");
    statusText.innerText = "ACCESS_GRANTED";
    statusText.style.color = "#4ade80";
    statusText.style.textShadow = "0 0 10px rgba(74, 222, 128, 0.5)";

    // Sync the switch if it's not already on
    if (overrideSwitch && !overrideSwitch.checked) {
      overrideSwitch.checked = true;
    }

    // Removed: Hide the torch hint logic to keep it visible
    // const torchHint = document.querySelector('.torch-hint');
    // if (torchHint) torchHint.style.opacity = '0';
  };

  const overrideSwitch = document.getElementById("torch-override");
  if (overrideSwitch) {
    overrideSwitch.addEventListener("change", (e) => {
      const container = document.querySelector(".module-clip");
      if (e.target.checked) {
        decryptPercent = 100; // Instantly complete
        completeDecryption();
      } else {
        // Manual Lockdown: Restore the "barely visible" dark state
        if (container) container.classList.remove("decrypted");
        const glassModule = document.querySelector(".about-glass-module");
        if (glassModule) glassModule.classList.remove("decrypted");

        revealText.classList.remove("decrypted");
        decryptPercent = 0; // Reset progress so it can be re-decrypted

        // Restore WAITING status
        statusText.innerText = "WAITING...";
        statusText.style.color = "rgba(255,255,255,0.3)";
        statusText.style.textShadow = "none";

        // Move the light beam far away
        revealText.style.setProperty("--light-x", "-1000px");
        revealText.style.setProperty("--light-y", "-1000px");
      }
    });

    // Check by default on mobile to show the glowing background state
    if (window.matchMedia("(max-width: 768px)").matches) {
      overrideSwitch.checked = true;
      decryptPercent = 100;
      completeDecryption();
    }
  }

  const startDrag = (e) => {
    isGrabbed = true;
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    // Capture pedestal center to calculate relative transform
    const pedRect = pedestal.getBoundingClientRect();
    const pedCenterX = pedRect.left + pedRect.width / 2;
    const pedCenterY = pedRect.top + pedRect.height / 2;

    // Store the offset between where we clicked and where tx/ty=0 (the center)
    clickOffsetX = clientX;
    clickOffsetY = clientY;

    torch.classList.add("is-grabbed");
    torch.style.cursor = "grabbing";
    document.body.style.cursor = "grabbing";
  };

  const stopDrag = () => {
    if (!isGrabbed) return;
    isGrabbed = false;
    torch.style.cursor = "grab";
    document.body.style.cursor = "default";

    // Keep is-grabbed ON so float animation stays paused during the return journey
    // Use a smooth spring transition back to origin
    torch.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    torch.style.transform = "translate(0, 0) rotate(0deg)";

    // Once the return transition ends, hand control back to the float animation
    const onReturnEnd = () => {
      torch.removeEventListener("transitionend", onReturnEnd);
      torch.style.transition = "";
      torch.style.transform = "";
      torch.classList.remove("is-grabbed"); // Resume zero-gravity float
    };
    torch.addEventListener("transitionend", onReturnEnd);

    // Reset Light variables if not yet fully decrypted
    if (decryptPercent < 100) {
      revealText.style.setProperty("--light-x", "-500px");
      revealText.style.setProperty("--light-y", "-500px");
      statusText.innerText = "WAITING...";
      statusText.style.color = "rgba(255,255,255,0.3)";
    } else {
      completeDecryption();
    }
  };

  torch.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", updateLightPosition);
  window.addEventListener("mouseup", stopDrag);

  torch.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      startDrag(e);
    },
    { passive: false },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      updateLightPosition(e);
    },
    { passive: false },
  );
  window.addEventListener("touchend", stopDrag);
}

// --- Skill Hover Connector ---
function initSkillConnector() {
  const svg = document.getElementById("skill-connector-svg");
  const panel = document.getElementById("skill-detail-panel");
  if (!svg || !panel) return;

  const cards = document.querySelectorAll(".planet-card[data-name]");

  // Cache panel sub-elements
  const sdpTag = panel.querySelector(".sdp-tag");
  const sdpIcon = panel.querySelector(".sdp-icon-wrap");
  const sdpName = panel.querySelector(".sdp-name");
  const sdpDesc = panel.querySelector(".sdp-desc");

  // SVG line + endpoint dot
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.classList.add("skill-connector-line");
  line.style.display = "none";

  const dotStart = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  dotStart.setAttribute("r", "4");
  dotStart.classList.add("skill-connector-dot");
  dotStart.style.display = "none";

  const dotEnd = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  dotEnd.setAttribute("r", "4");
  dotEnd.classList.add("skill-connector-dot");
  dotEnd.style.display = "none";

  svg.appendChild(line);
  svg.appendChild(dotStart);
  svg.appendChild(dotEnd);

  function showConnector(card) {
    const data = card.dataset;
    const svgRect = svg.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    // Card center in SVG-local coords
    const cx = cardRect.left + cardRect.width / 2 - svgRect.left;
    const cy = cardRect.top + cardRect.height / 2 - svgRect.top;

    // Panel entry point (left-center of the panel)
    const px = panelRect.left - svgRect.left;
    const py = panelRect.top + panelRect.height / 2 - svgRect.top;

    // Set connector line
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", px);
    line.setAttribute("y2", py);
    line.style.display = "";

    dotStart.setAttribute("cx", cx);
    dotStart.setAttribute("cy", cy);
    dotStart.style.display = "";

    dotEnd.setAttribute("cx", px);
    dotEnd.setAttribute("cy", py);
    dotEnd.style.display = "";

    // Populate panel
    sdpTag.textContent = data.tag || "Skill";
    sdpName.textContent = data.name || "";
    sdpDesc.textContent = data.desc || "";

    // Clone icon from card
    sdpIcon.innerHTML = "";
    const img = card.querySelector("img");
    const svgEl = card.querySelector("svg");
    if (img) {
      const clone = img.cloneNode(true);
      sdpIcon.appendChild(clone);
    } else if (svgEl) {
      const clone = svgEl.cloneNode(true);
      sdpIcon.appendChild(clone);
    }

    panel.classList.add("visible");
  }

  function hideConnector() {
    line.style.display = "none";
    dotStart.style.display = "none";
    dotEnd.style.display = "none";
    panel.classList.remove("visible");
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => showConnector(card));
    card.addEventListener("mouseleave", hideConnector);
    card.addEventListener("click", (e) => {
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        e.stopPropagation();
        const wasActive = card.classList.contains("active");
        
        // Clear active class from all cards first
        document.querySelectorAll(".planet-card").forEach(c => c.classList.remove("active"));
        
        if (!wasActive) {
          card.classList.add("active");
          showConnector(card);
        } else {
          hideConnector();
        }
      }
    });
  });

  window.addEventListener("click", () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      document.querySelectorAll(".planet-card").forEach(c => c.classList.remove("active"));
      hideConnector();
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  CONSTELLATION CONTACT SECTION
//  initContactSection()
// ─────────────────────────────────────────────────────────────────────────────
function initContactSection() {
  const form = document.getElementById("transmitter-form");
  if (!form) return;

  const btn = document.getElementById("tf-submit");
  const terminal = document.getElementById("tf-terminal");
  const inputs = form.querySelectorAll(".tf-input");
  const wrap = document.querySelector(".transmitter-form-wrap");
  const satWrap = document.querySelector(".transmitter-avatar-badge");

  // Typewriter/log helper to add lines to terminal
  function logLine(text, type = "") {
    if (!terminal) return;
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    line.innerText = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Clear terminal
  function clearLog() {
    if (!terminal) return;
    terminal.innerHTML = "";
  }

  // Update button state based on validity and signal strength meter
  function updateState() {
    let filledCount = 0;
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim()) {
        filledCount++;
      } else {
        isValid = false;
      }
    });

    if (btn) btn.disabled = !isValid;
  }

  // Particle spawning on input typing
  function spawnParticle(input) {
    if (!wrap || !satWrap) return;

    const inputRect = input.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const satRect = satWrap.getBoundingClientRect();

    // Random X along input line, Y at the bottom border
    const spawnX = inputRect.left - wrapRect.left + Math.random() * inputRect.width;
    const spawnY = inputRect.bottom - wrapRect.top;

    // Center of the satellite dish
    const targetX = satRect.left - wrapRect.left + satRect.width / 2;
    const targetY = satRect.top - wrapRect.top + satRect.height / 2;

    const destX = targetX - spawnX;
    const destY = targetY - spawnY;

    const particle = document.createElement("span");
    particle.className = "typing-particle";
    particle.style.left = `${spawnX}px`;
    particle.style.top = `${spawnY}px`;
    particle.style.setProperty("--dest-x", `${destX}px`);
    particle.style.setProperty("--dest-y", `${destY}px`);

    const size = Math.random() * 4 + 3; // 3px to 7px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = Math.random() > 0.45 ? "var(--accent-cyan)" : "var(--accent-gold)";

    wrap.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1200);
  }

  // Attach input listeners
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      updateState();
      // Spawn a dynamic particle if key is not empty space
      if (e.target.value.trim()) {
        spawnParticle(input);
      }
    });
  });

  // Submit animation sequence
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (btn) {
      btn.classList.add("submitting");
      btn.disabled = true;
    }
    if (wrap) wrap.classList.add("transmitting");

    clearLog();
    logLine("> Processing your message...", "system");

    // Spawn a shockwave ring
    if (satWrap) {
      const ring = document.createElement("div");
      ring.className = "shockwave-ring animate";
      satWrap.appendChild(ring);
      setTimeout(() => ring.remove(), 1600);
    }

    setTimeout(() => {
      logLine("> Validating details...");
    }, 500);

    setTimeout(() => {
      logLine("> Sending message...");
    }, 1000);

    setTimeout(() => {
      logLine("> Connection secured.", "system");
    }, 1500);

    setTimeout(() => {
      logLine("> Message sent successfully!", "system");
      if (btn) {
        btn.classList.remove("submitting");
        btn.classList.add("success");
        btn.querySelector(".btn-text").innerText = "MESSAGE SENT ✓";
      }
    }, 2200);

    setTimeout(() => {
      logLine("> Thanks for reaching out! I'll get back to you soon.");
    }, 2700);

    // Form cleanup and reset sequence
    setTimeout(() => {
      form.reset();
      updateState();
      if (wrap) wrap.classList.remove("transmitting");
      if (btn) {
        btn.classList.remove("success");
        btn.querySelector(".btn-text").innerText = "SEND MESSAGE";
      }
      clearLog();
      logLine("> Ready for your message...");
    }, 5500);
  });

  // Init state on page load
  updateState();
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMET TRAIL CUSTOM CURSOR
//  initCometCursor()
//  ├─ light canvas trail (single rAF via master loop, fading line segments)
//  ├─ interpolated dot that smoothly eases toward the real pointer
//  └─ "hot" state over interactive elements
// ─────────────────────────────────────────────────────────────────────────────
function initCometCursor() {
  // Skip entirely on touch / coarse-pointer devices
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const canvas = document.getElementById("cursor-trail");
  const dot = document.getElementById("cursor-dot");
  if (!canvas || !dot) return;

  const ctx = canvas.getContext("2d");

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", debounce(resize));

  // Real pointer target + eased dot position
  const target = { x: width / 2, y: height / 2 };
  const pos = { x: target.x, y: target.y };

  // Trail of recent points; each fades out over its lifetime
  const trail = [];
  const MAX_TRAIL = 22;

  let rgb = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-cyan-rgb")
    .trim() || "0, 209, 255";

  // Keep trail color in sync with the active accent (changes per project)
  const colorObserver = new MutationObserver(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-cyan-rgb")
      .trim();
    if (v) rgb = v;
  });
  colorObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });

  window.addEventListener(
    "mousemove",
    (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    },
    { passive: true },
  );

  // "Hot" grow state over interactive elements
  const hotSelector =
    "a, button, input, textarea, .cyber-torch, .skill-planet, .project-planet, .channel-card";
  const earth = document.getElementById("earth");
  const enterBtn = document.getElementById("enter-btn");
  document.addEventListener(
    "mouseover",
    (e) => {
      if (
        e.target.closest(hotSelector) ||
        e.target === earth ||
        e.target === enterBtn ||
        (earth && earth.contains(e.target)) ||
        (enterBtn && enterBtn.contains(e.target))
      ) {
        dot.classList.add("cursor-hot");
      }
    },
    { passive: true },
  );
  document.addEventListener(
    "mouseout",
    (e) => {
      if (
        e.target.closest(hotSelector) ||
        e.target === earth ||
        e.target === enterBtn ||
        (earth && earth.contains(e.target)) ||
        (enterBtn && enterBtn.contains(e.target))
      ) {
        dot.classList.remove("cursor-hot");
      }
    },
    { passive: true },
  );

  function draw() {
    // Ease the dot toward the real pointer (spring-like follow)
    pos.x += (target.x - pos.x) * 0.35;
    pos.y += (target.y - pos.y) * 0.35;

    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

    // Record current point with a life value
    trail.push({ x: pos.x, y: pos.y, life: 1 });
    if (trail.length > MAX_TRAIL) trail.shift();

    // Fade existing points
    for (let i = 0; i < trail.length; i++) {
      trail[i].life -= 0.045;
    }
    while (trail.length && trail[0].life <= 0) trail.shift();

    // Clear with a slight alpha so old frames dissolve (motion blur feel)
    ctx.clearRect(0, 0, width, height);

    if (trail.length > 1) {
      for (let i = 1; i < trail.length; i++) {
        const p0 = trail[i - 1];
        const p1 = trail[i];
        const a = p1.life * 0.85;
        const w = p1.life * 3.5;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(${rgb}, ${a})`;
        ctx.lineWidth = w;
        ctx.lineCap = "round";
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${rgb}, ${a})`;
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;
  }

  registerAnim(draw);

  // Stop the trail when the tab is hidden to save CPU
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      trail.length = 0;
      ctx.clearRect(0, 0, width, height);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  ATMOSPHERIC TRANSITION — "decryption" typewriter + scramble
//  runTransitionDecrypt(el, text)
//  Resolves random glyphs into the real name, char-by-char, with a blinking
//  caret. Also adds the page "suck-in" blur class.
// ─────────────────────────────────────────────────────────────────────────────
const GLYPHS = "▓▒░#@%&*+=/\\<>?01ABCDEF$£¥§";

function runTransitionDecrypt(el, text) {
  if (!el) return;
  document.body.classList.add("portal-entering");
  el.classList.add("typing");

  const len = text.length;
  let frame = 0;
  const totalFrames = len * 3; // scramble settles gradually

  clearInterval(el._decryptTimer);
  el._decryptTimer = setInterval(() => {
    let out = "";
    for (let i = 0; i < len; i++) {
      // Characters lock in left-to-right as the frame progresses
      if (i < frame / 3) {
        out += text[i];
      } else if (text[i] === " ") {
        out += " ";
      } else {
        out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (frame > totalFrames) {
      clearInterval(el._decryptTimer);
      el.textContent = text;
      el.classList.remove("typing");
    }
  }, 28);
}//  initPlanetSystem()
//  ├─ PLANETS[]          project data (edit here to add / change projects)
//  ├─ orbit rings        decorative CSS circles injected into #ps-system
//  ├─ orbit nodes        zero-size position carriers, moved by rAF
//  ├─ planet elements    visual spheres inside each node
//  ├─ SVG connector      color-matched dashed line drawn on hover
//  ├─ detail panel       slide-in card shown on hover
//  ├─ scroll zoom        wheel → scale(psZoom) on the system div
//  └─ modal              "landing" zoom-out + project detail overlay
// ─────────────────────────────────────────────────────────────────────────────
function initPlanetSystem() {
  // ── DOM refs ────────────────────────────────────────────────────────────────
  const section = document.getElementById("projects");
  const system = document.getElementById("ps-system");
  const wrap = document.getElementById("planet-system-wrap");
  const svgEl = document.getElementById("ps-connector-svg");
  const detailEl = document.getElementById("ps-detail-panel");

  if (!section || !system || !wrap || !svgEl || !detailEl) return;

  // ── Runtime state ────────────────────────────────────────────────────────────
  let cx = 0;
  let cy = 0;

  function updateCenter() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    // Top-level system anchor - shift up on mobile to clear bottom nav/overlays
    const globalCX = system.offsetWidth * 0.5;
    const globalCY = system.offsetHeight * (isMobile ? 0.46 : 0.62);

    if (typeof PLANETS !== "undefined" && PLANETS.length > 0) {
      PLANETS.forEach((data, i) => {
        if (isMobile) {
          let mobileIndex = i;
          if (i === 1) {
            mobileIndex = -1; // Hidden on mobile
          } else if (i === 2) {
            mobileIndex = 2; // third position
          } else if (i === 3) {
            mobileIndex = 1; // second position
          }

          if (mobileIndex >= 0) {
            // Align in a clean zig-zag vertically down the center on mobile
            data.baseX = globalCX + (mobileIndex % 2 === 0 ? -45 : 45);
            data.baseY = globalCY - 200 + (mobileIndex * 200);
          } else {
            // Put it off-screen
            data.baseX = -9999;
            data.baseY = -9999;
          }
        } else {
          // Individual anchor override? If not, use global.
          const cx = system.offsetWidth * (data.centerX || 0.5);
          const cy = system.offsetHeight * (data.centerY || 0.62);

          const angle = data.startAngle || 0;
          const distance = data.orbitRadius || 0;

          // Base Position = Anchor + Circular Position + Manual Nudge
          data.baseX = cx + distance * Math.cos(angle) + (data.offsetX || 0);
          data.baseY = cy + distance * Math.sin(angle) + (data.offsetY || 0);

          // Nudge MindShelf further right on tablets (iPad/tablet preview)
          if (isTablet && data.name === "MindShelf") {
            data.baseX = cx - 160;
          }
        }
      });
    }
  }
  // Initial call delayed until after PLANETS is defined
  window.addEventListener("resize", debounce(updateCenter));

  // ── Planet data ─────────────────────────────────────────────────────────────
  const PLANETS = [
    {
      name: "N3M|Nest",
      description:
        "Complete full-stack game tracking platform where users can discover games, build a personal library, review titles, and interact with other players in real time.",
      tech: ["HTML", "TailwindCSS", "JS", "ASP.NET API", "SQL Server"],
      link: "#",
      orbitRadius: 180,
      speed: 0.00032,
      startAngle: 4.8,
      size: 100,
      floatSpeed: 0.004,
      floatRange: 18,
      floatAngle: 2,
      offsetX: -120,
      offsetY: -10,
      colorA: "#00d1ff",
      colorB: "#2b2200",
    },
    {
      name: "SummonerBase",
      description:
        "A full-stack League of Legends web application designed to deliver a seamless and interactive user experience for players and summoners.",
      tech: ["Node.js", "HTML", "JS", "CSS"],
      link: "#",
      orbitRadius: 70,
      speed: 0.0001,
      startAngle: 1.2,
      size: 100,
      floatSpeed: 0.004,
      floatRange: 22,
      floatAngle: 0,
      offsetX: 240,
      offsetY: 20,
      colorA: "#a100a4",
      colorB: "#002033",
    },
    {
      name: "MindShelf",
      description:
        "An Online Bookstore Platform that is more than just a bookstore. It's a community for book lovers packed with powerful discovery features.",
      tech: ["HTML", "CSS", "JS", "ASP.NET MVC", "SQL Server"],
      link: "#",
      orbitRadius: 240,
      speed: 0.00022,
      startAngle: 2.9,
      size: 100,
      floatSpeed: 0.004,
      floatRange: 20,
      floatAngle: 4,
      offsetX: -240,
      offsetY: 20,
      colorA: "#d47800",
      colorB: "#1a0033",
    },
    {
      name: "DangDoro",
      description:
        "Dangdoro is a real-time collaborative Pomodoro app with synced group focus, ambient audio, and AI task planning.",
      tech: ["Next.js", "Tailwind CSS", "Zustand", "Firebase", "OpenRouter API"],
      link: "#",
      orbitRadius: 200,
      speed: 0.00018,
      startAngle: 5.8,
      size: 100,
      floatSpeed: 0.004,
      floatRange: 16,
      floatAngle: 1,
      offsetX: 80,
      offsetY: -80,
      colorA: "#0a7e8c",
      colorB: "#012124",
    },
  ];

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /*
  // ── Orbit rings (removed for free-floating design) ─────────────────────────
  const orbitRadii = [...new Set(PLANETS.map((p) => p.orbitRadius))].sort(
    (a, b) => a - b,
  );
  orbitRadii.forEach((r) => {
    const ring = document.createElement("div");
    ring.className = "ps-orbit-ring";
    ring.style.setProperty("--ps-r", r + "px");
    system.appendChild(ring);
  });
  */

  // ── Build orbit nodes + planet elements ─────────────────────────────────────
  // Two-element structure keeps orbit position (left/top, layout) completely
  // separate from visual transform (scale/hover), preventing transition fights.
  //
  //   ps-orbit-node    – zero-size absolute div; left/top set by rAF
  //     └ project-planet – visible sphere; only transform/box-shadow animated
  const orbitNodes = [];
  const planetEls = [];

  PLANETS.forEach((data, i) => {
    // Specific base positions relative to system center (static but distributed)
    const angle = data.startAngle || i * ((Math.PI * 2) / PLANETS.length);
    const distance = data.orbitRadius || 150 + i * 80;

    data.baseX = cx + distance * Math.cos(angle);
    data.baseY = cy + distance * Math.sin(angle);

    // Floating state
    data.floatAngle = Math.random() * Math.PI * 2;
    data.floatSpeed = 0.008 + Math.random() * 0.007;
    data.floatRange = 15 + Math.random() * 10;

    // Position carrier
    const node = document.createElement("div");
    node.className = "ps-orbit-node";
    if (i === 1) {
      node.classList.add("ps-node--summonerbase");
    }

    // Visual sphere
    const el = document.createElement("div");
    el.className = "project-planet";
    el.setAttribute("data-index", i);
    el.setAttribute("data-name", data.name);
    el.setAttribute("data-description", data.description);
    el.setAttribute("data-tech", data.tech.join(" · "));

    // Per-planet CSS variables (color + pre-computed rgba glows)
    el.style.setProperty("--planet-color-a", data.colorA);
    el.style.setProperty("--planet-color-b", data.colorB);
    el.style.setProperty("--planet-size", data.size + "px");
    el.style.setProperty("--planet-glow-80", hexToRgba(data.colorA, 0.8));
    el.style.setProperty("--planet-glow-50", hexToRgba(data.colorA, 0.5));
    el.style.setProperty("--planet-glow-25", hexToRgba(data.colorA, 0.25));

    // Atmosphere ring (child — inherits CSS vars)
    const atmo = document.createElement("div");
    atmo.className = "ps-planet-atmo";
    el.appendChild(atmo);

    // Name label
    const label = document.createElement("span");
    label.className = "ps-planet-label";
    label.textContent = data.name;
    el.appendChild(label);

    node.appendChild(el);
    system.appendChild(node);

    orbitNodes.push(node);
    planetEls.push(el);
  });

  // Call updateCenter once PLANETS is fully defined to set baseX/baseY
  updateCenter();

  // ── SVG connector elements ───────────────────────────────────────────────────
  const NS = "http://www.w3.org/2000/svg";

  const connLine = document.createElementNS(NS, "line");
  connLine.classList.add("ps-connector-line");
  connLine.style.display = "none";

  const connDotA = document.createElementNS(NS, "circle");
  connDotA.setAttribute("r", "4");
  connDotA.style.display = "none";

  const connDotB = document.createElementNS(NS, "circle");
  connDotB.setAttribute("r", "4");
  connDotB.style.display = "none";

  svgEl.appendChild(connLine);
  svgEl.appendChild(connDotA);
  svgEl.appendChild(connDotB);

  // ── Detail-panel sub-element refs ───────────────────────────────────────────
  const psdpTag = detailEl.querySelector(".psdp-tag");
  const psdpName = detailEl.querySelector(".psdp-name");
  const psdpDesc = detailEl.querySelector(".psdp-desc");
  const psdpTech = detailEl.querySelector(".psdp-tech");
  const psdpLink = detailEl.querySelector(".psdp-link");

  // ── Runtime state ────────────────────────────────────────────────────────────
  let psZoom = 1;
  const ZOOM_MIN = 0.55;
  const ZOOM_MAX = 1.9;

  let animPaused = false;
  let unregisterPlanetAnim = null;
  let hoveredIdx = -1; // index of hovered planet, -1 = none
  let flashFired = false;

  // ── rAF callback (no self-loop) ─────────────────────────────────────────────
  function animate() {
    if (!animPaused) {
      PLANETS.forEach((data, i) => {
        // Increment float angle
        data.floatAngle += data.floatSpeed;

        // Gentle "hover" oscillation
        const driftX = Math.sin(data.floatAngle) * data.floatRange;
        const driftY =
          Math.cos(data.floatAngle * 0.8) * (data.floatRange * 0.7);

        // Apply position
        orbitNodes[i].style.left = data.baseX + driftX + "px";
        orbitNodes[i].style.top = data.baseY + driftY + "px";
      });

      // Keep SVG connector locked onto the moving planet
      if (hoveredIdx >= 0) updateConnector(planetEls[hoveredIdx]);
    }
  }

  // ── IntersectionObserver: register / unregister with master loop ───────────
  const visObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          updateCenter();
          if (!unregisterPlanetAnim) unregisterPlanetAnim = registerAnim(animate);
        } else {
          if (unregisterPlanetAnim) { unregisterPlanetAnim(); unregisterPlanetAnim = null; }
        }
      });
    },
    { threshold: 0.15 },
  );
  visObs.observe(section);

  // ── Scroll zoom ───────────────────────────────────────────────────────────────
  // When zoom is already at its min/max the event is NOT prevented,
  // so the page can scroll naturally to the next section.
  /*
  // Scroll zoom disabled per user request
  wrap.addEventListener(
    "wheel",
    (e) => {
      const delta = e.deltaY * -0.0009;
      const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, psZoom + delta));

      if (newZoom === psZoom) return; // limit reached — let page scroll

      e.preventDefault();
      psZoom = newZoom;
      system.style.transform = `scale(${psZoom})`;
      hideConnector(); // will redraw on next frame once mouse re-enters planet
    },
    { passive: false },
  );
  */

  // ── Hover: detail panel + colour-matched connector ───────────────────────────
  function showDetail(el, i) {
    const data = PLANETS[i];
    hoveredIdx = i;

    if (psdpTag) psdpTag.textContent = "PROJECT";
    if (psdpName) psdpName.textContent = data.name;
    if (psdpDesc) psdpDesc.textContent = data.description;
    if (psdpLink) {
      psdpLink.href = "Project/projects.html?id=" + i;
      psdpLink.onclick = (e) => {
        e.preventDefault();
        const targetUrl = psdpLink.href;

        localStorage.setItem("portfolio_return_scroll", window.scrollY);

        const transition = document.getElementById("entry-transition");
        const transitionText = document.getElementById("transition-planet");

        if (transition) {
          if (transitionText)
            runTransitionDecrypt(transitionText, data.name);
          document.documentElement.style.setProperty("--accent-cyan", data.colorA);

          if (window.startStarWarp) window.startStarWarp();
          transition.classList.add("active");
          document.body.style.overflowX = "hidden";
          document.body.style.overflowY = "hidden";
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 1800);
        } else {
          window.location.href = targetUrl;
        }
      };
    }

    if (psdpTech) {
      psdpTech.innerHTML = "";
      data.tech.forEach((t) => {
        const badge = document.createElement("span");
        badge.className = "psdp-tech-badge";
        badge.textContent = t;
        psdpTech.appendChild(badge);
      });
    }

    // Tint connector to the planet's primary colour
    connLine.style.stroke = hexToRgba(data.colorA, 0.65);
    connLine.style.filter = `drop-shadow(0 0 4px ${data.colorA})`;
    connDotA.style.fill = data.colorA;
    connDotA.style.filter = `drop-shadow(0 0 6px ${data.colorA})`;
    connDotB.style.fill = data.colorA;
    connDotB.style.filter = `drop-shadow(0 0 6px ${data.colorA})`;

    detailEl.classList.add("visible");
    updateConnector(el);
  }

  function hideDetail() {
    hoveredIdx = -1;
    detailEl.classList.remove("visible");
    hideConnector();
  }

  function hideConnector() {
    connLine.style.display = "none";
    connDotA.style.display = "none";
    connDotB.style.display = "none";
  }

  // Recomputes line endpoints using live screen coordinates (works through any transform)
  function updateConnector(el) {
    if (!el || !detailEl.classList.contains("visible")) return;

    const svgRect = svgEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const panelRect = detailEl.getBoundingClientRect();

    const ex = elRect.left + elRect.width / 2 - svgRect.left;
    const ey = elRect.top + elRect.height / 2 - svgRect.top;
    const px = panelRect.left - svgRect.left;
    const py = panelRect.top + panelRect.height / 2 - svgRect.top;

    connLine.setAttribute("x1", ex);
    connLine.setAttribute("y1", ey);
    connLine.setAttribute("x2", px);
    connLine.setAttribute("y2", py);
    connLine.style.display = "";

    connDotA.setAttribute("cx", ex);
    connDotA.setAttribute("cy", ey);
    connDotA.style.display = "";

    connDotB.setAttribute("cx", px);
    connDotB.setAttribute("cy", py);
    connDotB.style.display = "";
  }

  // ── Click: "landing" animation → modal ───────────────────────────────────────
  function triggerLanding(el, i) {
    const data = PLANETS[i];

    animPaused = true;
    hideDetail();

    // CSS transition: planet scales to 9× and fades out (camera rush effect)
    el.classList.add("ps-planet--landing");
    // Ensure the section itself sits above all others to allow spilling over
    const projectsSec = document.getElementById("projects");
    if (projectsSec) projectsSec.classList.add("ps--active-landing");

    setTimeout(() => {
      localStorage.setItem("portfolio_return_scroll", window.scrollY);

      const transition = document.getElementById("entry-transition");
      const transitionText = document.getElementById("transition-planet");

      if (transition) {
        if (transitionText)
          runTransitionDecrypt(transitionText, data.name);
        document.documentElement.style.setProperty("--accent-cyan", data.colorA);

        if (window.startStarWarp) window.startStarWarp();
        transition.classList.add("active");
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "hidden";
        setTimeout(() => {
          window.location.href = "Project/projects.html?id=" + i;
        }, 1800);
      } else {
        window.location.href = "Project/projects.html?id=" + i;
      }
    }, 680);
  }

  // ── Planet event listeners ────────────────────────────────────────────────────
  planetEls.forEach((el, i) => {
    el.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
      showDetail(el, i);
    });
    el.addEventListener("mouseleave", hideDetail);
    el.addEventListener("click", (e) => {
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        e.preventDefault();
        e.stopPropagation();
        triggerLanding(el, i);
      } else {
        triggerLanding(el, i);
      }
    });
  });

  window.addEventListener("click", () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      hideDetail();
    }
  });
}
