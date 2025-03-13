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
];

const displayRecipes = () => {
    const recipeList = document.querySelector('#recipeList')
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4")
        recipeCard.innerHTML = `
        <h2 class = "text-lg font-bold">${recipe.title}</h2>
        <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Ingredients: &ensp;</strong>${recipe.ingredients}</p>
         <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Steps: &ensp;</strong>${recipe.steps}</p>
         <button class = "bg-green-500 text-white px-2 py-1 rounded mt-2">Edit</button>
         <button class = "bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    })
}

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem('recipes')
    
    if(storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId)
    errorElement.innerText = message ;
    errorElement.classList.remove("hidden");
}
const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.add("hidden");
}
const addRecipe = (event) => {
    event.preventDefault();
    const recipeTitle = document.getElementById("recipeTitle").value.trim();
    const recipeIngredients = document.getElementById("recipeIngredients").value.trim();
    const recipeSteps = document.getElementById("recipeSteps").value.trim();

    // if(recipeTitle.trim() !== "" && recipeIngredients.trim() !== "" && recipeSteps.trim() !== ""){

    hideError("titleError");
    hideError("ingredientsError");
    hideError("stepsError");

    let isValid = true;

    if(recipeTitle === ""){
        showError("titleError", "Please enter the Recipe title!!");
        isValid = false;
    }
    if(recipeIngredients === ""){
        showError("ingredientsError", "Please enter the Recipe ingredients!!");
        isValid = false;
    }
    if(recipeSteps === ""){
        showError("stepsError", "Please enter the Recipe steps!!");
        isValid = false;
        }
if(isValid){
const isDuplicate = recipes.some((recipe) => recipe.title.toLowerCase() === recipeTitle.toLowerCase());
 if(isDuplicate){
    alert('The recipe already exist!!!')
 }else{
    const newRecipe = {
        title: recipeTitle,
        ingredients: recipeIngredients,
        steps: recipeSteps
    }}
    recipes.push(newRecipe)
    
    document.getElementById("recipeTitle").value= "";
    
    document.getElementById("recipeIngredients").value= "";
    document.getElementById("recipeSteps").value= "";
    displayRecipes();  
 }
    // }
    // else{
    //     alert('Please fill all the fields')
    // }

}
document.getElementById('recipeForm').addEventListener('submit', addRecipe);


displayRecipes();