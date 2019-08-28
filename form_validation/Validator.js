'use strict';

/**
 * Validator class
 * @constructor
 */
class Validator {

    /**
     * @public
     * @property {Object} settings - Validator settings
     * @property {string} settings.id - Id of form
     * @property {[string]} settings.inputIds - Ids of inputs
     * @property {{}} settings.patterns - Object with patterns
     * @property {number} settings.patterns.id - Id of appropriate input
     * @property {string} settings.patterns.id.regEx - Regulax expression pattern
     * @property {string} settings.patterns.id.msg - Error message
     * @property {string} settings.submitBtnId - Id of form's submit button
     * @property {string} settings.errMsgContainerClass - Class of error msg container
     */
    settings = {};

    /**
     * DOM-elem of form
     * @private
     * @property {HTMLElement} form
     */
    _form = null;
    /**
     * Creates validator instance
     * @param {Object} settings - Validator settings
     * @param {string} settings.id - Id of form
     * @param {[string]} settings.inputIds - Ids of inputs
     * @param {Object[]} settings.patterns - Object with patterns
     * @param {string} settings.patterns.id - Id of appropriate input
     * @param {string} settings.patterns.regEx - Regulax expression pattern
     * @param {string} settings.patterns.id.msg - Error message
     * @param {string} settings.submitBtnId - Id of form's submit button
     * @param {string} settings.errMsgContainerClass - Class of error msg container
     */
    constructor(settings) {
        this.settings = Object.assign(this.settings, settings);
        this._init();
    }

    /**
     * Initializes instance
     */
    _init() {
        this._setFormProp();
        this._addEventListeners();
        this._fetchPatterns();
    }

    /**
     * Sets form property
     */
    _setFormProp() {
        this._form = document.getElementById(this.settings.id);
    }

    /**
     * Gets input validation patterns from server
     */
    _fetchPatterns() {
        fetch('patterns.json')
            .then(result => result.json())
            .then(patternsJson => {
                this.settings.patterns = patternsJson;
            });
    }

    /**
     * Sets event listeners
     */
    _addEventListeners() {
        this._form.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                event.preventDefault();                
                if (!this._validateAll()) {
                    this._form.submit();
                }
            }
        })
    }

    /**
     * Validates all inputs
     * @returns {boolean} true if errors exists, false if not
     */
    _validateAll() {
        this._clearPreviousMsgs();        
        let errorsExists = false;
        this.settings.inputIds.forEach(id => {            
            let regEx = new RegExp(this.settings.patterns[id].regEx, 'g');
            let errMsg = this.settings.patterns[id].msg;
            if (!regEx.test(this._getInputValue(id))) {
                this._highLightError(id, errMsg);
                errorsExists = true;
            }
        });
        return errorsExists;
    }

    /**
     * Clears all previous error messages
     */
    _clearPreviousMsgs() {
        let errors = this._form.querySelectorAll(`.${this.settings.errMsgContainerClass}`);        
        for (let i = 0; i < errors.length; i++) {                        
            errors[i].remove();
        }
    }

    /**
     * Gets value if appropriate input
     * @param {string} id - Id of input
     * @returns {string} - Value of input
     */
    _getInputValue(id) {
        return this._form.querySelector(`#${id}`).value;
    }

    /**
     * Highlights error in user's interface
     * @param {string} id - Id of input
     */
    _highLightError(id, msg) {
        let errorContainer = this._getErrorHtmlContainer();
        errorContainer.innerText = msg;
        document.getElementById(id).parentNode.appendChild(errorContainer);
    }

    /**
     * Gets error container for user's interface
     * @returns {HTMLElement} Error msg container
     */
    _getErrorHtmlContainer() {
        let errMsgContainer = document.createElement('p');
        errMsgContainer.classList.add(this.settings.errMsgContainerClass);
        return errMsgContainer;
    }

}