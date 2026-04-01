window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.20 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});