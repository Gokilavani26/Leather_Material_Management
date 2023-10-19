const stripe = require('stripe')('sk_test_51NxiJlSIDBjc3MxTfnzNXOleikZ2JTJmNT0eqseQIR1bSCLzzv246Eq6JBHIROzJAH7GIwTJHAYvMTAUgFi1AMiI006fmOIyj4');
const express = require('express');
const route = express.Router();
const payController = require("../controllers/payController");

route.post('/create-payment-intent', payController.createIntent);
route.post('/confrim-payment', payController.confrimPayment);

module.exports = route;
