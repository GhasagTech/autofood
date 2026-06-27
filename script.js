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
let registered = 0;
let remaining = totalSpots;

async function loadRegistrations() {
  try {
    const snapshot = await getDocs(
      collection(db, "registrations")
    );

    registered = snapshot.size;
    remaining = Math.max(
      totalSpots - registered,
      0
    );

    updateSpots();
  } catch (err) {
    console.error(err);
  }
}

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

  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('registerForm');
  const formOffer = document.querySelector('.form-offer');

  if (remaining <= 0) {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'اكتملت المقاعد';
    }

    if (formOffer) {
      formOffer.textContent =
        'انتهت المقاعد المخصصة لأول 100 مسجل';
    }

    if (form) {
      form.style.opacity = '0.6';
    }
  }
}

loadRegistrations();

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
    const data = new FormData(form);const registration = {
  name: data.get('الاسم'),
  phone: data.get('الجوال'),
  restaurant: data.get('المطعم_المفضل'),
  createdAt: new Date()
};
    try {
await addDoc(
  collection(db, "registrations"),
  registration
);

registered++;
remaining = Math.max(
  totalSpots - registered,
  0
);

updateSpots();
    } catch(err) {}
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
