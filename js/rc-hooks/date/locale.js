/*
 * @Author: your name
 * @Date: 2020-05-27 19:59:35
 * @LastEditTime: 2020-06-01 17:59:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/date/locale.ts
 */
/**
 * @file locale 本地语言
 */
let DEFAULT_DATE_LOCALE = null;
export function setDefaultDateLocale(locale) {
    DEFAULT_DATE_LOCALE = locale;
}
export function getDateLocale(locale) {
    if (locale != null) {
        return locale;
    }
    if (DEFAULT_DATE_LOCALE != null) {
        return DEFAULT_DATE_LOCALE;
    }
    throw new Error('you must provide `locale` param, or call `setDefaultDateLocale` first');
}
