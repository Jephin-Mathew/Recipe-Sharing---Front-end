import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import checkAuth from "./auth/checkAuth";
import { useSelector } from "react-redux";
import '../css/Profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/user/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ` + user.token,
              },
            }
          );

          setUserProfile(response.data.user);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (error) {
    return <div className="error">Error fetching user profile: {error.message}</div>;
  }

  if (!userProfile) {
    return <div className="loading">Loading...</div>;
  }

  const { name, bio, recipes, followers, following } = userProfile;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="user-info">
        <p>Name: {name}</p>
        <p>Bio: {bio}</p>
      </div>

      <div className="section">
        <h3>Recipes</h3>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Followers</h3>
        <ul>
          {followers.map((follower) => (
            <li key={follower.id}>{follower.name}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Following</h3>
        <ul>
          {following.map((followingUser) => (
            <li key={followingUser.id}>{followingUser.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default checkAuth(Profile);
