import './CouponsModal.css';
import { Modal } from '../ui/Modal';
import { CouponCard } from './CouponCard';
import couponsData from '../../data/coupons-data.json';

const CouponsModal = ({
  onSetCoupon,
  onModalAction,
  totalCartValue,
  onSetToast,
}) => {
  return (
    <Modal className="coupons-modal" onReset={onModalAction}>
      <h2>Coupons</h2>
      <div className="hr-line solid thin"></div>
      {couponsData.map(coupon => (
        <CouponCard
          onHide={onModalAction}
          onSetCoupon={onSetCoupon}
          coupon={coupon}
          totalCartValue={totalCartValue}
          onSetToast={onSetToast}
        />
      ))}
    </Modal>
  );
};
export { CouponsModal };
