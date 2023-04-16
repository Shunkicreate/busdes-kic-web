import { mode } from '../types/main.type'
import React from 'react'
import timetableWhite from '../images/timetableWhite.svg'
import timetableGray from '../images/timetableGray.svg'
import timerWhite from '../images/timerWhite.svg'
import timerGray from '../images/timerGray.svg'
export const TabbarButton = ({ mode, currentMode, switchMode }: { mode: mode, currentMode: mode, switchMode: (prm: mode) => void }) => {
    const color = (mode: mode, currentMode: mode) => {
        if (mode === currentMode) {
            return 'bg-main text-white'
        }
        else {
            return 'bg-bgColor'
        }
    }
    const selectIcon = (mode: mode, currentMode: mode) => {
        if (mode === 'TimeTable') {
            if (mode == currentMode) {
                return timetableWhite;
            }
            else {
                return timetableGray;
            }
        }
        else {
            if (mode == currentMode) {
                return timerWhite;
            }
            else {
                return timerGray;
            }
        }
    }
    return (
        <div>
            <div className='text-base justify-center'>
                <button onClick={() => { switchMode(mode); }} className={`${color(mode, currentMode)} font-medium w-full h-12 rounded-full grid grid-cols-4 px-6 py-2`}>
                    <img className="col-span-1 h-6 object-contain m-auto" src={selectIcon(mode, currentMode)} alt="" />
                    <div className="col-span-3 w-full h-full flex px-2">
                        <div className='m-auto'>{mode}</div>
                    </div>
                </button>
            </div>
        </div>
    )
}