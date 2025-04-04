console.log("[st-manage-chars] 🚀 Extension script loaded");

function waitForRegisterExtension(callback, retryCount = 0) {
    if (typeof registerExtension === "function") {
        callback();
    } else {
        if (retryCount >= 50) {
            console.error("[st-manage-chars] ❌ registerExtension still not available after 50 tries.");
            return;
        }
        console.log(`[st-manage-chars] ⏳ Waiting for registerExtension... (${50 - retryCount})`);
        setTimeout(() => waitForRegisterExtension(callback, retryCount + 1), 200);
    }
}

waitForRegisterExtension(() => {
    console.log("[st-manage-chars] ✅ registerExtension is available. Registering...");

    registerExtension({
        name: "st-manage-chars",
        setup() {
            console.log("[st-manage-chars] 🔧 Running setup()...");

            const nav = document.getElementById("nav-buttons");
            if (!nav) {
                console.error("[st-manage-chars] ❌ nav-buttons container not found!");
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
                console.log("[st-manage-chars] 🖱️ Button clicked!");
                const drawer = document.getElementById("st-manage-chars-drawer");
                if (drawer) {
                    drawer.classList.toggle("open");
                } else {
                    console.warn("[st-manage-chars] ⚠️ Drawer not found");
                }
            };

            nav.appendChild(btn);
            console.log("[st-manage-chars] ✅ Button added to navbar");

            // Add drawer container
            const drawer = document.createElement("div");
            drawer.id = "st-manage-chars-drawer";
            drawer.style.display = "none";
            drawer.innerHTML = "<div style='padding: 16px;'>Character Drawer Loaded</div>";

            drawer.classList.add("st-drawer");
            document.body.appendChild(drawer);

            // Setup drawer styles
            const style = document.createElement("style");
            style.textContent = `
                .st-drawer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #222;
                    color: white;
                    z-index: 9999;
                    overflow: auto;
                    display: none;
                    padding: 20px;
                }
                .st-drawer.open {
                    display: block;
                }
            `;
            document.head.appendChild(style);

            console.log("[st-manage-chars] ✅ Drawer setup complete");
        }
    });
});

