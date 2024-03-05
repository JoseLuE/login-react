import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './estilos/login.css';

const Login=()=>{
  const navigate = useNavigate();
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  
  const handleSubmit = async () => {
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem("token", res.accessToken);
        console.log("Rol:",res)
        if (res.roles.includes("ROLE_USER")) {
          navigate("/user");     
        } else if (res.roles.includes("ROLE_MODERATOR")) {
          navigate("/moderator");     
        } else if (res.roles.includes("ROLE_ADMIN")) {
          navigate("/admin");     
        }
      } else {
        const errorData = await response.json();
        console.error('Error inicio sesión:');
      }
    } catch (error) {
      console.error('Error en la solicitud:');
    }
  };
   
     
  return (
      <div className='container'>
        <h1 className='text-center mb-4'>Login</h1>
          <div className='form-group'>
            <label for="username" className='form-label fs-5 fw-bold'>USERNAME:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className='form-control fs-5'
              placeholder='Enter username'
              id="username"
            />
          </div>
          <div className='form-group'>
            <div className='form-group'>
              <label for="password" className='form-label fs-5 fw-bold'>PASSWORD:</label>
              <input 
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='form-control fs-5'
                placeholder='Enter password'
                id="password"
              />
            </div>
          </div>
          <button onClick={handleSubmit}>Sign in</button>
      </div>
    )
  
}

export default Login;