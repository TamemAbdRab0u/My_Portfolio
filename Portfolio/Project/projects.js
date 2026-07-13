// ─────────────────────────────────────────────────────────────────────────────
//  projects.js — Data-Panel Grid Layout
// ─────────────────────────────────────────────────────────────────────────────

/* ═══════════════════════════════════════════════════════════════
   1. DATA & THEME
   ═══════════════════════════════════════════════════════════════ */

const DATA = [
  {
    name: "N3M | Nest",
    tagline: "Full-stack gaming ecosystem with social tracking and curated discovery.",
    description:
      "N3M|Nest is a full-stack Game Library Management tracking platform where users can discover games, build a personal library, review titles, and interact with other players in real time.",
    status: "ACTIVE",
    codename: "N3M-001",
    tech: {
      Frontend: ["HTML", "TailwindCSS", "JS"],
      Backend: ["ASP.NET API"],
      Database: ["SQL Server"],
    },
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
    liveUrl: "https://n3m-nest.pages.dev",
    sourceUrl: "https://github.com/TamemAbdRab0u/N3M-Nest-GLM",
  },
  {
    name: "MindShelf",
    tagline: "Cognitive sanctuary for readers — literary e-commerce meets community.",
    description:
      "MindShelf is a comprehensive digital library and book marketplace platform designed to revolutionize how people discover, purchase, and engage with books. Built as part of the ITI (Information Technology Institute) hackathon, MindShelf combines e-commerce functionality with community features to create an immersive reading experience.",
    status: "ACTIVE",
    codename: "MS-001",
    tech: {
      Frontend: ["HTML", "CSS", "JS"],
      Backend: ["ASP.NET MVC"],
      Database: ["SQL Server"],
    },
    media: [
      "../../Projects/MindShelf/photo_2026-03-27_22-15-43.jpg",
      "../../Projects/MindShelf/photo_2026-03-27_22-15-45.jpg",
      "../../Projects/MindShelf/photo_2026-03-27_22-16-02.jpg",
      "../../Projects/MindShelf/2026-03-27 21-51-04.mp4",
    ],
    liveUrl: "#",
    sourceUrl: "https://github.com/Morales020/Mindshelf",
  },
  {
    name: "DangDoro",
    tagline: "Collaborative focus timer and real-time team productivity platform.",
    description:
      "Dangdoro is a collaborative focus timer and productivity application designed to help individuals and teams focus together in real-time. Built with a premium, immersive glassmorphic user interface, Dangdoro combines Pomodoro mechanics, synchronized group focus workspaces, ambient audio mix controls, and AI-powered task planning to create a high-engagement workspace.",
    status: "ACTIVE",
    codename: "DD-001",
    tech: {
      Frontend: [
        "Next.js",
        "Tailwind CSS",
        "Zustand",
      ],
      "Backend & Database": [
        "Firebase",
      ],
      AI: [
        "OpenRouter API",
      ],
    },
    media: [
      "../../Projects/DangDoro/1-enrty.png",
      "../../Projects/DangDoro/2-home.png",
      "../../Projects/DangDoro/3-tasks.png",
      "../../Projects/DangDoro/4-groups.png",
      "../../Projects/DangDoro/5-profile.png",
    ],
    liveUrl: "https://www.dangdoro.com/",
    sourceUrl: "https://github.com/Bitra-Forge/Dangdoro",
  },
];

