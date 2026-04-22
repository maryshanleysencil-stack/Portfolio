// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolio();
    initializeModals();
    initializeScrollToTop();
    initializeFormValidation();
    logPortfolioStats();
});

// ========== NAVIGATION FUNCTIONALITY ==========
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

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

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            filterPortfolioItems(portfolioItems, filter);
        });
    });

    setTimeout(() => {
        const allBtn = document.querySelector('[data-filter="all"]');
        if (allBtn) allBtn.click();
    }, 200);
}

function filterPortfolioItems(items, filter) {
    let visibleCount = 0;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) translateY(20px)';
        item.style.pointerEvents = 'none';
    });

    setTimeout(() => {
        items.forEach((item, index) => {
            const isMatch = (filter === 'all' || item.dataset.category === filter);

            if (isMatch) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                item.style.pointerEvents = 'auto';
                visibleCount++;

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

    portfolioItems.forEach((item) => {
        item.addEventListener('click', function(e) {

            // ❌ FIX: Prevent blocking clicks on inner elements
            if (e.target.closest('.portfolio-details') || e.target.closest('.close-details')) return;

            const details = this.querySelector('.portfolio-details');
            const detailsContent = this.querySelector('.details-content');
            const img = this.querySelector('img');

            if (details) {
                e.stopPropagation();

                // ❌ FIX: REMOVE background image override (this was breaking layout + clicks)
                if (detailsContent) {
                    detailsContent.style.backgroundImage = 'none';
                }

                details.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal (button)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.close-details')) {
            e.preventDefault();
            e.stopPropagation();
            const modal = e.target.closest('.portfolio-details');
            if (modal) closeModal(modal);
        }
    });

    // Close modal (background)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('portfolio-details') && e.target.classList.contains('active')) {
            closeModal(e.target);
        }
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.portfolio-details.active');
            if (activeModal) closeModal(activeModal);
        }
    });
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========== SCROLL TO TOP ==========
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== FORM VALIDATION ==========
function initializeFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

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

        if (!isValid) e.preventDefault();
    });

    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
}

// ========== UTIL ==========
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function logPortfolioStats() {
    const items = document.querySelectorAll('.portfolio-item');
    const categories = {};

    items.forEach(item => {
        const category = item.dataset.category;
        categories[category] = (categories[category] || 0) + 1;
    });

    console.log('Portfolio Statistics:', categories);
}
