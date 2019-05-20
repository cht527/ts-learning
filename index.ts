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
    run():void{
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
    think():void{
        console.log(`i have develope my ${this.brian}`);
        
    }
}
class Cat extends Animal{
    constructor(eye:number,brain:string){
        super(eye,brain)
    }
    eat():void{
        console.log('cat eat fish');
        
    }
   
}
class Dog extends Animal{
    constructor(eye:number,brain:string){
        super(eye,brain)
    }
    
}
let animal = new Animal(2,'brain');
//console.log(animal.eye); 类外部无法访问 protected属性 


let tom =new Cat(2,'brain');

tom.eat();
//console.log(tom.brian); 子类无法访问 private 属性

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







