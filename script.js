// extensions/nav-button/script.js

function setupExtension() {
    const navInterval = setInterval(() => {
        const navBar = document.querySelector('#nav-buttons');
        if (navBar) {
            clearInterval(navInterval);

            // Create the new button
            const btn = document.createElement('button');
            btn.className = 'nav-button';
            btn.innerText = 'MyButton';

            // Optional icon (FontAwesome, matches existing style)
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-mug-hot';
            btn.prepend(icon);

            // Click handler
            btn.addEventListener('click', () => {
                alert('You clicked MyButton!');
            });

            // Append the button
            navBar.appendChild(btn);
        }
    }, 500);
}

// Register the extension
if (typeof registerExtension === 'function') {
    registerExtension({
        name: 'nav-button',
        setup: setupExtension,
    });
} else {
    setupExtension();
}

// Load external stylesheet
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = './extensions/nav-button/style.css'; // Path relative to the main app
document.head.appendChild(style);

