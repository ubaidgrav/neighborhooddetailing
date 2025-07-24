/**
 * Neighborhood Detailing - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initFormValidation();
    initAnimatedCounters();
    initScrollAnimations();
    initTestimonialCarousel();
    initImageLazyLoading();
    initHeaderScroll();
});

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Smooth Scrolling for Internal Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // In a real implementation, you would send the data to a server
                console.log('Form submitted successfully');
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const location = document.getElementById('location');
    
    let isValid = true;
    
    // Validate first name
    if (!firstName.value.trim()) {
        showError('firstNameError', 'First name is required');
        firstName.classList.add('error');
        isValid = false;
    }
    
    // Validate last name
    if (!lastName.value.trim()) {
        showError('lastNameError', 'Last name is required');
        lastName.classList.add('error');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError('emailError', 'Email is required');
        email.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        email.classList.add('error');
        isValid = false;
    }
    
    // Validate phone
    if (!phone.value.trim()) {
        showError('phoneError', 'Phone number is required');
        phone.classList.add('error');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError('phoneError', 'Please enter a valid phone number');
        phone.classList.add('error');
        isValid = false;
    }
    
    // Validate service selection
    if (!service.value) {
        showError('serviceError', 'Please select a service');
        service.classList.add('error');
        isValid = false;
    }
    
    // Validate location
    if (!location.value.trim()) {
        showError('locationError', 'Service location is required');
        location.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(fieldName + 'Error');
    
    // Remove error class
    field.classList.remove('error');
    
    // Clear error message
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (!fieldValue) {
                showError(fieldName + 'Error', `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`);
                field.classList.add('error');
                return false;
            }
            break;
            
        case 'email':
            if (!fieldValue) {
                showError('emailError', 'Email is required');
                field.classList.add('error');
                return false;
            } else if (!isValidEmail(fieldValue)) {
                showError('emailError', 'Please enter a valid email address');
                field.classList.add('error');
                return false;
            }
            break;
            
        case 'phone':
            if (!fieldValue) {
                showError('phoneError', 'Phone number is required');
                field.classList.add('error');
                return false;
            } else if (!isValidPhone(fieldValue)) {
                showError('phoneError', 'Please enter a valid phone number');
                field.classList.add('error');
                return false;
            }
            break;
            
        case 'service':
            if (!fieldValue) {
                showError('serviceError', 'Please select a service');
                field.classList.add('error');
                return false;
            }
            break;
            
        case 'location':
            if (!fieldValue) {
                showError('locationError', 'Service location is required');
                field.classList.add('error');
                return false;
            }
            break;
    }
    
    return true;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.error');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const contactForm = document.getElementById('contactForm');
    
    if (successMessage && contactForm) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
        }, 5000);
    }
}

/**
 * Animated Counters
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Add CSS for animations
    if (!document.querySelector('#aos-styles')) {
        const style = document.createElement('style');
        style.id = 'aos-styles';
        style.textContent = `
            [data-aos] {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            [data-aos="fade-up"].aos-animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            [data-aos="fade-right"] {
                transform: translateX(-30px);
            }
            
            [data-aos="fade-right"].aos-animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            [data-aos="fade-left"] {
                transform: translateX(30px);
            }
            
            [data-aos="fade-left"].aos-animate {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const carousel = document.querySelector('.testimonials-carousel');
    
    if (testimonials.length > 1) {
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.classList.remove('active');
                testimonial.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            testimonials[currentIndex].classList.remove('active');
            testimonials[currentIndex].style.display = 'none';
            
            currentIndex = (currentIndex + 1) % totalTestimonials;
            
            testimonials[currentIndex].style.display = 'block';
            setTimeout(() => {
                testimonials[currentIndex].classList.add('active');
            }, 50);
        }, 5000); // Change every 5 seconds
    }
}

/**
 * Lazy Loading for Images
 */
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Header Scroll Effects
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS for scrolled header
    if (!document.querySelector('#header-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'header-scroll-styles';
        style.textContent = `
            .header {
                transition: all 0.3s ease;
            }
            
            .header.scrolled {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Google Maps Initialization
 * This function will be called by the Google Maps API
 */
window.initMap = function() {
    // Check if we're on the contact page
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Coordinates for Newark, NJ area
    const center = { lat: 40.7271815, lng: -74.2949945 };
    
    // Map options
    const mapOptions = {
        zoom: 12,
        center: center,
        styles: [
            {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ color: "#f0f4f8" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#3b82f6" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e5e7eb" }]
            }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
    };
    
    // Create map
    const map = new google.maps.Map(mapElement, mapOptions);
    
    // Custom marker icon
    const markerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="4"/>
                <path d="M15 18L18 21L25 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `),
        scaledSize: new google.maps.Size(40, 40)
    };
    
    // Add marker
    const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: "Neighborhood Detailing Service Area",
        icon: markerIcon,
        animation: google.maps.Animation.DROP
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Poppins', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #3b82f6;">Neighborhood Detailing</h3>
                <p style="margin: 0 0 5px 0; color: #64748b;">Professional Auto Detailing Services</p>
                <p style="margin: 0 0 10px 0; color: #64748b;">Mobile service - We come to you!</p>
                <a href="tel:+19739194516" style="color: #3b82f6; text-decoration: none; font-weight: 500;">
                    📞 (973) 919-4516
                </a>
            </div>
        `
    });
    
    // Show info window on marker click
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Service area circle
    const serviceArea = new google.maps.Circle({
        strokeColor: "#3b82f6",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#3b82f6",
        fillOpacity: 0.1,
        map: map,
        center: center,
        radius: 24140 // 15 miles in meters
    });
    
    // Add service area info
    const areaInfoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Poppins', sans-serif;">
                <h4 style="margin: 0 0 5px 0; color: #3b82f6;">Service Area</h4>
                <p style="margin: 0; color: #64748b;">We serve Newark and surrounding areas within 15 miles</p>
            </div>
        `,
        position: { lat: center.lat + 0.1, lng: center.lng }
    });
    
    // Show area info on circle click
    serviceArea.addListener('click', function(event) {
        areaInfoWindow.setPosition(event.latLng);
        areaInfoWindow.open(map);
    });
};

/**
 * Utility Functions
 */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Add phone number formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    });
});

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

/**
 * Performance Monitoring
 */
window.addEventListener('load', function() {
    // Log page load time for performance monitoring
    const loadTime = performance.now();
    console.log('Page loaded in:', Math.round(loadTime), 'ms');
});

/**
 * Accessibility Enhancements
 */
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus management for modal-like elements
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * Service Worker Registration (for offline functionality)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker if needed for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}
