import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import { useSelector } from "react-redux";
import '../css/feed.css';

function Feeds() {
    const [heartActive, setHeartActive] = useState(false);
    const [activityFeed, setActivityFeed] = useState([]);
    const user = useSelector((store) => store.auth.user);

    useEffect(() => {
        if(user){
            // Fetch activity feed data from the API
            axios.get('http://127.0.0.1:8000/api/user/activity-feed',
            {
            headers: {
                Authorization: `Bearer ` + user.token,
            },
            })
            .then(response => {
                setActivityFeed(response.data.activities.data);
            })
            .catch(error => {
                console.error("Error fetching activity feed:", error);
            });
        }else{

        }
    }, [user]); // Empty dependency array ensures the effect runs only once on component mount

    const handleHeartClick = () => {
        setHeartActive(!heartActive);
    };

    return (
        <div>
            <Header />

            <div className="text-center">
                <h1>Explore a Variety of Delectable Recipes</h1>
            </div>
            <div className="row w-100 p-3">
                {activityFeed.map(activity => (
                    <div key={activity.id} className="col-md-3 mb-4">
                        <div className="card">
                            <a href="#">
                                <img className="card-img-top" src={activity.recipe.images[0]??''} style={{ height: '280px' }} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{activity.recipe.title}</h5>
                                    <p className="card-text">{activity.recipe.ingredients}</p>
                                    <p className="card-text">
                                        <button className="btn btn-outline-success btn-sm"> More</button>
                                        <button className={`btn btn-outline-danger btn-sm${heartActive ? ' active' : ''}`} onClick={handleHeartClick}>
                                            <i className={`far fa-heart${heartActive ? ' active' : ''}`}></i>
                                        </button>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feeds;
{/* <div className="row w-100 p-3">
            <div className="col-md-3 mb-4">
                <div className="card ">
                    <a href="">
                        <img className="card-img-top" src="https://www.themediterraneandish.com/wp-content/uploads/2022/12/baked-eggs-FINAL-5.jpg" style={{ height: '280px' }} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Lorem ipsum dolor sit amet.</h5>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad alias, 
                            </p>
                            <p className="card-text"><button className="btn btn-outline-success btn-sm"> More</button>
                                <button className={`btn btn-outline-danger btn-sm${heartActive ? ' active' : ''}`} onClick={handleHeartClick}>
                                    <i className={`far fa-heart${heartActive ? ' active' : ''}`}></i>
                                </button>
                                <button className={`btn btn-outline-info btn-sm`}>
                                <i class="fa-solid fa-plus"></i>
                                </button></p>
                        </div>
                    </a>
                </div>
            </div> */}