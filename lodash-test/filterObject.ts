/*
 * @Author: Cao Haitao
 */
import * as _ from 'lodash';

function filterObject(object:{[key:string]:any}, func:(...args:any[])=>any) {
    object = Object(object)
    const result = []
  
    Object.keys(object).forEach((key) => {
      const value = object[key]
      if (func(value, key, object)) {
        result.push(value)
      }
    })
    return result
  }
  