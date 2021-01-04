"use strict";
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
function nth(arr, n) {
    const _n = typeof n === 'number' ? (n < 0 ? n + arr.length : n) : 0;
    return arr[_n];
}
const testNthArr = [1, 3];
console.log(nth(testNthArr, 1));
