import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import DashboardLayout from 'components/hoc/dashboardLayout';
import ProductsTable from './productsTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { productsPaginate, removeProduct } from 'store/actions/product.actions';

const defaultValues = { keywords: '', brand: [], min: 0, max: 5000, frets: [], page: 1 };

const AdminProducts = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, 'You need more than 3 characters')
                .max(200, 'Your search is too long')
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchValues({ keywords: values.keywords, page: 1});
            resetForm();
        }
    })

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues 
    )
    
    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`);
    }

    const goToPage = (page) => {
        setSearchValues({ page: page });
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleOpen = (id) => {
        setToRemove(id);
        setShowModal(true);
    }

    const handleRemove = () => {
        dispatch(removeProduct(toRemove));
    }

    const resetSearch = () => {
        setSearchValues(defaultValues)
    }

    useEffect(() => {
        dispatch(productsPaginate(searchValues));
    }, [dispatch, searchValues]);

    useEffect(() => {
        handleClose();
        setToRemove(null);

        if(notifications && notifications.removed) {
            dispatch(productsPaginate(searchValues));
        }

    }, [notifications, dispatch])

    return(
        <DashboardLayout title="Products">
            <div className='products_table'>
                <div>
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{width: '100%'}}
                            name='keywordds'
                            label='Enter your search'
                            variant='outlined'
                            {...formik.getFieldProps('keywords')}
                            {...errorHelper(formik, 'keywords')}
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>Reset Search</Button>
                </div>
                <hr />
                <ProductsTable
                    showModal={showModal}
                    prods={products.byPaginate}
                    prevPage={(page) => goToPage(page)}
                    nextPage={(page) => goToPage(page)}
                    editProd={(id) => goToEdit(id)}
                    closeModal={() => handleClose()}
                    openModal={(id) => handleOpen(id)}
                    removeProd={() => handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminProducts;