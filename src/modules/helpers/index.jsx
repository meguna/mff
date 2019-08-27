import HashId from 'hashids';
import Auth0Client from '../auth/Auth';

export const API_ROOT = 'http://localhost:3010/api';

export const callApi = (endpoint, options) => {
  return new Promise((resolve, reject) => {
    Auth0Client.getToken().then((token) => {
      /* combine headers from options parameter */
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (options && options.headers) {
        headers = Object.assign({}, headers, options.headers);
      }
      /* combine all fetch options, including headers */
      let fetchOptions = { headers };
      if (options) {
        fetchOptions = Object.assign({}, options, { headers });
      }
      fetch(`${API_ROOT}${endpoint}`, fetchOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res;
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch((err) => {
          if (err.code !== 'login_required') {
            console.error(err);
            reject(err);
          }
        });
    })
      .catch((err) => {
        if (err.code !== 'login_required') {
          console.error(err);
          reject(err);
        }
      });
  });
};

export const hs = new HashId('Mood for Food', 5);
