/* globals pn */
'use strict';
window.addEventListener('load', function () {
    pn.click('nav.tabs li', function (event) {
        pn.each('nav.tabs li', (e) => e.classList.remove('active'));

        let clickedTab = event.currentTarget;

        clickedTab.classList.add('active');

        event.preventDefault();

        pn.each('nav.tabs ~ .tab', (e) => e.classList.remove('active'));

        let anchorReference = event.target;
        let activePaneId = anchorReference.getAttribute('href');
        let activePane = document.querySelector(activePaneId);

        activePane.classList.add("active");

    });
});