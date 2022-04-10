import './PriceBreakoutCard.css';
import { priceFormatter } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useOrder, useToast, useFetch } from '../../hooks';
import { useState, useRef } from 'react';
import couponsData from '../../data/coupons-data.json';
import { CouponsModal } from '../coupon/CouponsModal';

const PriceBreakoutCard = ({ cart }) => {
  const [isCouponsModal, setIsCouponsModal] = useState(false);
  const [coupon, setCoupon] = useState({ discount: 0 });
  const { setOrderDetails } = useOrder();
  const { setToast } = useToast();
  const { sendData } = useFetch();
  const couponInput = useRef();

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

  const totalPrice = price - discount - coupon.discount + tax + shippingCharges;

  const isAnyProductOutOfStock = cart.some(
    cartItem => cartItem.product.inStock === 0
  );

  const placeOrderButtonClasses = isAnyProductOutOfStock
    ? 'btn primary disable'
    : 'btn primary';

  const placeAnOrderHandler = async () => {
    const { data, status, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/checkout`,
      'POST',
      { orderValue: totalPrice.toFixed(2) },
      true
    );

    if (error) return;

    if (status === 404) return navigate('/cart');

    setOrderDetails({
      price: price.toFixed(2),
      discount: discount.toFixed(2),
      cartItemsQty,
      deliveryCharges: shippingCharges.toFixed(2),
      tax: tax.toFixed(2),
      couponDiscount: coupon.discount,
      totalPrice: totalPrice.toFixed(2),
    });

    const { orderId } = data;

    navigate(`/checkout/${orderId}`);
  };

  const applyCouponHandler = () => {
    const couponValue = couponInput.current.value.trim();

    if (!couponValue) return;

    const couponApplied = couponsData.find(
      coupon => coupon.title === couponValue.toUpperCase()
    );

    if (!couponApplied)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Invalid coupon!',
      });

    totalPrice < couponApplied.min
      ? setToast({
          status: true,
          type: 'danger',
          message: `Cart value should be at-least ${couponApplied.min}`,
        })
      : setCoupon(couponApplied);
  };

  const removeCouponHandler = () => {
    setCoupon({ discount: 0 });
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
      <div className="flex space-between">
        <p className="text-small">Coupon Discount</p>
        <p className="text-small">{priceFormatter(-coupon.discount)}</p>
      </div>
      <div className="hr-line solid grey"></div>
      <div className="flex space-between align-center">
        <p className="text-bold">TOTAL AMOUNT</p>
        <p className="text-bold">{priceFormatter(totalPrice)}</p>
      </div>
      <div className="hr-line solid grey"></div>
      <p>{`You will save ${priceFormatter(
        discount + coupon.discount
      )} on this order`}</p>

      <button
        className={placeOrderButtonClasses}
        disabled={isAnyProductOutOfStock}
        onClick={placeAnOrderHandler}
      >
        Place Order
      </button>
      <p className="heading-5">COUPON</p>
      <div className="coupon-container">
        {!coupon.title ? (
          <input
            placeholder="Coupon"
            ref={couponInput}
            className="input-field"
          />
        ) : (
          <div className="coupon-chip-container">
            <p className="coupon">{coupon.title}</p>
          </div>
        )}
        <button
          onClick={coupon.title ? removeCouponHandler : applyCouponHandler}
          className="btn outline primary"
        >
          {coupon.title ? 'Remove' : 'Apply'}
        </button>
      </div>
      <p onClick={() => setIsCouponsModal(true)} className="choose-coupon-text">
        choose coupons
      </p>
      {isCouponsModal && (
        <CouponsModal
          onSetCoupon={setCoupon}
          onModalAction={() => setIsCouponsModal(prev => !prev)}
          orderValue={totalPrice}
        />
      )}
    </div>
  );
};
export { PriceBreakoutCard };
