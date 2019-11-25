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

