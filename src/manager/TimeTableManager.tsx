import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, TimeTableDataStoreType, AllBusStops } from '../types/Bus.type';
import React from 'react';

export const TimeTableManager = () => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const [startSta, setStartSta] = useState<AllBusStopsType>('立命館大学前')
    const [goalSta, setGoalSta] = useState<AllBusStopsType>('京都駅前')
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [timeTables, setTimeTables] = useState<TimeTable[]>([])
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const checkStation = () => {
        // debugger; // eslint-disable-line no-debugger
        if ((startSta === "立命館大学前" && goalSta !== "立命館大学") || (startSta !== "立命館大学前" && goalSta === "立命館大学")) {
            return true
        }
        return false
    }

    const fetchData = async (url: string) => {
        setIsLoading(true)
        await axios.get(
            url,
        )
            .then((res: AxiosResponse<TimeTable>) => {
                const { data, status } = res;
                data.from = startSta
                data.to = goalSta
                setTimeTable(data)
                setIsLoading(false)
                setCount(count + 1)
                setTimeTables([...timeTables, data])
            })
            .catch((e: AxiosError<{ error: string }>) => {
                console.log(e.message);
                setIsError(false);
            })
    }

    const doFetch = () => {
        // debugger; // eslint-disable-line no-debugger
        if (checkStation() && canFetch()) {
            const url = baseURL + "timetable?fr=" + startSta + "&to=" + goalSta
            fetchData(url)
        }
        else {
            return (false)
        }
    }

    const canFetch = () => {
        let flag = true
        timeTables.forEach((table) => {
            const from = table.from
            const to = table.to
            if( from === startSta && to === goalSta){
                flag = false
            }
        })
        return flag
    }

    const [select, setSelect] = useState("")
    const upDateStation = (value: string) => {
        setSelect(value)
        setGoalSta(value as AllBusStopsType)
    }
    const selectBusStop = () => {
        return (
            <div>
                <div>
                    <div>
                        <div>出発</div>
                        <div>{startSta}</div>
                    </div>
                    <div>
                        <div>到着</div>
                        <select name="example" value={select} onChange={(event) => upDateStation(event.target.value)}>
                            {AllBusStops.map((value, idx) => {
                                return (
                                    <option value={value} key={idx}>{value}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    return (
        [{ timeTable, timeTables, isLoading, isError, count, startSta, goalSta, doFetch, setStartSta, setGoalSta, selectBusStop, }]
    )
}