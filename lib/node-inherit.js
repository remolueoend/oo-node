'use strict';

/**
 * Expands the a sub class with the properties and methods
 * of the provided base class.
 * @param {function} baseClass The base class to inherit from.
 * @param {function} subClass The sub class to inherit.
 * @returns {function} The inherited sub class function.
 */
function inherit(baseClass, subClass){
    for (var p in baseClass) if (baseClass.hasOwnProperty(p)) subClass[p] = baseClass[p];
    function __() { this.constructor = subClass; }
    __.prototype = baseClass.prototype;
    subClass.prototype = new __();

    return subClass;
}

module.exports = inherit;
