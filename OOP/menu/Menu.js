'use strict';

/**
 * Class represents menu
 */
class Menu {

    /**
     * Creates menu item
     * @param {string} id - Menu DOM-element id
     * @param {string} className -  Menu DOM-element class 
     * @param {[]} items - Menu inner Items
     */
    constructor(id, className, items) {
        this.id = id;
        this.className = className;
        this.items = items;
    }

    /**
     * Builds html code for user's interface
     * @return {string} - Html code to render in user's interface
     */
    render() {
        let result = `<ul class="${this.className}" id="${this.id}">`;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem) {
                result += this.items[i].renderItem();
            }
        }

        result += '</ul>';
        return result;
    }

    /**
     * Removes menu instance from DOM
     */
    removeItself() {
        let elem = document.getElementById(this.id).remove();
        if (elem) {
            elem.remove();
        }
    }

}