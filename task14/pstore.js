
var productList = [];
var shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]');

fetch('https://dummyjson.com/products')
    .then(function (response) { return response.json(); })
    .then(function (data) {
        productList = data.products;
        displayProducts(productList);
    });

function displayProducts(products) {
    var productsSection = document.getElementById('products-section');
    productsSection.innerHTML = '';
    products.forEach(function (product) {
        var productHTML = "\n      <div class=\"product\">\n        <img src=\"".concat(product.thumbnail, "\" alt=\"").concat(product.title, "\">\n        <h3>").concat(product.title, "</h3>\n        <p>Price: $").concat(product.price, "</p>\n        <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n        <button class=\"show-details\" data-id=\"").concat(product.id, "\">Show Details</button>\n      </div>\n      <div class=\"product-details\" id=\"product-").concat(product.id, "\">\n        <h3>").concat(product.title, "</h3>\n        <p>Description: ").concat(product.description, "</p>\n        <p>Price: $").concat(product.price, "</p>\n      </div>\n    ");
        productsSection.innerHTML += productHTML;
    });
}

document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('show-details')) {
        var productId = target.dataset.id;
        var productDetails = document.getElementById("product-".concat(productId));
        productDetails.classList.toggle('show');
    }
});

document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('add-to-cart')) {
        var productId_1 = target.dataset.id;
        var product_1 = productList.find(function (p) { return p.id === parseInt(productId_1); });
        if (product_1) {
            var existingItem = shoppingCart.find(function (i) { return i.id === product_1.id; });
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                shoppingCart.push({ id: product_1.id, name: product_1.title, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(shoppingCart));
            displayCart();
        }
    }
});

function displayCart() {
    var cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    shoppingCart.forEach(function (item) {
        var cartItemHTML = "\n      <li class=\"cart-item\">\n        <span>".concat(item.name, " x ").concat(item.quantity, "</span>\n        <button class=\"increase\" data-id=\"").concat(item.id, "\">+</button>\n        <button class=\"decrease\" data-id=\"").concat(item.id, "\">-</button>\n        <button class=\"remove\" data-id=\"").concat(item.id, "\">Remove</button>\n      </li>\n    ");
        cartList.innerHTML += cartItemHTML;
    });
}

document.getElementById('cart-list').addEventListener('click', function (e) {
    var target = e.target;
    var itemId = parseInt(target.dataset.id);
    var item = shoppingCart.find(function (i) { return i.id === itemId; });
    if (item) {
        if (target.classList.contains('increase')) {
            item.quantity++;
        }
        else if (target.classList.contains('decrease')) {
            if (item.quantity > 1) {
                item.quantity--;
            }
            else {
                shoppingCart = shoppingCart.filter(function (i) { return i.id !== itemId; });
            }
        }
        else if (target.classList.contains('remove')) {
            shoppingCart = shoppingCart.filter(function (i) { return i.id !== itemId; });
        }
        localStorage.setItem('cart', JSON.stringify(shoppingCart));
        displayCart();
    }
});
// Search
document.getElementById('search-input').addEventListener('input', function (e) {
    var target = e.target;
    var searchTerm = target.value.toLowerCase();
    var filteredProducts = productList.filter(function (p) { return p.title.toLowerCase().includes(searchTerm); });
    displayProducts(filteredProducts);
});
// Filter
document.getElementById('filter-select').addEventListener('change', function (e) {
    var target = e.target;
    var filterType = target.value;
    var filteredProducts = productList;
    if (filterType !== 'all') {
        filteredProducts = productList.filter(function (p) { return p.category === filterType; });
    }
    displayProducts(filteredProducts);
});
// Sort
document.getElementById('sort-button').addEventListener('click', function () {
    productList.sort(function (a, b) { return a.price - b.price; });
    displayProducts(productList);
});
