import React from 'react';
import Carousel from 'utils/carousel';

const Featured = () => {

    const carouselItems = [
        {
            img: '/images/featured/featured_home.jpg',
            lineOne: 'Fender',
            lineTwo: 'Custom shop',
            buttonTitle: 'Shop Now',
            buttonLink: '/shop'
        },
        {
            img: '/images/featured/featured_home_2.jpg',
            lineOne: 'B-Stock',
            lineTwo: 'Awesome discounts',
            buttonTitle: 'View Offers',
            buttonLink: '/shop'
        },
        {
            img: '/images/featured/featured_home_3.jpg',
            lineOne: 'Fender',
            lineTwo: 'Custom shop',
            buttonTitle: 'Shop Now',
            buttonLink: '/shop'
        }
    ]

    return (
        <div className="featured_container">
            <Carousel items={carouselItems} />
        </div>
    );
};

export default Featured;