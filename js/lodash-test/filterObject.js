function filterObject(object, func) {
    object = Object(object);
    const result = [];
    Object.keys(object).forEach((key) => {
        const value = object[key];
        if (func(value, key, object)) {
            result.push(value);
        }
    });
    return result;
}
export {};
