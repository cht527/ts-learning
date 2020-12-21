/*
 * @Author: Cao Haitao
 */

import * as _ from 'lodash';
const test = () => {
    _.before(2, () => { console.log(1); });
};
test();
