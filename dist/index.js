console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('.topNavRight') || document.querySelector('#nav-buttons');
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