// grap everything we need 
const btn = document.querySelector('.mobileMenuBtn');
const sidebar = document.querySelector(".sidebar");

// add our event 
var changeIcon = false
btn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full")
    changeIcon = !changeIcon
    changeIcon ? btn.innerHTML = `<i class="far fa-window-close"></i>` : btn.innerHTML = `<i class="fas fa-bars"></i>`
})
document.querySelector(".dashContainer").addEventListener("click", () => {
    console.log("sqdqsd")
})