(function () {
    let selectElements = document.querySelectorAll("select");
    for (let i = 0; i < selectElements.length; i++) {
        let button = document.createElement('div');
        button.className = 'select-button';
        selectElements[i].parentNode.insertBefore(button, selectElements[i].nextSibling);
    }
})();