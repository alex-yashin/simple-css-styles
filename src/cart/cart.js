pn.each('.control-quantity', (c) => {
    let q = c.getAttribute('data-amount');
    if (typeof q == 'undefined') {
        q = 0;
    }
    let preview = pn.span('preview', pn.span('', c.innerText));

    c.innerText = '';
    c.append(preview);

    let cx = pn.span('complex');
    cx.append(pn.span('minus'));
    cx.append(pn.span('amount', q));
    cx.append(pn.create('span', 'plus'));
    c.append(cx);

    c.addEventListener('click', () => {
        c.classList.add('detailed');
        c.dispatchEvent(new Event('plus'));
    });
    pn.clickIn(c, '.plus', (e) => {c.dispatchEvent(new Event('plus')); e.stopPropagation();});
    pn.clickIn(c, '.minus', (e) => {c.dispatchEvent(new Event('minus')); e.stopPropagation();});
});