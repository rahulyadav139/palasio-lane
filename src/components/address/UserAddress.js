import './UserAddress.css';
import { useState } from 'react';
import { ManageAddress } from './ManageAddress';
import { AddressCard } from './AddressCard';
import { useAuth } from '../../hooks';

const UserAddress = props => {
  const { addresses } = useAuth();
  const [manageAddress, setManageAddress] = useState({
    showModal: false,
    updateAddress: false,
    address: '',
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  return (
    <div className="user-address-container">
      <div className="flex end ">
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
      {addresses.map(address => (
        <AddressCard setManageAddress={setManageAddress} address={address} />
      ))}
      {addresses.length === 0 && (
        <p className="no-address-msg">No address available!</p>
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
    </div>
  );
};
export { UserAddress };
