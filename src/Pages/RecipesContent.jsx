import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';

const fetchRecipes =async()=>{
    const response = await fetch(
      "https://raw.githubusercontent.com/hanzlafullstack/useQuery-Practice/refs/heads/main/data/recipes.json"
    );
    if(!response.ok) throw new Error("could not fetch Data")
    return response.json()
}

const RecipesContent = () => {
    const [inputRecipe, setInputRecipe] = useState("");
    const [page,setPage] = useState(1)
    const { data, isError, error, isLoading } = useQuery({
      queryKey: ["recipes"],
      queryFn: fetchRecipes,
      staleTime: 10000000
    });
    if (isError) return <p>Error Occured: {error.message}</p>;
    if (isLoading) return <p>Loading...</p>

    
    const recipes = data || []
    const filteredRecipe = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(inputRecipe.toLowerCase())
    )
    const recipesPerPage = 5;
    const totalPages = Math.ceil(filteredRecipe.length / recipesPerPage);

    const start = (page -1 ) * recipesPerPage;
    const end = start + recipesPerPage;
    const recipesSliced = filteredRecipe.slice(start, end) 

    

  return (
    <div className="users-content-box">
      <div className="headings-box">
        <h2>Recipes</h2>
        <p className="sub-heading">Random Recipes Data From DummyJSON</p>
      </div>
      <div className="input-recipes-box">
        <input
          type="text"
          placeholder="Enter Recipe Name"
          value={inputRecipe}
          onChange={(e) => setInputRecipe(e.target.value)}
          className="recipe-input"
          onFocus={() => setPage(1)}
        />
      </div>

      <div className="recipes-wrapper">
        {recipesSliced.length === 0 ? (
          <p>No Recipe Found...</p>
        ) : (
          recipesSliced?.map((recipe) => (
            <NavLink
              to={recipe.slug}
              key={recipe.id}
              className="content-box recipe-box"
            >
              <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <span className="span-recipe">Ratings : {recipe.rating}</span>
                <span>Difficulty : {recipe.difficulty}</span>
                <p>Dish Type : {recipe.cuisine}</p>
                <span>Meal Type : {recipe.mealType}</span>
              </div>
            </NavLink>
          ))
        )}
      </div>

      <div className="pages-box">
        <button
          className={page === 1 ? "btn-disabled" : "btn-active"}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <h3>{page}</h3>
        <button
          className={
            page === totalPages || recipesSliced.length === 0
               ? "btn-disabled"
              : "btn-active"
          }
          disabled={page === totalPages || recipesSliced.length === 0}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default RecipesContent