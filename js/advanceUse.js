/*
 * @Author: your name
 * @Date: 2019-12-11 14:53:12
 * @LastEditTime: 2020-12-10 20:48:18
 * @LastEditors: Please set LastEditors
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
;
;
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
const testP = {
    a: '1',
};
const testRequiredValue = {
    a: 'avalue',
    b: 'bvalue'
};
const testPartialValue = {
    a: 'avalue',
};
const a = {
    a: 'avalue',
    b: 'bvalue',
    c: 'cvalue'
};
const testPick = {
    a: 'value',
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
const testExclude = 1;
const textExtract = 3; // or 2
const getUserInfo = (a, b) => a + b;
const testOmit = {
    loft: 'l'
};
const testReadonly = {
    a: '1',
    b: '2'
};
const stringType = 'str';
const infer_number = 1;
const infer_number_string = 'string';
// ------------------------实践------------------------------
// 类型约束
const dataDemo = {
    prop1: 'prop1',
    prop2: 2
};
function getProps(obj, prop) {
    return obj[prop];
}
const prop = getProps(dataDemo, 'prop1');
// 类型的拓宽是所有出现的空类型和未定义类型都被类型 any 替换。
let aa = undefined;
let bb = null;
const testAnd = {
    name: 'a',
};
const readA = {
    a: 'd',
    b: 'c'
};
const readFun = (obj) => {
    return obj;
};
const res = readFun(readA);
export {};
// -- 装饰器
const mixed = ['x', 1];
//使用方式1
mixed.push(1); //(string|number)[] 更为合理
export {};
