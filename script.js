// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(Flip, ScrollTrigger);

    // Flip Animation Setup
    const group = document.querySelector(".group");
    const flipButton = document.querySelector("#changeLayout");

    if (flipButton && group) {
        flipButton.addEventListener("click", () => {
            // Get the initial state of the elements
            const state = Flip.getState(".group, .box");
            
            // Toggle the flex direction
            group.classList.toggle("reorder");
            
            // Create the flip animation
            Flip.from(state, {
                absolute: true,
                duration: 0.5,
                stagger: 0.1,
                ease: "power1.inOut",
                onComplete: () => {
                    console.log("Flip animation completed");
                }
            });
        });
    }

    // Hamburger Menu Setup
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero Section Animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        delay: 0.5,
        ease: 'power4.out'
    });

    gsap.from('.btn', {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });

    // Grid Animation and Animated Highlight Lines
    const gridContainer = document.querySelector('.grid-lines');
    const horizontalLine = document.querySelector('.highlight-line.horizontal');
    const verticalLine = document.querySelector('.highlight-line.vertical');

    if (gridContainer) {
        gsap.from(gridContainer, {
            opacity: 0,
            scale: 0.9,
            duration: 2,
            ease: 'power3.out'
        });

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = gridContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const gridSize = 20;

                const snappedY = Math.floor(y / gridSize) * gridSize;
                const snappedX = Math.floor(x / gridSize) * gridSize;

                gsap.to(horizontalLine, {
                    y: snappedY,
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });

                gsap.to(verticalLine, {
                    x: snappedX,
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            hero.addEventListener('mouseleave', () => {
                gsap.to([horizontalLine, verticalLine], {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            hero.addEventListener('mouseenter', () => {
                gsap.to([horizontalLine, verticalLine], {
                    opacity: 0,
                    duration: 0
                });
            });
        }
    }

    // About Section Animation and Tilt Effect
    const aboutContent = document.querySelector('.about-content');
    const aboutSection = document.querySelector('#about');

    if (aboutSection) {
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                toggleActions: 'play none none reset'
            },
            opacity: 0,
            x: -200,
            duration: 1.5,
            ease: 'power3.out'
        });

        gsap.from('.about-img', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                toggleActions: 'play none none reset'
            },
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            delay: 0.5,
            ease: 'elastic.out(1, 0.8)'
        });

        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            const cornerDistance = 100;
            let rotateX = 0;
            let rotateY = 0;
            const maxTilt = 5;

            if (x < cornerDistance && y < cornerDistance) {
                rotateX = maxTilt;
                rotateY = -maxTilt;
            } else if (x > width - cornerDistance && y < cornerDistance) {
                rotateX = maxTilt;
                rotateY = maxTilt;
            } else if (x < cornerDistance && y > height - cornerDistance) {
                rotateX = -maxTilt;
                rotateY = -maxTilt;
            } else if (x > width - cornerDistance && y > height - cornerDistance) {
                rotateX = -maxTilt;
                rotateY = maxTilt;
            }

            gsap.to(aboutContent, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        aboutSection.addEventListener('mouseleave', () => {
            gsap.to(aboutContent, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    // Portfolio Section Horizontal Scroll
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        const portfolioItems = gsap.utils.toArray('.portfolio-item');
        const totalWidth = portfolioItems.reduce((acc, item) => acc + item.offsetWidth + 32, 0);

        gsap.to(portfolioGrid, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top top',
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            }
        });

        portfolioItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: left, // Fixed syntax error from 'right'
                    toggleActions: 'play none none reset'
                },
                opacity: 0,
                y: 100,
                duration: 1,
                delay: i * 0.2,
                ease: 'power2.out'
            });
        });
    }

    
});