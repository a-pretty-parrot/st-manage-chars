console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#top-settings-holder');
        if (!navBar) return;

        clearInterval(navInterval);
        console.log('[nav-button] navBar found!', navBar);

        // Create drawer shell
        const drawerWrapper = document.createElement('div');
        drawerWrapper.id = 'nav-char-drawer';
        drawerWrapper.className = 'inline-drawer closedDrawer';

        const drawerContent = document.createElement('div');
        drawerContent.className = 'inline-drawer-content';
        drawerContent.innerHTML = `
            <div class="drawer-header">Character List</div>
            <div class="drawer-body" id="char-list">
                <div>Loading characters...</div>
            </div>
        `;
        drawerWrapper.appendChild(drawerContent);
        document.body.appendChild(drawerWrapper);

        // Add toggle button to nav
        const btn = document.createElement('button');
        btn.className = 'nav-button';
        btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
        btn.title = 'Character List';
        btn.addEventListener('click', () => {
            drawerWrapper.classList.toggle('closedDrawer');
            console.log('[nav-button] Toggle drawer:', !drawerWrapper.classList.contains('closedDrawer'));
        });
        navBar.appendChild(btn);

        // Fetch and display characters
        const charContainer = drawerContent.querySelector('#char-list');
        const charCards = Array.from(document.querySelectorAll('.charCard'));
        console.log('[nav-button] Found charCards:', charCards.length);

        let characters = [];

        if (charCards.length > 0) {
            characters = charCards.map(card => {
                const name = card.getAttribute('char_name') || 'Unknown';
                const avatar = card.querySelector('img')?.src || '';
                return { name, avatar };
            });
        } else if (window.characters) {
            console.log('[nav-button] Falling back to window.characters');
            characters = Object.values(window.characters).map(c => ({
                name: c.name || 'Unknown',
                avatar: c.avatar || ''
            }));
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