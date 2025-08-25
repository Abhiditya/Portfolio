// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initParallax();
    initCustomCursor();
    initParticles();
    init3DTiltCards();
    initScrollReveal();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}


// Proper parallax scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Parallax movement on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Move elements at different speeds for parallax effect
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Move hero content slower than background
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const heroOffset = scrolled * 0.3;
            heroContent.style.transform = `translateY(${heroOffset}px)`;
        }
        
    });

}

// Parallax effects
function initParallax() {
    const hero = document.querySelector('.hero');
    const projects = document.querySelector('.projects');
    
    
    // Scroll parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to hero background
        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
        
        // Floating animation for project icons
        const projectIcons = document.querySelectorAll('.project-icon');
        projectIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            icon.style.transform = `translateY(${Math.sin(scrolled * 0.01 + index) * speed}px)`;
        });
    });
}

// Initialize animations
function initAnimations() {
    // Typing animation for hero text
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero image
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * -10;
            const rotateY = (x / rect.width) * 10;
            
            profileImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // Project video hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });
            
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scroll-to-top');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Custom Cursor Effect
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Trail particles array
    const trailParticles = [];
    const maxTrails = 8;
    
    // Create trail particles
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trailParticles.push({
            element: trail,
            x: 0,
            y: 0,
            opacity: 0
        });
    }
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
        
        // Update trail particles
        trailParticles.forEach((particle, index) => {
            const delay = index * 0.05;
            setTimeout(() => {
                particle.x = mouseX - 2;
                particle.y = mouseY - 2;
                particle.opacity = (maxTrails - index) / maxTrails * 0.5;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.opacity;
            }, delay * 100);
        });
    });
    
    // Smooth follower animation
    function animateFollower() {
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        follower.style.left = followerX - 15 + 'px';
        follower.style.top = followerY - 15 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
            follower.classList.add('expand');
            
            // Enhance trail on hover
            trailParticles.forEach(particle => {
                particle.element.style.background = 'rgba(59, 130, 246, 0.8)';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
            follower.classList.remove('expand');
            
            // Reset trail
            trailParticles.forEach(particle => {
                particle.element.style.background = 'rgba(255, 255, 255, 0.6)';
            });
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
        trailParticles.forEach(particle => {
            particle.element.style.opacity = '0';
        });
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// Particle Background System
function initParticles() {
    const container = document.getElementById('particles-container');
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        const shapes = ['', 'triangle', 'square'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particle.className = `particle ${shape}`;
        
        // Random size and position
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        container.appendChild(particle);
        
        particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }
        });
    });
    
    // Animation loop
    function animateParticles() {
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Update DOM element
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        // Draw connections
        drawConnections();
        requestAnimationFrame(animateParticles);
    }
    
    function drawConnections() {
        // Remove existing lines
        const existingLines = container.querySelectorAll('.particle-line');
        existingLines.forEach(line => line.remove());
        
        // Draw new connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const line = document.createElement('div');
                    line.className = 'particle-line';
                    
                    const opacity = (connectionDistance - distance) / connectionDistance * 0.3;
                    line.style.opacity = opacity;
                    
                    const angle = Math.atan2(dy, dx);
                    const length = distance;
                    
                    line.style.width = length + 'px';
                    line.style.height = '1px';
                    line.style.left = particles[j].x + 'px';
                    line.style.top = particles[j].y + 'px';
                    line.style.transform = `rotate(${angle}rad)`;
                    line.style.transformOrigin = '0 0';
                    
                    container.appendChild(line);
                }
            }
        }
    }
    
    animateParticles();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        particles.forEach(particle => {
            if (particle.x > window.innerWidth) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = window.innerHeight;
        });
    });
}

// 3D Tilt Cards Effect
function init3DTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        // Set initial perspective
        card.style.transformStyle = 'preserve-3d';
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Dynamic lighting effect
            const lightX = (x / rect.width) * 100;
            const lightY = (y / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${lightX}% ${lightY}%, 
                rgba(255, 255, 255, 0.1) 0%, 
                transparent 70%)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.background = '';
        });
    });
}

// Advanced Scroll-Triggered Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-fade, .scroll-reveal-stagger');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                const delay = entry.target.classList.contains('scroll-reveal-stagger') ? index * 150 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                // Unobserve after revealing to prevent re-triggering
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Enhanced counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent.replace('+', ''));
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const countUp = () => {
                    if (currentNumber < finalNumber) {
                        currentNumber += increment;
                        target.textContent = Math.ceil(currentNumber) + '+';
                        requestAnimationFrame(countUp);
                    } else {
                        target.textContent = finalNumber + '+';
                    }
                };
                
                // Add reveal class and start counting
                target.classList.add('revealed');
                countUp();
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        stat.classList.add('counter');
        statsObserver.observe(stat);
    });
    
    // Progressive skill item reveals
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        skillObserver.observe(item);
    });
}

