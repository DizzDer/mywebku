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
  }
};

// Filtering keeps the document readable without JavaScript; only user actions hide cards.
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
for (const button of filterButtons) {
  button.addEventListener('click', () => {
    for (const item of filterButtons) {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    }
    let visible = 0;
    for (const card of cards) {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visible++;
    }
    document.querySelector('#filter-status').textContent = `Показано проектов: ${visible} из ${cards.length}`;
  });
}

const dialog = document.querySelector('#project-dialog');
let dialogOpener = null;
for (const button of document.querySelectorAll('[data-project]')) {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    document.querySelector('#dialog-type').textContent = project.type;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-intro').textContent = project.intro;
    document.querySelector('#dialog-note').textContent = project.note;
    document.querySelector('#dialog-repo').href = project.url;
    const features = document.querySelector('#dialog-features');
    features.replaceChildren(...project.features.map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    document.querySelector('#dialog-stack').replaceChildren(...project.stack.map(text => {
      const span = document.createElement('span'); span.textContent = text; return span;
    }));
    dialogOpener = button;
    document.body.classList.add('dialog-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('#dialog-close').focus();
  });
}
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogOpener?.focus();
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}
menuButton.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
});
for (const link of mobileNav.querySelectorAll('a')) link.addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
    await navigator.clipboard.writeText('quat.kanatuly@gmail.com');
    status.textContent = 'Email скопирован. До связи!';
  } catch {
    status.textContent = 'Email: quat.kanatuly@gmail.com — можно скопировать вручную.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Original procedural tube meshes. No assets, WebGL, libraries or remote calls.
(() => {
  const canvas = document.querySelector('#sculpture');
  const context = canvas.getContext('2d');
  const motionButton = document.querySelector('#motion-toggle');
  const shapeButton = document.querySelector('#shape-next');
  if (!context) { motionButton.disabled = true; shapeButton.disabled = true; return; }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let angle = .5;
  let tilt = -.48;
  let shape = 0;
  let width = 0, height = 0;
  let pointer = null;
  const ringCount = 112, sides = 14;
  let mesh = [];
  const normalize = v => { const d = Math.hypot(...v) || 1; return v.map(x => x / d); };
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const center = t => {
    if (shape === 1) return [1.6*Math.cos(t), 1.6*Math.sin(t), .38*Math.sin(4*t)];
    if (shape === 2) return [1.55*Math.cos(t), 1.1*Math.sin(2*t), 1.05*Math.sin(t)];
    const r = 1.2 + .42*Math.cos(3*t);
    return [r*Math.cos(2*t), r*Math.sin(2*t), .65*Math.sin(3*t)];
  };
  function makeMesh() {
    mesh = [];
    for (let i = 0; i < ringCount; i++) {
      const t = i / ringCount * Math.PI * 2;
      const c = center(t), next = center(t + .001);
      const tangent = normalize(next.map((x, j) => x - c[j]));
      const normal = normalize(cross(tangent, [0, 0, 1]));
      const binormal = normalize(cross(tangent, normal));
      const tube = shape === 1 ? .38 : .29;
      const ring = [];
      for (let j = 0; j < sides; j++) {
        const a = j / sides * Math.PI * 2;
        ring.push(c.map((x, k) => x + tube*(normal[k]*Math.cos(a) + binormal[k]*Math.sin(a))));
      }
      mesh.push(ring);
    }
  }
  function rotate(v) {
    const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
    const x = v[0]*ca + v[2]*sa, z = -v[0]*sa + v[2]*ca;
    const y = v[1]*ct - z*st, rz = v[1]*st + z*ct;
    return [x*.965 - y*.262, x*.262 + y*.965, rz];
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    if (!width || !height) return;
    const scale = Math.min(width*.21, height*.235);
    const yCenter = height*.5;
    const shadow = context.createRadialGradient(width*.5, height*.79, 1, width*.5, height*.79, scale*1.3);
    shadow.addColorStop(0, 'rgba(89,64,33,.18)'); shadow.addColorStop(1, 'rgba(89,64,33,0)');
    context.save(); context.translate(width*.5, height*.81); context.scale(1,.21); context.translate(-width*.5,-height*.79); context.fillStyle=shadow; context.fillRect(0,0,width,height*2); context.restore();
    const transformed = mesh.map(ring => ring.map(rotate));
    const faces = [];
    for (let i = 0; i < ringCount; i++) {
      for (let j = 0; j < sides; j++) {
        const points = [transformed[i][j],transformed[(i+1)%ringCount][j],transformed[(i+1)%ringCount][(j+1)%sides],transformed[i][(j+1)%sides]];
        const a = points[1].map((x,k) => x-points[0][k]), b = points[3].map((x,k) => x-points[0][k]);
        const n = normalize(cross(a,b));
        const light = Math.max(0, -n[0]*-.35 - n[1]*-.6 - n[2]*.7);
        faces.push({ points, depth: points.reduce((s,p) => s+p[2],0), light });
      }
    }
    faces.sort((a,b) => a.depth-b.depth);
    for (const face of faces) {
      context.beginPath();
      face.points.forEach((p,i) => { const perspective=5.8/(5.8-p[2]); const x=width/2+p[0]*scale*perspective, y=yCenter+p[1]*scale*perspective; if(i===0) context.moveTo(x,y); else context.lineTo(x,y); });
      context.closePath();
      context.fillStyle=`hsl(${16 + face.light*5} 95% ${37 + face.light*26}%)`;
      context.fill(); context.strokeStyle='rgba(75,29,8,.13)'; context.lineWidth=.45; context.stroke();
    }
  }
  function stop() { if (frame) cancelAnimationFrame(frame); frame=0; lastTime=0; }
  function tick(time) {
    frame=0;
    if(paused || !visible || document.hidden) return;
    const delta=lastTime ? Math.min(time-lastTime,50) : 0; lastTime=time;
    if(!pointer) angle += delta*.00015;
    draw(); frame=requestAnimationFrame(tick);
  }
  function syncMotion() {
    stop();
    motionButton.textContent=paused ? '▶' : 'Ⅱ';
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.setAttribute('aria-label',paused ? 'Продолжить анимацию' : 'Приостановить анимацию');
    draw();
    if(!paused && visible && !document.hidden) frame=requestAnimationFrame(tick);
  }
  function resize() {
    const bounds=canvas.getBoundingClientRect(); width=bounds.width; height=bounds.height;
    const ratio=Math.min(window.devicePixelRatio || 1,2);
    canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0); draw();
  }
  motionButton.addEventListener('click',() => { paused=!paused; syncMotion(); });
  shapeButton.addEventListener('click',() => { shape=(shape+1)%3; document.querySelector('#shape-number').textContent=String(shape+1).padStart(3,'0'); makeMesh(); draw(); });
  reducedMotion.addEventListener('change',event => { paused=event.matches; syncMotion(); });
  document.addEventListener('visibilitychange',syncMotion);
  canvas.addEventListener('pointerdown',event => {
    if(event.button!==0) return;
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY}; canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging');
  });
  canvas.addEventListener('pointermove',event => {
    if(!pointer || pointer.id!==event.pointerId) return;
    angle+=(event.clientX-pointer.x)*.009; tilt=Math.max(-1.3,Math.min(1.3,tilt+(event.clientY-pointer.y)*.006));
    pointer.x=event.clientX; pointer.y=event.clientY; draw();
  });
  const release=event => { if(pointer?.id!==event.pointerId) return; pointer=null; canvas.classList.remove('dragging'); if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); };
  canvas.addEventListener('pointerup',release); canvas.addEventListener('pointercancel',release);
  makeMesh(); resize(); syncMotion();
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => { visible=entries[0].isIntersecting; syncMotion(); },{threshold:0}).observe(canvas);
})();

