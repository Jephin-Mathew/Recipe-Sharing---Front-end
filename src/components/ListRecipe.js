// ListRecipe.js

import React, { useEffect, useState } from "react";
import Header from "./Header";
import checkAuth from "./auth/checkAuth";
import axios from "axios";

function ListRecipe() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        const authToken = localStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        axios.get('http://127.0.0.1:8000/api/recipes', config)
            .then(response => {
                console.log('API response:', response.data);
                setRecipes(response.data.recipes);  // Updated to access the 'recipes' property
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='text-center my-4'>
                            Recipes
                        </h1>
                        <div className='row'>
                            <div className='col-8 offset-2'>
                                {/* Render your recipes here */}
                                {recipes.map(recipe => (
                                    <div key={recipe.id}>
                                        <h3>{recipe.title}</h3>
                                        <p>{recipe.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ListRecipe);
