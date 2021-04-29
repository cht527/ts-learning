export interface MapKV<T> {
    [key: string]: T | MapKV<T>;
}

// PowerPartial -- 多层
export type PowerPartial<T> = {
    // 如果是 object，则递归类型
   [U in keyof T]?: T[U] extends object
     ? PowerPartial<T[U]>
     : T[U]
};

export declare type UnionOmit<T, K> = T & Omit<K, keyof T>;


export type Without<T> = { [P in keyof T]?: undefined };

// 异或
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T);

