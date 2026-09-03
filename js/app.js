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

const cart = [];

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

renderFoods(foods);
updateCartCount();

function renderCart() {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>€${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = `Total: €${total.toFixed(2)}`;
}

cartButton.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
});

const categoryButtons = document.querySelectorAll("[data-category]");

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#food-search");

categoryButtons.forEach((button) =>{
    button.addEventListener("click", () =>{

        const selectedCategory = button.dataset.category;

        if (selectedCategory === "all"){
            renderFoods(foods);
        } else{
            const filteredFoods = foods.filter((food) =>{
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
    
    console.log(cart);
});