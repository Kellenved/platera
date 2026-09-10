const foods = [
    {
        id: 1,
        name: "Pizza Margherita",
        category: "pizza",
        description: "Fresh tomatoes, mozzarella and basil.",
        price: 12.99,
        image: "./assets/images/pizza.jpg"
    },

    {
        id: 2,
        name: "Classic Burger",
        category: "burgers",
        description: "Juicy beef patty with lettuce, tomato and cheese.",
        price: 10.99,
        image: "./assets/images/burger.jpg"
    },

    {
        id: 3,
        name: "Carbonara",
        category: "pasta",
        description: "Creamy pasta with pancetta, parmesan and black pepper.",
        price: 13.99,
        image: "./assets/images/pasta.jpg"
    },

    {
        id: 4,
        name: "Strawberry Lemonade",
        category: "drinks",
        description: "Refreshing homemade lemonade with fresh strawberries.",
        price: 4.99,
        image: "./assets/images/drink.jpg"
    }
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutButton = document.querySelector(".checkout-button");
const checkoutPanel = document.querySelector(".checkout-panel");
const checkoutClose = document.querySelector(".checkout-close");
const checkoutSummary = document.querySelector(".checkout-summary");
const checkoutForm = document.querySelector(".checkout-form");
const orderMessage = document.querySelector(".order-message");

const foodGrid = document.querySelector(".food-grid");
const cartButton = document.querySelector(".cart-button");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

const cartPanel = document.querySelector(".cart-panel");

function renderFoods(foodList){

    foodGrid.innerHTML = "";

    if(foodList.length === 0){
        foodGrid.innerHTML = `<p>No dishes found.</p>`;
        return;
    }

    foodList.forEach((food) => {
        const card = document.createElement("article");

        card.classList.add("food-card");

        card.innerHTML = `
            <img
                src="${food.image}"
                alt="${food.name}"
            >
            
            <div class="food-card-content">
                <p class="food-category">${food.category}</p>

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-card-footer">
                    <data value="${food.price}">€${food.price}</data>

                    <button type="button" data-food-id="${food.id}">
                        Add to cart
                    </button>
                </div>
            </div>
        `;

        foodGrid.appendChild(card);
    });
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

renderFoods(foods);
updateCartCount();
renderCart();

function renderCheckout() {
    checkoutSummary.innerHTML = "";

    cart.forEach((item) => {
        const summaryItem = document.createElement("p");

        summaryItem.textContent =
            `${item.name} × ${item.quantity} — €${(item.price * item.quantity).toFixed(2)}`;

        checkoutSummary.appendChild(summaryItem);
    });

    const total = getCartTotal();

    const totalElement = document.createElement("strong");

    totalElement.textContent = `Total: €${total.toFixed(2)}`;

    checkoutSummary.appendChild(totalElement);
}

function getCartTotal() {
    return cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
};

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>€${item.price.toFixed(2)}</p>

            <div class="cart-item-controls">
                <button
                    type="button"
                    data-cart-action="decrease"
                    data-cart-id="${item.id}"
                >
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    data-cart-action="increase"
                    data-cart-id="${item.id}"
                >
                    +
                </button>

                <button
                    type="button"
                    data-cart-action="remove"
                    data-cart-id="${item.id}"
                >
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = getCartTotal();

    cartTotal.textContent = `Total: €${total.toFixed(2)}`;
}

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        return;
    }

    renderCheckout();

    checkoutPanel.classList.remove("hidden");
    cartPanel.classList.add("hidden");
});

checkoutClose.addEventListener("click", () => {
    checkoutPanel.classList.add("hidden");
});

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    cart.length = 0;

    saveCart();
    updateCartCount();
    renderCart();

    checkoutForm.reset();

    orderMessage.textContent = "Order placed successfully!";

    setTimeout(() => {
        checkoutPanel.classList.add("hidden");
        orderMessage.textContent = "";
    }, 2000);
});

cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");

    if (!button) {
        return;
    }

    const itemId = Number(button.dataset.cartId);
    const action = button.dataset.cartAction;

    const cartItem = cart.find((item) => {
        return item.id === itemId;
    });

    if (!cartItem) {
        return;
    }

    if (action === "increase") {
        cartItem.quantity++;
    }

    if (action === "decrease") {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            const itemIndex = cart.findIndex((item) => {
                return item.id === itemId;
        });

        cart.splice(itemIndex, 1);
    }
}

    if (action === "remove") {
        const itemIndex = cart.findIndex((item) => {
            return item.id === itemId;
        });

        cart.splice(itemIndex, 1);
    }

    updateCartCount();
    renderCart();
    saveCart();
});

cartButton.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
});

const categoryButtons = document.querySelectorAll("[data-category]");

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#food-search");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {

        categoryButtons.forEach((categoryButton) => {
            categoryButton.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        if (selectedCategory === "all") {
            renderFoods(foods);
        } else {
            const filteredFoods = foods.filter((food) => {
                return food.category === selectedCategory;
            });

            renderFoods(filteredFoods);
        }
    });
});

searchForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredFoods = foods.filter((food) =>{
        return food.name.toLowerCase().includes(searchTerm);
    });

    renderFoods(filteredFoods);
});

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartButton.textContent = `Cart (${totalItems})`;
}

foodGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-food-id]");

    if(!addButton){
        return;
    }

    const foodId = Number(addButton.dataset.foodId);
    
    const food = foods.find((food)=>{
        return food.id === foodId;
        
    });

    if(!food){
        return;
    }

    const existingCartItem = cart.find((item) =>{
        return item.id === food.id;
    });

    if(existingCartItem){
        existingCartItem.quantity++;
    } else{
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCartCount();
    renderCart();
    saveCart();
});