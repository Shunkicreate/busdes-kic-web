import { mode } from '../types/main.type'
import { TabbarButton } from '../atom/TabbarButton'
import React from 'react'

export const Footer = ({ setMode, currentMode }: { setMode: React.Dispatch<React.SetStateAction<mode>>, currentMode: mode }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    const color = (mode: mode, currentMode: mode) => {
        if (mode === currentMode) {
            return 'bg-main text-white'
        }
        else {
            return 'bg-bgColor'
        }
    }

    return (
        <div className='sticky bottom-0 w-full grid grid-cols-2 gap-4 pt-4 pb-4 px-8 bg-white z-50 border-t'>
            <TabbarButton mode='NextBus' modeName='NextBus' color={color('NextBus', currentMode)} switchMode={switchMode}></TabbarButton>
            <TabbarButton mode='TimeTable' modeName='Timetable' color={color('TimeTable', currentMode)} switchMode={switchMode}></TabbarButton>
        </div>
    )
}

