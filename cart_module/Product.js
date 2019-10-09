'use strict';


/**
 * Class of product
 * @constructor
 */
class Product {
    /**
     * Creates product instance
     * @param {string} id 
     * @param {string} title 
     * @param {string} price 
     * @param {string} img 
     * @param {string} container 
     */
    constructor(id, title, price, img = 'https://placehold.it/200x150', container = '#products') {
        /**
         * Id of product
         * @property
         * @type {string}
         */
        this.id = id;
        /**
         * Title of product
         * @property
         * @type {string}
         */
        this.title = title;
        /**
         * Price of product
         * @property
         * @type {string}
         */
        this.price = price;
        /**
         * Source to products img 
         * @property
         * @type {string}
         */
        this.img = img;
        /**
         * Container of an image 
         * @property
         * @type {string}
         */
        this.container = container;
        this._render(this.container);
    }

    /**
     * 
     * @param {string} container - Id of HTMLElement of product's container
     */
    _render(container) {
        let $wrapper = $('<div/>', {
            class: 'product'
        });

        let $img = $('<img/>', {
            src: this.img
        });
        //Description
        let $desc = $('<div/>', {
            class: 'desc'
        });

        let $name = $('<p/>', {
            text: this.title
        });

        let $price = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.<p/>`);

        let $buyBtn = $('<button/>', {
            class: 'buyBtn',
            text: 'Купить',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title
        });

        $img.appendTo($wrapper);
        $name.appendTo($desc);
        $price.appendTo($desc);
        $buyBtn.appendTo($desc);
        $desc.appendTo($wrapper);
        $(container).append($wrapper);
    }

}