"use strict";
var QueueTs = /** @class */ (function () {
    function QueueTs() {
        this.data = [];
    }
    QueueTs.prototype.enter = function (member) {
        this.data.push(member);
    };
    QueueTs.prototype.out = function () {
        this.data.shift();
    };
    QueueTs.prototype.get = function () {
        return this.data;
    };
    return QueueTs;
}());
var StackTs = /** @class */ (function () {
    function StackTs() {
        this.data = [];
    }
    StackTs.prototype.enter = function (member) {
        this.data.push(member);
    };
    StackTs.prototype.out = function () {
        this.data.pop();
    };
    StackTs.prototype.get = function () {
        return this.data;
    };
    return StackTs;
}());
var myQueue = new QueueTs();
var myStack = new StackTs();
myQueue.enter({ a: 1 });
myQueue.enter({ b: 2 });
myStack.enter('c');
myStack.enter('d');
console.log(myQueue.data);
console.log(myStack.data);
var isSomeType = function (arg) {
    return typeof (arg.a) === 'string';
};
var testNum = { a: ['222'] };
console.log(isSomeType(testNum));
