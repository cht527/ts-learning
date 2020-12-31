/*
 * @Author: Cao Haitao
 */

 type Tfunc<T> = (item:T, index:number, arr:T[]) => boolean
 function everyTest<T>(arr:T[],func:Tfunc<T>){
    let index = 0;

    while(index < arr.length){
       
       const res = func(arr[index],index,arr);
       index++;
       if(!res){
           return false
       }
    }

    return true
 }

 const arr_ = [{a:1,b:{name:'1'}},{a:2,b:{name:'2'}},{a:4,b:{name:'3'}}];

 console.log(everyTest(arr_,(item,idx)=>item.a > 1))
