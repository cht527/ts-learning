/*
 * @Author: your name
 * @Date: 2020-05-27 16:07:50
 * @LastEditTime: 2021-02-28 11:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/decorator.ts
 */ 


function classStatic (constructor:Function) {
        // 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
        // constructor 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
        // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

        constructor.prototype.type = 'animal'
}


function classDynamic(log:(param:any)=>void):ClassDecorator{
    return function(constructor:Function){
        log(`This is an ${constructor.prototype.type}`)
    }
}

/*
它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
*/
interface Descriptor<T> {
    value?:any,
    configuable?:boolean,
    writeable?:boolean,
    get?:()=>T,
    set?:(value:T)=>void,

}

// function methodDecorator(target:any,prop:string,descriptor:Descriptor<string>){
//     return {
//         value:(...args:any[])=>{
//             var a = args.map(a => JSON.stringify(a)).join();
//             var result = descriptor.value;
//             var r = JSON.stringify(result);
//             console.log(`Call: ${prop}(${a}) => ${r}`);
//             return result;
//         }
//     }
// }

@classDynamic(console.log)
@classStatic
class Animal1{
    name:string;
    constructor(name:string){
        this.name = name;
    }
    
    // @methodDecorator
    // say() {
    //     return this.name
    // }
    
}



// const ani=new Animal1('cat');

