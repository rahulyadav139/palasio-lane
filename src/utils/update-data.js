import { useFetch } from '../hooks';

const updateData = async (dispatch, state, options) => {
  const { sendData } = useFetch();

  let error;

  const { url, method, body, authStatus } = options;

  try {
    await sendData(url, method, body, authStatus);
  } catch (err) {
    error = err;
  }
};
