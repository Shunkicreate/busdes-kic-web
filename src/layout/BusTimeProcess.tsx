import React from 'react';
import { useState, useEffect } from 'react';
import { ApproachInfos } from "../../Bus.type"
import { type } from 'os';


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

        if (index === 0) {

            return (
                <div className='text-center' key={info.via}>
                    <div className="text-4xl py-0.5 pt-3">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
                    <div className="pt-1">{info.via} {info.bus_stop}番乗り場</div>
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