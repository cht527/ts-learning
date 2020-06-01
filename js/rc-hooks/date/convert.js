/**
 * @file convert 日期转换
 */
import { padding } from '../util/index';
const TOKEN_REG = /(YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|H|hh|h|A|a|mm|m|ss|s|SSS|QQ|Q|WW|W|dddd|ddd|dd|d|.)/g;
export function tokenizer(format) {
    const result = [];
    let matched = TOKEN_REG.exec(format);
    while (matched != null) {
        result.push(matched[0]);
        matched = TOKEN_REG.exec(format);
    }
    return result;
}
export const CONVERTER_MAP = {};
function defaultConverter(num) {
    return num;
}
export function createNumberConverter(options) {
    const { maxLength, field, getter, format, paddingFormat, converter = defaultConverter } = options;
    if (format != null) {
        CONVERTER_MAP[format] = {
            formatToken(date, locale) {
                return String(getter(date, locale));
            },
            matchToken(str) {
                const reg = new RegExp(`^(\\d{1,${maxLength}})`);
                if (reg.test(str)) {
                    return RegExp.$1;
                }
                return false;
            },
            parseToken(str) {
                if (field == null) {
                    return {};
                }
                return { [field]: converter(parseInt(str, 10), format) };
            }
        };
    }
    if (paddingFormat != null) {
        CONVERTER_MAP[paddingFormat] = {
            formatToken(date, locale) {
                return padding(String(getter(date, locale)), maxLength);
            },
            matchToken(str) {
                const reg = new RegExp(`^(\\d{${maxLength}})`);
                if (reg.test(str)) {
                    return RegExp.$1;
                }
                return false;
            },
            parseToken(str) {
                if (field == null) {
                    return {};
                }
                return { [field]: converter(parseInt(str, 10), paddingFormat) };
            }
        };
    }
}
export function createEnumConverter(options) {
    const { format, field, getter, localeKey } = options;
    CONVERTER_MAP[format] = {
        formatToken(date, locale) {
            return locale[localeKey][getter(date)];
        },
        matchToken(str, locale) {
            const reg = new RegExp('^(' + locale[localeKey].join('|') + ')');
            if (reg.test(str)) {
                return RegExp.$1;
            }
            return false;
        },
        parseToken(str, locale) {
            const index = locale[localeKey].indexOf(str);
            if (field == null) {
                return {};
            }
            return { [field]: index };
        }
    };
}
