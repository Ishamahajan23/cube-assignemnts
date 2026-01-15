const benefits = [
    "1 Bottle Shipped Monthly",
    "Free Sampler For Original, Lily And Rose Fragrances",
    "50% OFF Shipping",
    "Pause Or Cancel Anytime After 3 Months Minimum",
    "28 Day Money Back Guarantee*"
];

const benefitsContainer = document.querySelector('#benefits');

benefits.forEach(benefit => {
    const benefitItem = document.createElement('div');
    benefitItem.classList.add('benefit-item');

    const icon = document.createElement('img');
    icon.src = './assets/sealCheck.svg';
    icon.alt = 'Seal Check Icon';

    const text = document.createElement('p');
    let formattedText = benefit;
    
    // Make specific words bold
    if(benefit.includes('Free')){
        formattedText = formattedText.replace('Free', '<span style="color: #016630; font-weight: bold;">Free</span>');
    }
    if(benefit.includes('50% OFF Shipping')){
        formattedText = formattedText.replace('50% OFF Shipping', '<span style="color: #016630; font-weight: bold;">50% OFF Shipping</span>');
    }
    
    text.innerHTML = formattedText;

        benefitItem.appendChild(icon);
        benefitItem.appendChild(text);
        benefitsContainer.appendChild(benefitItem);
    });


// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// ===== GALLERY FUNCTIONALITY =====
class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [
            './assets/perfume1.svg',
            './assets/perfume2.svg',
            './assets/perfume3.svg'
        ];
        this.init();
    }
    
    init() {
        this.createGalleryHTML();
        this.bindEvents();
    }
    
    createGalleryHTML() {
        const galleryContainer = document.querySelector('.s1');
        if (!galleryContainer) return;
        
        galleryContainer.innerHTML = `
            <div class="gallery-container">
                <div class="main-image-container">
                    
                    <img src="${this.images[0]}" alt="perfume image" class="main-image">
                </div>
                <div class="thumbnails">
                <button class="gallery-arrow prev" aria-label="Previous image"><img src="./assets/prev.svg" alt="Prev"/></button>
                <div class="gallery-dots">
                    ${this.images.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('')}
                </div>
                 <button class="gallery-arrow next" aria-label="Next image"><img src="./assets/next.svg" alt="Next"/></button>

                </div>
             
                 <img src="./assets/image2.svg" alt="all perfumes">
                <img src="./assets/image2.svg" alt="all perfumes">              
            </div>
        `;
    }
    
    bindEvents() {
        // Arrow buttons
        document.querySelector('.prev')?.addEventListener('click', () => this.prevImage());
        document.querySelector('.next')?.addEventListener('click', () => this.nextImage());
        
        // Dots
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.goToImage(parseInt(e.target.dataset.index));
            });
        });
        
        // Thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                this.goToImage(parseInt(e.target.dataset.index));
            });
        });
    }
    
    prevImage() {
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateImage();
    }
    
    nextImage() {
        this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.updateImage();
    }
    
    goToImage(index) {
        this.currentIndex = index;
        this.updateImage();
    }
    
    updateImage() {
        const mainImage = document.querySelector('.main-image');
        const dots = document.querySelectorAll('.dot');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (mainImage) mainImage.src = this.images[this.currentIndex];
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// ===== SUBSCRIPTION FUNCTIONALITY =====
class SubscriptionManager {
    constructor() {
        this.selectedFragrance = '';
        this.selectedPurchaseType = '';
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateAddToCart();
    }
    
    bindEvents() {
        // Purchase type radio buttons
        document.querySelectorAll('input[name="purchase-type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedPurchaseType = e.target.value;
                this.toggleSubscriptionDetails(e.target.value);
                this.updateAddToCart();
            });
        });
        
        // Fragrance radio buttons
        document.querySelectorAll('input[name="fragrance"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedFragrance = e.target.value;
                this.updateAddToCart();
            });
        });
    }
    
    toggleSubscriptionDetails(type) {
        const singleSub = document.querySelector('#single-subscription');
        const doubleSub = document.querySelector('#double-subscription');
        
        if (type === 'single') {
            singleSub?.classList.add('expanded');
            doubleSub?.classList.remove('expanded');
        } else if (type === 'double') {
            doubleSub?.classList.add('expanded');
            singleSub?.classList.remove('expanded');
        }
    }
    
    updateAddToCart() {
        const addToCartBtn = document.querySelector('#add-to-cart');
        if (!addToCartBtn) return;
        
        // 9 different variations based on fragrance and purchase type
        const variations = {
            'original-single': 'https://example.com/cart/original-single',
            'original-double': 'https://example.com/cart/original-double',
            'original-bundle': 'https://example.com/cart/original-bundle',
            'lily-single': 'https://example.com/cart/lily-single',
            'lily-double': 'https://example.com/cart/lily-double',
            'lily-bundle': 'https://example.com/cart/lily-bundle',
            'rose-single': 'https://example.com/cart/rose-single',
            'rose-double': 'https://example.com/cart/rose-double',
            'rose-bundle': 'https://example.com/cart/rose-bundle'
        };
        
        const key = `${this.selectedFragrance}-${this.selectedPurchaseType}`;
        const url = variations[key] || 'https://example.com/cart/default';
        
        addToCartBtn.href = url;
        addToCartBtn.textContent = `Add to Cart - ${this.selectedFragrance} ${this.selectedPurchaseType}`.replace(/^Add to Cart -  /, 'Add to Cart');
    }
}

// ===== COUNT-UP ANIMATION =====
class CountUpAnimator {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeSection();
        this.observeTable();
    }
    
    observeSection() {
        const percentageSection = document.querySelector('.poster-number');
        if (!percentageSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCountUp();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(percentageSection);
    }
    
    observeTable() {
        const tableSection = document.querySelector('.comparison-table');
        if (!tableSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startTableCountUp();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(tableSection);
    }
    
    startCountUp() {
        const numbers = document.querySelectorAll('.number');
        
        numbers.forEach(numberEl => {
            const finalValue = numberEl.textContent;
            const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            
            if (numericValue) {
                this.animateNumber(numberEl, numericValue, finalValue);
            }
        });
    }
    
    startTableCountUp() {
        const percentages = document.querySelectorAll('.percentage[data-percentage]');
        
        percentages.forEach(percentageEl => {
            const targetValue = parseInt(percentageEl.dataset.percentage);
            this.animatePercentage(percentageEl, targetValue);
        });
    }
    
    animateNumber(element, target, originalText) {
        let current = 0;
        const increment = target / 50; // Animate over 50 frames
        const suffix = originalText.replace(/[0-9]/g, '');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }
    
    animatePercentage(element, target) {
        let current = 0;
        const increment = target / 60; // Animate over 60 frames for smoother effect
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 25);
    }
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    new Gallery();
    new SubscriptionManager();
    new CountUpAnimator();
});