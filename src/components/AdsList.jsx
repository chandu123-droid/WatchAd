import React, { useEffect, useState } from 'react';
import api from '../api';
import WatchAd from './WatchAd';

export default function AdsList({ user }) {
  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(()=>{
    async function load(){
      try {
        const { data } = await api.get('/api/ads');
        setAds(data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  if (!user) return <div>Please login to view ads.</div>;

  if (currentAd) {
    return <div>
      <button onClick={()=>setCurrentAd(null)}>Back to list</button>
      <WatchAd ad={currentAd} />
    </div>;
  }

  return (
    <div>
      <h3>Available Ads</h3>
      {ads.length === 0 && <p>No ads at the moment. Check later.</p>}
      <ul>
        {ads.map(a => (
          <li key={a.id} style={{ marginBottom: 12 }}>
            <b>{a.title}</b> — reward ₹{(a.reward_cents/100).toFixed(2)} — {a.duration_seconds}s
            <br/>
            <button onClick={()=>setCurrentAd(a)}>Watch</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
