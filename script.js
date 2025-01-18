function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.querySelector(".main-content").style.marginLeft = "0px";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.querySelector(".main-content").style.marginLeft = "400px";
}