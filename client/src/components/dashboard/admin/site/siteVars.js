import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';

import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { updateSiteVars } from 'store/actions/site.actions';

const SiteVars = () => {
    const site = useSelector(state => state.site)
    const dispatch = useDispatch();

    const formik = useFormik ({
        enableReinitialize: true,
        initialValues: {
            address: site.vars.address,
            phone: site.vars.phone,
            hours: site.vars.hours,
            email: site.vars.email
        },
        validationSchema: Yup.object({
            address: Yup.string()
                .min(6, 'You need to add more')
                .required('Address is required'),
            phone: Yup.string()
                .min(6, 'You need to add more')
                .required('Phone is required'),
            hours: Yup.string()
                .min(5, 'You need to add more')
                .required('Hours is required'),
            email: Yup.string()
                .email('You need to enter a valid email')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            dispatch(updateSiteVars(
                {
                    _id: site.vars,
                    ...values
                }
            ));
        }
    })

    return (
        <form className='mt-3 article_form' style={{maxWidth: '250px'}}
            onSubmit={formik.handleSubmit}
        >
            <div className='form-group'>
                <TextField 
                    style={{ width: '100%' }}
                    name="address"
                    label='Address'
                    variant='outlined'
                    {...formik.getFieldProps('address')}
                    {...errorHelper(formik, 'address')}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    style={{ width: '100%' }}
                    name="phone"
                    label='Phone'
                    variant='outlined'
                    {...formik.getFieldProps('phone')}
                    {...errorHelper(formik, 'phone')}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    style={{ width: '100%' }}
                    name="hours"
                    label='Openning hours'
                    variant='outlined'
                    {...formik.getFieldProps('hours')}
                    {...errorHelper(formik, 'hours')}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    style={{ width: '100%' }}
                    name="email"
                    label='Email'
                    variant='outlined'
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik, 'email')}
                />
            </div>
            <Button 
                className='mb-3'
                variant='contained'
                color='primary'
                type='submit'
            >
                Edit store information
            </Button>
        </form>
    );
};

export default SiteVars;