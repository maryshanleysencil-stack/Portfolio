// ========== PORTFOLIO FILTER FUNCTIONALITY WITH SMOOTH TRANSITIONS ==========
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
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let visibleCount = 0;

            // First pass: fade out items and hide non-matching ones
            portfolioItems.forEach((item, index) => {
                const isMatch = (filter === 'all' || item.dataset.category === filter);

                if (isMatch) {
                    visibleCount++;
                }

                // Set transition
                item.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                if (isMatch) {
                    // Show the item
                    item.style.display = 'block';
                    item.style.pointerEvents = 'auto';
                    
                    // Staggered fade in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, index * 40);
                } else {
                    // Hide the item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9) translateY(20px)';
                    item.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 400);
                }
            });

            console.log(`Showing ${visibleCount} projects for filter: ${filter}`);
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

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== FORM VALIDATION ==========
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
