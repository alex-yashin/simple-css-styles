(function() {

    "use strict";

    var menu = null;

    var menuState = 0;
    //
    pn.each('.context', contextMenuListener);

    contextListener();
    clickListener();
    keyupListener();

    //
    function contextMenuListener() {
        let resource = this.getAttribute('data-resource');
        if (!resource) {
            return;
        }
        this.addEventListener('contextmenu', async function (e) {
            if (e.target.href && !e.target.classList.contains('context')) {
                toggleMenuOff();
                return;
            }
            e.preventDefault();

            let response = await fetch('/' + resource);
            if (!response.ok) {
                return;
            }
            let text = await response.text();
            if (!text) {
                return;
            }
            toggleMenuOff();
            toggleMenuOn(text);
            positionMenu(e, menu, 0, 0);
        });
    }

    function contextListener() {
        document.addEventListener( "contextmenu", function(e) {
            if (e.target.href && !e.target.classList.contains('context')) {
                toggleMenuOff();
                return;
            }

            if (!e.target.closest('.context')) {
                toggleMenuOff();
            }
        });
    }

    function clickListener() {
        document.addEventListener( "click", function(e) {
            let m = e.target.closest('.context-menu');
            if (m) {
                pn.eachIn(m, '.dropdown', function() {
                    this.classList.remove('active');
                })

                let submenu = e.target.nextElementSibling;
                if (!submenu) {
                    return;
                }

                e.target.closest('.dropdown').classList.add('active');
                let position = getPosition(e);
                let offsetX = 0;

                if (submenu.clientWidth > window.innerWidth) {
                    offsetX = 40;
                    submenu.style.width = (window.innerWidth - offsetX) + 'px';
                    submenu.style.minWidth = (window.innerWidth - offsetX) + 'px';
                }
                if (position.x + submenu.clientWidth > window.innerWidth) {
                    let parentOffset = (position.x - e.offsetX);
                    submenu.style.left = (window.innerWidth - submenu.clientWidth - parentOffset - offsetX) + 'px';
                } else {
                    submenu.style.left = e.offsetX + 'px';
                }
                e.preventDefault();
                return;
            }
            var button = e.which || e.button;
            if ( button === 1 ) {
                toggleMenuOff();
            }
        });
    }

    function keyupListener() {
        window.onkeyup = function(e) {
            if ( e.keyCode === 27 ) {
                toggleMenuOff();
            }
        }
    }

    function toggleMenuOn(text) {
        if ( menuState !== 1 ) {
            menuState = 1;

            menu = document.createElement('div');
            menu.innerHTML = text;
            menu.classList.add('context-menu');
            menu.classList.add('active');
            listenAjaxEvents(menu);

            document.querySelector('body').append(menu);
        }
    }

    function toggleMenuOff() {
        if ( menuState !== 0 ) {
            menuState = 0;
            menu.classList.remove('active');
            menu.remove();
        }
    }

    function getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    function positionMenu(e) {
        let clickCoords = getPosition(e);
        let clickCoordsX = clickCoords.x;
        let clickCoordsY = clickCoords.y;

        let menuWidth = menu.offsetWidth + 4;
        // let menuHeight = menu.offsetHeight + 4;

        let windowWidth = window.innerWidth;
        // let windowHeight = window.innerHeight;

        if ( (windowWidth - clickCoordsX) < menuWidth ) {
            menu.style.left = (windowWidth - menuWidth) + "px";
        } else {
            menu.style.left = clickCoordsX + "px";
        }

        // if ( (windowHeight - clickCoordsY) < menuHeight ) {
        //     menu.style.top = windowHeight - menuHeight + "px";
        // } else {
            menu.style.top = clickCoordsY + "px";
        // }
    }


})();