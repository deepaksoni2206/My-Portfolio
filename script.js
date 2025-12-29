// Initialize Particle.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#64ffda" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#64ffda",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// Initialize Typed.js
var typed = new Typed('.typed-text', {
    strings: ['Django Developer', 'Backend Engineer', 'API Architect', 'Python Developer', 'Full Stack Developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000,
    showCursor: true,
    cursorChar: '|'
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close navbar on mobile after clicking
            if(window.innerWidth <= 992) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse);
                }
            }
        }
    });
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('footer p:last-child');
    if(yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', year);
    }
    
    // Initialize skill animations
    initializeSkillAnimations();
    
    // Initialize project hover effects
    initializeProjectHoverEffects();
    
    // Initialize 3D cube if Three.js is available
    if (typeof THREE !== 'undefined') {
        initialize3DCube();
    }
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Initialize skill animations
function initializeSkillAnimations() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach((badge, index) => {
        // Add delay for staggered animation
        badge.style.animationDelay = `${index * 0.1}s`;
        badge.classList.add('animate-fadeInUp');
    });
}

// Initialize project hover effects
function initializeProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            if(overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            if(overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Initialize 3D cube with Three.js
function initialize3DCube() {
    const container = document.getElementById('cube-container');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 200/200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    container.appendChild(renderer.domElement);
    
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(80, 80, 80);
    
    // Create wireframe material
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x64ffda,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x64ffda, 0.3);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x64ffda, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 200;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        renderer.setSize(200, 200);
        camera.aspect = 200 / 200;
        camera.updateProjectionMatrix();
    });
}

// Form submission handling (if you add a contact form later)
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}

// Add event listener for form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Add loading placeholder
    if (!img.complete) {
        img.classList.add('loading');
    }
});

// Add intersection observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.glass-card, .project-card, .skill-badge').forEach(el => {
    observer.observe(el);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse);
        }
    }
    
    // Tab key navigation focus styling
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse click
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation a:focus,
    .keyboard-navigation button:focus,
    .keyboard-navigation input:focus,
    .keyboard-navigation textarea:focus {
        outline: 2px solid var(--secondary);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'btn-neon back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Style for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
        }
    }
`;
document.head.appendChild(backToTopStyle);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar, .back-to-top, #particles-js, #cube-container, .floating-code {
            display: none !important;
        }
        
        body {
            color: #000 !important;
            background: #fff !important;
        }
        
        .glass-card {
            background: #fff !important;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
        }
        
        .hero, .section {
            padding: 20px 0 !important;
        }
        
        a {
            color: #000 !important;
            text-decoration: underline !important;
        }
        
        .btn-neon, .btn-accent {
            display: none !important;
        }
    }
`;
document.head.appendChild(printStyle);