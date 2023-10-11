import React, { useState } from 'react';
import {createLikeLocal, deleteLikeLocal} from '../Api/likesLocalsApi'

export const useHeartHook = (value: boolean,) => {
    const [isActive, setActive] = useState(value)

    const check = async (localId: string)  =>{
    
      if(isActive)
      {
        deleteLikeLocal(localId);
        setActive(false); 
      }
      else
      {
        const likeLocal = await createLikeLocal(localId); 
        if(likeLocal.status === 200){
          setActive(true)
        }
      }
    }

  return {
    isActive,
    setActive,
    check
  }
}
