// 数据类型
function DataType(){
    var str:string='abc';
    var num:number=123;
    var isTrue:boolean=true;
    
    var array:number[]=[1,2,3];
    var array2:Array<number>=[2,3,4];

    //tuple 元组，属于数组一种，元素类型可以不同,每一个位置制定类型
    var array3:[number,string]=[3,'4'];

    //enum 枚举类型

    enum flag{
        success=0,
        error=1
    }

    let s:flag=flag.success; //0


    enum Error{
        found=302,
        continue=100,
        notModified=304
    }
    let found:Error=Error.found; //302


    // any 

    var box:any=document.getElementById('box');
    box.style.color='green';
    
    // null undefined

    var n:number|undefined|null;
    console.log(n);

    //void  方法没有返回值

    function run():void{
        console.log(1);
    }
    function backNum():number{
        return 1
    }

    //never 其他类型 从不会出现的值 包含 undefined 和 null类型

    var nev:never;

  

}
DataType();

// 类
class Person{
    name:string;
    constructor(n:string){
        this.name=n;
    }
    test = () => {
        console.log(this);
    }
    run():void{
        console.log(this);
        
        console.log(this.name)
    }
    getName():string{
        return this.name
    }
    setName(newName:string):void{
        this.name=newName
    }
}

class Chinese extends Person{
    constructor(name:string){
        super(name)
    }
    
}


var person = new Person('person');
var chinese=new Chinese('caohaitao');
chinese.setName('cht');
chinese.run();


/* 
public 类里面、外面、子类 
protected 类里面、子类可以访问 
private 类里面可以访问

属性如果不加修饰符，默认是public
*/

class Animal{
    static selfProp:string='selfProp';
    protected eye:number;
    private brian:string;
    constructor(eye:number,brian:string){
        this.eye=eye;
        this.brian=brian;
    }
    static selfMethod():void{
        console.log('animal 静态方法');
    }
    eat():void{
        console.log(`i have ${this.eye} eye,and eat something`)
    }
    bark():void{
        console.log('bark')
    }
    protected think():string{
        console.log(`i have develop my ${this.brian}`);
        return 'think'
    }
}
class Cat extends Animal{
    constructor(eye:number,brain:string){
        super(eye,brain)
    }

    eat():void{
        const thinkStr=this.think();
        console.log('cat eat fish and'+thinkStr);
        
    }

    protected miaomiao():void{
        console.log('miaomiao')
    }
}
class Dog extends Animal{
    constructor(eye:number,brain:string){
        super(eye,brain)
    }
    
}
let animal = new Animal(2,'brain');
// console.log(animal.eye); // 类外部无法访问 protected属性 


let tom =new Cat(2,'brain');

tom.eat();


// console.log(tom.brian); // 子类无法访问 private 属性

Animal.selfMethod();

console.log(Animal.selfProp) //静态属性

// 多态 父类定义一个方法不去实现，让继承它的子类，每个子类的不同的表现

let dog = new Dog(2,'brain');

let cat = new Cat(2,'brain');

dog.bark();
cat.eat();


// 抽象类 提供其他类继承的基类，不能直接被实例化

//用abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

//abstract 抽象方法只能放在抽象类里面

// 抽象类和抽象方法用来定义标准，父类要求它的子类必须包含父类中的抽象方法

abstract class Parent{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    abstract run():void;
}
class Child extends Parent{
    constructor(name:string){
        super(name)
    }
   run():void{
        console.log(this.name+'--抽象类方法')
   }   
}

let zhangsan=new Child('zhangsan');

zhangsan.run();

// 接口，定义行为和动作的规范

// 1\属性接口
    // eg:对传入参数类型的约束
interface FullName{
    firstName:string;
    lastName:string;
}

function propInterface(name:FullName):void{
    console.log(name.firstName+'--'+name.lastName)
}

propInterface({firstName:'haitao',lastName:'cao'})

// 2\可选属性

interface MyName{
    firstName:string;
    lastName?:string;// ----------可选属性
}

function selectInterface(name:MyName):void{
    console.log(name.firstName+'--'+name.lastName)
}
selectInterface({firstName:'海天'})


// 接口 实现ajax

interface ConfigAjax{
    type:string;
    url:string;
    data?:string;
    dataType:string

}

