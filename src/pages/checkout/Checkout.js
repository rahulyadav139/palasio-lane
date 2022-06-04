import './Checkout.css';
import { Fragment, useState, useRef } from 'react';
import { ManageAddress, AddressCard, DeliveryAddress } from '../../components';
import { useAuth, useOrder, useToast, useFetch, useCart } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Checkout = props => {
  const { getUpdatedCart } = useCart();
  const navigate = useNavigate();
  const { sendData } = useFetch();
  const { addresses, user, email } = useAuth();
  const { setToast } = useToast();
  const { orderDetails } = useOrder();
  const { totalPrice: orderValue } = orderDetails;
  const { orderId } = useParams();

  const [manageAddress, setManageAddress] = useState({
    showModal: false,
    updateAddress: false,
    address: '',
  });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const selectDeliveryAddressHandler = e => {
    setSelectedAddress(JSON.parse(e.target.value));
  };

  const payNowHandler = () => {
    if (!selectedAddress)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Please choose a delivery address!',
      });

    const razorPayModal = new window.Razorpay({
      key: process.env.REACT_APP_RAZORPAY_API_KEY,
      amount: orderValue * 100,
      currency: 'INR',
      name: 'Palasio Lane',
      description: 'Test Transaction',
      order_id: orderId,
      handler: async res => {
        const { error } = await sendData(
          `${process.env.REACT_APP_BACKEND_URL}/admin/order`,
          'POST',
          {
            orderDetails,
            deliveryAddress: selectedAddress,
            transactionId: res.razorpay_payment_id,
            razorPayOrderId: res.razorpay_order_id,
          },
          true
        );

        if (error) {
          setToast({
            status: true,
            type: 'danger',
            message:
              'Order sent failed, money will be refunded in 2-3 working days',
          });
          return navigate('/cart');
        }

        getUpdatedCart([]);

        navigate('/profile/orders');
      },
      prefill: {
        name: user,
        email,
        contact: '9876543210',
      },
      notes: {
        address: 'Palasio Lane Corporate Office',
      },
      theme: {
        color: '#2b6777',
      },
    });

    razorPayModal.open();
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
              <div key={address._id}>
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
                    isDeleteButton={false}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-bold">No address available</p>
        )}
        <DeliveryAddress selectedAddress={selectedAddress} />

        <button onClick={payNowHandler} className="btn primary btn-pay-now">
          Pay Now
        </button>

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
