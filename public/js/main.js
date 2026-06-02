/* ============================================================
   Azeeziya English Medium School — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL FADE-IN ── */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  /* ── TABS ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.academics-tabs')?.parentElement || document;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  /* ── EVENT FILTER ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.event-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  /* ── HERO COUNTER ANIMATION ── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let val = 0;
      const step = Math.max(1, Math.ceil(target / 70));
      const timer = setInterval(() => {
        val = Math.min(val + step, target);
        el.textContent = val + suffix;
        if (val >= target) clearInterval(timer);
      }, 20);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-count]').forEach(el => counterObserver.observe(el));

  /* ── MULTI-STEP ADMISSION FORM ── */
  initAdmissionForm();

  /* ── CONTACT & CAREER FORMS ── */
  initAjaxForm('contactForm', '/api/contact/submit');
  initAjaxForm('careerForm',  '/api/career/apply');

});

/* ============================================================
   MULTI-STEP ADMISSION WIZARD
   ============================================================ */
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  const sections  = Array.from(form.querySelectorAll('.form-section'));
  const steps     = Array.from(form.querySelectorAll('.progress-step'));
  const prevBtn   = form.querySelector('.btn-prev');
  const nextBtn   = form.querySelector('.btn-next');
  const stepLabel = form.querySelector('#stepLabel');
  const successEl = form.querySelector('.form-success');
  const progressEl= form.querySelector('.form-progress');
  const navEl     = form.querySelector('.form-nav');

  let current = 0;

  function render() {
    sections.forEach((s, i) => s.classList.toggle('active', i === current));
    steps.forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i === current) s.classList.add('active');
      if (i < current)  s.classList.add('done');
    });
    if (stepLabel) stepLabel.textContent = `Step ${current + 1} of ${sections.length}`;
    if (prevBtn)   prevBtn.style.visibility = current > 0 ? 'visible' : 'hidden';
    if (nextBtn) {
      const isLast = current === sections.length - 1;
      nextBtn.textContent = isLast ? '🎓 Submit Application' : 'Next Step →';
      nextBtn.dataset.last = isLast;
    }
  }

  function validateCurrent() {
    let ok = true;
    sections[current].querySelectorAll('[required]').forEach(field => {
      const empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      field.style.borderColor = empty ? '#e53e3e' : '';
      if (empty) ok = false;
    });
    if (!ok) showAlert(form, '⚠️ Please complete all required fields before continuing.', 'error');
    return ok;
  }

  steps.forEach((step, idx) => {
    step.style.cursor = 'pointer';
    step.addEventListener('click', () => { if (idx < current) { current = idx; render(); } });
  });

  nextBtn?.addEventListener('click', async () => {
    if (!validateCurrent()) return;
    if (nextBtn.dataset.last === 'true') {
      await handleSubmit();
    } else {
      current++;
      render();
      form.closest('.container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (current > 0) { current--; render(); }
  });

  async function handleSubmit() {
    nextBtn.disabled = true;
    nextBtn.textContent = '⏳ Submitting...';
    clearAlert(form);
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res  = await fetch('/api/admission/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        sections.forEach(s => s.classList.remove('active'));
        if (progressEl) progressEl.style.display = 'none';
        if (navEl)      navEl.style.display = 'none';
        if (successEl)  { successEl.style.display = 'block'; successEl.scrollIntoView({ behavior: 'smooth' }); }
      } else {
        showAlert(form, json.message || 'Submission failed. Please try again.', 'error');
        nextBtn.disabled = false;
        nextBtn.textContent = '🎓 Submit Application';
      }
    } catch {
      showAlert(form, '❌ Connection error. Please check your internet and retry.', 'error');
      nextBtn.disabled = false;
      nextBtn.textContent = '🎓 Submit Application';
    }
  }

  render();
}

/* ============================================================
   GENERIC AJAX FORM
   ============================================================ */
function initAjaxForm(id, endpoint) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳ Sending...';
    clearAlert(form);
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res  = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      showAlert(form, json.message, json.success ? 'success' : 'error');
      if (json.success) form.reset();
    } catch {
      showAlert(form, '❌ Network error. Please try again.', 'error');
    }
    btn.disabled = false;
    btn.textContent = orig;
  });
}

/* ── HELPERS ── */
function showAlert(container, msg, type) {
  clearAlert(container);
  const el = Object.assign(document.createElement('div'), {
    className: `alert alert-${type}`,
    innerHTML: msg
  });
  container.insertBefore(el, container.firstChild);
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => el.remove(), 7000);
}
function clearAlert(container) {
  container.querySelectorAll('.alert').forEach(a => a.remove());
}
