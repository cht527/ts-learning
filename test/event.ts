/*
 * @Author: your name
 * @Date: 2020-05-15 10:51:40
 * @LastEditTime: 2020-05-15 14:32:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/event.ts
 */


 const myEvent=new Event('firstEvent',{bubbles:false,cancelable:false,composed:false});

 interface ISelfInfo{
     name:string;
     age:number;
     getAge:()=>number
 }
 const info:ISelfInfo={
    name:'jhon',
    age:1,
    getAge(){
        return 1
    }

 }
 const myCustomEvent = new CustomEvent<ISelfInfo>('custom',{
    detail:info,
    bubbles:false,
    cancelable:false,
    composed:false
})



 const box=document.getElementById('box');

 const span=document.getElementById('span');
 if(box && span){
    window.addEventListener('custom',(e:CustomEventInit)=>{
        alert(e.detail.age)
    })
    box.addEventListener('firstEvent',(e)=>{
        window.dispatchEvent(myCustomEvent);
       // alert(box.innerHTML)
    })
    box.addEventListener('click',(e)=>{
        box.dispatchEvent(myEvent)
    })
    
 }


 