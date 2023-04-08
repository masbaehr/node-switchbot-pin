document.querySelectorAll("button").forEach(btn => {
    btn.onmouseup = function () {
        setTimeout(function () {
            btn.style.backgroundColor = "#ecf6ff";
        }, 400);
    };
    btn.onmousedown = function () {
        btn.style.backgroundColor = "#fff988";
    };
});
async function typeNum(n) {
    if (n === '↵') {
        await fetch("/presscode=" + document.getElementById("curcode").value);
        document.getElementById("curcode").value = "";
    }
    if (n === 'C') {
        document.getElementById("curcode").value = "";
    }
    if (n !== 'C' && n !== '↵') {
        document.getElementById("curcode").value = document.getElementById("curcode").value + n;
    }
};
function setLightMode(){
    document.body.classList.remove("bodyDarkMode");
    document.querySelector(".footer").classList.remove("headerFooterDarkMode");
    document.querySelector(".header").classList.remove("headerFooterDarkMode");
    localStorage.setItem("screen_mode", "light");
}
function setDarkMode(){
    document.body.classList.add("bodyDarkMode");
    document.querySelector(".footer").classList.add("headerFooterDarkMode");
    document.querySelector(".header").classList.add("headerFooterDarkMode");
    localStorage.setItem("screen_mode", "dark");
}
function setTitle(){
    let newtitle = prompt("Please type the new title", "Node-Switchbot-PIN");
    if (newtitle != null) {
        document.getElementById("app-title").innerText = newtitle;
        localStorage.setItem("custom_title", newtitle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try{
        let screenmode = localStorage.getItem("screen_mode");
        if(screenmode === null || screenmode === "light"){
            setLightMode();
        }
        if(screenmode !== null && screenmode === "dark"){
            setDarkMode();
        }
        if(localStorage.getItem("custom_title") !== null){
            document.getElementById("app-title").innerText = localStorage.getItem("custom_title");
        }
    }catch(e){

    }
}, false);

 