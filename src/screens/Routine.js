import React, { useState } from 'react';
import useStore from '../store/useStore';
import './Routine.css';

const CYCLE_OPTS = [3, 7, 14, 30, 60, 90];

function formatCycle(days, lang) {
  return lang === 'ko' ? `${days}일마다` : `Every ${days} days`;
}

export default function Routine() {
  const { t, lang, customRoutineItems, addRoutineItem } = useStore();
  const [collapsed, setCollapsed] = useState({});
  const [cycleSheet, setCycleSheet] = useState(null);
  const [cycleOverrides, setCycleOverrides] = useState({});
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [addSheet, setAddSheet] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRoomId, setNewRoomId] = useState(null);
  const [newCycleDays, setNewCycleDays] = useState(null);

  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast(s => ({ ...s, show: false })), 2400); };

  const baseRoutines = t('routines');
  const routines = baseRoutines.map(room => ({
    ...room,
    items: [...room.items, ...customRoutineItems.filter(i => i.roomId === room.id)]
  }));

  const closeAddSheet = () => {
    setAddSheet(false);
    setNewName('');
    setNewRoomId(null);
    setNewCycleDays(null);
  };

  const handleAdd = () => {
    if (!newName.trim() || !newRoomId || !newCycleDays) return;
    addRoutineItem(newRoomId, newName.trim(), formatCycle(newCycleDays, lang));
    showToast(t('toast-added')(newName.trim()));
    closeAddSheet();
  };

  return (
    <div className="routine-screen">
      <div className="screen-header"><h1>{t('routine-hdr-title')}</h1><p>{t('routine-hdr-sub')}</p></div>
      <div className="scroll-area">
        <div style={{ height: 14 }} />
        {routines.map(room => (
          <div key={room.id} className="room-card">
            <button className="room-header" onClick={() => setCollapsed(p => ({ ...p, [room.id]: !p[room.id] }))}>
              <span className="room-name">{room.room}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="room-count">{t('routines-count')(room.items.length)}</span>
                <i className={`ti ti-chevron-${collapsed[room.id] ? 'down' : 'up'}`} style={{ fontSize: 17, color: 'var(--ink4)' }} aria-hidden="true" />
              </div>
            </button>
            {!collapsed[room.id] && room.items.map(item => (
              <div key={item.id} className="routine-item">
                <div className="routine-item-left">
                  <div className={`urgency-dot ${item.urgency}`} />
                  <span className="routine-item-name">{item.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="routine-cycle">{cycleOverrides[item.id] || item.cycle}</span>
                  <button className="routine-edit-btn" onClick={() => setCycleSheet(item)}>{t('edit-label')}</button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '12px 18px' }}>
          <button className="routine-add-btn" onClick={() => setAddSheet(true)}>
            {lang === 'ko' ? '+ 집안일 추가' : '+ Add chore'}
          </button>
        </div>
      </div>

      {addSheet && (
        <div className="sheet-overlay" onClick={closeAddSheet}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{lang === 'ko' ? '집안일 추가' : 'Add Chore'}</div>
            <input
              className="routine-name-input"
              placeholder={lang === 'ko' ? '집안일 이름을 입력해주세요' : 'Enter chore name'}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
            />
            <p className="routine-section-label">{lang === 'ko' ? '공간 선택' : 'Select room'}</p>
            <div className="routine-room-list">
              {baseRoutines.map(room => (
                <button
                  key={room.id}
                  className={`routine-room-opt ${newRoomId === room.id ? 'selected' : ''}`}
                  onClick={() => setNewRoomId(room.id)}
                >
                  {room.room}
                </button>
              ))}
            </div>
            <p className="routine-section-label">{lang === 'ko' ? '주기 설정' : 'Set cycle'}</p>
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
              disabled={!newName.trim() || !newRoomId || !newCycleDays}
              onClick={handleAdd}
            >
              {lang === 'ko' ? '추가하기' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {cycleSheet && (
        <div className="sheet-overlay" onClick={() => setCycleSheet(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">
              {lang === 'ko' ? `${cycleSheet.name} 주기 설정` : `${cycleSheet.name} cycle`}
            </div>
            <div className="sheet-sub">
              {lang === 'ko' ? `현재: ${cycleOverrides[cycleSheet.id] || cycleSheet.cycle}` : `Current: ${cycleOverrides[cycleSheet.id] || cycleSheet.cycle}`}
            </div>
            <div className="routine-cycle-grid">
              {CYCLE_OPTS.map(days => (
                <button
                  key={days}
                  className={`routine-cycle-opt ${cycleOverrides[cycleSheet.id] === formatCycle(days, lang) ? 'selected' : ''}`}
                  onClick={() => {
                    setCycleOverrides(prev => ({ ...prev, [cycleSheet.id]: formatCycle(days, lang) }));
                    setCycleSheet(null);
                    showToast(t('toast-cycle')(days));
                  }}
                >
                  {days}{t('cycle-unit')}
                </button>
              ))}
            </div>
            <button className="btn-secondary routine-sheet-close" onClick={() => setCycleSheet(null)}>
              {lang === 'ko' ? '닫기' : 'Close'}
            </button>
          </div>
        </div>
      )}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </div>
  );
}
