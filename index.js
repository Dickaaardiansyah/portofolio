document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors) {
        anchors.forEach(anchor => {
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
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (navbar && scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = scrollPercent + '%';
        });
    } else {
        console.warn('Navbar or scrollIndicator not found');
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-title, .about-image, .about-text, .skill-card, .project-card, .contact-info, .contact-form');
    if (animateElements) {
        animateElements.forEach(el => {
            if (el) observer.observe(el);
        });
    }

    // Staggered animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards) {
        skillCards.forEach((card, index) => {
            if (card) card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Staggered animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards) {
        projectCards.forEach((card, index) => {
            if (card) card.style.transitionDelay = `${index * 0.15}s`;
        });
    }

    // Form submission
    // Form submission - VERSI DIPERBAIKI
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Tetap prevent default untuk handling custom
        
        const submitBtn = this.querySelector('.submit-btn');
        const formData = new FormData(this);
        
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            // Kirim data ke Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Sukses
                    submitBtn.textContent = 'Pesan Terkirim! ✓';
                    submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
                        this.reset(); // Reset form
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Error handling
                console.error('Error:', error);
                submitBtn.textContent = 'Gagal Mengirim ❌';
                submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
                }, 3000);
            });
        }
    });
}

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.floating-shapes');
    if (shapes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            shapes.forEach((shape, index) => {
                if (shape) {
                    const speed = 0.5 + index * 0.1;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
        });
    }

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks) {
        navLinks.forEach(link => {
            if (link) {
                link.addEventListener('mouseenter', function() {
                    this.style.textShadow = '0 0 10px rgba(240, 147, 251, 0.5)';
                });
                link.addEventListener('mouseleave', function() {
                    this.style.textShadow = 'none';
                });
            }
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        let typewriterIndex = 0;
        function typeWriter() {
            if (typewriterIndex < originalText.length) {
                heroTitle.textContent = originalText.slice(0, typewriterIndex + 1);
                typewriterIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (heroTitle) {
                    heroTitle.textContent = '';
                    typeWriter();
                }
            }, 1000);
        });

        // Add cursor blink animation
        const style = document.createElement('style');
        style.textContent = `
            .hero h1::after {
                content: '|';
                animation: blink 1s infinite;
                margin-left: 5px;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced scroll animations with different entrance effects
    const observerLeft = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    const observerRight = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    const oddSkillCards = document.querySelectorAll('.skill-card:nth-child(odd)');
    if (oddSkillCards) {
        oddSkillCards.forEach(el => {
            if (el) {
                el.style.transform = 'translateX(-50px)';
                el.style.opacity = '0';
                observerLeft.observe(el);
            }
        });
    }

    const evenSkillCards = document.querySelectorAll('.skill-card:nth-child(even)');
    if (evenSkillCards) {
        evenSkillCards.forEach(el => {
            if (el) {
                el.style.transform = 'translateX(50px)';
                el.style.opacity = '0';
                observerRight.observe(el);
            }
        });
    }

    // Magnetic button effect
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    if (buttons) {
        buttons.forEach(button => {
            if (button) {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                });
            }
        });
    }

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) ripple.remove();
        button.appendChild(circle);
    }

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    const allButtons = document.querySelectorAll('.cta-button, .submit-btn, .social-link, .view-project-btn');
    if (allButtons) {
        allButtons.forEach(button => {
            if (button) {
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.addEventListener('click', createRipple);
            }
        });
    }

    // Smooth reveal for project cards on scroll
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    }, { threshold: 0.1 });

    if (projectCards) {
        projectCards.forEach((card, index) => {
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) rotateY(45deg)';
                card.style.transition = `all 0.8s ease ${index * 0.2}s`;
                projectObserver.observe(card);
            }
        });
    }

    // Dynamic background color change based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const hue = Math.floor(scrollPercent * 360);
        document.documentElement.style.setProperty('--primary', `hsl(${hue}, 70%, 60%)`);
    });

    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        const mobileMenuToggle = document.createElement('div');
        mobileMenuToggle.innerHTML = '☰';
        mobileMenuToggle.style.cssText = `
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--light);
            @media (max-width: 768px) { display: block; }
        `;
        navContainer.appendChild(mobileMenuToggle);
    }

    // Performance optimization: throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        ticking = false;
    }
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);
});