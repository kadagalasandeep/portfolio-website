/* ═══════════════════════════════════
   Sandeep Portfolio — Frontend JS
   ═══════════════════════════════════ */

const API_BASE = window.location.origin;

// ─── NAV ────────────────────────────
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ─── SMOOTH SCROLL ──────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── PROJECTS ───────────────────────
let allProjects = [];
let activeFilter = "all";

async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    allProjects = data.data || [];
    renderProjects(allProjects);
  } catch (err) {
    console.warn("API unavailable, using local data:", err.message);
    allProjects = getSandeepProjects();
    renderProjects(allProjects);
  }
}

function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  if (!filtered.length) {
    grid.innerHTML = `<div class="projects-loading"><p>No projects in this category yet.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => buildCard(p, i)).join("");
}

function buildCard(p, index) {
  const labels = { web: "Web App", ml: "AI / ML", iot: "IoT", backend: "Backend", other: "Other" };
  const stacks = (p.techStack || []).slice(0, 5)
    .map((t) => `<span class="stack-tag">${t}</span>`).join("");

  const liveLink = p.liveUrl
    ? `<a href="${p.liveUrl}" class="card-link" target="_blank">Live Demo ↗</a>`
    : `<span class="card-link disabled">No demo</span>`;

  const ghLink = p.githubUrl
    ? `<a href="${p.githubUrl}" class="card-link" target="_blank">GitHub ↗</a>`
    : `<span class="card-link disabled">Private</span>`;

  return `
    <div class="project-card ${p.featured ? "featured" : ""}" style="animation-delay:${index * 0.07}s">
      <div class="card-header">
        <span class="card-category">${labels[p.category] || p.category}</span>
        ${p.featured ? '<span class="card-featured-mark">★ Featured</span>' : ""}
      </div>
      <h3 class="card-title">${escapeHtml(p.title)}</h3>
      <p class="card-desc">${escapeHtml(p.description)}</p>
      <div class="card-stack">${stacks}</div>
      <div class="card-links">${liveLink}${ghLink}</div>
    </div>`;
}

// ─── FILTER ─────────────────────────
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProjects(allProjects);
  });
});

// ─── CONTACT FORM ───────────────────
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  submitBtn.disabled = true;
  btnText.hidden = true;
  btnLoading.hidden = false;
  formStatus.hidden = true;

  const body = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    subject: contactForm.subject.value.trim(),
    message: contactForm.message.value.trim(),
  };

  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.success) {
      showStatus("success", "✓ Message sent! Sandeep will get back to you soon.");
      contactForm.reset();
    } else {
      showStatus("error", data.error || "Something went wrong. Please try again.");
    }
  } catch {
    showStatus("success", "✓ Message received! (Demo mode — connect MongoDB to store messages)");
    console.log("Contact submission:", body);
    contactForm.reset();
  } finally {
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnLoading.hidden = true;
  }
});

function showStatus(type, msg) {
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = msg;
  formStatus.hidden = false;
  setTimeout(() => { formStatus.hidden = true; }, 6000);
}

// ─── UTILS ──────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── SANDEEP'S REAL PROJECTS ────────
function getSandeepProjects() {
  return [
    {
      _id: "1",
      title: "Kisan Mitra",
      featured: true,
      category: "ml",
      description: "AI-powered crop advisory system helping farmers with smart agriculture decisions. Built as an IoT prototype.",
      techStack: ["Python", "AI/ML", "IoT", "Vercel"],
      liveUrl: "https://kisan-mitra-gdg.vercel.app",
      githubUrl: "",
    },
    {
      _id: "2",
      title: "Multimodal Emotion Recognition",
      featured: true,
      category: "ml",
      description: "Web-based interface that detects facial emotions in real time using webcam input and a deep learning model.",
      techStack: ["Python", "PyTorch", "OpenCV", "Streamlit", "Librosa"],
      liveUrl: "",
      githubUrl: "https://github.com/kadagalasandeep",
    },
    {
      _id: "3",
      title: "E-Commerce Website",
      featured: true,
      category: "web",
      description: "Responsive e-commerce platform for product browsing and online purchasing with cart and smooth UI.",
      techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
      liveUrl: "https://framegifts.netlify.app/",
      githubUrl: "",
    },
    {
      _id: "4",
      title: "Golden Black Café Website",
      featured: false,
      category: "web",
      description: "Local business platform for a café — featuring menu, location, and contact details with a clean design.",
      techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
      liveUrl: "https://goldenblackcafe.netlify.app/",
      githubUrl: "",
    },
    {
      _id: "5",
      title: "IoT Education Guide",
      featured: false,
      category: "web",
      description: "Student resource website covering IoT concepts, tutorials, and project ideas for beginners.",
      techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
      liveUrl: "https://iotkingguide.netlify.app/",
      githubUrl: "",
    },
    {
      _id: "6",
      title: "Smart Agriculture Monitoring",
      featured: false,
      category: "iot",
      description: "IoT-based system to track soil moisture, temperature, and humidity for real-time smart farming.",
      techStack: ["IoT Sensors", "Microcontroller", "Embedded C"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      _id: "7",
      title: "Smart Irrigation System",
      featured: false,
      category: "iot",
      description: "Automated irrigation that waters crops based on soil moisture levels — reducing water wastage.",
      techStack: ["Soil Moisture Sensor", "IoT Modules", "Microcontroller"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      _id: "8",
      title: "RFID Smart Identification System",
      featured: false,
      category: "iot",
      description: "RFID-based access and identification system for incubation center applications with secure tracking.",
      techStack: ["RFID Module", "Microcontroller", "Embedded Programming"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      _id: "9",
      title: "Fire Fighting Robot",
      featured: false,
      category: "iot",
      description: "Autonomous robot that detects and extinguishes small fires using flame sensors and motor control.",
      techStack: ["Arduino", "Flame Sensors", "Motor Drivers"],
      liveUrl: "",
      githubUrl: "https://github.com/kadagalasandeep",
    },
  ];
}

// ─── INIT ────────────────────────────
fetchProjects();