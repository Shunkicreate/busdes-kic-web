import { mode } from '../types/main.type'
import { AddButton } from '../atom/AddButton'
import React from 'react'

const DisplayAddButton = ({currentMode}:{currentMode: mode}) => {
  if (currentMode == 'NextBus') {
      return (
          <div className='absolute bottom-20 right-0 p-5'>
              <AddButton></AddButton>
          </div>
      )
  }
  else {
      return (
          <></>
      )
  }
}

export default DisplayAddButton