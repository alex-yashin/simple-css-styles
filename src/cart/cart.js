pn.each('.control-quantity', (c) => {
    let q = c.getAttribute('data-amount');
    q = q ? q : 0;
    c.zzz('span.preview%+span.complex(span.minus+span.amount%+span.plus)', [c.innerText, q]);
    c.addEventListener('click', () => {
        c.classList.add('detailed');
        c.dispatchEvent(new Event('plus'));
    });
    pn.clickIn(c, '.plus', (e) => {c.dispatchEvent(new Event('plus')); e.stopPropagation();});
    pn.clickIn(c, '.minus', (e) => {c.dispatchEvent(new Event('minus')); e.stopPropagation();});
});