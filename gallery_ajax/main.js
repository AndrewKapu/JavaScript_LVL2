'use strict';

window.onload = function() {
    const gallery = new Gallery({
        id: 'wrapper',
        galleryWrapperClass: 'gallery-wrapper',
        imgGeneralClass: 'gallery__img',
        fullImgId: 'fullImg',
        modalWrapperId: 'modalWrapper',
        modalWrapperClass: 'gallery__modal-window',
        modalWrapperClosedClass: 'gallery__modal-window_closed',
        closeBtnSrc: 'img/close_btn.png',
        closeBtnId: 'closeBtn',
    });
}