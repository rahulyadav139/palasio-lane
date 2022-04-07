import './PriceBreakoutCard.css';
import { priceFormatter } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../../hooks';

const PriceBreakoutCard = ({ cart }) => {
  const { setOrderDetails } = useOrder();

  const navigate = useNavigate();

  const cartItemsQty = cart.reduce((acc, el) => (acc += el.quantity), 0);

  const price = cart.reduce(
    (acc, el) => (acc += el.product.price * el.quantity),
    0
  );

  const discountedPrice = cart.reduce(
    (acc, el) =>
      (acc +=
        el.product.price * el.quantity * ((100 - el.product.discount) / 100)),
    0
  );
  const discount = price - discountedPrice;
  const tax = discountedPrice * 0.18;

  const shippingCharges = discountedPrice < 1000 ? discountedPrice * 0.1 : 0;

  const totalPrice = price - discount + tax + shippingCharges;

  const isAnyProductOutOfStock = cart.some(
    cartItem => cartItem.product.inStock === 0
  );

  const placeOrderButtonClasses = isAnyProductOutOfStock
    ? 'btn primary disable'
    : 'btn primary';

  const placeAnOrderHandler = async () => {
    let orderId;
    try {
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        headers: {
          Authorization: {
            username: process.env.REACT_APP_RAZORPAY_API_KEY,
            password: process.env.REACT_APP_RAZORPAY_API_SECRET,
          },
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          amount: 500,
          currency: 'INR',
          receipt: 'qwsaq1',
          partial_payment: true,
          first_payment_min_amount: 230,
        }),
      });

      const data = await res.json();

      setOrderDetails({
        price,
        discount,
        tax,
        shippingCharges,
        totalPrice,
        cartItemsQty,
        orderId: data.id,
      });

      navigate(`/checkout/${data.id}`);
    } catch (err) {
      console.log(err);
    }

    setOrderDetails({
      price,
      discount,
      tax,
      shippingCharges,
      totalPrice,
      cartItemsQty,
      orderId,
    });

    navigate(`/checkout/sdfgsfgs`);
  };
  return (
    <div className="price-breakout card shadow flex col">
      <div className="heading-5">PRICE DETAILS</div>
      <div className="hr-line solid grey"></div>
      <div className="flex space-between">
        <p className="text-small">{`Price (${cartItemsQty} items)`}</p>
        <p className="text-small">{priceFormatter(price)}</p>
      </div>
      <div className="flex space-between">
        <p className="text-small">Discount</p>
        <p className="text-small">{`- ${priceFormatter(discount)}`}</p>
      </div>
      <div className="flex space-between">
        <p className="text-small">Tax</p>
        <p className="text-small">{priceFormatter(tax)}</p>
      </div>
      <div className="flex space-between">
        <p className="text-small">Delivery Charges</p>
        <p className="text-small">{priceFormatter(shippingCharges)}</p>
      </div>
      <div className="hr-line solid grey"></div>
      <div className="flex space-between align-center">
        <p className="text-bold">TOTAL AMOUNT</p>
        <p className="text-bold">{priceFormatter(totalPrice)}</p>
      </div>
      <div className="hr-line solid grey"></div>
      <p>{`You will save ${priceFormatter(discount)} on this order`}</p>

      <button
        className={placeOrderButtonClasses}
        disabled={isAnyProductOutOfStock}
        onClick={placeAnOrderHandler}
      >
        Place Order
      </button>
    </div>
  );
};
export { PriceBreakoutCard };
