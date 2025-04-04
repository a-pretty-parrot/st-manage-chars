console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    let retryCount = 0;
    const maxRetries = 60; // Retry for up to 30s (60 * 500ms)

    const navInterval = setInterval(() => {
        retryCount++;
        console.log('[nav-button] Checking for nav bar... Attempt', retryCount);

        const navBar = document.querySelector('#top-settings-holder');
        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] navBar found!', navBar);

            try {
                // Create drawer shell
                const drawerWrapper = document.createElement('div');
                drawerWrapper.id = 'nav-char-drawer';
                drawerWrapper.className = 'custom-drawer closedDrawer';

                const drawerContent = document.createElement('div');
                drawerContent.className = 'custom-drawer-content';
                drawerContent.innerHTML = `
                    <div class="drawer-header">Manage Characters</div>
                    <div class="drawer-body" id="char-list">
                        <div>Loading characters...</div>
                    </div>
                `;
                drawerWrapper.appendChild(drawerContent);
                document.body.appendChild(drawerWrapper);
                console.log('[nav-button] Drawer appended to body');

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
                console.log('[nav-button] Button appended to nav bar');

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

                // Character fetching and display logic
                setTimeout(() => {
                    console.log('[nav-button] Running character listing logic...');
                    const charContainer = document.getElementById('char-list');
                    if (!charContainer) {
                        console.warn('[nav-button] char-list container not found!');
                        return;
                    }

                    const charCards = Array.from(document.querySelectorAll('.charCard'));
                    console.log('[nav-button] Found charCards:', charCards.length);

                    let characters = [];

                    if (charCards.length > 0) {
                        characters = charCards.map(card => {
                            const name = card.getAttribute('char_name') || 'Unknown';
                            const avatar = card.querySelector('img')?.src || '';
                            console.log('[nav-button] Character from DOM:', name, avatar);
                            return { name, avatar };
                        });
                    } else if (window.characters) {
                        console.log('[nav-button] Falling back to window.characters');
                        characters = Object.values(window.characters).map(c => {
                            console.log('[nav-button] Character from window.characters:', c.name, c.avatar);
                            return { name: c.name || 'Unknown', avatar: c.avatar || '' };
                        });
                    }

                    if (characters.length === 0) {
                        charContainer.innerHTML = '<div style="color: red;">No characters found. Try switching to the character select screen.</div>';
                        return;
                    }

                    charContainer.innerHTML = '';
                    characters.forEach(char => {
                        const entry = document.createElement('div');
                        entry.className = 'char-entry';
                        entry.innerHTML = \`
                            <img src="\${char.avatar}" alt="\${char.name}">
                            <span>\${char.name}</span>
                        \`;
                        charContainer.appendChild(entry);
                    });

                    console.log('[nav-button] Rendered', characters.length, 'characters.');
                }, 1000);
            } catch (err) {
                console.error('[nav-button] Error during setup:', err);
            }
        } else if (retryCount >= maxRetries) {
            clearInterval(navInterval);
            console.error('[nav-button] navBar not found after max retries.');
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