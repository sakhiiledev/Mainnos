// ==================== Mobile Menu Toggle ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.style.display = 'none';
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
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
    
    if (window.innerWidth <= 768) {
        if (navLinks && !navLinks.style.display) {
            navLinks.style.display = 'none';
        }
    } else {
        if (navLinks) {
            navLinks.style.display = 'flex';
        }
    }
};

window.addEventListener('resize', updateMobileMenu);
updateMobileMenu();
