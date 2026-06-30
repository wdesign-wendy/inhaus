import React from 'react';
import useStore from '../store/useStore';
import './NavBar.css';

const TAB_KEYS = ['home','routine','consumable','partner','settings'];
const TAB_ICONS = { home:'ti-home', routine:'ti-repeat', consumable:'ti-droplet', partner:'ti-users', settings:'ti-settings' };
const STR_KEYS = { home:'nb-home', routine:'nb-routine', consumable:'nb-con', partner:'nb-partner', settings:'nb-settings' };

export default function NavBar() {
  const { activeTab, setActiveTab, t } = useStore();
  return (
    <nav className="nav-bar">
      {TAB_KEYS.map(key => (
        <button key={key} className={`nav-item ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
          <i className={`ti ${TAB_ICONS[key]}`} aria-hidden="true" />
          <span>{t(STR_KEYS[key])}</span>
        </button>
      ))}
    </nav>
  );
}
