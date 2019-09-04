'use strict';
/**
 * Autocomlition class
 * @constructor
 */
class Autocomplete {

    /**
     * Array of strings
     * @property
     * @type {string[]}
     */
    autoCompleteValues = [];
    /**
     * Creates Autocomplete instance
     * @param {{}} settings DTO object with settings
     * @param {string} settings.formId - Id of form
     * @param {string} settings.inputId - Id of input
     * @param {string} settings.dataListId - Id of datalist
     * @param {string} settings.autocompleteServerRequest - Request for
     *  autocomplitions params
     * 
     */

    /**
     * Object that contains all alphabet letters
     * @property
     * @type {Object}
     */
    _charObj = {};

    constructor(settings) {
        /**
         * @property
         * @type {{
         *      formId: string,
         *      inputId: string,
         *      dataListId: string,
         *      autocompleteServerRequest: string,
         * }}
         */
        this.settings = settings;
        /**
         * input elem
         * @param
         * @type {jQuery} 
         */
        this._$inputElem = $(`#${this.settings.inputId}`);
        this._$datalist = $(`#${this.settings.dataListId}`);
        this._fetchAutocompleteValues();
        this._coinsidenceWatcher();
        this._genCharObj('a', 'z');
    }

    /**
     * Gets data for autocomplition from server
     */
    _fetchAutocompleteValues() {
        fetch(this.settings.autocompleteServerRequest)
            .then(result => result.json())
            .then(data => {
                this.autoCompleteValues = Object.assign(this.autoCompleteValues, data);
            });
    }

    /**
     * Watches for coincidences with autocomplete values
     * in user's input
     */
    _coinsidenceWatcher() {
        let input = this._$inputElem;
        input.on('keyup', (event) => {
            let currVal = input.val().toLowerCase();            
            if (this._letterKeyPressed(event)) {
                this._$datalist.html('');
                this.autoCompleteValues.forEach((val) => {
                    if (val.includes(currVal)) {                                                
                        this._$datalist.append($(`<option value="${val}">`));
                    }
                })
            }
        })
    }

    /**
     * Defines if user pressed letter key or not
     * @param {event} event DOM-event
     * @returns {boolean} true if key that user pressed is letter, false if else
     */
    _letterKeyPressed(event) {
        let letter = event.key;
        if (this._checkLetter(letter)) {
            return true;
        }
        return false;
    }

    /**
     * Checks if letter exists in charObj property
     * @param {string} letter - Desired letter
     * @returns {boolean} - true if letter exists, false if not
     */
    _checkLetter(letter) {
        try {
            return letter.toLowerCase() in this._charObj;
        } catch(err) {
            
        }
        
    }

    /**
     * Generates object with all possible alphabet characters
     * @param {*} charA 
     * @param {*} charZ 
     */
    _genCharObj(charA, charZ) {
        let a = {},
            i = charA.charCodeAt(0),
            j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a[String.fromCharCode(i)] = String.fromCharCode(i);
        }
        this._charObj = a;
    }
}