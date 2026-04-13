//This is the Script For Index.html / Setup.css

// ------------------------------
// BOOT ANIMATION
// ------------------------------
window.addEventListener("load", () => {
    const boot = document.getElementById("screen-boot");

    // Boot duration: 5–10 seconds
    const duration = Math.random() * (10000 - 5000) + 5000;

    setTimeout(() => {
        boot.classList.add("hidden");

        // After fade-out, show Language screen
        setTimeout(() => {
            showScreen("screen-language");
        }, 800);

    }, duration);
});

// ------------------------------
// GLOBAL STATE
// ------------------------------
let currentScreen = "screen-language";
let selectedWifi = null;
let selectedDevice = null;
let selectedTheme = null;

// ------------------------------
// PANEL TRANSITION HANDLING
// ------------------------------
function showScreen(id) {
    const oldPanel = document.getElementById(currentScreen);
    const newPanel = document.getElementById(id);

    oldPanel.classList.remove("active");
    oldPanel.classList.add("prev");

    newPanel.classList.add("active");
    newPanel.classList.remove("prev");

    currentScreen = id;
}

// ------------------------------
// WALLPAPER HANDLING
// ------------------------------
function applyWallpaper() {
    const isPhone = selectedDevice === "AuroPhone";
    const isDark = selectedTheme === "dark";

    let wallpaper = "";

    if (isPhone) {
        wallpaper = isDark
            ? "Wallpapers/setupwallpaper2_dark.jpg"
            : "Wallpapers/setupwallpaper2.jpg";
    } else {
        wallpaper = isDark
            ? "Wallpapers/setupwallpaper_dark.jpg"
            : "Wallpapers/setupwallpaper.jpg";
    }

    document.getElementById("wallpaper-blur").style.backgroundImage = `url('${wallpaper}')`;
    document.getElementById("wallpaper-sharp").style.backgroundImage = `url('${wallpaper}')`;
}

// ------------------------------
// WIFI SELECTION
// ------------------------------
function chooseWifi(type) {
    selectedWifi = type;

    if (type === "main") {
        document.getElementById("pw-label").textContent = "Password for Auroralis‑Main";
        showScreen("screen-password");
    } else if (type === "custom") {
        document.getElementById("pw-label").textContent = "Password for Verizon‑3FTWp0Q";
        showScreen("screen-password");
    } else {
        connectToWifi();
    }
}

function confirmPassword() {
    const pw = document.getElementById("pw-input").value;
    const error = document.getElementById("pw-error");

    if (selectedWifi === "main" && pw !== "auroralis") {
        error.style.display = "block";
        return;
    }

    if (selectedWifi === "custom" && pw !== "Verizon-3FTWq0Q") {
        error.style.display = "block";
        return;
    }

    error.style.display = "none";
    connectToWifi();
}

function connectToWifi() {
    showScreen("screen-connecting");

    setTimeout(() => {
        runEligibilityCheck();
    }, 1500);
}

// ------------------------------
// ELIGIBILITY CHECK
// ------------------------------
function runEligibilityCheck() {
    showScreen("screen-eligibility");

    let failChance = 0;

    if (selectedWifi === "main") failChance = 0.01;
    if (selectedWifi === "secondary") failChance = 0.25;
    if (selectedWifi === "custom") failChance = 0.50;

    setTimeout(() => {
        if (Math.random() < failChance) {
            showScreen("screen-fail");
        } else {
            showScreen("screen-devices");
        }
    }, 2000);
}

// ------------------------------
// DEVICE SELECTION
// ------------------------------
function chooseDevice(device) {
    selectedDevice = device;
    localStorage.setItem("auroralisDevice", device);

    applyWallpaper();

    showScreen("screen-theme");
}

// ------------------------------
// THEME SELECTION
// ------------------------------
function chooseTheme(mode) {
    selectedTheme = mode;
    localStorage.setItem("auroralisTheme", mode);

    applyWallpaper();
    applyThemeToPanels();

    showScreen("screen-complete");

    setTimeout(() => {
        redirectToDevice();
    }, 1800);
}

function applyThemeToPanels() {
    const panels = document.querySelectorAll(".panel");

    if (selectedTheme === "dark") {
        panels.forEach(p => {
            p.style.background = "rgba(28,28,30,0.55)";
            p.style.color
