// Ensure fade-in on page load
document.body.classList.remove("fade-out");
document.addEventListener("DOMContentLoaded", () => {
  const typedSpan = document.getElementById("typed-text");
  const container = document.getElementById("tagline");
  if (!typedSpan || !container) return;

  const text = container.getAttribute("data-text");
  if (!text) return;

  typedSpan.textContent = ""; // clear first
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typedSpan.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 45);
    }
  }

  typeWriter();
});

// Scroll-fade animations
const faders = document.querySelectorAll('.scroll-fade');

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Loader fade
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.genre-box');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');

  let currentSlide = 0;

  function updateSlide() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  rightBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  });

  leftBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  });

  // Responsive fix: Recalculate on resize
  window.addEventListener('resize', updateSlide);
});

// Smooth page transition on navigation
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    // Ignore links that open in new tab or anchor links
    if (
      link.hostname === window.location.hostname &&
      !link.href.includes('#') &&
      !link.target
    ) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");

        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = href;
        }, 500); // Match the CSS transition duration
      });
    }
  });
});
