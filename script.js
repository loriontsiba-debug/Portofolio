 /* ── Theme Toggle ─────────────────────────────────────── */
  const root         = document.documentElement;
  const themeBtn     = document.getElementById('theme-toggle');
  let   isDark       = true;

  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀' : '◑';
  });

  /* ── Mobile Menu ──────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '≡';
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.textContent = '≡';
  }

  /* ── Sticky Navbar ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }, { passive: true });

  /* ── Active Nav Link ──────────────────────────────────── */
  const sections  = ['about','stack','projects','experience','contact'];
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = 'about';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 130) current = id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href').replace('#','');
      a.classList.toggle('active', href === current);
    });
  }
  updateActiveLink();

  /* ── Contact Form ─────────────────────────────────────── */
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) return;

    /* Success state */
    submitBtn.textContent = '✓ Message sent!';
    submitBtn.style.background = '#22C55E';
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.background = '#38BDF8';
    }, 3000);
  });

  /* ── Scroll-reveal (IntersectionObserver) ─────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .timeline-card').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });