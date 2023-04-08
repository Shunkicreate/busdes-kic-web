import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ApproachInfos, busStopListAtomType, AllBusStopsType } from '../types/Bus.type'

type Props = {
    dep_time: string
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
    index: number
}

const CountDownTimes = (prop: Props) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timerId)

    }, [date]);

    const dep_time_split = prop.dep_time.split(':')
    const dep_hour = Number(dep_time_split[0])
    const dep_min = Number(dep_time_split[1])

    let count_hour = dep_hour - date.getHours()
    let count_min = dep_min - date.getMinutes() - 1
    let count_sec = 59 - date.getSeconds()

    if (count_min < 0 && count_hour >= 1) {

        count_hour -= 1
        count_min += 60

    } else if(count_hour < 0)
    {
        count_hour = 0
        count_min = 0
        count_sec = 0
    }

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(addAllBusStopListSelector)

    useEffect(() => {

        if (count_hour <= 0 && count_min < 0) {

            count_hour = 0
            count_min = 0
            count_sec = 0

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
                        ShowTimeTable: AllBusStopList[prop.index].ShowTimeTable,
                        ShowBusCard: AllBusStopList[prop.index].ShowBusCard,
                        TimeTableData: AllBusStopList[prop.index].TimeTableData,
                        BusCardData: response.data,
                    }
                    addAllBusStopList([addBusStopListAtom])
                })
                .catch(error => console.log(error))

        }

    }, [count_min])

    return (
        <div className='text-4xl py-0.5 pt-3'>{count_hour}:{('00' + count_min).slice(-2)}:{('00' + count_sec).slice(-2)}</div>
    )

}

export default CountDownTimes