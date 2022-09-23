const openOverlay = function(callback) {
    openOverlayImpl(callback, '');
};

const openDarkOverlay = function (callback) {
    openOverlayImpl(callback, 'dark');
};

const openOverlayImpl = function(callback, cl) {

    let o = document.createElement('div');
    o.classList.add('overlay');
    if (cl) {
        o.classList.add(cl);
    }
    o.addEventListener('click', function() {
        hideOverlay();
        callback();
    });
    document.querySelector('body').append(o);
    document.querySelector('body').classList.add('overlay-lock');

};

const hideOverlay = function() {
    let o = document.querySelector('.overlay');
    if (!o) {
        return;
    }
    o.remove();
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
    if (openedModal) {
        hideModal(openedModal);
    }
    openedModal = s;
    document.querySelector(s).classList.add('active');
    openOverlayImpl(function() {
        hideModal(s);
    }, cl);
};


const hideModal = function(s) {
    if (!s) {
        //просто пытаемся закрыть первый активный попап в родительском окне, нужно как-то универсальнее адресовать
        if (parent && parent.document.querySelector('.popup.active')) {
            parent.document.querySelector('.popup.active').classList.remove('active');
            let o = parent.document.querySelector('.overlay');
            if (!o) {
                return;
            }
            o.remove();
            parent.document.querySelector('body').classList.remove('overlay-lock');
            return;
        }

        return;
    }

    document.querySelector(s).classList.remove('active');
    hideOverlay();
    openedModal = '';
};

let openModalLinks = document.querySelectorAll('[data-toggle-modal]');
for (let i = 0; i < openModalLinks.length; i ++) {
    openModalLinks[i].addEventListener('click', function(e) {
        e.preventDefault();

        let attribute = this.attributes['data-toggle-modal'];
        if (!attribute) {
            return;
        }

        let modal = document.querySelector(attribute.value);
        if (modal.classList.contains('active')) {
            hideModal(attribute.value);
            return;
        }

        showDarkModal(attribute.value);
    });
}

let closeModalLinks = document.querySelectorAll('[data-close-modal]');
for (let i = 0; i < closeModalLinks.length; i++) {
    closeModalLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        hideModal(openedModal);
    });
}