function toggleWorkShow() {
    const window = document.getElementById("work");
    window.classList.toggle("hidden")
}

document.getElementById("show-window-button").onclick = toggleWorkShow
document.getElementById("controls-close-button").onclick = toggleWorkShow