import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import api from './api';
import LoginSignup from './components/LoginSignup';
import AdsList from './components/AdsList';
import Wallet from './components/Wallet';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <h2>WatchAds</h2>
        <nav>
          <Link to="/">Home</Link> {' | '}
          <Link to="/wallet">Wallet</Link> {' | '}
          {user?.is_admin && <><Link to="/admin">Admin</Link> {' | '}</>}
          {user ? <button onClick={logout}>Logout</button> : <Link to="/auth">Login/Signup</Link>}
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<AdsList setUser={setUser} user={user}/>} />
          <Route path="/auth" element={<LoginSignup setUser={setUser}/>} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}
