pn.each('.btn-quantity', (c) => {
    var q = c.getAttribute('data-amount');
    zz('span.preview%+span.complex(span.minus+span.amount%+span.plus)').apply(c, [c.innerText, q ? q : 0]);
    c.addEventListener('click', () => {
        c.classList.add('detailed');
        c.dispatchEvent(new Event('plus'));
    });
    pn.clickIn(c, '.plus', (e) => {c.dispatchEvent(new Event('plus')); e.stopPropagation();});
    pn.clickIn(c, '.minus', (e) => {c.dispatchEvent(new Event('minus')); e.stopPropagation();});
});