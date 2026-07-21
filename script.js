// Fade-in elements as they scroll into view
// Targets: .section, .project, .edu-item, .skill-row

document.addEventListener("DOMContentLoaded", function () {

  // Elements to animate
  var targets = document.querySelectorAll(
    ".project, .skill-row, .edu-item, .hero-inner, .contact-inner"
  );

  // Add fade-in class to each
  targets.forEach(function (el) {
    el.classList.add("fade-in");
  });

  // Observer — when element enters viewport, show it
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  });

  targets.forEach(function (el) {
    observer.observe(el);
  });

});
