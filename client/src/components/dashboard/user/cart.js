import React, { useEffect, useState } from 'react';
import DashboardLayout from 'components/hoc/dashboardLayout';
import Loader from 'utils/loader';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import CartDetail from './cartDetail';
import { userRemoveFromCart, userPurchaseSuccess } from 'store/actions/user.actions';
import { PayPalButton } from 'react-paypal-button-v2'

const UserCart = ({users}) => {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeItem = (position) => {
        dispatch(userRemoveFromCart(position));
    }

    const calculateTotal = () => {
        let total = 0;
        users.cart.forEach(element => {
            total += parseInt(element.price, 10);
        });
        return total;
    }

    const generateUnits = () => (
        [{
            description: "Guitars and accessories",
            amount: {
                currency_code: "USD",
                value: calculateTotal(),
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: calculateTotal()
                    }
                }
            },
            items: generateItems()
        }]
    )

    const generateItems = () => {
        let items = users.cart.map((item) => (
            {
                unit_amount: {
                    currency_code: "USD",
                    value: item.price
                },
                quantity: 1,
                name: item.model
            }
        ))
        return items;
    }

    useEffect(() => {
        if(notifications && notifications.success) {
            navigate('/dashboard');
        }
        if(notifications && notifications.error) {
            setLoading(false);
        }
    }, [notifications, navigate]);

    return (
        <DashboardLayout title="Your Cart">
            { users.cart && users.cart.length > 0 ?
                    <>
                        <CartDetail 
                            products={users.cart}
                            removeItem={(position) => removeItem(position)}
                        />
                        <div className='user_cart_sum'>
                            <div>
                                Total Amount: ${calculateTotal()}
                                { loading ? 
                                        <Loader />
                                    :
                                        <div className='pp_button'>
                                            <PayPalButton 
                                                options={{
                                                    clientId: "ATVKKDpfLJZ2-njiZs0djpb-PnEplG_p-er7MQEeVk7doKcQX9NMdeZdvyGmhcYfK2rjcXfmjxlH__p4",
                                                    currency: "USD",
                                                    disableFunding: 'credit,card'
                                                }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: generateUnits()
                                                    })
                                                }}
                                                onSuccess={(details, data) => {
                                                    // console.log(details)
                                                    // console.log(data)
                                                    dispatch(userPurchaseSuccess(details.id));
                                                    setLoading(true);
                                                }}
                                                onCancel={(data) => {
                                                    setLoading(false);
                                                }}
                                            />
                                        </div>
                                }
                            </div>
                        </div>
                    </>
                :
                    <div>There is nothing in your cart</div>
            }
        </DashboardLayout>
    )
}

export default UserCart;