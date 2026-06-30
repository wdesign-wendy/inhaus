import React, { useEffect, useState } from 'react';
import logo from '../assets/inhaus_logo.svg';
import './Splash.css';

export default function Splash({ onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // fade in
    const t1 = setTimeout(() => setVisible(true), 100);
    // fade out then call onDone
    const t2 = setTimeout(() => setVisible(false), 2000);
    const t3 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`splash ${visible ? 'visible' : ''}`}>
      <div className="splash-inner">
        <img src={logo} alt="IN HAUS" className="splash-logo" />
        <p className="splash-tagline">The start of organized<br />home living.</p>
      </div>
    </div>
  );
}
