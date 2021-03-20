import { from } from "rxjs";
import React ,{useEffect, useRef} from 'react';

export default function useDom(id:string){
    const nodeRef = useRef<HTMLElement|null>(null);
    useEffect(()=>{
        nodeRef.current = document.getElementById(id);
    },[])
    return nodeRef.current
}