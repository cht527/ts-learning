/*
 * @Author: your name
 * @Date: 2020-05-27 16:07:50
 * @LastEditTime: 2020-05-27 16:33:52
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
import { testClass } from './tools/decorator/dec';
let Animal = class Animal {
    getName() {
        console.log('n');
    }
};
Animal = __decorate([
    testClass
], Animal);
const ani = new Animal();
console.log(ani);
