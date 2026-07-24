/* Parth Vadodariya portfolio — static site scripts */
(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ── Year in footer ─────────────────────────────── */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar: scrolled state + active link on scroll ── */
  const navbar = $("#navbar");
  const navLinks = $$(".nav-link");
  const sections = ["home", "about", "skills", "projects", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const onScroll = () => {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 24);

    let current = sections[0]?.id || "home";
    const scrollPos = window.scrollY + 120;
    for (const s of sections) {
      if (s.offsetTop <= scrollPos) current = s.id;
    }
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("active", href === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Custom cursor glow ─────────────────────────── */
  const cursorGlow = $(".cursor-glow");
  if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.transform =
        `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
    });
  }

  /* ── Resume modal ────────────────────────────────── */
  const modal = $("#resume-modal");
  const openResume = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeResume = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-action='open-resume']");
    if (trigger) { e.preventDefault(); openResume(); return; }
    const closer = e.target.closest("[data-action='close-resume']");
    if (closer) { e.preventDefault(); closeResume(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeResume();
  });

  /* ── Render skills in info grid ──────────────────── */
  const infoSkills = $("#info-skills");
  if (infoSkills && data.skills) {
    infoSkills.innerHTML = data.skills
      .slice(0, 5)
      .map(
        (s) => `
        <div class="info-skill">
          <div class="row"><span class="name">${s.name}</span><span class="value">${s.value}%</span></div>
          <div class="bar"><div class="fill" style="width:${s.value}%"></div></div>
        </div>`
      )
      .join("");
  }

  /* ── Render skills in main section ───────────────── */
  const skillBars = $("#skill-bars");
  if (skillBars && data.skills) {
    skillBars.innerHTML = data.skills
      .map(
        (s) => `
        <div class="skill-bar-row" data-target="${s.value}">
          <div class="row">
            <span class="name">${s.name}</span>
            <span class="value">${s.value}%</span>
          </div>
          <div class="track"><div class="fill" style="--target-width:${s.value}%"></div></div>
        </div>`
      )
      .join("");
  }

  /* ── Render tools ────────────────────────────────── */
  const toolChips = $("#tool-chips");
  if (toolChips && data.tools) {
    toolChips.innerHTML = data.tools
      .map((t) => `<span class="tool-chip">${t}</span>`)
      .join("");
  }

  /* ── Render info-grid projects ───────────────────── */
  const infoProjects = $("#info-projects");
  if (infoProjects && data.infoProjects) {
    infoProjects.innerHTML = data.infoProjects
      .map((p) => {
        const titleColor = p.accent === "#ff0028" ? "#ff0028" : "#fff";
        const bg = `radial-gradient(circle at 40% 40%, ${p.accent}55, #000 75%)`;
        return `
        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="info-project">
          <div class="info-project-thumb" style="background:${bg}">
            <img src="${p.icon}" alt="${p.title}" />
          </div>
          <div class="info-project-body">
            <p class="info-project-title" style="color:${titleColor}">${p.title}</p>
            <p class="info-project-desc">${p.desc}</p>
          </div>
        </a>`;
      })
      .join("");
  }

  /* ── Render full project cards ───────────────────── */
  const projectsGrid = $("#projects-grid");
  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = data.projects
      .map(
        (p) => `
        <article class="project-card">
          <div class="project-glow" style="background:${p.accent}"></div>
          <div style="position:relative">
            <div class="project-icon-badge" style="box-shadow:0 0 20px ${p.accent}44">
              <img src="${p.icon}" alt="${p.title}" />
            </div>
            <p class="project-tag">${p.tag}</p>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
            <div class="project-tech">
              ${p.tech.map((t) => `<span>${t}</span>`).join("")}
            </div>
            <a href="${p.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
              View on Github <span class="arrow">→</span>
            </a>
          </div>
        </article>`
      )
      .join("");
  }

  /* ── Animate skill bars when in view ─────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  $$(".skill-bar-row").forEach((row) => observer.observe(row));

  /* ── Contact form (mailto submit) ────────────────── */
  const form = $("#contact-form");
  const statusEl = $("#form-status");
  const submitBtn = $("#submit-btn");
  const btnLabel = submitBtn?.querySelector(".btn-label");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        showStatus("error", "Please fill in your name, email, and message.");
        return;
      }

      if (btnLabel) btnLabel.textContent = "Opening mail client…";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector("svg")?.remove();
        const spinner = document.createElement("span");
        spinner.className = "spinner";
        submitBtn.appendChild(spinner);
      }

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto =
        "mailto:parthvadodariya2005@gmail.com" +
        `?subject=${encodeURIComponent(subject || `Portfolio contact from ${name}`)}` +
        `&body=${encodeURIComponent(body)}`;

      try {
        window.location.href = mailto;
      } catch (_) {
        // fall through
      }

      setTimeout(() => {
        showStatus(
          "success",
          "Your mail client opened — message ready to send!"
        );
        form.reset();
        if (btnLabel) btnLabel.textContent = "Send Message";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector(".spinner")?.remove();
          const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          icon.setAttribute("viewBox", "0 0 24 24");
          icon.setAttribute("fill", "none");
          icon.setAttribute("stroke", "currentColor");
          icon.setAttribute("stroke-width", "2");
          icon.setAttribute("stroke-linecap", "round");
          icon.setAttribute("stroke-linejoin", "round");
          icon.setAttribute("width", "14");
          icon.setAttribute("height", "14");
          icon.classList.add("icon");
          icon.innerHTML = '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>';
          submitBtn.appendChild(icon);
        }
      }, 500);
    });
  }

  function showStatus(kind, text) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.className = `form-status ${kind}`;
    statusEl.textContent = text;
    if (kind === "success") {
      setTimeout(() => { statusEl.hidden = true; }, 6000);
    }
  }
})();
