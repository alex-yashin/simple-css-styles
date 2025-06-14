const openOverlay = function(callback) {
    openOverlayImpl(callback, '');
};

const openDarkOverlay = function (callback) {
    openOverlayImpl(callback, 'dark');
};

const openOverlayImpl = function(callback, cl) {
    let o = zz('.overlay.%').make([cl]);
    o.addEventListener('click', function() {
        hideOverlay();
        callback();
    });
    pn.first('body', (b) => {b.append(o); b.classList.add('overlay-lock');});
};

const hideOverlay = function() {
    pn.each('.overlay', (e) => e.remove());
    document.querySelector('body').classList.remove('overlay-lock');
};

const showModal = function(s) {
    showModalImpl(s, '');
};

const showDarkModal = function(s) {
    showModalImpl(s, 'dark');
};

let openedModal = '';

const showModalImpl = function(s, cl) {
    if (openedModal) hideModal(openedModal);
    openedModal = s;
    pn.first(s, (e) => e.classList.add('active'));
    openOverlayImpl(function() {
        hideModal(s);
    }, cl);
};

const hideModal = function(s) {
    if (!s) {
        //просто пытаемся закрыть первый активный попап в родительском окне, нужно как-то универсальнее адресовать
        if (parent && parent.document.querySelector('.popup.active')) {
            pn.firstIn(parent.document, '.popup.active', (e) => e.classList.remove('active'));
            pn.firstIn(parent.document, '.overlay', (e) => e.remove());
            pn.firstIn(parent.document, 'body', (e) => e.classList.remove('overlay-lock'));
            return;
        }
        return;
    }
    pn.first(s, (e) => e.classList.remove('active'));
    hideOverlay();
    openedModal = '';
};

pn.click('[data-toggle-modal]', function (e) {
    e.preventDefault();
    let a = this.attributes['data-toggle-modal'];
    if (!a) {
        return;
    }
    pn.first(a.value, (m) => {
        if (m.classList.contains('active')) hideModal(a.value);
        else showDarkModal(a.value);
    });
});

pn.click('[data-close-modal]', (e) => {e.preventDefault(); hideModal(openedModal);});