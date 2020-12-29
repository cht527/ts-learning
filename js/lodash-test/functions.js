"use strict";
/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */
function functions(object) {
    if (object === null) {
        return [];
    }
    return Object.keys(object).filter(key => typeof object[key] === 'function');
}
class PersonC {
    constructor(name) {
        this.getName = () => this.name;
        this.name = name;
    }
    getNameMethod() {
        return this.name;
    }
}
console.log(functions(new PersonC('name')));
