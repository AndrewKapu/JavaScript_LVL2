'use strict';

/**
 * Photo gallery class
 * @class
 * @constructor
 */
class Gallery {
    /**
     * @namespace
     * @property {Object} settings - DTO settings object class
     * @property {string} settings.id - ID of gallery wrapper
     * @property {string} settings.galleryWrapperClass - Class of gallery wrapper
     * @property {string} settings.imgGeneralClass - general class of gallery img tags
     * @property {string} settings.fullImgId - Id of opened full img in modal window
     * @property {string} settings.modalWrapperId - Id of modal window wrapper
     * @property {string} settings.modalWrapperClass Class of modal wrapper
     * @property {string} settings.modalWrapperClosedClass - Class of closed modal wrapper
     * @property {string} settings.closeBtnSrc - Src of close btn
     * @property {string} settings.closeBtnId -  Id of close btn dom-elem
     */
    settings = {
        id: null,
        galleryWrapperClass: null,
        imgGeneralClass: null,
        fullImgId: null,
        modalWrapperId: null,
        modalWrapperClass: null,
        modalWrapperClosedClass: null,
        closeBtnSrc: null,
        closeBtnId: null,
    };

    /**
     * @property {Object{}} stores img sources
     * @property {Object.number} DTO object of img, Object's name is img's id
     * @private
     */
    _imgStorage = {};

    /*
    {
        1: {
            fullPath: 'max/1.jpeg',
        },
        2: {
            fullPath: 'max/2.jpeg',
        },
        3: {
            fullPath: 'max/3.jpeg',
        }
    }
    */

    /**
     * @property {HTMLElement} modalWindow - Element where full image
     * should be rendered
     * @private
     */
    _modalWindow = null;
    /**
     * @property {HTMLElement} _gallery - Element of gallery
     * @private
     */
    _gallery = null;

    /**
     * @param {Object} settings - Dto object with settings
     * @param {string} settings.id - Id of gallery wrapper
     * @param {string} settings.galleryWrapperClass - Class of gallery wrapper
     * @param {string} settings.imgGeneralClass - Class of gallery img tag
     * @param {string} settings.fullImgId - Id of opened full img in modal window
     * @param {string} settings.modalWrapperId - Id of modal window wrapper
     * @param {string} settings.modalWrapperClass - Class of modal wrapper
     * @param {string} settings.modalWrapperClosedClass - Class of modal wrapper
     * @param {string} settings.closeBtnSrc - Src to close btn image
     * @param {string} settings.closeBtnId -  Id of close btn dom-elem
     * 
     */
    constructor(settings) {
        this.settings = Object.assign(this.settings, settings);
        this._setGallery();
        this._initEventHandlers();
        //AJAX
        this._requestImages();
    }

    /**
     * Sets appropriate HTMLElement to specific propery
     */
    _setGallery() {
        this._gallery = document.getElementById(this.settings.id);
    }

    /**
     * Gets images data from server
     */
    _requestImages() {
        fetch('images.json')
            .then(response => {
                return response.json();
            })
            .then(
                json => {
                    this._fetchImages(json)
            })
    }

    /**
     * Assigns json data
     * @param {Object} json - Data of images
     */
    _fetchImages(json) {
        this._imgStorage = Object.assign(this._imgStorage, json);
    }

    /**
     * Inits event handlers
     */
    _initEventHandlers() {
        this._gallery.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleImgClick(event);
        });
    }

    /**
     * Handles click on image
     * @param {event} event 
     */
    _handleImgClick(event) {
        if (event.target.classList[0] === this.settings.imgGeneralClass) {
            this._showFullImg(+event.target.dataset.id);
        }
    }

    /**
     * Renders full in user's inteface
     * @param {number} id Id of image
     */
    _showFullImg(id) {
        this._getModalWindow();

        this._modalWindow
            .classList.toggle(this.settings.modalWrapperClosedClass);
        this._modalWindow.querySelector(`#${this.settings.fullImgId}`)
            .src = this._imgStorage[id].fullPath;
        //document.body.appendChild(this._getModalWindow(id));
    }

    /**
     * Gets modal window
     * @returns {HTMLElement} - desired modal window
     */
    _getModalWindow() {
        if (this._modalWindow === null) {
            this._createModalWindow();
        }
    }

    /**
     * Creates modal window
     * @returns {HTMLElement} - desired modal window
     */
    _createModalWindow() {
        let modalWrapper = document.createElement('div');
        modalWrapper.id = this.settings.modalWrapperId;
        modalWrapper.classList.add(this.settings.modalWrapperClass);
        document.body.appendChild(modalWrapper);

        let img = new Image();
        img.id = this.settings.fullImgId;
        modalWrapper.appendChild(img);

        let closeBtn = new Image();
        closeBtn.src = this.settings.closeBtnSrc;
        closeBtn.id = this.settings.closeBtnId;
        closeBtn.addEventListener('click', () => {
            this._closeModalWindow();
        });
        modalWrapper.appendChild(closeBtn);

        this._modalWindow = modalWrapper;
    }

    /**
     * Gets full img path
     * @param {number} id - Img's id 
     * @returns {string} Path to full img
     */
    _getFullImgSrc(id) {
        return this._imgStorage[id].fullPath;
    }

    /**
     * Closes modal window in user's interface
     */
    _closeModalWindow() {
        this._modalWindow.classList.toggle(this.settings.modalWrapperClosedClass);
    }
}