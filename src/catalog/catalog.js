window.addEventListener("load", function () {
    let zooms = document.querySelectorAll('.zoom');
    for (let j = 0; j < zooms.length; j ++) {
        zooms[j].addEventListener('click', function (e) {
            e.preventDefault();

            let wrapper = document.createElement('div');
            let img = document.createElement('img');
            img.src = this.href;
            img.classList.add('image');
            img.style.display='block';
            img.style.margin='auto';
            wrapper.classList.add('zoomed-image');
            wrapper.classList.add('popup');
            wrapper.classList.add('popup-dialog');
            wrapper.classList.add('card');
            wrapper.classList.add('active');
            wrapper.append(img);

            document.querySelector('body').append(wrapper);

            openOverlayImpl(function () {
                wrapper.remove();
            });

            wrapper.addEventListener('click', function () {
                wrapper.remove();
                hideOverlay();
            });
        });
    }
});
