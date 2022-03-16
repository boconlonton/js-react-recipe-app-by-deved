import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";

import "./App.css";

const App = () => {
  const APP_ID = "4c51fe61";
  const APP_KEY = "0f4fa849c351046c008593691ee6fe08";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // useEffect(() => {
  //   console.log("Effect has been run");
  // });

  // Not run if re-render
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  // Only run if counter is re-render
  // useEffect(() => {
  //   console.log("Effect has been run");
  // }, [counter]);

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>
        ))}
        ;
      </div>
    </div>
  );
};

export default App;
