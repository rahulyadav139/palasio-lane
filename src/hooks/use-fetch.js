import { useAuth, useLoading, useToast } from './index';
import { useCallback } from 'react';

const useFetch = () => {
  const { setLoading } = useLoading();
  const { token, logoutHandler } = useAuth();
  const { setToast } = useToast();

  const sendData = useCallback(
    async (url, method, body, authStatus = false) => {
      let data, error, status;
      const headers = !authStatus
        ? { 'Content-Type': 'application/json' }
        : {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };

      const apiCallOptions =
        method === 'DELETE'
          ? {
              method,
              headers,
            }
          : {
              method,
              headers,
              body: JSON.stringify(body),
            };

      try {
        setLoading(true);
        const res = await fetch(url, apiCallOptions);

        if (res.status === 400) {
          logoutHandler();
          setToast({
            status: true,
            type: 'loading',
            message: 'You logged out!',
          });

          document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
          setLoading(false);
          return;
        }

        status = res.status;

        data = await res.json();

        setLoading(false);
      } catch (err) {
        error = err;
        console.log(err);
        setLoading(false);
      }

      return { status, data, error };
    },
    [token]
  );

  const getData = useCallback(
    async (url, authStatus = false) => {
      let status, data, error;
      const options = !authStatus
        ? {}
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

      try {
        setLoading(true);
        const res = await fetch(url, options);

        if (res.status === 400) {
          logoutHandler();
          setToast({
            status: true,
            type: 'loading',
            message: 'You logged out!',
          });
          document.cookie = `token=,expires=${new Date()}`;
          setLoading(false);
          return;
        }

        status = res.status;

        data = await res.json();
        setLoading(false);
      } catch (err) {
        error = err;
        console.log(err);
        setLoading(false);
      }

      return { data, error, status };
    },
    [token]
  );

  return { sendData, getData };
};

export { useFetch };
