let pn = {};
pn.firstIn = (root, sel, fn) => {
    let e = root.querySelector(sel);
    return e ? fn.apply(e, [e]) : null;
};
pn.first = (sel, fn) => pn.firstIn(document, sel, fn);
pn.eachIn = (root, sel, fn) => {
    let es = root.querySelectorAll(sel);
    for (let i = 0; i < es.length; i++) {
        fn.apply(es[i], [es[i]]);
    }
};
pn.each = (sel, fn) => pn.eachIn(document, sel, fn);
pn.onIn = (root, sel, ev, fn) => pn.eachIn(root, sel, (e) => e.addEventListener(ev, fn));
pn.on = (sel, ev, fn) => pn.onIn(document, sel, ev, fn);
pn.clickIn = (root, sel, fn) => pn.onIn(root, sel, 'click', fn);
pn.click = (sel, fn) => pn.on(sel, 'click', fn);
pn.post = async (url, data, headers)=> await pn.requestJson('post', url, data, headers);
pn.put = async (url, data, headers) => await pn.requestJson('put', url, data, headers);
pn.delete = async (url, data, headers) => await pn.requestJson('delete', url, data, headers);
pn.get = async (url, data, headers) => await pn.requestJson('get', url, data, headers);
pn.requestJson  = async (method, url, data, headers) => {
    const resp = await pn.request(method, url, data, headers);
    return await resp.json();
};
pn.request = async (method, url, data, headers) => {
    let hs = headers ? headers : {};
    hs.Accept = 'application/json';
    if (method !== 'get') { hs['X-CSRF-Token'] = pn.csrf(); }
    return await fetch(url, {method: method, redirect: 'manual', headers: hs, body: data});
};
pn.csrf = () => pn.first('meta[name="csrf-token"]', (e) => e.content);
pn.cookie = (n) => decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(n).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
pn.create = (tag, cl, inner) => {
    let e = document.createElement(tag);
    if (cl) {
        e.classList.add(cl);
    }
    if (typeof inner == 'object') {
        e.append(inner);
    } else if (inner) {
        e.innerHTML = inner;
    }
    return e;
};
pn.span = (cl, inner) => pn.create('span', cl, inner);
pn.p = (cl, inner) => pn.create('p', cl, inner);
pn.div = (cl, inner) => pn.create('div', cl, inner);

pn.tokens = function(template) {
    let operators = ['.', '#', '[', ']', '(', ')', '%', '+', '='];
    let tokens = [];
    let token = '';
    let pos = 0;
    let len = template.length;
    while (pos < len) {
        if (operators.includes(template[pos])) {
            if (token != '') {
                tokens.push(token);
            }
            token = '';
            tokens.push(template[pos]);
        } else {
            token = token + template[pos];
        }
        pos++;
    }
    if (token) {
        tokens.push(token);
    }
    return tokens;
};

// pn.zz = function(template, args) {
//     let tokens = pn.tokens(template);
//     let token = '';
//     let options = [];
//     while (token = tokens.shift()) {
//         switch (token) {
//             case '.':
//                 options['class'] = pn.resolve
//
//         }
//     }
// };