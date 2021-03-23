

declare global{
  interface Array<T>{
    myMap<U>(callback:(value:T,index:number,array:T[])=>U,thisArg?:any):U[],
    myForEach(callback:(value:T,index:number,array:T[])=>void,thisArg?:any):void,
    myFilter<T>(callback:(value:T,index:number,array:T[])=>unknown,thisArg?:any):T[],
    myReduce(callback:(acc:T,value:T,index:number,array:T[])=>T,thisArg?:any):T,
    myReduce(callback:(acc:T,value:T,index:number,array:T[],initValue:T)=>T,thisArg?:any):T,
    myReduce<U>(callback:(acc:U,value:T,index:number,array:T[],initValue:U)=>U,thisArg?:any):U
  }
}

export {}