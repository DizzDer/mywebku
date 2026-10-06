'use strict';

const projects = {
  executor: {
    title: 'Bounded Executor', type: '01 / SYSTEMS · C++17',
    intro: 'Пул потоков для задач, которым нужна параллельная обработка без бесконечно растущей очереди.',
    features: ['Ограниченная очередь и явный отказ при перегрузке: вызывающий код решает, что делать дальше.', 'Результаты и исключения передаются через std::future. Поддерживаются move-only функции.', 'При закрытии новые задачи не принимаются, а уже принятые завершаются.', 'Тесты переполнения, закрытия и 4000 задач от нескольких потоков.'],
    stack: ['C++17', 'Threads', 'CMake', 'CTest', 'GitHub Actions'],
    note: 'Запуск и тесты на Windows, Linux и macOS. Выполняющаяся задача не прерывается принудительно. Графика карточки — схема устройства, а не замер производительности.',
    url: 'https://github.com/DizzDer/bounded-executor'
  },
  tracker: {
    title: 'Async Price Tracker', type: '02 / BACKEND · PYTHON',
    intro: 'Асинхронный сервис отслеживания цен: API, история изменений и фоновые задачи проверки.',
    features: ['REST API на FastAPI и асинхронный доступ к PostgreSQL через SQLAlchemy.', 'Celery и Redis для фоновых задач опроса и оповещений.', 'История цен по товарам и правила уведомления при достижении порога.', 'Docker Compose для локального запуска и Alembic для миграций.'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
    note: 'Детали установки и поддерживаемые интеграции — в репозитории. График на карточке иллюстративный; это не данные работающего сервиса.',
    url: 'https://github.com/DizzDer/Async-price-tracker-'
  },
  planner: {
    title: 'DAG Planner', type: '03 / ALGORITHMS · C++17',
    intro: 'Консольный инструмент, который превращает набор задач и зависимостей в последовательность с ранними сроками начала и окончания.',
    features: ['Топологическая сортировка с детерминированным выбором готовых задач.', 'Поиск одного критического пути и расчёт общей длительности.', 'Диагностика циклов, неизвестных зависимостей, повторов и переполнения чисел.', 'Проверка цепочки из 10 000 задач без рекурсивного обхода.'],
    stack: ['C++17', 'Graph algorithms', 'CLI', 'CMake', 'CTest'],
    note: 'Модель предполагает неограниченное число исполнителей. Планировщик анализирует зависимости, но не запускает команды. Схема на карточке иллюстрирует граф задач.',
    url: 'https://github.com/DizzDer/dag-planner'
  },
  cache: {
    title: 'TTL LRU Cache', type: '04 / SYSTEMS · C++17',
    intro: 'Потокобезопасный кэш, который ограничивает число записей, следит за сроком их жизни и вытесняет давно не использовавшиеся значения.',
    features: ['TTL для каждой записи и LRU-порядок для вытеснения при заполнении.', 'Копии значений вместо ссылок, которые может инвалидировать другой поток.', 'Метрики попаданий, промахов, истечений и вытеснений.', 'Управляемые часы для тестов без ожидания и 16 000 конкурентных пар put/get.'],
    stack: ['C++17', 'STL', 'Mutex', 'Clock injection', 'CTest'],
    note: 'Вставка имеет сложность O(capacity): просроченные записи удаляются перед вытеснением живых. Фоновый поток очистки не используется.',
    url: 'https://github.com/DizzDer/ttl-lru-cache'
  },
  firescout: {
    "title": "FireScout",
    "intro": "Симулятор пожарного мониторинга и Android-клиент для телеметрии дрона.",
    "features": [
        "Сценарии полёта, тревоги и потери связи в автономном браузерном демо.",
        "Подтверждение тревоги несколькими датчиками и журнал событий.",
        "BLE-клиент для Android и описанный протокол телеметрии.",
        "Сборка APK и Android Lint в GitHub Actions."
    ],
    "stack": [
        "Android",
        "Java",
        "JavaScript",
        "BLE",
        "Gradle"
    ],
    "note": "Оборудование пока не проверено: проект работает с симулятором. Камера, управление полётом и прошивка ESP32 ещё не реализованы.",
    "type": "05 / ANDROID / BLE",
    "url": "https://github.com/DizzDer/Smart-drone"
},
  journal: {
    "title": "Durable Journal",
    "intro": "Бинарный журнал с добавлением записей, проверкой целостности и явным восстановлением незавершённой записи.",
    "features": [
        "Кадры с CRC-32 и последовательными номерами записей.",
        "Подтверждение записи после fsync или FlushFileBuffers.",
        "Один владелец файла и восстановление только незавершённого хвоста по явному запросу.",
        "Тесты усечений и повреждений; сборки на Windows, Linux и macOS."
    ],
    "stack": [
        "C++17",
        "CRC-32",
        "File I/O",
        "CMake",
        "CTest"
    ],
    "note": "CRC выявляет случайные повреждения, а не подмену данных. Гарантии сохранности зависят от ОС и оборудования; API требует внешней синхронизации.",
    "type": "06 / STORAGE / C++17",
    "url": "https://github.com/DizzDer/durable-journal"
},
  cafedra: {
    "title": "АРМ Кафедра",
    "intro": "Веб-приложение для работы с магистрантами, планами, аттестациями и документами кафедры.",
    "features": [
        "Центр документов: индивидуальные планы, аттестации и отчёты.",
        "Реестр версий со снимком данных на момент подготовки.",
        "Экспорт в Word и печать A4; реквизиты на русском и казахском.",
        "Локальные сводки и опциональное подключение ИИ-помощника."
    ],
    "stack": [
        "Python",
        "SQLite",
        "HTML",
        "CSS",
        "JavaScript"
    ],
    "note": "Учебный проект. Формы не заявляются как утверждённые бланки; ЭЦП не реализована. Облачный помощник требует отдельной настройки.",
    "type": "07 / WEB / PYTHON",
    "url": "https://github.com/DizzDer/cafedra"
},
  lan: {
    "title": "CS2 LAN Practice",
    "intro": "PowerShell-скрипты для запуска приватного LAN-сервера Counter-Strike 2 из установленной игры.",
    "features": [
        "Выделенный LAN-сервер на Windows с картой Dust II.",
        "Генерация пароля при запуске или пароль через параметр.",
        "Фоновый запуск с локальными логами и состоянием.",
        "Перед остановкой проверяются PID, путь и время запуска процесса."
    ],
    "stack": [
        "PowerShell",
        "Windows",
        "CS2",
        "LAN"
    ],
    "note": "Нужна установленная игра. Проект управляет локальным сервером, а не игровым клиентом.",
    "type": "08 / TOOLS / POWERSHELL",
    "url": "https://github.com/DizzDer/cs2-lan-practice"
},
  todo: {
    "title": "ToDo Task Manager",
    "intro": "Консольный менеджер задач с приоритетами, поиском, статистикой и сохранением данных.",
    "features": [
        "Стабильные идентификаторы, статусы и три уровня приоритета.",
        "Поиск, сортировка и удаление завершённых задач.",
        "Сохранение через временный файл и откат изменения при ошибке записи.",
        "Чтение старого формата и тесты некорректных данных."
    ],
    "stack": [
        "C++17",
        "STL",
        "CLI",
        "CMake",
        "CTest"
    ],
    "note": "Для одной базы предполагается один процесс. Замена файла защищает от частичной записи приложения, но не гарантирует сохранность при отключении питания.",
    "type": "09 / CLI / C++17",
    "url": "https://github.com/DizzDer/ToDo-App-in-con"
}
};


// Progressive enhancement: all four screens remain available without JavaScript.
const screens = [...document.querySelectorAll('.screen')];
const menuChoices = [...document.querySelectorAll('.menu-choice')];
const stage = document.querySelector('.stage');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let scene = 'home';
let entered = false;
let selectedMenu = 0;
let motionPaused = reducedMotion.matches;
let transitionTimer;
document.body.classList.add('ready');

function updateVideos() {
  for (const screen of screens) {
    const video = screen.querySelector('video');
    if (!video) continue;
    const playing = entered && !screen.hidden && !motionPaused && !document.hidden;
    if (playing) {
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      video.play().catch(() => {}); // Posters remain when autoplay is unavailable.
    } else video.pause();
  }
  document.querySelector('#motion-toggle').setAttribute('aria-pressed', String(motionPaused));
  document.querySelector('#motion-toggle').textContent = motionPaused ? '▶' : 'Ⅱ';
  document.querySelector('#motion-toggle').setAttribute('aria-label', motionPaused ? 'Включить фоновые анимации' : 'Приостановить фоновые анимации');
}

function showScene(id, focus = true) {
  if (!screens.some(s => s.id === id)) id = 'home';
  const changed = scene !== id;
  scene = id;
  document.body.dataset.scene = id;
  for (const screen of screens) screen.hidden = screen.id !== id;
  if (changed) document.querySelector(`#${id}`).scrollTop = 0;
  document.querySelector('#back-home').hidden = id === 'home';
  if (changed && entered && !reducedMotion.matches) {
    clearTimeout(transitionTimer);
    document.body.classList.remove('switching');
    void document.body.offsetWidth;
    document.body.classList.add('switching');
    transitionTimer = setTimeout(() => document.body.classList.remove('switching'), 650);
  }
  updateVideos();
  if (entered && focus) {
    const target = id === 'home' ? menuChoices[selectedMenu] : document.querySelector(`#${id} h2`);
    target?.focus({preventScroll:true});
  }
}

function selectMenu(index, focus = false) {
  selectedMenu = (index + menuChoices.length) % menuChoices.length;
  menuChoices.forEach((item, i) => item.classList.toggle('selected', i === selectedMenu));
  if (focus) menuChoices[selectedMenu].focus({preventScroll:true});
}
menuChoices.forEach((item, i) => {
  item.addEventListener('pointerenter', () => selectMenu(i));
  item.addEventListener('focus', () => selectMenu(i));
});
window.addEventListener('hashchange', () => showScene(location.hash.slice(1)));
window.addEventListener('popstate', () => showScene(location.hash.slice(1) || 'home'));
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const id = link.getAttribute('href').slice(1);
  if (!screens.some(s => s.id === id)) return;
  event.preventDefault();
  if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  showScene(id);
}));
showScene(location.hash.slice(1) || 'home', false);
document.querySelector('#motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; updateVideos(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; updateVideos(); });
document.addEventListener('visibilitychange', updateVideos);

// Project filters and native, focus-trapping dialog.
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  let visible = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `Показано проектов: ${visible} из ${cards.length}`;
}));
const dialog = document.querySelector('#project-dialog');
let dialogOpener;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  for (const [field, value] of Object.entries({type:project.type,title:project.title,intro:project.intro,note:project.note})) {
    document.querySelector(`#dialog-${field}`).textContent = value;
  }
  document.querySelector('#dialog-repo').href = project.url;
  document.querySelector('#dialog-features').replaceChildren(...project.features.map(text => {
    const li = document.createElement('li'); li.textContent = text; return li;
  }));
  document.querySelector('#dialog-stack').replaceChildren(...project.stack.map(text => {
    const span = document.createElement('span'); span.textContent = text; return span;
  }));
  dialogOpener = button;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector('#dialog-close').focus();
}));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => dialogOpener?.focus());

