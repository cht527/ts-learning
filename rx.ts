import {fromEvent} from 'rxjs';

const box =  <HTMLDivElement>document.getElementById('box');

fromEvent(box,'click').subscribe(()=>alert('click'))