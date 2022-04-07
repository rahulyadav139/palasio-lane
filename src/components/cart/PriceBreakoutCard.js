import './PriceBreakoutCard.css';
import { priceFormatter } from '../../utils';

const PriceBreakoutCard = ({ cart }) => {
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
      >
        Place Order
      </button>
    </div>
  );
};
export { PriceBreakoutCard };
