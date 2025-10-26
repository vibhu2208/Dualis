// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Prevent automatic scrolling to anchors
    if (window.location.hash) {
        window.location.hash = '';
    }

    initCarousel();
    initLightbox();
    initContactForm();
    initScrollEffects();
    initFloatingCTA();
});

// GSAP Animations - REMOVED ALL ANIMATIONS
function initGSAPAnimations() {
    // All animations removed as requested
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // No animations applied to any elements
}

// Scroll effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    const logoText = document.querySelector('.logo-text');
    const logoImg = document.querySelector('.logo-img');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';

            // Change logo text and image for better visibility on white background
            if (logoText) {
                logoText.style.color = '#1a1a1a';
                logoText.style.textShadow = 'none';
            }
            if (logoImg) {
                logoImg.style.filter = 'brightness(1) contrast(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))';
            }
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';

            // Change logo text and image back for transparent background
            if (logoText) {
                logoText.style.color = '#ffffff';
                logoText.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            }
            if (logoImg) {
                logoImg.style.filter = 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))';
            }
        }
    });
}
function initCarousel() {
    const slides = document.querySelectorAll('.amenity-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Removed auto-play carousel animation

    // Show first slide
    showSlide(0);
}

// Global function for carousel buttons (called from HTML)
function changeSlide(direction) {
    const slides = document.querySelectorAll('.amenity-slide');
    let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');

    // Removed GSAP animation
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });
        }
    });
    
    function openLightbox(element) {
        const img = element.querySelector('img');
        if (img) {
            currentImageIndex = Array.from(galleryItems).indexOf(element);
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function changeLightboxSlide(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }
    
    // Event listeners
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this);
        });
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => changeLightboxSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeLightboxSlide(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeLightboxSlide(-1);
            if (e.key === 'ArrowRight') changeLightboxSlide(1);
        }
    });
    
    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

// Global functions for lightbox (called from HTML)
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = Array.from(galleryItems).indexOf(element);
    const img = element.querySelector('img');
    
    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Store current index for navigation
        lightbox.setAttribute('data-current-index', currentImageIndex);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightboxSlide(direction) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIndex = parseInt(lightbox.getAttribute('data-current-index'));
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    
    const nextItem = galleryItems[currentIndex];
    const img = nextItem.querySelector('img');
    
    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.setAttribute('data-current-index', currentIndex);
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^\+?[\d\s-()]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! Our team will contact you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Scroll effects - REMOVED ALL SCROLL ANIMATIONS
function initScrollEffects() {
    // All scroll effects and animations removed as requested
    // No navbar background changes on scroll
    // No parallax effects
    // No scroll indicators
    // No logo color changes
    // No opacity changes
}

// Floating CTA functionality - ALWAYS VISIBLE
function initFloatingCTA() {
    const floatingCTA = document.querySelector('.floating-cta');

    if (floatingCTA) {
        // Floating CTA is always visible (no scroll animations)
        floatingCTA.style.opacity = '1';
        floatingCTA.style.transform = 'translateY(0)';

        // Smooth scroll to contact form
        floatingCTA.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'auto' // No smooth scrolling
                });
            }
        });
    }
}

// Utility function for smooth scrolling - REMOVED

// Intersection Observer for animations - REMOVED

// Performance optimization - lazy loading images - REMOVED

// Add CSS for mobile menu - REMOVED
