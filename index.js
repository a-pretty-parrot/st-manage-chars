console.log("[st-manage-chars] 🚀 Extension script loaded");

// Wait until DOM is fully loaded and nav-buttons is present
function waitForDomAndInject() {
    const nav = document.getElementById("nav-buttons");
    if (!nav) {
        console.log("[st-manage-chars] ⏳ Waiting for DOM...");
        return setTimeout(waitForDomAndInject, 250);
    }

    console.log("[st-manage-chars] ✅ DOM ready, injecting button...");
    injectManageCharsButton(nav);
}

waitForDomAndInject();

function injectManageCharsButton(nav) {
    if (document.getElementById("manageCharsNavButton")) {
        console.warn("[st-manage-chars] ⚠️ Button already exists, skipping");
        return;
    }

    const btn = document.createElement("button");
    btn.className = "nav-button";
    btn.id = "manageCharsNavButton";
    btn.innerText = "📚 Characters";

    btn.onclick = () => {
        const drawer = document.getElementById("st-manage-chars-drawer");
        drawer?.classList.toggle("open");
    };

    nav.appendChild(btn);
    console.log("[st-manage-chars] ✅ Button added");

    const drawer = document.createElement("div");
    drawer.id = "st-manage-chars-drawer";
    drawer.innerHTML = "<div style='padding: 16px;'>Character Drawer Loaded</div>";
    drawer.classList.add("st-drawer");
    document.body.appendChild(drawer);

    const style = document.createElement("style");
    style.textContent = `
        .st-drawer {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #222;
            color: white;
            z-index: 9999;
            display: none;
            overflow: auto;
            padding: 20px;
        }
        .st-drawer.open {
            display: block;
        }
    `;
    document.head.appendChild(style);

    console.log("[st-manage-chars] ✅ Drawer injected");
}

