import React from "react"
import { useState, useEffect } from 'react';
import { ApproachInfos } from "../../Bus.type"
import CountDownTimes from './CountDownTimes';
import { type } from 'os';

type Props = {
    textColor: string
    deptime: string
    hour: number
    min: number
    approch: string
}

const NextBusInfo = (prop: Props) => {

    return (
        <button className={`text-xl py-0.5 ${prop.textColor}`}>{`${prop.deptime} → ${('00' + prop.hour).slice(-2)}:${('00' + prop.min).slice(-2)} ${prop.approch}`}</button>
    )
}

const NextThreeBusInfo = () => {

    const inputData: ApproachInfos = {

        "approach_infos": [
            {
                "more_min": "約n分後に到着",
                "real_arrival_time": "09:30",
                "direction": "京都駅前",
                "via": "50号系統",
                "scheduled_time": "06:10",
                "delay": "定時運行",
                "bus_stop": "1",
                "required_time": 20
            },
            {
                "more_min": "約n分後に到着",
                "real_arrival_time": "06:35",
                "direction": "京都駅前",
                "via": "51号系統",
                "scheduled_time": "06:35",
                "delay": "定時運行",
                "bus_stop": "2",
                "required_time": 20
            },
            {
                "more_min": "約n分後に到着",
                "real_arrival_time": "16:15",
                "direction": "京都駅前",
                "via": "52号系統",
                "scheduled_time": "06:55",
                "delay": "定時運行",
                "bus_stop": "3",
                "required_time": 20
            }
        ]
    }

    const [selectedline, setLine] = useState(0);

    const TextColorChange = (index: number) => {

        const red = "text-red-500"

        if (index === selectedline) {

            return red
        }
        else {

            return ""
        }

    }

    const NextThreeBus = inputData.approach_infos.map((info, index) => {

        const dep_time = info.real_arrival_time.split(':')
        const dep_hour = Number(dep_time[0])
        const dep_min = Number(dep_time[1])
        const req_time = Number(info.required_time)

        let arrival_min = dep_min + req_time
        let arrival_hour = dep_hour

        if (arrival_min >= 120) {
            arrival_min -= 120
            arrival_hour += 2

        }
        else if (arrival_min >= 60) {
            arrival_min -= 60
            arrival_hour += 1
        }

        const buttonAlert = () => {
            setLine(index)
        }

        return (

            <div className="text-center" key={info.real_arrival_time} onClick={buttonAlert}>
                <NextBusInfo textColor={TextColorChange(index)} deptime={info.real_arrival_time} hour={arrival_hour} min={arrival_min} approch={info.via} />
            </div>

        )

    }
    )

    return (
        <div>
            <div className='text-center' key={inputData.approach_infos[selectedline].via}>
                <CountDownTimes dep_time={inputData.approach_infos[selectedline].real_arrival_time} />
                <div className="pt-1">{inputData.approach_infos[selectedline].via} {inputData.approach_infos[selectedline].bus_stop}番乗り場</div>
            </div>
            <div>{NextThreeBus}</div>
        </div>
    )
}

export default NextThreeBusInfo