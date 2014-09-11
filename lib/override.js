'use strict';

/**
 * Allows overriding a method of the given context.
 * @param {any} context The context which provides the method to override.
 * @param {string} name The name of the method to override.
 * @param {function} override The override function. This function gets called
 * with the original method as first its parameter.
 */
function override(context, name, override){
    var original = context[name],
        originalCaller = function () {
            return original.apply(context, Array.prototype.slice.call(arguments, 0));
        };
    context[name] = function () {
        return override.apply(context, [originalCaller].concat(Array.prototype.slice.call(arguments, 0)));
    };
}

module.exports = override;
