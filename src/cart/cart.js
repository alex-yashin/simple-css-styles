let initQuantityControl = function(root) {

    let controls = root.querySelectorAll(".control-quantity");
    for (let i = 0; i < controls.length; i++) {
        let control = controls[i];
        let simpleButton = control.querySelector('.simple.btn');
        let complexButton = control.querySelector('.complex.btn');

        if (simpleButton) {
            simpleButton.addEventListener("click", function () {
                let c = this.parentElement;
                c.children[0].classList.remove('active');
                c.children[1].classList.add('active');
                c.dispatchEvent(new Event('plus'));
            });
        }
        if (complexButton) {
            complexButton.querySelector('.plus').addEventListener("click", function () {
                this.parentElement.parentElement.dispatchEvent(new Event('plus'));
            });
            complexButton.querySelector('.minus').addEventListener("click", function () {
                this.parentElement.parentElement.dispatchEvent(new Event('minus'));
            });
        }
    }

};

initQuantityControl(document);