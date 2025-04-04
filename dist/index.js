console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#top-settings-holder');

        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] navBar found!', navBar);

            // Create drawer
            const drawer = document.createElement('div');
            drawer.id = 'custom-char-drawer';
            drawer.className = 'drawer-content closedDrawer';
            drawer.innerHTML = `
                <div class="drawer-header">Manage Characters</div>
                <div class="drawer-body" id="custom-char-body">
                    <div>Loading characters...</div>
                </div>
            `;
            document.body.appendChild(drawer);

            // Create nav button
            const btn = document.createElement('button');
            btn.className = 'nav-button';
            btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
            btn.title = 'Manage Characters';

            btn.addEventListener('click', () => {
                drawer.classList.toggle('closedDrawer');
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