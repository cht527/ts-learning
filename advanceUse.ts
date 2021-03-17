
/*
 * @Author: your name
 * @Date: 2019-12-11 14:53:12
 * @LastEditTime: 2020-12-10 20:48:18
 * @LastEditors: Please set LastEditors
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

interface Dictionary<T> {
  [index: string]: T;
};

interface NumericDictionary<T> {
  [index: number]: T;
};

// 交叉类型
interface IObj1{
    a:string,
    c:number
}
interface IObj2{
    b:number,
    a:string
}
let o1:IObj1={
    a:'1',
    c:1
}
let o2:IObj2={
    b:2,
    a:'4'
}
let o3:IObj1 & IObj2={
    a:'d',
    c:1,
    b:0

};

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
    a:string,
    b:string
}

type TPartial<T>={
    [P in keyof T]?:T[P] // TIP: 可以已有非必选项
}

const testP:TPartial<objPartial>={
    a:'1',
}

// Requierd

type TRequired<T>={
    [P in keyof T]-?:T[P] // TIP: 全部必选
}

const testRequiredValue:TRequired<objPartial>={
    a:'avalue',
    b:'bvalue'
}

// PowerPartial -- 多层
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
    c:string
}

const a:TTestPick={
    a:'avalue',
    b:'bvalue',
    c:'cvalue'

}
type TPick<T,K extends keyof T>={
    [P in K]:T[P]
}

const testPick:TPick<objPartial,'a'>={
    a:'value',
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

// Exclude T中排除U
type TExclude<T,U>= T extends U ? never : T;

type TNum1=1|2|3;
type TNum2=2|3|4;

const testExclude:TExclude<TNum1, TNum2>=1


// Extract  

type TExtract<T,U> = T extends U ? T: never;

type TNum3=1|2|3;
type TNum4=2|3|4;

const textExtract:TExtract<TNum3,TNum4>=3 // or 2

// Omit 
interface THouse{
    window:string;
    door:string;
    loft:string;
}

interface TRoom{
    window:string;
    door:string;
    kichen:string;
}

type TOmit<T,K>=Pick<T,TExclude<keyof T,K>>

const getUserInfo = (a:number, b:number) => a+b;

type UserInfo = ReturnType<typeof getUserInfo>

const testOmit:TOmit<THouse,keyof TRoom>={
    loft:'l'
}

// Readonly
type readonlyObj={
    a:string,
    b:string
}

type TReadonly<T> ={
    readonly [P in keyof T]:T[P]
}

const testReadonly:TReadonly<readonlyObj>={
    a:'1',
    b:'2'
}


// infer
type extractArrayType<T> = T extends (infer U)[] ? U :never;

type InferArr=string[];

const stringType:extractArrayType<InferArr>='str';


type InferAB<T> = T extends {a:infer U,b:infer U} ? U :T;
type InferABNumber = InferAB<{a:number,b:number}>;
type InferABNumberString = InferAB<{a:number,b:string}>;
const infer_number:InferABNumber=1;
const infer_number_string:InferABNumberString='string'



// ------------------------实践------------------------------
// 类型约束

const dataDemo={
    prop1:'prop1',
    prop2:2
}

function getProps<T extends object,K extends keyof T>(obj:T,prop:K):T[K]{
    return obj[prop]
}

const prop=getProps(dataDemo,'prop1');

type Partial<T> = {
    [K in keyof T]?: T[K]
}

// 类型的拓宽是所有出现的空类型和未定义类型都被类型 any 替换。
let aa=undefined;
let bb=null;

// 交集

type A={
    name:string;
    age:number
}

type B={
    name:string;
    weight:number
}

type A_B= A & B;

const testAnd:Pick<A,'name'>={
    name:'a',
   // age:1,
   // weight:1
}


type Readonly<T>={
    readonly [key in keyof T]:T[key]
}
type aAndB={
    a:string,
    b:string
}

const readA:Readonly<aAndB>={
    a:'d',
    b:'c'
}

const readFun=<T>(obj:T):Readonly<T>=>{
    return obj
}

const res=readFun<aAndB>(readA);


// -- 装饰器


const mixed = ['x',1]


//使用方式1
mixed.push(1) //(string|number)[] 更为合理


const testArray=[1,23];

const testr = testArray.map(item=>item+1)
