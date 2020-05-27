/*
 * @Author: your name
 * @Date: 2020-05-27 16:07:50
 * @LastEditTime: 2020-05-27 16:33:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/decorator.ts
 */ 


import {testClass,dec} from './tools/decorator/dec';

@testClass
class Animal{
    getName() {
        console.log('n')
    }
}

const ani=new Animal();

console.log(ani);
