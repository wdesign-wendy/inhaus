import React, { useState } from 'react';
import useStore from '../store/useStore';
import './Settings.css';

export default function Settings() {
  const { notifications, toggleNotification, setActiveTab, t, lang, setLang } = useStore();
  const [langSheet, setLangSheet] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast(s => ({ ...s, show: false })), 2400); };

  return (
    <div className="settings-screen">
      <div className="scroll-area">
        <div className="settings-profile">
          <div className="settings-avatar">나</div>
          <div><div className="settings-name">{t('settings-nm')}</div><div className="settings-type">{t('settings-tp')}</div></div>
        </div>

        <p className="section-label">{t('sl-noti')}</p>
        <div className="settings-section">
          {[
            { key: 'dailyAlert', nameKey: 's-noti1', subKey: 's-noti1-sub', icon: 'ti-bell' },
            { key: 'consumableAlert', nameKey: 's-noti2', subKey: 's-noti2-sub', icon: 'ti-shopping-cart' },
            { key: 'doNotDisturb', nameKey: 's-noti3', subKey: 's-noti3-sub', icon: 'ti-moon' },
          ].map(item => (
            <div key={item.key} className="settings-item">
              <div className="settings-item-left">
                <i className={`ti ${item.icon}`} aria-hidden="true" />
                <div><div className="settings-item-name">{t(item.nameKey)}</div><div className="settings-item-sub">{t(item.subKey)}</div></div>
              </div>
              <div className={`toggle ${notifications[item.key] ? 'on' : ''}`} onClick={() => toggleNotification(item.key)}><div className="toggle-thumb" /></div>
            </div>
          ))}
        </div>

        <p className="section-label">{t('sl-house')}</p>
        <div className="settings-section">
          <div className="settings-item" onClick={() => showToast(t('toast-house'))}>
            <div className="settings-item-left"><i className="ti ti-home-2" aria-hidden="true" /><div><div className="settings-item-name">{t('s-house1')}</div><div className="settings-item-sub">{t('s-house1-sub')}</div></div></div>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </div>
          <div className="settings-item" onClick={() => setActiveTab('routine')}>
            <div className="settings-item-left"><i className="ti ti-repeat" aria-hidden="true" /><div><div className="settings-item-name">{t('s-house2')}</div><div className="settings-item-sub">{t('s-house2-sub')}</div></div></div>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </div>
        </div>

        <p className="section-label">{t('sl-lang')}</p>
        <div className="settings-section">
          <div className="settings-item" onClick={() => setLangSheet(true)}>
            <div className="settings-item-left"><i className="ti ti-language" aria-hidden="true" /><div><div className="settings-item-name">{t('s-lang-name')}</div><div className="settings-item-sub">{t('s-lang-sub')}</div></div></div>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </div>
        </div>

        <p className="section-label">{t('sl-etc')}</p>
        <div className="settings-section">
          <div className="settings-item" onClick={() => showToast('v1.0.0 (MVP)')}>
            <div className="settings-item-left"><i className="ti ti-info-circle" aria-hidden="true" /><div><div className="settings-item-name">{t('s-etc1')}</div></div></div>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </div>
          <div className="settings-item" onClick={() => showToast(t('toast-feedback'))}>
            <div className="settings-item-left"><i className="ti ti-message" aria-hidden="true" /><div><div className="settings-item-name">{t('s-etc2')}</div></div></div>
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>

      {langSheet && (
        <div className="sheet-overlay" onClick={() => setLangSheet(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{t('lang-sheet-title')}</div>
            <div className="sheet-sub" />
            <div className="lang-grid">
              <button className={`lang-opt ${lang === 'en' ? 'selected' : ''}`}
                onClick={() => { setLang('en'); setLangSheet(false); showToast('Language changed'); }}>
                🇺🇸 {t('lang-en')}
              </button>
              <button className={`lang-opt ${lang === 'ko' ? 'selected' : ''}`}
                onClick={() => { setLang('ko'); setLangSheet(false); showToast('언어가 변경됐어요'); }}>
                🇰🇷 {t('lang-ko')}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </div>
  );
}
