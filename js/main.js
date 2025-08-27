document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    
    // If the current theme in localStorage is set to 'dark'...
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    } else if (prefersDarkScheme.matches) {
        // If there's no saved preference, use the system preference
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Listen for a click on the theme toggle button
    themeToggle.addEventListener('click', function() {
        // Toggle between light and dark theme
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
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
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.doc-card, .hardware-grid > div, .software-content > div, .about-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.doc-card, .hardware-grid > div, .software-content > div, .about-content > div');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Trigger initial animation check
        animateOnScroll();
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Handle video placeholder click (can be replaced with actual video implementation)
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // This is a placeholder - in a real implementation, you would open a modal or play a video
            console.log('Video placeholder clicked - implement video playback here');
        });
    }
    
    // Handle image placeholders (can be replaced with actual images)
    document.querySelectorAll('.image-placeholder').forEach(placeholder => {
        placeholder.style.cursor = 'pointer';
        placeholder.addEventListener('click', function() {
            console.log('Image placeholder clicked - implement image viewer here');
        });
    });
    
    // Tab functionality for hardware drawings
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.drawing-content');

    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Handle external links (open in new tab)
document.addEventListener('DOMContentLoaded', function() {
    const links = document.links;
    
    for (let i = 0; i < links.length; i++) {
        if (links[i].hostname !== window.location.hostname && !links[i].classList.contains('no-external')) {
            links[i].target = '_blank';
            links[i].rel = 'noopener noreferrer';
        }
    }
});
