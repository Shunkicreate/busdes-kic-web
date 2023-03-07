import React from 'react';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, busRouteAtomType } from '../types/Bus.type';
import { SettingsManager } from '../manager/SettingsManager';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useTimeTableManager from '../manager/TimeTableManager';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/setBusRoute';
import useReactQuery from '../manager/reactQueryManager';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';

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
                from: {timeTable.from}
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
    const [{ timeTables, selectBusStop }] = useTimeTableManager()
    const settings = SettingsManager()
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const swapBusRoute = useSetRecoilState(swapBusRouteSelector)
    const { reactQueryResults, fetchData } = useReactQuery()
    const AllBusStopList = useRecoilValue(getAllBusStopList)



    return (
        <div className="m-4">
            <div className='bg-red-100'>

                {/* <div>
                    recoil
                </div>
                <div>
                    {busRoute.fr}
                </div>
                <div>
                    {busRoute.to}
                </div>
                <div onClick={()=>{swapBusRoute(busRoute)}}>
                    swap by recoil
                </div> */}
                <div>
                    {/* {reactQueryResults.map((reactQueryResult, i) => {
                        const { isLoading, data, error } = reactQueryResult
                        return(
                            reactQueryResult.data?
                        )
                    })} */}
                </div>
            </div>
            {/* {selectBusStop()} */}
            <div onClick={() => { fetchData(busRoute.fr, busRoute.to) }} className="bg-blue-100">
                検索！！！！
            </div>
            {/* {AllBusStopList.map((BusStop, i) => {
                return (
                    <div key={i} className="even:bg-stone-200 odd:bg-stone-300">
                        <span>fr: </span>
                        <span>{BusStop.fr}</span>
                        <span>to: </span>
                        <span>{BusStop.to}</span>
                        {BusStop.TimeTableData ? <ShowOneDayBusTime timeTable={BusStop.TimeTableData}></ShowOneDayBusTime> : <></>}
                    </div>
                )
            })} */}
            {/* <div>
                {timetableQueryResults.map((timetableQueryResult, i) => {
                    const timeTable = timetableQueryResult.data
                    if (timeTable) {
                        return (
                            <div key={i}>
                                {ShowOneDayBusTime(timeTable)}
                            </div>
                        )

                    }
                })}
            </div> */}
            {
                (() => {
                    if (timeTables === undefined) {
                        return (
                            <div>検索してください</div>
                        )
                    }
                    // else if (timetableQueryResults.isLoading) {
                    //     return (
                    //         <div>検索中...</div>
                    //     )
                    // }
                    // else if (timetableQueryResults.isError) {
                    //     return (
                    //         <div>Error. Try again a few minutes later</div>
                    //     )
                    // }
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
