'use strict';

window.onload = function() {
    const gallery = new Gallery({
        id: 'wrapper',
        galleryWrapperClass: 'gallery-wrapper',
        imgGeneralClass: 'gallery__img',
        fullImgId: 'fullImg',
        modalWrapperId: 'modalWrapper',
        modalWrapperClass: 'gallery__modal-window',        
        closeBtnSrc: 'img/close_btn.png',
        closeBtnId: 'closeBtn',
    });
}