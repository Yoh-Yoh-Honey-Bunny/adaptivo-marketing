document.addEventListener('DOMContentLoaded', () => {
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
});