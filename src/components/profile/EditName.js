import './EditEmail.css';
import { useInput, useFetch, useToast, useAuth } from '../../hooks';
import { textFormatter } from '../../utils';

const EditName = ({ onEdit }) => {
  const { sendData } = useFetch();
  const { setToast } = useToast();
  const { updateName } = useAuth();
  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInvalid,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInvalid,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const inValidClasses = 'input-field responsive error';
  const validClasses = 'input-field responsive';

  const firstNameClasses = firstNameIsInvalid ? inValidClasses : validClasses;

  const lastNameClasses = lastNameIsInvalid ? inValidClasses : validClasses;

  const submitFormHandler = async e => {
    e.preventDefault();

    if (!firstNameIsValid || !lastNameIsValid) {
      firstNameIsTouched(true);
      lastNameIsTouched(true);
      return;
    }

    const updatedName = `${textFormatter(firstName)} ${textFormatter(
      lastName
    )}`;

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/update-name`,
      'POST',
      { updatedName },
      true
    );

    if (error)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Something went wrong!',
      });

    setToast({
      status: true,
      type: 'success',
      message: 'Name updated successfully!',
    });

    updateName(updatedName);

    onEdit(prev => ({ ...prev, name: false }));
  };

  return (
    <div>
      <form onSubmit={submitFormHandler} className="form-update-email">
        <label htmlFor="firstName" className="text-bold">
          First Name
        </label>
        <input
          value={firstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          className={firstNameClasses}
          id="firstName"
          type="text"
        />
        <label htmlFor="lastName" className="text-bold">
          Last Name
        </label>
        <input
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          className={lastNameClasses}
          id="lastName"
          type="text"
        />
        <button type="submit" className="btn primary">
          Update Name
        </button>
        <button
          onClick={() => onEdit(prev => ({ ...prev, name: false }))}
          type="submit"
          className="btn primary outline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export { EditName };
