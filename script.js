document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother cursor movement
        requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        });
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, [role="button"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('cursor-active');
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Active Link on Scroll for Mobile Nav
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.fixed .glass-card a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('bg-primary', 'text-white', 'glow-blue', 'opacity-40');
            item.classList.add('opacity-40');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.remove('opacity-40');
                item.classList.add('bg-primary', 'text-white', 'glow-blue');
            }
        });
    });

    // Smooth Parallax for Sphere
    const sphere = document.querySelector('.sphere-gradient');
    if (sphere) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
            sphere.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`;
        });
    }

    // Handle Contact Button Click (Animated Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fake Form / Link interaction for "hello@antigravity.dev"
    const contactBtn = document.querySelector('#contact button');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            contactBtn.innerText = 'Redirecting...';
            setTimeout(() => {
                window.location.href = 'mailto:hello@antigravity.dev';
                setTimeout(() => contactBtn.innerText = 'hello@antigravity.dev', 1000);
            }, 800);
        });
    }
});
