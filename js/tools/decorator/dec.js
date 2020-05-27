"use strict";
/*
 * @Author: your name
 * @Date: 2020-05-27 15:54:11
 * @LastEditTime: 2020-05-27 16:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/tools/decorator/dec.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
function testClass(target) {
    target.prototype.test = true;
}
exports.testClass = testClass;
function dec(id) {
    console.log('id:' + id);
    return (target, property, descriptor) => console.log('output:' + id);
}
exports.dec = dec;
