/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */


type Tfun<T> = (item:T, index:number,obj:{[key:string]:T}) => boolean

function filterObj<T>(obj:{[key:string]:T},func:Tfun<T>){
    let index = 0;
    let keys = Object.keys(obj);
    let len= keys.length;
    let result:{[key:string]:T} = {}
    while(index < len){
       const res = func(obj[keys[index]],index,obj);
       if(res){
            result[keys[index]]=obj[keys[index]]
       }
       index++ 
    }

    return result
}

const aa ={
    a:1,
    b:2,
    c:4
}
console.log(filterObj(aa,(item,index)=> item > 1));
