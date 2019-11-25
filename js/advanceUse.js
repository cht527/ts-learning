"use strict";
class QueueTs {
    constructor() {
        this.data = [];
    }
    enter(member) {
        this.data.push(member);
    }
    out() {
        this.data.shift();
    }
    get() {
        return this.data;
    }
}
class StackTs {
    constructor() {
        this.data = [];
    }
    enter(member) {
        this.data.push(member);
    }
    out() {
        this.data.pop();
    }
    get() {
        return this.data;
    }
}
let myQueue = new QueueTs();
let myStack = new StackTs();
myQueue.enter({ a: 1 });
myQueue.enter({ b: 2 });
myStack.enter('c');
myStack.enter('d');
console.log(myQueue.data);
console.log(myStack.data);
const isSomeType = (arg) => {
    return typeof (arg.a) === 'string';
};
const testNum = { a: ['222'] };
console.log(isSomeType(testNum));
let o1 = {
    a: '1'
};
let o2 = {
    b: 2
};
let o3 = Object.assign({}, o1, o2);
console.log(o3);
