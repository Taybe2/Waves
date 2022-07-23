import React, { useState } from 'react';
import { renderCardImage, WavesButton } from 'utils/tools';

import { useSelector, useDispatch } from 'react-redux';
import AddToCartHandler from 'utils/cart/addToCartHandler';
import { userAddToCart } from 'store/actions/user.actions';

const Card = (props) => {
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

    return (
        <div className={`card_item_wrapper ${props.grid ? 'grid_bars' : '' }`}>
            <div
                className='image'
                style={{
                    background: `url(${renderCardImage(props.item.images)})`
                }}
            ></div>
            <div className='action_container'>
                <div className='tags'>
                    <div className='brand'>{ props.item.brand.name }</div>
                    <div className='name'>{ props.item.model }</div>
                    <div className='name'>{ props.item.price }</div>
                </div>
                { props.grid ?
                    <div className="description">
                        <p>
                            { props.item.description }
                        </p>
                    </div>
                    : null
                }
                <div className='actions'>
                    <div className='button_wrapp'>
                        <WavesButton
                            type="default"
                            altClass="card_link"
                            title="View product"
                            linkTo={`/product_detail/${props.item._id}`}
                            style={{
                                fontWeight: 'bold'
                            }}
                        />
                    </div>
                    <div className='button_wrapp'>
                        <WavesButton
                            type="bag_link"
                            altClass="bag_link"
                            runAction={() => handleAddToCart(props.item) }
                            iconSize="23"
                        />
                    </div>
                </div>
            </div>
            <AddToCartHandler 
                modal={modal}
                errorType={error}
                handleClose={handleClose}
            />
        </div>
    );
};

export default Card;