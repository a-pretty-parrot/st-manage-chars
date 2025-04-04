console.log('[nav-button] >>> MINIMAL DIST INDEX LOADED <<<');

function initWhenReady() {
    if (typeof registerExtension === 'function') {
        console.log('[nav-button] registerExtension is available');

        registerExtension({
            name: 'st-manage-chars',
            init(context) {
                console.log('[nav-button] init() started');
                context.onEnable(() => {
                    console.log('[nav-button] onEnable() fired');
                });
            }
        });
    } else {
        console.log('[nav-button] registerExtension not ready yet, retrying...');
        setTimeout(initWhenReady, 250);
    }
}

initWhenReady();