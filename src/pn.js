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
pn.done = (sel, fn) => pn.on(sel, 'success', fn);
pn.fail = (sel, fn) => pn.on(sel, 'error', fn);
pn.post = async (url, data, headers)=> await pn.requestJson('post', url, data, headers);
pn.put = async (url, data, headers) => await pn.requestJson('put', url, data, headers);
pn.delete = async (url, data, headers) => await pn.requestJson('delete', url, data, headers);
pn.get = async (url, data, headers) => await pn.requestJson('get', url, data, headers);
pn.requestJson  = async (method, url, data, headers) => {
    const resp = await pn.request(method, url, data, headers);
    return await resp.json();
};
pn.request = async (method, url, data, headers) => {
    var opts = {method: method, redirect: 'manual', headers: headers ? headers : {}};
    opts.headers.Accept = 'application/json';
    var a = document.createElement('a'); a.href = url; var l=a.host === document.location.host;
    if (method !== 'get') { opts.body=data; if (l) opts.headers['X-CSRF-Token'] = pn.csrf();}
    return await fetch(url, opts);
};
pn.csrf = () => pn.first('meta[name="csrf-token"]', (e) => e.content);
pn.cookie = (n) => decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(n).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;