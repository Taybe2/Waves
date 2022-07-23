import React, { useState } from 'react';
import { WavesButton } from 'utils/tools';
import AddToCartHandler from 'utils/cart/addToCartHandler';
import { userAddToCart } from 'store/actions/user.actions';

import { 
    LocalShipping,
    DoneOutline,
    SentimentDissatisfied
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

const ProductInfo = ({ detail }) => {
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('');

    const handleAddToCart = (item) => {
        if(!user.auth) {
            setModal(true);
            setError('auth');
            return false;
        }
        if(!user.data.verified) {
            setModal(true);
            setError('verify');
            return false;
        }
        dispatch(userAddToCart(item));
    };

    const handleClose = () => setModal(false);

    const showProdTags = (detail) => (
        <div className='product_tags'>
            <div className={`tag ${detail.shipping > 0 ? 'active' : ''}`}>
                <LocalShipping />
                <div className='tag_text'>
                    { detail.shipping ?
                        <div>Free shipping for US location</div>
                        :
                        <div>No free shipping for US location</div>
                    }
                </div>
            </div>
            <div className={`tag ${detail.available > 0 ? 'active' : ''}`}>
                <DoneOutline />
                <div className='tag_text'>
                    { detail.available > 0 ?
                        <div>{detail.available} available</div>
                        :
                        <div>Sorry, product not available at the moment</div>
                    }
                </div>
            </div>
        </div>
    );

    const showProdActions = (detail) => (
        <div className='product_actions'>
            <div className='price'>$ {detail.price}</div>
            <div className='cart'>
                <WavesButton 
                    type='add_to_cart_link'
                    runAction={() => handleAddToCart(detail)}
                />
            </div>
        </div>
    )

    const showProdSpecs = (details) => (
        <div className='product_specifications'>
            <h4>Specifications:</h4>
            <div>
                <div className='item'>
                    <strong>Frets:</strong> {detail.frets}
                </div>
                <div className='item'>
                    <strong>Wood: </strong> {detail.woodtype}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <h1>{detail.brand.name} {detail.model}</h1>
            <p>{detail.description}</p>
            { showProdTags(detail) }
            { showProdActions(detail) }
            { showProdSpecs(detail) }
            <AddToCartHandler 
                modal={modal}
                errorType={error}
                handleClose={handleClose}
            />
        </div>
    )
}

export default ProductInfo;