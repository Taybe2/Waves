import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Loader from 'utils/loader';
import { errorHelper } from 'utils/tools';
import { userRegister, userSignIn } from 'store/actions/user.actions';

import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';

const AuthForm = ( props ) => {
    const notifications = useSelector(state => state.notifications)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: 'taybemuharem@yahoo.co.uk', password: 'testing1234' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry, email is required')
                .email('This is an invalid email'),
            password: Yup.string()
                .required('Sorry, password is required')
        }),
        onSubmit: (values) => {
            console.log(values);
            setLoading(true);
            handleSubmit(values);
        }
    });

    const handleSubmit = (values) => {
        if(props.formType) {
            //// register
            dispatch(userRegister(values));
        } else {
            //// sign in
            dispatch(userSignIn(values));
        }
    }
    
    useEffect(() => {
        
        if(notifications && notifications.success) {
            navigate('/dashboard');
        } else {
            setLoading(false);
        }
    }, [notifications, navigate]);

    return (
        <>
            <div className='auth_container'>
                { loading ?
                    <Loader />
                    :
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className='formBlock'>
                            <TextField
                                style={{width: '100%'}}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className='formBlock'>
                            <TextField
                                style={{width: '100%'}}
                                name="password"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                        >
                            { props.formType ? 'Register' : 'Sign in' }
                        </Button>
                    </form>
                }
            </div>
        </>
    );
};

export default AuthForm;