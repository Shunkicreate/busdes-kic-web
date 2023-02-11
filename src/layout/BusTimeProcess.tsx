import React from 'react';
import { useState, useEffect } from 'react';
import { ApproachInfos } from "../../Bus.type"
import { type } from 'os';

type Prop = {
    textColor: string
    deptime: string
    hour: number
    min: number
    approch: string
}

const Test = (prop : Prop) => {

    return (
        <div>
            <div className={`text-xl py-0.5 ${prop.textColor}`}>{`${prop.deptime} → ${prop.hour}:${prop.min} ${prop.approch}`}</div>
        </div>
    )
}

const BusTimeProcess = () => {

    const inputData: ApproachInfos = {

        "approach_infos": [
            {
                "more_min": "約n分後に到着",
                "real_arrival_time": "06:10",
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
                "via": "50号系統",
                "scheduled_time": "06:35",
                "delay": "定時運行",
                "bus_stop": "1",
                "required_time": 20
            },
            {
                "more_min": "約n分後に到着",
                "real_arrival_time": "06:55",
                "direction": "京都駅前",
                "via": "50号系統",
                "scheduled_time": "06:55",
                "delay": "定時運行",
                "bus_stop": "1",
                "required_time": 20
            }
        ]
    }

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        // Get time
        const time = [date.getHours(), date.getMinutes(), date.getSeconds()];

        return () => clearInterval(timerId)

    }, [date]);


    const testdata = inputData.approach_infos.map((info, index) => {

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

        if (index === 0) {

            return (
                <div className='text-center' key={info.via}>
                    <div className="text-4xl py-0.5 pt-3">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
                    <div className="pt-1">{info.via} {info.bus_stop}番乗り場</div>
                    <Test textColor='text-red-500' deptime={info.real_arrival_time} hour={arrival_hour} min={arrival_min} approch={info.via}></Test>
                </div>
            )

        }
        else {
            return (
                <div className="text-center" key={info.real_arrival_time}>
                    <Test textColor='' deptime={info.real_arrival_time} hour={arrival_hour} min={arrival_min} approch={info.via}></Test>
                </div>
            )
        }
    }
    )

    return (
        <div>{testdata}</div>
    )
}

export default BusTimeProcess