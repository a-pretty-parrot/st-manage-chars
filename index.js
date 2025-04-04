console.log("[st-manage-chars] 🚀 Extension script loaded");

function createManageCharsButton() {
    const nav = document.getElementById("nav-buttons");
    if (!nav) {
        console.error("[st-manage-chars] ❌ nav-buttons not found.");
        return;
    }

    if (document.getElementById("manageCharsNavButton")) {
        console.warn("[st-manage-chars] ⚠️ Button already exists, skipping");
        return;
    }

    const btn = document.createElement("button");
    btn.className = "nav-button";
    btn.id = "manageCharsNavButton";
    btn.innerText = "📚 Characters";

    btn.onclick = () => {
        console.log("[st-manage-chars] 🖱️ Toggle drawer");
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

// Hook into global extension system
window.addEventListener("DOMContentLoaded", () => {
    console.log("[st-manage-chars] ⏳ Waiting for app_ready...");

    document.addEventListener("app_ready", () => {
        console.log("[st-manage-chars] 🎉 app_ready received. Bootstrapping...");
        createManageCharsButton();
    });
});

