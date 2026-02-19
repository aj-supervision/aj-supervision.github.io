// AJ Supervision – main.js

// Mobile nav toggle
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Active nav link
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Formspree AJAX submit
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    btn.disabled = true;
    btn.textContent = 'Wird gesendet…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        if (success) { success.style.display = 'block'; }
        btn.textContent = 'Gesendet ✓';
      } else {
        btn.disabled = false;
        btn.textContent = 'Senden';
        alert('Leider ist ein Fehler aufgetreten. Bitte schreiben Sie direkt an kontakt@aj-supervision.de');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Senden';
      alert('Leider ist ein Fehler aufgetreten. Bitte schreiben Sie direkt an kontakt@aj-supervision.de');
    }
  });
}
