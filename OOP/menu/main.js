'use strict';

window.onload = function() {
    let menuWrapper = document.getElementById('menu');
    let menu =  new Menu('myMenu', 'myMenu', [
        new MenuItem('#home', 'Home', 'menu-item'),
        new MenuItem('#goods', 'Goods', 'menu-item'),
        new MenuItem('#about', 'About', 'menu-item'),
        new MenuItem('#contact', 'Contact', 'menu-item'),
        new MenuItem('#privacy', 'Privacy', 'menu-item'),
    ]);
    menuWrapper.innerHTML = menu.render();
    //Submenu is able find it's parent by href attribute and stick to it 
    let subMenu = new SubMenu('mySubMenu', 'mySubMenu', [
        new MenuItem('#trending-goods', 'Trending'),
        new MenuItem('#best-goods', 'Best'),
        new MenuItem('#sale-good', 'Sale'),
    ], '#goods');
}
