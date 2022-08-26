import axios from 'axios'
import React, { Fragment, useEffect } from 'react'

function Dashboard() {
  
  const getData = async() => {
    const res = await axios.get('http://localhost:5000/api/data');
  }

  useEffect(() => { getData() }, [])

  return <Fragment>
    <h1>Hello from dashboard</h1>
  </Fragment>
}

export default Dashboard

