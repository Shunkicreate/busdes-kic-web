import React from 'react';
import { TimeTable, OneBusTime, unionDays, busRouteAtomType, AllBusStopsType, TimeTableResponse, busStopListAtomType } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
// import useReactQuery from '../manager/reactQueryManager';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
// import { queryClient } from '../manager/reactQueryManager';
import { useEffect } from "react"
// import useTimeTable from '../hooks/useTimeTable';
// import { useFetchPosts } from '../features/get/hooks';
import { ApiClient } from '../lib/api-client';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import getBusRoute from '../grobalState/selectors/getBusRoute';

const strictEntries = <T extends Record<string, any>>(
    object: T
): [keyof T, T[keyof T]][] => {
    return Object.entries(object);
};

const ShowOneRowBusTime = (oneBusTime: OneBusTime, index: number, hour: number) => {
    return (
        <div key={index} className="text-left pl-10">
            <div><span className='pr-3'>{zeroPadding(hour, 2)}:{zeroPadding(Number(oneBusTime.min), 2)}</span><span className='pr-3'>{oneBusTime.via}</span><span>{oneBusTime.bus_stop}</span></div>
        </div>
    )
}

const zeroPadding = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
}

const ShowOneCategoryDayBusTime = (dayBusTime: Map<unionDays, OneBusTime[]> | undefined) => {
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
            if ((typeof busArray !== "string" || typeof busArray !== "number") && busArray.length > 0) {
                const oneHourList = <div key={idx}><div>{String(hour)}時</div>{busArray.map((value: OneBusTime, index) => ShowOneRowBusTime(value, index, Number(hour)))}</div>
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

export const ShowOneDayBusTime = ({ timeTable }: { timeTable: TimeTable }) => {
    const dayOfWeek = new Date().getDay();
    let holyday = false
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        holyday = true
    }
    return (
        <div>
            <div>
                from: {timeTable.fr}
            </div>
            <div>
                to: {timeTable.to}
            </div>
            <div>
                {holyday ? ShowOneCategoryDayBusTime(timeTable.holidays) : ShowOneCategoryDayBusTime(timeTable.weekdays)}
            </div>
        </div>
    )
}

const fetchTimeTable = async (fr: AllBusStopsType, to: AllBusStopsType) => {
    const response = await ApiClient.get<TimeTableResponse>(`/timetable?fr=${fr}&to=${to}`)
    const data = response.data
    const addTimeTable: TimeTable = Object.assign({}, data)
    addTimeTable.fr = fr
    addTimeTable.to = to
    return (addTimeTable)
}

export const ShowTimeTable = () => {
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    useEffect(() => {
        console.log('use effect')
        let ignoreTwoRendering = false
        AllBusStopList.forEach((BusStop) => {
            if (BusStop.TimeTableData === undefined) {
                fetchTimeTable(BusStop.fr, BusStop.to).then((timetable) => {
                    const addBusStopListAtom: busStopListAtomType = {
                        fr: BusStop.fr,
                        to: BusStop.to,
                        ShowTimeTable: true,
                        ShowBusCard: false,
                        TimeTableData: timetable,
                        BusCardData: undefined
                    }
                    addAllBusStopList([addBusStopListAtom])
                })
            }
        })

        return () => {
            ignoreTwoRendering = true
        }

    }, [])
    return (
        <div>
            <div className="m-4 flex w-max">
                {
                    AllBusStopList.map((BusStop, i) => {
                        return (
                            <div key={i} className="timetable">
                                {BusStop.TimeTableData ? <ShowOneDayBusTime timeTable={BusStop.TimeTableData}></ShowOneDayBusTime> : <></>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
