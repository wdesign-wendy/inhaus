#!/usr/bin/env node
/**
 * INHAUS — Cohere Design System 적용 스크립트
 * 
 * 사용법:
 *   node apply-design.js [프로젝트경로]
 *   node apply-design.js ~/projects/inhaus
 *   node apply-design.js  (경로 생략 시 현재 디렉토리)
 */

const fs   = require('fs');
const path = require('path');

// ── 0. 프로젝트 루트 결정 ────────────────────────────────────
const projectRoot = path.resolve(process.argv[2] || process.cwd());
console.log(`\n🏠 Inhaus design apply — 프로젝트: ${projectRoot}\n`);

if (!fs.existsSync(projectRoot)) {
  console.error(`❌ 경로를 찾을 수 없습니다: ${projectRoot}`);
  process.exit(1);
}

// ── 1. src/ 위치 탐색 ────────────────────────────────────────
const srcDir = fs.existsSync(path.join(projectRoot, 'src'))
  ? path.join(projectRoot, 'src')
  : projectRoot;

const publicDir = path.join(projectRoot, 'public');

// ── 헬퍼 ─────────────────────────────────────────────────────
function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ 작성: ${path.relative(projectRoot, filePath)}`);
}

function patchFile(filePath, patches) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  파일 없음 (건너뜀): ${path.relative(projectRoot, filePath)}`);
    return false;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const { from, to, description } of patches) {
    if (content.includes(from)) {
      content = content.replace(from, to);
      console.log(`  ✅ 패치: ${description}`);
      changed = true;
    } else if (!content.includes(to)) {
      console.warn(`  ⚠️  이미 적용됐거나 찾지 못함: ${description}`);
    }
  }
  if (changed) fs.writeFileSync(filePath, content, 'utf8');
  return changed;
}

