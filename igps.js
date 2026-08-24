// IGPS Main JavaScript

// Safe Swiper initialization (only if Swiper is loaded and element exists)
if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
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
}

document.addEventListener('DOMContentLoaded', function () {
    // Fast & Reliable Preloader Dismissal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function () {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.4s ease';
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 400);
        }, 500);
    }

    // Enable edit mode if URL contains edit parameter
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.get('edit') === 'true';
    if (isEditMode) {
        const editIndicator = document.createElement('div');
        editIndicator.innerHTML = `
            <div class="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-full z-50 shadow-lg">
                Edit Mode Active
            </div>
        `;
        document.body.appendChild(editIndicator);
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a').forEach(element => {
            element.contentEditable = true;
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
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
    }

    // Hero Slider Auto-rotation
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 5000);
    }

    // Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger immediately for top elements

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
    const counterEl = document.querySelector('.counter');
    if (counterEl) {
        const counterSection = counterEl.closest('section');
        if (counterSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counterSection);
        }
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
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
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    if (contactForm && successModal) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            successModal.classList.remove('hidden');
            contactForm.reset();
        });
        closeModal?.addEventListener('click', function () {
            successModal.classList.add('hidden');
        });
        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) {
                successModal.classList.add('hidden');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length <= 1) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
