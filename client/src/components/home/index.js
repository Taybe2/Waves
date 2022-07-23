import React, { useEffect } from 'react';
import SlimPromotion from 'utils/promotions/slim.block';
import Featured from './featured';
import Loader from 'utils/loader';

import { useDispatch, useSelector } from 'react-redux';
import { productsBySort } from 'store/actions/product.actions';

import CardBlocks from 'utils/products/cardBlocks';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    buttonTitle: 'Shop Now',
    buttonLink: '/shop'
};

const Home = () => {
    const { bySold, byDate } = useSelector( state => state.products );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsBySort({
            limit: 4, sortBy:'itemSold', order: 'asc'
        }));
        dispatch(productsBySort({
            limit: 4, sortBy:'date', order: 'asc'
        }));
    }, [dispatch]);

    return (
        <div>
            <Featured />

            { bySold ? 
                <CardBlocks 
                items={bySold}
                title="Best Selling Guitars"
                />
            : <Loader />
            }

            <SlimPromotion item={slimPromotion} />

            { byDate ? 
                <CardBlocks 
                items={byDate}
                title="Lastest Guitars on the Shop"
                />
            : <Loader />}

        </div>
    );
};

export default Home;