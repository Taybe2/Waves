import React, { useEffect, useState  } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from 'store/actions/product.actions';
import { clearCurrentProduct } from 'store/actions';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from 'react-bootstrap';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Loader from 'utils/loader';
import ProductInfo from './productInfo';
import { renderCardImage } from 'utils/tools';

const ProductDetail = () => {
    const [modal, setModal] = useState(false);
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
    };

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const params = useParams();

    const handleClose = () => setModal(false);

    const handleCarousel = () => {
        if(products.byId.images.length > 0){
            setModal(true);
        }
    }

    useEffect(() => {
        dispatch(getProductById(params.id))
    }, [dispatch, params.id]);

    useEffect(() => {
        return() => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])

    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    Product Detail
                </div>
            </div>
            <div className='container'>
                { products && products.byId ?
                    <div className='product_detail_wrapper'>
                        <div className='left'>
                            <div>
                                <img 
                                    alt={`Images for ${products.byId.model}`}
                                    src={renderCardImage(products.byId.images)}
                                    onClick={() => handleCarousel()}
                                />
                            </div>
                        </div>
                        <div className='right'>
                            <ProductInfo 
                                detail={products.byId}
                            />
                        </div>
                    </div>
                    :
                    <Loader />
                }
            </div>
            <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Slider {...sliderSettings}>
                        { products.byId && products.byId.images ?
                                products.byId.images.map((item) => (
                                    <div key={item} style={{margin: '0 auto'}}>
                                        <div className='img-block'
                                            style={{
                                                background: `url(${item.url}) no-repeat`
                                            }}></div>
                                    </div>
                                ))
                            :
                                null
                        }
                    </Slider>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductDetail;