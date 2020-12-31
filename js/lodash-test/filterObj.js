"use strict";
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
function filterObj(obj, func) {
    let index = 0;
    let keys = Object.keys(obj);
    let len = keys.length;
    let result = {};
    while (index < len) {
        const res = func(obj[keys[index]], index, obj);
        if (res) {
            result[keys[index]] = obj[keys[index]];
        }
        index++;
    }
    return result;
}
const aa = {
    a: 1,
    b: 2,
    c: 4
};
console.log(filterObj(aa, (item, index) => item > 1));
