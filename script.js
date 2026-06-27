// NAV SCROLL
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrmacs2omRUdidfCXoMK5ZcRaUaTBnmXM",
  authDomain: "autofood-2ed77.firebaseapp.com",
  projectId: "autofood-2ed77",
  storageBucket: "autofood-2ed77.firebasestorage.app",
  messagingSenderId: "546017119145",
  appId: "1:546017119145:web:5c3b51fb782c059233d2b8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// SPOTS COUNTER
let totalSpots = 100;
let registered = parseInt(localStorage.getItem('af_registered') || '0');
let remaining = totalSpots - registered;

function updateSpots() {
  const spotsLeft = document.getElementById('spotsLeft');
  const spotsForm = document.getElementById('spotsForm');
  const progressFill = document.getElementById('progressFill');
  if (spotsLeft) spotsLeft.textContent = remaining;
  if (spotsForm) spotsForm.textContent = remaining;
  if (progressFill) {
    const pct = ((totalSpots - remaining) / totalSpots) * 100;
    progressFill.style.width = pct + '%';
  }
}
updateSpots();

// FORM
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
      await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    } catch(err) {}
    registered = parseInt(localStorage.getItem('af_registered') || '0') + 1;
    localStorage.setItem('af_registered', registered);
    remaining = Math.max(0, totalSpots - registered);
    updateSpots();
    formCard.style.display = 'none';
    formSuccess.style.display = 'block';
  });
}

// PHONE
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let v = phoneInput.value.replace(/\D/g, '');
    if (!v.startsWith('05')) v = '05' + v.replace(/^0*5?/, '');
    phoneInput.value = v.slice(0, 10);
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});
