/* globals pn */
'use strict';
let textareaAutogrow = function (e) {
    let computed = window.getComputedStyle(e);
    let padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    let oldHeight = parseInt(e.style.height);
    let newHeight = e.scrollHeight - Math.ceil(padding);
    if (newHeight > oldHeight || !oldHeight) {
        e.style.height = newHeight + 'px';
    }
};
document.addEventListener('DOMContentLoaded', function() {
    pn.each('textarea.form-control', function(e) {
        e.addEventListener('input', function () {
            textareaAutogrow(this);
        });
        textareaAutogrow(e);
    });
});
