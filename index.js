console.log("[st-manage-chars] >>> Extension script loaded <<<");

// ✅ Ensure SillyTavern is fully initialized before proceeding
function waitForStReady(retries = 50) {
    if (typeof registerExtension === "function") {
        console.log("[st-manage-chars] ✅ registerExtension is available");

        // ✅ Register extension
        registerExtension({
            name: "st-manage-chars",
            setup() {
                console.log("[st-manage-chars] 🚀 Extension setup running");

                // ✅ Find the nav bar
                const navBar = document.getElementById("nav-buttons");
                if (!navBar) {
                    console.warn("[st-manage-chars] ❌ nav-buttons container not found.");
                    return;
                }

                // ✅ Create the button
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
    } else if (retries > 0) {
        console.log(`[st-manage-chars] ⏳ Waiting for registerExtension... (${retries})`);
        setTimeout(() => waitForStReady(retries - 1), 500);
    } else {
        console.error("[st-manage-chars] ❌ registerExtension never became available");
    }
}

waitForStReady();

