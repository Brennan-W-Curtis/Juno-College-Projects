const body = document.querySelector("body");
const menuIcon = document.querySelector(".fa-bars");
const slidingMenu = document.querySelector(".slidingMenu");
let checkboxInput = document.querySelector("input[type='checkbox']");

menuIcon.addEventListener("click", () => {
    slidingMenu.style.right = "0";
    checkboxInput.checked = true;
});

body.addEventListener("click", () => {
    if (checkboxInput.checked === true) {
        checkboxInput.checked = false;
    } else {
        checkboxInput.checked = true;
        slidingMenu.style.right = "-25%";
    }
});
