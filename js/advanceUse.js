"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: your name
 * @Date: 2019-12-11 14:53:12
 * @LastEditTime : 2019-12-31 16:03:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/advanceUse.ts
 */
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
//  
const testArr = [1, 2, 3, 4, 4, 2, 5, 3, 23, 3, 345, 3, 9, 2];
const transArrToMap = (arr) => {
    let map = new Map();
    arr.forEach((item) => {
        if (map.has(item)) {
            let value = map.get(item);
            map.set(item, value + 1);
        }
        else {
            map.set(item, 1);
        }
    });
    [...map.entries()].map((item) => {
        console.log(`${item[0]} has ${item[1]} times`);
    });
};
transArrToMap(testArr);
const testPartialValue = {
    a: 'avalue',
};
const testRequiredValue = {
    a: 'avalue',
    b: 'bvalue'
};
const testRecordVaue = {
    dog: {
        name: 'dog',
        age: 1
    },
    cat: {
        name: 'cat',
        age: 2
    }
};
