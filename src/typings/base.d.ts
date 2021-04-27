interface MapKV<T> {
    [key: string]: T | MapKV<T>;
}