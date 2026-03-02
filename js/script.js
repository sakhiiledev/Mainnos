// ==================== Mobile Menu Toggle ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Handle window resize - close menu and reset overflow
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// ==================== Map Toggle Function ==================== 
function toggleMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
        } else {
            mapContainer.style.display = 'none';
        }
    }
}

// ==================== Product Filtering ==================== 
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const productCards = document.querySelectorAll('.product-card');

function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedPrice = priceFilter ? priceFilter.value : '';

    productCards.forEach(card => {
        let showCard = true;

        // Filter by search term
        if (searchTerm) {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.description')?.textContent.toLowerCase() || '';
            showCard = showCard && (title.includes(searchTerm) || description.includes(searchTerm));
        }

        // Filter by category
        if (selectedCategory) {
            const category = card.getAttribute('data-category');
            showCard = showCard && (category === selectedCategory);
        }

        // Filter by price (simplified)
        if (selectedPrice && showCard) {
            const priceText = card.querySelector('.price')?.textContent.match(/\d+/)?.[0];
            const price = priceText ? parseInt(priceText) : 0;

            if (selectedPrice === '0-50') {
                showCard = price < 50;
            } else if (selectedPrice === '50-100') {
                showCard = price >= 50 && price < 100;
            } else if (selectedPrice === '100+') {
                showCard = price >= 100;
            }
        }

        // Apply visibility with animation
        if (showCard) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners for filtering
if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
}

if (priceFilter) {
    priceFilter.addEventListener('change', filterProducts);
}

// ==================== Add to Cart Functionality ==================== 
// Removed - No payment system implemented

// ==================== Contact Form Submission ==================== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = '✓ Message Sent!';
            submitButton.style.background = 'var(--success-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ==================== Smooth Scroll Behavior ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==================== Active Navigation Link ==================== 
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1); // Remove #
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
};

updateActiveNav();

// ==================== Fade In Animation on Scroll ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .product-card, .info-card').forEach(el => {
    observer.observe(el);
});

// Add CSS animation for scroll reveal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);

// ==================== Mobile Menu Responsive Style ==================== 
const updateMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        // Desktop view - ensure menu is accessible
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        // Reset body overflow
        document.body.style.overflow = '';
    }
};

window.addEventListener('resize', updateMobileMenu);
updateMobileMenu();

// ==================== Carousel Functionality (Multi-Item Nike-Style) ==================== 
class ProductCarousel {
    constructor(carouselId, prevBtnId, nextBtnId, indicatorsId) {
        this.carousel = document.getElementById(carouselId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.indicatorsContainer = document.getElementById(indicatorsId);
        this.currentPosition = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;

        if (this.carousel) {
            this.init();
        }
    }

    init() {
        this.products = Array.from(this.carousel.querySelectorAll('.product-showcase'));
        this.totalProducts = this.products.length;
        this.updateItemsPerView();
        this.createIndicators();
        this.attachEventListeners();
        this.updateCarousel();
    }

    updateItemsPerView() {
        const width = window.innerWidth;
        if (width > 1024) {
            this.itemsPerView = 3;
        } else if (width > 768) {
            this.itemsPerView = 2;
        } else {
            this.itemsPerView = 1;
        }
        this.maxPosition = Math.max(0, this.totalProducts - this.itemsPerView);
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;
        this.indicatorsContainer.innerHTML = '';
        
        const numDots = this.maxPosition + 1;
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                this.currentPosition = i;
                this.updateCarousel();
            });
            this.indicatorsContainer.appendChild(dot);
        }
    }

    attachEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Touch/Swipe support
        if (this.carousel) {
            this.carousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            });
            
            this.carousel.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.currentPosition = Math.min(this.currentPosition, this.maxPosition);
            this.createIndicators();
            this.updateCarousel();
        });
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    prev() {
        if (this.currentPosition > 0) {
            this.currentPosition--;
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentPosition < this.maxPosition) {
            this.currentPosition++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        // Calculate transform based on items per view
        const productWidth = this.products[0]?.offsetWidth || 0;
        const gap = 20;
        const offset = -(this.currentPosition * (productWidth + gap));
        
        this.carousel.style.transform = `translateX(${offset}px)`;

        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentPosition === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
        }

        // Update indicators
        if (this.indicatorsContainer) {
            const dots = this.indicatorsContainer.querySelectorAll('.progress-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentPosition);
            });
        }
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    new ProductCarousel('featuredCarousel', 'prevBtn', 'nextBtn', 'indicators');
});

// ==================== Gallery Slideshow ==================== 
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentSlideSpan = document.querySelector('.current-slide');
    
    if (!slides.length) return; // Exit if no slides found
    
    // Wrap around
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;
    
    // Remove active class from all slides and thumbnails
    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to current slide and thumbnail
    slides[currentSlideIndex].classList.add('active');
    thumbnails[currentSlideIndex].classList.add('active');
    
    // Update counter
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlideIndex + 1;
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function autoSlide() {
    slideInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    autoSlide();
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        showSlide(0);
        autoSlide();
        
        // Pause auto-slide on hover
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            autoSlide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) changeSlide(1); // Swipe left
            if (touchEndX > touchStartX + 50) changeSlide(-1); // Swipe right
        }
    }
});
