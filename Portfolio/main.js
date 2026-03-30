// main.js

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initEntrance();
  initScrollAnimations();
  initShootingStars();
  initPlasmaLighter();
  initSkillConnector();
  initPlanetSystem();
});

// --- Star Animation ---
function initStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let stars = [];
  let numStars = 800;
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
        depth: Math.random() * 0.2 + 0.1, // Parallax depth
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.globalAlpha = star.opacity;
      ctx.fill();

      // Movement
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }

      // Twinkle
      star.opacity += (Math.random() - 0.5) * 0.05;
      if (star.opacity < 0.1) star.opacity = 0.1;
      if (star.opacity > 1) star.opacity = 1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
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

    requestAnimationFrame(updatePhysics);
  }

  updatePhysics();

  earth.addEventListener("mousedown", (e) => {
    if (isZooming) return;
    isDragging = true;
  });

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

  window.addEventListener("mouseup", () => {
    isDragging = false;
    targetX = 0;
    targetY = 0;
    targetStretch = 1;
  });

  enterBtn.addEventListener("click", () => {
    isZooming = true;
    earth.classList.add("zooming");
    splash.classList.add("fading");

    setTimeout(() => {
      splash.style.display = "none";
      mainContent.classList.add("visible");
      document.body.style.overflow = "auto";
    }, 800);
  });

  document.body.style.overflow = "hidden";
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
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLANET SYSTEM — Projects Section
//  initPlanetSystem()
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
  const modalEl = document.getElementById("ps-modal");
  const modalClose = document.getElementById("ps-modal-close");

  if (!section || !system || !wrap || !svgEl || !detailEl || !modalEl) return;

  // ── Runtime state ────────────────────────────────────────────────────────────
  let cx = 0;
  let cy = 0;

  function updateCenter() {
    // Top-level system anchor
    const globalCX = system.offsetWidth * 0.50;
    const globalCY = system.offsetHeight * 0.62;

    if (typeof PLANETS !== 'undefined' && PLANETS.length > 0) {
      PLANETS.forEach((data, i) => {
        // Individual anchor override? If not, use global.
        const cx = system.offsetWidth * (data.centerX || 0.50);
        const cy = system.offsetHeight * (data.centerY || 0.62);

        const angle = data.startAngle || 0;
        const distance = data.orbitRadius || 0;

        // Base Position = Anchor + Circular Position + Manual Nudge
        data.baseX = cx + (distance * Math.cos(angle)) + (data.offsetX || 0);
        data.baseY = cy + (distance * Math.sin(angle)) + (data.offsetY || 0);
      });
    }
  }
  // Initial call delayed until after PLANETS is defined
  window.addEventListener("resize", updateCenter);

  // ── Planet data ─────────────────────────────────────────────────────────────
  const PLANETS = [
    {
      name: "N3M|Nest",
      description:
        "Complete full-stack game tracking platform where users can discover games, build a personal library, review titles, and interact with other players in real time.",
      tech: ["HTML", "TailwindCSS", "JS", "ASP.NET API", "SQL Server"],
      link: "#",
      orbitRadius: 70,
      speed: 0.00010,
      startAngle: 1.2,
      size: 80,
      floatSpeed: 0.004,
      floatRange: 22,
      floatAngle: 0,
      offsetX: 300,
      offsetY: 0,
      colorA: "#00d1ff", 
      colorB: "#2b2200",
    },
    {
      name: "SummonerBase",
      description:
        "A full-stack League of Legends web application designed to deliver a seamless and interactive user experience for players and summoners.",
      tech: ["Node.js", "HTML", "JS", "CSS"],
      link: "#",
      orbitRadius: 180,
      speed: 0.00032,
      startAngle: 4.8,
      size: 70,
      floatSpeed: 0.004,
      floatRange: 18,
      floatAngle: 2,
      offsetX: 0,
      offsetY: 0,
      colorA: "#a100a4", 
      colorB: "#002033",
    },
    {
      name: "MindShelf",
      description:
        "An Online Bookstore Platform that is more than just a bookstore. It’s a community for book lovers packed with powerful discovery features.",
      tech: ["HTML", "CSS", "JS", "ASP.NET MVC", "SQL Server"],
      link: "#",
      orbitRadius: 240,
      speed: 0.00022,
      startAngle: 2.9,
      size: 80,
      floatSpeed: 0.004,
      floatRange: 20,
      floatAngle: 4,
      offsetX: -100,
      offsetY: 0,
      colorA: "#8e4a01", 
      colorB: "#1a0033",
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
    const angle = data.startAngle || (i * (Math.PI * 2 / PLANETS.length));
    const distance = data.orbitRadius || (150 + i * 80);
    
    data.baseX = cx + distance * Math.cos(angle);
    data.baseY = cy + distance * Math.sin(angle);
    
    // Floating state
    data.floatAngle = Math.random() * Math.PI * 2;
    data.floatSpeed = 0.008 + Math.random() * 0.007;
    data.floatRange = 15 + Math.random() * 10;

    // Position carrier
    const node = document.createElement("div");
    node.className = "ps-orbit-node";

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

  // ── Modal sub-element refs ───────────────────────────────────────────────────
  const modalPreview = document.getElementById("ps-modal-preview");
  const modalName = document.getElementById("ps-modal-name");
  const modalDesc = document.getElementById("ps-modal-desc");
  const modalTech = document.getElementById("ps-modal-tech");
  const modalLink = document.getElementById("ps-modal-link");

  // ── Runtime state ────────────────────────────────────────────────────────────
  let psZoom = 1;
  const ZOOM_MIN = 0.55;
  const ZOOM_MAX = 1.9;

  let animPaused = false;
  let rafId = null;
  let hoveredIdx = -1; // index of hovered planet, -1 = none
  /* 
  updateCenter();
  window.addEventListener("resize", updateCenter);
  */

  // ── rAF loop ─────────────────────────────────────────────────────────────────
  function animate() {
    if (!animPaused) {
      PLANETS.forEach((data, i) => {
        // Increment float angle
        data.floatAngle += data.floatSpeed;
        
        // Gentle "hover" oscillation
        const driftX = Math.sin(data.floatAngle) * data.floatRange;
        const driftY = Math.cos(data.floatAngle * 0.8) * (data.floatRange * 0.7);

        // Apply position
        orbitNodes[i].style.left = (data.baseX + driftX) + "px";
        orbitNodes[i].style.top = (data.baseY + driftY) + "px";
      });

      // Keep SVG connector locked onto the moving planet
      if (hoveredIdx >= 0) updateConnector(planetEls[hoveredIdx]);
    }
    rafId = requestAnimationFrame(animate);
  }

  // ── IntersectionObserver: start / stop loop, fire flash ─────────────────────
  const visObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // Recalculate center once section is definitely visible
          updateCenter();
          if (!rafId) rafId = requestAnimationFrame(animate);
          triggerFlash();
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      });
    },
    { threshold: 0.15 },
  );
  visObs.observe(section);

  // ── Cinematic white-flash on section entry ───────────────────────────────────
  function triggerFlash() {
    if (flashFired) return;
    flashFired = true;
    // Wait for the .panel reveal transition (1 s) before flashing
    setTimeout(() => {
      const flash = document.getElementById("ps-flash");
      if (!flash) return;
      flash.classList.add("active");
      setTimeout(() => {
        flash.classList.remove("active");
        setTimeout(() => {
          flashFired = false;
        }, 8000); // re-arm after 8 s
      }, 950);
    }, 900);
  }

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
    if (psdpLink) psdpLink.href = data.link;

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

    setTimeout(() => {
      if (!modalPreview || !modalName || !modalDesc || !modalTech) return;

      // Style the preview sphere to match the clicked planet
      modalPreview.style.background = `radial-gradient(circle at 35% 30%, #fff 0%, ${data.colorA} 30%, ${data.colorB} 100%)`;
      modalPreview.style.boxShadow = `0 0 55px ${hexToRgba(data.colorA, 0.65)}, 0 0 110px ${hexToRgba(data.colorA, 0.3)}`;

      modalName.textContent = data.name;
      modalDesc.textContent = data.description;

      modalTech.innerHTML = "";
      data.tech.forEach((t) => {
        const badge = document.createElement("span");
        badge.className = "ps-modal-tech-badge";
        badge.textContent = t;
        modalTech.appendChild(badge);
      });

      if (modalLink) {
        modalLink.href = data.link;
        modalLink.style.borderColor = hexToRgba(data.colorA, 0.5);
        modalLink.style.color = data.colorA;
      }

      modalEl.classList.add("visible");
    }, 680); // matches CSS landing transition duration
  }

  // ── Close modal ───────────────────────────────────────────────────────────────
  function closeModal() {
    modalEl.classList.remove("visible");
    planetEls.forEach((el) => el.classList.remove("ps-planet--landing"));
    setTimeout(() => {
      animPaused = false;
    }, 420);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("visible"))
      closeModal();
  });

  // ── Planet event listeners ────────────────────────────────────────────────────
  planetEls.forEach((el, i) => {
    el.addEventListener("mouseenter", () => showDetail(el, i));
    el.addEventListener("mouseleave", hideDetail);
    el.addEventListener("click", () => triggerLanding(el, i));
  });
}
