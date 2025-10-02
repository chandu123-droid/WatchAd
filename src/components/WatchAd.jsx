import React, { useRef, useEffect, useState } from 'react';
import api from '../api';

export default function WatchAd({ ad }) {
  const videoRef = useRef();
  const [impressionId, setImpressionId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    // start impression when component mounts
    async function start() {
      try {
        const { data } = await api.post(`/api/ads/${ad.id}/start`);
        setImpressionId(data.impressionId);
      } catch (e) {
        console.error(e);
        setMsg('Failed to start impression');
      }
    }
    start();
  }, [ad.id]);

  const onEnded = async () => {
    try {
      const watched_seconds = Math.floor(videoRef.current.currentTime);
      const { data } = await api.post(`/api/ads/${ad.id}/complete`, { impressionId, watched_seconds });
      if (data.status === 'completed') {
        setMsg(`Reward credited: ₹${(data.reward_cents/100).toFixed(2)}`);
      } else {
        setMsg('Not enough watched time — no reward.');
      }
    } catch (e) {
      console.error(e);
      setMsg('Error reporting completion.');
    }
  };

  return (
    <div>
      <h4>{ad.title} — reward ₹{(ad.reward_cents/100).toFixed(2)}</h4>
      <video ref={videoRef} width="720" controls onEnded={onEnded}>
        <source src={ad.video_url} />
        Your browser does not support video.
      </video>
      <p>{msg}</p>
    </div>
  );
}
