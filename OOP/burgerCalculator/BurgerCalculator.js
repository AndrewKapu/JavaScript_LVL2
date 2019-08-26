'use strict';

/**
 * Burger calculator class
 * @property {[]} burgerFormSelectIds - Array of ID's of <select> tags in html
 */
class BurgerCalculator {
    /**
     * Contains string with ID of main form
     * @type {string}
     * @public
     */
    formId = null;
    /**
     * Array with all Ids of <select> tags in our form
     * @type {[]}
     * @private
     */
    burgerFormSelectIds = [];
    /**
     * Contains string with ID of form submit btn
     * @type {string}
     * @public
     */
    formSubmitBtnId = null;
    /**
     * Contains string with general class of <select> tags in form 
     * @type {string}
     * @public
     */
    selectGeneralClass = null;
    /**
     * Contains string with ID of HTML tag where 
     * burger stats (price and clas will be displayed)
     * @type {string}
     * @public
     */
    burgerStatsContainerId = null;
    /**
     * Object where burger stats are stored 
     * @type {{price: number, cals: number}}
     * @private
     */
    burgerStatus = {
        price: null,
        cals: null,
    };
    /**
     * Object where all stats of things that are related to burger stored
     * @type {Object}
     * @private
     */
    burgerData = {
        burgerNames: {
            small: {
                name: 'Большой бургер',
                price: 100,
                cals: 40,
            },
            big: {
                name: 'Маленький бургер',
                price: 50,
                cals: 20,
            },
        },
        burgerFillings: {
            cheese: {
                name: 'Сыр',
                price: 10,
                cals: 20,
            },
            salad: {
                name: 'Салат',
                price: 20,
                cals: 5,
            },
        },
        burgerAdditionals: {
            spice: {
                name: 'Специи',
                price: 15,
                cals: 0,
            },
            mayonnaise: {
                name: 'Майонез',
                price: 20,
                cals: 5,
            },
        },
    };

    /**
     * Creates burger calculator instance
     * @class
     * @constructor
     * @public
     * @param {string} formId Id - of form
     * @param {string} formSubmitBtnId - Id of form submit button
     * @param {string} selectGeneralClass - General class of <select> tags in our form
     * @param {string} burgerStatsContainerId - Id of container where all burger stats will be
     * displayed 
     * @param {[]} burgerFormSelectIds Ids of selects in our form 
     * where all stats will be rendered for user
     */
    constructor(formId, formSubmitBtnId, selectGeneralClass, burgerStatsContainerId, burgerFormSelectIds) {
        this.formId = formId;
        this.formSubmitBtnId = formSubmitBtnId;
        this.selectGeneralClass = selectGeneralClass;
        this.burgerStatsContainerId = burgerStatsContainerId;
        this.burgerFormSelectIds = burgerFormSelectIds;
        this.init();
    }

    /**
     * Initializes our calculator
     */
    init() {
        this._setFormSelectOptions();
        this._addEventListeners();
    }

    /**
     * Uses our burgerData data storage to fill HTML <select> tags with proper
     * options
     */
    _setFormSelectOptions() {
        this.burgerFormSelectIds.forEach((id) => {
            let select = document.getElementById(id);
            //example of option from burgerData = {small: {price: 50, cals: 40,}}
            for (let option in this.burgerData[id]) {
                let optionElem = document.createElement('option');
                optionElem.setAttribute('value', this.burgerData[id][option].name);
                optionElem.dataset.cals = this.burgerData[id][option].cals;
                optionElem.dataset.price = this.burgerData[id][option].price;
                optionElem.innerText =
                    `${this.burgerData[id][option].name}: цена - ${this.burgerData[id][option].price},
                калорийность - ${this.burgerData[id][option].cals}`;
                select.appendChild(optionElem);
            }
        })
    }

    /**
     * Adds required event listeners to our page
     */
    _addEventListeners() {
        document.getElementById(this.formSubmitBtnId)
            .addEventListener('click', () => {
                event.preventDefault();
                this._resetBurgerStatus();
                this._calcBurger();
                this._renderBurgerStatus();
            });
    }


    /**
     * Updates info about burger (total cost and cals count)
     */
    _updateBurgerStatus() {

    }

    /**
     * Calculates final burger status based on user's choices in form
     */
    _calcBurger() {
        let selectCollection = document.querySelectorAll(`.${this.selectGeneralClass}`);
        selectCollection.forEach((select) => {
            //console.log(select.options[select.selectedIndex]);
            //DOM-elem of selected option
            let selectedOption = select.options[select.selectedIndex];
            this.burgerStatus.price += +selectedOption.dataset.price;
            this.burgerStatus.cals += +selectedOption.dataset.cals;
        });
    }

    /**
     * Renders burgers final stats in user's interface
     */
    _renderBurgerStatus() {
        document.getElementById(this.burgerStatsContainerId)
            .innerHTML = `<p>Калорийность вашего бургера - ${this.burgerStatus.cals} калорий<br>
        Его итоговая стоимость - ${this.burgerStatus.price} рублей</p>`;
    }

    /**
     * Resets burger status
     */
    _resetBurgerStatus() {
        this.burgerStatus.price = 0;
        this.burgerStatus.cals = 0;
    }
}