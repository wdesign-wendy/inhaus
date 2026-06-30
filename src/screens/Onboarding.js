import React, { useState } from 'react';
import useStore from '../store/useStore';
import './Onboarding.css';

export default function Onboarding() {
  const [page, setPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [riItems, setRiItems] = useState(null);
  const [addInput, setAddInput] = useState('');
  const { setOnboardingDone, t, lang } = useStore();

  const getRiItems = () => riItems || t('ri-default').map(n => ({ name: n, sel: true, date: null, custom: false }));
  const items = getRiItems();

  const finish = () => setOnboardingDone(selectedRoom);

  const goP3 = () => {
    setRiItems(t('ri-default').map(n => ({ name: n, sel: true, date: null, custom: false })));
    setPage(3);
  };

  const toggleItem = (i) => {
    const next = [...items];
    next[i] = { ...next[i], sel: !next[i].sel, date: next[i].sel ? null : next[i].date };
    setRiItems(next);
  };

  const setDate = (i, v) => {
    const next = [...items]; next[i] = { ...next[i], date: v }; setRiItems(next);
  };

  const removeItem = (i) => setRiItems(items.filter((_, idx) => idx !== i));

  const addItem = (name) => {
    if (!name.trim() || items.find(it => it.name === name)) return;
    setRiItems([...items, { name, sel: true, date: null, custom: true }]);
    setAddInput('');
  };

  const sel = items.filter(it => it.sel);
  const dated = sel.filter(it => it.date);
  const summaryDate = dated.length === 0 ? t('ri-summary-none')
    : dated.length < sel.length ? `${dated.length}/${sel.length}`
    : t('ri-summary-done');

  const dateOpts = t('ri-date-opts');
  const quickList = t('ri-quick');
  const existing = items.map(it => it.name);

  return (
    <div className="ob-screen">
      {page === 1 && (
        <div className="ob-page ob-scroll">
          <div className="ob-hero">
            <div className="ob-emoji">🏠</div>
            <h1 className="ob-title">{t('ob-title')}</h1>
            <p className="ob-sub">{t('ob-sub')}</p>
          </div>
          <div className="ob-step">
            <p className="ob-label">{t('ob-q-label')}</p>
            {t('room-options').map(opt => (
              <button key={opt.id} className={`room-opt ${selectedRoom === opt.id ? 'selected' : ''}`} onClick={() => setSelectedRoom(opt.id)}>
                <span className="room-emoji">{opt.emoji}</span>
                <div><strong>{opt.title}</strong><span>{opt.sub}</span></div>
              </button>
            ))}
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setPage(2)}>{t('btn-see-routines')}</button>
            <button className="btn-ghost" onClick={finish}>{t('btn-skip')}</button>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="ob-page ob-scroll">
          <div className="ob-inner-pad">
            <div className="ob-progress"><div className="ob-dot done" /><div className="ob-dot done" /><div className="ob-dot" /></div>
            <p className="ob-label">{t('ob2-label')}</p>
            <h2 className="ob-h2">{t('ob2-title')}</h2>
            <p className="ob-sub2">{t('ob2-sub')}</p>
          </div>
          <div className="ob-cards-pad">
            {t('ob2-routines').map(group => (
              <div className="routine-preview-card" key={group.title}>
                <div className="rpc-title">{group.emoji} {group.title}</div>
                {group.items.map(item => (
                  <div className="rpc-item" key={item}><i className="ti ti-check" aria-hidden="true" /><span>{item}</span></div>
                ))}
              </div>
            ))}
          </div>
          <div className="ob-bottom-pad">
            <button className="btn-primary" onClick={goP3}>{t('btn-reg-con')}</button>
            <button className="btn-ghost" onClick={finish}>{t('btn-skip-now')}</button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="ob-page ob-p3">
          <div className="ob-p3-header">
            <div className="ob-progress"><div className="ob-dot done" /><div className="ob-dot done" /><div className="ob-dot done" /></div>
            <h2 className="ob-h2">{t('ob3-title')}</h2>
            <p className="ob-sub2">{t('ob3-sub')}</p>
          </div>
          <div className="ob-scroll-mid">
            <div className="ri-summary-bar">
              <span>{sel.length}{lang === 'ko' ? '개 항목 등록 중' : ' items'}</span>
              <span className="ri-summary-date">{summaryDate}</span>
            </div>
            {items.map((item, i) => (
              <div key={item.name + i} className={`ri-card ${item.sel ? 'checked' : 'unchecked'}`}>
                <div className="ri-top" onClick={() => toggleItem(i)}>
                  <div className={`ri-checkbox ${item.sel ? 'on' : ''}`}>{item.sel && <i className="ti ti-check" aria-hidden="true" />}</div>
                  <span className="ri-name">{item.name}</span>
                  {item.custom && <button className="ri-delete" onClick={e => { e.stopPropagation(); removeItem(i); }}><i className="ti ti-x" aria-hidden="true" /></button>}
                </div>
                {item.sel && (
                  <div className="ri-date-row">
                    {dateOpts.map(opt => {
                      const isSel = item.date === opt.value;
                      const any = item.date !== null;
                      return (
                        <button key={opt.value} className={`ri-date-btn ${isSel ? 'active-' + opt.cls : any ? 'dimmed' : ''}`}
                          onClick={e => { e.stopPropagation(); setDate(i, opt.value); }}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="ri-add-section">
              <div className="ri-add-row">
                <input className="ri-add-input" type="text" placeholder={t('ri-placeholder')} maxLength={20}
                  value={addInput} onChange={e => setAddInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addItem(addInput)} />
                <button className="ri-add-btn" disabled={!addInput.trim()} onClick={() => addItem(addInput)}>
                  <i className="ti ti-plus" aria-hidden="true" />
                </button>
              </div>
              <div className="ri-chips">
                {quickList.map(name => (
                  <button key={name} className={`ri-chip ${existing.includes(name) ? 'added' : ''}`}
                    disabled={existing.includes(name)} onClick={() => addItem(name)}>
                    {existing.includes(name) ? '✓' : '+'} {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="ob-p3-bottom">
            <button className="btn-primary" onClick={finish}>{t('btn-finish')}</button>
            <button className="btn-ghost" onClick={finish}>{t('btn-skip-now')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
