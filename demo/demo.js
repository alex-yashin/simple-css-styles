window.addEventListener("load", function () {
    pn.on('.control-quantity', 'plus', (e) => {
        let a = e.target.querySelector('.amount');
        a.innerText = +(a.innerText) + 1;
        console.log(a, a.innerText);
    });
    pn.on('.control-quantity', 'minus', (e) => {
        let a = e.target.querySelector('.amount');
        a.innerText = Math.max(+(a.innerText) - 1, 0);
        if (a.innerText === '0') {
            e.target.classList.remove('detailed');
        }
    });
});