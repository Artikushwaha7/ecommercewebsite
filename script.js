// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/51hZ+Q+0+QL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.5,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        image: "https://m.media-amazon.com/images/I/71KBQ1XvWJL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.2,
        category: "Electronics"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 39.99,
        image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
        rating: 4.7,
        category: "Computers"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.3,
        category: "Electronics"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 29.99,
        image: "https://m.media-amazon.com/images/I/71i6u5+3+tL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.1,
        category: "Computers"
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 89.99,
        image: "https://m.media-amazon.com/images/I/71WwzLg6+aL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.6,
        category: "Computers"
    }
];

// Sample deals data
const deals = [
    {
        id: 7,
        name: "Smart Home Bundle",
        price: 199.99,
        originalPrice: 299.99,
        image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.8,
        discount: 33
    },
    {
        id: 8,
        name: "Gaming Headset",
        price: 59.99,
        originalPrice: 89.99,
        image: "https://m.media-amazon.com/images/I/71KBQ1XvWJL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.4,
        discount: 25
    }
];

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="rating">${stars}</div>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    
    return card;
}

// Function to create deal cards
function createDealCard(deal) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(Math.floor(deal.rating)) + '☆'.repeat(5 - Math.floor(deal.rating));
    
    card.innerHTML = `
        <img src="${deal.image}" alt="${deal.name}">
        <h3>${deal.name}</h3>
        <div class="rating">${stars}</div>
        <div class="price">
            <span class="original-price">$${deal.originalPrice.toFixed(2)}</span>
            <span class="current-price">$${deal.price.toFixed(2)}</span>
            <span class="discount">-${deal.discount}%</span>
        </div>
        <button onclick="addToCart(${deal.id})">Add to Cart</button>
    `;
    
    return card;
}

// Function to display products
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

// Function to display deals
function displayDeals() {
    const dealsGrid = document.querySelector('.deals-grid');
    deals.forEach(deal => {
        const card = createDealCard(deal);
        dealsGrid.appendChild(card);
    });
}

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = [...products, ...deals].find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart span');
    if (cartCount) {
        cartCount.textContent = `Cart (${cart.length})`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found matching your search.</p>';
    } else {
        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }
}

// Category click functionality
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h3').textContent;
        filterProductsByCategory(category);
    });
});

function filterProductsByCategory(category) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => 
        product.category === category
    );
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `<p>No products found in ${category} category.</p>`;
    } else {
        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayDeals();
    updateCartCount();
    
    // Set up carousel auto-rotation
    setInterval(nextSlide, 5000);
    
    // Add event listeners for carousel buttons
    document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);
    
    // Add click handlers for navigation items
    document.getElementById('signIn').addEventListener('click', () => {
        showNotification('Sign in functionality coming soon!');
    });
    
    document.getElementById('returns').addEventListener('click', () => {
        showNotification('Returns & Orders page coming soon!');
    });
    
    document.getElementById('cart').addEventListener('click', () => {
        showNotification(`Cart contains ${cart.length} items`);
    });
    
    // Add click handlers for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', () => {
            showNotification(`${link.textContent} page coming soon!`);
        });
    });
}); 