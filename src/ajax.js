let PinaSkin = {};
PinaSkin.hideErrors = function (el) {
    pn.eachIn(el, '.pina-alert', function () {
        this.remove();
    });
    pn.eachIn(el, '.pina-error', function () {
        this.remove();
    });
    pn.eachIn(el, '.form-group.error', function () {
        this.classList.remove('error');
    });
};

PinaSkin.showError = function (el, subj, mess) {
    var inputs = el.querySelectorAll('[name="' + subj + '"]');
    if (!inputs.length) {
        inputs = el.querySelectorAll('[name="' + subj + '[]"]');
    }
    if (!inputs.length) {
        PinaSkin.showErrorAlert(el, mess);
        return;
    }
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];

        let fg = input.closest('.form-group');
        if (fg) {
            fg.classList.add('error');

            if (input.type === 'radio') {

            } else {
                let help = null;
                let helpTarget = input.getAttribute('data-error-target');
                if (helpTarget) {
                    help = fg.querySelector(helpTarget);
                    if (!help) {
                        help = el.querySelector(helpTarget);
                    }
                }

                var helpContent = document.createElement('p');
                helpContent.classList.add('pina-error');
                helpContent.innerText = mess;
                if (help) {
                    help.appendChild(helpContent);
                } else {
                    fg.appendChild(helpContent);
                }
            }
        }
    }
};

PinaSkin.showErrorAlert = function(el, mess) {
    let alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-danger');
    alert.innerText = mess;
    alert.addEventListener('click', function() {
        this.remove();
    });

    let container = document.querySelector('.pina-error-popup');
    if (container) {
        container.appendChild(alert);
    } else {
        el.appendChild(alert);
    }

    setTimeout(function () {
        alert.click();
    }, 15000);

};

const handleAjaxErrors = function (root, data) {
    PinaSkin.hideErrors(root);

    if (data && data.errors && data.errors.length > 0) {
        for (var i = 0; i < data.errors.length; i++) {
            var m = data.errors[i];
            PinaSkin.showError(root, m[1] ? m[1] : '', m[0]);
        }
    }
};

const ajaxRequest = async function (el, method, url, data, headers) {
    let resolveRedirect = function (el, resp) {
        if (resp.headers.get('location')) return resp.headers.get('location');
        if (resp.headers.get('content-location')) return resp.headers.get('content-location');
        if (resp.ok && el.getAttribute('data-success')) return el.getAttribute('data-success');
        if (resp.ok && el.getAttribute('data-redirect')) return el.getAttribute('data-redirect');
        return '';
    };

    const resp = await pn.request(method, url, data, headers);

    var json = null;
    try {
        json = await resp.json();
    } catch (e) {
        return [];
    }

    el.dispatchEvent(new CustomEvent(resp.ok ? 'success' : 'error', {detail: json}));

    var to = resolveRedirect(el, resp);
    if (to === '#') {
    } else if (to) {
        document.location = to + (to.indexOf('?') === -1 ? '?' : '&') + "_c=" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    } else if (resp.ok) {
        document.location.reload();
    }

    return json;
};

const ajaxAction = function(el) {
    let confirmation = el.getAttribute('data-confirmation-message');
    if (confirmation && confirmation.length > 0 && !confirm(confirmation)) {
        return false;
    }

    let method = el.getAttribute('data-method');
    let resource = el.getAttribute('data-resource');
    let params = el.getAttribute('data-params');
    let headers = {
        'Content-type': 'application/x-www-form-urlencoded',
    };
    ajaxRequest(el, method, '/' + resource, params, headers);
};

const listenAjaxEvents = function(root) {

    let onSubmit = async function (e) {
        e.preventDefault();
        // if (e.detail && e.detail.repeat) {
        //     return;
        // }

        let submit = this.querySelector('[type=submit]');
        if (submit) {
            submit.disabled = true;
        }

        this.dispatchEvent(new Event('ajax-submit'));
        // this.dispatchEvent(new CustomEvent('submit', {detail: {repeat: true}}));

        let json = await ajaxRequest(this, this.method, this.action, new FormData(this), {});

        handleAjaxErrors(this, json);

        if (submit) {
            submit.disabled = false;
        }
    };

    pn.onIn(root, '.pina-form', 'submit', onSubmit);
    pn.onIn(root, '.pina-action', 'click', function (e) {e.preventDefault(); ajaxAction(this);});
};

listenAjaxEvents(document);

const ajaxSubmit = function(sel) {
    pn.first(sel, function (e) {e.dispatchEvent(new CustomEvent('submit', {cancelable: true}));});
};