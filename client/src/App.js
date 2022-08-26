import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import Signup from './components/Signup';

import { reqInterceptor, resInterceptor } from './axios/axios'

function App() {
  useEffect(() => {
    return () => {
      console.log('Unmounting Interceptors !');
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const clickHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get('http://localhost:5000/api/data');
    console.log('Response from button handler', res?.data);
  };

  return (
    <Fragment>
      <Signup />
      <button onClick={(e) => clickHandler(e)}>Fetch Protected Data</button>
    </Fragment>
  );
}

export default App;
