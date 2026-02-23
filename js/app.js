// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const body = document.body;
const preloader = document.querySelector('.preloader');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const backToTop = document.getElementById('back-to-top');
const navbar = document.querySelector('.navbar');
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

// 1. Preloader logic
window.addEventListener('load', () => {
    // Hide preloader
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            preloader.style.display = 'none';
            initHeroAnimations();
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// 2. Custom Cursor (Desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    // Add hover effect for interactive elements
    const interactives = document.querySelectorAll('a, button, .menu-icon');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });
}

// 3. Theme Toggle
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// 4. Navbar & Back to Top behavior on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
});

// Mobile menu toggle
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Back to top click
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. GSAP Animations
function initHeroAnimations() {
    const tl = gsap.timeline();

    // Hero Text
    tl.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
        .from('.hero-tagline', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-ctas .btn', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.3');

    // Floating Fruits
    tl.from('.fruit', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // Continuous floating animation
    gsap.to('.orange-img', {
        y: '20px',
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.mango-img', {
        y: '-15px',
        rotation: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
    });
}

// 6. About Section Animations
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const tlAbout = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            once: true
        }
    });

    tlAbout.from('.section-title', { opacity: 0, y: 30, duration: 0.6 })
        .from('.section-subtitle', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3')
        .from('.owner-img', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.2')
        .from('.experience-badge', { x: 30, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
        .from('.about-text h3, .about-text .role, .about-text p', { opacity: 0, x: -30, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.stat-item', {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.2,
            onStart: runCounters
        }, '-=0.2');
}

// 7. Counter Animation Function
function runCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2; // seconds

        gsap.to(counter, {
            innerHTML: target,
            duration: duration,
            snap: { innerHTML: 1 },
            ease: "power2.out"
        });
    });
}

// 8. Menu Filtering & Animations
const menuBtns = document.querySelectorAll('.menu-btn');
const menuCards = document.querySelectorAll('.menu-card');

menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        menuBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                gsap.to(card, { scale: 1, opacity: 1, duration: 0.4, display: 'flex' });
            } else {
                gsap.to(card, { scale: 0.8, opacity: 0, duration: 0.4, display: 'none' });
            }
        });
    });
});

// Menu Scroll Animation
const menuSection = document.querySelector('.menu');
if (menuSection) {
    gsap.from('.menu-card', {
        scrollTrigger: {
            trigger: '.menu',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// 9. Interactive Rating System
const starIcons = document.querySelectorAll('.rating-select .stars i');
let currentRating = 0;

starIcons.forEach(star => {
    star.addEventListener('mouseover', function () {
        const val = this.getAttribute('data-val');
        highlightStars(val);
    });

    star.addEventListener('mouseout', function () {
        highlightStars(currentRating);
    });

    star.addEventListener('click', function () {
        currentRating = this.getAttribute('data-val');
        highlightStars(currentRating);
        // Add minimal scale animation on click
        gsap.to(this, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 });
    });
});

function highlightStars(val) {
    starIcons.forEach(star => {
        if (star.getAttribute('data-val') <= val) {
            star.classList.replace('fa-regular', 'fa-solid');
        } else {
            star.classList.replace('fa-solid', 'fa-regular');
        }
    });
}

// Review form sumbit
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentRating === 0) {
            alert("Please select a rating star.");
            return;
        }
        alert("Thank you for your review!");
        reviewForm.reset();
        currentRating = 0;
        highlightStars(0);
    });
}

// 10. Reviews & Contact Animations
const reviewsSection = document.querySelector('.reviews');
if (reviewsSection) {
    gsap.from('.review-card', {
        scrollTrigger: {
            trigger: '.reviews',
            start: 'top 75%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.review-form-wrap', {
        scrollTrigger: {
            trigger: '.review-form-wrap',
            start: 'top 85%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.2)'
    });
}

const contactSection = document.querySelector('.contact');
if (contactSection) {
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-map', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
}
