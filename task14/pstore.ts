
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

let productList: Product[] = [];
let shoppingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then((data: { products: Product[] }) => {
    productList = data.products;
    displayProducts(productList);
  });


function displayProducts(products: Product[]): void {
  const productsSection = document.getElementById('products-section') as HTMLElement;
  productsSection.innerHTML = '';
  products.forEach((product) => {
    const productHTML = `
      <div class="product">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        <button class="show-details" data-id="${product.id}">Show Details</button>
      </div>
      <div class="product-details" id="product-${product.id}">
        <h3>${product.title}</h3>
        <p>Description: ${product.description}</p>
        <p>Price: $${product.price}</p>
      </div>
    `;
    productsSection.innerHTML += productHTML;
  });
}

document.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('show-details')) {
    const productId = target.dataset.id!;
    const productDetails = document.getElementById(`product-${productId}`) as HTMLElement;
    productDetails.classList.toggle('show');
  }
});

document.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('add-to-cart')) {
    const productId = target.dataset.id!;
    const product = productList.find((p) => p.id === parseInt(productId));
    if (product) {
      const existingItem = shoppingCart.find((i) => i.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        shoppingCart.push({ id: product.id, name: product.title, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(shoppingCart));
      displayCart();
    }
  }
});

function displayCart(): void {
  const cartList = document.getElementById('cart-list') as HTMLElement;
  cartList.innerHTML = '';
  shoppingCart.forEach((item) => {
    const cartItemHTML = `
      <li class="cart-item">
        <span>${item.name} x ${item.quantity}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="decrease" data-id="${item.id}">-</button>
        <button class="remove" data-id="${item.id}">Remove</button>
      </li>
    `;
    cartList.innerHTML += cartItemHTML;
  });
}

document.getElementById('cart-list')!.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  const itemId = parseInt(target.dataset.id!);
  const item = shoppingCart.find((i) => i.id === itemId);
  if (item) {
    if (target.classList.contains('increase')) {
      item.quantity++;
    } else if (target.classList.contains('decrease')) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        shoppingCart = shoppingCart.filter((i) => i.id !== itemId);
      }
    } else if (target.classList.contains('remove')) {
      shoppingCart = shoppingCart.filter((i) => i.id !== itemId);
    }
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    displayCart();
  }
});

// Search
document.getElementById('search-input')!.addEventListener('input', (e: Event) => {
  const target = e.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const filteredProducts = productList.filter((p) => p.title.toLowerCase().includes(searchTerm));
  displayProducts(filteredProducts);
});

// Filter
document.getElementById('filter-select')!.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const filterType = target.value;
  let filteredProducts = productList;
  if (filterType !== 'all') {
    filteredProducts = productList.filter((p) => p.category === filterType);
  }
  displayProducts(filteredProducts);
});

// Sort
document.getElementById('sort-button')!.addEventListener('click', () => {
  productList.sort((a, b) => a.price - b.price);
  displayProducts(productList);
});