function ajax(config:ConfigAjax){
    let xhr=new XMLHttpRequest();
    xhr.open(config.type,config.url,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            if(config.dataType=='json'){
                console.log(JSON.parse(xhr.responseText))
            }
            console.log('success');
            
        }
    }
    xhr.send(config.data);
}

// 函数类型接口，对传入函数的参数和返回值进行约束


interface encrypt{
    (key:string,value:string):string
}

let md5:encrypt;

md5=function(key:string,value:string){
    return key+value
}

console.log(md5('key-','-value'));


// 可索引接口 --对数组对象的约束 --不常用

interface UserArr{
    [index:number]:string|number
}

let arr:UserArr=['aaa','bbb',12];

console.log(arr[0]);

interface userObj{
    [index:string]:string|number
}

let arrobj:userObj={name:'jon',age:22}

// 类类型的接口  -- 对类的约束，和抽象类类似


interface AnimalInterface{
    name:string;
    eat(food:string):void;
}

class interDog implements AnimalInterface{
    name:string;
    constructor(name:string){
        this.name=name
    }

    eat(){ // TEMP: 可以不传参数
        console.log(this.name+'--实现接口');
        
    }
}


var mydog=new interDog('jee');

mydog.eat();



// 接口的扩展 接口可继承接口


interface Teacher{
    speech():void;
}

interface Student extends Teacher{
    homeWork():void
}

class Pupil{
    public name:string;
    constructor(name:string){
        this.name=name
    }
    reading():void{
        console.log('pupil---read--'+this.name);
        
    }
}

class MiddleStudent extends Pupil implements Student{
    public age:number;
    constructor(name:string,age:number){
        super(name);
        this.age=age;
    }
    speech(){
        console.log('speech--'+this.name);
        
    }
    homeWork(){
        console.log('i am'+this.name+','+this.age+'years old');
        
    }
}

let mideleStu=new MiddleStudent('zhangsan',12);

mideleStu.speech();
mideleStu.reading();
mideleStu.homeWork();


// 泛型 -- 解决类、接口、方法的复用性。以及对不特定数据类型的支持


function getData1<T>(value:T):T{

    // T 表示泛型，具体什么类型是调用方法的时候决定的
    console.log(value);
    
    return value
}

getData1<string>('124');

function getData2<T>(value:T):any{
    console.log(value)
    return '2323'
}
getData2<number>(222);

// 泛型类：
class MinClass<T>{
    public list:T[]=[];

    add(num:T){
        this.list.push(num)
    }

    getMin():T{
        let minMin = this.list[0];
        for(let i=0;i<this.list.length;i++){
            if(minMin>this.list[i]){
                minMin=this.list[i]
            }
        }

        return minMin
    }
}

// 实例化类，并且指定了类的T 代表的类型是number
var min_number=new MinClass<number>();

min_number.add(-1);
min_number.add(2);
min_number.add(1);
min_number.add(0);


var min_string= new MinClass<string>();
console.log(min_number.getMin());



min_string.add('a');
min_string.add('c');
min_string.add('b');


console.log(min_string.getMin());

// 泛型接口

// 方法一
interface ConfigT{
    <T>(value1:T,value2:T):T;
}

let setData:ConfigT=function<T>(value1:T,value2:T):T{
    console.log(value1,value2+'--泛型接口');
    
    return value1
}

setData<string>('T1','T@');

// 方法二

interface ConfigT2<T>{
    (value:T):T
}

let setData2:ConfigT2<string>=function<T>(value:T){
    console.log(value);
    return value
}

setData2('fanxing T2')

// -----


let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();



interface ILengthParam{
    length:number
}

function getArg<T extends ILengthParam>(arg:T){    
    return arg
}

enum Gender{
    Male,
    Female
}

interface Per{
    name:string;
    age:number;
    gender: Gender
}

const perTest =[
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
]
function pluck<T,K extends keyof T>(obj:T[],keys:K[]):Partial<T>[]{
    if(obj.length ===0 || keys.length===0){
        return []
    }
    return obj.map(item=>{
        let temp:Partial<T>={};
        keys.reduce((val,key)=>{
            val[key]=item[key];
            return val
        },temp);

        return temp
    })
}

console.log(pluck(perTest,['name','age']));



interface Dictionary<T> {
    [key: string]: T;
  }
let keys: keyof Dictionary<string>;



















