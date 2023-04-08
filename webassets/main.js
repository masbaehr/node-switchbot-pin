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