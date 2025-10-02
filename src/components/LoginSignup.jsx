import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup({ setUser }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const { data } = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        const { data } = await api.post('/api/auth/signup', { email, password, display_name: displayName });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h3>{mode === 'login' ? 'Login' : 'Sign up'}</h3>
      <form onSubmit={submit}>
        {mode === 'signup' && <div>
          <label>Display name</label><br/>
          <input value={displayName} onChange={e=>setDisplayName(e.target.value)} />
        </div>}
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      <p>
        <button onClick={()=>setMode(mode==='login'?'signup':'login')}>Switch to {mode==='login'?'signup':'login'}</button>
      </p>
    </div>
  )
}
