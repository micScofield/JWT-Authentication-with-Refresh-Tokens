import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

function App() {
  axios.defaults.withCredentials = true;

  // refresh access token
  const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    await axios.get('http://localhost:5000/api/access', {
      headers: {
        x_refresh_token: refresh_token
      }
    });
  };

  // axios interceptors
  const reqInterceptor = axios.interceptors.request.use((request) => {
    // console.log('inside req interceptor', request);
    return request;
  });
  const resInterceptor = axios.interceptors.response.use(
    (response) => {
      console.log('inside response interceptor: ', response);

      return response;
    },
    async (error) => {
      console.log('inside response interceptor, error block');

      if (error.response) {
        console.log('I should be here', error.response, error.request, error.config);
        const { status } = error.response;

        switch (status) {
          case 401:
            // token has expired;
            try {
              await refreshToken();
              // token refreshed, reattempting request;
              // configure new request in a new instance;
              console.log('making request after refreshing access token...')
              return await axios({
                method: error.config.method,
                url: error.config.url,
                data: error.config.data,
              });
            } catch (e) {
              // console.log(e);
              return alert('error');
            }
          default:
            return Promise.reject(error);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return Promise.reject(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject(error);
      }
    }
  );

  useEffect(() => {
    //unmount
    return () => {
      console.log('Unmounting Interceptors !');
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  // async function getData() {
  //   const res = await axios.get('http://localhost:5000', { withCredentials: true });
  //   console.log(res);
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Fragment>
      <Signup />
      <button
        onClick={async (e) => {
          e.preventDefault();
          const res = await axios.get('http://localhost:5000/api/data');
          console.log('response from button handler', res?.data)
        }}
      >
        Fetch Data
      </button>
    </Fragment>
  );
}

export default App;
