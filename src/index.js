console.log('[nav-button] >>> MINIMAL DIST INDEX LOADED <<<');

registerExtension({
    name: 'st-manage-chars',
    init(context) {
        console.log('[nav-button] init() started');
        context.onEnable(() => {
            console.log('[nav-button] onEnable() fired');
        });
    }
});