import { type } from "./rc-hooks";

/*
 * @Author: your name
 * @Date: 2019-12-11 14:53:12
 * @LastEditTime : 2020-01-15 17:25:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/advanceUse.ts
 */
class QueueTs<T>{
    public data:T[]= [];
    enter(member:T){
        this.data.push(member)
    }
    out(){
        this.data.shift()
    }
    get(){
        return this.data
    }
}

class StackTs<T>{
    public data:T[] =[];
    enter(member:T){
        this.data.push(member)
    }
    out(){
        this.data.pop()
    }
    get(){
        return this.data
    }
}

let myQueue = new QueueTs<object>();

let myStack = new StackTs<string>();

myQueue.enter({a:1});
myQueue.enter({b:2});

myStack.enter('c');
myStack.enter('d');

console.log(myQueue.data);
console.log(myStack.data);


// ---- is
interface ISelfDefine{
    a:string
}
interface ISelfDefine2{
    a:string[]
}
const isSomeType =(arg:ISelfDefine|ISelfDefine2):arg is ISelfDefine=>{
    return typeof(arg.a) === 'string' 
}

const testNum={a:['222']};
console.log(isSomeType(testNum));


// -- Map 

interface IMap<T>{
    [key:string]:T
}

// 交叉类型
interface IObj1{
    a:string
}
interface IObj2{
    b:number
}
let o1:IObj1={
    a:'1'
}
let o2:IObj2={
    b:2
}
let o3:IObj1 & IObj2=Object.assign({},o1,o2);

console.log(o3);

//  
const testArr=[1,2,3,4,4,2,5,3,23,3,345,3,9,2];
const transArrToMap = (arr:number[]) =>{
    let map = new Map<number,number>();
    arr.forEach((item)=>{
        if(map.has(item)){
            let value = map.get(item);
            map.set(item,value!+1)
        }else{
            map.set(item,1)
        }
    });

    [...map.entries()].map((item)=>{
        console.log(`${item[0]} has ${item[1]} times`  );
        
    })
}
transArrToMap(testArr);


//  Partial

type objPartial={
    a:'avalue',
    b:'bvalue'
}

type TPartial<T>={
    [P in keyof T]?:T[P] // TIP: 可以已有非必选项
}

export type PowerPartial<T> = {
    // 如果是 object，则递归类型
   [U in keyof T]?: T[U] extends object
     ? PowerPartial<T[U]>
     : T[U]
};

const testPartialValue:TPartial<objPartial>={
    a:'avalue',
   // b:'bvalue', 
}

// Pick
type TTestPick= objPartial & {
    c:'cvalue'
}

const a:TTestPick={
    a:'avalue',
    b:'bvalue',
    c:'cvalue'

}
type TPick<T,K extends keyof T>={
    [P in K]:T[P]
}

const testPick:TPick<objPartial,>=a



// Requierd

type TRequired<T>={
    [P in keyof T]-?:T[P] // TIP: 全部必选
}

const testRequiredValue:TRequired<objPartial>={
    a:'avalue',
    b:'bvalue'
}

// Record 

type TAnimal='dog'|'cat';
type TAnimalObj={
    name:string,
    age:number
}

type TRecord<K extends string,T>={
    [P in K]:T
}

const testRecordVaue:TRecord<TAnimal,TAnimalObj>={
    dog:{
        name:'dog',
        age:1
    },
    cat:{
        name:'cat',
        age:2
    }
}


// Exclude 只保留T中可分配给U的值

type TExclude<T,U>= T extends U ? never : T;
type THouse={
    window:string,
    door:string
}
type TRoom={
    window:string
}

const testExclude:TExclude<TRoom,THouse>={
    window:'d'
}



