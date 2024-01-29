import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';

function ShowRecipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cooking_hours: '',
    cooking_minutes: '',
    difficulty_level: '',
    image: '',
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${recipeId}`, config);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-header'>
                <h3>{recipe.title}</h3>
              </div>
              <div className='card-body'>
                <p><strong>Ingredients:</strong>{recipe.ingredients}</p>
                <p><strong>Steps:</strong>{recipe.steps}</p>
                <p><strong>Cooking Hours:</strong>{recipe.cooking_hours}</p>
                <p><strong>Cooking Minutes:</strong>{recipe.cooking_minutes}</p>
                <p><strong>Difficulty Level:</strong>{recipe.difficulty_level}</p>
                <p><strong>Image:</strong>{recipe.image}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  checkAuth(ShowRecipe);
