import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const STRINGS = {
  en: {
    'ob-title': 'Know what to clean\nand order today',
    'ob-sub': 'Tell us your home type and we will build your routine',
    'ob-q-label': 'What type of home do you live in?',
    'ro1-title': 'Studio / Officetel', 'ro1-sub': 'Living & bedroom in one space',
    'ro2-title': '1.5 Room', 'ro2-sub': 'Bedroom slightly separated',
    'ro3-title': '2+ Bedroom', 'ro3-sub': 'Two or more separate rooms',
    'btn-see-routines': 'See recommended routines →',
    'btn-skip': 'Skip',
    'ob2-label': 'Auto-recommended routines',
    'ob2-title': 'Here is your routine',
    'ob2-sub': 'You can change these anytime',
    'btn-reg-con': 'Register consumables →',
    'ob3-title': 'When did you last buy these?',
    'ob3-sub': 'Checked items only · Set cycle later',
    'ri-placeholder': 'Add a consumable',
    'btn-finish': 'Done — Go to home',
    'btn-skip-now': 'Skip for now',
    'home-greeting': 'Good morning 👋',
    'home-title': "Today's tasks",
    'sl-chores': 'Chores', 'sl-order': 'To order',
    'chore-lbl': "Today's chores", 'order-lbl': 'Items to order',
    'routine-hdr-title': 'Routines', 'routine-hdr-sub': 'Customize your cleaning schedule',
    'con-hdr-title': 'Consumables', 'con-hdr-sub': 'Tap to mark as bought or set cycle',
    'partner-hdr-title': 'Invite partner', 'partner-hdr-sub': 'Switch to 2-person home with one link',
    'partner-hero-title': 'Share chores with your partner',
    'partner-hero-sub': 'View routines & consumables together\nand split the work',
    'partner-link-lbl': 'Invite link',
    'partner-btn1': 'Copy link', 'partner-btn2': 'Share via KakaoTalk',
    'settings-nm': 'Single household', 'settings-tp': 'Studio · Using alone',
    'sl-noti': 'Notifications', 'sl-house': 'Home settings', 'sl-lang': 'App language', 'sl-etc': 'Other',
    's-noti1': 'Daily chore reminder', 's-noti1-sub': 'Every morning at 9 AM',
    's-noti2': 'Low stock alert', 's-noti2-sub': '3 days before running out',
    's-noti3': 'Do not disturb', 's-noti3-sub': '10 PM – 8 AM',
    's-house1': 'Home type', 's-house1-sub': 'Studio / Officetel',
    's-house2': 'Manage routines', 's-house2-sub': '8 routines active',
    's-lang-name': 'Language', 's-lang-sub': 'English',
    's-etc1': 'App info', 's-etc2': 'Send feedback',
    'nb-home': 'Home', 'nb-routine': 'Routine', 'nb-con': 'Supplies', 'nb-partner': 'Partner', 'nb-settings': 'Settings',
    'lang-sheet-title': 'App Language',
    'lang-en': 'English', 'lang-ko': '한국어',
    'sheet-buy1': '🛒 Bought today', 'sheet-buy2': 'Buy later', 'sheet-buy3': 'Enter different date →',
    'toast-copy': 'Link copied 📋', 'toast-kakao': 'Share via KakaoTalk',
    'toast-radd': 'Add routine feature coming soon',
    'toast-house': 'Change home type', 'toast-feedback': 'Thanks for your feedback 💌',
    'toast-lang': 'Language changed', 'toast-finish': "You're all set 🎉",
    'ri-default': ['Laundry detergent','Fabric softener','Dish soap','Toilet paper','Bathroom cleaner','Trash bags'],
    'ri-quick': ['Shampoo','Conditioner','Body wash','Toothpaste','Razor','Sponge','Bleach','Cleaning wipes','Hand soap'],
    'ri-date-opts': [
      {label:'This week', value:'week', cls:'green'},
      {label:'2 wks ago', value:'2week', cls:'blue'},
      {label:'A month ago', value:'month', cls:'blue'},
      {label:'Not sure', value:'unknown', cls:'blue'},
    ],
    'ri-summary-none': 'Select dates',
    'ri-summary-done': 'All set ✓',
    'chores': [
      {id:0, name:'Clean bathroom', sub:'D+12 · Last: 14 days ago', urgency:'red'},
      {id:1, name:'Recycling', sub:'Collection day today', urgency:'red'},
      {id:2, name:'Vacuum', sub:'D+3 · Twice a week', urgency:'orange'},
      {id:3, name:'Wipe sink', sub:'D-2 · Still on time', urgency:'green'},
    ],
    'consumables': [
      {id:1, name:'Laundry detergent', daysLeft:-3, totalDays:30, group:'laundry'},
      {id:2, name:'Toilet paper', daysLeft:-1, totalDays:14, group:'bathroom'},
      {id:3, name:'Dish soap', daysLeft:8, totalDays:20, group:'kitchen'},
      {id:4, name:'Fabric softener', daysLeft:15, totalDays:30, group:'laundry'},
      {id:5, name:'Bathroom cleaner', daysLeft:20, totalDays:45, group:'bathroom'},
      {id:6, name:'Trash bags', daysLeft:5, totalDays:21, group:'other'},
    ],
    'con-groups': [
      {id:'kitchen', label:'🍳 Kitchen'},
      {id:'bathroom', label:'🚿 Bathroom'},
      {id:'laundry', label:'🧺 Laundry'},
      {id:'other', label:'📦 Other'},
    ],
    'con-count': n => `${n} items`,
    'routines': [
      { id:1, room:'🧹 Living · Bedroom', items:[{id:11,name:'Vacuum',cycle:'Twice/week',urgency:'red'},{id:12,name:'Mop',cycle:'Once/week',urgency:'orange'},{id:13,name:'Dust',cycle:'Once/week',urgency:'green'}]},
      { id:2, room:'🚿 Bathroom', items:[{id:21,name:'Toilet & sink',cycle:'Once/week',urgency:'red'},{id:22,name:'Floor',cycle:'Once/week',urgency:'orange'}]},
      { id:3, room:'🍳 Kitchen', items:[{id:31,name:'Wipe sink',cycle:'Twice/week',urgency:'orange'},{id:32,name:'Stove',cycle:'Biweekly',urgency:'green'},{id:33,name:'Recycling',cycle:'Wed · Sat',urgency:'red'}]},
    ],
    'partner-features': [
      {icon:'ti-checks', title:'Shared routines', sub:"See your partner's progress in real time"},
      {icon:'ti-user-check', title:'Divide tasks', sub:'Assign each chore to someone'},
      {icon:'ti-bell', title:'Joint alerts', sub:'Get notified together when items run low'},
    ],
    'room-options': [
      {id:1, emoji:'🛏', title:'Studio / Officetel', sub:'Living & bedroom in one space'},
      {id:2, emoji:'🛋', title:'1.5 Room', sub:'Bedroom slightly separated'},
      {id:3, emoji:'🏡', title:'2+ Bedroom', sub:'Two or more separate rooms'},
    ],
    'ob2-routines': [
      {emoji:'🧹', title:'Living · Bedroom', items:['Vacuum — Twice/week','Mop — Once/week','Dust — Once/week']},
      {emoji:'🚿', title:'Bathroom', items:['Toilet & sink — Once/week','Floor — Once/week']},
      {emoji:'🍳', title:'Kitchen', items:['Wipe sink — Twice/week','Stove — Biweekly','Recycling — Wed · Sat']},
    ],
    'edit-label': 'Edit', 'routines-count': n => `${n} routines`, 'cycle-unit': 'd',
    'con-add-placeholder': 'Add consumable',
    'dday-order': 'Order now!', 'dday-soon': 'Almost time', 'dday-ok': 'Plenty left',
    'cycle-current': d => `Current: every ${d} days`,
    'cycle-sheet-suffix': 'cycle',
    'toast-done': d => `Done! Next reminder in ${d} days 🛒`,
    'toast-cycle': d => `Cycle set to ${d} days`,
    'toast-chore-done': 'Done! Next reminder: 7 days ✅',
    'toast-added': name => `"${name}" added`,
  },
  ko: {
    'ob-title': '오늘 뭘 하고\n뭘 주문할지\n바로 알려드려요',
    'ob-sub': '집 유형 하나만 알려주시면\n자동으로 루틴을 만들어드려요',
    'ob-q-label': '우리 집은 어떤 구조인가요?',
    'ro1-title': '원룸 / 오피스텔', 'ro1-sub': '거실·침실 합쳐서 한 공간',
    'ro2-title': '1.5룸 / 분리형 원룸', 'ro2-sub': '침실이 살짝 분리된 구조',
    'ro3-title': '투룸 이상', 'ro3-sub': '방이 2개 이상인 구조',
    'btn-see-routines': '추천 루틴 보기 →',
    'btn-skip': '건너뛰기',
    'ob2-label': '자동 추천 루틴',
    'ob2-title': '이런 루틴을 만들었어요',
    'ob2-sub': '나중에 언제든 바꿀 수 있어요',
    'btn-reg-con': '소모품 등록하기 →',
    'ob3-title': '마지막으로 언제 샀어요?',
    'ob3-sub': '체크된 항목만 등록돼요 · 주기는 나중에 설정 가능',
    'ri-placeholder': '직접 추가할 소모품 이름',
    'btn-finish': '완료 — 홈으로 이동',
    'btn-skip-now': '지금은 건너뛸게요',
    'home-greeting': '좋은 아침이에요 👋',
    'home-title': '오늘 해야 할 것들',
    'sl-chores': '집안일', 'sl-order': '주문할 것',
    'chore-lbl': '지금 해야 할 집안일', 'order-lbl': '주문해야 할 소모품',
    'routine-hdr-title': '루틴 관리', 'routine-hdr-sub': '청소 주기를 내 스타일에 맞게 설정하세요',
    'con-hdr-title': '소모품 관리', 'con-hdr-sub': '탭해서 구매 완료 또는 주기를 설정하세요',
    'partner-hdr-title': '파트너 초대', 'partner-hdr-sub': '링크 하나로 2인 가구로 전환해요',
    'partner-hero-title': '파트너와 집안일 나눠요',
    'partner-hero-sub': '루틴, 소모품 목록을 함께 볼 수 있고\n서로 역할을 나눌 수 있어요',
    'partner-link-lbl': '초대 링크',
    'partner-btn1': '링크 복사하기', 'partner-btn2': '카카오톡으로 공유',
    'settings-nm': '1인 가구', 'settings-tp': '원룸 · 혼자 사용 중',
    'sl-noti': '알림 설정', 'sl-house': '집안 설정', 'sl-lang': '앱 언어', 'sl-etc': '기타',
    's-noti1': '오늘의 집안일 알림', 's-noti1-sub': '매일 오전 9시',
    's-noti2': '소모품 소진 알림', 's-noti2-sub': 'D-3일 전',
    's-noti3': '야간 방해금지', 's-noti3-sub': '오후 10시 ~ 오전 8시',
    's-house1': '집 구조', 's-house1-sub': '원룸 / 오피스텔',
    's-house2': '루틴 관리', 's-house2-sub': '8개 루틴 활성화',
    's-lang-name': '언어', 's-lang-sub': '한국어',
    's-etc1': '앱 정보', 's-etc2': '피드백 보내기',
    'nb-home': '홈', 'nb-routine': '루틴', 'nb-con': '소모품', 'nb-partner': '파트너', 'nb-settings': '설정',
    'lang-sheet-title': '앱 언어 설정',
    'lang-en': 'English', 'lang-ko': '한국어',
    'sheet-buy1': '🛒 오늘 샀어요', 'sheet-buy2': '다음에 살게요', 'sheet-buy3': '다른 날짜로 입력할게요 →',
    'toast-copy': '링크가 복사됐어요 📋', 'toast-kakao': '카카오톡으로 공유해요',
    'toast-radd': '루틴 추가 기능은 다음 버전에 추가돼요',
    'toast-house': '집 구조 변경', 'toast-feedback': '피드백 감사해요 💌',
    'toast-lang': '언어가 변경됐어요', 'toast-finish': '홈 루틴이 준비됐어요 🎉',
    'ri-default': ['세탁세제','섬유유연제','주방세제','휴지','욕실세정제','쓰레기봉투'],
    'ri-quick': ['샴푸','린스','바디워시','치약','면도기','스펀지','락스','청소포','손세정제'],
    'ri-date-opts': [
      {label:'일주일 내', value:'week', cls:'green'},
      {label:'2주 전', value:'2week', cls:'blue'},
      {label:'한 달 전', value:'month', cls:'blue'},
      {label:'모름', value:'unknown', cls:'blue'},
    ],
    'ri-summary-none': '날짜를 선택해주세요',
    'ri-summary-done': '모두 선택 완료 ✓',
    'chores': [
      {id:0, name:'욕실 청소', sub:'D+12 · 마지막: 14일 전', urgency:'red'},
      {id:1, name:'분리수거', sub:'오늘 수거일', urgency:'red'},
      {id:2, name:'청소기 돌리기', sub:'D+3 · 주 2회', urgency:'orange'},
      {id:3, name:'싱크대 닦기', sub:'D-2 · 아직 여유 있어요', urgency:'green'},
    ],
    'consumables': [
      {id:1, name:'세탁세제', daysLeft:-3, totalDays:30, group:'laundry'},
      {id:2, name:'휴지', daysLeft:-1, totalDays:14, group:'bathroom'},
      {id:3, name:'주방세제', daysLeft:8, totalDays:20, group:'kitchen'},
      {id:4, name:'섬유유연제', daysLeft:15, totalDays:30, group:'laundry'},
      {id:5, name:'욕실세정제', daysLeft:20, totalDays:45, group:'bathroom'},
      {id:6, name:'쓰레기봉투', daysLeft:5, totalDays:21, group:'other'},
    ],
    'con-groups': [
      {id:'kitchen', label:'🍳 주방'},
      {id:'bathroom', label:'🚿 욕실'},
      {id:'laundry', label:'🧺 세탁'},
      {id:'other', label:'📦 기타'},
    ],
    'con-count': n => `${n}개`,
    'routines': [
      { id:1, room:'🧹 거실 · 방', items:[{id:11,name:'청소기 돌리기',cycle:'주 2회',urgency:'red'},{id:12,name:'물걸레 청소',cycle:'주 1회',urgency:'orange'},{id:13,name:'먼지 닦기',cycle:'주 1회',urgency:'green'}]},
      { id:2, room:'🚿 욕실', items:[{id:21,name:'변기·세면대 청소',cycle:'주 1회',urgency:'red'},{id:22,name:'욕실 바닥 청소',cycle:'주 1회',urgency:'orange'}]},
      { id:3, room:'🍳 부엌', items:[{id:31,name:'싱크대 닦기',cycle:'주 2회',urgency:'orange'},{id:32,name:'가스레인지 청소',cycle:'2주 1회',urgency:'green'},{id:33,name:'분리수거',cycle:'수·토',urgency:'red'}]},
    ],
    'partner-features': [
      {icon:'ti-checks', title:'루틴 함께 보기', sub:'파트너의 완료 현황을 실시간으로 확인해요'},
      {icon:'ti-user-check', title:'역할 분담 설정', sub:'항목마다 담당자를 정할 수 있어요'},
      {icon:'ti-bell', title:'공동 구매 알림', sub:'소모품 소진 알림을 함께 받아요'},
    ],
    'room-options': [
      {id:1, emoji:'🛏', title:'원룸 / 오피스텔', sub:'거실·침실 합쳐서 한 공간'},
      {id:2, emoji:'🛋', title:'1.5룸 / 분리형 원룸', sub:'침실이 살짝 분리된 구조'},
      {id:3, emoji:'🏡', title:'투룸 이상', sub:'방이 2개 이상인 구조'},
    ],
    'ob2-routines': [
      {emoji:'🧹', title:'거실·방', items:['청소기 돌리기 — 주 2회','물걸레 청소 — 주 1회','먼지 닦기 — 주 1회']},
      {emoji:'🚿', title:'욕실', items:['변기·세면대 청소 — 주 1회','바닥 청소 — 주 1회']},
      {emoji:'🍳', title:'부엌', items:['싱크대 닦기 — 주 2회','가스레인지 청소 — 2주 1회','분리수거 — 수·토']},
    ],
    'edit-label': '수정', 'routines-count': n => `${n}개 루틴`, 'cycle-unit': '일',
    'con-add-placeholder': '소모품 추가',
    'dday-order': '지금 주문!', 'dday-soon': '곧 필요해요', 'dday-ok': '여유 있어요',
    'cycle-current': d => `현재: ${d}일마다 알림`,
    'cycle-sheet-suffix': '주기 설정',
    'toast-done': d => `구매 완료! 다음 알림 ${d}일 후 🛒`,
    'toast-cycle': d => `주기가 ${d}일로 설정됐어요`,
    'toast-chore-done': '완료! 다음 알림: 7일 후 ✅',
    'toast-added': name => `"${name}" 추가됐어요`,
  }
};

