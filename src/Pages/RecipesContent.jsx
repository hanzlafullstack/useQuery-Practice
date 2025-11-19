import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const fetchRecipes =async()=>{
    const response = await fetch("https://dummyjson.com/recipes");
    if(!response.ok) throw new Error("could not fetch Data")
    return response.json()
}

const RecipesContent = () => {
    const [page,setPage] = useState(1)
    const {data , isError , error , isLoading} = useQuery({
        queryKey : ["recipes"],
        queryFn : fetchRecipes
    })
    if (isError) return <p>Error Occured: {error.message}</p>;
    if (isLoading) return <p>Loading...</p>
    const recipes = data?.recipes || []
    const recipesPerPage = 3;
    const totalPages = Math.ceil(recipes.length / recipesPerPage)

    const start = (page -1 ) * recipesPerPage;
    const end = start + recipesPerPage;
    const recipesSliced = recipes.slice(start,end)
  return (
    <div className="users-content-box">
      <div className="headings-box">
        <h2>Recipes</h2>
        <p className="sub-heading">Random Recipes Data From DummyJSON</p>
      </div>
      <div className="input-recipes-box">
        <input type="text" />
        <button>Search</button>
      </div>

      <div className="recipes-wrapper">
        {recipesSliced?.map((recipe) => (
          <div className="content-box">
            <h2>{recipe.name}</h2>
          </div>
        ))}
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
          className={page === totalPages ? "btn-disabled" : "btn-active"}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default RecipesContent