function findFile(dir, names) {
  for (const name of names) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 1 — CSS 파일 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('📄 STEP 1: CSS 파일 생성');

const CSS_PATH = path.join(srcDir, 'cohere-override.css');
const CSS_CONTENT = `/* ============================================================
   INHAUS — COHERE DESIGN SYSTEM OVERRIDE
   자동 생성: apply-design.js
   ============================================================ */

/* ── 1. Google Font ─────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap');

/* ── 2. Design Tokens ───────────────────────────────────── */
:root {
  --cream:        #ffffff;
  --cream2:       #eeece7;
  --cream3:       #f2f2f2;
  --white:        #ffffff;
  --gold:         #17171c;
  --gold-dark:    #000000;
  --gold-light:   #eeece7;
  --gold-muted:   #f2f2f2;
  --green:        #003c33;
  --green-light:  #edfce9;
  --ink:          #212121;
  --ink2:         #17171c;
  --ink3:         #75758a;
  --ink4:         #93939f;
  --orange:       #ff7759;
  --orange-light: #fff5f2;
  --red:          #b30000;
  --red-light:    #fff5f5;
  --radius-sm:    8px;
  --radius-md:    16px;
  --radius-lg:    22px;
  --radius-xl:    32px;
}

/* ── 3. Global font ─────────────────────────────────────── */
*, *::before, *::after {
  font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 아이콘 폰트 복원 */
.ti::before,
[class*="ti-"]::before,
[class^="ti"]::before,
i[class*="ti"]::before {
  font-family: tabler-icons !important;
}

body, #root, html { background: #ffffff !important; }

/* ── 4. Splash ──────────────────────────────────────────── */
.splash {
  background: #f5f2ed !important;
  background-image: url('/splash.png') !important;
  background-size: cover !important;
  background-position: top center !important;
  padding: 0 !important;
  align-items: flex-start !important;
}
.splash-inner, .splash-logo, .splash-tagline { display: none !important; }

/* ── 5. Onboarding ──────────────────────────────────────── */
.ob-screen, .ob-page { background: #ffffff !important; }
.ob-emoji { font-size: 48px !important; margin-bottom: 24px !important; }
.ob-title {
  font-size: 30px !important; font-weight: 500 !important;
  letter-spacing: -0.6px !important; line-height: 1.1 !important; color: #17171c !important;
}
.ob-sub { font-size: 15px !important; color: #93939f !important; }
.ob-label {
  font-size: 11px !important; font-weight: 500 !important;
  letter-spacing: 0.28px !important; text-transform: uppercase !important; color: #93939f !important;
}
.ob-h2 {
  font-size: 26px !important; font-weight: 500 !important;
  letter-spacing: -0.52px !important; color: #17171c !important;
}
.ob-sub2 { font-size: 14px !important; color: #93939f !important; }
.ob-p3-header {
  font-size: 26px !important; font-weight: 500 !important;
  letter-spacing: -0.52px !important; color: #17171c !important;
}

/* 홈 타입 선택 카드 */
.room-opt {
  background: #ffffff !important; border: 1px solid #d9d9dd !important;
  border-radius: 8px !important; box-shadow: none !important;
}
.room-opt.selected { border-color: #17171c !important; box-shadow: inset 0 0 0 1px #17171c !important; }
.room-opt strong { font-size: 15px !important; font-weight: 500 !important; color: #17171c !important; }
.room-opt span   { font-size: 13px !important; color: #93939f !important; }

/* 루틴 프리뷰 카드 */
.routine-preview-card {
  background: #ffffff !important; border: 1px solid #d9d9dd !important;
  border-radius: 8px !important; box-shadow: none !important;
}
.rpc-title { font-size: 14px !important; font-weight: 500 !important; color: #17171c !important; }
.rpc-item i { color: #17171c !important; }

/* 날짜 선택 */
.ri-summary-bar { background: #eeece7 !important; border-radius: 8px !important; }
.ri-card {
  background: #ffffff !important; border: 1px solid #d9d9dd !important;
  border-radius: 8px !important; box-shadow: none !important;
}
.ri-card.checked  { border-color: #17171c !important; }
.ri-card.unchecked { opacity: 0.5 !important; }
.ri-checkbox { background: #f2f2f2 !important; border: 1px solid #d9d9dd !important; border-radius: 6px !important; }
.ri-checkbox.on { background: #17171c !important; border-color: #17171c !important; }
.ri-checkbox i  { color: #ffffff !important; }
.ri-name { font-size: 15px !important; font-weight: 500 !important; color: #17171c !important; }
.ri-date-btn {
  background: #f2f2f2 !important; color: #212121 !important;
  border: 1px solid #d9d9dd !important; border-radius: 30px !important; font-size: 13px !important;
}
.ri-date-btn.active-green,
.ri-date-btn.active-blue { background: #17171c !important; color: #ffffff !important; border-color: #17171c !important; }
.ri-date-btn.dimmed { opacity: 0.4 !important; }

/* ── 6. CTA 버튼 ────────────────────────────────────────── */
.ob-step, .routine-add-confirm {
  background: #17171c !important; color: #ffffff !important;
  border: none !important; border-radius: 32px !important;
  font-size: 14px !important; font-weight: 500 !important; box-shadow: none !important;
}
.routine-add-confirm:disabled { background: #d9d9dd !important; color: #93939f !important; }

/* ── 7. 홈 화면 ─────────────────────────────────────────── */
.home-screen { background: #ffffff !important; }
.home-logo   { width: 110px !important; height: auto !important; mix-blend-mode: normal !important; opacity: 1 !important; }
.home-top    { padding: 16px 24px 12px !important; }

.today-item--chore,
.today-item--order {
  background: #eeece7 !important; border: none !important;
  border-radius: 8px !important; box-shadow: none !important;
}
.today-num        { font-size: 40px !important; font-weight: 400 !important; letter-spacing: -1.6px !important; color: #17171c !important; }
.today-num--chore { color: #17171c !important; }
.today-num--order { color: #17171c !important; }
.today-lbl {
  font-size: 11px !important; font-weight: 500 !important;
  letter-spacing: 0.22px !important; text-transform: uppercase !important; color: #93939f !important;
}

.chore-card {
  background: #ffffff !important; border: none !important;
  border-bottom: 1px solid #e5e7eb !important; border-radius: 0 !important; box-shadow: none !important;
}
.chore-card.done { opacity: 0.45 !important; }
.chore-name  { font-size: 15px !important; font-weight: 400 !important; color: #212121 !important; }
.chore-sub   { font-size: 12px !important; color: #93939f !important; }
.chore-check { background: #f2f2f2 !important; border: 1px solid #d9d9dd !important; border-radius: 50% !important; }
.chore-check.checked { background: #17171c !important; border-color: #17171c !important; }
.chore-check i { color: #ffffff !important; }

.con-strip     { background: #ffffff !important; border: 1px solid #d9d9dd !important; border-radius: 8px !important; box-shadow: none !important; }
.con-strip-row { border-bottom: 1px solid #e5e7eb !important; }

/* ── 8. Routine 화면 ────────────────────────────────────── */
.routine-screen { background: #ffffff !important; }
.room-card {
  background: #ffffff !important; border: none !important;
  border-top: none !important; border-bottom: 1px solid #e5e7eb !important;
  border-radius: 0 !important; box-shadow: none !important; margin-bottom: 0 !important;
}
.room-header      { border-bottom: 1px solid #e5e7eb !important; }
.room-name        { font-size: 16px !important; font-weight: 500 !important; color: #17171c !important; }
.room-count       { font-size: 13px !important; color: #93939f !important; }
.routine-item     { border-bottom: 1px solid #e5e7eb !important; }
.routine-item-name { font-size: 15px !important; color: #212121 !important; }
.routine-cycle    { font-size: 13px !important; color: #93939f !important; }
.routine-edit-btn {
  background: #eeece7 !important; color: #17171c !important; border: none !important;
  border-radius: 32px !important; font-size: 12px !important; font-weight: 500 !important;
  padding: 5px 14px !important; box-shadow: none !important;
}
.routine-add-btn {
  background: #ffffff !important; border: 1px solid #17171c !important;
  border-radius: 32px !important; color: #17171c !important;
  font-size: 14px !important; font-weight: 500 !important; box-shadow: none !important;
}
.routine-cycle-opt {
  background: #f2f2f2 !important; border: 1px solid #d9d9dd !important;
  border-radius: 30px !important; color: #212121 !important;
}
.routine-cycle-opt.selected { background: #17171c !important; color: #ffffff !important; border-color: #17171c !important; }
.routine-name-input { border: 1px solid #d9d9dd !important; border-radius: 8px !important; }
.routine-name-input:focus { border-color: #17171c !important; box-shadow: none !important; outline: none !important; }
.routine-section-label {
  font-size: 11px !important; font-weight: 500 !important;
  letter-spacing: 0.22px !important; text-transform: uppercase !important; color: #93939f !important;
}
.routine-room-opt { background: #f2f2f2 !important; border: 1px solid #d9d9dd !important; border-radius: 8px !important; }
.routine-room-opt.selected { background: #eeece7 !important; border-color: #17171c !important; }

/* ── 9. Supplies 화면 ───────────────────────────────────── */
.consumable-screen { background: #ffffff !important; }
.con-item {
  background: #ffffff !important;
  border-top: none !important;
  border-bottom: 1px solid #e5e7eb !important;
}
.con-item:last-child { border-bottom: none !important; }
.con-name  { font-size: 15px !important; font-weight: 400 !important; color: #212121 !important; }
.con-dday  { font-size: 13px !important; font-weight: 500 !important; }
.con-dday.r { color: #b30000 !important; }
.con-dday.o { color: #ff7759 !important; }
.con-dday.g { color: #003c33 !important; }

/* Cycle 버튼 — border 없이 "Tap to edit"만 강조 */
.con-cycle-btn {
  background: none !important; border: none !important;
  border-radius: 0 !important; padding: 0 !important;
  color: #93939f !important; font-size: 13px !important; font-weight: 400 !important;
}
.con-cycle-btn span:last-child { color: #17171c !important; font-weight: 600 !important; }

.cycle-opt { background: #f2f2f2 !important; border: 1px solid #d9d9dd !important; border-radius: 30px !important; color: #212121 !important; font-size: 13px !important; }
.cycle-opt.selected { background: #17171c !important; color: #ffffff !important; border-color: #17171c !important; }

/* ── 10. Partner 화면 ───────────────────────────────────── */
.partner-screen   { background: #ffffff !important; }
.partner-hero-title { font-size: 26px !important; font-weight: 500 !important; letter-spacing: -0.52px !important; color: #17171c !important; }
.partner-hero-sub { font-size: 15px !important; color: #93939f !important; }
.partner-link-box { background: #eeece7 !important; border: none !important; border-radius: 8px !important; box-shadow: none !important; }
.partner-link-label {
  font-size: 11px !important; font-weight: 500 !important;
  letter-spacing: 0.22px !important; text-transform: uppercase !important; color: #93939f !important;
}

/* Partner 버튼 radius 통일 */
.btn-primary, .btn-secondary { border-radius: 8px !important; }
/* KakaoTalk 브랜드 컬러 */
.btn-secondary { background: #FEE500 !important; color: #3C1E1E !important; border: none !important; }

/* ── 11. Bottom Nav ─────────────────────────────────────── */
.nav-bar { background: #ffffff !important; border-top: 1px solid #e5e7eb !important; box-shadow: none !important; }
.nav-item i               { color: #93939f !important; }
.nav-item span            { font-size: 10px !important; font-weight: 500 !important; color: #93939f !important; }
.nav-item.active i,
.nav-item.active span     { color: #17171c !important; }

/* ── 12. Sheet / Modal ──────────────────────────────────── */
[class*="sheet"], [class*="modal"] {
  background: #ffffff !important;
  border-radius: 16px 16px 0 0 !important;
  box-shadow: 0 -1px 0 #d9d9dd !important;
}
.routine-sheet-close { color: #93939f !important; background: none !important; border: none !important; }

/* ── 13. Input focus ────────────────────────────────────── */
input:focus, textarea:focus, select:focus {
  outline: none !important;
  box-shadow: 0 0 0 2px #17171c !important;
  border-color: #17171c !important;
}
`;

write(CSS_PATH, CSS_CONTENT);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 2 — 에셋 파일 복사
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n📁 STEP 2: 에셋 파일 복사');

// 스크립트와 같은 폴더에서 에셋을 찾음
const scriptDir   = path.dirname(path.resolve(process.argv[1] || __filename));
const assetsDir   = path.join(srcDir, 'assets');
const splashSrc   = path.join(scriptDir, 'splash.png');
const logoSrc     = path.join(scriptDir, 'inhaus_logo.svg');

if (fs.existsSync(splashSrc)) {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.copyFileSync(splashSrc, path.join(publicDir, 'splash.png'));
  console.log('  ✅ 복사: public/splash.png');
} else {
  console.warn('  ⚠️  splash.png 없음 — 스크립트와 같은 폴더에 놓으세요');
}

if (fs.existsSync(logoSrc)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.copyFileSync(logoSrc, path.join(assetsDir, 'inhaus_logo.svg'));
  console.log('  ✅ 복사: src/assets/inhaus_logo.svg');
} else {
  console.warn('  ⚠️  inhaus_logo.svg 없음 — 스크립트와 같은 폴더에 놓으세요');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 3 — index.js / index.tsx 에 CSS import 삽입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n📎 STEP 3: CSS import 삽입');

const entryFile = findFile(srcDir, ['index.tsx', 'index.ts', 'index.jsx', 'index.js']);
if (entryFile) {
  patchFile(entryFile, [{
    from: "import React",
    to:   "import './cohere-override.css';\nimport React",
    description: `CSS import → ${path.relative(projectRoot, entryFile)}`,
  }]);
} else {
  console.warn('  ⚠️  index.js/tsx를 찾지 못했습니다. 수동으로 아래를 추가하세요:');
  console.warn("      import './cohere-override.css';");
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 4 — 홈 로고 src 교체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n🖼️  STEP 4: 홈 로고 교체');

// 홈 화면 파일 후보
const homeFileCandidates = ['Home.jsx','Home.tsx','HomeScreen.jsx','HomeScreen.tsx','home.jsx','home.tsx'];
const homeFile = findFile(srcDir, homeFileCandidates)
  || findFile(path.join(srcDir, 'screens'), homeFileCandidates)
  || findFile(path.join(srcDir, 'pages'),   homeFileCandidates)
  || findFile(path.join(srcDir, 'components'), homeFileCandidates);

if (homeFile) {
  let content = fs.readFileSync(homeFile, 'utf8');

  // import 추가 (없으면)
  if (!content.includes('inhaus_logo')) {
    const importLine = "import inhausLogo from '../assets/inhaus_logo.svg';";
    // 첫 번째 import 다음에 삽입
    content = content.replace(/(import .+;\n)/, `$1${importLine}\n`);
    console.log(`  ✅ import 추가: ${path.relative(projectRoot, homeFile)}`);
  }

  // home-logo img src 교체 — 여러 패턴 대응
  const logoPatterns = [
    { regex: /(<img[^>]*className=["']home-logo["'][^>]*)\bsrc=\{[^}]+\}/, replacement: '$1src={inhausLogo}' },
    { regex: /(<img[^>]*)\bsrc=\{logo\}([^>]*className=["']home-logo["'])/, replacement: '$1src={inhausLogo}$2' },
    { regex: /src=['"](\.\.\/assets\/logo[^'"]*|logo\.[a-z]+)['"]/, replacement: 'src={inhausLogo}' },
  ];

  let logoReplaced = false;
  for (const { regex, replacement } of logoPatterns) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      logoReplaced = true;
      console.log(`  ✅ home-logo src 교체: ${path.relative(projectRoot, homeFile)}`);
      break;
    }
  }
  if (!logoReplaced) {
    console.warn('  ⚠️  home-logo img를 자동으로 찾지 못했습니다.');
    console.warn('      아래를 수동으로 교체하세요:');
    console.warn('      <img className="home-logo" src={inhausLogo} alt="Inhaus" />');
  }

  fs.writeFileSync(homeFile, content, 'utf8');
} else {
  console.warn('  ⚠️  홈 화면 파일을 찾지 못했습니다. 수동으로 교체하세요:');
  console.warn('      import inhausLogo from \'../assets/inhaus_logo.svg\';');
  console.warn('      <img className="home-logo" src={inhausLogo} alt="Inhaus" />');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 5 — Splash 내부 요소 제거
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n💫 STEP 5: Splash 내부 요소 제거');

const splashCandidates = ['Splash.jsx','Splash.tsx','SplashScreen.jsx','SplashScreen.tsx'];
const splashFile = findFile(srcDir, splashCandidates)
  || findFile(path.join(srcDir, 'screens'),   splashCandidates)
  || findFile(path.join(srcDir, 'components'), splashCandidates);

if (splashFile) {
  patchFile(splashFile, [
    {
      // splash-inner 전체 블록 제거 패턴 (단순 케이스)
      from: `<div className="splash-inner">`,
      to:   `{/* splash-inner removed — image-only splash via CSS */}\n      {false && <div className="splash-inner">`,
      description: 'splash-inner 비활성화',
    },
  ]);
  console.log('  ℹ️  JSX 자동 패치가 어려울 경우 CSS만으로도 동일하게 동작합니다.');
} else {
  console.warn('  ⚠️  Splash 파일을 찾지 못했습니다. CSS만으로도 동작합니다 (splash-inner display:none).');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 6 — con-cycle-btn "Tap to edit" span 분리
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n✏️  STEP 6: Tap to edit span 분리');

// Consumable/Supplies 화면 후보
const supplyCandidates = [
  'Supplies.jsx','Supplies.tsx','ConsumableScreen.jsx','ConsumableScreen.tsx',
  'Consumables.jsx','Consumables.tsx','SuppliesScreen.jsx','SuppliesScreen.tsx',
];
const supplyFile = findFile(srcDir, supplyCandidates)
  || findFile(path.join(srcDir, 'screens'),    supplyCandidates)
  || findFile(path.join(srcDir, 'components'), supplyCandidates);

if (supplyFile) {
  patchFile(supplyFile, [
    {
      // "Cycle: X days · Tap to edit" → span 분리
      from: '`Cycle: ${',
      to:   '`Cycle: ${',  // 트리거용 — 아래 regex로 실제 처리
      description: 'skip (regex로 처리)',
    },
  ]);

  let content = fs.readFileSync(supplyFile, 'utf8');
  // 템플릿 리터럴 패턴: `Cycle: ${days} days · Tap to edit`
  const cycleRegex = /(`Cycle: \$\{[^}]+\}[^`]*· Tap to edit`)/g;
  if (cycleRegex.test(content)) {
    content = content.replace(
      /(`Cycle: \$\{([^}]+)\}([^`]*))· Tap to edit`/g,
      `><span>Cycle: $\{$2\}$3· </span><span>Tap to edit</span></`
    );
    // con-cycle-btn 버튼 태그 정리
    fs.writeFileSync(supplyFile, content, 'utf8');
    console.log(`  ✅ span 분리: ${path.relative(projectRoot, supplyFile)}`);
  } else {
    console.warn('  ⚠️  자동 패턴을 찾지 못했습니다. 수동으로 교체하세요:');
    console.warn('      <button className="con-cycle-btn">');
    console.warn('        <span>Cycle: {days} days · </span>');
    console.warn('        <span>Tap to edit</span>');
    console.warn('      </button>');
  }
} else {
  console.warn('  ⚠️  Supplies 파일을 찾지 못했습니다. 수동으로 span 분리가 필요합니다.');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 완료
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  완료! 아래 명령어로 확인하세요:

   npm start   또는   yarn start

파일을 찾지 못했다고 나온 경우:
  src/ 구조가 다를 수 있습니다.
  apply-design.js 와 같은 폴더에
  splash.png, inhaus_logo.svg 가 있는지 확인하세요.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
