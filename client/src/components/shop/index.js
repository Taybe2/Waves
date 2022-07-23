import React, { useEffect, useState, useReducer } from 'react';
import CardBlocks from 'utils/products/cardBlocks';
import PaginationNav from 'utils/paginateNav';
import SearchBar from './searchBar';
import CollapseCheckbox from './collapseCheckbox';

import { useDispatch, useSelector } from 'react-redux';

import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';

import { productsPaginate } from 'store/actions/product.actions';
import { getAllBrands } from 'store/actions/brand.actions';
import RangeSelect from './rangeSelect';

const defaultValues = { keywords: '', brand: [], min: 0, max: 5000, frets: [], page: 1 };

const Shop = () => {
    const [grid, setGrid] = useState(false);

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues 
    )
    const brands = useSelector( state => state.brands);
    const { byPaginate } = useSelector(state => state.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    useEffect(() => {
        dispatch(productsPaginate(searchValues));
    }, [searchValues, dispatch]);

    const handleGrid = () => {
        setGrid(!grid);
    }

    const goToPage = (page) => {
        setSearchValues({ page: page });
    }

    const handleResetSearch = () => {
        setSearchValues({ keywords: '', page: 1 });
    }

    const handleSearch = (values) => {
        setSearchValues({ keywords: values, page: 1 });
    }

    const handleFilters = (values, category) => {
        if(category === 'brands') {
            setSearchValues({brand: values, page: 1});
        }
        if(category === 'frets') {
            setSearchValues({frets: values, page: 1});
        }
    }

    const handleRange = (values) => {
        setSearchValues({ min: values[0], max: values[1], page: 1 });
    }

    return (
        <div className='page_conainer'>
            <div className='page_top'>
                <div className='container'>
                    <SearchBar 
                        handleSearch={ (values) => handleSearch(values) }
                    />
                </div>
            </div>
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        <CollapseCheckbox 
                            initState={true}
                            title="Brands"
                            list={brands.all}
                            handleFilters={ (values) => handleFilters(values, 'brands')}
                        />
                        <CollapseCheckbox 
                            initState={false}
                            title="Frets"
                            list={[
                                { _id: 20, name: 20 },
                                { _id: 21, name: 21 },
                                { _id: 22, name: 22 },
                                { _id: 24, name: 24 }
                            ]}
                            handleFilters={ (values) => handleFilters(values, 'frets')}
                        />
                        <RangeSelect 
                            title="Price Range"
                            handleRange={(values) => handleRange(values)}
                        />
                    </div>
                    <div className='right'>
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                                { searchValues.keywords !== '' ?
                                    <div className='results-text'>
                                        <p>Search results for "{searchValues.keywords}"</p>
                                    </div>
                                : null}
                                <div className={`grid_btn ${grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOnIcon />
                                </div>
                                <div className={`grid_btn ${!grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOffIcon />
                                </div>
                            </div>
                            <div>
                                { byPaginate && byPaginate.docs ? 
                                    <>
                                        <CardBlocks grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                        <PaginationNav 
                                            prods={byPaginate}
                                            goToPage={(page) => goToPage(page)}
                                            resetSearch={() => handleResetSearch()}
                                        />
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;