import Stripe from "stripe";
import * as Yup from "yup";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);

  return total ;
};

class CreatePaymentIntentController {
  async store(request, response) {
    // Validação com Yup
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          })
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ errors: err.errors });
    }

    const { products } = request.body;

    // Calcula o valor total
    const amount = calculateOrderAmount(products);

    try {
      // Cria o PaymentIntent no Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "brl",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return response.status(200).json({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      });
    } catch (err) {
      console.error("Stripe Error:", err);
      return response.status(500).json({ error: "Stripe API error", details: err.message });
    }
  }
}

export default new CreatePaymentIntentController();