const useStore = create(
  persist(
    (set, get) => ({
      onboardingDone: false,
      roomType: null,
      activeTab: 'home',
      lang: 'en',
      choreDone: [false, false, false, false],
      consumables: null,
      customRoutineItems: [],
      notifications: { dailyAlert: true, consumableAlert: true, doNotDisturb: false },

      t: (key) => {
        const l = get().lang;
        const v = STRINGS[l]?.[key];
        return v !== undefined ? v : STRINGS['en'][key] ?? key;
      },

      setOnboardingDone: (roomType) => set({ onboardingDone: true, roomType }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setLang: (lang) => set({ lang }),
      toggleChore: (i) => set((s) => {
        const next = [...s.choreDone];
        next[i] = !next[i];
        return { choreDone: next };
      }),
      buyConsumable: (id) => set((s) => {
        const lang = s.lang;
        const base = STRINGS[lang]['consumables'];
        const cur = s.consumables || base;
        return { consumables: cur.map(c => c.id === id ? { ...c, daysLeft: c.totalDays } : c) };
      }),
      updateCycle: (id, days) => set((s) => {
        const lang = s.lang;
        const base = STRINGS[lang]['consumables'];
        const cur = s.consumables || base;
        return { consumables: cur.map(c => c.id === id ? { ...c, totalDays: days } : c) };
      }),
      addConsumable: (name, group, totalDays) => set(s => {
        const base = STRINGS[s.lang]['consumables'];
        const cur = s.consumables || base;
        return { consumables: [...cur, { id: Date.now(), name, group, daysLeft: totalDays, totalDays }] };
      }),
      addRoutineItem: (roomId, name, cycle) => set(s => ({
        customRoutineItems: [
          ...s.customRoutineItems,
          { id: Date.now(), roomId, name, cycle, urgency: 'green' }
        ]
      })),
      toggleNotification: (key) => set((s) => ({ notifications: { ...s.notifications, [key]: !s.notifications[key] } })),
    }),
    { name: 'household-v2' }
  )
);

export default useStore;
