// app-engine.js
(function() {
    // 1. FIRESTORE: Tsegulani Offline Persistence
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        firebase.firestore().enablePersistence({synchronizeTabs: true}).catch(() => {});
    }

    // 2. RTDB: Tsegulani Global Sync (Pa Frontend pomwe)
    if (typeof firebase !== 'undefined' && firebase.database) {
        // Izi zikutsegula Turbo ya RTDB m'ma file anu 200 onse
        firebase.database().ref("/").keepSynced(true);
    }

    // 3. SERVICE WORKER: Tsegulani Injini ya Background
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                const checkAuth = setInterval(() => {
                    if (firebase.apps.length > 0) {
                        clearInterval(checkAuth);
                        reg.active.postMessage({
                            type: 'BOOT_TURBO',
                            config: firebase.app().options
                        });
                    }
                }, 1000);
            });
        });
    }
})();