/* ====================================
   AshtekMinds JavaScript Animations
   ====================================  */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // ====================================
        // 1. GSAP SCROLL TRIGGERED ANIMATIONS
        // ====================================
        
        // Register ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate service cards on scroll
            gsap.utils.toArray('.service-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out'
                });
            });
            
            // Animate process steps
            gsap.utils.toArray('.process-step').forEach((step, index) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    },
                    x: index % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out'
                });
            });
            
            // Animate tech logo cards
            gsap.utils.toArray('.tech-logo-card').forEach((logo, index) => {
                gsap.from(logo, {
                    scrollTrigger: {
                        trigger: logo,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    delay: (index % 8) * 0.08,
                    ease: 'power2.out'
                });
            });
            
            // Animate about section
            gsap.from('.about-text', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: -60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Animate contact section
            gsap.from('.contact-form-container', {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            });
            
            gsap.from('.contact-info-container', {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.9,
                delay: 0.2,
                ease: 'power3.out'
            });
        }
        
        // ====================================
        // 2. COUNTER ANIMATION FOR STATS
        // ====================================
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
        
        // Observe when stats section comes into view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(animateCounter);
                }
            });
        }, observerOptions);
        
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }
        
        // ====================================
        // 3. SWIPER CAROUSEL INITIALIZATION
        // ====================================
        
        if (typeof Swiper !== 'undefined') {
            const portfolioSwiper = new Swiper('.portfolioSwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
        }
        
        // ====================================
        // 4. SMOOTH SCROLL FOR NAVIGATION
        // ====================================
        
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // ====================================
        // 5. SCROLL TO TOP BUTTON
        // ====================================
        
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // ====================================
        // 6. HEADER BACKGROUND ON SCROLL
        // ====================================
        
        const header = document.querySelector('.ashtek-header');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(255, 252, 250, 0.98) 0%, rgba(255, 245, 235, 0.98) 100%)';
                header.style.boxShadow = '0 4px 20px rgba(255, 111, 0, 0.12)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 235, 0.95) 100%)';
                header.style.boxShadow = '0 2px 10px rgba(255, 111, 0, 0.08)';
            }
        });
        
        // ====================================
        // 7. CONTACT FORM SUBMISSION
        // ====================================
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                };
                
                // Log form data (in production, send to server)
                console.log('Form submitted:', formData);
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
            });
        }
        
        // ====================================
        // 8. PARALLAX EFFECT FOR HERO
        // ====================================
        
        const heroBg = document.querySelector('.hero-bg-gradient');
        
        window.addEventListener('scroll', function() {
            if (heroBg) {
                const scrolled = window.pageYOffset;
                heroBg.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            }
        });
        
        // ====================================
        // 9. LAZY LOAD IMAGES
        // ====================================
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
        // ====================================
        // 10. ACTIVE NAVIGATION HIGHLIGHT
        // ====================================
        
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        // ====================================
        // 11. CURSOR TRAIL EFFECT (OPTIONAL)
        // ====================================
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // ====================================
        // 12. TYPING EFFECT FOR HERO TITLE
        // ====================================
        
        function typeWriter(element, text, speed) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }
        
        // Uncomment to enable typing effect on hero title
        // const heroTitle = document.querySelector('.hero-title');
        // if (heroTitle) {
        //     const originalText = heroTitle.textContent;
        //     setTimeout(function() {
        //         typeWriter(heroTitle, originalText, 50);
        //     }, 500);
        // }
        
        // ====================================
        // 13. PAGE LOAD ANIMATION
        // ====================================
        
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });
        
        // ====================================
        // 14. MOBILE MENU TOGGLE (If needed)
        // ====================================
        
        const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.ashtek-nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('open');
                this.classList.toggle('active');
            });
        }
        
        // ====================================
        // 15. ANIMATED GRADIENT BACKGROUND
        // ====================================
        
        const heroBgGradient = document.querySelector('.hero-bg-gradient');
        if (heroBgGradient) {
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
                
                const xPos = -20 + (mouseX * 10);
                const yPos = -50 + (mouseY * 10);
                
                heroBgGradient.style.transform = `translate(${xPos}%, ${yPos}%)`;
            });
        }
        
        // ====================================
        // 16. SECTION REVEAL WITH ORANGE ACCENT
        // ====================================
        
        const revealSections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealSections.forEach(function(section) {
            sectionObserver.observe(section);
        });
        
        // ====================================
        // 17. FLOATING ANIMATION ON TECH CARDS
        // ====================================
        
        const techCards = document.querySelectorAll('.tech-logo-card');
        
        techCards.forEach(function(card, index) {
            const delay = index * 0.1;
            const duration = 3 + (index % 3);
            
            card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
        
        // ====================================
        // 18. PARALLAX SCROLL EFFECT
        // ====================================
        
        const parallaxElements = document.querySelectorAll('.step-number, .service-icon');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(function(element, index) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const speed = 0.05 + (index % 3) * 0.02;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = (scrolled - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
        
        // ====================================
        // 19. ORANGE GLOW ON HOVER - DYNAMIC
        // ====================================
        
        const glowElements = document.querySelectorAll('.btn-primary, .process-step, .service-card');
        
        glowElements.forEach(function(element) {
            element.addEventListener('mouseenter', function(e) {
                const glow = document.createElement('div');
                glow.className = 'orange-glow-effect';
                this.appendChild(glow);
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
                
                setTimeout(function() {
                    glow.remove();
                }, 600);
            });
        });
        
        // ====================================
        // 20. ANIMATED PARTICLES BACKGROUND
        // ====================================
        
        // Add particles to all major sections
        const particleSections = document.querySelectorAll('.hero-section, .services-section, .process-section, .portfolio-section, .about-section, .contact-section');
        
        particleSections.forEach(function(section) {
            // Make section position relative if not already
            if (getComputedStyle(section).position === 'static') {
                section.style.position = 'relative';
            }
            
            // Create floating particles (8 per section for better performance)
            const particleCount = 8;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (6 + Math.random() * 4) + 's';
                section.appendChild(particle);
            }
        });
        
        // ====================================
        // 21. PERFORMANCE OPTIMIZATION
        // ====================================
        
        // Debounce function for scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction() {
                const later = function() {
                    clearTimeout(timeout);
                    func();
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // ====================================
        // Console Message
        // ====================================
        
        console.log('%c🚀 AshtekMinds Website Loaded Successfully!', 'color: #FF6F00; font-size: 16px; font-weight: bold;');
        console.log('%cBuilt with ❤️ and cutting-edge technology', 'color: #94a3b8; font-size: 12px;');
        
    });
    
})();
