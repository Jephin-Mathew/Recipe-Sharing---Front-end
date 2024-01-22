import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import '../../css/CreateRecipe.css';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';



function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [cookingHours, setCookingHours] = useState('');
  const [cookingMinutes, setCookingMinutes] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);


  function handleImageChange(event) {
    // Handle file upload
    const file = event.target.files[0];
    setImage(file);
  }

  function addRecipe() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    formData.append('cooking_hours', parseInt(cookingHours, 10));
    formData.append('cooking_minutes', parseInt(cookingMinutes, 10));
  
    // Ensure that difficulty level is set correctly as an integer
    const difficultyLevelInteger = { easy: 1, medium: 2, hard: 3 }[difficultyLevel];
    if (typeof difficultyLevelInteger === 'undefined') {
      console.error('Invalid difficulty level:', difficultyLevel);
      return; // Abort the function if difficulty level is invalid
    }
    formData.append('difficulty_level', difficultyLevelInteger);
  
    // Remove the line formData.append('image', image);
  
    axios
      .post('http://127.0.0.1:8000/api/recipes', formData, {
        headers: { Authorization: 'Bearer ' + user.token, 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Response:', response);
        navigate('/feed');
      })
      .catch((error) => {
        // Log the error details
        console.error('Error adding recipe:', error);
  
        // Log additional details from the response, if available
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      });
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Create Recipe</h1>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ingredients:</label>
              <textarea
                className="form-control"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Steps:</label>
              <textarea
                className="form-control"
                value={steps}
                onChange={(event) => setSteps(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Cooking Time (hours):</label>
              <input
                type="number"
                className="form-control"
                value={cookingHours}
                onChange={(event) => setCookingHours(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Cooking Time (minutes):</label>
              <input
                type="number"
                className="form-control"
                value={cookingMinutes}
                onChange={(event) => setCookingMinutes(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Difficulty Level:</label>
              <select
                className="form-control"
                value={difficultyLevel}
                onChange={(event) => setDifficultyLevel(event.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input type="file" className="form-control-file" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={addRecipe}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(CreateRecipe);