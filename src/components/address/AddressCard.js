import './AddressCard.css';

const AddressCard = props => {
  const { address, landmark, pin, state, district, _id } = props.address;

  const editAddressHandler = () => {
    props.setManageAddress({
      showModal: true,
      updateAddress: true,
      address: props.address,
    });
  };
  return (
    <div className=" address-card shadow">
      <p>{`${address}, ${landmark}, ${district}, ${state}, ${pin} `}</p>
      {/* <div>
        <b>Address:</b> {`${address} ${landmark}`}
      </div>
      <div>
        <b>Pin:</b> {pin}
      </div>
      <div>
        <b>State:</b> {state}
      </div>
      <div>
        <b>District:</b> {district}
      </div> */}
      <div className="address-card-actions">
        <button
          onClick={editAddressHandler}
          className="btn icon medium primary"
        >
          <i class="fas fa-pen-square"></i>
        </button>
      </div>
    </div>
  );
};
export { AddressCard };
