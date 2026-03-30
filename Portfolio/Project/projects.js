const DATA = [
    {
        name: "N3M|Nest",
        description: "A comprehensive gaming ecosystem where enthusiasts can track their progress, discover upcoming releases through curated feeds, and maintain a shared library of experiences. The platform leverages advanced filtering algorithms and real-time social integration.",
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
            "../../Projects/N3M Nest/Screenshot 2026-03-27 140104.png"
        ]
    },
    {
        name: "SummonerBase",
        description: "A high-performance analytics dashboard for League of Legends, providing deep-dive insights into summoner behavior and match history. Optimized for speed and clarity, it translates complex API data into actionable competitive intelligence.",
        tech: ["Node.js", "HTML", "JS", "CSS", "Riot API"],
        media: [
            "../../Projects/SummonerBase/Screen1.png",
            "../../Projects/SummonerBase/Screen2.png",
            "../../Projects/SummonerBase/Screen3.png",
            "../../Projects/SummonerBase/Screen4.png",
            "../../Projects/SummonerBase/Screen5.png"
        ]
    },
    {
        name: "MindShelf",
        description: "Beyond a storefront, MindShelf is a cognitive sanctuary for readers. It combines literary e-commerce with a powerful community layer, allowing users to host book clubs, share automated reviews, and discover local reading events.",
        tech: ["HTML", "CSS", "JS", "ASP.NET MVC", "SQL Server"],
        media: [
            "../../Projects/MindShelf/2026-03-27 21-51-04.mp4",
            "../../Projects/MindShelf/photo_2026-03-27_22-15-43.jpg",
            "../../Projects/MindShelf/photo_2026-03-27_22-15-45.jpg",
            "../../Projects/MindShelf/photo_2026-03-27_22-16-02.jpg"
        ]
    }
];

// Dynamic Injection Logic
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id')) || 0;

// Add unique space themes for each project (planet identity)
const THEMES = [
    { color: '#00d1ff', accent: 'rgba(0, 209, 255, 0.2)', name: 'NEBULA_BLUE' },
    { color: '#a100a4', accent: 'rgba(161, 0, 164, 0.2)', name: 'VOID_PURPLE' },
    { color: '#ff8e00', accent: 'rgba(255, 142, 0, 0.2)', name: 'SOLAR_ORANGE' }
];

const project = DATA[id];
const theme = THEMES[id % THEMES.length];

if (project) {
    document.documentElement.style.setProperty('--accent-cyan', theme.color);
    document.title = `${project.name} | Planetary Exploration`;

    // Sync planet name in transition overlay
    const transPlanet = document.getElementById('transition-planet');
    if (transPlanet) transPlanet.textContent = `PLANET: ${project.name}`;

    // Update labels
    const projIndexEl = document.getElementById('proj-index');
    if (projIndexEl) projIndexEl.textContent = `PLANET // ${theme.name} // UNIT-0${id + 1}`;

    // Typewriter effect
    typeWriter(document.getElementById('proj-title'), project.name, 100);
    typeWriter(document.getElementById('proj-desc'), project.description, 15);

    // Mission Status Link
    const link = document.getElementById('proj-link');
    if (link) link.href = project.media[0] || "#";

    // Tech List
    const techContainer = document.getElementById('proj-tech');
    if (techContainer) {
        project.tech.forEach((t, i) => {
            const pill = document.createElement('span');
            pill.className = 'tech-pill';
            pill.textContent = t;
            pill.style.opacity = '0';
            pill.style.transform = 'translateY(10px)';
            techContainer.appendChild(pill);
            setTimeout(() => {
                pill.style.transition = 'all 0.5s ease';
                pill.style.opacity = '1';
                pill.style.transform = 'translateY(0)';
            }, 800 + (i * 100));
        });
    }

    // Media Orbit
    const gallery = document.getElementById('proj-gallery');
    if (gallery) {
        project.media.forEach((src, i) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'media-wrapper';

            if (src.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.className = 'media-item';
                video.src = src;
                video.muted = true;
                video.loop = true;
                video.onmouseover = () => video.play();
                video.onmouseleave = () => video.pause();
                wrapper.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.className = 'media-item';
                img.src = src;
                img.loading = "lazy";
                wrapper.appendChild(img);
            }
            gallery.appendChild(wrapper);
        });
    }
}

// Navigation & Interactive Logic
window.addEventListener('load', () => {
    const landing = document.getElementById('landing-sequence');
    initParticles();

    // Trigger Landing Reveal
    setTimeout(() => {
        if (landing) landing.classList.add('revealed');
    }, 1000); // 1s wait, then reveal
});

// Particle Weather Engine
function initParticles() {
    const field = document.getElementById('particle-field');
    if (!field) return;

    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 2 + 1;
        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-cyan);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.4};
            filter: blur(${Math.random() < 0.5 ? '0px' : '2px'});
            animation: drift ${Math.random() * 10 + 10}s linear infinite;
        `;
        field.appendChild(p);
    }
}

// Global Drift Animation for Particles
const style = document.createElement('style');
style.textContent = `
    @keyframes drift {
        0% { transform: translate(0, 0); opacity: 0; }
        20% { opacity: 0.4; }
        80% { opacity: 0.4; }
        100% { transform: translate(${Math.random() * 200 - 100}px, -100vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Horizontal Gallery & Orbital Progress
const gallery = document.getElementById('proj-gallery');
const progress = document.getElementById('gallery-progress');

if (gallery) {
    gallery.addEventListener('scroll', () => {
        // Update Progress Bar
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        const scrolled = (gallery.scrollLeft / maxScroll) * 100;
        if (progress) progress.style.width = scrolled + "%";

        // Orbital Parallax Effect
        const wrappers = document.querySelectorAll('.media-wrapper');
        wrappers.forEach(card => {
            const rect = card.getBoundingClientRect();
            const center = window.innerWidth / 2;
            const dist = (rect.left + rect.width / 2) - center;
            const rotation = dist * 0.05; // Degree of rotation
            const scale = Math.max(0.85, 1 - Math.abs(dist) * 0.0005);

            card.style.transform = `perspective(1000px) rotateY(${-rotation}deg) scale(${scale})`;
        });
    });
}

function typeWriter(element, text, speed) {
    if (!element) return;
    element.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 1500); // Wait for landing sequence
}

// System Clock
function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `MISSION_ELAPSED // ${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();
