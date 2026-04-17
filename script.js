// Updated script.js to remove parallax effect and fix scroll behavior

document.addEventListener('scroll', function() {
    const firstPage = document.querySelector('.first-page');
    const windowHeight = window.innerHeight;

    // Lock the first page during scroll
    if (window.scrollY < windowHeight) {
        firstPage.style.position = 'fixed';
        firstPage.style.top = '0';
    } else {
        firstPage.style.position = 'relative';
    }
});

// Additional code to ensure smooth scrolling between sections

// Smooth scroll setup
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
}
