console.log("[st-manage-chars] 🚀 Extension script loaded");

let attempts = 0;
const maxAttempts = 60;

function waitForRegisterExtension() {
    if (typeof registerExtension === "function") {
        console.log("[st-manage-chars] ✅ registerExtension is ready, registering extension");

        registerExtension({
            name: "st-manage-chars",
            setup() {
                console.log("[st-manage-chars] 🧠 Running setup");

                const navBar = document.getElementById("nav-buttons");
                if (!navBar) {
                    console.error("[st-manage-chars] ❌ nav-buttons not found!");
                    return;
                }

                const button = document.createElement("button");
                button.id = "manageCharsNavButton";
                button.innerText = "📚 Characters";
                button.classList.add("nav-button");
                button.style.marginLeft = "8px";
                button.onclick = () => {
                    console.log("[st-manage-chars] 🟢 Button clicked!");
                    alert("Character manager clicked!");
                };

                navBar.appendChild(button);
                console.log("[st-manage-chars] ✅ Button added to nav bar");
            }
        });

    } else {
        attempts++;
        if (attempts > maxAttempts) {
            console.error("[st-manage-chars] ❌ registerExtension not available after max retries.");
            return;
        }
        console.log(`[st-manage-chars] ⏳ Waiting for registerExtension... (${attempts})`);
        setTimeout(waitForRegisterExtension, 500);
    }
}

// Make sure we start only *after* app_ready
document.addEventListener("app_ready", () => {
    console.log("[st-manage-chars] 🎯 app_ready event received, starting init");
    waitForRegisterExtension();
});

