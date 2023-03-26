import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApproachInfos, busStopListAtomType, AllBusStopsType } from '../types/Bus.type'
import CountDownTimes from './CountDownTimes';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import setBusArriveInfos from '../grobalState/selectors/setBusArriveInfos';


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

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const BusInfo = useRecoilValue(setBusArriveInfos)
    const getBusInfo = useSetRecoilState(setBusArriveInfos)
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

    //リコリス リコイルを使う https://twitter.com/ArmandoValores/status/1635060404325060608?s=20

    useEffect(() => {
        if (BusInfo.approach_infos[0].more_min == undefined) {
            axios.get<ApproachInfos>('https://bustimer.azurewebsites.net/nextbus', {
                params: {
                    fr: prop.from_bus,
                    to: prop.to_bus
                }
            })
                .then(response => {
                    const addBusStopListAtom: busStopListAtomType = {
                        fr: prop.from_bus,
                        to: prop.to_bus,
                        ShowTimeTable: true,
                        ShowBusCard: false,
                        TimeTableData: undefined,
                        BusCardData: response.data,
                    }
                    getBusInfo(response.data)
                    addAllBusStopList([addBusStopListAtom])
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

    if(BusInfo.approach_infos.length == 0){

        return (
            <div>
                <div className='text-center pb-8 pt-10'>
                    接近中のバスはありません
                </div>
            </div>
        )

    } else {

        return (
            <div>
                <div className='text-center' key={BusInfo.approach_infos[selectedline].bus_name}>
                    <CountDownTimes dep_time={BusInfo.approach_infos[selectedline].real_arrival_time} from_bus={prop.from_bus} to_bus={prop.to_bus}/>
                    <div className='pt-1'>{BusInfo.approach_infos[selectedline].bus_name} {BusInfo.approach_infos[selectedline].bus_stop}番乗り場</div>
                </div>
                <div>{NextThreeBus}</div>
            </div>
        )

    }
}

export default NextBusInfoFromAPI