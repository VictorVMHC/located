import React, { useState } from 'react';

export const useHeartHook = (value: boolean) => {
    const [isActive, setActive] = useState(value)

    const check = ( )  =>{
      if(isActive)
      {
        setActive(false)
      }
      else
      {
        setActive(true)
      }
    }

  return {
    isActive,
    check
  }
}
