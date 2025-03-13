const recipes = [
    {
        title:"Spaghetti Bolognese",
        ingredients: "Spaghetti, Ground Beef, Tomato Sauce, Parmesan Cheese",
        steps: "Cook spaghetti, cook ground beef, combine with tomato sauce, top with parmes"
    },
    {
        title:"Chicken Fajitas",
        ingredients: "Chicken, Bell Peppers, Onions, Tortillas, Salsa",
        steps: "Cook chicken, cook bell peppers and onions, serve with tortillas and salsa"
    },
    {
        title:"Grilled Cheese Sandwich",
        ingredients: "Bread, Cheese, Butter",
        steps: "Butter bread, place cheese in between, grill until cheese is melted"
    }
    
    // {
    //     title:"Fried Rice",
    //     ingredients: "Cooked Rice, Scrambled Eggs, Vegetables, Soy Sauce",
    //     steps: "Cook scrambled eggs, add vegetables and soy sauce, combine with cooked rice"
    //     },
        


];

const displayRecipes = () => {
    const recipeList = document.querySelector('#recipeList')
    recipeList.innerHTML = "";
    // recipeList.textContent = "Hello terminal"

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4")
        recipeCard.innerHTML = `
        <h2 class = "text-lg font-bold">${recipe.title}</h2>
        <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Ingredients: &ensp;</strong>${recipe.ingredients}</p>
         <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Steps: &ensp;</strong>${recipe.steps}</p>
        `;
        recipeList.appendChild(recipeCard);
    })
}
const addRecipe = (event) => {
    event.preventDefault();
    const recipeTitle = document.getElementById("recipeTitle").value;
    const recipeIngredients = document.getElementById("recipeIngredients").value;
    const recipeSteps = document.getElementById("recipeSteps").value;

    if(recipeTitle.trim() !== "" && recipeIngredients.trim() !== "" && recipeSteps.trim() !== ""){

const newRecipe = {
    title: recipeTitle,
    ingredients: recipeIngredients,
    steps: recipeSteps
}
recipes.push(newRecipe)

document.getElementById("recipeTitle").value= "";

document.getElementById("recipeIngredients").value= "";
document.getElementById("recipeSteps").value= "";

displayRecipes();

    }else{
        alert('Please fill all the fields')
    }

}

// const recipeForm = document.getElementById('recipeForm');
// recipeForm.addEventListener('submit', addRecipe)
document.getElementById('recipeForm').addEventListener('submit', addRecipe);


displayRecipes();