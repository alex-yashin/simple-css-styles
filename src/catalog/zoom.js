function setZoom(zoom, scale, x, y) {
    let z = zoom.querySelector('img');
    z.style.transform = "scale(" + scale + ")";
    z.style.transformOrigin = x + '% ' + y + '%';
}
function onZoom(e) {
    setZoom(this, 2, e.offsetX / this.offsetWidth * 100, e.offsetY / this.offsetHeight * 100);
    e.preventDefault();
}

let zoomElements = document.querySelectorAll(".zoom");
for (let i = 0; i < zoomElements.length; i++) {
    zoomElements[i].addEventListener('click', onZoom);
    zoomElements[i].onmousemove = onZoom;
    zoomElements[i].onmouseout = function () {
        setZoom(this, 1, 0, 0,);
    };
}
