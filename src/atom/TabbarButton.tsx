import { mode } from '../types/main.type'
import React from 'react'
export const TabbarButton = ({ mode, modeName, color, switchMode }: { mode: mode, modeName: string, color: string, switchMode: (prm: mode) => void }) => {
    return (
        <div className='px-5 pt-2 text-1xl text-center'>
            <button onClick={() => { switchMode(mode); }} className={`${color} w-12 h-12 rounded-full`}></button>
            <p>{modeName}</p>
        </div>
    )
}