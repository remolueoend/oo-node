'use strict';

var extend = require('node.extend');

/**
 * Expands the a sub class with the properties and methods
 * of the provided base class.
 * @param {function} baseClass The base class to inherit from.
 * @param {function} subClass The sub class to inherit.
 * @param {object} [prototype] An optional prototype object
 * which will be appended to the sub class' function.
 * @returns {function} The inherited sub class function.
 */
function inherit(baseClass, subClass, prototype){
    var p;

    // extend sub class with static members of base class:
    for (p in baseClass) if (baseClass.hasOwnProperty(p)) subClass[p] = baseClass[p];

    // create a new constructor function:
    function __() { this.constructor = subClass; }

    // Apply the base prototype to the constructor function:
    __.prototype = baseClass.prototype;

    // Extend the constructor function's prototype with existing members of the sub class' prototype.
    // This allows also overwriting prototype members:
    extend(__.prototype, subClass.prototype);

    // If an additional prototype object is provided, extend the constructor func's prototype with it:
    if(typeof prototype !== "undefined"){
        extend(__.prototype, prototype);
    }

    // Set the sub class' prototype to a new instance of the constructor function:
    subClass.prototype = new __();

    return subClass;
}

module.exports = inherit;
