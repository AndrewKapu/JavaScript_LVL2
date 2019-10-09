'use strict';

/**
 * @constructor
 * Class of product cart
 */
class Cart {


    /**
     * Creats cart instance
     * @param {string} source - Url request to get user's cart from server
     * @param {string} container - Id of container where cart's gonna be stored in user's html
     */
    constructor(source, container = '#cart') {
        /**
         * URL request for user's cart
         * @property
         * @type {string}
         */
        this.source = source;
        /**
         * Id of HTMLElement container in DOM
         * @property
         * @type {string}
         */
        this.container = container;
        /**
         * Amount of goods in user's cart
         * @property
         * @type {int}
         */
        this.countGoods = 0; //Cart's general amount of goods
        /**
         * Total cost of user's cart
         * @property
         * @type {int}
         */
        this.amount = 0; //Cart's general cost
        /**
         * Storage for user's goods in this instance
         * @property
         * @type {[]}
         */
        this.cartItems = []; // Data structure fot user's cart
        this._init(this.source);
    }

    /**
     * Renders needed html for cart in user's interface
     */
    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });

        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-amount'
        });

        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });

        $(this.container).text = 'Корзина';
        $cartItemsDiv.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));

    }

    /**
     * Initializes this instance, uses data from server
     * @param {string} source - URL request for user's cart from server
     */
    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum(data.amount, data.countGoods);
            })

        this._initRemoveHandler();
    }

    /**
     * Renders item in user's interface
     */
    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} рублей</p>`));
        $container.append($('<button/>', {
            class: 'delBtn',
            'data-product': product.id_product,
            text: 'Удалить'
        }));
        $('.cart-items-wrap').append($container);
    }

    /**
     * Renders sum in user's interface
     * @param {int} amount - Cost of user's cart
     * @param {int} countGoods - Amount of goods in user's cart
     */
    _renderSum(amount, countGoods) {
        $('.sum-amount').text(`Всего товаров в корзине: ${countGoods}`);
        $('.sum-price').text(`Общая сумма: ${amount} руб.`);
    }

    /**
     * Updates cart's data
     * @param {{
     *      id_product: number,
     *      product_name: string,
     *      price: number,
     *      quantity: number,
     * }} product - DTO object of product
     */
    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }

    /**
     * Adds product in user's cart
     * @param {HTMLElement} element - Buy button of product
     */
    _addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum(this.amount, this.countGoods);
    }

    /**
     * Removes product both from user's interace and data structure
     * @param {HTMLElement} element - Element of remove btn
     */
    _removeProduct(element) {        
        let delProductIndex = this.cartItems.findIndex((elem) => {
            return elem.id_product === +$(element).data('product');
        });
        this.countGoods -= this.cartItems[delProductIndex].quantity;
        this.amount -= this.cartItems[delProductIndex].quantity * this.cartItems[delProductIndex].price;
        $('.sum-amount').text(this.countGoods);
        $('.sum-price').text(this.amount);
        this.cartItems.splice(delProductIndex, 1);
        element.parentNode.remove();
    }

    /**
     * Initializes product's remove btn handler
     */
    _initRemoveHandler() {
        $('.cart-items-wrap').on('click', '.delBtn', (event) => {            
            this._removeProduct(event.target);
        });
    }
}