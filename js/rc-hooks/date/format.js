import { getDateLocale } from './locale';
import { CONVERTER_MAP, tokenizer } from './convert';
function createEmptyFormat(token) {
    return () => token;
}
export function formatDate(date, format, locale) {
    const tokens = tokenizer(format);
    const matched = tokens.map(token => {
        const fn = CONVERTER_MAP[token] ? CONVERTER_MAP[token].formatToken : createEmptyFormat(token);
        return fn(date, getDateLocale(locale));
    });
    return matched.join('');
}
export function formatDateArr(dateList, format, locale) {
    return dateList.map(item => {
        if (typeof item === 'string') {
            return item;
        }
        return formatDate(item, format, locale);
    });
}
