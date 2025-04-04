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
            <div class="drawer-header">Manage Characters</div>
            <input type="text" id="char-search" placeholder="Search characters..." style="width: 100%; margin-bottom: 10px; padding: 6px; font-size: 16px;">
            <div id="grouped-char-list" style="display: flex; flex-direction: column; gap: 10px;"></div>
            <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                <button id="char-prev">Previous</button>
                <button id="char-next">Next</button>
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

        // Character rendering logic
        let groupedCharacters = [];
        let currentPage = 0;
        const pageSize = 10;

        function fetchCharacters() {
            const charCards = Array.from(document.querySelectorAll('.charCard'));
            const raw = charCards.map(card => {
                const name = card.getAttribute('char_name') || 'Unknown';
                const avatar = card.querySelector('img')?.src || '';
                const json = card.getAttribute('char_data') || '{}';
                let version = '';
                try {
                    const parsed = JSON.parse(json);
                    version = parsed?.data?.["Character Version"] || '';
                } catch { }
                return { name, avatar, version, rawElement: card };
            });

            // Grouping logic
            const grouped = {};
            raw.forEach(char => {
                const key = char.name + '|' + char.avatar;
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(char);
            });

            groupedCharacters = Object.entries(grouped).map(([key, versions]) => ({
                name: versions[0].name,
                avatar: versions[0].avatar,
                versions
            }));
        }

        function renderCharacters() {
            const container = document.getElementById('grouped-char-list');
            const search = document.getElementById('char-search').value.toLowerCase();
            container.innerHTML = '';

            const filtered = groupedCharacters.filter(g =>
                g.name.toLowerCase().includes(search)
            );

            const paged = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

            paged.forEach(group => {
                const groupDiv = document.createElement('div');
                groupDiv.innerHTML = `<strong>+ ${group.name}</strong>`;
                group.versions.forEach(v => {
                    const card = document.createElement('div');
                    card.style.display = 'flex';
                    card.style.alignItems = 'center';
                    card.style.gap = '10px';
                    card.innerHTML = `
                        <img src="${v.avatar}" alt="${v.name}" style="width: 50px; height: 50px; border-radius: 5px;">
                        <div>${v.name}${v.version ? ' (' + v.version + ')' : ''}</div>
                    `;
                    groupDiv.appendChild(card);
                });
                container.appendChild(groupDiv);
            });
        }

        // Bind events
        document.getElementById('char-search').addEventListener('input', () => {
            currentPage = 0;
            renderCharacters();
        });

        document.getElementById('char-next').addEventListener('click', () => {
            currentPage++;
            renderCharacters();
        });

        document.getElementById('char-prev').addEventListener('click', () => {
            currentPage = Math.max(0, currentPage - 1);
            renderCharacters();
        });

        fetchCharacters();
        renderCharacters();
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