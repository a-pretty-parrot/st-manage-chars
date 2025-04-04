console.log("[st-manage-chars] 🚀 Extension script loaded");

function addNavButton() {
    const navBar = document.getElementById("nav-buttons");
    if (!navBar) {
        console.error("[st-manage-chars] ❌ nav-buttons not found!");
        return;
    }

    if (document.getElementById("manageCharsNavButton")) {
        console.warn("[st-manage-chars] ⚠️ Button already exists, skipping");
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

function register() {
    if (typeof registerExtension !== "function") {
        console.log("[st-manage-chars] ❌ registerExtension not ready, retrying...");
        setTimeout(register, 500);
        return;
    }

    console.log("[st-manage-chars] ✅ registerExtension ready, registering...");
    registerExtension({
        name: "st-manage-chars",
        setup() {
            console.log("[st-manage-chars] 🧠 setup() running...");
            addNavButton();
        }
    });
}

function init() {
    console.log("[st-manage-chars] 🎯 init() after app_ready or fallback load");
    register();
}

document.addEventListener("app_ready", () => {
    console.log("[st-manage-chars] ✅ app_ready event fired");
    init();
});

window.addEventListener("load", () => {
    console.log("[st-manage-chars] 🕒 window.load fallback fired");
    setTimeout(init, 500); // Delay slightly to wait for SillyTavern internals
});

