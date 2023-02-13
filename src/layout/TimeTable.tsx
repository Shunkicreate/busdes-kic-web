import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays, TwelveLines, FiftyLines, No205, No15, M1, No52, No51, AllBusStops } from '../types/Bus.type';
import { TimeTableManager } from '../manager/TimeTableManager';
import React from 'react';
export const useTimeTableApi = () => {
    const baseURL = "https://busdes-kic.mercy34.workers.dev/";
    const [startSta, setStartSta] = useState('京都駅前')
    const [goalSta, setGoalSta] = useState('立命館大学')
    const [url, setUrl] = useState(baseURL + "timetable?fr=" + startSta + "&to=" + goalSta)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const doFetch = () => {
        setUrl(baseURL + "timetable?fr=" + startSta + "&to=" + goalSta)
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await axios.get(
                url,
            )
                .then((res: AxiosResponse<TimeTable>) => {
                    const { data, status } = res;
                    setTimeTable(data);
                    setIsLoading(false)
                    console.log(status)
                    setCount(count + 1)
                })
                .catch((e: AxiosError<{ error: string }>) => {
                    console.log(e.message);
                    setIsError(false);
                })
        }
        fetchData()
    }, [url]);
    return (
        [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }]
    )
}

const strictEntries = <T extends Record<string, any>>(
    object: T
): [keyof T, T[keyof T]][] => {
    return Object.entries(object);
};


const ShowOneBusTime = (oneBusTime: OneBusTime, index: number, hour: number) => {
    return (
        <div key={index} className="text-left pl-10">
            <div><span className='pr-3'>{zeroPadding(hour, 2)}:{zeroPadding(Number(oneBusTime.min), 2)}</span><span className='pr-3'>{oneBusTime.via}</span><span>{oneBusTime.bus_stop}</span></div>
        </div>
    )
}

const zeroPadding = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
}

const ShowDayBusTime = (dayBusTime: Map<unionDays, OneBusTime[]> | undefined) => {
    if (dayBusTime === undefined) {
        return (
            <div>undifined</div>
        )
    }
    const jsxBusTime: JSX.Element[] = []
    const entities = strictEntries(dayBusTime)
    entities.forEach(element => {
        const hour = element[0]
        const busArray = element[1]
        if (Array.isArray(busArray) && busArray.length > 0) {
            if ((typeof busArray !== "string" || typeof busArray !== "number") && busArray.length > 0) {
                const oneHourList = <div><div>{String(hour)}時</div>{busArray.map((value: OneBusTime, index) => ShowOneBusTime(value, index, Number(hour)))}</div>
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

export const ShowTimeTable = ({ json }: { json: TimeTable | undefined }) => {

    // const AllBusStops = [TwelveLines, FiftyLines, No205, No15, M1, No52, No51]
    const [{ timeTable, timeTables, isLoading, isError, count, startSta, goalSta, doFetch, setStartSta, setGoalSta, selectBusStop }] = TimeTableManager()
    const AllBusStopList = (() => {
        const returnList: string[] = []
        AllBusStops.forEach((elem) => {
            returnList.push(String(elem))
        })
        return returnList
    })()
    return (
        <div className="m-4">
            {selectBusStop()}
            <div onClick={() => { doFetch() }} className="bg-blue-100">
                検索！！！！
            </div>
            {
                (() => {
                    if (timeTable === undefined) {
                        return (
                            <div>undifined</div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <div>
                                    {ShowDayBusTime(timeTable.weekdays)}
                                </div>
                                <div>
                                    {ShowDayBusTime(timeTable.holidays)}
                                </div>
                                <div>
                                    {ShowDayBusTime(timeTable.saturdays)}
                                </div>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}