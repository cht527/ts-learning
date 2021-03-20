import { fromEvent } from 'rxjs';
const box = document.getElementById('box');
fromEvent(box, 'click').subscribe(() => alert('click'));
