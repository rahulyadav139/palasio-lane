import './Checkout.css';
import { Fragment, useState, useRef } from 'react';
import { ManageAddress, AddressCard, CouponsModal } from '../../components';
import { useAuth, useOrder, useToast } from '../../hooks';
import couponsData from '../../data/coupons-data.json';
import { priceFormatter, razorPayOption } from '../../utils';

const Checkout = props => {
  const { addresses } = useAuth();
  const { setToast } = useToast();
  const {
    orderDetails: {
      price,
      discount,
      tax,
      shippingCharges,
      cartItemsQty,
      totalPrice,
      orderId,
    },
  } = useOrder();

  const [manageAddress, setManageAddress] = useState({
    showModal: false,
    updateAddress: false,
    address: '',
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isCouponsModal, setIsCouponsModal] = useState(false);
  const [coupon, setCoupon] = useState({ discount: 0 });
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const couponInput = useRef();

  const selectDeliveryAddressHandler = e => {
    setSelectedAddress(JSON.parse(e.target.value));
  };

  const showCouponsModalHandler = () => {
    setIsCouponsModal(prev => !prev);
  };

  const applyCouponHandler = () => {
    setInvalidCoupon(false);

    const couponValue = couponInput.current.value;

    const couponApplied = couponsData.find(
      coupon => coupon.title === couponValue.toUpperCase()
    );

    if (!couponApplied) {
      return setInvalidCoupon(true);
    } else {
      totalPrice < couponApplied.min
        ? setToast({
            status: true,
            type: 'danger',
            message: `Cart value should be atleast ${couponApplied.min}`,
          })
        : setCoupon(couponApplied);
    }
  };

  const removeCouponHandler = () => {
    setCoupon({ discount: 0 });
  };

  const payNowHandler = () => {
    // const rzp1 = new Razorpay({
    //   ...razorPayOption,
    //   amount: `'${totalPrice}'`,
    //   order_id: orderId,
    // });
    // rzp1.open();
  };

  return (
    <Fragment>
      <main className="main">
        <div className="heading-4">Checkout</div>
        <div className="hr-line fad"></div>
        <div className="flex space-between align-center">
          <div className="heading-5">Select an Address</div>
          <button
            onClick={() =>
              setManageAddress(prev => ({
                ...prev,
                showModal: true,
                updateAddress: false,
              }))
            }
            className={
              addresses.length === 5 ? 'btn primary disable' : 'btn primary'
            }
            disabled={addresses.length === 5}
          >
            Add New Address
          </button>
        </div>
        {addresses.length !== 0 ? (
          <div className="addresses-container">
            {addresses.map(address => (
              <div>
                <input
                  id={address._id}
                  type="radio"
                  name="delivery-address"
                  value={JSON.stringify(address)}
                  onChange={selectDeliveryAddressHandler}
                  checked={address._id === selectedAddress?._id}
                />
                <label htmlFor={address._id}>
                  <AddressCard
                    setManageAddress={setManageAddress}
                    address={address}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-bold">No address available</p>
        )}
        <div className="delivery-address">
          <h5 className="heading-5">Delivery Address</h5>

          {selectedAddress ? (
            <div className="address-details">
              <div>
                <b>Address:</b> {selectedAddress.address}
              </div>
              <div>
                <b>Pin:</b> {selectedAddress.pin}
              </div>
              <div>
                <b>State:</b> {selectedAddress.state}
              </div>
              <div>
                <b>District:</b> {selectedAddress.district}
              </div>
            </div>
          ) : (
            <p>No address selected</p>
          )}
        </div>
        <div>
          <h5 className="heading-5">Order Summary</h5>
          <div className="order-summary">
            <div className="order-summary__data">
              <div className="flex space-between">
                <p className=" text-bold">Price (items: {cartItemsQty})</p>
                <p>{priceFormatter(price + tax)}</p>
              </div>
              <div className="flex space-between">
                <p className=" text-bold">Discount</p>
                <p>{priceFormatter(-discount)}</p>
              </div>
              <div className="flex space-between">
                <p className=" text-bold">Delivery</p>
                <p>{priceFormatter(shippingCharges)}</p>
              </div>
              <div className="flex space-between">
                <p className=" text-bold">Coupon Discount</p>
                <p>{priceFormatter(-coupon.discount)}</p>
              </div>
              <div className="hr-line solid thin"></div>
              <div className="flex space-between">
                <p className="text-large text-bold">Sub Total</p>
                <p className="text-large text-bold">
                  {priceFormatter(totalPrice - coupon.discount)}
                </p>
              </div>
            </div>
            <div className="flex col">
              <div className="flex gap space-around align-center">
                <p className="heading-5">Coupon</p>
                {!coupon.title ? (
                  <input ref={couponInput} className="input-field" />
                ) : (
                  <div className="coupon-container">
                    <p className="coupon">{coupon.title}</p>
                  </div>
                )}

                <button
                  onClick={
                    coupon.title ? removeCouponHandler : applyCouponHandler
                  }
                  className="btn outline primary"
                >
                  {coupon.title ? 'Remove' : 'Apply'}
                </button>
              </div>
              {invalidCoupon && (
                <p className="invalid-coupon-msg">Invalid coupon!</p>
              )}
              <p
                onClick={() => setIsCouponsModal(true)}
                className="text-center text-small text-bold btn-choose-coupons"
              >
                Choose Coupons
              </p>
            </div>
          </div>
        </div>
        <button onClick={payNowHandler} className="btn primary btn-pay-now">
          Pay Now
        </button>

        {isCouponsModal && (
          <CouponsModal
            onSetCoupon={setCoupon}
            onModalAction={showCouponsModalHandler}
            totalCartValue={totalPrice}
            onSetToast={setToast}
          />
        )}

        {manageAddress.showModal && (
          <ManageAddress
            updateAddress={manageAddress.updateAddress}
            address={manageAddress.address}
            setManageAddress={setManageAddress}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onHide={() =>
              setManageAddress({
                showModal: false,
                updateAddress: false,
                address: '',
              })
            }
          />
        )}
      </main>
    </Fragment>
  );
};
export { Checkout };
