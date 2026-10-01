// Theme toggle: respects saved choice, falls back to system preference
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem('profile-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('profile-theme', nextTheme);
});

// Copy email to clipboard with a small confirmation message
const copyEmailBtn = document.getElementById('copyEmail');
const toast = document.getElementById('toast');
let toastTimer = null;

copyEmailBtn.addEventListener('click', async () => {
  const email = copyEmailBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email copied to clipboard');
  } catch (err) {
    showToast('Could not copy — please copy manually');
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('toast--visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 2200);
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();