document.addEventListener('DOMContentLoaded', () => {
    // Prevent auto-scroll to hash on reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Restore scroll position if available, or scroll to top
    // Note: We only want to prevent the "jump to bottom" caused by the hash.
    // Standard browser behavior for reload is usually fine, but if the hash is present, it forces a jump.
    // By setting scrollRestoration to manual, we take control.

    // However, if we want to PERSIST the scroll position across reloads (which browsers usually do efficiently),
    // but ignoring the hash, we can do this:
    window.scrollTo(0, 0); // Start at top to prevent jump
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
    }

    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('scrollPos', window.scrollY);
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileBtn.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 12, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 12, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // Cursor Glow Effect
    const cursor = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-content, .timeline-content, .project-card, .skill-category, .contact-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Hero Card 3D Tilt Effect
    const card = document.querySelector('.code-card');
    const container = document.querySelector('.hero-visual');

    if (card && container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            // Calculate rotation between -10 and 10 degrees
            // (x / width - 0.5) gives range -0.5 to 0.5
            // Multiply by 20 to get -10 to 10
            const xRotation = ((y / rect.height) - 0.5) * -20; // Invert logic for tilt up/down
            const yRotation = ((x / rect.width) - 0.5) * 20;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            // Reset to flat state
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Add class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .cursor-glow {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 70%);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: opacity 0.3s;
        }
        
        @media (max-width: 768px) {
            .nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--bg-card);
                padding: 20px;
                flex-direction: column;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .nav.active {
                display: flex;
            }
            .cursor-glow {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});
