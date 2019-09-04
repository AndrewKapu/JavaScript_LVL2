'use strict';

//Requires JQuery

/**
 * Tabs in user's interface
 */
class Tabs {

    /**
     * Class settings
     * @public
     * @type {{}}
     * @property {string} settings.tabWrapperId - Id of tab wrapper
     * @property {string} settings.tabWrapperClass - Class of tab wrapper
     * @property {string} settings.tabBtnClass - Class of tab btns
     * @property {string} settings.tabTextElemId - Id of elem where text is displayed
     * @property {string} settings.tabTextElemClass - Class of elem where text is displayed
     */
    settings = null;
    /**
     * Contains current active tab link
     * @property
     * @type {HTMLElement}
     * @private
     */
    _currentLinkElem = null;

    /**
     * Contains previous active tab link
     * @property
     * @type {HTMLElement}
     * @private
     */
    _previousLinkElem = null;

    /**
     * jQuery-elem of tab wrapper
     * @property
     * @private
     * @type {jQuery} 
     */
    _$tabWrapper = null;
    /**
     * Creates tabs instance
     * @param {Object} settings - Class settings
     * @param {string} settings.tabWrapperId - Id of tab wrapper
     * @param {string} settings.tabWrapperClass - Class of tab wrapper
     * @param {string} settings.tabBtnClass - Class of tab btns
     * @param {string} settings.tabTextElemId - Id of elem where text is displayed
     * @param {string} settings.tabTextElemClass - Class of elem where text is displayed
     */
    constructor(settings) {
        this.settings = settings;
        this._$tabWrapper = $(`#${this.settings.tabWrapperId}`);
        this._initEventHandlers();
    }

    /**
     * Initializes event handlers
     */
    _initEventHandlers() {
        this._$tabWrapper.on('click', `.${this.settings.tabBtnClass}`, (event) => {
            event.preventDefault();
            this._activeSwitcher(event);
            this._getInfo(event);
        });
    }

    /**
     * Highlights active tab link
     * @param {event} event 
     */
    _activeSwitcher(event) {
        this._currentLinkElem = event.target;
        let buffer = this._currentLinkElem;
        this._previousLinkElem = buffer;
        
    }

    /**
     * Gets tabs info from server
     * @param {Event} event - Click event
     */
    _getInfo(event) {
        let request = `${event.target.dataset.id}.json`;
        fetch(request)
            .then(response => response.json())
            .then(json => this._switchTab(json));
    }

    /**
     * Switches tab in user's interface
     * @param {{}} json - Data object
     */
    _switchTab(json) {
        let $info = $(`<div><img src="${json.imgPath}"><p>${json.description}</p></div>`);
        $(`#${this.settings.tabTextElemId}`).html($info);
    }
}