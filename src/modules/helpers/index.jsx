import Auth0Client from '../auth/Auth';

export const API_ROOT = 'http://localhost:3005/api';

export const callApi = (endpoint, options) => {
  const fetchOptions = !options ? {} : options;
  return new Promise((resolve, reject) => {
    Auth0Client.getToken().then((token) => {
      fetch(`${API_ROOT}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...fetchOptions,
      })
        .then((res, err) => {
          if (!res.ok) {
            reject(err);
          }
          return res;
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  });
};

export default callApi;
