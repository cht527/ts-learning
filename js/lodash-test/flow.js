/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
import * as _ from 'lodash';
_.flow();
function flow(...func) {
    let len = func.length;
    let index = len - 1;
    while (index--) {
        if (typeof func[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return (...args) => {
        let idx = 0;
        let result = length ? func[index].apply(this, args) : args[0];
        while (++idx < length) {
            result = func[index].call(this, result);
        }
        return result;
    };
}
