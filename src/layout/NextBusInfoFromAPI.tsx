import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApproachInfos } from '../types/Bus.type'
import CountDownTimes from './CountDownTimes';
import { AllBusStopsType } from '../types/Bus.type';
import BusCard from './BusCard';


type Props = {
    textColor: string
    deptime: string
    hour: number
    min: number
    approch: string
}

type Props2 = {
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
}

const NextBusInfo = (prop: Props) => {

    return (
        <button className={`text-xl py-0.5 ${prop.textColor}`}>{`${prop.deptime} → ${('00' + prop.hour).slice(-2)}:${('00' + prop.min).slice(-2)} ${prop.approch}`}</button>
    )
}

const NextBusInfoFromAPI = (prop: Props2) => {



    const TestData: ApproachInfos = {

        'approach_infos': [
            {
                'more_min': '約n分後に到着',
                'real_arrival_time': 'hh:mm',
                'direction': '京都駅前',
                'bus_name': 'n号系統',
                'scheduled_time': 'hh:mm',
                'delay': '定時運行',
                'bus_stop': 'n',
                'required_time': 20
            }
        ]
    }


    const [selectedline, setLine] = useState(0);

    const TextColorChange = (index: number) => {

        const red = 'text-red-500'

        if (index === selectedline) {

            return red
        }
        else {

            return ''
        }

    }


    const [BusInfo, setBusInfo] = useState<ApproachInfos>(TestData);

    //リコリス　リコイルを使う　https://twitter.com/ArmandoValores/status/1635060404325060608?s=20


    useEffect(() => {

        // debugger;

        if(BusInfo === TestData){

            console.log(BusInfo , TestData)

            axios.get('https://bustimer.azurewebsites.net/nextbus', {
                params: {
                    fr: prop.from_bus,
                    to: prop.to_bus
                }
            })
                .then(response => {
                    setBusInfo(response.data)
                })
                .catch(error => console.log(error))


        }

    }, [])



    const NextThreeBus = BusInfo.approach_infos.map((info, index) => {

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

            <div className='text-center' key={info.real_arrival_time} onClick={buttonAlert}>
                <NextBusInfo textColor={TextColorChange(index)} deptime={info.real_arrival_time} hour={arrival_hour} min={arrival_min} approch={info.bus_name} />
            </div>

        )

    }
    )

    return (
        <div>
            <div className='text-center' key={BusInfo.approach_infos[selectedline].bus_name}>
                <CountDownTimes dep_time={BusInfo.approach_infos[selectedline].real_arrival_time} />
                <div className='pt-1'>{BusInfo.approach_infos[selectedline].bus_name} {BusInfo.approach_infos[selectedline].bus_stop}番乗り場</div>
            </div>
            <div>{NextThreeBus}</div>
        </div>
    )
}

export default NextBusInfoFromAPI