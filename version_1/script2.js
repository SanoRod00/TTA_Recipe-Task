let recipes = [];


const displayRecipes = () => {
    const recipeList = document.querySelector('#recipeList')
    


if(recipeList){
    recipeList.innerHTML = "";
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4")
        recipeCard.innerHTML = `
        <h2 class = "text-lg font-bold" id = "titleDisplay-${index}">${recipe.title}</h2>
        <input type = "text" id = "titleInput-${index}" class = "hidden border p-2 w-full mb-2 rounded-lg" value = "${recipe.title}">

        <p class = "text-sm text-gray-500" id = "ingredientsDisplay-${index}" ><strong class = "font-bold text-lg">Ingredients: &ensp;</strong>${recipe.ingredients}</p>
        <textarea id = "ingredientsInput-${index}" class = "hidden border p-2 w-full mb-2 rounded-lg">${recipe.ingredients}</textarea>

         <p class = "text-sm text-gray-500" id = "stepsDisplay-${index}" ><strong class = "font-bold text-lg">Steps: &ensp;</strong>${recipe.steps}</p>
<textarea id = "stepsInput-${index}" class = "hidden border p-2 w-full mb-2 rounded-lg">${recipe.steps}</textarea>


         <button class = "bg-green-500 text-white px-2 py-1 rounded mt-2" id = "editBtn-${index}" onClick = "editRecipe(${index})">Edit</button>

         <button class = "bg-red-500 text-white px-2 py-1 rounded mt-2" id = "deleteBtn-${index}" onClick = "deleteRecipe(${index})">Delete</button>

         <button class = "bg-green-500 text-white px-2 py-1 rounded mt-2 hidden" id = "saveBtn-${index}" onClick = "saveRecipe(${index})">Save</button>

<button class = "bg-gray-500 text-white px-2 py-1 rounded mt-2 hidden" id = "cancelBtn-${index}" onClick = "cancelEdit(${index})">Cancel</button>

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

    document.getElementById(`titleDisplay-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.add("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.add("hidden");

    document.getElementById(`editBtn-${index}`).classList.add("hidden");
    document.getElementById(`deleteBtn-${index}`).classList.add("hidden");

    document.getElementById(`titleInput-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.remove("hidden");
    document.getElementById(`stepsInput-${index}`).classList.remove("hidden");

    document.getElementById(`saveBtn-${index}`).classList.remove("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.remove("hidden");
    
}

const cancelEdit = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.remove("hidden");

    document.getElementById(`editBtn-${index}`).classList.remove("hidden");
    document.getElementById(`deleteBtn-${index}`).classList.remove("hidden");

    document.getElementById(`titleInput-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.add("hidden");
    document.getElementById(`stepsInput-${index}`).classList.add("hidden");

    document.getElementById(`saveBtn-${index}`).classList.add("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.add("hidden");
    
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