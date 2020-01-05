"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 生成4位随机数
 */
function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
/**
 * 生成全局唯一标识符
 *
 * @return 返回一个guid
 */
function guid() {
    return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}
exports.guid = guid;
const class2type = {};
const toString = Object.prototype.toString;
'Boolean Number String Function Array Date RegExp Object Error'.replace(/\w+/g, name => {
    class2type['[object ' + name + ']'] = name.toLowerCase();
    return name;
});
/**
 * 获取变量的类型
 *
 * @param obj 要检查的变量
 * @return 类型字符串，对于对象化的内置类型的也返回其原始类型
 */
function type(obj) {
    if (obj == null) {
        return String(obj);
    }
    if (typeof obj === 'object' || typeof obj === 'function') {
        return class2type[toString.call(obj)] || 'object';
    }
    return typeof obj;
}
exports.type = type;
// 用于判断是不是值类型的包装格式
const rvalue = /^(?:number|string|boolean|regexp)$/;
/**
 * 克隆一个朴素对象（不对宿主对象进行检测）
 *
 * @param obj 要clone的对象
 * @return 返回和原对象一样类型的对象
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.clone = clone;
/**
 * 克隆一个复杂对象（不对宿主对象进行检测）
 *
 * @param obj 要克隆的对象
 * @return 返回克隆对象
 */
function deepClone(obj) {
    // 值类型、函数不需要进行复制
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    const t = type(obj);
    // number、string、boolean的包装类型和正则表达式直接返回对应的值
    if (rvalue.test(t)) {
        return obj.valueOf();
    }
    // 日期不是只读的，需要重新生成一个日期对象
    if (t === 'date') {
        return new Date(obj.getTime());
    }
    // 处理一下error对象
    if (t === 'error') {
        return new Error(obj.message);
    }
    // 对于array/error/object需要进行一次遍历赋值
    const ret = {};
    if (t === 'array') {
        return obj.map(item => deepClone(item));
    }
    Object.keys(obj).forEach(key => {
        ret[key] = deepClone(obj[key]);
    });
    return ret;
}
exports.deepClone = deepClone;
/**
 * 合并classnames成一个字符串
 *
 * @return 返回一个className字符串
 */
function classnames(...classNames) {
    const classes = [];
    for (const cls of classNames) {
        if (!cls) {
            continue;
        }
        if (typeof cls === 'string') {
            classes.push(cls);
        }
        else if (Array.isArray(cls)) {
            cls.forEach(item => {
                if (item) {
                    classes.push(item);
                }
            });
        }
        else if (typeof cls === 'object' && cls) {
            Object.keys(cls).forEach(key => {
                if (cls[key]) {
                    classes.push(key);
                }
            });
        }
    }
    return classes.join(' ');
}
exports.classnames = classnames;
/**
 * 判断两个变量是否严格相同
 *
 * @param first 第一个变量
 * @param second 第二个变量
 * @return 返回对象是否相同
 */
function equal(first, second) {
    if (first === second) {
        return first !== 0 || second !== 0 || 1 / Number(first) === 1 / Number(second);
    }
    // eslint-disable-next-line no-self-compare
    return first !== first && second !== second;
}
exports.equal = equal;
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * 判断两个对象是否浅表相同
 *
 * @param first 第一个对象
 * @param second 第二个对象
 * @return 返回对象是否相同
 */
function shallowEqual(first, second) {
    if (equal(first, second)) {
        return true;
    }
    if (typeof first !== 'object' || typeof second !== 'object') {
        return false;
    }
    if (first == null || second == null) {
        return false;
    }
    const firstKeys = Object.keys(first);
    const secondKeys = Object.keys(second);
    if (firstKeys.length !== secondKeys.length) {
        return false;
    }
    return firstKeys.every(item => hasOwnProperty.call(second, item)
        && equal(first[item], second[item]));
}
exports.shallowEqual = shallowEqual;
/**
 * 函数节流
 *
 * @param fn 要节流的函数
 * @param delay 节流时间间隔
 */
function throttle(fn, delay) {
    let timer = null;
    let remaining = 0;
    let previous = +new Date();
    return (...args) => {
        const now = +new Date();
        remaining = now - previous;
        if (remaining >= delay) {
            if (timer) {
                window.clearTimeout(timer);
            }
            fn.apply(null, args);
            previous = now;
        }
        else if (!timer) {
            timer = window.setTimeout(() => {
                fn.apply(null, args);
                previous = +new Date();
            }, delay - remaining);
        }
    };
}
exports.throttle = throttle;
/**
 * 生成一个tuple类型数组
 *
 * @param args
 */
function tuple(...args) {
    return args;
}
exports.tuple = tuple;
/**
 * 拾取对象属性，并返回需要的和剩余的属性
 *
 * @param obj 要处理的对象
 * @param keys 要拾取的key
 */
