"use strict";
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
// import * as _ from 'lodash'
// _.over
function over(funcs) {
    return function (...params) {
        return funcs.map(functor => functor.apply(this, params));
    };
}
const getMaxMin = over([Math.max, Math.min]);
console.log(getMaxMin(1, 2, 3, 4));
