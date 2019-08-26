'use strict';

/**
 * Class reresents menu item
 */
class MenuItem {
    /**
     * Creates MenuItem
     * @param {string} href <a> tag href link
     * @param {string} title a tag text value
     * @param {string} className name of general elem's class
     */
    constructor(href, title, className) {
        this.className = className;
        this.href = href;
        this.title = title;
    }

    /**
     * Builds html code for user's interface
     * @returns {string} - Html code to render in user's interface
     */
    renderItem() {
        return `<li><a class="${this.className}" href="${this.href}">${this.title}</a></li>`
    }
}