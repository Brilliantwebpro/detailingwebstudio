export function initInteractions() {
  const safeParseJson = async (response) => {
    const raw = await response.text();
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };
  const extractApiError = (data, response) => {
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    if (Array.isArray(data?.errors) && data.errors.length) {
      return data.errors[0]?.msg || data.errors[0]?.message || 'Validation failed';
    }
    return `Request failed (${response.status} ${response.statusText})`;
  };

  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const onToggle = () => nav?.classList.toggle('is-open');
  if (navToggle && nav) navToggle.addEventListener('click', onToggle);

  const revealItems = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => io.observe(item));

  const parallaxNodes = document.querySelectorAll('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      parallaxNodes.forEach((node) => {
        const speed = Number(node.dataset.parallax || 0.08);
        node.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`;
      });
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const popup = document.querySelector('[data-exit-popup]');
  let onLeave;
  if (popup && !localStorage.getItem('dws_exit_seen')) {
    onLeave = (e) => {
      if (e.clientY <= 0) {
        popup.classList.add('is-open');
        localStorage.setItem('dws_exit_seen', '1');
        document.removeEventListener('mouseout', onLeave);
      }
    };
    document.addEventListener('mouseout', onLeave);
  }

  const closeButtons = document.querySelectorAll('[data-close-popup]');
  const onClose = (btn) => () => {
    const target = btn.closest('.popup, .modal');
    if (target) target.classList.remove('is-open', 'open');
  };
  closeButtons.forEach((btn) => btn.addEventListener('click', onClose(btn)));

  const filters = document.querySelectorAll('[data-filter]');
  const demoItems = document.querySelectorAll('[data-demo-item]');
  const filterHandlers = [];
  if (filters.length && demoItems.length) {
    filters.forEach((btn) => {
      const handler = () => {
        filters.forEach((el) => el.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.filter;
        demoItems.forEach((item) => {
          const type = item.dataset.type;
          item.style.display = key === 'all' || key === type ? '' : 'none';
        });
      };
      filterHandlers.push([btn, handler]);
      btn.addEventListener('click', handler);
    });
  }

  const previewModal = document.querySelector('[data-preview-modal]');
  const previewImage = document.querySelector('[data-preview-image]');
  const previewTitle = document.querySelector('[data-preview-title]');
  const previewButtons = document.querySelectorAll('[data-preview-btn]');
  const previewHandlers = [];
  previewButtons.forEach((btn) => {
    const handler = () => {
      if (!previewModal || !previewImage || !previewTitle) return;
      previewImage.src = btn.dataset.img || '';
      previewImage.alt = btn.dataset.title || 'Demo preview';
      previewTitle.textContent = btn.dataset.title || 'Demo Preview';
      previewModal.classList.add('open');
    };
    previewHandlers.push([btn, handler]);
    btn.addEventListener('click', handler);
  });

  const form = document.querySelector('[data-multi-form]');
  if (form) {
    const started = Date.now();
    const MIN_SUBMIT_DELAY_MS = 200;
    const panels = form.querySelectorAll('[data-step-panel]');
    const bars = form.querySelectorAll('.step');
    let step = 0;

    const sync = () => {
      panels.forEach((panel, i) => panel.classList.toggle('active', i === step));
      bars.forEach((bar, i) => bar.classList.toggle('active', i <= step));
    };

    form.querySelectorAll('[data-next]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = panels[step];
        const required = panel.querySelectorAll('[required]');
        let valid = true;
        required.forEach((el) => {
          if (!el.value.trim()) {
            el.reportValidity();
            valid = false;
          }
        });
        if (!valid) return;
        step = Math.min(step + 1, panels.length - 1);
        sync();
      });
    });

    form.querySelectorAll('[data-prev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        step = Math.max(step - 1, 0);
        sync();
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = form.querySelector('[data-form-result]');
      const honeypot = form.querySelector('[name="company_site"]');
      if (honeypot?.value) {
        if (result) {
          result.textContent = 'Submission blocked. Please refresh and try again.';
          result.style.color = 'var(--danger)';
        }
        return;
      }
      if (Date.now() - started < MIN_SUBMIT_DELAY_MS) {
        if (result) {
          result.textContent = 'Please wait a moment and submit again.';
          result.style.color = 'var(--muted)';
        }
        return;
      }

      const email = form.querySelector('[name="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.setCustomValidity('Enter a valid email');
        email.reportValidity();
        return;
      }
      if (email) email.setCustomValidity('');

      const submitBtn = form.querySelector('button[type="submit"]');

      try {
        if (submitBtn) submitBtn.disabled = true;
        if (result) {
          result.textContent = 'Submitting your request...';
          result.style.color = 'var(--muted)';
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        const response = await fetch('/api/leads/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await safeParseJson(response);
        if (!response.ok) {
          throw new Error(extractApiError(data, response));
        }

        if (result) {
          result.textContent = 'Request captured. We will follow up with demo options and scheduling.';
          result.style.color = 'var(--good)';
        }
        form.reset();
        step = 0;
        sync();
      } catch (error) {
        if (result) {
          result.textContent = error.message || 'Submission failed. Please try again.';
          result.style.color = 'var(--danger)';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
    sync();
  }

  return () => {
    if (navToggle && nav) navToggle.removeEventListener('click', onToggle);
    window.removeEventListener('scroll', onScroll);
    io.disconnect();
    if (onLeave) document.removeEventListener('mouseout', onLeave);
    filterHandlers.forEach(([btn, handler]) => btn.removeEventListener('click', handler));
    previewHandlers.forEach(([btn, handler]) => btn.removeEventListener('click', handler));
  };
}

