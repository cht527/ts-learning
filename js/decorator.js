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
function getProp(params) {
    return function (target) {
        target.prototype.job = params;
    };
}
let Animal1 = class Animal1 {
    constructor(name) { }
    getName() {
        console.log(this.job);
    }
};
Animal1 = __decorate([
    getProp('eat')
], Animal1);
const ani = new Animal1('a');
console.log(ani.getName());
