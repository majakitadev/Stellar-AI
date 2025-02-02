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

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links"); // Update selector if needed

    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function () {
        console.log("Hamburger clicked!"); // Debugging
        navMenu.classList.toggle("nav-active");
    });

    // Click outside to close menu
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove("nav-active");
        }
    });
});