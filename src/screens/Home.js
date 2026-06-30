import React, { useState } from 'react';
import useStore from '../store/useStore';
import logo from '../assets/inhaus_logo.svg';
import './Home.css';

function getDdayLabel(c, t) {
  if (c.daysLeft <= 0) return `D${c.daysLeft} · ${t('dday-order')}`;
  if (c.daysLeft <= 7) return `D-${c.daysLeft} · ${t('dday-soon')}`;
  return `D-${c.daysLeft} · ${t('dday-ok')}`;
}
function getDdayCls(c) { return c.daysLeft <= 0 ? 'urgent' : c.daysLeft <= 7 ? 'soon' : 'ok'; }
function getBarCls(c) { return c.daysLeft <= 0 ? 'red' : c.daysLeft <= 7 ? 'orange' : 'green'; }
function getPct(c) { return Math.max(4, Math.min(100, Math.round((c.daysLeft / c.totalDays) * 100))); }

export default function Home() {
  const { choreDone, toggleChore, buyConsumable, lang, t } = useStore();
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast(s => ({ ...s, show: false })), 2400);
  };

  const chores = t('chores');
  const consumables = useStore(s => s.consumables) || t('consumables');
  const urgentChores = chores.filter((_, i) => !choreDone[i] && (chores[i].urgency === 'red' || chores[i].urgency === 'orange')).length;
  const urgentCons = consumables.filter(c => c.daysLeft <= 0).length;
  const visibleCons = consumables.filter(c => c.daysLeft <= 10).slice(0, 4);

  return (
    <div className="home-screen">
      <div className="home-top">
        <img src={logo} alt="IN HAUS" className="home-logo" />
        <h1 className="home-title">{t('home-title')}</h1>
      </div>

      <div className="scroll-area">
        <div className="today-row">
          <div className="today-item today-item--chore">
            <div className="today-num today-num--chore">{urgentChores}</div>
            <div className="today-lbl">{t('chore-lbl')}</div>
          </div>
          <div className="today-item today-item--order">
            <div className="today-num today-num--order">{urgentCons}</div>
            <div className="today-lbl">{t('order-lbl')}</div>
          </div>
        </div>

        <p className="section-label">{t('sl-chores')}</p>
        {chores.map((chore, i) => (
          <button
            key={chore.id}
            className={`chore-card ${choreDone[i] ? 'done' : ''}`}
            onClick={() => { toggleChore(i); if (!choreDone[i]) showToast(t('toast-chore-done')); }}
          >
            <div className={`urgency-dot ${chore.urgency}`} />
            <div className="chore-info">
              <div className="chore-name">{chore.name}</div>
              <div className="chore-sub">{chore.sub}</div>
            </div>
            <div className={`chore-check ${choreDone[i] ? 'checked' : ''}`}>
              {choreDone[i] && <i className="ti ti-check" aria-hidden="true" />}
            </div>
          </button>
        ))}

        {visibleCons.length > 0 && (
          <>
            <p className="section-label" style={{ marginTop: 16 }}>{t('sl-order')}</p>
            {visibleCons.map(c => (
              <button key={c.id} className="con-strip" onClick={() => setSheet(c)}>
                <div className="con-strip-row">
                  <span className="con-strip-name">{c.name}</span>
                  <span className={`badge ${getDdayCls(c)}`}>{getDdayLabel(c, t)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${getBarCls(c)}`} style={{ width: `${getPct(c)}%` }} />
                </div>
              </button>
            ))}
          </>
        )}
        <div style={{ height: 14 }} />
      </div>

      {sheet && (
        <div className="sheet-overlay" onClick={() => setSheet(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{sheet.name}</div>
            <div className="sheet-sub">{getDdayLabel(sheet, t)}</div>
            <button className="btn-primary" onClick={() => {
              buyConsumable(sheet.id);
              setSheet(null);
              showToast(t('toast-done')(sheet.totalDays));
            }}>{t('sheet-buy1')}</button>
            <button className="btn-secondary" onClick={() => setSheet(null)}>{t('sheet-buy2')}</button>
            <button className="btn-ghost" onClick={() => showToast(lang === 'ko' ? '날짜 직접 입력 보조 옵션' : 'Enter date manually')}>
              <span>{t('sheet-buy3')}</span>
            </button>
          </div>
        </div>
      )}

      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </div>
  );
}
