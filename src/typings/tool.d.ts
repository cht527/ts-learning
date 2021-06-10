
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

// const foo = (): Promise<string> => {
//     return new Promise((resolve,reject)=> {
//         resolve('')
//     })
// }

// type fooReturnType = ReturnType<typeof foo>;

// type fooResType = PromiseType<fooReturnType>;

