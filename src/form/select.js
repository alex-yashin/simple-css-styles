/* globals pn, zz */
pn.each('select', (e) => e.parentNode.insertBefore(zz('.select-button').make(), e.nextSibling));
