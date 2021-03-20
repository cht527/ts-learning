"use strict";
/*
 * @Author: your name
 * @Date: 2020-05-27 16:07:50
 * @LastEditTime: 2021-02-28 11:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/decorator.ts
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function classStatic(constructor) {
    // 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
    // constructor 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
    constructor.prototype.type = 'animal';
}
function classDynamic(log) {
    return function (constructor) {
        log(`This is an ${constructor.prototype.type}`);
    };
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
let Animal1 = class Animal1 {
    constructor(name) {
        this.name = name;
    }
};
Animal1 = __decorate([
    classDynamic(console.log),
    classStatic
], Animal1);
// const ani=new Animal1('cat');
