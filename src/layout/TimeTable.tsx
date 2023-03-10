import React from 'react';
import { TimeTable, OneBusTime, unionDays, busRouteAtomType } from '../types/Bus.type';
import { useRecoilValue, } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
import useReactQuery from '../manager/reactQueryManager';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { queryClient } from '../manager/reactQueryManager';
import { useEffect } from "react"
import useTimeTable from '../hooks/useTimeTable';

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
    return (
        <div>
            <div>
                from: {timeTable.fr}
            </div>
            <div>
                to: {timeTable.to}
            </div>
            <div>
                {ShowOneCategoryDayBusTime(timeTable.weekdays)}
            </div>
            <div>
                {ShowOneCategoryDayBusTime(timeTable.holidays)}
            </div>
        </div>
    )
}

export const ShowTimeTable = () => {
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const { fetchData } = useReactQuery()
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const BreakError = {};
    // useEffect(() => {
    //     try {
    //         AllBusStopList.forEach((BusStop, idx) => {
    //             if (BusStop.TimeTableData === undefined) {
    //                 fetchData()
    //                 throw BreakError;
    //             }
    //         })
    //     } catch (error) {
    //         if (error !== BreakError) throw error;
    //     }
    // }, [])
    return (
        <div className="m-4">
            <div onClick={() => { fetchData() }} className="bg-blue-100">
                検索！！！！
            </div>
            {
                AllBusStopList.map((AllBusStop, i) => {
                    const fr = AllBusStop.fr
                    const to = AllBusStop.to
                    // const result = useTimeTable({fr, to})
                    return (
                        <div key={i}>

                        </div>
                    )
                })
            }
            {
                (() => {
                    if (queryClient.isFetching() === undefined) {
                        console.log("fetching...")
                        return (
                            <div>loading...</div>
                        )
                    }
                    else {
                        return (
                            <div className='flex w-max'>
                                {AllBusStopList.map((BusStop, idx) => {
                                    return (
                                        <div key={idx}>
                                            <div>{BusStop.fr}{BusStop.to}</div>
                                            {(BusStop.TimeTableData) ? <ShowOneDayBusTime timeTable={BusStop.TimeTableData}></ShowOneDayBusTime> : <></>}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}
