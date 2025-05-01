// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const themeToggle = document.createElement('div');
const scrollTop = document.createElement('div');
const form = document.getElementById('contactForm');

// Initialize the website
function init() {
    // Add animation classes to elements
    document.querySelector('.home-section .profile-image').classList.add('fade-in');
    document.querySelector('.home-section .intro-text h1').classList.add('fade-in', 'delay-1');
    document.querySelector('.home-section .intro-text h2').classList.add('fade-in', 'delay-2');
    document.querySelector('.home-section .intro-text p').classList.add('fade-in', 'delay-2');
    document.querySelector('.home-section .cta-buttons').classList.add('fade-in', 'delay-3');
    document.querySelector('.home-section .social-icons').classList.add('fade-in', 'delay-3');
    
    // Create and append theme toggle button
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    // Create and append scroll to top button
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTop);
    
    // Check if there's a stored theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add event listeners
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    burger.addEventListener('click', toggleNav);
    
    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleNav();
            }
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        headerShrink();
        showScrollButton();
        highlightActiveSection();
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Scroll to top button
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Project filter (if on projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', filterProjects);
        });
    }
}

// Toggle mobile navigation
function toggleNav() {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
    document.body.classList.toggle('nav-open');
}

// Shrink header on scroll
function headerShrink() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Show or hide scroll to top button
function showScrollButton() {
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Update the icon based on the current theme
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// Highlight active section in navigation
function highlightActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.querySelector('a').classList.remove('active');
        if (link.querySelector('a').getAttribute('href') === `#${currentSection}`) {
            link.querySelector('a').classList.add('active');
        }
    });
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Display loading animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;
    
    // Simulate form submission (replace with actual form submission code)
    setTimeout(() => {
        // Get form data
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // Log form data (for demonstration purposes)
        console.log('Form submitted with data:', formValues);
        
        // Reset the form
        form.reset();
        
        // Show success message
        submitBtn.innerHTML = 'Message Sent!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
}

// Filter projects (for project page)
function filterProjects(e) {
    const filterValue = e.target.getAttribute('data-filter');
    const projectItems = document.querySelectorAll('.project-card');
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter projects based on category
    projectItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 100);
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

// Lazy load images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Typewriter effect for home page
function initTypewriter() {
    const element = document.querySelector('.typewriter-text');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const speed = 100; // typing speed in milliseconds
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Skills animation on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress');
    
    if ('IntersectionObserver' in window) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            // Store the target width as a data attribute
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.setAttribute('data-width', width);
            
            skillsObserver.observe(bar);
        });
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    lazyLoadImages();
    initTypewriter();
    animateSkills();
});