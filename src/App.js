import React, { useState } from 'react';
import useStore from './store/useStore';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Routine from './screens/Routine';
import Consumable from './screens/Consumable';
import Partner from './screens/Partner';
import Settings from './screens/Settings';
import NavBar from './components/NavBar';
import './App.css';

const SCREENS = { home: Home, routine: Routine, consumable: Consumable, partner: Partner, settings: Settings };

export default function App() {
  const { onboardingDone, activeTab } = useStore();
  const [splashDone, setSplashDone] = useState(false);
  const Screen = SCREENS[activeTab];

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <span className="status-icons">●●● 🔋</span>
        </div>
        <div className="screen-area">
          {splashDone && (!onboardingDone ? <Onboarding /> : <Screen />)}
        </div>
        {splashDone && onboardingDone ? <NavBar /> : <div style={{ height: 'var(--nav-height)', flexShrink: 0 }} />}
      </div>
    </div>
  );
}