const THEMES = [
  {
    color: "#00d1ff",
    rgb: "0,209,255",
    name: "NEBULA_BLUE",
  },
  {
    color: "#d47800",
    rgb: "212,120,0",
    name: "SOLAR_ORANGE",
  },
  {
    color: "#0a7e8c",
    rgb: "10,126,140",
    name: "DEEP_TEAL",
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")) || 0;
const project = DATA[id];
const theme = THEMES[id % THEMES.length];

/* ═══════════════════════════════════════════════════════════════
   2. PROJECT INJECTION
   ═══════════════════════════════════════════════════════════════ */

function injectProject() {
  if (!project) return;

  document.documentElement.style.setProperty("--accent-cyan", theme.color);
  document.documentElement.style.setProperty("--accent-rgb", theme.rgb);
  document.title = `${project.name} | Portfolio`;

  // Transition overlay
  const trans = document.getElementById("transition-planet");
  if (trans) trans.textContent = project.name;

  // Header
  const statusEl = document.getElementById("proj-status");
  if (statusEl) statusEl.textContent = `STATUS: ${project.status}`;

  const badge = document.getElementById("status-badge");
  if (badge && project.status === "ARCHIVED") badge.classList.add("offline");

  const codeEl = document.getElementById("proj-codename");
  if (codeEl) codeEl.textContent = project.codename;

  // Title
  const titleEl = document.getElementById("proj-title");
  if (titleEl) titleEl.textContent = project.name;

  // Objective
  const descEl = document.getElementById("proj-desc");
  if (descEl) descEl.textContent = project.description;

  // Systems
  const sysContainer = document.getElementById("proj-systems");
  if (sysContainer) {
    const categories = Object.entries(project.tech);
    categories.forEach(([category, items], ci) => {
      const group = document.createElement("div");
      group.className = "tech-group";

      const label = document.createElement("span");
      label.className = "tech-group-label";
      label.textContent = category;

      const badges = document.createElement("div");
      badges.className = "tech-group-badges";

      items.forEach((tech) => {
        const badge = document.createElement("span");
        badge.className = "tech-badge";
        badge.textContent = tech;
        badges.appendChild(badge);
      });

      group.appendChild(label);
      group.appendChild(badges);
      sysContainer.appendChild(group);
    });
  }

  // Actions
  const liveLink = document.getElementById("proj-live-link");
  if (liveLink) {
    if (project.liveUrl && project.liveUrl !== "#") {
      liveLink.href = project.liveUrl;
    } else {
      liveLink.style.display = "none";
    }
  }

  const sourceLink = document.getElementById("proj-source-link");
  if (sourceLink) {
    if (project.sourceUrl && project.sourceUrl !== "#") {
      sourceLink.href = project.sourceUrl;
    } else {
      sourceLink.style.display = "none";
    }
  }

  // Gallery
  initGallery(project.media);
}

/* ═══════════════════════════════════════════════════════════════
   3. GALLERY CAROUSEL
   ═══════════════════════════════════════════════════════════════ */

function initGallery(media) {
  const viewport = document.getElementById("gallery-viewport");
  if (!viewport || media.length === 0) return;

  const track = document.createElement("div");
  track.className = "gallery-track";
  track.id = "gallery-track";
  viewport.insertBefore(track, viewport.firstChild);

  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  const curEl = document.getElementById("gallery-cur");
  const totEl = document.getElementById("gallery-tot");

  let current = 0;
  const N = media.length;

  if (totEl) totEl.textContent = N;

  // Build slides
  const slides = [];
  media.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "gallery-slide" + (i === 0 ? " is-active" : "");

    if (src.endsWith(".mp4")) {
      const vid = document.createElement("video");
      vid.src = src;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      slide.appendChild(vid);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.name} — screenshot ${i + 1}`;
      img.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(img);
    }

    track.appendChild(slide);
    slides.push(slide);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(N - 1, index));
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));

    if (curEl) curEl.textContent = current + 1;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === N - 1;

    // Play video if active slide contains one
    slides.forEach((s, i) => {
      const v = s.querySelector("video");
      if (v) {
        if (i === current) v.play().catch(() => { });
        else v.pause();
      }
    });
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  // Keyboard nav
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });
  viewport.setAttribute("tabindex", "0");

  goTo(0);
}

/* ═══════════════════════════════════════════════════════════════
   4. PARTICLES
   ═══════════════════════════════════════════════════════════════ */

function initParticles() {
  const field = document.getElementById("particle-field");
  if (!field) return;
  field.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    const size = Math.random() * 2.5 + 0.5;
    p.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:${theme.color};
      border-radius:50%;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      opacity:${Math.random() * 0.25};
      filter:blur(${Math.random() < 0.3 ? "1px" : "0px"});
      animation:drift ${Math.random() * 15 + 15}s linear infinite;
    `;
    field.appendChild(p);
  }
}

const driftStyle = document.createElement("style");
driftStyle.textContent = `
  @keyframes drift {
    0%   { transform:translate(0,0); opacity:0; }
    20%  { opacity:0.3; }
    80%  { opacity:0.3; }
    100% { transform:translate(${Math.random() * 200 - 100}px,-100vh); opacity:0; }
  }
`;
document.head.appendChild(driftStyle);

/* ═══════════════════════════════════════════════════════════════
   6. MOUSE PARALLAX
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  const panel = document.querySelector(".control-panel");
  const ground = document.querySelector(".planet-ground");

  if (panel)
    panel.style.transform = `perspective(1200px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`;

  if (ground)
    ground.style.transform = `rotateX(${45 + y * 0.15}deg) rotateY(${x * 0.15}deg)`;
});

/* ═══════════════════════════════════════════════════════════════
   7. BOOT SEQUENCE
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   8. STAR FIELD
   ═══════════════════════════════════════════════════════════════ */

function initStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let stars = [];
  let numStars = 600;
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

      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }

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

window.addEventListener("load", () => {
  initStars();
  initParticles();
  injectProject();

  const landing = document.getElementById("landing-sequence");
  const container = document.querySelector(".page-container");
  setTimeout(() => {
    if (landing) landing.classList.add("revealed");
    if (container) container.classList.add("revealed");
  }, 1000);
});
