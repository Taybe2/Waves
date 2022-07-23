const { Transaction } = require('../models/transaction');
const { User } = require('../models/user');

const paypalClient = require('../utils/ppclient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const addTransaction = async(req) => {
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(req.body.orderId);
    let order;

    try {
        order = await paypalClient.client.execute(request);
        const transaction = new Transaction({
            userId: req.user._id,
            userEmail: req.user.email,
            orderId: req.body.orderId,
            orderData: order.result
        });
        await transaction.save();
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            { "$push": {
                history: [
                    {
                        transactionId: transaction._id,
                        date: transaction.date,
                        orderId: req.body.orderId,
                        amount: transaction.orderData[0].purchase_units[0].amount.value,
                        items:  transaction.orderData[0].purchase_units[0].items
                    }
                ]
            }},
            { new: true }
        )
        
        return user;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    addTransaction
}