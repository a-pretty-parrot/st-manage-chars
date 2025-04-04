console.log("[st-manage-chars] 🚀 Extension script loaded");

// 🚀 Wait for SillyTavern's app to be fully ready
document.addEventListener("app_ready", () => {
    console.log("[st-manage-chars] ✅ app_ready detected");

    let attempts = 0;
    const maxAttempts = 30;

    const tryRegister = () => {
        if (typeof registerExtension === "function") {
            console.log("[st-manage-chars] ✅ registerExtension is available");

            registerExtension({
                name: "st-manage-chars",
                setup() {
                    console.log("[st-manage-chars] 🧠 Running setup...");

                    const navBar = document.getElementById("nav-buttons");
                    if (!navBar) {
                        console.warn("[st-manage-chars] ❌ nav-buttons not found.");
                        return;
                    }

                    const button = document.createElement("button");
                    button.id = "manageCharsNavButton";
                    button.innerText = "📚 Characters";
                    button.classList.add("nav-button");
                    button.style.marginLeft = "8px";
                    button.onclick = () => {
                        console.log("[st-manage-chars] 🟩 Button clicked");
                        alert("Character Manager Button Clicked!");
                    };

                    navBar.appendChild(button);
                    console.log("[st-manage-chars] ✅ Button added to nav bar");
                }
            });

        } else {
            attempts++;
            if (attempts > maxAttempts) {
                console.error("[st-manage-chars] ❌ Failed to register after max attempts.");
                return;
            }
            console.log(`[st-manage-chars] ⏳ Waiting for registerExtension... (${attempts})`);
            setTimeout(tryRegister, 500);
        }
    };

    tryRegister();
});

