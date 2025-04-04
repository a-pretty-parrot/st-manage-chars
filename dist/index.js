console.log('[nav-button] Extension script loaded.');

function setupExtension() {
    console.log('[nav-button] Setting up...');

    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#nav-buttons');
        if (navBar) {
            clearInterval(navInterval);
            console.log('[nav-button] navBar found!');

            const btn = document.createElement('button');
            btn.className = 'nav-button';
            btn.innerText = 'MyButton';

            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-mug-hot';
            btn.prepend(icon);

            btn.addEventListener('click', () => {
                alert('Nav button clicked!');
            });

            navBar.appendChild(btn);
        }
    }, 500);
}

if (typeof registerExtension === 'function') {
    registerExtension({
        name: "nav-button",
        setup() {
            console.log("Extension running...");
        }
    });
} else {
    setupExtension();
}

// Load the CSS manually
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = './extensions/nav-button/style.css';
document.head.appendChild(style);
