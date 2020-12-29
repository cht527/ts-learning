/*
 * @Author: Cao Haitao
 */
/*
 * @Author: Cao Haitao
 */


function functions(object:any) : string[] {
   if(object === null){
        return []
   }

   return Object.keys(object).filter(key=> typeof object[key] === 'function')
}

class PersonC{
    name:string;
    getName:()=> string = ()=>this.name
    constructor(name:string){
        this.name = name
    }

    getNameMethod(){
        return this.name 
    }
    
}

console.log(functions(new PersonC('name')))
