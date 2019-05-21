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
function ajax(config) {
    var xhr = new XMLHttpRequest();
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
var md5;
md5 = function (key, value) {
    return key + value;
};
console.log(md5('key-', '-value'));
var arr = ['aaa', 'bbb', 12];
console.log(arr[0]);
var arrobj = { name: 'jon', age: 22 };
var interDog = /** @class */ (function () {
    function interDog(name) {
        this.name = name;
    }
    interDog.prototype.eat = function () {
        console.log(this.name + '--实现接口');
    };
    return interDog;
}());
var mydog = new interDog('jee');
mydog.eat();
var Pupil = /** @class */ (function () {
    function Pupil(name) {
        this.name = name;
    }
    Pupil.prototype.reading = function () {
        console.log('pupil---read--' + this.name);
    };
    return Pupil;
}());
var MiddleStudent = /** @class */ (function (_super) {
    __extends(MiddleStudent, _super);
    function MiddleStudent(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    MiddleStudent.prototype.speech = function () {
        console.log('speech--' + this.name);
    };
    MiddleStudent.prototype.homeWork = function () {
        console.log('i am' + this.name + ',' + this.age + 'years old');
    };
    return MiddleStudent;
}(Pupil));
var mideleStu = new MiddleStudent('zhangsan', 12);
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
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.getMin = function () {
        var minMin = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minMin > this.list[i]) {
                minMin = this.list[i];
            }
        }
        return minMin;
    };
    return MinClass;
}());
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
var setData = function (value1, value2) {
    console.log(value1, value2 + '--泛型接口');
    return value1;
};
setData('T1', 'T2');
var setData2 = function (value) {
    console.log(value);
    return value;
};
setData2('fanxing T2');
