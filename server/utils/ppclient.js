const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
//if in production
//let enviroment = new paypal.core.LiveEnvironment(clientId, clientSecret);

let client = new paypal.core.PayPalHttpClient(environment);

module.exports = {
    client
}