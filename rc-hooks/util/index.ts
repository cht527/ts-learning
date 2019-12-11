/**
 * @file util 工具函数
 * @author Yu Zong(liuxuanzy@qq.com)
 */

import {FunctionAny, FunctionParams} from '../types';

/**
 * 生成4位随机数
 */
function s4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成全局唯一标识符
 *
 * @return 返回一个guid
 */
export function guid(): string {
    return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}

const class2type: {[key: string]: string} = {};
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
export function type(obj: unknown): string {

    if (obj == null) {
        return String(obj);
    }

    if (typeof obj === 'object' || typeof obj === 'function') {
        return class2type[toString.call(obj)] || 'object';
    }

    return typeof obj;
}

// 用于判断是不是值类型的包装格式
const rvalue = /^(?:number|string|boolean|regexp)$/;

/**
 * 克隆一个朴素对象（不对宿主对象进行检测）
 *
 * @param obj 要clone的对象
 * @return 返回和原对象一样类型的对象
 */
export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 克隆一个复杂对象（不对宿主对象进行检测）
 *
 * @param obj 要克隆的对象
 * @return 返回克隆对象
 */
export function deepClone<T extends unknown>(obj: T): T {

    // 值类型、函数不需要进行复制
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }

    const t = type(obj);

    // number、string、boolean的包装类型和正则表达式直接返回对应的值
    if (rvalue.test(t)) {
        return (obj as number | string | boolean | RegExp).valueOf() as T;
    }

    // 日期不是只读的，需要重新生成一个日期对象
    if (t === 'date') {
        return new Date((obj as Date).getTime()) as T;
    }

    // 处理一下error对象
    if (t === 'error') {
        return new Error((obj as Error).message) as T;
    }

    // 对于array/error/object需要进行一次遍历赋值
    const ret: {[key: string]: unknown} = {};

    if (t === 'array') {
        return (obj as unknown[]).map(item => deepClone(item)) as T;
    }

    Object.keys(obj as {[key: string]: unknown}).forEach(key => {
        ret[key] = deepClone((obj as {[key: string]: unknown})[key]);
    });

    return ret as T;
}

/**
 * 合并classnames成一个字符串
 *
 * @return 返回一个className字符串
 */
export function classnames(...classNames: Array<string | {[key: string]: boolean} | string[] | undefined>): string {

    const classes: string[] = [];

    for (const cls of classNames) {

        if (!cls) {
            continue;
        }

        if (typeof cls === 'string') {
            classes.push(cls);
        } else if (Array.isArray(cls)) {

            cls.forEach(item => {

                if (item) {
                    classes.push(item);
                }
            });
        } else if (typeof cls === 'object' && cls) {

            Object.keys(cls).forEach(key => {

                if (cls[key]) {
                    classes.push(key);
                }
            });
        }
    }

    return classes.join(' ');
}

/**
 * 判断两个变量是否严格相同
 *
 * @param first 第一个变量
 * @param second 第二个变量
 * @return 返回对象是否相同
 */
export function equal(first: unknown, second: unknown): boolean {

    if (first === second) {
        return first !== 0 || second !== 0 || 1 / Number(first) === 1 / Number(second);
    }

    // eslint-disable-next-line no-self-compare
    return first !== first && second !== second;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 判断两个对象是否浅表相同
 *
 * @param first 第一个对象
 * @param second 第二个对象
 * @return 返回对象是否相同
 */
export function shallowEqual(first: unknown, second: unknown): boolean {

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
        && equal(
            (first as {[key: string]: unknown})[item],
            (second as {[key: string]: unknown})[item]
        ));
}

/**
 * 函数节流
 *
 * @param fn 要节流的函数
 * @param delay 节流时间间隔
 */
export function throttle<T extends FunctionAny>(fn: T, delay: number): (...args: FunctionParams<T>) => void {

    let timer: number | null = null;
    let remaining = 0;
    let previous = +new Date();

    return (...args: FunctionParams<T>): void => {

        const now = +new Date();

        remaining = now - previous;

        if (remaining >= delay) {

            if (timer) {
                window.clearTimeout(timer);
            }

            fn.apply(null, args);
            previous = now;
        } else if (!timer) {
            timer = window.setTimeout(() => {
                fn.apply(null, args);
                previous = +new Date();
            }, delay - remaining);
        }
    };
}

/**
 * 生成一个tuple类型数组
 *
 * @param args
 */
export function tuple<T extends string[]>(...args: T): T {
    return args;
}

/**
 * 拾取对象属性，并返回需要的和剩余的属性
 *
 * @param obj 要处理的对象
 * @param keys 要拾取的key
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): [Pick<T, K>, Omit<T, K>] {

    const map = keys.reduce<{[key: string]: boolean}>((m, key) => {
        m[key as string] = true;
        return m;
    }, {});

    const rest: {[key: string]: unknown} = {};
    const picked: {[key: string]: unknown} = {};

    Object.keys(obj).forEach(key => {
        if (map[key]) {
            picked[key] = obj[key as keyof T];
        } else {
            rest[key] = obj[key as keyof T];
        }
    });

    return [picked as Pick<T, K>, rest as Omit<T, K>];
}

export const UNIQUE_KEY_REF = Symbol('unique_key_ref');

/**
 * 获取对象的唯一key，对于两个调用equal函数返回相同的对象来说，一定反回相同的字符串，不同的对象一定不同
 *
 * @param obj 要获取的对象
 * @return 返回一个key的字符串
 */
