import React from 'react';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, TimeTableResponse, busStopListAtomType } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useEffect } from 'react'
import { ApiClient } from '../lib/api-client';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';

const strictEntries = <T extends Record<string, any>>(
    object: T
): [keyof T, T[keyof T]][] => {
    return Object.entries(object);
};

const ShowOneRowBusTime = ({ oneBusTime, hour }: { oneBusTime: OneBusTime, hour: number }) => {
    return (
        <div className='text-left pl-12'>
            <div><span className='pr-4'>{zeroPadding(hour, 2)}:{zeroPadding(Number(oneBusTime.min), 2)}</span><span className='pr-4'>{oneBusTime.via}</span><span>{oneBusTime.bus_stop}</span></div>
        </div>
    )
}

const zeroPadding = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
}

const ShowOneCategoryDayBusTime = ({ dayBusTime }: { dayBusTime: Map<unionDays, OneBusTime[]> | undefined }) => {
    if (dayBusTime === undefined) {
        return (
            <div>undifined</div>
        )
    }
    const jsxBusTime: JSX.Element[] = []
    const entities = strictEntries(dayBusTime)
    entities.forEach((element, idx) => {
        const hour = element[0]
        const busArray = element[1]
        if (Array.isArray(busArray) && busArray.length > 0) {
            if ((typeof busArray !== 'string' || typeof busArray !== 'number') && busArray.length > 0) {
                const oneHourList = <div key={idx} className='border-b'><div className='pl-4'>{String(hour)}時</div>{busArray.map((value: OneBusTime, j) => <ShowOneRowBusTime key={j} oneBusTime={value} hour={Number(hour)}></ShowOneRowBusTime>)}</div>
                jsxBusTime.push(oneHourList)
            }
        }
    });
    return (
        <>
            {jsxBusTime}
        </>
    )
}

const isHoliyday = () => {
    let holiyday = false
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        holiyday = true
    }
    return holiyday
}

export const ShowOneDayBusTime = ({ timeTable }: { timeTable: TimeTable }) => {
    return (
        <div className=' w-[calc(100vw-2rem)] px-4 py-2'>
            <div>
                from: {timeTable.fr}
            </div>
            <div>
                to: {timeTable.to}
            </div>
            <div>
                {isHoliyday() ? <ShowOneCategoryDayBusTime dayBusTime={timeTable.holidays}></ShowOneCategoryDayBusTime> : <ShowOneCategoryDayBusTime dayBusTime={timeTable.holidays}></ShowOneCategoryDayBusTime>}
            </div>
        </div>
    )
}

export const fetchTimeTable = async (fr: AllBusStopsType, to: AllBusStopsType) => {
    const response = await ApiClient.get<TimeTableResponse>(`/timetable?fr=${fr}&to=${to}`)
    const data = response.data
    const addTimeTable: TimeTable = Object.assign({}, data)
    addTimeTable.fr = fr
    addTimeTable.to = to
    return (addTimeTable)
}
