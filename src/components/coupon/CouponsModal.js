import './CouponsModal.css';
import { Modal } from '../ui/Modal';
import { CouponCard } from './CouponCard';
import couponsData from '../../data/coupons-data.json';
import { v4 as uuid } from 'uuid';

const CouponsModal = ({ onSetCoupon, onModalAction, orderValue }) => {
  return (
    <Modal className="coupons-modal" onReset={onModalAction}>
      <h2>Coupons</h2>
      <div className="hr-line solid thin"></div>
      {couponsData.map(coupon => (
        <CouponCard
          key={uuid()}
          onHide={onModalAction}
          onSetCoupon={onSetCoupon}
          coupon={coupon}
          orderValue={orderValue}
        />
      ))}
    </Modal>
  );
};
export { CouponsModal };
