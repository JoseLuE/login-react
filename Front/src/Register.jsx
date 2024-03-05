import React, { useState } from 'react';  
import './estilos/register.css';

const register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, roles : [role], email}),
        });
    
        if (response.ok) {
          alert("Usuario creado con éxito")
            
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  return(
    <div className='container'>
      <h1 className='text-center mb-4'>REGISTRATION FORM</h1>
        <div className='form-group'>
          <label for="username" className='form-label fs-5 fw-bold'>USERNAME:</label>
          <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='form-control fs-5'
          placeholder='Enter username'
          id="username"
          />
        </div>
        <div className='form-group'>
          <label for="email" className='form-label fs-5 fw-bold'>EMAIL ADDRESS:</label>
          <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form-control fs-5'
          placeholder='Enter Email'
          id="email"
          />
          <div className='form-group'>
            <label for="password" className='form-label fs-5 fw-bold'>PASSWORD:</label>
            <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control fs-5'
            placeholder='Enter password'
            id="password"
            />
          </div>

          <div className='form-group'>
          <label for="opciones">Selecciona una opción:</label>
            <select id="Opciones" name="Opciones" onChange={(e) => setRole(e.target.value)}>
              <option value="user">user</option>
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleSubmit}>Sign up</button>
        </div>
    </div>
  )
}

export default register;