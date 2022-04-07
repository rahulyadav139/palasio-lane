import './CouponCard.css';
import { useState } from 'react';

const CouponCard = ({
  onSetCoupon,
  coupon,
  onHide,
  totalCartValue,
  onSetToast,
}) => {
  const [applyCoupon, setApplyCoupon] = useState('');
  const { title, description } = coupon;

  const applyCouponHandler = e => {
    if (totalCartValue < coupon.min) {
      return onSetToast({
        status: true,
        type: 'danger',
        message: `Cart value should be atleast ${coupon.min}`,
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
