describe("node-inherit", function(){

    var inherit = require('../lib/node-inherit');

    var BaseClass = function(param1, param2) {
        this.p1 = param1;
        this.p2 = param2;
    };
    BaseClass.prototype = {
        method1: function(){
            return this.p1 + this.p2;
        }
    };

    var SubClass = inherit(BaseClass, function(param1, param2, param3){
        BaseClass.call(this, param1, param2);
        this.p3 = param3;
    }, {
        method2: function(){
            return this.p1 + this.p2 + this.p3;
        }
    });

    var sub = new SubClass(1, 2, 3);

    it("should inherit own properties", function(){
        expect(sub.p1).not.toBeUndefined();
        expect(sub.p2).not.toBeUndefined();
    });

    it("should inherit prototype members (method1)", function(){
        expect(sub.method1).not.toBeUndefined();
    });
    it("should inherit prototype members (method2)", function(){
        expect(sub.method2).not.toBeUndefined();
    });

    it("should call members in sub class' context (method1)", function(){
        expect(sub.method1()).toEqual(3);
    });
    it("should call members in sub class' context (method2)", function(){
        expect(sub.method2()).toEqual(6);
    });
});

