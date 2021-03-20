/*
 * @Author: your name
 * @Date: 2020-05-15 14:35:24
 * @LastEditTime: 2020-05-15 17:04:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/design.ts
 */
// 1、模板 模式
abstract class Beverage{
    public boilerWater(){
        console.log('boiler water')
    }

    abstract brew():void

    abstract pourInCup():void

    abstract drink():void

    make(){
        this.boilerWater()
        this.brew()
        this.pourInCup()
        this.drink()
    }
} 


class Coffee extends Beverage{
    name:string
    constructor(name:string){
        super()
        this.name=name
    }
    brew(){
        console.log('brew'+this.name)
    }

    pourInCup(){
        console.log('pourInCup'+this.name)
    }

    drink(){
        console.log('drink'+this.name)
    }
}

const makeCoffee=new Coffee('long black')

makeCoffee.make();