
type TRequired<T>={
    [P in keyof T]-?:T[P] // TIP: 全部必选
}

interface OBJ{
    a:1,
    b:''
}

