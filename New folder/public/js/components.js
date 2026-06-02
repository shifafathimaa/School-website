/* ============================================================
   Azeeziya School — components.js
   ============================================================ */

(function () {

  const NAV_LINKS = [
    { href: '/',                    label: 'Home'         },
    { href: '/about',               label: 'About'        },
    { href: '/academics',           label: 'Academics'    },
    { href: '/admission-procedure', label: 'Admission'    },
    { href: '/events',              label: 'Events'       },
    { href: '/career',              label: 'Career'       },
    { href: '/contact',             label: 'Contact'      },
    { href: '/online-admission',    label: 'Apply Now', cta: true },
  ];

  function buildNavLinks() {
    const path = location.pathname.replace(/\/$/, '') || '/';
    return NAV_LINKS.map(l => {
      const active = (path === l.href) || (l.href !== '/' && path.startsWith(l.href));
      return `<li><a href="${l.href}"${active ? ' class="active"' : ''}${l.cta ? ' class="nav-cta"' : ''}>${l.label}</a></li>`;
    }).join('');
  }

  const ICONS = {
    youtube:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>`,
    instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2 16.6 2 16.3 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7C24 15.7 24 15.3 24 12s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>`,
    whatsapp:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.2 7.1 9 6.6 8.7 6.7 8.5 6.7H8c-.2 0-.6.1-.9.4C6.8 7.4 6 8.2 6 9.9s1.2 3.5 1.4 3.7c.2.2 2.4 3.7 5.8 5.2 3.4 1.4 3.4.9 4 .9.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4zm-5.4 7.4h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.6.9.9-3.5-.2-.4a9.9 9.9 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10zm0-20C5.4 1.8.3 6.9.3 13.2c0 2 .5 4 1.5 5.7L0 24l5.3-1.4a11.8 11.8 0 0 0 5.6 1.4h.1C17.3 24 22.5 18.8 22.5 12.3 22.5 6 17.4.8 11.1.8z"/></svg>`,
  };

  /* ── HEADER ── */
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = `
<div class="top-bar">
  <div class="container">
    <div class="tb-left">
      <span>📞 +91 8281 814 816</span>
      <span>✉️ azeeziyaschoolhr@gmail.com</span>
      <span>🕐 Mon–Sat: 8:00 AM – 4:30 PM</span>
    </div>
    <div class="tb-right">
      <div class="socials">
        <a href="https://www.youtube.com/@azeeziyaschool" target="_blank" rel="noopener" title="YouTube" aria-label="YouTube">${ICONS.youtube}</a>
        <a href="https://www.instagram.com/azeeziyaschool" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">${ICONS.instagram}</a>
        <a href="https://wa.me/918281814816" target="_blank" rel="noopener" title="WhatsApp" aria-label="WhatsApp">${ICONS.whatsapp}</a>
      </div>
    </div>
  </div>
</div>
<header>
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo-wrap" aria-label="Azeeziya School Home">
        <div class="logo-img">
          <img src="/images/logo.png" alt="Azeeziya School Logo" width="72" height="72">
        </div>
        <div class="logo-text">
          <h1>Azeeziya English Medium School</h1>
          <p>Affiliated to CBSE New Delhi, No. 931186, Chithari, Kasargod</p>
        </div>
      </a>
      <button class="hamburger" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav id="main-nav" aria-label="Main navigation">
        <ul>${buildNavLinks()}</ul>
      </nav>
    </div>
  </div>
</header>`;

    const hamburger = headerEl.querySelector('.hamburger');
    const nav       = headerEl.querySelector('#main-nav');
    hamburger?.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      nav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }));
  }

  /* ── FOOTER ── */
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
<footer>
  <div class="footer-top">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <div class="logo-wrap" style="margin-bottom:14px">
            <div class="logo-img" style="width:50px;height:50px">
              <img src="/images/logo.png" alt="Azeeziya School Logo" width="50" height="50">
            </div>
            <div class="logo-text">
              <h1 style="font-size:.9rem;line-height:1.2">Azeeziya English Medium School</h1>
              <p style="font-size:.62rem">Affiliated to CBSE New Delhi, No. 931186</p>
            </div>
          </div>
          <p>Nurturing young minds with quality education, strong values, and a global outlook. Committed to the holistic development of every student.</p>
          <div class="footer-socials">
            <a href="https://www.youtube.com/@azeeziyaschool" target="_blank" rel="noopener" title="YouTube" aria-label="YouTube">${ICONS.youtube}</a>
            <a href="https://www.instagram.com/azeeziyaschool" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="https://wa.me/918281814816" target="_blank" rel="noopener" title="WhatsApp" aria-label="WhatsApp">${ICONS.whatsapp}</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/academics">Academics</a></li>
            <li><a href="/admission-procedure">Admission Procedure</a></li>
            <li><a href="/online-admission">Apply Online</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Academics</h4>
          <ul>
            <li><a href="/academics">Fee Structure</a></li>
            <li><a href="/admission-procedure">Admission Criteria</a></li>
            <li><a href="/admission-procedure">Documents Required</a></li>
            <li><a href="/admission-procedure">Application Fee</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact Us</h4>
          <div class="footer-contact-item">
            <span class="icon">📍</span>
            <span>Chithari, Kanhangad,<br>Kerala – 671316, India</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📞</span>
            <span>+91 8281 814 816<br>+91 8281 636 416</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">✉️</span>
            <span>azeeziyaschoolhr@gmail.com</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">🕐</span>
            <span>Mon–Sat: 8:00 AM – 4:30 PM</span>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Azeeziya English Medium School, Chithari, Kanhangad. All Rights Reserved.</span>
      <span>Affiliated to CBSE New Delhi | School No: 931186</span>
    </div>
  </div>
</footer>`;
  }

})();
