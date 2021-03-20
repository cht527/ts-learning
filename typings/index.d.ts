// 字面量数组类型，明确提示应使用长度为 3 且类型均为数字的数组，对于明确长度的数组定义我们不应该使用 number[] 这样的不定长度数组进行声明
export type RgbArray = [number, number, number]

// 对于对象类型，我们使用 interface 替代 type 声明，方便可能的扩展和继承
export interface RGB {
  r: number
  g: number
  b: number
}

export interface BlackWhite {
  black: string
  white: string
  threshold?: number
}


export type Color = string | RgbArray | RGB

export interface InvertColor {
  (color: Color, bw?: boolean | BlackWhite): string // interface 可以直接定义函数体
  asRGB(color: Color, bw?: boolean | BlackWhite): RGB
  asRgbArray(color: Color, bw?: boolean | BlackWhite): RgbArray
}

export const inve: InvertColor;


declare global{
  interface Array<T>{
    myMap<U>(callback:(value:T,index:number,array:T[])=>U,thisArg?:any):U[],
    myForEach(callback:(value:T,index:number,array:T[])=>void,thisArg?:any):void,
    myFilter<T>(callback:(value:T,index:number,array:T[])=>unknown,thisArg?:any):T[],
    myReduce(callback:(acc:T,value:T,index:number,array:T[])=>T,thisArg?:any):T,
    myReduce(callback:(acc:T,value:T,index:number,array:T[],initValue:T)=>T,thisArg?:any):T,
    myReduce<U>(callback:(acc:U,value:T,index:number,array:T[],initValue:U)=>U,thisArg?:any):U
  }
}