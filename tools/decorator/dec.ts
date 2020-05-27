/*
 * @Author: your name
 * @Date: 2020-05-27 15:54:11
 * @LastEditTime: 2020-05-27 16:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/tools/decorator/dec.ts
 */ 

import BaseLogic from '../../base'
function testClass(target:Function){
    target.prototype.test=true
}
function dec(id:string){
    console.log('id:'+id);
    return (target:typeof BaseLogic,property:string,descriptor:TypedPropertyDescriptor<any>)=>console.log('output:'+id);
}   

export {testClass,dec}