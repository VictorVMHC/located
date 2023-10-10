import React, { useState } from 'react';
import {createLikeLocal, deleteLikeLocal} from '../Api/likesApi'

export const useHeartHook = (value: boolean,) => {
    const [isActive, setActive] = useState(value)

    const check = async (userId: string, localId: string)  =>{
      if(isActive)
      {
        deleteLikeLocal(userId,localId);
        setActive(false); 
      }
      else
      {
        const likeLocal = await createLikeLocal({ userId: userId, localId: localId }); 
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
