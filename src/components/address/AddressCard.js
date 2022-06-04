import './AddressCard.css';
import { useAuth, useFetch, useToast } from '../../hooks';

const AddressCard = ({
  address: userAddress,
  isDeleteButton,
  setManageAddress,
}) => {
  const { address, landmark, pin, state, district, _id } = userAddress;
  const { updateAddress } = useAuth();
  const { sendData } = useFetch();
  const { setToast } = useToast();

  const editAddressHandler = () => {
    setManageAddress({
      showModal: true,
      updateAddress: true,
      address: userAddress,
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
          <i className="fas fa-pen"></i>
        </button>

        {isDeleteButton && (
          <button
            onClick={deleteAddressHandler}
            className="btn icon small circle primary btn-delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};
export { AddressCard };
