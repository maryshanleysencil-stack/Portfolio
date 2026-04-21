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

// ========== PORTFOLIO FILTER FUNCTIONALITY WITH SMOOTH TRANSITIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Click on portfolio item to show details
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
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
            if (details) {
                details.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
        
        if (e.target.classList.contains('portfolio-details')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Filter functionality with smooth transitions
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let visibleCount = 0;

            // Fade out all items first
            portfolioItems.forEach(item => {
                item.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9) translateY(20px)';
                item.style.pointerEvents = 'none';
            });

            // After fade out, hide and re-show
            setTimeout(() => {
                portfolioItems.forEach((item, index) => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                        item.style.pointerEvents = 'auto';
                        visibleCount++;

                        // Staggered fade in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, index * 50);
                    } else {
                        item.classList.add('hidden');
                        item.style.opacity = '0';
                        
                        setTimeout(() => {
                            if (item.classList.contains('hidden')) {
                                item.style.display = 'none';
                            }
                        }, 400);
                    }
                });

                console.log(`Showing ${visibleCount} projects for filter: ${filter}`);
            }, 300);
        });
    });

    // Trigger 'All Projects' on page load
    setTimeout(() => {
        const allBtn = document.querySelector('[data-filter="all"]');
        if (allBtn) {
            allBtn.click();
        }
    }, 200);
});

// ========== NAVIGATION TOGGLE ==========
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking a link
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

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