// Roving tab focus, including arrow, Home and End keys.
const skillTabs = [...document.querySelectorAll('[data-skill]')];
function selectSkill(button, focus = false) {
  skillTabs.forEach(tab => {
    const active = tab === button;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = !active;
  });
  if (focus) button.focus();
}
skillTabs.forEach((tab,i) => {
  tab.addEventListener('click', () => selectSkill(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (i+1) % skillTabs.length;
    if (event.key === 'ArrowLeft') target = (i-1+skillTabs.length) % skillTabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = skillTabs.length-1;
    if (target !== undefined) { event.preventDefault(); selectSkill(skillTabs[target], true); }
  });
});
selectSkill(skillTabs[0]);
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('quat.kanatuly@gmail.com');
    status.textContent = 'Email скопирован. До связи!';
  } catch { status.textContent = 'quat.kanatuly@gmail.com — можно скопировать вручную.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Use the official music release through a visible YouTube player.
// No soundtrack is extracted, redistributed or included in the repository.
const entry = document.querySelector('#entry-screen');
const musicDock = document.querySelector('#music-dock');
const musicToggle = document.querySelector('#music-toggle');
const musicStatus = document.querySelector('#player-status');
let player;
let playerReady = false;
let musicRequested = false;
function setMusicState(playing) {
  musicToggle.setAttribute('aria-pressed', String(playing));
  document.querySelector('#music-state').textContent = playing ? 'ON' : 'OFF';
}
function startMusic() {
  musicRequested = true;
  musicDock.hidden = false;
  if (playerReady) {
    player.unMute();
    player.setVolume(35);
    player.playVideo();
  } else musicStatus.textContent = 'Загружаем Last Surprise…';
}
function stopMusic() {
  musicRequested = false;
  if (playerReady) player.pauseVideo();
  musicDock.hidden = true;
  setMusicState(false);
}
musicToggle.addEventListener('click', () => {
  if (musicRequested) stopMusic();
  else startMusic();
});
document.querySelector('#music-close').addEventListener('click', () => { stopMusic(); musicToggle.focus(); });
window.onYouTubeIframeAPIReady = () => {
  const vars = {controls:1,playsinline:1,rel:0,loop:1,playlist:'ZNGqBDRJgvo'};
  if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
  player = new YT.Player('youtube-player', {
    host:'https://www.youtube-nocookie.com', width:240, height:200,
    videoId:'ZNGqBDRJgvo', playerVars:vars,
    events:{
      onReady:() => {
        playerReady = true;
        musicStatus.textContent = 'Last Surprise · Persona 5';
        if (musicRequested) startMusic();
      },
      onStateChange:event => {
        setMusicState(event.data === YT.PlayerState.PLAYING);
        if (event.data === YT.PlayerState.PLAYING) musicStatus.textContent = 'Last Surprise · Persona 5';
        if (event.data === YT.PlayerState.PAUSED) musicStatus.textContent = 'На паузе · нажмите ▶ в плеере';
      },
      onAutoplayBlocked:() => { setMusicState(false); musicStatus.textContent = 'Нажмите ▶ в плеере, чтобы включить звук.'; },
      onError:() => { setMusicState(false); musicStatus.textContent = 'Трек недоступен здесь — откройте на YouTube.'; }
    }
  });
};
const apiScript = document.createElement('script');
apiScript.src = 'https://www.youtube.com/iframe_api';
apiScript.async = true;
apiScript.onerror = () => { musicStatus.textContent = 'YouTube недоступен. Откройте трек по ссылке ниже.'; };
document.head.append(apiScript);

function enterSite(withMusic) {
  if (entered) return;
  entered = true;
  entry.hidden = true;
  stage.inert = false;
  document.querySelector('.site-header').inert = false;
  document.querySelector('.hud').inert = false;
  if (withMusic) startMusic();
  showScene(scene);
}
entry.hidden = false;
stage.inert = true;
document.querySelector('.site-header').inert = true;
document.querySelector('.hud').inert = true;
document.querySelector('#enter-music').addEventListener('click', () => enterSite(true));
document.querySelector('#enter-quiet').addEventListener('click', () => enterSite(false));
document.querySelector('#enter-music').focus({preventScroll:true});
entry.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const first = document.querySelector('#enter-music');
  const last = document.querySelector('#enter-quiet');
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
document.addEventListener('keydown', event => {
  if (event.defaultPrevented || dialog.open) return;
  if (!entered) {
    if (event.key === 'Escape') enterSite(false);
    return;
  }
  if (['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName) || musicDock.contains(event.target)) return;
  if (event.key === 'Escape') {
    if (scene !== 'home') { event.preventDefault(); history.pushState(null, '', '#home'); showScene('home'); }
    return;
  }
  if (scene !== 'home') return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault(); selectMenu(selectedMenu + (event.key === 'ArrowDown' ? 1 : -1), true);
  } else if (event.key === 'Enter' && (event.target === document.body || menuChoices.includes(event.target))) {
    event.preventDefault(); menuChoices[selectedMenu].click();
  }
});
