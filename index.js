console.log('[nav-button] >>> MINIMAL DIST INDEX LOADED <<<');

function setupExtension() {
    console.log('[nav-button] 🧩 Extension script loaded!');

    if (typeof registerExtension !== 'function') {
        console.warn('[nav-button] ❌ registerExtension is not defined');
        return;
    }

    registerExtension({
        name: 'nav-button',
        init: async function (ST) {
            console.log('[nav-button] ✅ Extension initialized with context:', ST);
            // Placeholder for actual logic
        }
    });
}

if (window.isSillyTavernLoaded) {
    setupExtension();
} else {
    console.log('[nav-button] ⏳ Waiting for sillyTavernLoaded...');
    document.addEventListener('sillyTavernLoaded', setupExtension);
}