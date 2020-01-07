/*
 * @Author: your name
 * @Date: 2020-01-07 10:35:32
 * @LastEditTime : 2020-01-07 11:16:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/js/tools/redPackage.ts
 */

class RedPackage{
    private num:number;
    private money:number;
    private remain:number=0;
    private result:number[]=[];
    private MIN:number=0.01;
    private MAX:number=0;

    constructor(num:number,money:number){
        this.num=num;
        this.money=money;
    }    

    init(){
        this.MAX=this.money-(this.num-1)*this.MIN;
        this.remain=this.money;
    }

    produce(){
        return +(Math.random()*(this.MAX-this.MIN)+this.MIN).toFixed(2);
    }

    create(){
        this.init();
        for (let i = 0; i < this.num; i++) {
            if(i===this.num-1){
                this.result.push(+this.remain.toFixed(2));
            }else{
                let currentMoney=this.produce();                
                if(this.remain-currentMoney < this.MIN){
                    i--
                }else{
                    this.remain=this.remain-currentMoney;
                    this.result.push(currentMoney)
                }
            }
        }
        return this.result
    }
}


const getRedPackage= new RedPackage(10,5);

console.log(getRedPackage.create());
