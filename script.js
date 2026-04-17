// ========== SCROLL LOCK HELPER FUNCTIONS ==========
function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';
}

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    
    return scrollbarWidth;
}

// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Lock scroll when menu is open on mobile
    if (navToggle.classList.contains('active')) {
        disableScroll();
    } else {
        enableScroll();
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        enableScroll();
    });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SCROLL TO TOP ==========
const scrollToTop = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== PORTFOLIO FILTERS ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'portfolioFadeIn 0.6s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ========== SKILLS PROGRESS ANIMATION ==========
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-item')) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// ========== FORM VALIDATION & SUBMISSION ==========
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.classList.remove('invalid');

        if (input.value.trim() === '') {
            input.classList.add('invalid');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            input.classList.add('invalid');
            isValid = false;
        }
    });

    return isValid;
};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
        // Simulate form submission
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show success message
        formMessage.textContent = `Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`;
        formMessage.classList.remove('error');
        formMessage.classList.add('success');

        // Reset form
        setTimeout(() => {
            form.reset();
            formMessage.classList.remove('success');
        }, 3000);
    } else {
        formMessage.textContent = 'Please fill in all fields correctly.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    }
});

// ========== FORM INPUT VALIDATION ON CHANGE ==========
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('change', () => {
        input.classList.remove('invalid');
    });
});

// ========== ANIMATED COUNTER ==========
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Trigger counter animation on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const number = stat.querySelector('.stat-number');
            const targetValue = parseInt(number.textContent);
            animateCounter(number, targetValue);
            statsObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ========== HEADER SHADOW ON SCROLL ==========
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 50) {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// ========== PARALLAX EFFECT (Optional) ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});
