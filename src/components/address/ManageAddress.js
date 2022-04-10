import './ManageAddress.css';
import { Modal } from '../ui/Modal';
import { useState, useEffect } from 'react';
import { useFetch, useAuth } from '../../hooks';
import { textFormatter } from '../../utils';

const ManageAddress = ({
  onHide,
  updateAddress,
  address,
  setManageAddress,
  selectedAddress,
  setSelectedAddress,
}) => {
  const { sendData } = useFetch();
  const { updateAddress: updateAddressHandler } = useAuth();
  const [addressData, setAddressData] = useState(
    updateAddress
      ? address
      : {
          _id: '',
          address: '',
          landmark: '',
          pin: '',
          state: '',
          district: '',
        }
  );

  const pin = addressData.pin;

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      const district = data[0].PostOffice && data[0].PostOffice[0].District;
      const state = data[0].PostOffice && data[0].PostOffice[0].State;

      setAddressData(prev => ({ ...prev, state, district }));
    })();
  }, [pin]);

  const addressManageHandler = async e => {
    e.preventDefault();

    const { data } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/manage-address`,
      'POST',
      { addressData },
      true
    );

    updateAddressHandler(data.addresses);

    const deliveryAddress = data.addresses.find(
      address => address._id === selectedAddress?._id
    );

    setSelectedAddress(deliveryAddress);

    setManageAddress({
      showModal: false,
      updateAddress: false,
      address: '',
    });
  };

  return (
    <Modal onReset={onHide} className="address-modal">
      <h2>{updateAddress ? 'Update Address' : 'Add New Address'}</h2>
      <div className="hr-line solid thin"></div>
      <form onSubmit={addressManageHandler} className="new-address-form">
        <h4>Address</h4>
        <textarea
          onChange={e =>
            setAddressData(prev => ({
              ...prev,
              address: textFormatter(e.target.value),
            }))
          }
          className="input-field"
          rows={4}
          value={addressData.address}
        ></textarea>
        <h4>Landmark</h4>
        <input
          onChange={e =>
            setAddressData(prev => ({
              ...prev,
              landmark: textFormatter(e.target.value),
            }))
          }
          value={addressData.landmark}
          className="input-field"
          type="text"
        />
        <h4>Pin</h4>
        <input
          onChange={e =>
            setAddressData(prev => ({ ...prev, pin: e.target.value }))
          }
          value={addressData.pin}
          className="input-field"
          type="number"
        />
        <h4>State</h4>
        <div>{addressData.state}</div>
        <h4>District</h4>
        <div>{addressData.district}</div>
        <div className=" form-actions">
          <button onClick={onHide} type="button" className="btn outline error">
            Cancel
          </button>
          <button className="btn primary" type="submit">
            {updateAddress ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      <button onClick={onHide} className="btn-dismiss btn icon medium">
        <i className="fas fa-times"></i>
      </button>
    </Modal>
  );
};
export { ManageAddress };
