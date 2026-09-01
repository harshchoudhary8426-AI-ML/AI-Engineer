document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const resumeNav = document.getElementById("resumeNav");
const resumeModal = document.getElementById("resumeModal");
const resumeClose = document.getElementById("resumeClose");
const themeToggle = document.getElementById("themeToggle");

const applyTheme = theme => {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
};

const openResume = () => {
  resumeModal.classList.add("open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeResume = () => {
  resumeModal.classList.remove("open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
resumeNav.addEventListener("click", event => {
  event.preventDefault();
  openResume();
});
resumeClose.addEventListener("click", closeResume);
resumeModal.addEventListener("click", event => {
  if (event.target === resumeModal) closeResume();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && resumeModal.classList.contains("open")) closeResume();
});
themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

window.addEventListener("load", () => {
  document.body.classList.add("site-loaded");
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
