import React from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'





const RecipeDetails = () => {
  const recipe = useLoaderData()
  

  function HoursToMin(mins){
    const hours = mins / 60
    const hoursFixed = hours.toFixed(0)
    const minsFixed = mins % 60;
    if(hoursFixed > 0){
      if (minsFixed > 0) {
        return `${hoursFixed} hours and ${minsFixed}mins`;
      } else if (minsFixed == 0) {
        return `${hoursFixed} hours`;
      }
    }
    return `${minsFixed} mins`
  }
  const servings = recipe?.nutritionPerServing || {}

  return (
    <div className="users-content-box">
      <div className="headings-box">
        <h2>Recipe Details</h2>
        <p className="sub-heading">
          Here you can get the details of the recipe
        </p>
      </div>

      <div className="recipes-wrapper">
        <div className="content-box recipe-box">
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <span className="span-recipe">Ratings : {recipe.rating}</span>
          <span>Difficulty : {recipe.difficulty}</span>
          <p>Dish Type : {recipe.cuisine}</p>
          <span>Meal Type : {recipe.mealType}</span>
          <div className="extra-recipe-details">
            <p>
              Average Preperation Time :{" "}
              <strong>{HoursToMin(recipe.prepTimeMinutes)}</strong>
            </p>
            <p>
              Average cooking Time :{" "}
              <strong>{HoursToMin(recipe.cookTimeMinutes)} </strong>
            </p>
            <p>
              Average total Time :{" "}
              <strong>{HoursToMin(recipe.totalTimeMinutes)} </strong>
            </p>
            {/* ingredients */}
            <h3 style={{ textAlign: "center", padding: "10px 0" }}>
              ingredients
            </h3>
            <ol className="ol">
              {recipe?.ingredients.map((ingredient) => (
                <li className="ingredient-li" key={ingredient.item}>
                  {" "}
                  {ingredient.item} , Amount :{" "}
                  {ingredient.amount ? ingredient.amount : "Your Preference"}{" "}
                  {ingredient.unit}
                </li>
              ))}
            </ol>
            {/* Instructions */}
            <h3 style={{ textAlign: "center", padding: "10px 0" }}>
              Instructions
            </h3>
            <ol className="ol">
              {recipe?.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
            {/* Nutrition */}
            <h3 className="h3-style">Nutrition Per Serving</h3>
            <li style={{ listStyle: "none" }} key={crypto.randomUUID()}>
              Calories : {servings.calories} , Protein : {servings.protein} ,
              Fat : {servings.fat} , Carbs : {servings.carbs} , Fiber :{" "}
              {servings.fiber}
            </li>

            {/* equipment */}
            <h3 className="h3-style">Equipments</h3>
            <ol className="ol">
              {recipe?.equipment.map((equip) => (
                <li key={crypto.randomUUID()}>{equip}</li>
              ))}
            </ol>
            <p>
              <strong>Notes : {recipe.notes}</strong>
            </p>
            <p>
              <strong>proTips : {recipe.proTips}</strong>
            </p>
          </div>
        </div>
        <div className="NavLink-GoBack" style={{ padding: "30px 0" }}>
          <NavLink to="/recipes">
            <button className="go-back-to-recipe">Go Back</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails

export const fetchRecipesSlug = async ({params}) => {
    const {slug} = params;
  const response = await fetch(
    "https://raw.githubusercontent.com/hanzlafullstack/useQuery-Practice/refs/heads/main/data/recipes.json"
  );

  const recipes = await response.json()

  const recipe = recipes.find(c => c.slug === slug)

  

  if (!recipes) throw new Error("could not fetch Data");
  
  return recipe;
};