import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { getTokenCookie } from 'utils/tools';
import PicUpload from './upload';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from 'components/hoc/dashboardLayout';
import { getAllBrands } from 'store/actions/brand.actions';
import { editProduct, getProductById } from 'store/actions/product.actions';
import PicViewer from './picViewer';
import { clearCurrentProduct } from 'store/actions';

import { useFormik } from 'formik';
import { errorHelper } from 'utils/tools';
import Loader from 'utils/loader';
import { 
    TextField,
    Button,
    Divider,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@mui/material';

import { validation, formValues, getValuesToEdit } from './formValues';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = (props) => {
    const [values, setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();
    const params = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(editProduct(values, params.id));
    }

    const handlePicValue = (pic) => {
        const picArray = formik.values.images;
        const picItem = {id: pic.public_id, url: pic.url};
        picArray.push(picItem);
        formik.setFieldValue('images', picArray);
    }

    const deletePic = async(picToDelete) => {
        setLoading(true);
        const picData = {public_id: picToDelete.id};
        axios.post(`/api/products/uploadRemove`, picData, {
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
        }).then( response => {
            const picArray = formik.values.images;
            picArray.splice(picToDelete.index, 1);
            formik.setFieldValue('images', picArray);
        }).catch( error => {
            alert(error)
        }).finally(() => {
            setLoading(false);
        });
        
    }

    useEffect(() => {
        if(notifications) {
            setLoading(false);
        }
    }, [notifications])

    useEffect(() => {
        
        const productId = params.id;
        dispatch(getAllBrands());
        if(productId) {
            dispatch(getProductById(productId));
        }
    }, [dispatch, params.id])

    useEffect(() => {
        if(products && products.byId) {
            setValues(getValuesToEdit(products.byId));
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [products])
    
    useEffect(() => {
        return() => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])

    return (
        <DashboardLayout title={products.byId ? `Edit product` : "Add Product"}>
            { loading ?
                <Loader />
                :
                <>
                    <PicViewer 
                        formik={formik}
                        deletePic={(index, id) => deletePic(index, id)}
                    />
                    <PicUpload 
                        picValue={(pic) => handlePicValue(pic)}
                    />
                    <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='model'
                                label='Enter a model'
                                variant='outlined'
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik, 'model')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='frets'
                                label='Amount of frets'
                                variant='outlined'
                                {...formik.getFieldProps('frets')}
                                {...errorHelper(formik, 'frets')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='woodtype'
                                label='Enter wood type'
                                variant='outlined'
                                {...formik.getFieldProps('woodtype')}
                                {...errorHelper(formik, 'woodtype')}
                            />
                        </div>
                        <div className='form-group'>
                            <FormControl>
                                <InputLabel id="brand-select-label">Select a brand</InputLabel>
                                <Select
                                    labelId='brand-select-label'
                                    name='brand'
                                    label='Select a brand'
                                    {...formik.getFieldProps('brand')}
                                    error={ formik.errors.brand && formik.touched.brand ?
                                    true : false }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {brands && brands.all ?
                                        brands.all.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                        : null
                                    }
                                </Select>
                                { formik.errors.brand && formik.touched.brand ?
                                    <FormHelperText error={true}>
                                        {formik.errors.brand}
                                    </FormHelperText>
                                    : null
                                }
                            </FormControl>
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='description'
                                label='Enter description'
                                variant='outlined'
                                multiline
                                rows={4}
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik, 'description')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='price'
                                label='Enter price'
                                variant='outlined'
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik, 'price')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{width: '100%'}}
                                name='available'
                                label='Enter avilable guitars'
                                variant='outlined'
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik, 'available')}
                            />
                        </div>
                        <Divider className='mt-3 mb-3' />
                        <div className='form-group'>
                            <FormControl variant="outlined">
                                <InputLabel id="shipping-select-label">Free shipping</InputLabel>
                                <Select
                                    labelId='shipping-select-label'
                                    label='Free shipping'
                                    name='shipping'
                                    {...formik.getFieldProps('shipping')}
                                    error={ formik.errors.shipping && formik.touched.shipping ?
                                    true : false }
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { formik.errors.shipping && formik.touched.shipping ?
                                    <FormHelperText error={true}>
                                        {formik.error.shipping}
                                    </FormHelperText>
                                    : null
                                }
                            </FormControl>
                            <Divider className='mt-3 mb-3' />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                { products.byId ? 'Edit Product' : 'Add Product' }
                            </Button>
                        </div>
                    </form>
                </>

            }
        </DashboardLayout>
    )
};

export default EditProduct;