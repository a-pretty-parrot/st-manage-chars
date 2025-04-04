console.log('[nav-button] SCRIPT LOADED');

function setupExtension() {
    console.log('[nav-button] setupExtension() called');

    let attempt = 0;
    const navInterval = setInterval(() => {
        attempt++;
        console.log('[nav-button] Attempt', attempt, '- Checking for #top-settings-holder...');
        const navBar = document.querySelector('#top-settings-holder');

        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] Found nav bar:', navBar);

            try {
                // Drawer creation
                console.log('[nav-button] Creating drawer DOM...');
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

                // Button creation
                console.log('[nav-button] Creating nav button...');
                const btn = document.createElement('button');
                btn.className = 'nav-button';
                btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
                btn.title = 'Manage Characters';

                btn.addEventListener('click', () => {
                    console.log('[nav-button] Button clicked');
                    drawerWrapper.classList.toggle('closedDrawer');
                    const isOpen = !drawerWrapper.classList.contains('closedDrawer');
                    console.log('[nav-button] Drawer is now', isOpen ? 'OPEN' : 'CLOSED');

                    if (isOpen) {
                        console.log('[nav-button] Calling renderCharacters()...');
                        renderCharacters();
                    }
                });

                navBar.appendChild(btn);
                console.log('[nav-button] Button appended to nav bar');

                // Drawer auto-close
                document.body.addEventListener('click', (e) => {
                    const isOurButton = e.target.closest('.nav-button');
                    const isInsideDrawer = e.target.closest('#nav-char-drawer');
                    const anyOpenDrawer = document.querySelector('.inline-drawer:not(.closedDrawer)');

                    if (anyOpenDrawer && !drawerWrapper.classList.contains('closedDrawer') && !isOurButton && !isInsideDrawer) {
                        drawerWrapper.classList.add('closedDrawer');
                        console.log('[nav-button] Auto-closed drawer due to another drawer opening');
                    }
                });

                // Render characters
                function renderCharacters() {
                    console.log('[nav-button] renderCharacters() called');
                    const charContainer = document.getElementById('char-list');
                    if (!charContainer) {
                        console.warn('[nav-button] #char-list not found');
                        return;
                    }

                    console.log('[nav-button] Looking for .charCard...');
                    const charCards = Array.from(document.querySelectorAll('.charCard'));
                    console.log('[nav-button] Found', charCards.length, 'charCards');

                    let characters = [];

                    if (charCards.length > 0) {
                        charCards.forEach(card => {
                            const name = card.getAttribute('char_name') || 'Unknown';
                            const avatar = card.querySelector('img')?.src || '';
                            console.log('[nav-button] DOM Character:', name, avatar);
                            characters.push({ name, avatar });
                        });
                    } else if (window.characters) {
                        console.log('[nav-button] Falling back to window.characters');
                        characters = Object.values(window.characters).map(c => {
                            console.log('[nav-button] Window Character:', c.name, c.avatar);
                            return { name: c.name || 'Unknown', avatar: c.avatar || '' };
                        });
                    }

                    if (characters.length === 0) {
                        console.warn('[nav-button] No characters found from any method');
                        charContainer.innerHTML = '<div style="color:red;">No characters found. Try opening the character screen.</div>';
                        return;
                    }

                    console.log('[nav-button] Rendering', characters.length, 'characters');
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
                }
            } catch (err) {
                console.error('[nav-button] ERROR in setup:', err);
            }
        } else {
            if (attempt >= 60) {
                clearInterval(navInterval);
                console.error('[nav-button] navBar not found after 30 seconds.');
            }
        }
    }, 500);
}

if (typeof registerExtension === 'function') {
    console.log('[nav-button] Using registerExtension');
    registerExtension({
        name: 'nav-button',
        setup: setupExtension,
    });
} else {
    console.log('[nav-button] Calling setupExtension directly');
    setupExtension();
}

// Load the CSS
console.log('[nav-button] Injecting CSS');
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = './extensions/st-manage-chars/style.css';
document.head.appendChild(style);