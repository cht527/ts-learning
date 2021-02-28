/*
 * @Author: your name
 * @Date: 2020-05-27 16:07:50
 * @LastEditTime: 2021-02-28 11:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/decorator.ts
 */ 


function getProp(params:string):ClassDecorator{
    return function (target:Function) {
        target.prototype.job = params
    }
}

@getProp('eat')
class Animal1{
    constructor(name:string){}
    job: string;
    getName() {
        console.log(this.job)
    }
}



const ani=new Animal1('a');

console.log(ani.getName());
