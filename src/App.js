import logo from './logo.svg';
import { useEffect, useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([]); //Added
  let submitRecipe = (event) => {
    event.preventDefault()

    let newRecipeName = document.getElementById('newRecipeName').value;
    let newRecipeInstructions = document.getElementById('newRecipeInstructions').value;

    setRecipes([...recipes,
        {
          name: newRecipeName,
          instructions: newRecipeInstructions
        }
      ]);
    showRecipeForm(false);
  }

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      {
        recipeFormShown ?
          <>
            <form id="recipe-form" name='recipe-form' onSubmit={submitRecipe}>
              <label htmlFor="newRecipeName">Recipe name: </label>
              <input type="text" id="newRecipeName" />
              <label htmlFor="newRecipeInstructions">Instructions:</label>
              <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
              <input type="submit" />
            </form>
          </>
          : <div>
            <p>There are no recipes to list.</p>
            <button onClick={() => showRecipeForm(!recipeFormShown)}>Add Recipe</button>
            <div>
              {recipes.map(recipe => (
                <div>
                  <p>{recipe.name}</p>
                  <p>{recipe.instructions}</p>
                </div>
              ))}
            </div>
          </div>
      }
    </div>
  );
}

export default App;