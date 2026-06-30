import React, { useState } from 'react';
import useStore from '../store/useStore';
import './Partner.css';

export default function Partner() {
  const { t } = useStore();
  const [toast, setToast] = useState({ show: false, msg: '' });
  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast(s => ({ ...s, show: false })), 2400); };

  return (
    <div className="partner-screen">
      <div className="screen-header"><h1>{t('partner-hdr-title')}</h1><p>{t('partner-hdr-sub')}</p></div>
      <div className="scroll-area">
        <div className="partner-hero">
          <i className="ti ti-link" style={{ fontSize: 52, color: 'var(--ink)', marginBottom: 16, display: 'block' }} aria-hidden="true" />
          <h2 className="partner-hero-title">{t('partner-hero-title')}</h2>
          <p className="partner-hero-sub">{t('partner-hero-sub')}</p>
        </div>
        <div className="partner-link-box">
          <p className="partner-link-label">{t('partner-link-lbl')}</p>
          <p className="partner-link-url">https://homeroute.app/invite/a3k9w</p>
        </div>
        <div style={{ padding: '0 18px' }}>
          <button className="btn-primary" onClick={() => showToast(t('toast-copy'))}>{t('partner-btn1')}</button>
          <button className="btn-secondary" onClick={() => showToast(t('toast-kakao'))}>{t('partner-btn2')}</button>
        </div>
        <div style={{ height: 14 }} />
        {t('partner-features').map(f => (
          <div key={f.title} className="partner-feat">
            <i className={`ti ${f.icon}`} aria-hidden="true" />
            <div><strong>{f.title}</strong><span>{f.sub}</span></div>
          </div>
        ))}
      </div>
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </div>
  );
}
