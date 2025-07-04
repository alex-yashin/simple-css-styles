function zz(tpl) {
    function getTokens() {
        var ops = ['.', '#', '[', ']', '(', ')', '%', '+', '='], r = [], t = '', p = 0, l = tpl.length;
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
    function run(tns, args) {
        var st = [], cn = [], tg = '', ops = {};
        function next() {return tns.shift();}
        function arg() {return '' + args.shift();}
        function resolve(s) {return s === '%' ? arg() : s;}
        function finished() {return tns.length === 0;}
        function push() {st.push([cn, tg, ops]);}
        function pop() {var line = st.pop(); cn = line[0]; tg = line[1]; ops = line[2];}
        function startTag() {tg = ''; ops = {};}
        function begin() {startTag(); cn = [];}
        function expected(t) {
            if (finished()) return false;
            return tns[0] === t;
        }
        function read(t) {
            var n = next();
            if (typeof n === 'undefined') throw new Error('Expected ' + t);
            if (n !== t) throw new Error('Expected ' + t + ' instead of ' + n);
            return n;
        }
        function make(c) {
            var e = document.createElement(tg ? tg : 'div'), i;
            if (c) if (typeof c === 'string') e.append(c); else for (i in c) e.append(c[i]);
            for (i in ops) e.setAttribute(i, ops[i]);
            return e;
        }
        function flush(c) {
            if (tg || Object.keys(ops).length) {
                cn.push(make(c)); startTag();
            } else if (c) {
                if (typeof c === 'string') cn.push(c); else for (var i in c) cn.push(c[i]);
            }
        }

        var t = '';
        while (t = tns.shift()) {
            switch (t) {
                case '.':
                    var r = resolve(next()), c = ops['class'] ? ops['class'] : '';
                    ops['class'] = c ? c + ' ' + r : r;
                    break;
                case '#': ops.id = resolve(next()); break;
                case '[':
                    var k = resolve(next()), v = k;
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
                case ')': flush(); var d = cn; pop(); flush(d); break;
                case '+': flush(); break;
                case '%': flush(resolve('%')); break;
                default: tg = t; break;
            }
        }
        flush();
        return cn;
    }
    var tns = getTokens();
    return {
        'apply': function(e, args) {e.innerHTML = ''; this.append(e, args);},
        'append': function(e, args) {var c = run(tns.slice(), args); for (var i in c) e.append(c[i]);},
        'make': function(args) {var c = run(tns.slice(), args); return c.shift();}
    }
}