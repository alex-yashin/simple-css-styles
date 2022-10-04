(function () {

    let getNearestParent = function(el, cl) {
        if (!el.parentElement) {
            return false;
        }

        if (el.parentElement.classList.contains(cl)) {
            return el.parentElement;
        }

        return getNearestParent(el.parentElement, cl);
    };

    let onChange = function () {
        let parent = getNearestParent(this, 'form-group');
        if (!parent) {
            return;
        }

        if (this.value !== "") {
            parent.classList.add('filled');
        } else {
            parent.classList.remove('filled');
        }
    };

    let inputTextElements = document.querySelectorAll("input[type=text],input[type=number],input[type=password],textarea,select");
    for (let i = 0; i < inputTextElements.length; i++) {

        if (inputTextElements[i].value !== "") {
            let parent = getNearestParent(inputTextElements[i], 'form-group');
            if (parent) {
                parent.classList.add('filled');
            }
        }

        inputTextElements[i].addEventListener('focusout', function() {
            let parent = getNearestParent(this, 'form-group');
            if (!parent) {
                return;
            }
            parent.classList.remove('focused');
            onChange();
        });
        inputTextElements[i].addEventListener('change', onChange);
        inputTextElements[i].addEventListener('focusin', function () {
            let parent = getNearestParent(this, 'form-group');
            if (!parent) {
                return;
            }
            parent.classList.add('filled');
            parent.classList.add('focused');
        });
    }
})();
