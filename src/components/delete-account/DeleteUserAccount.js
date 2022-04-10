import './DeleteUserAccount.css';
import randomString from 'random-string';
import { useRef, useState } from 'react';
import { useToast, useFetch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const DeleteUserAccount = props => {
  const [deleteAccountCaptcha, setDeleteAccountCaptcha] = useState(
    randomString({ length: 8 })
  );
  const inputRef = useRef();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const { sendData } = useFetch();

  const userAccountDeleteHandler = async () => {
    const userInput = inputRef.current.value;

    if (userInput !== deleteAccountCaptcha) {
      setToast({
        status: true,
        type: 'danger',
        message: "Captcha doesn't match! try again",
      });

      setDeleteAccountCaptcha(randomString({ length: 8 }));
      return;
    }

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/delete-account`,
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

    navigate('/');
  };

  return (
    <div className="delete-confirmation-container">
      <h1 className="text-center">Delete Confirmation</h1>
      <p className="text-center">
        Once you delete your account, all of your information will be delete
        forever. We will not be able to restore your account. Are you sure you
        want to proceed?
      </p>
      <p className="text-center text-bold">
        Confirm by typing{' '}
        <span className="text-primary-dark">{deleteAccountCaptcha}</span> below
      </p>
      <input
        ref={inputRef}
        placeholder="Secret"
        onPaste={e => e.preventDefault()}
        className="input-field"
      />
      <button onClick={userAccountDeleteHandler} className="btn error">
        DELETE
      </button>
    </div>
  );
};
export { DeleteUserAccount };
