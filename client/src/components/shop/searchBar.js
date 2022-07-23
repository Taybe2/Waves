import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { TextField } from '@mui/material';

const SearchBar = (props) => {
    const formik = useFormik({
        initialValues: { keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, 'You need min 3 characters')
                .max(200, 'Maximunu 200 characters')
        }),
        onSubmit: (values, { resetForm }) => {
            props.handleSearch(values.keywords);
            resetForm();
        }
    })
    return (
        <div className='conatiner' >
            <form className='mt-3' onSubmit={formik.handleSubmit}>
                <div>
                    <TextField 
                        style={{
                            width: '100%'
                        }}
                        label='Search for a guitar'
                        name='keywords'
                        variant='outlined'
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik, 'keywords')}
                    />
                </div>
            </form>
        </div>
    )
};

export default SearchBar;