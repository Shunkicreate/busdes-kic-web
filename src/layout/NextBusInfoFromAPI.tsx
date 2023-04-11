import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApproachInfos, busStopListAtomType, AllBusStopsType } from '../types/Bus.type'
import CountDownTimes from './CountDownTimes';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { info } from 'console';
import { preProcessFile } from 'typescript';


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
    index: number
}

const NextBusInfo = (prop: Props) => {

    return (
        <button className={`w-full text-base py-0.5 ${prop.textColor}`}>
            <div className='grid grid-cols-5 w-full px-4'>
                <div className='text-center col-span-2'>{`${prop.deptime} → ${('00' + prop.hour).slice(-2)}:${('00' + prop.min).slice(-2)}`}</div>
                <div className='text-left col-span-3 pl-4'>{`${prop.approch}`}</div>
            </div>
        </button>
    )
}

const NextBusInfoFromAPI = (prop: Props2) => {

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(addAllBusStopListSelector)
    const [selectedline, setLine] = useState(0);

    const TextColorChange = (j: number) => {
        const red = 'text-red-500'
        if (j === selectedline) {
            return red
        }
        else {
            return ''
        }
    }

    //リコリス リコイルを使う https://twitter.com/ArmandoValores/status/1635060404325060608?s=20
    //この辺を書き直す必要あり

    useEffect(() => {

        if (AllBusStopList[prop.index].BusCardData?.approach_infos.length == 0) {
            axios.get<ApproachInfos>(`${process.env.REACT_APP_BASE_URL}/nextbus`, {

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
                        ShowBusCard: true,
                        TimeTableData: undefined,
                        BusCardData: response.data,
                    }
                    addAllBusStopList([addBusStopListAtom])
                })
                .catch(error => console.log(error))
        }
    }, [])

    const NextThreeBus = AllBusStopList[prop.index].BusCardData?.approach_infos.map((info , i) => {

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
                    setLine(i)
                }

                return (
                    <div className='text-center' key={i} onClick={buttonAlert}>
                        <NextBusInfo textColor={TextColorChange(i)} deptime={info.real_arrival_time} hour={arrival_hour} min={arrival_min} approch={info.bus_name} />
                    </div>
                )
    })

    if (AllBusStopList[prop.index].BusCardData?.approach_infos.length == 0) {

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
                <div className='text-center' key={selectedline}>
                    <CountDownTimes dep_time={AllBusStopList[prop.index].BusCardData?.approach_infos[selectedline].real_arrival_time} from_bus={prop.from_bus} to_bus={prop.to_bus} index={prop.index}/>
                    <div className='pt-1'>{AllBusStopList[prop.index].BusCardData?.approach_infos[selectedline].bus_name} {AllBusStopList[prop.index].BusCardData?.approach_infos[selectedline].bus_stop}番乗り場</div>
                </div>
                <div>{NextThreeBus}</div>
            </div>
        )

    }
}

export default NextBusInfoFromAPI