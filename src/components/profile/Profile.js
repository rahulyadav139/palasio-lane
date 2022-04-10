import './Profile.css';
import { useAuth } from '../../hooks';

const Profile = props => {
  const { user, email } = useAuth();
  return (
    <div className="flex col gap">
      <div className="flex gap">
        <p className="text-bold">Name:</p>
        <p>{user}</p>
      </div>
      <div className="flex gap">
        <p className="text-bold">Email:</p>
        <p>{email}</p>
      </div>
    </div>
  );
};
export { Profile };
