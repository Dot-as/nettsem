document.addEventListener('DOMContentLoaded', () => {

  // ===== CURSOR GLOW EFFECT =====
  const glow = document.querySelector('.cursor-glow');
  let glowVisible = false;

  document.addEventListener('mousemove', (e) => {
    if (!glowVisible) {
      glow.classList.add('visible');
      glowVisible = true;
    }
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('visible');
    glowVisible = false;
  });


  // ===== TRICK 4: Scroll Progress Bar =====
  const progressBar = document.querySelector('.progress');
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    progressBar.style.width = pct + '%';
  }


  // ===== NAV SCROLL STATE =====
  const nav = document.querySelector('nav');
  
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }


  // ===== TRICK 6: Sticky CTA with changing text =====
  const stickyCta = document.querySelector('.sticky-cta');
  const stickyText = document.querySelector('.sticky-text');
  const stickyBtn = document.querySelector('.sticky-btn');

  function updateSticky() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollTop / docHeight;

    if (scrollTop > 400) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }

    if (pct < 0.33) {
      stickyText.innerHTML = '<strong>Nettsmed</strong> — Nettsider for norske bedrifter';
      stickyBtn.textContent = 'Se eksempler';
    } else if (pct < 0.66) {
      stickyText.innerHTML = 'Ferdig nettside fra <strong>15 000 kr</strong>';
      stickyBtn.textContent = 'Få gratis skisse';
    } else {
      stickyText.innerHTML = 'Klar på <strong>48 timer</strong> — betal kun om du er fornøyd';
      stickyBtn.textContent = 'Start nå';
    }
  }


  // ===== TRICK 3: Animated Counters =====
  const counters = document.querySelectorAll('.stat-num');
  let countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        countersDone = true;
        const target = parseInt(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          counter.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }


  // ===== TRICK 2: Staggered Fade-in Cards =====
  const featureCards = document.querySelectorAll('.feature-card');
  
  function revealCards() {
    featureCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 120);
      }
    });
  }


  // ===== General Reveal + Kinetic Typography =====
  const reveals = document.querySelectorAll('.reveal');
  const kineticLines = document.querySelectorAll('.kinetic-line');
  
  function checkReveals() {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });
    kineticLines.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  }


  // ===== TRICK 5: Rotating Browser Mockup =====
  const sites = [
    {
      url: 'bergens-beste-pizza.no',
      name: 'Bergens Beste Pizza',
      desc: 'Autentisk steinovnspizza siden 1998',
      btn1: 'Bestill bord',
      btn2: 'Se menyen'
    },
    {
      url: 'hansen-ror-og-varme.no',
      name: 'Hansen Rør & Varme',
      desc: 'Din lokale rørlegger i Oslo',
      btn1: 'Ring oss',
      btn2: 'Se tjenester'
    },
    {
      url: 'tannlege-nordstrand.no',
      name: 'Tannlege Nordstrand',
      desc: 'Trygg tannbehandling for hele familien',
      btn1: 'Bestill time',
      btn2: 'Våre priser'
    },
    {
      url: 'klipp-og-kruller.no',
      name: 'Klipp & Kruller',
      desc: 'Frisørsalong i hjertet av Trondheim',
      btn1: 'Book online',
      btn2: 'Se stilgalleri'
    }
  ];

  let currentSite = 0;
  const browserUrl = document.querySelector('.browser-url');
  const siteName = document.querySelector('.site-name');
  const siteDesc = document.querySelector('.site-desc');
  const siteBtn1 = document.querySelector('.site-btn-primary');
  const siteBtn2 = document.querySelector('.site-btn-secondary');
  const dots = document.querySelectorAll('.showcase-dot');

  function rotateSite() {
    const body = document.querySelector('.browser-body');
    body.style.opacity = '0';
    body.style.transform = 'translateY(8px)';

    setTimeout(() => {
      currentSite = (currentSite + 1) % sites.length;
      const site = sites[currentSite];
      
      browserUrl.textContent = site.url;
      siteName.textContent = site.name;
      siteDesc.textContent = site.desc;
      siteBtn1.textContent = site.btn1;
      siteBtn2.textContent = site.btn2;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSite);
      });

      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
    }, 300);
  }

  setInterval(rotateSite, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const body = document.querySelector('.browser-body');
      body.style.opacity = '0';
      body.style.transform = 'translateY(8px)';

      setTimeout(() => {
        currentSite = i;
        const site = sites[i];
        browserUrl.textContent = site.url;
        siteName.textContent = site.name;
        siteDesc.textContent = site.desc;
        siteBtn1.textContent = site.btn1;
        siteBtn2.textContent = site.btn2;
        dots.forEach((d, j) => d.classList.toggle('active', j === i));
        body.style.opacity = '1';
        body.style.transform = 'translateY(0)';
      }, 300);
    });
  });


  // ===== BEFORE / AFTER SLIDER =====
  const ba = document.getElementById('ba');
  const baBefore = document.getElementById('ba-before');
  const baHandle = document.getElementById('ba-handle');

  if (ba && baBefore && baHandle) {
    let dragging = false;

    function setSliderPosition(x) {
      const rect = ba.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      baBefore.style.width = pct + '%';
      baHandle.style.left = pct + '%';
    }

    baHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      dragging = true;
    });

    baHandle.addEventListener('touchstart', (e) => {
      dragging = true;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (dragging) setSliderPosition(e.clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (dragging) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('mouseup', () => { dragging = false });
    window.addEventListener('touchend', () => { dragging = false });

    ba.addEventListener('click', (e) => {
      setSliderPosition(e.clientX);
    });
  }


  // ===== SCROLL LISTENER =====
  function onScroll() {
    updateProgress();
    updateNav();
    updateSticky();
    animateCounters();
    revealCards();
    checkReveals();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

});
