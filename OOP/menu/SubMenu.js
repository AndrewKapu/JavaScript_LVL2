'use strict';

/**
 * Represent SubMenu elem
 * @extends Menu
 */
class SubMenu extends Menu {
    /**
     * Creates submenu instance
     * @param {string} id - Menu DOM-element id
     * @param {string} className -  Menu DOM-element class 
     * @param {[]} items - Menu inner Items
     * @param {string} parentLiHref - Value of href attribute of parent li DOM-elem
     * to determine SubMenu's specific parent
     */
    constructor(id, className, items, parentLiHref) {
        super(id, className, items);
        this.parentLiHref = parentLiHref; 
        this.render();
    }

    /**
     * Builds html code for submenu and inserts it where it needs to be
     */
    render() {
        let string = super.render();
        this._getParentLi().innerHTML += string;
    }

    /**
     * Finds parent li element for current submenu
     * @returns {HTMLElement} - Parent DOM-elem for this submenu
     */
    _getParentLi() {
        return document.querySelector(`li [href="${this.parentLiHref}"]`);
    }

}