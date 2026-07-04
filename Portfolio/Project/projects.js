// ─────────────────────────────────────────────────────────────────────────────
//  projects.js — Planetary Project Detail Page
//  Sections:
//    1. DATA & THEME
//    2. PROJECT INJECTION  (title, desc, tech)
//    3. BOOT SEQUENCE      (landing reveal, particles)
//    4. initDepthShowcase  (scroll-driven 3D screenshot stack)
//    5. HUD PARALLAX       (mouse → depth tilt)
//    6. UTILITIES          (typeWriter, clock)
// ─────────────────────────────────────────────────────────────────────────────

/* ═══════════════════════════════════════════════════════════════
   1. DATA & THEME
   ═══════════════════════════════════════════════════════════════ */

const DATA = [
  {
    name: "N3M|Nest",
    description:
      "A comprehensive gaming ecosystem where enthusiasts can track their progress, discover upcoming releases through curated feeds, and maintain a shared library of experiences. The platform leverages advanced filtering algorithms and real-time social integration.",
    tech: ["HTML", "TailwindCSS", "JS", "ASP.NET API", "SQL Server"],
    media: [
      "../../Projects/N3M Nest/Screenshot 2026-03-26 192926.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193034.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193053.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193130.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193149.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193217.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193230.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193257.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193307.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193323.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-26 193339.png",
      "../../Projects/N3M Nest/Screenshot 2026-03-27 140104.png",
    ],
  },
  {
    name: "SummonerBase",
    description:
      "A high-performance analytics dashboard for League of Legends, providing deep-dive insights into summoner behaviour and match history. Optimised for speed and clarity, it translates complex API data into actionable competitive intelligence.",
    tech: ["Node.js", "HTML", "JS", "CSS", "Riot API"],
    media: [
      "../../Projects/SummonerBase/Screen1.png",
      "../../Projects/SummonerBase/Screen2.png",
      "../../Projects/SummonerBase/Screen3.png",
      "../../Projects/SummonerBase/Screen4.png",
      "../../Projects/SummonerBase/Screen5.png",
    ],
  },
  {
    name: "MindShelf",
    description:
      "Beyond a storefront, MindShelf is a cognitive sanctuary for readers. It combines literary e-commerce with a powerful community layer, allowing users to host book clubs, share automated reviews, and discover local reading events.",
    tech: ["HTML", "CSS", "JS", "ASP.NET MVC", "SQL Server"],
    media: [
      "../../Projects/MindShelf/2026-03-27 21-51-04.mp4",
      "../../Projects/MindShelf/photo_2026-03-27_22-15-43.jpg",
      "../../Projects/MindShelf/photo_2026-03-27_22-15-45.jpg",
      "../../Projects/MindShelf/photo_2026-03-27_22-16-02.jpg",
    ],
  },
];

