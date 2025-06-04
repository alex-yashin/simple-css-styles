$ = function() {return {'on': function () {}}};//временная заглушка под HandledForm

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
                if (!helpTarget) {
                    help = fg.querySelector(helpTarget);
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

const listenAjaxEvents = function(root) {
    let handleErrors = function (context, data) {
        PinaSkin.hideErrors(context);

        if (data && data.errors && data.errors.length > 0) {
            for (i = 0; i < data.errors.length; i++) {
                var m = data.errors[i];
                PinaSkin.showError(context, m[1] ? m[1] : '', m[0]);
            }
        }
    };

    let formRequest = async function (el, method, url, data, headers) {
        const resp = await pn.request(method, url, data, headers);

        let to = resolveRedirect(el, resp);
        if (to) {
            document.location = to + (to.indexOf('?') === -1 ? '?' : '&') + "_c=" + Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
        } else if (resp.ok) {
            document.location.reload();
        }

        el.dispatchEvent(new Event(resp.ok ? 'success' : 'error'));

        try {
            return await resp.json();
        } catch (e) {
            return [];
        }
    };

    let resolveRedirect = function (el, resp) {
        if (resp.ok && el.getAttribute('data-success')) {
            return el.getAttribute('data-success');
        }

        if (resp.ok && el.getAttribute('data-redirect')) {
            return el.getAttribute('data-redirect');
        }

        if (resp.headers.get('location')) {
            return resp.headers.get('location');
        }

        if (resp.headers.get('content-location')) {
            return resp.headers.get('content-location');
        }
        return '';
    };

    let onSubmit = async function (e) {
        e.preventDefault();

        let submit = this.querySelector('[type=submit]');
        if (submit) {
            submit.disabled = true;
        }

        this.dispatchEvent(new Event('ajax-submit'));

        let json = await formRequest(this, this.method, this.action, new FormData(this), {});

        handleErrors(this, json);

        if (submit) {
            submit.disabled = false;
        }
    };

    let onClick = function (e) {
        e.preventDefault();

        let method = this.getAttribute('data-method');
        let resource = this.getAttribute('data-resource');
        let params = this.getAttribute('data-params');
        let headers = {
            'Content-type': 'application/x-www-form-urlencoded',
        };
        formRequest(this, method, '/' + resource, params, headers);
    };

    pn.onIn(root, '.pina-form', 'submit', onSubmit);
    pn.onIn(root, '.pina-action', 'click', onClick);

}

listenAjaxEvents(document);