/*
 * @Author: your name
 * @Date: 2020-01-07 10:35:32
 * @LastEditTime : 2020-01-07 11:33:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/js/tools/redPackage.ts
 */

export class RedPackage{
    private num:number;
    private money:number;
    private remain:number=0;
    private result:number[]=[];
    private MIN:number=0.01;
    constructor(num:number,money:number){
        this.num=num;
        this.money=money;
    }    

    init(){
        this.remain=this.money;
    }

    produce(max:number,n:number){
        const _max=max-(this.MIN*(n-1));
        return +(Math.random()*(_max-this.MIN)+this.MIN).toFixed(2);
    }

    create(){
        this.init();
        for (let i = 1; i <= this.num; i++) {
            if(i===this.num){
                this.result.push(+this.remain.toFixed(2));
            }else{
                let currentMoney=this.produce(this.remain,this.num-i);                
                this.remain=this.remain-currentMoney;
                this.result.push(currentMoney)
                
            }
        }
        return this.result
    }
}


const getRedPackage= new RedPackage(5,5);

console.log(getRedPackage.create());
