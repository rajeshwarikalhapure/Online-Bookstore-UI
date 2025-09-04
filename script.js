// Sample Book Data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    category: "Fiction",
    price: 10,
    rating: 4,
    image: "https://picsum.photos/200/300?random=1",
    description: "Classic novel by F. Scott Fitzgerald."
  },
  {
    id: 2,
    title: "Atomic Habits",
    category: "Self-Help",
    price: 15,
    rating: 5,
    image: "https://picsum.photos/200/300?random=2",
    description: "A guide to building better habits."
  },

  
  {
    id: 3,
    title: "Brief History of Time",
    category: "Science",
    price: 20,
    rating: 5,
    image: "https://picsum.photos/200/300?random=3",
    description: "Stephen Hawking explores the universe."
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    category: "Fiction",
    price: 12,
    rating: 5,
    image: "https://picsum.photos/200/300?random=4",
    description: "A novel about racial injustice by Harper Lee."
  },
  {
    id: 5,
    title: "The Alchemist",
    category: "Fiction",
    price: 9,
    rating: 4,
    image: "https://picsum.photos/200/300?random=5",
    description: "A journey of self-discovery by Paulo Coelho."
  },
  {
    id: 6,
    title: "Sapiens: A Brief History of Humankind",
    category: "Science",
    price: 18,
    rating: 5,
    image: "https://picsum.photos/200/300?random=6",
    description: "Yuval Noah Harari explores human history."
  },
  {
    id: 7,
    title: "The Power of Now",
    category: "Self-Help",
    price: 14,
    rating: 4,
    image: "https://picsum.photos/200/300?random=7",
    description: "Spiritual guide to living in the present moment."
  },
  {
    id: 8,
    title: "Educated",
    category: "Non-Fiction",
    price: 16,
    rating: 5,
    image: "https://picsum.photos/200/300?random=8",
    description: "Memoir by Tara Westover about education and resilience."
  },
  {
    id: 9,
    title: "1984",
    category: "Fiction",
    price: 11,
    rating: 5,
    image: "https://picsum.photos/200/300?random=9",
    description: "Dystopian novel by George Orwell."
  },
  {
    id: 10,
    title: "The Lean Startup",
    category: "Business",
    price: 19,
    rating: 4,
    image: "https://picsum.photos/200/300?random=10",
    description: "Eric Ries on innovative startup methodology."
  },
  {
    id: 11,
    title: "Thinking, Fast and Slow",
    category: "Science",
    price: 17,
    rating: 5,
    image: "https://picsum.photos/200/300?random=11",
    description: "Daniel Kahneman explores decision-making psychology."
  },
  {
    id: 12,
    title: "The Subtle Art of Not Giving a F*ck",
    category: "Self-Help",
    price: 13,
    rating: 4,
    image: "https://picsum.photos/200/300?random=12",
    description: "Mark Manson challenges traditional self-help advice."
  },
  {
    id: 13,
    title: "Rich Dad Poor Dad",
    category: "Business",
    price: 14,
    rating: 4,
    image: "https://picsum.photos/200/300?random=13",
    description: "Robert Kiyosaki on financial education and wealth building."
  }
];

const bookList = document.getElementById("book-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Render books
function renderBooks(list = books) {
  bookList.innerHTML = "";
  list.forEach(book => {
    bookList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${book.image}" class="card-img-top" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Category: ${book.category}</p>
            <p class="card-text">Price: $${book.price}</p>
            <p class="card-text">Rating: ${"⭐".repeat(book.rating)}</p>
            <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}
renderBooks();

// Add to cart
function addToCart(id) {
  const book = books.find(b => b.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  updateCart();
}

// Update cart UI
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.title} (x${item.qty})
        <div>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, -1)">-</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">x</button>
        </div>
      </li>
    `;
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function changeQty(id, amount) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += amount;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

// Filters + Search + Sort
document.getElementById("category-filter").addEventListener("change", e => {
  const value = e.target.value;
  if (value === "all") renderBooks();
  else renderBooks(books.filter(b => b.category === value));
});

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  renderBooks(books.filter(b => b.title.toLowerCase().includes(value)));
});

document.getElementById("sort-by").addEventListener("change", e => {
  let sorted = [...books];
  if (e.target.value === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (e.target.value === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (e.target.value === "rating") sorted.sort((a, b) => b.rating - a.rating);
  renderBooks(sorted);
});
