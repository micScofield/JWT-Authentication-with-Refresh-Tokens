import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

function App() {
  axios.defaults.withCredentials = true

  // axios interceptors
  const reqInterceptor = axios.interceptors.request.use((request) => {
    console.log('inside req interceptor', request);
    return request;
  });
  const resInterceptor = axios.interceptors.response.use(
    (response) => {
      console.log('inside response interceptor: ', response);

      // check for 401 and 400 and make request to refresh access token API
      return response;
    },
    (error) => {
      console.log('inside response interceptor, error: ', error);
      return Promise.reject(error);
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
      <button onClick={async(e) => {
        e.preventDefault();
        const res = await axios.get('http://localhost:5000/api/data');
      }}>Fetch Data</button>
    </Fragment>
  );
}

export default App;
