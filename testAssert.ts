import {typeAssert, IsTypeEqual} from './typeassert';


type TRequired<T>={
    [P in keyof T]-?:T[P] // TIP: 全部必选
}

interface OBJ{
    a:1,
    b:''
}
const bool_result = typeAssert<IsTypeEqual<TRequired<OBJ>,Required<OBJ>>>()