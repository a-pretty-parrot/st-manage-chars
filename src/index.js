console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#top-settings-holder');

        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] navBar found!', navBar);

            // Create drawer shell
            const drawerWrapper = document.createElement('div');
            drawerWrapper.id = 'nav-char-drawer';
            drawerWrapper.className = 'inline-drawer';

            const drawerContent = document.createElement('div');
            drawerContent.className = 'inline-drawer-content closedDrawer';
            drawerContent.innerHTML = `
                <div class="drawer-header">Manage Characters</div>
                <div class="drawer-body" id="custom-char-body">
                    <div>Loading characters...</div>
                </div>
            `;

            drawerWrapper.appendChild(drawerContent);
            document.body.appendChild(drawerWrapper);

            // Create nav button
            const btn = document.createElement('button');
            btn.className = 'nav-button';
            btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
            btn.title = 'Manage Characters';

            btn.addEventListener('click', () => {
                drawerContent.classList.toggle('closedDrawer');
                console.log('[nav-button] Toggle drawer:', !drawerContent.classList.contains('closedDrawer'));
            });

            navBar.appendChild(btn);
        } else {
            console.log('[nav-button] navBar not found yet...');
        }
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