let textareaElements = document.querySelectorAll('textarea.form-control');
let textareaAutogrow = function (e) {
    let computed = window.getComputedStyle(e);
    let padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);
    e.style.height = "5px";
    e.style.height = (e.scrollHeight - padding) + "px";
};
for (let i = 0; i < textareaElements.length; i++) {
    textareaElements[i].addEventListener('input', function () {
        textareaAutogrow(this)
    });
    textareaAutogrow(textareaElements[i]);
}