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

const foodGrid = document.querySelector(".food-grid");

function renderFoods(){

    foodGrid.innerHTML = "";

    foods.forEach((food) => {
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
            </div>`;

        foodGrid.appendChild(card);
    });
}

renderFoods();

const categoryButtons = document.querySelectorAll("[data-category]");

console.log(categoryButtons);

categoryButtons.forEach((button) =>{
    button.addEventListener("click", () =>{
        console.log(button.dataset.category);
    });
});