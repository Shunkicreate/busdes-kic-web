import { mode } from '../types/main.type'
import { TabbarButton } from '../atom/TabbarButton'
import React from 'react'
import DisplayAddButton from '../atom/DisplayAddButton'
// import timer from '../images/timer.svg'
// import timetable from '../images/timetable.svg'

export const Footer = ({ setMode, currentMode }: { setMode: React.Dispatch<React.SetStateAction<mode>>, currentMode: mode }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    return (
        <div className='w-full fixed bottom-0 z-10'>
            <div className='relative'>
                <div className='grid grid-cols-2 gap-2 pt-4 pb-4 px-6 bg-white border-t'>
                    <TabbarButton mode='NextBus' currentMode={currentMode} switchMode={switchMode}></TabbarButton>
                    <TabbarButton mode='TimeTable' currentMode={currentMode} switchMode={switchMode}></TabbarButton>
                    {/* <TabbarButton mode='NextBus' modeName='NextBus' img={timer} color={color('NextBus', currentMode)} switchMode={switchMode}></TabbarButton>
                    <TabbarButton mode='TimeTable' modeName='Timetable' img={timetable} color={color('TimeTable', currentMode)} switchMode={switchMode}></TabbarButton> */}
                </div>
                <DisplayAddButton currentMode={currentMode}></DisplayAddButton>
            </div>
        </div>
    )
}

