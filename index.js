console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const { extensionSettings, saveSettingsDebounced } = SillyTavern.getContext();

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#top-settings-holder');
        if (!navBar) return;

        clearInterval(navInterval);
        console.log('[nav-button] navBar found!', navBar);

        // Create drawer shell with unique class
        const drawerWrapper = document.createElement('div');
        drawerWrapper.id = 'nav-char-drawer';
        drawerWrapper.className = 'custom-drawer closedDrawer';

        const drawerContent = document.createElement('div');
        drawerContent.className = 'custom-drawer-content';
        drawerContent.innerHTML = `
            <div class="drawer-header">Manage Characters</div>
            <div class="drawer-body">
                <div>This is the drawer content!</div>
            </div>
        `;
        drawerWrapper.appendChild(drawerContent);
        document.body.appendChild(drawerWrapper);

        // Add toggle button to nav
        const btn = document.createElement('button');
        btn.className = 'nav-button';
        btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
        btn.title = 'Manage Characters';
        btn.addEventListener('click', () => {
            drawerWrapper.classList.toggle('closedDrawer');
            console.log('[nav-button] Toggle drawer:', !drawerWrapper.classList.contains('closedDrawer'));
        });
        navBar.appendChild(btn);

        // Auto-close drawer only if the click is outside our button or drawer
        document.body.addEventListener('click', (e) => {
            const isOurButton = e.target.closest('.nav-button');
            const isInsideDrawer = e.target.closest('#nav-char-drawer');
            const anyOpenDrawer = document.querySelector('.inline-drawer:not(.closedDrawer)');

            if (anyOpenDrawer && !drawerWrapper.classList.contains('closedDrawer') && !isOurButton && !isInsideDrawer) {
                drawerWrapper.classList.add('closedDrawer');
                console.log('[nav-button] Closed drawer due to another drawer opening');
            }
        });
    }, 500);
}

if (typeof registerExtension === 'function') {
    registerExtension({
        name: 'nav-button',
        setup: setupExtension,
    });
} else {
    setupExtension();
}

// Load the CSS
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = './extensions/st-manage-chars/style.css';
document.head.appendChild(style);
