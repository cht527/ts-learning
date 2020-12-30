"use strict";
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
var Logic;
(function (Logic) {
    Logic[Logic["Intersection"] = 0] = "Intersection";
    Logic[Logic["Union"] = 1] = "Union";
})(Logic || (Logic = {}));
function intersectionOrUnion(arr, type) {
    if (!Array.isArray(arr)) {
        return [];
    }
    if (arr.length === 0) {
        return [];
    }
    if (arr.length === 1) {
        return arr[1];
    }
    return type === Logic.Intersection
        ? arr.reduce((total, next) => total.filter(item => next.includes(item)))
        : arr.reduce((total, next) => [...new Set(total)].concat(next.filter(item => !total.includes(item))));
}
var a = [1, 2, 3, 5];
var b = [2, 4, 5, 1];
var c = [1, 3, 5];
const arr_test = [[1, 1, 3, 5, 7], [1, 1, 2, 3, 5, 7, 9], [1, 1, 10], [2, 1, 1]];
