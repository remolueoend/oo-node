'use strict';

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
    for (p in baseClass) if (baseClass.hasOwnProperty(p)) subClass[p] = baseClass[p];
    function __() { this.constructor = subClass; }
    __.prototype = baseClass.prototype;
    if(typeof prototype !== "undefined"){
        for (p in prototype) if (prototype.hasOwnProperty(p)) __.prototype[p] = prototype[p];
    }
    subClass.prototype = new __();

    return subClass;
}

module.exports = inherit;
