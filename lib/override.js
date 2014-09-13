'use strict';

/**
 * Overrides an existing method of the given context.
 * The original method is provided over the first parameter of the override function.
 * If no original method with the given name exists in the provided context, the override
 * function will be appended to the context anyway.
 * @param {any} context The context to which the override function should be appended to.
 * @param {string} name The name of the function to override.
 * @param {function} override The override function to append.
 * @example
 * function BaseClass(ctrParam1, ctrParam2){
*     this.method1 = function(param1, param2){ ... };
* }
 * BaseClass.prototype.method2 = function(param1){ ... };
 *
 * function SubClass(ctrParam1, ctrParam2, ctrParam3){
*     BaseClass.call(this, ctrParam1, ctrParam2);
*
*     override(this, "method1", function(base, param1, param2){
*         base(param1, param2);
*         ...
*     }
* }
 *
 * override(SubClass.prototype, "method2", function(base, param1){
*     base(param1);
*     ...
* });
 *
 * inherit(BaseClass, SubClass);
 *
 */
function override(context, name, override){
    var original = context[name],
        originalCaller = function () {
            return original.apply(context, arguments);
        };
    context[name] = function () {
        return override.apply(context, [originalCaller].concat(Array.prototype.slice.call(arguments, 0)));
    };
}

module.exports = override;
