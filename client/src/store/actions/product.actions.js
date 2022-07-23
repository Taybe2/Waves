import axios from "axios";
import * as actions from './index';

import { getAuthHeader, removeTokenCookie, getTokenCookie } from "utils/tools";

axios.defaults.headers.post['Content-Type'] = 'application-json';

export const productsBySort = ({ limit, sortBy, order }) => {
    return async(dispatch) => {
        try {
            const products = await axios.get('api/products/all', {
                params: {
                    limit,
                    sortBy,
                    order
                }
            });

            switch (sortBy) {
                case 'itemSold':
                    dispatch(actions.productsBySold(products.data));
                    break;
                case 'date':
                    dispatch(actions.productsByDate(products.data));
                    break;
                default:
                    return false;
            }

        } catch(error) {
            dispatch(actions.errorGlobal('Sorry something happened, try again later'));
        }
    }
}

export const productsPaginate = (args) => {
    return async(dispatch) => {
        try {
            const products = await axios.post(`/api/products/paginate/all`, args);
            dispatch(actions.productsPaginate(products.data));
        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}

export const removeProduct = (id) => {
    return async(dispatch) => {
        try {
            const products = await axios.delete(`/api/products/product/${id}`, getAuthHeader());
            dispatch(actions.removeProduct());
            dispatch(actions.successGlobal('Product removed.'));
        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}

export const addProduct = (data) => {
    return async(dispatch) => {
        try {
            const product = await axios.post(`/api/products/product`, data, getAuthHeader());
            dispatch(actions.addProduct(product.data));
            dispatch(actions.successGlobal('Product added.'));
        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}

export const getProductById = (id) => {
    return async(dispatch) => {
        try {
            const product = await axios.get(`/api/products/product/${id}`);
            dispatch(actions.productById(product.data));
        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}
export const editProduct = (values, id) => {
    return async(dispatch) => {
        try {
            const product = await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
            dispatch(actions.successGlobal('Product updated.'));
        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}