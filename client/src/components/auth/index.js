import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from './authForm';

const RegisterLogin = (props) => {
    const [formType, setFormType] = useState(false);

    const toogleFormType = () => {
        setFormType(!formType);
    }
    
    return (
        <div className='page_wrapper'>
            <div className='container'>
                <div className='register_login_container'>
                    <div className='left'>
                        { formType ?
                            <>
                                <h1>New customer</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus nec mauris in pellentesque. Maecenas nec tellus luctus, ornare turpis et, ornare dolor. Suspendisse tincidunt iaculis bibendum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                            </>
                            : 
                            <>
                                <h1>Welcome back</h1>
                                <p>Donec et ligula euismod, vulputate erat sed, lacinia odio. Suspendisse vitae dolor dapibus, eleifend sem a, posuere erat. Donec rhoncus dapibus tristique.</p>
                            </>
                        }
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={toogleFormType}
                        >
                            {formType ? 'Already, registered?' : 'Need to register?' }
                        </Button>
                    </div>
                    <div className='right'>
                        <h2>{formType ? 'Register' : 'Sign in'}</h2>
                        <AuthForm
                            formType={formType}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RegisterLogin;