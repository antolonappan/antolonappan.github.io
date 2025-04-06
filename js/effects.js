/* Additional JavaScript for dynamic functionality */

// Particle animation for background
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element for particle animation
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-canvas';
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.zIndex = '-1';
    particleCanvas.style.opacity = '0.5';
    document.body.appendChild(particleCanvas);
    
    // Initialize particle animation
    initParticleAnimation();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize custom cursor
    initCustomCursor();
});

// Particle animation
function initParticleAnimation() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle properties
    const particleCount = 50;
    const particles = [];
    const colors = ['#c9a227', '#8b6b3d', '#4a3520'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        // Random delay for each element
        const delay = Math.random() * 2;
        element.style.animation = `floating 3s ease-in-out ${delay}s infinite`;
    });
}

// Parallax effect
function initParallaxEffect() {
    window.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid #c9a227';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
    document.body.appendChild(cursor);
    
    // Cursor follower (inner dot)
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    follower.style.position = 'fixed';
    follower.style.width = '5px';
    follower.style.height = '5px';
    follower.style.borderRadius = '50%';
    follower.style.backgroundColor = '#c9a227';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9999';
    follower.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(follower);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with delay
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Hover effect on links and buttons
    const links = document.querySelectorAll('a, button, .nav-links li, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(201, 162, 39, 0.1)';
            cursor.style.mixBlendMode = 'difference';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.mixBlendMode = 'normal';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// Vintage paper effect for sections
document.addEventListener('DOMContentLoaded', function() {
    const paperSections = document.querySelectorAll('.paper-bg');
    
    paperSections.forEach(section => {
        // Add subtle texture
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        
        // Create texture overlay
        const texture = document.createElement('div');
        texture.style.position = 'absolute';
        texture.style.top = '0';
        texture.style.left = '0';
        texture.style.width = '100%';
        texture.style.height = '100%';
        texture.style.backgroundImage = 'url("images/paper-texture.png")';
        texture.style.opacity = '0.1';
        texture.style.pointerEvents = 'none';
        
        section.appendChild(texture);
    });
});

// Dynamic content loading with fade effect
document.addEventListener('DOMContentLoaded', function() {
    const contentSections = document.querySelectorAll('section');
    
    contentSections.forEach(section => {
        // Add fade-in class if not already present
        if (!section.classList.contains('fade-in')) {
            section.classList.add('fade-in');
        }
    });
});

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});

// Add noise texture to vintage filter
document.addEventListener('DOMContentLoaded', function() {
    const vintageFilter = document.querySelector('.vintage-filter');
    if (vintageFilter) {
        // Create noise texture
        const noise = document.createElement('div');
        noise.style.position = 'absolute';
        noise.style.top = '0';
        noise.style.left = '0';
        noise.style.width = '100%';
        noise.style.height = '100%';
        noise.style.backgroundImage = 'url("images/noise.png")';
        noise.style.opacity = '0.05';
        noise.style.pointerEvents = 'none';
        
        vintageFilter.appendChild(noise);
    }
});

// Add floating decorative elements
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Create floating decorative elements
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element floating';
            element.style.position = 'absolute';
            element.style.width = Math.random() * 30 + 10 + 'px';
            element.style.height = element.style.width;
            element.style.backgroundColor = '#c9a227';
            element.style.opacity = Math.random() * 0.3 + 0.1;
            element.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            element.style.top = Math.random() * 100 + '%';
            element.style.left = Math.random() * 100 + '%';
            element.style.pointerEvents = 'none';
            
            heroSection.appendChild(element);
        }
    }
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = '#c9a227';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = '#4a3520';
    backToTopBtn.style.color = '#c9a227';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transition = 'opacity 0.3s ease';
    backToTopBtn.style.zIndex = '999';
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
