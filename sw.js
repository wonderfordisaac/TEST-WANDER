// sw.js - THE FINAL TURBO ENGINE
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-database-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-auth-compat.js');


self.addEventListener('message', (event) => {
    if (event.data.type === 'BOOT_TURBO') {
        const { config } = event.data;
        
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        // 1. RTDB: Kusunga database yonse m'foni (Global Sync)
        firebase.database().ref("/").keepSynced(true);

        // 2. FIRESTORE: Kusunga deta yonse pafonipo (Offline Persistence)
        const db = firebase.firestore();
        db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });
        
        console.log("🚀 Wander-Engine is Syncing Everything in Background!");
    }
});

// Kutsegula ma file mwachangu pogwiritsa ntchito cache ya pafoni
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

