import axios from 'axios';

// allows cookie setting
axios.defaults.withCredentials = true;

// make call to refresh access token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  await axios.get('http://localhost:5000/api/access', {
    headers: {
      x_refresh_token: refresh_token,
    },
  });
};

export const reqInterceptor = axios.interceptors.request.use((request) => {
  return request;
});

export const resInterceptor = axios.interceptors.response.use(
  (response) => {
    console.log(
      'Inside response interceptor success block, response: ',
      response
    );

    return response;
  },
  async (error) => {
    console.log('Inside response interceptor, error block');

    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          try {
            // token refreshed, reattempting request;
            console.log('making request after refreshing access token...');
            await refreshToken();

            // configure new request in a new instance;
            return await axios({
              method: error.config.method,
              url: error.config.url,
              data: error.config.data,
            });
          } catch (e) {
            return Promise.reject(error);
          }
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // error.request is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
);
