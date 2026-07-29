// script.js – Additive Manufacturing Course Hub

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Toggle mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });
  }

  // Close menu on link click (mobile) + update active class
  const navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks) navLinks.classList.remove('open');
      // update active class
      navAnchors.forEach(function (l) { l.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Highlight nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const anchors = document.querySelectorAll('.nav-links a');

  function updateActiveOnScroll() {
    let currentId = '';
    const scrollPos = window.scrollY + 130; // offset for sticky header

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentId = section.getAttribute('id');
      }
    });

    anchors.forEach(function (anchor) {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === '#' + currentId) {
        anchor.classList.add('active');
      }
    });
  }

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // run once on load to set correct active
  updateActiveOnScroll();

  // (optional) close menu on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 880 && navLinks) {
      navLinks.classList.remove('open');
    }
  });
});