import React from 'react';
import Card from './card'

const CardBlocks = ({ items, title, shop, grid }) => {

    const renderCards = () => (
        items ?
            items.map((item) => (
                <Card 
                    key={item._id}
                    item={item}
                    grid={grid}
                />
            ))
        : null
    );

    return (
        <div className={ shop ? 'card_block_shop' : 'card_block' }>
            <div className={ shop ? '' : 'container' }>
                {
                    title ?
                    <div className="title">{title}</div>
                    : null
                }
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                { renderCards() }
            </div>
        </div>
    )
}

export default CardBlocks;