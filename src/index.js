"use strict";
// 数据类型
function DataType() {
    var str = 'abc';
    var num = 123;
    var isTrue = true;
    var array = [1, 2, 3];
    var array2 = [2, 3, 4];
    //tuple 元组，属于数组一种，元素类型可以不同,每一个位置制定类型
    var array3 = [3, '4'];
    //enum 枚举类型
    let flag;
    (function (flag) {
        flag[flag["success"] = 0] = "success";
        flag[flag["error"] = 1] = "error";
    })(flag || (flag = {}));
    let s = flag.success; //0
    let Error;
    (function (Error) {
        Error[Error["found"] = 302] = "found";
        Error[Error["continue"] = 100] = "continue";
        Error[Error["notModified"] = 304] = "notModified";
    })(Error || (Error = {}));
    let found = Error.found; //302
    // any 
    var box = document.getElementById('box');
    box.style.color = 'green';
    // null undefined
    var n;
    console.log(n);
    //void  方法没有返回值
    function run() {
        console.log(1);
    }
    function backNum() {
        return 1;
    }
    //never 其他类型 从不会出现的值 包含 undefined 和 null类型
    var nev;
}
DataType();
// 类
class Person {
    constructor(n) {
        this.test = () => {
            console.log(this);
        };
        this.name = n;
    }
    run() {
        console.log(this);
        console.log(this.name);
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
}
class Chinese extends Person {
    constructor(name) {
        super(name);
    }
}
var person = new Person('person');
var chinese = new Chinese('caohaitao');
chinese.setName('cht');
chinese.run();
/*
public 类里面、外面、子类
protected 类里面、子类可以访问
private 类里面可以访问

属性如果不加修饰符，默认是public
*/
class Animal {
    constructor(eye, brian) {
        this.eye = eye;
        this.brian = brian;
    }
    static selfMethod() {
        console.log('animal 静态方法');
    }
    eat() {
        console.log(`i have ${this.eye} eye,and eat something`);
    }
    bark() {
        console.log('bark');
    }
    think() {
        console.log(`i have develop my ${this.brian}`);
        return 'think';
    }
}
Animal.selfProp = 'selfProp';
class Cat extends Animal {
    constructor(eye, brain) {
        super(eye, brain);
    }
    eat() {
        const thinkStr = this.think();
        console.log('cat eat fish and' + thinkStr);
    }
    miaomiao() {
        console.log('miaomiao');
    }
}
class Dog extends Animal {
    constructor(eye, brain) {
        super(eye, brain);
    }
}
let animal = new Animal(2, 'brain');
// console.log(animal.eye); // 类外部无法访问 protected属性 
let tom = new Cat(2, 'brain');
tom.eat();
// console.log(tom.brian); // 子类无法访问 private 属性
Animal.selfMethod();
console.log(Animal.selfProp); //静态属性
// 多态 父类定义一个方法不去实现，让继承它的子类，每个子类的不同的表现
let dog = new Dog(2, 'brain');
let cat = new Cat(2, 'brain');
dog.bark();
cat.eat();
// 抽象类 提供其他类继承的基类，不能直接被实例化
//用abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
//abstract 抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准，父类要求它的子类必须包含父类中的抽象方法
class Parent {
    constructor(name) {
        this.name = name;
    }
}
class Child extends Parent {
    constructor(name) {
        super(name);
    }
    run() {
        console.log(this.name + '--抽象类方法');
    }
}
let zhangsan = new Child('zhangsan');
zhangsan.run();
function propInterface(name) {
    console.log(name.firstName + '--' + name.lastName);
}
propInterface({ firstName: 'haitao', lastName: 'cao' });
function selectInterface(name) {
    console.log(name.firstName + '--' + name.lastName);
}
selectInterface({ firstName: '海天' });
function ajax(config) {
    let xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (config.dataType == 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            console.log('success');
        }
    };
    xhr.send(config.data);
}
let md5;
md5 = function (key, value) {
    return key + value;
};
console.log(md5('key-', '-value'));
let arr = ['aaa', 'bbb', 12];
console.log(arr[0]);
let arrobj = { name: 'jon', age: 22 };
class interDog {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name + '--实现接口');
    }
}
var mydog = new interDog('jee');
mydog.eat();
class Pupil {
    constructor(name) {
        this.name = name;
    }
    reading() {
        console.log('pupil---read--' + this.name);
    }
}
class MiddleStudent extends Pupil {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    speech() {
        console.log('speech--' + this.name);
    }
    homeWork() {
        console.log('i am' + this.name + ',' + this.age + 'years old');
    }
}
let mideleStu = new MiddleStudent('zhangsan', 12);
mideleStu.speech();
mideleStu.reading();
mideleStu.homeWork();
// 泛型 -- 解决类、接口、方法的复用性。以及对不特定数据类型的支持
function getData1(value) {
    // T 表示泛型，具体什么类型是调用方法的时候决定的
    console.log(value);
    return value;
}
getData1('124');
function getData2(value) {
    console.log(value);
    return '2323';
}
getData2(222);
// 泛型类：
class MinClass {
    constructor() {
        this.list = [];
    }
    add(num) {
        this.list.push(num);
    }
    getMin() {
        let minMin = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
            if (minMin > this.list[i]) {
                minMin = this.list[i];
            }
        }
        return minMin;
    }
}
// 实例化类，并且指定了类的T 代表的类型是number
var min_number = new MinClass();
min_number.add(-1);
min_number.add(2);
min_number.add(1);
min_number.add(0);
var min_string = new MinClass();
console.log(min_number.getMin());
min_string.add('a');
min_string.add('c');
min_string.add('b');
console.log(min_string.getMin());
let setData = function (value1, value2) {
    console.log(value1, value2 + '--泛型接口');
    return value1;
};
setData('T1', 'T@');
let setData2 = function (value) {
    console.log(value);
    return value;
};
setData2('fanxing T2');
// -----
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
function getArg(arg) {
    return arg;
}
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
const perTest = [
    {
        name: 'aa',
        age: 1,
        gender: 3
    },
    {
        name: 'bb',
        age: 111,
        gender: 333
    }
];
function pluck(obj, keys) {
    if (obj.length === 0 || keys.length === 0) {
        return [];
    }
    return obj.map(item => {
        let temp = {};
        keys.reduce((val, key) => {
            val[key] = item[key];
            return val;
        }, temp);
        return temp;
    });
}
console.log(pluck(perTest, ['name', 'age']));
let keys;
