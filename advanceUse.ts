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

