/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
function  curry<T>(func:(...args:any[])=>any,...rest:T[]) {
    const argLen = func.length;
    const _curry = function (n:number,params:any[]) {                
        return n === 0 ? func.call(null,...params) : function(...x:any[]){
            return _curry(n-x.length,params.concat(x))
        }
    }

    return _curry(argLen-rest.length,rest)
    // const _args:T[]=[...rest];

    // return function cb(...params:any[]){
    //     console.log(params,_args);
        
    //     if(params.length===0){
    //         return func.apply(this,_args)
    //     }
    //     _args.push(...params)
        
    //     return cb
    // }

}

const add = curry((a,b)=>a+b,1);


const res = add(3)

console.log(res);
