/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
import * as _ from 'lodash';
_.delay(console.log,1)
function delay(func:(...args:any[])=>any,delay:number,...args:any[]): number {
    if(typeof func !== 'function'){
        throw new TypeError('type Error')
    }
    return setTimeout(func, delay || 0, ...args);
}



