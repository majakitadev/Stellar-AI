const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const thumbnails = document.querySelectorAll(".thumb");
const progressBars = document.querySelectorAll(".thumb .progress");

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 8000; // 8 seconds

function updateCarousel() {
    document.querySelector(".slides").style.transform = `translateX(-${currentIndex * 100}%)`;
    updateThumbnails();
    animateProgress();
}

function updateThumbnails() {
    let totalSlides = slides.length;
    
    thumbnails.forEach((thumb, i) => {
        thumb.style.display = "none"; // Hide all thumbnails by default
        thumb.classList.remove("active");
    });

    // Ensure thumbnails always have the active one in the center
    if (currentIndex === 0) {
        // First slide: Hide previous, center current, show next
        thumbnails[0].style.display = "none"; // No previous slide
        thumbnails[1].style.display = "block"; // Active slide (center)
        thumbnails[2].style.display = "block"; // Next slide

        thumbnails[1].querySelector("img").src = slides[currentIndex].querySelector("img").src;
        thumbnails[2].querySelector("img").src = slides[currentIndex + 1].querySelector("img").src;

        thumbnails[1].dataset.index = currentIndex;
        thumbnails[2].dataset.index = currentIndex + 1;
        thumbnails[1].classList.add("active");

    } else if (currentIndex === totalSlides - 1 || currentIndex === 0) {
    if (currentIndex === 0) {
        // First slide after looping: Update the previous thumbnail to the last slide
        thumbnails[0].querySelector("img").src = slides[totalSlides - 1].querySelector("img").src;
        thumbnails[0].dataset.index = totalSlides - 1;
    } else {
        // Last slide logic as before
        thumbnails[0].querySelector("img").src = slides[currentIndex - 1].querySelector("img").src;
        thumbnails[0].dataset.index = currentIndex - 1;
    }
        // Last slide: Show previous, center current, hide next
        thumbnails[0].style.display = "block"; // Previous slide
        thumbnails[1].style.display = "block"; // Active slide (center)
        thumbnails[2].style.display = "none"; // No next slide

        thumbnails[0].querySelector("img").src = slides[currentIndex - 1].querySelector("img").src;
        thumbnails[1].querySelector("img").src = slides[currentIndex].querySelector("img").src;

        thumbnails[0].dataset.index = currentIndex - 1;
        thumbnails[1].dataset.index = currentIndex;
        thumbnails[1].classList.add("active");

    } else {
        // Middle slides: Show previous, center current, show next
        thumbnails[0].style.display = "block";
        thumbnails[1].style.display = "block";
        thumbnails[2].style.display = "block";

        thumbnails[0].querySelector("img").src = slides[currentIndex - 1].querySelector("img").src;
        thumbnails[1].querySelector("img").src = slides[currentIndex].querySelector("img").src;
        thumbnails[2].querySelector("img").src = slides[currentIndex + 1].querySelector("img").src;

        thumbnails[0].dataset.index = currentIndex - 1;
        thumbnails[1].dataset.index = currentIndex;
        thumbnails[2].dataset.index = currentIndex + 1;
        thumbnails[1].classList.add("active");
    }

    // Reset progress bars
    progressBars.forEach(bar => (bar.style.width = "0%"));
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;  // Loop back to the first slide
    }
    updateCarousel();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
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
    autoSlideInterval = setInterval(() => {
nextSlide();
    }, slideDuration);
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
