import React, { useState } from 'react';
import './RegisterItems.css';

const DEFAULT_ITEMS = ['세탁세제', '섬유유연제', '주방세제', '휴지', '욕실세정제', '쓰레기봉투'];
const QUICK_SUGGESTIONS = ['샴푸', '린스', '바디워시', '치약', '면도기', '스펀지', '락스', '청소포', '손세정제'];

const DATE_OPTS = [
  { label: '일주일 내', value: 'week',    cls: 'green' },
  { label: '2주 전',   value: '2week',   cls: 'blue' },
  { label: '한 달 전', value: 'month',   cls: 'blue' },
  { label: '모름',     value: 'unknown', cls: 'blue' },
];

export default function RegisterItems() {
  const [items, setItems] = useState(
    DEFAULT_ITEMS.map(name => ({ name, selected: true, date: null, custom: false }))
  );
  const [inputVal, setInputVal] = useState('');

  const toggle = (i) => setItems(prev =>
    prev.map((it, idx) => idx === i ? { ...it, selected: !it.selected, date: it.selected ? null : it.date } : it)
  );

  const setDate = (i, val) => setItems(prev =>
    prev.map((it, idx) => idx === i ? { ...it, date: val } : it)
  );

  const addItem = (name) => {
    const trimmed = name.trim();
    if (!trimmed || items.find(it => it.name === trimmed)) return;
    setItems(prev => [...prev, { name: trimmed, selected: true, date: null, custom: true }]);
    setInputVal('');
  };

  const removeItem = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));

  const sel = items.filter(it => it.selected);
  const dated = sel.filter(it => it.date);
  const summaryDate = dated.length === 0
    ? '날짜를 선택해주세요'
    : dated.length < sel.length
      ? `${dated.length}/${sel.length} 날짜 선택됨`
      : '모두 선택 완료 ✓';

  const existingNames = items.map(it => it.name);

  return (
    <div className="register-items">
      <div className="ri-summary-bar">
        <span>{sel.length}개 항목 등록 중</span>
        <span className="ri-summary-date">{summaryDate}</span>
      </div>

      {items.map((item, i) => (
        <div key={item.name + i} className={`ri-card ${item.selected ? 'checked' : 'unchecked'}`}>
          <div className="ri-top" onClick={() => toggle(i)}>
            <div className={`ri-checkbox ${item.selected ? 'on' : ''}`}>
              {item.selected && <i className="ti ti-check" aria-hidden="true" />}
            </div>
            <span className="ri-name">{item.name}</span>
            {item.custom && (
              <button className="ri-delete" onClick={e => { e.stopPropagation(); removeItem(i); }}>
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            )}
          </div>
          {item.selected && (
            <div className="ri-date-row">
              {DATE_OPTS.map(opt => {
                const isSel = item.date === opt.value;
                const anySelected = item.date !== null;
                let cls = 'ri-date-btn';
                if (isSel) cls += ` active-${opt.cls}`;
                else if (anySelected) cls += ' dimmed';
                return (
                  <button
                    key={opt.value}
                    className={cls}
                    onClick={e => { e.stopPropagation(); setDate(i, opt.value); }}
                  >
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
          <input
            className="ri-add-input"
            type="text"
            placeholder="직접 추가할 소모품 이름"
            maxLength={20}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem(inputVal)}
          />
          <button
            className="ri-add-btn"
            disabled={!inputVal.trim()}
            onClick={() => addItem(inputVal)}
          >
            <i className="ti ti-plus" aria-hidden="true" />
          </button>
        </div>
        <div className="ri-chips">
          {QUICK_SUGGESTIONS.map(name => (
            <button
              key={name}
              className={`ri-chip ${existingNames.includes(name) ? 'added' : ''}`}
              onClick={() => addItem(name)}
              disabled={existingNames.includes(name)}
            >
              + {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
