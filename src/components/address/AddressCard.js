import './AddressCard.css';
import { useAuth, useFetch, useToast } from '../../hooks';

const AddressCard = props => {
  const { address, landmark, pin, state, district, _id } = props.address;
  const { updateAddress } = useAuth();
  const { sendData } = useFetch();
  const { setToast } = useToast();

  const editAddressHandler = () => {
    props.setManageAddress({
      showModal: true,
      updateAddress: true,
      address: props.address,
    });
  };

  const deleteAddressHandler = async () => {
    const { data, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/delete-address/${_id}`,
      'DELETE',
      {},
      true
    );

    if (error)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Something went wrong!',
      });

    updateAddress(data.addresses);

    setToast({
      status: true,
      type: 'success',
      message: 'Address deleted successfully!',
    });
  };
  return (
    <div className=" address-card shadow">
      <p>{`${address}, ${landmark}, ${district}, ${state}, ${pin} `}</p>

      <div className="address-card-actions">
        <button
          onClick={editAddressHandler}
          className="btn icon small circle primary"
        >
          <i class="fas fa-pen"></i>
        </button>

        <button
          onClick={deleteAddressHandler}
          className="btn icon small circle primary"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
export { AddressCard };
