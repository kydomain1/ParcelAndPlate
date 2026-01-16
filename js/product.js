// Load product content
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
});

function loadProduct() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        document.getElementById('productContainer').innerHTML = '<p>Product not found.</p>';
        return;
    }

    // Find product
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('productContainer').innerHTML = '<p>Product not found.</p>';
        return;
    }

    // Get category name
    const categoryMap = {
        'clothing': 'Clothing & Accessories',
        'health': 'Health & Beauty',
        'home-garden': 'Home & Garden',
        'travel': 'Travel & Accommodation',
        'finance': 'Finance & Insurance',
        'food': 'Food & Beverage'
    };

    // Display product
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image-large" onerror="this.src='https://via.placeholder.com/800x800/667eea/ffffff?text=Product'">
        <div class="product-details">
            <span class="product-category">${categoryMap[product.category] || product.category}</span>
            <h1>${product.name}</h1>
            <p class="product-price">${product.price}</p>
            <p class="product-description">
                ${getProductDescription(product)}
            </p>
            <ul class="product-features">
                ${getProductFeatures(product).map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `;

    // Update page title
    document.title = `${product.name} - ParcelAndPlate`;
}

function getProductDescription(product) {
    const descriptions = {
        'clothing': 'High-quality, sustainable fashion piece designed for comfort and style. Made with eco-friendly materials and ethical production practices.',
        'health': 'Premium skincare product formulated with natural ingredients. Gentle on skin while delivering visible results.',
        'home-garden': 'Beautiful and functional home accessory that enhances your living space. Designed with modern aesthetics in mind.',
        'travel': 'Essential travel companion designed for convenience and durability. Perfect for your next adventure.',
        'finance': 'Comprehensive financial resource to help you make informed decisions and achieve your financial goals.',
        'food': 'Premium quality food product sourced from the finest ingredients. Perfect for enhancing your culinary experience.'
    };
    return descriptions[product.category] || 'A quality product that meets your needs and exceeds expectations.';
}

function getProductFeatures(product) {
    const features = {
        'clothing': ['Sustainable materials', 'Ethical production', 'Comfortable fit', 'Durable construction'],
        'health': ['Natural ingredients', 'Dermatologist tested', 'Cruelty-free', 'Suitable for all skin types'],
        'home-garden': ['Modern design', 'Easy to maintain', 'Durable materials', 'Versatile use'],
        'travel': ['Lightweight', 'Durable construction', 'Multiple compartments', 'Travel-friendly size'],
        'finance': ['Expert insights', 'Easy to understand', 'Practical examples', 'Comprehensive coverage'],
        'food': ['Premium quality', 'Fresh ingredients', 'Sustainable sourcing', 'Delicious flavor']
    };
    return features[product.category] || ['High quality', 'Great value', 'Customer favorite', 'Best seller'];
}

