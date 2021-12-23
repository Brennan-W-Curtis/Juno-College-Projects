// Store elements (the cookie settings window and the button) that will be manipulated in variables
const cookieWindow = document.querySelector("#cookieWindow");
const acceptCookies = document.querySelector("#acceptCookies");

// Create an Event Listener that reacts to the page loading by revealing the cookie settings window
window.addEventListener("load", () => {
    cookieWindow.classList.remove("hiddenWindow");
});

// Create an Event Listener that changes the visibility of the cookie settings window upon the user clicking a button
acceptCookies.addEventListener("click", () => {
    cookieWindow.classList.add("hiddenWindow");
});