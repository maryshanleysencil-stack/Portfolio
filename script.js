// ========== FIRST PAGE SCROLL LOCK ==========
document.addEventListener('scroll', function() {
    const firstPage = document.querySelector('.hero');
    const windowHeight = window.innerHeight;

    // Lock the first page during scroll
    if (window.scrollY < windowHeight) {
        firstPage.style.position = 'fixed';
        firstPage.style.top = '0';
    } else {
        firstPage.style.position = 'relative';
    }
});

// ========== SMOOTH SCROLL SETUP ==========
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========== PORTFOLIO DETAILS FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Click on portfolio item to show details
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking close button
            if (e.target.closest('.close-details')) return;
            
            const details = this.querySelector('.portfolio-details');
            if (details) {
                details.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close details when clicking close button or outside
    document.addEventListener('click', function(e) {
        if (e.target.closest('.close-details')) {
            const details = e.target.closest('.portfolio-details');
            details.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (e.target.classList.contains('portfolio-details')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Show/hide items based on filter
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// ========== NAVIGATION TOGGLE ==========
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== FORM VALIDATION & SUBMISSION ==========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });

    // Remove invalid state when user starts typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
}

// ========== CLOSE MODAL ON ESC KEY ==========
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.portfolio-details.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ========== PREVENT SCROLL WHEN MODAL IS OPEN ==========
const originalScrollTop = window.pageYOffset;
const portfolioDetails = document.querySelectorAll('.portfolio-details');

portfolioDetails.forEach(modal => {
    const observer = new MutationObserver(function() {
        if (modal.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
});
