import { mode } from "../types/main.type"
import { TabbarButton } from "../atom/TabbarButton"
// import React from "react"
import React, { useState } from 'react';

export const Footer = ({ setMode,currentMode }: { setMode: React.Dispatch<React.SetStateAction<mode>>, currentMode:mode }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    const color = (mode:mode,currentMode:mode) => {
        if(mode===currentMode){
            return 'bg-yellow-300'
        }
        else{
            return 'bg-gray-100'
        }
    }

    return (
        <div className="">
            <div className="flex justify-center">
                {/* { setMode } */}
                {/* <div>
                    <button className="bg-gray-300 hover:bg-gray-200 text-white rounded px-4 py-2">Gray 300</button>
                    <button onClick={() => { switchMode("TimeTable") }}>時刻表</button>
                </div>
                <div>
                    <button onClick={() => { switchMode("NextBus") }}>次のバス</button>
                </div>
                <div>
                    <button onClick={() => { switchMode("Settings") }}>設定</button>
                </div> */}
                <TabbarButton mode="TimeTable" modeName="時刻表" color={color("TimeTable",currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode="NextBus" modeName="次のバス" color={color("NextBus",currentMode)} switchMode={switchMode}></TabbarButton>
                <TabbarButton mode="Settings" modeName="設定" color={color("Settings",currentMode)} switchMode={switchMode}></TabbarButton>
            </div>

        </div>
    )
}