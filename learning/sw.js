// The lesson plans moved to https://johnmeq.github.io/mikey-lessons/. This replaces the old offline helper:
// it removes the old saved copy (keeping the new app's), then switches itself off so this address
// always shows the "moved" page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => !k.startsWith('mikey-lessons-app-')).map(k => caches.delete(k)));
  await self.registration.unregister();
  const wins = await self.clients.matchAll({ type: 'window' });
  wins.forEach(w => { try { w.navigate(w.url); } catch (err) {} });
})()));
