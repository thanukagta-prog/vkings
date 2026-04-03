document.addEventListener('DOMContentLoaded', () => {
  createEmbers();
  setupRouting();
  setupScrollEffects();
});

// Particle Effects
function createEmbers() {
  const container = document.getElementById('embers-container');
  if(!container) return;
  const emberCount = 40;
  for (let i = 0; i < emberCount; i++) {
    const ember = document.createElement('div');
    ember.classList.add('ember');
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.animationDuration = `${Math.random() * 3 + 2}s`;
    ember.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(ember);
  }
}

// Simple SPA Routing with View Transitions API
function setupRouting() {
  const links = document.querySelectorAll('a[data-link]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      // Check if browser supports View Transitions
      if (!document.startViewTransition) {
        switchPage(targetId);
      } else {
        document.startViewTransition(() => switchPage(targetId));
      }
      
      // Update active nav
      document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
      const activeNav = document.querySelector(`.nav-links a[href="#${targetId}"]`);
      if(activeNav) activeNav.classList.add('active');
    });
  });

  // Handle initial hash
  const initialHash = window.location.hash.substring(1);
  if (initialHash) switchPage(initialHash);
}

function switchPage(targetId) {
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(targetId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.location.hash = targetId;
    window.scrollTo(0, 0);
  }
}

// Scroll Effects (Header)
function setupScrollEffects() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Seasons Logic
function toggleSeason(seasonId) {
  const list = document.getElementById(seasonId);
  const icon = document.getElementById(`icon-${seasonId}`);
  if (list.classList.contains('active')) {
    list.classList.remove('active');
    icon.textContent = '+';
  } else {
    list.classList.add('active');
    icon.textContent = '-';
  }
}

// Modal Logic
function openModal(name, desc) {
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('charModal').classList.add('active');
}

function closeModal(event) {
  if (event && event.type === 'click' && event.target.id !== 'charModal') return;
  document.getElementById('charModal').classList.remove('active');
}
