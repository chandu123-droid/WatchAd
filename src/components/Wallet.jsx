import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Wallet(){
  const [balance, setBalance] = useState(0);

  async function load() {
    try {
      const { data } = await api.get('/api/me/wallet');
      setBalance(data.balance_cents || 0);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h3>Your Wallet</h3>
      <p>Balance: ₹{(balance/100).toFixed(2)}</p>
      <p>To withdraw, open the Withdraw page (admin will approve in this demo).</p>
    </div>
  );
}
