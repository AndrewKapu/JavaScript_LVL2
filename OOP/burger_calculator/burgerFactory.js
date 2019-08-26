'use strict';

/**
 * Class of Burger's parameter
 * @class
 * @constructor
 * @public
 */
class Param {
    /**
     * Creates instance of Param class
     * @param {HTMLElement} element - Element for getting Param data
     */
    constructor(element) {
        /**
         * Stores parameters name
         * @type {string}
         * @public
         */
        this.name = element.value;
        /**
         * Stores parameters calories
         * @type {number}
         * @public
         */
        this.calories = +element.dataset['calories'];
        /**
         * Stores parameters price
         * @type {number}
         * @public
         */
        this.price = +element.dataset['price'];
    }
}

/**
 * Class of burger
 * @class
 * @constructor
 * @public
 */
class Burger {
    /**
     * Creates Burger instance
     * @param {string} size - Name attribute of input of burger type
     * @param {string} add - Name attribute of input of burger additionals
     * @param {string} fillings - Name attribute of input of burger fillings
     */
    constructor(size, add, fillings) {
        /**
         * Instance of @class Param
         * @type {Param}
         * @public
         */
        this.size = new Param(this._select(size));
        /**
         * Instance of @class Param
         * @type {Param}
         * @public
         */
        this.add = new Param(this._select(add));
        /**
         * [name=""] attribute of appropriate input
         * @type {string}
         * @public
         */
        this.fillings = this._getFillings(fillings);
    }

    /**
     * Gets appropriate input
     * @param {string} name - Name attribute of appropriate input
     * @returns {HTMLElement} desired input 
     */
    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    /**
     * Selects group of inputs
     * @param {string} name - Name attribute of appropriate input
     * @returns {[HTMLElement]} Array of desired DOM-elements
     */
    _selectAll(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
    }

    /**
     * Converts data from list of dom-inputs to @class Param instances
     * @param {[HTMLElement]} fillings - Array of fillings
     * @returns {[]} Array of @class Param instances
     */
    _getFillings(fillings) {
        let result = [];
        this._selectAll(fillings).forEach(el => result.push(new Param(el)));
        return result;
    }

    /**
     * Calculates final burger price
     * @returns {number} Burger's final price
     */
    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.fillings.forEach(el => result += el.price);
        return result;
    }

    /**
     * Calculates final burger calories
     * @returns {number} Burger's final calories
     */
    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.fillings.forEach(el => result += el.calories);
        return result;
    }

    /**
     * Renders burger stats in user's interface
     * @param {number} price - Burger's price
     * @param {number} calories - Burger's calories
     */
    showSum(price, calories) {
        document.getElementById(`${price}`).textContent = this._sumPrice();
        document.getElementById(`${calories}`).textContent = this._sumCalories();
    }
}