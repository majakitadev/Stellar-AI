document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const background = document.getElementById("background");
  const scrollPosition = window.scrollY;
  const backToTop = document.getElementById("back-to-top");

  // Show or hide the back-to-top button
  backToTop.style.display = scrollPosition > 400 ? "block" : "none";

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const navLink = document.getElementById(`nav-section${index + 1}`);

    // Check if the current scroll position is within the section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Highlight the active nav link
      document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
});

// Smooth scroll to top
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});