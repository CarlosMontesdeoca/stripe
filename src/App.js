
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';

const stripePromise = loadStripe("pk_test_51JbdbNA38POr8zD9O7Kepgp0aywqhYaTYZlEtXiFRtalsesEPFWNoWDKatGqccKYIM8dZyqXFU4EFwai8qy2Gd0z00RLMwwc25")

const CheckoutForm = () => {

  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element.getElement(CardElement)
    });

    if (!error) {
      console.log(paymentMethod)

      const { id } = paymentMethod;

      const { data } = await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
      });

      console.log(data);

      element.getElement(CardElement).clear();
    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">
    <img 
      src="https://www.autobild.es/sites/autobild.es/public/dc/fotos/Lamborghini_Huracan_STO09_0.jpg" 
      alt="lanborgini" 
      className="img-fluid"
    />

    <h3 className="text-center my-2"> precio: 100$</h3>

    <div className="form-group">
      <CardElement className="form-control"/>
    </div>
    <button className="btn btn-success">
      Comprar
    </button>
  </form>
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4.offset-md-4">
            <CheckoutForm/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
