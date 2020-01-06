/*
 * @Author: your name
 * @Date: 2020-01-06 10:07:27
 * @LastEditTime: 2020-01-06 14:54:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/tools/findAllTags.ts
 */

interface IParam{
    tags:HTMLAllCollection
}
class getAllTags implements IParam{
    public tagObj:{[key:string]:number}={};
    public tags:HTMLAllCollection;
    constructor(tags:HTMLAllCollection){
        this.tags=tags
    }

    private countTag(){
        // this.tags.forEach(()=>{

        // })
    }
    
}