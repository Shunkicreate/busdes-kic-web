import { mode } from '../types/main.type'
import { TabbarButton } from '../atom/TabbarButton'
import React from 'react'


import { AddButton } from '../atom/AddButton'

export const Footer = ({ setMode, currentMode }: { setMode: React.Dispatch<React.SetStateAction<mode>>, currentMode: mode }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    const color = (mode: mode, currentMode: mode) => {
        if (mode === currentMode) {
            return 'bg-yellow-300'
        }
        else {
            return 'bg-gray-100'
        }
    }

    return (
        <div>
            <div className='flex justify-center bg-white'>
                <TabbarButton mode='TimeTable' modeName='時刻表' color={color('TimeTable', currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode='NextBus' modeName='次のバス' color={color('NextBus', currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode='Settings' modeName='設定' color={color('Settings', currentMode)} switchMode={switchMode}></TabbarButton>
                <AddButton></AddButton>
            </div>
        </div>
    )
}