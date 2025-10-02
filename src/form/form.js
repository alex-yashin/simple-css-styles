/* globals pn */
(function () {
    'use strict';
    let getNearestParent = function(el, cl) {
        if (!el.parentElement) {
            return false;
        }

        if (el.parentElement.classList.contains(cl)) {
            return el.parentElement;
        }

        return getNearestParent(el.parentElement, cl);
    };

    pn.each('input[type=text],input[type=number],input[type=password],textarea,select', function(e) {
        if (e.value !== '') {
            let parent = getNearestParent(e, 'form-group');
            if (parent) {
                parent.classList.add('filled');
            }
        }
        e.addEventListener('focusout', function() {
            let parent = getNearestParent(this, 'form-group');
            if (!parent) {
                return;
            }
            parent.classList.remove('focused');
        });
        e.addEventListener('change', function() {
            let parent = getNearestParent(this, 'form-group');
            if (!parent) {
                return;
            }
            if (this.value !== "") {
                parent.classList.add('filled');
            } else {
                parent.classList.remove('filled');
            }
        });
        e.addEventListener('focusin', function () {
            let parent = getNearestParent(this, 'form-group');
            if (!parent) {
                return;
            }
            parent.classList.add('focused');
        });
    });
})();
