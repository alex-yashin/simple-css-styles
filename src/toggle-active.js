/* globals pn */
'use strict';
pn.click('.toggle-active', function(e) {
    e.preventDefault();
    this.classList.toggle('active');
});