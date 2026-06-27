const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      clearInterval(timer);
      el.textContent = target.toLocaleString('ar-SA');
    } else {
      el.textContent = Math.floor(start).toLocaleString('ar-SA');
    }
  }, 16);
}

const counterEl = document.getElementById('counter');
if (counterEl) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounter(counterEl, 1248);
      counterObserver.disconnect();
    }
  });
  counterObserver.observe(counterEl);
}

const form = document.getElementById('registerForm');
const formCard = document.getElementById('formCard');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'جاري التسجيل...';
    btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok || res.status === 200) {
        formCard.style.display = 'none';
        formSuccess.style.display = 'block';
      } else { throw new Error(); }
    } catch {
      formCard.style.display = 'none';
      formSuccess.style.display = 'block';
    }
  });
}

const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let v = phoneInput.value.replace(/\D/g, '');
    if (v.startsWith('966')) v = '0' + v.slice(3);
    if (!v.startsWith('05')) v = v.replace(/^0*/, '05');
    phoneInput.value =
