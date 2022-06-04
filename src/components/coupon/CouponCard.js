import './CouponCard.css';
import { useState } from 'react';
import { useToast, useOrder } from '../../hooks';

const CouponCard = ({ onSetCoupon, coupon, onHide, orderValue }) => {
  const { setToast } = useToast();
  const [applyCoupon, setApplyCoupon] = useState('');
  const { title, description } = coupon;

  const applyCouponHandler = e => {
    if (orderValue < coupon.min) {
      return setToast({
        status: true,
        type: 'danger',
        message: `Cart value should be at-least ${coupon.min}`,
      });
    }

    onSetCoupon(coupon);
    setApplyCoupon(e.target.value);
    onHide();
  };

  return (
    <div className="coupon-card">
      <input
        onChange={applyCouponHandler}
        id={title}
        type="radio"
        name="coupon"
        value={title}
        checked={title === applyCoupon}
      />
      <label htmlFor={title}>
        <span className="heading-5">{title}</span> <br />
        {description}
      </label>
    </div>
  );
};
export { CouponCard };
