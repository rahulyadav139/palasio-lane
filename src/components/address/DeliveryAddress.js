import './DeliveryAddress.css';

const DeliveryAddress = ({ selectedAddress }) => {
  const { address, pin, state, district, landmark } = selectedAddress ?? {};

  return (
    <div className="delivery-address">
      <h5 className="heading-5">Delivery Address</h5>

      {selectedAddress ? (
        <div className="address-details">
          <div>
            <b>Address:</b> {`${address}, ${landmark}`}
          </div>
          <div>
            <b>Pin:</b> {pin}
          </div>
          <div>
            <b>State:</b> {state}
          </div>
          <div>
            <b>District:</b> {district}
          </div>
        </div>
      ) : (
        <p>No address selected</p>
      )}
    </div>
  );
};
export { DeliveryAddress };
