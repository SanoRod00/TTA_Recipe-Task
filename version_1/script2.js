let recipes = [];


const displayRecipes = () => {
    const recipeList = document.querySelector('#recipeList')
    


if(recipeList){
    recipeList.innerHTML = "";
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4")
        recipeCard.innerHTML = `
        <h2 class = "text-lg font-bold">${recipe.title}</h2>
        <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Ingredients: &ensp;</strong>${recipe.ingredients}</p>
         <p class = "text-sm text-gray-500"><strong class = "font-bold text-lg">Steps: &ensp;</strong>${recipe.steps}</p>
         <button class = "bg-green-500 text-white px-2 py-1 rounded mt-2" onClick = "editRecipe(${index})">Edit</button>
         <button class = "bg-red-500 text-white px-2 py-1 rounded mt-2" onClick = "deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    } )
}
}
const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes")
    
    if(storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId)
    if(errorElement){
        errorElement.innerText = message ;
    errorElement.classList.remove("hidden");
    }
    
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
    }
    recipes.push(newRecipe)
    
    document.getElementById("recipeTitle").value= "";
    
    document.getElementById("recipeIngredients").value= "";
    document.getElementById("recipeSteps").value= "";

    saveRecipeToLocalStorage();
    if (document.querySelector('#recipeList')){  
    displayRecipes();  
    }
  }  
 }      
}  
const editRecipe = (index) => {

    const updatedRecipeTitle = prompt('Enter the new recipe title', recipes[index].title);
    const updatedRecipeIngredients = prompt('Enter the new recipe Ingredients', recipes[index].ingredients);
    const updatedRecipeSteps = prompt('Enter the new recipe Steps', recipes[index].steps);

    if(updatedRecipeTitle && updatedRecipeIngredients && updatedRecipeSteps){
        recipes[index].title = updatedRecipeTitle;
        recipes[index].ingredients = updatedRecipeIngredients;
        recipes[index].steps = updatedRecipeSteps;

        saveRecipeToLocalStorage();
        if (document.querySelector('#recipeList')){  
        displayRecipes();
         }
    }                                                                                                                                                                                                                           
}
const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    if (document.querySelector('#recipeList')){   
    displayRecipes();
}
}

const recipeForm = document.getElementById("recipeForm")

if(recipeForm){
    document.getElementById('recipeForm').addEventListener('submit', addRecipe);
}

loadRecipesFromLocalStorage();
displayRecipes();