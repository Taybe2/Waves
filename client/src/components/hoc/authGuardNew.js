import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'utils/loader';

const AuthGuard = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if(!users.auth) {
            navigate('/');
        } else {
            setIsAuth(true);
        }
    }, [navigate, users.auth]);
  
    if(!isAuth) {
        return(
            <Loader full={true} />

        )
    } else {
        return (
            children
        )
    }
};

export default AuthGuard;