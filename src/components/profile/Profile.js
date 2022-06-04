import './Profile.css';
import { useAuth } from '../../hooks';
import { EditEmail } from './EditEmail';
import { EditName } from './EditName';
import { useState } from 'react';

const Profile = props => {
  const { user, email } = useAuth();
  const [isEditing, setIsEditing] = useState({ email: false, name: false });

  return (
    <div className="flex col gap user-details">
      <div className="flex gap">
        <p className="text-bold">Name:</p>
        <p>{user}</p>
        <button
          onClick={() => setIsEditing({ email: false, name: true })}
          className="btn icon small primary"
        >
          <i className="fas fa-pen"></i>
        </button>
      </div>
      <div className="flex gap">
        <p className="text-bold">Email:</p>
        <p>{email}</p>
        <button
          onClick={() => setIsEditing({ email: true, name: false })}
          className="btn icon small primary"
        >
          <i className="fas fa-pen"></i>
        </button>
      </div>
      <div className="hr-line thin fad"></div>
      {isEditing.email && <EditEmail onEdit={setIsEditing} />}
      {isEditing.name && <EditName onEdit={setIsEditing} />}
    </div>
  );
};
export { Profile };
