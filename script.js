// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolio();
    initializeScrollToTop();
    initializeFormValidation();
    initializeModals();
});

// ========== NAVIGATION FUNCTIONALITY ==========
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== PORTFOLIO FILTERING ==========
function initializePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length === 0) return;

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            filterPortfolioItems(portfolioItems, filter);
        });
    });

    // Trigger 'All Projects' on page load
    setTimeout(() => {
        const allBtn = document.querySelector('[data-filter="all"]');
        if (allBtn) {
            allBtn.click();
        }
    }, 200);
}

// Filter portfolio items with smooth animation
function filterPortfolioItems(items, filter) {
    let visibleCount = 0;

    // Fade out phase
    items.forEach(item => {
        item.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) translateY(20px)';
        item.style.pointerEvents = 'none';
    });

    // Fade in phase
    setTimeout(() => {
        items.forEach((item, index) => {
            const isMatch = (filter === 'all' || item.dataset.category === filter);

            if (isMatch) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                item.style.pointerEvents = 'auto';
                visibleCount++;

                // Staggered animation
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

        console.log(`Portfolio: Showing ${visibleCount} projects for "${filter}"`);
    }, 300);
}

// ========== PORTFOLIO MODALS ==========
function initializeModals() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioItems.length === 0) return;

    // Open modal on project click
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

    // Close modal handlers
    document.addEventListener('click', function(e) {
        // Close on close button click
        if (e.target.closest('.close-details')) {
            const details = e.target.closest('.portfolio-details');
            if (details) {
                closeModal(details);
            }
        }

        // Close on background click
        if (e.target.classList.contains('portfolio-details')) {
            closeModal(e.target);
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.portfolio-details.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Prevent scroll when modal is open
    const modals = document.querySelectorAll('.portfolio-details');
    modals.forEach(modal => {
        const observer = new MutationObserver(function() {
            if (modal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    });
}

// Close modal helper function
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========== SCROLL TO TOP BUTTON ==========
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== FORM VALIDATION ==========
function initializeFormValidation() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    // Validate on submit
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

    // Remove error on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
}

// ========== UTILITY FUNCTIONS ==========

// Smooth scroll to element
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Log portfolio statistics
function logPortfolioStats() {
    const items = document.querySelectorAll('.portfolio-item');
    const categories = {};

    items.forEach(item => {
        const category = item.dataset.category;
        categories[category] = (categories[category] || 0) + 1;
    });

    console.log('Portfolio Statistics:', categories);
}

// Call stats on load (optional)
document.addEventListener('DOMContentLoaded', logPortfolioStats);
