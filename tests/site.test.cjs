const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
test('all local anchors and assets resolve', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (target.startsWith('#')) assert.ok(ids.includes(target.slice(1)), target);
    else if (!/^(https?:|mailto:)/.test(target)) assert.ok(fs.existsSync(path.join(root, target)), target);
  }
});
test('every project opens a documented repository', () => {
  const keys = [...new Set([...html.matchAll(/data-project="([^"]+)"/g)].map(m => m[1]))];
  assert.equal(keys.length, 9);
  for (const key of keys) assert.ok(js.includes(`${key}: {`), key);
  for (const repo of ['bounded-executor','dag-planner','ttl-lru-cache','Async-price-tracker-','Smart-drone','durable-journal','cafedra','cs2-lan-practice','ToDo-App-in-con']) assert.ok(js.includes(`https://github.com/DizzDer/${repo}`));
});
test('primary identity, contacts and baseline accessibility remain present', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('lang="ru"'));
  assert.ok(html.includes('mailto:quat.kanatuly@gmail.com'));
  assert.ok(html.includes('https://t.me/DizzDer'));
  assert.ok(html.includes('class="skip-link"'));
  assert.ok(html.includes('aria-labelledby="dialog-title"'));
  for (const tag of html.matchAll(/<a\b[^>]+target="_blank"[^>]*>/g)) assert.match(tag[0], /rel="noopener noreferrer"/);
});


test('filter counts match the cards and every category has a filter', () => {
  const categories = [...html.matchAll(/data-category="([^"]+)"/g)].map(m => m[1]);
  const filters = [...html.matchAll(/data-filter="([^"]+)"[^>]*>[^<]+<sup>(\d+)<\/sup>/g)];
  assert.ok(filters.length > 1);
  for (const [, category, count] of filters) {
    assert.equal(Number(count), category === 'all' ? categories.length : categories.filter(c => c === category).length, category);
  }
  for (const category of categories) assert.ok(filters.some(f => f[1] === category));
});
