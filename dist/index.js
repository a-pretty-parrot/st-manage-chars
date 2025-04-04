console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const allButtons = document.querySelectorAll('button');
        console.log('[nav-button] Scanning buttons:', allButtons);

        const navIcons = document.querySelector('.navIcons');
        const topNav = document.querySelector('.topNavRight');
        const allDivs = document.querySelectorAll('div');

        console.log('[nav-button] .navIcons:', navIcons);
        console.log('[nav-button] .topNavRight:', topNav);
        console.log('[nav-button] div count:', allDivs.length);

        allDivs.forEach(div => {
            if (div.innerHTML.includes('fa-plug')) {
                console.log('[nav-button] 🔍 Candidate div:', div);
            }
        });

        const navBar = navIcons || topNav;
        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] navBar found!', navBar);

            const btn = document.createElement('button');
            btn.className = 'nav-button';
            btn.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
            btn.title = 'MyButton';

            btn.addEventListener('click', () => {
                alert('Nav button clicked!');
            });

            navBar.appendChild(btn);
        } else {
            console.log('[nav-button] navBar not found yet...');
        }
    }, 1000);
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