function pick(obj, keys) {
    const map = keys.reduce((m, key) => {
        m[key] = true;
        return m;
    }, {});
    const rest = {};
    const picked = {};
    Object.keys(obj).forEach(key => {
        if (map[key]) {
            picked[key] = obj[key];
        }
        else {
            rest[key] = obj[key];
        }
    });
    return [picked, rest];
}
exports.pick = pick;
exports.UNIQUE_KEY_REF = Symbol('unique_key_ref');
/**
 * 获取对象的唯一key，对于两个调用equal函数返回相同的对象来说，一定反回相同的字符串，不同的对象一定不同
 *
 * @param obj 要获取的对象
 * @return 返回一个key的字符串
 */
function getUniqueKey(obj) {
    if (typeof obj !== 'function' && typeof obj !== 'object') {
        return `${typeof obj} - ${String(obj)}`;
    }
    if (obj == null) {
        return String(obj) + ' - ' + String(null);
    }
    const map = obj;
    if (exports.UNIQUE_KEY_REF in map) {
        return map[exports.UNIQUE_KEY_REF];
    }
    const id = `${typeof obj} - ${guid()}`;
    Object.defineProperty(obj, exports.UNIQUE_KEY_REF, {
        value: id,
        writable: false,
        enumerable: false,
        configurable: false
    });
    return id;
}
exports.getUniqueKey = getUniqueKey;
// 判断一个对象是否是一个函数
function isFunction(fun) {
    return typeof fun === 'function';
}
exports.isFunction = isFunction;
// 判断一个对象是否是一个函数
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
/**
 * 将字符串或者数组转变成值为true的列表
 *
 * @param str 要产生对象的字符串或者数组
 * @param splitChar 分隔符
 */
function keyMirror(str, splitChar = '') {
    if (typeof (str) === 'number') {
        str = String(str);
    }
    if (typeof str === 'string') {
        str = str.split(splitChar);
    }
    return str.reduce((map, char) => {
        map[String(char)] = String(char);
        return map;
    }, {});
}
exports.keyMirror = keyMirror;
/**
 * 根据一组key从一个对象中获取属性
 *
 * @param obj 要获取的对象
 * @param keys 键数组
 * @param index 开始索引
 */
function getObjectProperty(obj, keys = [], index = 0) {
    if (obj == null) {
        return null;
    }
    for (let i = index; i < keys.length; i++) {
        obj = obj[keys[i]];
        if (obj == null) {
            return null;
        }
    }
    return obj;
}
exports.getObjectProperty = getObjectProperty;
/**
 * 根据一组key在一个对象设置属性
 *
 * @param obj 要获取的对象
 * @param value 要设置的值
 * @param keys 键数组
 * @param index 开始索引
 */
function setObjectProperty(obj, value, keys, index = 0) {
    if (obj == null || typeof obj !== 'object') {
        return false;
    }
    // 找到倒数第一层
    for (let i = index; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
        if (obj == null || typeof obj !== 'object') {
            return false;
        }
    }
    obj[keys[keys.length - 1]] = value;
    return true;
}
exports.setObjectProperty = setObjectProperty;
function padding(str, len, padStr = '0') {
    let pad = '';
    for (let i = 0; i < 4; i++) {
        pad += padStr;
    }
    return (pad + str).slice(-len);
}
exports.padding = padding;
/**
 * 获取对象的属性名数组
 *
 * @param obj 要获取的对象
 */
function getKeys(obj) {
    return Object.keys(obj);
}
exports.getKeys = getKeys;
function camelCase(str, prefix = '-') {
    return str.replace(new RegExp('[' + prefix + ']' + '(.)', 'gi'), (all, letter) => letter.toUpperCase());
}
exports.camelCase = camelCase;
function pascalCase(str, prefix = '-') {
    str = camelCase(str, prefix);
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}
exports.pascalCase = pascalCase;
/**
 * 属性驼峰化
 *
 * @param target 目标字符串
 * @return 返回转换后的字符串
 */
function camelize(target) {
    return camelCase(target, '-');
}
exports.camelize = camelize;
/**
 * 判断对象是否是window对象
 * @param obj
 * @return 返回是否是window对象
 */
function isWindow(obj) {
    return obj != null && obj.window === window;
}
exports.isWindow = isWindow;
function uniqueString(arr) {
    const obj = {};
    arr.forEach(key => obj[key] = true);
    return Object.keys(obj);
}
exports.uniqueString = uniqueString;
function uniqueNumber(arr) {
    return uniqueString(arr).map(item => Number(item));
}
exports.uniqueNumber = uniqueNumber;
function shallowMerge(source1, source2) {
    const res = {};
    [source1, source2].forEach((item) => {
        getKeys(item).forEach(key => {
            const value = item[key];
            if (value === undefined) {
                return;
            }
            res[key] = value;
        });
    });
    return res;
}
exports.shallowMerge = shallowMerge;
function shallowArray(first, second, compareFn) {
    if (first.length !== second.length) {
        return false;
    }
    return shallowEqual(first.sort(compareFn), second.sort(compareFn));
}
exports.shallowArray = shallowArray;
