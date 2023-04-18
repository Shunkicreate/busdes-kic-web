import { mode } from '../types/main.type'
import { TabbarButton } from '../atom/TabbarButton'
import React from 'react'
import DisplayAddButton from '../atom/DisplayAddButton'

export const Footer = ({ setMode, currentMode }: { setMode: React.Dispatch<React.SetStateAction<mode>>, currentMode: mode }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
        const state = { mode: mode }
        const unused = ''
        history.pushState(state, unused, `?mode=${mode}`)
    }
    return (
        <div className='w-full fixed pb-4 bottom-0 z-10'>
            <div className='relative'>
                <div className='grid grid-cols-2 gap-2 pt-4 pb-4 px-6 bg-white border-t'>
                    <TabbarButton mode='NextBus' currentMode={currentMode} switchMode={switchMode}></TabbarButton>
                    <TabbarButton mode='TimeTable' currentMode={currentMode} switchMode={switchMode}></TabbarButton>
                </div>
                <DisplayAddButton currentMode={currentMode}></DisplayAddButton>
            </div>
        </div>
    )
}

