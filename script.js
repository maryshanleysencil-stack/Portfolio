// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', function () {
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

    navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ========== PORTFOLIO FILTERING ==========
function initializePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-grid > .portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
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
            const isMatch = filter === 'all' || item.dataset.category === filter;

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
    const items = document.querySelectorAll('.portfolio-grid > .portfolio-item');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    if (!items.length || !modal || !modalBody || !closeBtn || !overlay) return;

    function openModal(detailsHTML) {
        modalBody.innerHTML = detailsHTML;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    items.forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target.closest('a, button')) return;
            if (item.classList.contains('hidden')) return;

            const directDetails = item.getAttribute('data-details');
            const nestedDetailsEl = item.querySelector('.portfolio-item[data-details]');
            const detailsHTML = directDetails || nestedDetailsEl?.getAttribute('data-details');

            if (!detailsHTML) return;

            openModal(detailsHTML);
        });
    });

    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });

    overlay.addEventListener('click', function () {
        closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// ========== SCROLL TO TOP ==========
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
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

    contactForm.addEventListener('submit', function (e) {
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
        input.addEventListener('input', function () {
            this.classList.remove('invalid');
        });
    });
}

// ========== UTIL ==========
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function logPortfolioStats() {
    const items = document.querySelectorAll('.portfolio-grid > .portfolio-item');
    const categories = {};

    items.forEach(item => {
        const category = item.dataset.category;
        if (category) {
            categories[category] = (categories[category] || 0) + 1;
        }
    });

    console.log('Portfolio Statistics:', categories);
}
