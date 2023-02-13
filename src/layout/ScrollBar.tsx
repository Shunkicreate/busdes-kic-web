import React from "react"
import { useState } from 'react'

export const ScrollBar = ({ stationName }: { stationName: string[] }) => {
    const [currentStation, setCurrentStation] = useState<string>(stationName[0])

    const switchMode = (station: string) => {
        setCurrentStation(station)
    }

    return (
        <div className="overflow-x-scroll bg-yellow-300">
            <div className="flex whitespace-nowrap">
                {stationName.map((name: string) => {
                    return <div onClick={() => { switchMode(name); }} key={name} className={`text-black border-black ${name == currentStation ? 'border-b-2' : 'text-opacity-30 border-b-0'} px-6 py-2`}>{name}</div>
                })}
            </div>
        </div>
    )
}