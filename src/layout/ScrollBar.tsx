import React from "react"
import { useState } from 'react'

export const ScrollBar = ({ stationName }: { stationName: string[] }) => {
    const [currentStation, setCurrentStation] = useState<string>(stationName[0])

    const switchStation = (station: string) => {
        setCurrentStation(station)
    }

    // function ScrollWindow(id:string) {
    //     var divElement = document.getElementById(id);
    //     var scrollLeft = xdivElement.scrollLeft ;
    //     document.documentElement.scrollTop = scrollLeft;
    //   }

    return (
        <div className="overflow-x-scroll bg-yellow-300 scroll-smooth">
            <div className="flex whitespace-nowrap">
                {stationName.map((name: string) => {
                    return (
                        <a href={`#${name}`} key={name} className="block">
                            <div id={name} onClick={() => { switchStation(name); }} key={name} className={`text-black border-black ${name == currentStation ? 'border-b-2' : 'text-opacity-30 border-b-0'} py-2 px-6`}>{name}</div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
