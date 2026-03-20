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

  if (browserUrl && siteName) {
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
        if (siteBtn1) siteBtn1.textContent = site.btn1;
        if (siteBtn2) siteBtn2.textContent = site.btn2;

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
          if (siteBtn1) siteBtn1.textContent = site.btn1;
          if (siteBtn2) siteBtn2.textContent = site.btn2;
          dots.forEach((d, j) => d.classList.toggle('active', j === i));
          body.style.opacity = '1';
          body.style.transform = 'translateY(0)';
        }, 300);
      });
    });
  }


  // ===== FULL-PAGE BEFORE / AFTER SLIDER =====
  const uglyNav = document.getElementById('ugly-nav-overlay');
  const before = document.getElementById('hero-before');
  const handle = document.getElementById('hero-slider-handle');
  const beforeInner = before ? before.querySelector('.hero-before-inner') : null;

  let sliderDragging = false;

  function setSliderPos(x) {
    if (!before || !handle) return;
    let pct = (x / window.innerWidth) * 100;
    pct = Math.max(2, Math.min(98, pct));
    before.style.width = pct + '%';
    handle.style.left = pct + '%';
    if (uglyNav) {
      uglyNav.style.width = pct + '%';
    }
  }

  if (handle) {
    handle.addEventListener('mousedown', (e) => { e.preventDefault(); sliderDragging = true; });
    handle.addEventListener('touchstart', () => { sliderDragging = true; }, { passive: true });
  }

  window.addEventListener('mousemove', (e) => { if (sliderDragging) setSliderPos(e.clientX); });
  window.addEventListener('touchmove', (e) => { if (sliderDragging) setSliderPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mouseup', () => { sliderDragging = false; });
  window.addEventListener('touchend', () => { sliderDragging = false; });

  // Match ugly section heights to real sections dynamically
  function syncUglyHeights() {
    document.querySelectorAll('.ugly-s[data-match]').forEach(ugly => {
      const real = document.getElementById(ugly.dataset.match);
      if (real) ugly.style.minHeight = real.offsetHeight + 'px';
    });
  }
  syncUglyHeights();
  window.addEventListener('resize', syncUglyHeights);
  // Re-sync after fonts/images load
  window.addEventListener('load', syncUglyHeights);

  // Sync scroll: when page scrolls, move the ugly overlay content up
  if (beforeInner) {
    window.addEventListener('scroll', () => {
      beforeInner.style.transform = `translateY(-${window.scrollY}px)`;
    }, { passive: true });
  }

  function updateUglyNav() {}

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


  // ===== SCREENSHOT CAROUSELS =====
  document.querySelectorAll('.result-carousel').forEach(carousel => {
    const track = carousel.querySelector('.result-carousel-track');
    const dotsContainer = carousel.querySelector('.result-carousel-dots');
    const images = track.querySelectorAll('img');
    if (!dotsContainer || images.length <= 1) {
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        track.scrollTo({ left: track.offsetWidth * i, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, { passive: true });
  });


  // ===== SCROLL LISTENER =====
  function onScroll() {
    updateProgress();
    updateNav();
    updateSticky();
    updateUglyNav();
    animateCounters();
    revealCards();
    checkReveals();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // ===== ONBOARDING WIZARD =====
  const wizard = document.getElementById('wizard');
  const wizardNav = document.getElementById('wizard-nav');
  const wizardBack = document.getElementById('wizard-back');
  const wizardNext = document.getElementById('wizard-next');
  const wizardClose = wizard.querySelector('.wizard-close');
  const wizardDone = wizard.querySelector('.wizard-done');
  const wizardProgressFill = wizard.querySelector('.wizard-progress-fill');
  const wizardSteps = wizard.querySelectorAll('.wizard-step');
  let wizardCurrentStep = 1;
  const wizardTotalSteps = 5;

  function openWizard(preselectedPackage) {
    wizardCurrentStep = 1;
    wizard.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"]').forEach(i => i.value = '');
    wizard.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
    const pkg = preselectedPackage || 'gratis';
    const radio = wizard.querySelector('input[name="wiz-package"][value="' + pkg + '"]');
    if (radio) radio.checked = true;
    updateWizardStep();
    wizard.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const firstInput = wizard.querySelector('.wizard-step.active input');
      if (firstInput) firstInput.focus();
    }, 400);
  }

  function closeWizard() {
    wizard.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateWizardStep() {
    wizardSteps.forEach(step => {
      const stepNum = parseInt(step.dataset.step);
      step.classList.remove('active', 'exit-left');
      if (stepNum === wizardCurrentStep) {
        step.classList.add('active');
      } else if (stepNum < wizardCurrentStep) {
        step.classList.add('exit-left');
      }
    });
    const progress = wizardCurrentStep <= wizardTotalSteps
      ? (wizardCurrentStep / wizardTotalSteps) * 100
      : 100;
    wizardProgressFill.style.width = progress + '%';
    wizard.setAttribute('data-step', wizardCurrentStep);
    wizardBack.style.visibility = wizardCurrentStep <= 1 ? 'hidden' : 'visible';
    wizardNext.textContent = wizardCurrentStep >= wizardTotalSteps ? 'Send inn' : 'Neste';
    wizardNav.style.display = wizardCurrentStep > wizardTotalSteps ? 'none' : 'flex';
  }

  function validateWizardStep() {
    if (wizardCurrentStep === 1) {
      return document.getElementById('wiz-company').value.trim().length > 0
        && document.getElementById('wiz-name').value.trim().length > 0;
    }
    if (wizardCurrentStep === 2) {
      return document.getElementById('wiz-email').value.trim().includes('@')
        && document.getElementById('wiz-phone').value.trim().length > 0;
    }
    if (wizardCurrentStep === 3) {
      return !!wizard.querySelector('input[name="wiz-package"]:checked');
    }
    if (wizardCurrentStep === 4) {
      return !!wizard.querySelector('input[name="wiz-service"]:checked');
    }
    if (wizardCurrentStep === 5) {
      return true; // optional step
    }
    return true;
  }

  wizardNext.addEventListener('click', () => {
    if (!validateWizardStep()) {
      wizard.querySelector('.wizard-card').style.animation = 'wizardShake 0.4s ease';
      setTimeout(() => { wizard.querySelector('.wizard-card').style.animation = ''; }, 400);
      return;
    }
    if (wizardCurrentStep >= wizardTotalSteps) {
      const formData = {
        company: document.getElementById('wiz-company').value.trim(),
        name: document.getElementById('wiz-name').value.trim(),
        email: document.getElementById('wiz-email').value.trim(),
        phone: document.getElementById('wiz-phone').value.trim(),
        package: wizard.querySelector('input[name="wiz-package"]:checked').value,
        services: Array.from(wizard.querySelectorAll('input[name="wiz-service"]:checked')).map(c => c.value),
        url: document.getElementById('wiz-url').value.trim(),
        inspiration: document.getElementById('wiz-inspo').value.trim()
      };
      console.log('Wizard submission:', formData);
      wizardCurrentStep = 5;
      updateWizardStep();
      return;
    }
    wizardCurrentStep++;
    updateWizardStep();
    setTimeout(() => {
      const input = wizard.querySelector('.wizard-step.active input');
      if (input && (input.type === 'text' || input.type === 'email' || input.type === 'tel')) {
        input.focus();
      }
    }, 100);
  });

  wizardBack.addEventListener('click', () => {
    if (wizardCurrentStep > 1) {
      wizardCurrentStep--;
      updateWizardStep();
    }
  });

  wizardClose.addEventListener('click', closeWizard);
  wizardDone.addEventListener('click', closeWizard);
  wizard.addEventListener('click', (e) => { if (e.target === wizard) closeWizard(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wizard.classList.contains('active')) closeWizard();
  });

  wizard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && wizardCurrentStep <= wizardTotalSteps) {
      e.preventDefault();
      wizardNext.click();
    }
  });

  // Hook up all CTA buttons to open wizard
  document.querySelectorAll('.hero-cta, .nav-cta, .sticky-btn, .price-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let pkg = null;
      if (btn.classList.contains('price-cta')) {
        pkg = btn.closest('.price-card-featured') ? 'growth' : 'standard';
      }
      openWizard(pkg);
    });
  });

});
