'use strict';

/**
 * @constructor
 * Contact form class
 */
class ContactForm {
    /**
     * Creates contact form instance
     * @param {{}} settings - DTO object with settings
     * @param {string} settings.id - Id of form
     * @property settings.citytSelectClass - Class off select tag
     * @param {string} settings.citySelectId - Id of appropriate select tag
     * @param {strict} settings.citiesServerRequest - List of available cities for
     * appropriate select tag
     */
    constructor(settings) {
        /**
         * Instance settings
         * @property
         * @type {{
         *      id: string,
         *      citySelectId: string,
         *      citytSelectClass: string,
         *      citiesServerRequest: string,
         * }}
         * @property settings.id - Id of form
         * @property settings.citySelectId - Id of appropriate select tag
         * @property settings.citytSelectClass - Class off select tag
         * @property settings.citiesServerRequest - List of available cities for
         * appropriate select tag
         */
        this.settings = settings;
        /**
         * Our form elem
         * @property
         * @type {jQuery}
         */
        this._$form = $(`#${this.settings.id}`);        
        this._fillSelectTag();
    }

    /**
     * Fills form's select tag with needed option tags
     */
    _fillSelectTag() {
        $.ajax({
            url: this.settings.citiesServerRequest,
            type: 'GET',
            dataType: 'json',
            success: (data) => {                                
                for (const elem of data) {                                      
                    $(`#${this.settings.citySelectId}`)
                    .append($(`<option value="${elem.city}">${elem.city}</option>`));
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}