export function getUniqueKey(obj: unknown): string {

    if (typeof obj !== 'function' && typeof obj !== 'object') {
        return `${typeof obj} - ${String(obj)}`;
    }

    if (obj == null) {
        return String(obj) + ' - ' + String(null);
    }

    const map = obj as {[UNIQUE_KEY_REF]: string};

    if (UNIQUE_KEY_REF in map) {
        return map[UNIQUE_KEY_REF];
    }

    const id = `${typeof obj} - ${guid()}`;

    Object.defineProperty(obj, UNIQUE_KEY_REF, {
        value: id,
        writable: false,
        enumerable: false,
        configurable: false
    });

    return id;
}

// 判断一个对象是否是一个函数
export function isFunction(fun: unknown): fun is Function {
    return typeof fun === 'function';
}

// 判断一个对象是否是一个函数
export function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}


/**
 * 将字符串或者数组转变成值为true的列表
 *
 * @param str 要产生对象的字符串或者数组
 * @param splitChar 分隔符
 */
export function keyMirror(
    str: string | number | Array<string | number>,
    splitChar: string = ''
): {[key: string]: string} {

    if (typeof (str) === 'number') {
        str = String(str);
    }

    if (typeof str === 'string') {
        str = str.split(splitChar);
    }

    return str.reduce((map: {[key: string]: string}, char) => {
        map[String(char)] = String(char);
        return map;
    }, {});
}

/**
 * 根据一组key从一个对象中获取属性
 *
 * @param obj 要获取的对象
 * @param keys 键数组
 * @param index 开始索引
 */
export function getObjectProperty(obj: unknown, keys: Array<string | number> = [], index: number = 0): unknown {

    if (obj == null) {
        return null;
    }

    for (let i = index; i < keys.length; i++) {

        obj = (obj as {[key: string]: unknown})[keys[i]];

        if (obj == null) {
            return null;
        }
    }

    return obj;
}

/**
 * 根据一组key在一个对象设置属性
 *
 * @param obj 要获取的对象
 * @param value 要设置的值
 * @param keys 键数组
 * @param index 开始索引
 */
export function setObjectProperty(
    obj: unknown,
    value: unknown,
    keys: Array<string | number>,
    index: number = 0
): boolean {

    if (obj == null || typeof obj !== 'object') {
        return false;
    }

    // 找到倒数第一层
    for (let i = index; i < keys.length - 1; i++) {

        obj = (obj as {[key: string]: unknown})[keys[i]];

        if (obj == null || typeof obj !== 'object') {
            return false;
        }
    }

    (obj as {[key: string]: unknown})[keys[keys.length - 1]] = value;

    return true;
}

export function padding(str: string, len: 1 | 2 | 3 | 4, padStr: string = '0'): string {
    let pad = '';

    for (let i = 0; i < 4; i++) {
        pad += padStr;
    }

    return (pad + str).slice(-len);
}

/**
 * 获取对象的属性名数组
 *
 * @param obj 要获取的对象
 */
export function getKeys<T>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

export function camelCase(str: string, prefix: string = '-'): string {
    return str.replace(
        new RegExp('[' + prefix + ']' + '(.)', 'gi'),
        (all, letter) => letter.toUpperCase());
}

export function pascalCase(str: string, prefix: string = '-'): string {
    str = camelCase(str, prefix);
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

/**
 * 属性驼峰化
 *
 * @param target 目标字符串
 * @return 返回转换后的字符串
 */
export function camelize(target: string): string {
    return camelCase(target, '-');
}

/**
 * 判断对象是否是window对象
 * @param obj
 * @return 返回是否是window对象
 */
export function isWindow(obj: unknown): obj is Window {
    return obj != null && (obj as Window).window === window;
}

export function uniqueString(arr: Array<string | number>): string[] {
    const obj: Record<string, boolean> = {};
    arr.forEach(key => obj[key] = true);
    return Object.keys(obj);
}

export function uniqueNumber(arr: number[]): number[] {
    return uniqueString(arr).map(item => Number(item));
}

export function shallowMerge<T, U>(source1: T, source2: U): T & U {

    const res: {[key: string]: unknown} = {};

    [source1, source2].forEach((item: T | U) => {
        getKeys(item).forEach(key => {
            const value = item[key];

            if (value === undefined) {
                return;
            }

            res[key as string] = value;
        });
    });

    return res as unknown as T & U;
}

export function shallowArray<T>(first: T[], second: T[], compareFn?: (a: T, b: T) => number): boolean {
    if (first.length !== second.length) {
        return false;
    }

    return shallowEqual(first.sort(compareFn), second.sort(compareFn));
}
