import { mode } from '../types/main.type'
import React from 'react'
export const TabbarButton = ({ mode, modeName, color, switchMode }: { mode: mode, modeName: string, color: string, switchMode: (prm: mode) => void }) => {
    return (
        <div className='text-1xl text-center'>
            <button onClick={() => { switchMode(mode); }} className={`${color} font-medium w-40 h-12 rounded-full`}>{modeName}</button>
            {/* <p className='text-xs'>{modeName}</p> */}
        </div>
    )
}