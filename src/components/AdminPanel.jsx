import React, { useEffect, useState } from 'react';
import api from '../api';

const defaultAd = { title:'', video_url:'', duration_seconds:30, reward_cents:100, max_views_per_user:5, category:'tech' };

export default function AdminPanel(){
  const [pending, setPending] = useState([]);
  const [ad, setAd] = useState(defaultAd);

  useEffect(()=>{ loadPending(); }, []);

  async function loadPending(){
    try {
      const { data } = await api.get('/api/admin/ads/pending');
      setPending(data);
    } catch (e) {
      console.error(e);
      alert('Admin access required');
    }
  }

  async function createAd(e){
    e.preventDefault();
    try {
      const payload = { ...ad };
      await api.post('/api/admin/ads', payload);
      alert('Created. Admin must approve.');
      setAd(defaultAd);
      loadPending();
    } catch (err) {
      alert(err.response?.data?.error || 'error');
    }
  }

  async function approve(id){
    await api.post(`/api/admin/ads/${id}/approve`);
    loadPending();
  }

  return (
    <div>
      <h3>Admin Panel</h3>
      <form onSubmit={createAd}>
        <input placeholder="title" value={ad.title} onChange={e=>setAd({...ad,title:e.target.value})} required/><br/>
        <input placeholder="video url" value={ad.video_url} onChange={e=>setAd({...ad,video_url:e.target.value})} required/><br/>
        <input placeholder="duration seconds" type="number" value={ad.duration_seconds} onChange={e=>setAd({...ad,duration_seconds:parseInt(e.target.value||0)})} required/><br/>
        <input placeholder="reward cents (100 = ₹1)" type="number" value={ad.reward_cents} onChange={e=>setAd({...ad,reward_cents:parseInt(e.target.value||0)})} required/><br/>
        <select value={ad.category} onChange={e=>setAd({...ad,category:e.target.value})}>
          <option value="tech">tech</option>
          <option value="education">education</option>
          <option value="games">games</option>
          <option value="shopping">shopping</option>
          <option value="finance">finance</option>
          <option value="lifestyle">lifestyle</option>
          <option value="general">general</option>
        </select><br/>
        <button type="submit">Create Ad (pending)</button>
      </form>

      <h4>Pending Ads</h4>
      <ul>
        {pending.map(p => (
          <li key={p.id}>
            <b>{p.title}</b> — {p.category} — <button onClick={()=>approve(p.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
