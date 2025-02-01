document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY;
  const backToTop = document.getElementById("back-to-top");

  // Show or hide the back-to-top button
  backToTop.style.display = scrollPosition > 400 ? "block" : "none";

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const navLink = document.getElementById(`nav-section${index + 1}`);

    // Check if the current scroll position is within the section's bounds
    if (scrollPosition >= sectionTop - 20 && scrollPosition < sectionBottom - 20) {
      // Highlight the active nav link
      document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
});

// Smooth scroll to top
document.getElementById("back-to-top").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent any default action if necessary

  // Set the scroll position to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Disable any further scroll event or interference for a brief moment
  // by temporarily disabling the scroll listener after clicking.
  document.removeEventListener("scroll", handleScroll);

  // Re-enable the scroll listener after 1 second
  setTimeout(() => {
    document.addEventListener("scroll", handleScroll);
  }, 1000);
});

// Define the scroll handling logic separately for easy control
function handleScroll() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY;
  const backToTop = document.getElementById("back-to-top");

  // Show or hide the back-to-top button
  backToTop.style.display = scrollPosition > 400 ? "block" : "none";

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const navLink = document.getElementById(`nav-section${index + 1}`);

    // Check if the current scroll position is within the section's bounds
    if (scrollPosition >= sectionTop - 20 && scrollPosition < sectionBottom - 20) {
      // Highlight the active nav link
      document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}

// Initialize the scroll listener
document.addEventListener("scroll", handleScroll);

function setSlide(index) {
    $('#imageCarousel').carousel(index);
}

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav");
	const logo = document.querySelector(".logo img");

    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents immediate closing when clicking the hamburger
        navMenu.classList.toggle("nav-active");
    });

    // Click outside to close menu
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove("nav-active");
        }
    });

    // Ensure menu items do not close menu on click (optional)
    navMenu.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents menu from closing when clicking inside it
    });
});

/*carousel*/
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const thumbnails = document.querySelectorAll(".thumb");
const progressBars = document.querySelectorAll(".thumb .progress");

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 10000; // 10 seconds

function updateCarousel() {
    document.querySelector(".slides").style.transform = `translateX(-${currentIndex * 100}%)`;
    updateThumbnails();
    animateProgress();
}

function updateThumbnails() {
    let totalSlides = slides.length;
    
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    let nextIndex = (currentIndex + 1) % totalSlides;

    let indexes = [prevIndex, currentIndex, nextIndex];

    thumbnails.forEach((thumb, i) => {
        let slideImg = slides[indexes[i]].querySelector("img").src;
        thumb.querySelector("img").src = slideImg;
        thumb.dataset.index = indexes[i];
        thumb.classList.toggle("active", i === 1); // Center thumbnail is active
    });

    // Reset progress bars
    progressBars.forEach(bar => bar.style.width = "0%");
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function jumpToSlide(index) {
    currentIndex = index;
    updateCarousel();
    restartAutoSlide();
}

function animateProgress() {
    let activeProgress = progressBars[1]; // Center (active) thumbnail progress
    if (activeProgress) {
        activeProgress.style.transition = `width ${slideDuration}ms linear`;
        activeProgress.style.width = "100%";
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideDuration);
    animateProgress();
}

function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners
prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
});

nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
});

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => jumpToSlide(Number(thumb.dataset.index)));
});

// Initialize
updateCarousel();
startAutoSlide();

