// common.js

// Function to handle adding to cart
function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                alert('Product not found!');
                return;
            }

            // Get existing cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if product is already in cart
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            // Save back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${product.name} added to cart!`);
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart.');
        });
}

// Function to update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Function to set the current year in the footer
function setCurrentYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// Function to subscribe to the newsletter (Placeholder)
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        alert(`Subscribed with ${email}!`);
        // Implement actual subscription logic here
    } else {
        alert('Please enter a valid email address.');
    }
}

// Initialize common functionalities
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    updateCartCount();
});
