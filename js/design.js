"use strict";
/*
 * @Author: your name
 * @Date: 2020-05-15 14:35:24
 * @LastEditTime: 2020-05-15 15:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/design.ts
 */
// 1、模板 模式
class Beverage {
    boilerWater() {
        console.log('boiler water');
    }
    make() {
        this.boilerWater();
        this.brew();
        this.pourInCup();
        this.drink();
    }
}
class Coffee extends Beverage {
    constructor(name) {
        super();
        this.name = name;
    }
    brew() {
        console.log('brew' + this.name);
    }
    pourInCup() {
        console.log('pourInCup' + this.name);
    }
    drink() {
        console.log('drink' + this.name);
    }
}
const makeCoffee = new Coffee('long black');
makeCoffee.make();
