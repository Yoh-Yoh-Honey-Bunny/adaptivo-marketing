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

  // Über-uns Inhalte aus CMS laden
  fetch('/content/ueber-uns.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('person1-name').textContent = data.person1.name;
      document.getElementById('person1-rolle').textContent = data.person1.rolle;
      document.getElementById('person1-bio').textContent = data.person1.bio;
      document.getElementById('person2-name').textContent = data.person2.name;
      document.getElementById('person2-rolle').textContent = data.person2.rolle;
      document.getElementById('person2-bio').textContent = data.person2.bio;
    });
});