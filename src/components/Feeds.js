import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import '../css/feed.css';
import checkAuth from "./auth/checkAuth";

function Feeds() {
  const [recipes, setRecipes] = useState([]);
  const [recipeImages, setRecipeImages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loadingLike, setLoadingLike] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authToken = user ? user.token : null;

    axios.get('http://127.0.0.1:8000/api/recipes', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => {
      console.log(response.data.recipes);
      setRecipes(response.data.recipes);

      let alreadyLikedRecipes = response.data.recipes.filter(recipe=>recipe.likes.length>0).map(recipe=>{return recipe.id})
      setLikedRecipes(alreadyLikedRecipes)
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
    });
  }, []);

  const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdCjb_D9bJ_4_LV04BCn7mLHzwimVycKFsQ&usqp=CAU';

  useEffect(() => {
    const fetchRecipeImages = () => {
  const images = recipes.reduce((acc, recipe) => {
    if (recipe.image && recipe.image.filename) {
      console.log(`Recipe ID: ${recipe.id}, Image URL: http://localhost:8000/storage/${recipe.image.filename}`);
      return { ...acc, [recipe.id]: 'http://localhost:8000/storage/' + recipe.image.filename };
    } else {
      console.log(`Recipe ID: ${recipe.id}, Using Default Image`);
      return { ...acc, [recipe.id]: defaultImageUrl };
    }
  }, {});

  setRecipeImages(images);
};

  
    fetchRecipeImages();
  }, [recipes]);
  

  const handleHeartClick = async (recipeId) => {
    if (loadingLike) return;

    try {
      setLoadingLike(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const authToken = user ? user.token : null;

      const isLiked = likedRecipes.includes(recipeId);

      if (isLiked) {
        await axios.post(`http://127.0.0.1:8000/api/recipes/${recipeId}/unlike`, null, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setLikedRecipes(likedRecipes.filter(id => id !== recipeId));
      } else {
        await axios.post(`http://127.0.0.1:8000/api/user/${user.id}/like/${recipeId}`, null, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setLikedRecipes([...likedRecipes, recipeId]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleSeeMoreClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />

      <div className="text-center">
        <h1>Explore a Variety of Delectable Recipes</h1>
      </div>
      <div className="row w-100 p-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="col-md-3 mb-4">
            <div className="card">
              <div>
                <img
                  className="card-img-top"
                  src={recipeImages[recipe.id]}
                  style={{ height: '280px' }}
                  alt={recipe.title}
                />
                <div className="card-body fixed-height">
                  <h5 className="card-title" style={{ textDecoration: 'none' }}>
                    {recipe.title}
                  </h5>
                  <p className="card-text" style={{ textDecoration: 'none' }}>
                    {recipe.ingredients.substring(0, 100)}{recipe.ingredients.length > 100 && '... '}
                    <Button variant="link" onClick={() => handleSeeMoreClick(recipe)}>
                      See more
                    </Button>
                  </p>
                  <p className="card-text">
                    <Link
                      to={`/showRecipe/${recipe.id}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      More
                    </Link>
                    <button
                      className={`btn btn-outline-danger btn-sm${likedRecipes.includes(recipe.id) ? ' active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); handleHeartClick(recipe.id); }}
                    >
                      <i
                        className={`far fa-heart${likedRecipes.includes(recipe.id) ? ' active' : ''}`}
                      ></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecipe.ingredients}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default checkAuth(Feeds);
