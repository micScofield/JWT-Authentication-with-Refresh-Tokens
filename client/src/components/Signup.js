import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setEmail(e.target.value)}
        name={email}
        value={email}
      />
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        name={password}
        value={password}
      />

      <button
        onClick={async (e) => {
          e.preventDefault();
          const res = await axios.post('http://localhost:5000/api/users/signup', {
            email,
            password,
          });
          localStorage.setItem('refresh_token', res.data.refresh_token);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Signup;
