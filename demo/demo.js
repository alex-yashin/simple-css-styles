window.addEventListener("load", function () {
    let controls = document.querySelectorAll(".control-quantity");
    for (let i = 0; i < controls.length; i++) {
        controls[i].addEventListener('plus', function (e) {
            let amount = e.target.querySelector('.amount').innerText;
            e.target.querySelector('.amount').innerText = +amount + 1;
        });
        controls[i].addEventListener('minus', function (e) {
            let amount = e.target.querySelector('.amount').innerText;
            e.target.querySelector('.amount').innerText = amount > 0 ? amount - 1 : 0;
        });
    }
});