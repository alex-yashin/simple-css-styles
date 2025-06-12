function zzz(tpl, args) {
    function getTokens() {
        let ops = ['.', '#', '[', ']', '(', ')', '%', '+', '='], r = [], t = '', p = 0, l = tpl.length;
        while (p < l) {
            if (ops.includes(tpl[p])) {
                if (t !== '') r.push(t);
                t = '';
                r.push(tpl[p]);
            } else t = t + tpl[p];
            p++;
        }
        if (t) r.push(t);
        return r;
    }
    let tns = getTokens(), st = [], cn = [], tg = '', ops = {};
    function next() {return tns.shift();}
    function arg() {return '' + args.shift();}
    function resolve(s) {return s === '%' ? arg() : s;}
    function finished() {return tns.length === 0;}
    function push() {st.push([cn, tg, ops])}
    function pop() {let line = st.pop(); cn = line[0]; tg = line[1]; ops = line[2];}
    function startTag() {tg = ''; ops = {};}
    function begin() {startTag(); cn = [];}
    function expected(t) {
        if (finished()) return false;
        return tns[0] === t;
    }
    function read(t) {
        let n = next();
        if (typeof n === 'undefined') throw new Error('Expected ' + t);
        if (n !== t) throw new Error('Expected ' + t + ' instead of ' + n);
        return n;
    }
    function make(c) {
        let e = document.createElement(tg ? tg : 'div');
        if (c) if (typeof c === 'string') e.append(c); else for (i in c) e.append(c[i]);
        for (let i in ops) e.setAttribute(i, ops[i]);
        return e;
    }
    function flush(c) {
        if (tg || Object.keys(ops).length) {
            cn.push(make(c)); startTag();
        } else if (c) {
            if (typeof c === 'string') cn.push(c); else for (let i in c) cn.push(c[i]);
        }
    }

    let t = '';
    while (t = tns.shift()) {
        switch (t) {
            case '.':
                let r = resolve(next()), c = ops['class'] ? ops['class'] : '';
                ops['class'] = c ? c + ' ' + r : r;
                break;
            case '#': ops['id'] = resolve(next()); break;
            case '[':
                let k = resolve(next()), v = k;
                if (expected('=')) {
                    next();
                    v = '';
                    while (!expected(']') && !finished()) v += next();
                    v = resolve(v);
                }
                read(']');
                ops[k] = v;
                break;
            case '(': push(); begin(); break;
            case ')': flush(); let d = cn; pop(); flush(d); break;
            case '+': flush(); break;
            case '%': flush(resolve('%')); break;
            default: tg = t; break;
        }
    }
    flush();
    return cn;
}
function zz(tpl, args) {return zzz(tpl, args).shift();}
Element.prototype.zz = function(tpl, args) {let c = zzz(tpl, args); for (let i in c) this.append(c[i]);}
Element.prototype.zzz = function(tpl, args) {this.innerHTML = '';this.zz(tpl, args);}