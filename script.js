document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Header shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Burger menu
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });

  // Kontaktformular mit Feedback
  const form = document.querySelector('.kontakt-form');
  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Wird gesendet…';
    feedback.className = 'form-feedback';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        feedback.classList.add('success');
        feedback.textContent = 'Danke für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.';
        form.reset();
        btn.textContent = 'Nachricht gesendet ✓';
      } else {
        throw new Error();
      }
    } catch {
      feedback.classList.add('error');
      feedback.textContent = 'Etwas hat nicht geklappt. Bitte versuch es nochmal oder schreib uns direkt an info@adaptivo-marketing.de.';
      btn.disabled = false;
      btn.textContent = 'Nachricht senden →';
    }
  });

  // Menü schließen wenn ein Link geklickt wird
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
});