let textareaElements = document.querySelectorAll('textarea.form-control');
let textareaAutogrow = function (e) {
    e.style.height = "5px";
    e.style.height = (e.scrollHeight) + "px";
};
for (let i = 0; i < textareaElements.length; i++) {
    textareaElements[i].addEventListener('input', function () {
        textareaAutogrow(this)
    });
    textareaAutogrow(textareaElements[i]);
}