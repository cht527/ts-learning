"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var flag;
    (function (flag) {
        flag[flag["success"] = 0] = "success";
        flag[flag["error"] = 1] = "error";
    })(flag || (flag = {}));
    var s = flag.success; //0
    var Error;
    (function (Error) {
        Error[Error["found"] = 302] = "found";
        Error[Error["continue"] = 100] = "continue";
        Error[Error["notModified"] = 304] = "notModified";
    })(Error || (Error = {}));
    var found = Error.found; //302
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
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (newName) {
        this.name = newName;
    };
    return Person;
}());
var Chinese = /** @class */ (function (_super) {
    __extends(Chinese, _super);
    function Chinese(name) {
        return _super.call(this, name) || this;
    }
    return Chinese;
}(Person));
var chinese = new Chinese('caohaitao');
chinese.setName('cht');
chinese.run();
/*
public 类里面、外面、子类
protected 类里面、子类可以访问
private 类里面可以访问

属性如果不加修饰符，默认是public
*/
var Animal = /** @class */ (function () {
    function Animal(eye, brian) {
        this.eye = eye;
        this.brian = brian;
    }
    Animal.selfMethod = function () {
        console.log('animal 静态方法');
    };
    Animal.prototype.eat = function () {
        console.log("i have " + this.eye + " eye,and eat something");
    };
    Animal.prototype.bark = function () {
        console.log('bark');
    };
    Animal.prototype.think = function () {
        console.log("i have develope my " + this.brian);
    };
    Animal.selfProp = 'selfProp';
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(eye, brain) {
        return _super.call(this, eye, brain) || this;
    }
    Cat.prototype.eat = function () {
        console.log('cat eat fish');
    };
    return Cat;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(eye, brain) {
        return _super.call(this, eye, brain) || this;
    }
    return Dog;
}(Animal));
var animal = new Animal(2, 'brain');
//console.log(animal.eye); 类外部无法访问 protected属性 
var tom = new Cat(2, 'brain');
tom.eat();
//console.log(tom.brian); 子类无法访问 private 属性
Animal.selfMethod();
console.log(Animal.selfProp); //静态属性
// 多态 父类定义一个方法不去实现，让继承它的子类，每个子类的不同的表现
var dog = new Dog(2, 'brain');
var cat = new Cat(2, 'brain');
dog.bark();
cat.eat();
// 抽象类 提供其他类继承的基类，不能直接被实例化
//用abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
//abstract 抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准，父类要求它的子类必须包含父类中的抽象方法
var Parent = /** @class */ (function () {
    function Parent(name) {
        this.name = name;
    }
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name) {
        return _super.call(this, name) || this;
    }
    Child.prototype.run = function () {
        console.log(this.name + '--抽象类方法');
    };
    return Child;
}(Parent));
var zhangsan = new Child('zhangsan');
zhangsan.run();
function propInterface(name) {
    console.log(name.firstName + '--' + name.lastName);
}
propInterface({ firstName: 'haitao', lastName: 'cao' });
function selectInterface(name) {
    console.log(name.firstName + '--' + name.lastName);
}
selectInterface({ firstName: '海天' });