const THEMES = [
  {
    color: "#00d1ff",
    rgb: "0,209,255",
    accent: "rgba(0,209,255,0.2)",
    name: "NEBULA_BLUE",
  },
  {
    color: "#a100a4",
    rgb: "161,0,164",
    accent: "rgba(161,0,164,0.2)",
    name: "VOID_PURPLE",
  },
  {
    color: "#ff8e00",
    rgb: "255,142,0",
    accent: "rgba(255,142,0,0.2)",
    name: "SOLAR_ORANGE",
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")) || 0;
const project = DATA[id];
const theme = THEMES[id % THEMES.length];

/* ═══════════════════════════════════════════════════════════════
   2. PROJECT INJECTION
   ═══════════════════════════════════════════════════════════════ */

if (project) {
  // Apply theme accent colour to CSS variables
  document.documentElement.style.setProperty("--accent-cyan", theme.color);
  document.documentElement.style.setProperty(
    "--planet-surface-color",
    theme.color,
  );
  document.documentElement.style.setProperty("--accent-rgb", theme.rgb);

  document.title = `${project.name} | Planetary Exploration`;

  // Transition overlay planet name
  const transPlanet = document.getElementById("transition-planet");
  if (transPlanet) transPlanet.textContent = `PLANET: ${project.name}`;

  // Typewriter effects (delayed for landing sequence)
  typeWriter(document.getElementById("proj-title"), project.name, 100);
  typeWriter(document.getElementById("proj-desc"), project.description, 15);

  // Tech pills with staggered fade-in
  const techContainer = document.getElementById("proj-tech");
  if (techContainer) {
    project.tech.forEach((t, i) => {
      const pill = document.createElement("span");
      pill.className = "tech-pill";
      pill.textContent = t;
      pill.style.cssText = "opacity:0; transform:translateY(10px);";
      techContainer.appendChild(pill);
      setTimeout(
        () => {
          pill.style.cssText =
            "transition:all 0.5s ease; opacity:1; transform:translateY(0);";
        },
        800 + i * 100,
      );
    });
  }

  // Depth showcase project name badge
  const depthName = document.getElementById("depth-proj-name");
  if (depthName) depthName.textContent = project.name;
}

/* ═══════════════════════════════════════════════════════════════
   3. BOOT SEQUENCE — landing reveal & particles
   ═══════════════════════════════════════════════════════════════ */

window.addEventListener("load", () => {
  initParticles();

  const landing = document.getElementById("landing-sequence");
  setTimeout(() => {
    if (landing) landing.classList.add("revealed");
  }, 1000);

  // Kick off the showcase after the DOM is fully laid out
  if (project) initDepthShowcase(project, theme);
});

/* — Particle weather engine — */
function initParticles() {
  const field = document.getElementById("particle-field");
  if (!field) return;
  field.innerHTML = "";

  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
            position:absolute;
            width:${size}px; height:${size}px;
            background:${theme.color};
            border-radius:50%;
            top:${Math.random() * 100}%;
            left:${Math.random() * 100}%;
            opacity:${Math.random() * 0.3};
            filter:blur(${Math.random() < 0.3 ? "1px" : "0px"});
            animation:drift ${Math.random() * 15 + 15}s linear infinite;
        `;
    field.appendChild(p);
  }
}

/* Drift keyframe (random end-X changes per page load) */
const driftStyle = document.createElement("style");
driftStyle.textContent = `
    @keyframes drift {
        0%   { transform:translate(0,0);           opacity:0;   }
        20%  {                                      opacity:0.4; }
        80%  {                                      opacity:0.4; }
        100% { transform:translate(${Math.random() * 200 - 100}px,-100vh); opacity:0; }
    }
`;
document.head.appendChild(driftStyle);

/* ═══════════════════════════════════════════════════════════════
   4. SCROLL-DRIVEN 3D DEPTH SHOWCASE
   ───────────────────────────────────────────────────────────────
   Concept:
     • A "trigger" section is made artificially tall — this gives
       the browser enough scroll room to drive the animation.
     • Inside it a `position:sticky` pane stays on screen for the
       whole scroll window.
     • Each screenshot card has a Z-position that is recomputed
       every requestAnimationFrame from window.scrollY.
     • Cards start stacked deep in Z-space and fly toward the
       viewer one by one as the user scrolls.

   Constants (tweak here):
     SCROLL_PER_CARD  px of page scroll for one card to travel
                      from its initial depth to the front.
     Z_SPACING        px gap between consecutive cards in Z.
     Y_STAGGER        px of vertical offset per depth step
                      (creates "stack" illusion; normalises to 0
                       when a card reaches the front).
     EXIT_Z           z-value beyond which a card starts fading
                      out (it has passed the viewer).
   ═══════════════════════════════════════════════════════════════ */

const SCROLL_PER_CARD = 680; // px of scroll per card pass-through
const Z_SPACING = 1400; // depth gap between cards (px)
const Y_STAGGER = 30; // vertical stagger per depth step (px)
const EXIT_Z = 480; // card fades out past this Z value

function initDepthShowcase(projectData, projectTheme) {
  /* — DOM refs — */
  const trigger = document.getElementById("depth-showcase");
  const stage = document.getElementById("depth-stage");
  const progressEl = document.getElementById("gallery-progress");
  const currentEl = document.getElementById("depth-current");
  const totalEl = document.getElementById("depth-total");
  const hintEl = document.getElementById("depth-hint");

  if (!trigger || !stage) return;

  const media = projectData.media;
  const N = media.length;
  if (N === 0) return;

  /* — Trigger is 100vh (set in CSS) — wheel-lock drives the animation — */

  /* — Populate counter total — */
  if (totalEl) totalEl.textContent = String(N).padStart(2, "0");

  /* ── Build nav dots (right rail) ──────────────────────────── */
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "depth-dots";
  trigger.querySelector(".depth-showcase-sticky").appendChild(dotsContainer);

  const dots = [];
  for (let i = 0; i < N; i++) {
    const dot = document.createElement("div");
    dot.className = "depth-dot" + (i === 0 ? " active" : "");

    // Allow clicking a dot to navigate directly to that card
    dot.addEventListener("click", () => {
      // Because maxWheel = (N - 1) * SCROLL_PER_CARD
      wheelAccum = i * SCROLL_PER_CARD;
      renderAtProgress(wheelAccum / maxWheel);
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  /* ── Build cards ───────────────────────────────────────────── */
  const cards = [];

  media.forEach((src, i) => {
    /* Position carrier (orbit node — layout only) */
    const card = document.createElement("div");
    card.className = "depth-card";
    card.dataset.index = String(i);

    /* Scanline texture overlay */
    const scanline = document.createElement("div");
    scanline.className = "depth-card-scanline";
    card.appendChild(scanline);

    /* HUD tag bottom-left */
    const label = document.createElement("div");
    label.className = "depth-card-label";
    label.textContent = `SPECIMEN_${String(i + 1).padStart(3, "0")}`;
    card.appendChild(label);

    /* Media element */
    if (src.endsWith(".mp4")) {
      const vid = document.createElement("video");
      vid.src = src;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "none";
      card.appendChild(vid);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${projectData.name} — screenshot ${i + 1}`;
      img.loading = i === 0 ? "eager" : "lazy";
      img.decoding = "async";
      card.appendChild(img);
    }

    stage.appendChild(card);
    cards.push(card);
  });

  /* ── Animation state ───────────────────────────────────────── */
  let lastActiveIdx = 0;
  let hintHidden = false;

  // Wheel-lock state
  let wheelAccum = 0; // accumulated wheel delta
  const maxWheel = (N - 1) * SCROLL_PER_CARD; // total delta for all cards
  let isLocked = false;

  // Warp-streak state
  let lastWheelTime = 0;
  let warpTimeout = null;
  let lastWheelDelta = 0;

  /* ── Core render — driven by progress 0→1 ──────────────────── */
  function renderAtProgress(progress01) {
    progress01 = Math.max(0, Math.min(1, progress01));
    // Total Z distance all cards travel
    const travelZ = progress01 * (N - 1) * Z_SPACING;

    let frontIdx = 0;
    let closestZ = -Infinity; // track the card nearest the viewer

    cards.forEach((card, i) => {
      const z = -i * Z_SPACING + travelZ;

      /* ── Opacity ─────────────────────────────────────── */
      let opacity;
      if (z > EXIT_Z) {
        // Exiting past the viewer — quick fade
        opacity = Math.max(0, 1 - (z - EXIT_Z) / 220);
      } else if (z > -Z_SPACING * 0.45) {
        // In the "visible zone" near the front
        opacity = 1;
      } else if (z > -Z_SPACING * 2.2) {
        // Fading into depth (0.45→2.2 steps back = 1→0.15)
        const t = (-z - Z_SPACING * 0.45) / (Z_SPACING * 1.75);
        opacity = Math.max(0.12, 1 - t * 0.88);
      } else {
        // Too deep — invisible, skip compositing
        opacity = 0;
      }
      opacity = Math.max(0, Math.min(1, opacity));

      /* ── Blur (depth of field) ───────────────────────── */
      let blur = 0;
      if (z < -280) {
        // Starts blurring at 280px behind front
        blur = Math.min(7, (-z - 280) / 200);
      }
      // Extra blur while card is still very deep
      if (z < -Z_SPACING * 1.5) {
        blur = Math.min(9, blur + (-z - Z_SPACING * 1.5) / 400);
      }

      /* ── Y stagger ───────────────────────────────────── */
      // Each step back adds Y_STAGGER px downward offset.
      // When a card reaches z=0 (front) its Y offset → 0.
      const rawY = -z * (Y_STAGGER / Z_SPACING); // proportional
      const yOff = Math.max(-80, Math.min(120, rawY)); // clamp

      /* ── Subtle scale hint (augments CSS perspective) ── */
      // Cards deep in space get a tiny extra scale-down so the
      // stack illusion reads clearly even at flat monitor FOV.
      let extraScale = 1;
      if (z < 0) {
        extraScale = Math.max(0.7, 1 + z * 0.00007);
      }

      /* ── Apply ───────────────────────────────────────── */
      if (opacity < 0.005) {
        // Completely invisible — skip GPU layer entirely
        card.style.visibility = "hidden";
      } else {
        card.style.visibility = "";
        card.style.transform =
          `translate(-50%, calc(-50% + ${yOff.toFixed(1)}px))` +
          ` translateZ(${z.toFixed(1)}px)` +
          (extraScale < 1 ? ` scale(${extraScale.toFixed(4)})` : "");
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.08 ? `blur(${blur.toFixed(2)}px)` : "none";
      }

      /* ── Front-card class ────────────────────────────── */
      const isFront = z > -Z_SPACING * 0.5 && z < EXIT_Z;
      card.classList.toggle("is-front", isFront);

      /* ── Track closest card to viewer (for counter) ──── */
      // The "closest" card is the one with the highest Z that
      // hasn't passed the exit threshold — always valid, even
      // mid-transition when no card is strictly "is-front".
      if (z < EXIT_Z && z > closestZ) {
        closestZ = z;
        frontIdx = i;
      }

      /* ── Video playback ──────────────────────────────── */
      const vid = card.querySelector("video");
      if (vid) {
        if (Math.abs(z) < 350) {
          vid.play().catch(() => {
            /* autoplay blocked */
          });
        } else {
          vid.pause();
        }
      }
    });

    /* ── Counter & dot updates ───────────────────────────── */
    if (frontIdx !== lastActiveIdx) {
      const prevIdx = lastActiveIdx;
      lastActiveIdx = frontIdx;

      if (currentEl) {
        currentEl.classList.add("bump");
        currentEl.textContent = String(frontIdx + 1).padStart(2, "0");
        setTimeout(() => currentEl.classList.remove("bump"), 260);
      }

      dots.forEach((d, di) => d.classList.toggle("active", di === frontIdx));
    }

    /* ── Progress bar ────────────────────────────────────── */
    if (progressEl)
      progressEl.style.width = (progress01 * 100).toFixed(2) + "%";

    /* ── Hint ────────────────────────────────────────────── */
    if (!hintHidden && hintEl && progress01 > 0.02) {
      hintEl.classList.add("hidden");
      hintHidden = true;
    }
  }

  /* ── Wheel handler — registered only while locked ──────────── */
  function onWheel(e) {
    const next = wheelAccum + e.deltaY * 1.2;

    // At the end — clamp, let this one scroll event pass to the page,
    // but keep the lock so the next scroll (back) re-enters the gallery.
    if (next > maxWheel && e.deltaY > 0) {
      wheelAccum = maxWheel;
      renderAtProgress(1);
      return; // no preventDefault → page nudges, but lock stays
    }

    // At the start — same: pass through without surrendering the lock.
    if (next < 0 && e.deltaY < 0) {
      wheelAccum = 0;
      renderAtProgress(0);
      return; // no preventDefault → page nudges, but lock stays
    }

    e.preventDefault();
    wheelAccum = Math.max(0, Math.min(maxWheel, next));
    renderAtProgress(wheelAccum / maxWheel);

    // ── Warp streak: fires when scrolling fast ─────────────
    const now = performance.now();
    const speed = Math.abs(e.deltaY) / Math.max(1, now - lastWheelTime);
    lastWheelTime = now;
    lastWheelDelta = Math.abs(e.deltaY);

    if (speed > 1.5 || lastWheelDelta > 90) {
      // Fast scroll → show warp streaks
      stage.classList.add("warping");
      clearTimeout(warpTimeout);
      warpTimeout = setTimeout(() => stage.classList.remove("warping"), 120);
    }
  } // end onWheel

  /* ── Touch support ─────────────────────────────────────────── */
  let _touchY = 0;
  function onTouchStart(e) {
    _touchY = e.touches[0].clientY;
  }
  function onTouchMove(e) {
    const dy = _touchY - e.touches[0].clientY;
    _touchY = e.touches[0].clientY;
    onWheel({ deltaY: dy * 2.5, preventDefault: () => e.preventDefault() });
  }
  trigger.addEventListener("touchstart", onTouchStart, { passive: true });

  /* ── Lock / unlock page scroll ─────────────────────────────── */
  function lock() {
    if (isLocked) return;
    isLocked = true;
    // Snap section to top of viewport (instant — no animation glitch)
    trigger.scrollIntoView({ block: "start", behavior: "instant" });
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
  }

  function unlock() {
    if (!isLocked) return;
    isLocked = false;
    document.removeEventListener("wheel", onWheel);
    document.removeEventListener("touchmove", onTouchMove);
  }

  /* ── IntersectionObserver — lock when section is 60 % visible ─ */
  const entryObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        if (!isLocked) {
          // Coming from below (scroll down) → start at beginning
          // Coming from above (scroll up)   → start at end so user rewinds
          wheelAccum = entry.boundingClientRect.top >= 0 ? 0 : maxWheel;
          lock();
        }
      } else {
        // Fully left viewport — make sure lock is released
        unlock();
      }
    },
    { threshold: [0.6] },
  );
  entryObs.observe(trigger);

  /* ── Initial render & resize ────────────────────────────────── */
  renderAtProgress(0);
  window.addEventListener("resize", () =>
    renderAtProgress(wheelAccum / (maxWheel || 1)),
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. HUD PARALLAX — mouse → tilt & stats
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  const hud = document.querySelector(".hud-frame");
  const hero = document.querySelector(".hero-content");
  const ground = document.querySelector(".planet-ground");

  if (hud) hud.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  if (hero)
    hero.style.transform =
      `rotateY(${x * 0.1}deg) rotateX(${-y * 0.1}deg) ` +
      `translate(${x}px, ${y}px)`;
  if (ground)
    ground.style.transform = `rotateX(${45 + y * 0.2}deg) rotateY(${x * 0.2}deg)`;

  // Live HUD telemetry
  const stats = document.getElementById("hud-stats");
  if (stats) {
    const alt = (12.4 + y * 0.01).toFixed(2);
    const o2 = (18.2 + Math.sin(Date.now() / 1000) * 0.1).toFixed(1);
    stats.innerHTML =
      `COORD: ${Math.round(e.clientX)},${Math.round(e.clientY)}<br>` +
      `ALT: ${alt}km<br>` +
      `O2: ${o2}%<br>` +
      `TEMP: -142°C`;
  }
});

/* ═══════════════════════════════════════════════════════════════
   6. UTILITIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Typewriter effect — reveals `text` character-by-character.
 * Waits `delay` ms before starting (landing sequence time).
 */
function typeWriter(element, text, speed, delay = 1800) {
  if (!element) return;
  element.innerHTML = "";
  let i = 0;
  function tick() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i++);
      setTimeout(tick, speed);
    }
  }
  setTimeout(tick, delay);
}

/* System clock */
function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `MISSION_ELAPSED // ${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();
