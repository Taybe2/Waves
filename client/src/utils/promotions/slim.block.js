import React from 'react';
import { WavesButton } from 'utils/tools';

const SlimPromotion = ({item}) => {

    const renderPromotion = () => (
        item ?
        <div className='slim_promotion_img'
            style={{
                background: `url(${item.img})`
            }}
        >
            <div className="tag title">{ item.lineOne }</div>
            <div className="tag low_title">{ item.lineTwo }</div>
            <div className='btn'>
                <WavesButton
                    type="default"
                    title={item.buttonTitle}
                    linkTo={item.buttonLink}
                />
            </div>
        </div>

        : null
    )

    return (
        <div className='slim_promotion'>
            { renderPromotion() }
        </div>
    )
};

export default SlimPromotion;