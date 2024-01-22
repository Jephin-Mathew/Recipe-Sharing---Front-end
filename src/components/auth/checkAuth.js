import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAuth = (Component) => {
  function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);
    const userId = user ? user.id : null;
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/');
      }
    }, [user, navigate]);

    return <Component {...props} />;
  }

  return Wrapper;
}

export default checkAuth;
