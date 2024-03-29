import { useEffect, useState } from 'react'

const prefix='CHAT-APP-'

export default function useLocalStorage(key,initialValue) {
  
    const prefixedKey = prefix + key;
    const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      if (jsonValue === "undefined") {
        return null;
      } else {
        return JSON.parse(jsonValue);
      }
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });


   useEffect(()=>{
     if(value!=="undefined")
     localStorage.setItem(prefixedKey,JSON.stringify(value))
   },[prefixedKey,value])


   return [value,setValue]
}
