let zzz = function (pattern, args) {

    let getTokens = function(template) {
        let operators = ['.', '#', '[', ']', '(', ')', '%', '+', '='];
        let tokens = [];
        let token = '';
        let pos = 0;
        let len = template.length;
        while (pos < len) {
            if (operators.includes(template[pos])) {
                if (token !== '') {
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

    let tokens = getTokens(pattern);
    let stack = [];
    let content = [];
    let tag = '';
    let options = {};

    let next = function() {
        return tokens.shift();
    }

    let expected = function(t) {
        if (typeof tokens[0] == 'undefined') {
            return false;
        }
        return tokens[0] === t;
    }

    let readExpected = function (t) {
        let n = next();
        if (typeof n === 'undefined') {
            throw new Error('Expected ' + t + '. Expression is out');
        }
        if (n !== t) {
            throw new Error('Expected ' + t + ' instead of ' + n);
        }
        return n;
    }

    let nextArg = function() {
        return '' + args.shift();
    }

    let resolve = function(s) {
        return s === '%' ? nextArg() : s;
    }

    let finished = function() {
        return tokens.length === 0;
    }

    let push = function() {
        stack.push([content, tag, options])
    }

    let pop = function () {
        let line = stack.pop();
        content = line[0];
        tag = line[1];
        options = line[2];
    }

    let startTag = function() {
        tag = '';
        options = {};
    }

    let begin = function() {
        startTag();
        content = [];
    }

    let makeTag = function(c) {
        let e = document.createElement(tag ? tag : 'div');
        if (c) {
            if (typeof c === 'string') {
                e.append(c);
            } else {
                for (i in c) {
                    e.append(c[i]);
                }
            }
        }
        if (options) {
            for (let i in options) {
                e.setAttribute(i, options[i]);
            }
        }
        return e;
    }


    let flush = function(c) {
        if (tag || Object.keys(options).length) {
            content.push(makeTag(c))
            startTag();
        } else if (c) {
            if (typeof c === 'string') {
                content.push(c)
            } else {
                for (let i in c) {
                    content.push(c[i]);
                }
            }
        }
    }

    let token = '';
    while (token = tokens.shift()) {
        switch (token) {
            case '.':
                options['class'] = resolve(next());
                break;
            case '#':
                options['id'] = resolve(next());
                break;
            case '[':
                let name, value;
                name = value = resolve(next());
                if (expected('=')) {
                    next();
                    value = '';
                    while (!expected(']') && !finished()) {
                        value += next();
                    }
                    value = resolve(value);
                }
                readExpected(']');
                options[name] = value;
                break;
            case '(':
                push();
                begin();
                break;

            case ')':
                flush();
                let deeperContent = content;
                pop();
                flush(deeperContent);
                break;

            case '+':
                flush();
                break;

            case '%':
                flush(resolve('%'));
                break;

            default:
                tag = token;
                break;

        }
    }

    flush();
    return content;
}

let zz = function(pattern, args) {
    return zzz(pattern, args).shift();
}

Element.prototype.zz = function(pattern, args) {
    let content = zzz(pattern, args);
    for (let i in content) {
        this.append(content[i]);
    }
}
Element.prototype.zzz = function(pattern, args) {
    this.innerHTML = '';
    this.zz(pattern, args);
}