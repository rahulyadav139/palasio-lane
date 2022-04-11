import './OrderDetailsModal.css';
import { Modal } from '../ui/Modal';
import { priceFormatter } from '../../utils';

const OrderDetailsModal = ({ onReset, deliveryAddress, priceBreakout }) => {
  const { address, landmark, pin, state, district } = deliveryAddress;
  const {
    price,
    quantity,
    discount,
    couponDiscount,
    tax,
    deliveryCharges,
    orderValue,
  } = priceBreakout;

 

  return (
    <Modal onReset={onReset}>
      <div className="order-price-breakout-details">
        <h3>Shipping Address</h3>
        <div className="hr-line solid thin"></div>
        <div>
          <p>{`${address}, ${landmark}`}</p>
          <p>{`${district}, ${state}, ${pin}`}</p>
        </div>
        <h3>Price Breakout</h3>
        <div className="hr-line solid thin"></div>

        <div className="flex space-between">
          <p className="text-small">{`Price (${quantity} ${
            quantity > 1 ? 'items' : 'item'
          })`}</p>
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
          <p className="text-small">{priceFormatter(deliveryCharges)}</p>
        </div>
        <div className="flex space-between">
          <p className="text-small">Coupon Discount</p>
          <p className="text-small">{priceFormatter(-couponDiscount)}</p>
        </div>
        <div className="hr-line solid thin"></div>
        <div className="flex space-between align-center">
          <p className="text-bold">TOTAL AMOUNT</p>
          <p className="text-bold">{priceFormatter(orderValue)}</p>
        </div>
        <button onClick={onReset} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { OrderDetailsModal };
