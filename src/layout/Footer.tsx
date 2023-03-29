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
            return 'bg-main'
        }
        else {
            return 'bg-bgColor'
        }
    }

    const DisplayAddButton = () => {
        if (currentMode == 'NextBus') {
            return (
                <div className='fixed bottom-24 right-0 p-5'>
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

    return (
        <div>
            <DisplayAddButton></DisplayAddButton>
            <div className='fixed bottom-0 w-full grid grid-cols-3 gap-2 pt-3 pb-6 px-10 bg-white z-50'>
                <TabbarButton mode='TimeTable' modeName='時刻表' color={color('TimeTable', currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode='NextBus' modeName='次のバス' color={color('NextBus', currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode='Settings' modeName='設定' color={color('Settings', currentMode)} switchMode={switchMode}></TabbarButton>
            </div>
        </div>
    )
}

