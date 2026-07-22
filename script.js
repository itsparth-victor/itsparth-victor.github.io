// Portfolio interactions — fade-in observer + GitHub stats fetch

document.addEventListener("DOMContentLoaded", function () {
  // ── Fade-in animation on scroll ──────────────────────────────
  const targets = document.querySelectorAll(
    ".card, .project, .stat, .gh-stat, .edu-item, .contact-item, .skill-group, .tool-block"
  );
  targets.forEach((el) => el.classList.add("fade-in"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );
  targets.forEach((el) => observer.observe(el));

  // ── GitHub stats from public API ────────────────────────────
  const GH_USER = "itsparth-victor";
  const GH_API = `https://api.github.com/users/${GH_USER}`;
  const GH_REPOS = `https://api.github.com/users/${GH_USER}/repos?per_page=100`;

  const els = {
    repos: document.getElementById("gh-repos"),
    followers: document.getElementById("gh-followers"),
    following: document.getElementById("gh-following"),
    stars: document.getElementById("gh-stars"),
  };

  function setText(node, value) {
    if (node) node.textContent = value;
  }

  async function loadGithubStats() {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(GH_API, { headers: { Accept: "application/vnd.github+json" } }),
        fetch(GH_REPOS, { headers: { Accept: "application/vnd.github+json" } }),
      ]);

      if (!userRes.ok) throw new Error("user api " + userRes.status);
      const user = await userRes.json();
      setText(els.repos, user.public_repos ?? "—");
      setText(els.followers, user.followers ?? "—");
      setText(els.following, user.following ?? "—");

      let stars = 0;
      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (Array.isArray(repos)) {
          stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        }
      } else {
        // Fallback: use user public_repos when rate-limited
        stars = 0;
      }
      setText(els.stars, stars);
    } catch (err) {
      // Leave em-dashes on failure — no console noise for visitors
    }
  }

  loadGithubStats();
});
