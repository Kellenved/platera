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