const router = require("express").Router();
const Product = require("../models/Product.model");

const stripe = require("stripe")(''); // ! su llave de stripe secreta aqui

// GET "/products" to get all products
router.get("/", async (req, res, next) => {
  try {
    const response = await Product.find()
    res.status(200).json(response)
  } catch(err) {
    next(err)
  }
})

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;

  console.log(item)
  const response = await Product.findById(item._id)
  console.log(response)

  const priceToPay = response.price * 100 // siempre en centimos

  // podrían crear un documento de un model Transaction que esté pendiente

  // aqui buscamos el precio real en nuestra BD

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: priceToPay,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router;