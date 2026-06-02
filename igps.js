// Swiper 3D Coverflow Slider
new Swiper('.mySwiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  initialSlide: 2,
  loop: true,
  spaceBetween: 30,
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

document.addEventListener('DOMContentLoaded', function () {
    // Enable edit mode if URL contains edit parameter
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.get('edit') === 'true';
    // Add edit mode indicator
    if (isEditMode) {
        const editIndicator = document.createElement('div');
        editIndicator.innerHTML = `
<div class="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-full z-50 shadow-lg">
Edit Mode Active
</div>
`;
        document.body.appendChild(editIndicator);
        // Make all text content editable
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a').forEach(element => {
            element.contentEditable = true;
        });
    }
    // Preloader
    setTimeout(function () {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', function () {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            menuBtn.innerHTML = '<i class="ri-close-line ri-lg"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
        }
    });
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
        });
    });
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    setInterval(nextSlide, 5000);
    // Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const increment = target / speed;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
    // Trigger counter animation when counters are in view
    const counterSection = document.querySelector('.counter').closest('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(counterSection);
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successModal.classList.remove('hidden');
        contactForm.reset();
    });
    closeModal.addEventListener('click', function () {
        successModal.classList.add('hidden');
    });
    // Close modal when clicking outside
    successModal.addEventListener('click', function (e) {
        if (e.target === successModal) {
            successModal.classList.add('hidden');
        }
    });
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
