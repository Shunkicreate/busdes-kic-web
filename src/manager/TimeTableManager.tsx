import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, TimeTableDataStoreType, AllBusStops } from '../types/Bus.type';
import { getDefaultMSW,  } from '../default/default.msw';
import { useGetTimetable, useGetNextbus } from '../default/default';
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
    const [witchIsRits, setWitchIsRits] = useState<'start'|'goal'>('start')

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
            if (from === startSta && to === goalSta) {
                flag = false
            }
        })
        return flag
    }

    const swapRits = (busStop: AllBusStopsType) => {
        if (busStop === "立命館大学前") {
            setWitchIsRits('goal')
            return ("立命館大学")
        }
        else if (busStop === "立命館大学") {
            setWitchIsRits('start')
            return ("立命館大学前")
        }
        else {
            return (busStop)
        }
    }

    const swapDestination = () => {
        const tempStart = swapRits(startSta)
        const tempGoal = swapRits(goalSta)
        setStartSta(tempGoal)
        setGoalSta(tempStart)
    }

    const [select, setSelect] = useState("")
    const upDateStation = (value: string) => {
        setSelect(value)
        if(witchIsRits === 'start'){
            setGoalSta(value as AllBusStopsType)
        }
        else if(witchIsRits === 'goal'){
            setStartSta(value as AllBusStopsType)
        }
    }

    const onClickEventHandle = () => {
        setSelect('')
    }

    const selectBusStop = () => {
        return (
            <div>
                <div>
                    <div>
                        <button onClick={()=>{swapDestination()}} className='bg-blue-100'>行先切り替え</button>
                    </div>
                    <div>
                        <div>出発: {startSta}</div>
                    </div>
                    <div>
                        <div>到着: {goalSta}</div>
                        <label htmlFor="bus-stop-choice">Choose a Bus Stop:</label>
                        <input type="text" list="bus-stop-list" id="bus-stop-choice" name="bus-stop-choice" value={select} onChange={(event) => upDateStation(event.target.value)} placeholder="駅名を入力" onClick={() => { onClickEventHandle() }}></input>
                        {/* <select name="example" onChange={(event) => upDateStation(event.target.value)}>
                            {AllBusStops.map((value, idx) => {
                                return (
                                    <option value={value} key={idx}>{value}</option>
                                )
                            })}
                        </select> */}
                        <datalist id='bus-stop-list'>
                            {AllBusStops.map((value, idx) => {
                                return (
                                    <option value={value} key={idx}></option>
                                )
                            })}
                        </datalist>
                    </div>
                </div>
            </div>
        )
    }

    return (
        [{ timeTable, timeTables, isLoading, isError, count, startSta, goalSta, doFetch, setStartSta, setGoalSta, selectBusStop, }]
    )
}