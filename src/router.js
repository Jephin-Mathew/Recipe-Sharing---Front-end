import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Feeds from "./components/Feeds";
import CreateRecipe from "./components/recipe/createRecipe";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import ShowRecipe from "./components/recipe/showRecipe";
import ListUsers from "./components/ListUsers";
import ProfileUpdate from "./components/ProfileUpdate";



const router = createBrowserRouter([
    { path: '', element: <Login/> },
    { path: 'logout', element: <Logout/>},
    { path: 'register', element: <Register/> },
    { path: 'feed', element: <Feeds/> },
    { path: 'createRecipe',element:<CreateRecipe/>},
    { path: 'profile',element: <Profile/>},
    { path: 'showRecipe/:recipeId', element: <ShowRecipe /> },
    { path: 'admin',element: <AdminDashboard/>},
    { path: 'users',element: <ListUsers/>},
    { path: 'updateprofile',element: <ProfileUpdate/>},
]);

export default router;