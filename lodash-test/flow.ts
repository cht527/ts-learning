/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
import * as _ from 'lodash';

_.flow();

type TFunc = (...args:any[])=>any;

function flow(...func:TFunc[]):TFunc{
    let len = func.length;
    let index = len-1;
    while (index--) {
        if (typeof func[index] !== 'function') {
          throw new TypeError('Expected a function')
        }
    }
    return (...args:number[]) =>{
        let idx = 0;
        let result = length ?  func[index].apply<TFunc,number[],any>(this, args) : args[0];

        while(++idx<length){
            result = func[index].call(this,result)
        }

        return result

    }
}