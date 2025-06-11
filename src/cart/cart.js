pn.each(".control-quantity", (c) => {
    pn.clickIn(c, '.simple.btn', () => {
        c.children[0].classList.remove('active');
        c.children[1].classList.add('active');
        c.dispatchEvent(new Event('plus'));
    });
    pn.clickIn(c, '.complex.btn .plus', () => c.dispatchEvent(new Event('plus')));
    pn.clickIn(c, '.complex.btn .minus', () => c.dispatchEvent(new Event('minus')));
});