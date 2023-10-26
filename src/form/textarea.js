let textareaAutogrow = function (e) {
    let computed = window.getComputedStyle(e);
    let padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    let oldHeight = parseInt(e.style.height);
    let newHeight = e.scrollHeight - Math.ceil(padding);
    if (newHeight > oldHeight || !oldHeight) {
        e.style.height = newHeight + "px";
    }
};
document.addEventListener("DOMContentLoaded", function() {
    let textareaElements = document.querySelectorAll('textarea.form-control');
    for (let i = 0; i < textareaElements.length; i++) {
        textareaElements[i].addEventListener('input', function () {
            textareaAutogrow(this)
        });
        textareaAutogrow(textareaElements[i]);
    }
});
