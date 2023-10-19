const stripe = require('stripe')('sk_test_51NxiJlSIDBjc3MxTfnzNXOleikZ2JTJmNT0eqseQIR1bSCLzzv246Eq6JBHIROzJAH7GIwTJHAYvMTAUgFi1AMiI006fmOIyj4');
const createIntent = async (req, res) => {
    console.log('Received POST request at /payment/create-payment-intent/');
  try {
    const { supplierId, amount, accountNumber, paymentMethod } = req.body;
    console.log("Processing payment...");
    let paymentIntent;

    if (paymentMethod === 'card') {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,  
        currency: 'inr',  
        description: 'Payment for supplier', 
        metadata: {
          supplierId: supplierId,
          accountNumber: accountNumber,
        },
      });

      if (paymentIntent.status === 'requires_payment_method') {
        console.log(paymentIntent);
        return res.status(200).json({ success: true, paymentIntent });
      }
    } else if (paymentMethod === 'other_method') {
   }    
    console.log("Processing completed.");
    res.status(400).json({ success: false, error: 'Invalid payment method or payment processing error.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const confrimPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
        console.log("Confrimation Initialized in backend");
    
        if (paymentIntent.status === 'succeeded') { 
          console.log("SuccesFull Payment")
          res.status(200).json({ success: true });
        } else {
          console.log("Payment Failed...")
          res.status(400).json({ success: false, error: 'Payment confirmation failed' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

module.exports = {
    createIntent,
    confrimPayment,
  };
  