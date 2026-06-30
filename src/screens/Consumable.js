import React, { useState } from 'react';
import useStore from '../store/useStore';
import './Consumable.css';

function getDdayLabel(c, t) {
  if (c.daysLeft <= 0) return `D${c.daysLeft} · ${t('dday-order')}`;
  if (c.daysLeft <= 7) return `D-${c.daysLeft} · ${t('dday-soon')}`;
  return `D-${c.daysLeft} · ${t('dday-ok')}`;
}
function getDdayCls(c) { return c.daysLeft <= 0 ? 'r' : c.daysLeft <= 7 ? 'o' : 'g'; }
function getBarCls(c) { return c.daysLeft <= 0 ? 'red' : c.daysLeft <= 7 ? 'orange' : 'green'; }
function getPct(c) { return Math.max(4, Math.min(100, Math.round((c.daysLeft / c.totalDays) * 100))); }

const CYCLE_OPTS = [7, 14, 20, 30, 45, 60];

export default function Consumable() {
  const { buyConsumable, updateCycle, addConsumable, t, lang } = useStore();
  const consumables = useStore(s => s.consumables) || t('consumables');
  const groups = t('con-groups');
  const [collapsed, setCollapsed] = useState({});
  const [buySheet, setBuySheet] = useState(null);
  const [cycleSheet, setCycleSheet] = useState(null);
  const [addSheet, setAddSheet] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGroupId, setNewGroupId] = useState(null);
  const [newCycleDays, setNewCycleDays] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast(s => ({ ...s, show: false })), 2400); };

  const closeAddSheet = () => {
    setAddSheet(false);
    setNewName('');
    setNewGroupId(null);
    setNewCycleDays(null);
  };

  const handleAdd = () => {
    if (!newName.trim() || !newGroupId || !newCycleDays) return;
    addConsumable(newName.trim(), newGroupId, newCycleDays);
    showToast(t('toast-added')(newName.trim()));
    closeAddSheet();
  };

  return (
    <div className="consumable-screen">
      <div className="screen-header"><h1>{t('con-hdr-title')}</h1><p>{t('con-hdr-sub')}</p></div>
      <div className="scroll-area">
        <div style={{ height: 14 }} />
        {groups.map(group => {
          const items = consumables.filter(c => c.group === group.id);
          if (items.length === 0) return null;
          return (
            <div key={group.id} className="room-card">
              <button className="room-header" onClick={() => setCollapsed(p => ({ ...p, [group.id]: !p[group.id] }))}>
                <span className="room-name">{group.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="room-count">{t('con-count')(items.length)}</span>
                  <i className={`ti ti-chevron-${collapsed[group.id] ? 'down' : 'up'}`} style={{ fontSize: 17, color: 'var(--ink4)' }} aria-hidden="true" />
                </div>
              </button>
              {!collapsed[group.id] && items.map(c => (
                <button key={c.id} className="con-item" onClick={() => setBuySheet(c)}>
                  <div className="con-item-top">
                    <span className="con-name">{c.name}</span>
                    <span className={`con-dday ${getDdayCls(c)}`}>{getDdayLabel(c, t)}</span>
                  </div>
                  <div className="progress-bar-bg" style={{ marginTop: 8 }}>
                    <div className={`progress-bar-fill ${getBarCls(c)}`} style={{ width: `${getPct(c)}%` }} />
                  </div>
                  <button className="con-cycle-btn" onClick={e => { e.stopPropagation(); setCycleSheet(c); }}>
                    {lang === 'ko' ? `주기: ${c.totalDays}일 · 탭해서 수정` : `Cycle: ${c.totalDays} days · Tap to edit`}
                  </button>
                </button>
              ))}
            </div>
          );
        })}
        <div style={{ padding: '12px 18px' }}>
          <button className="routine-add-btn" onClick={() => setAddSheet(true)}>
            {lang === 'ko' ? '+ 소모품 추가' : '+ Add item'}
          </button>
        </div>
      </div>

      {/* 소모품 추가 시트 */}
      {addSheet && (
        <div className="sheet-overlay" onClick={closeAddSheet}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{lang === 'ko' ? '소모품 추가' : 'Add Item'}</div>
            <input
              className="routine-name-input"
              placeholder={lang === 'ko' ? '소모품 이름을 입력해주세요' : 'Enter item name'}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
            />
            <p className="routine-section-label">{lang === 'ko' ? '카테고리 선택' : 'Select category'}</p>
            <div className="routine-room-list">
              {groups.map(group => (
                <button
                  key={group.id}
                  className={`routine-room-opt ${newGroupId === group.id ? 'selected' : ''}`}
                  onClick={() => setNewGroupId(group.id)}
                >
                  {group.label}
                </button>
              ))}
            </div>
            <p className="routine-section-label">{lang === 'ko' ? '구매 주기' : 'Purchase cycle'}</p>
            <div className="routine-cycle-grid">
              {CYCLE_OPTS.map(days => (
                <button
                  key={days}
                  className={`routine-cycle-opt ${newCycleDays === days ? 'selected' : ''}`}
                  onClick={() => setNewCycleDays(days)}
                >
                  {days}{t('cycle-unit')}
                </button>
              ))}
            </div>
            <button
              className="btn-primary routine-add-confirm"
              disabled={!newName.trim() || !newGroupId || !newCycleDays}
              onClick={handleAdd}
            >
              {lang === 'ko' ? '추가하기' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {buySheet && (
        <div className="sheet-overlay" onClick={() => setBuySheet(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{buySheet.name}</div>
            <div className="sheet-sub">{getDdayLabel(buySheet, t)}</div>
            <button className="btn-primary" onClick={() => { buyConsumable(buySheet.id); setBuySheet(null); showToast(t('toast-done')(buySheet.totalDays)); }}>{t('sheet-buy1')}</button>
            <button className="btn-secondary" onClick={() => setBuySheet(null)}>{t('sheet-buy2')}</button>
            <button className="btn-ghost" onClick={() => showToast(lang === 'ko' ? '날짜 직접 입력' : 'Enter date manually')}><span>{t('sheet-buy3')}</span></button>
          </div>
        </div>
      )}

      {cycleSheet && (
        <div className="sheet-overlay" onClick={() => setCycleSheet(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{lang === 'ko' ? `${cycleSheet.name} 주기 설정` : `${cycleSheet.name} cycle`}</div>
            <div className="sheet-sub">{t('cycle-current')(cycleSheet.totalDays)}</div>
            <div className="cycle-grid">
              {CYCLE_OPTS.map(d => (
                <button key={d} className={`cycle-opt ${cycleSheet.totalDays === d ? 'selected' : ''}`}
                  onClick={() => { updateCycle(cycleSheet.id, d); setCycleSheet(null); showToast(t('toast-cycle')(d)); }}>
                  {d}{t('cycle-unit')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </div>
  );
}
