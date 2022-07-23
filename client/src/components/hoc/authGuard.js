import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Loader from 'utils/loader';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard(ComposedComponent) {
    const AuthenticationCheck = ( props ) => {
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
                <ComposedComponent users={users} {...props} />
            )
        }
    }
    return AuthenticationCheck;
}