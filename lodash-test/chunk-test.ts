/*
 * @Author: Cao Haitao
 */
function chunk<T>(arr:T[],size:number):T[][] {
    if(Array.isArray(arr) && size>=0){
        const len = arr.length;
        if(len === 0){
            return [arr]
        }
        let resIndex=0
        let index=0;
        const result = new Array(Math.ceil(arr.length/size));
        while(index < len){
            result[resIndex++] = arr.slice(index,index+=size)
        }
        return result
    }else{
        return [arr]
    }
}

console.log(chunk(['a', 'b', 'c', 'd','3'], 2));
 
