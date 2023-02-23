import React from 'react';
import { useState } from 'react';
import { TimeTable, TimeTableResponse, OneBusTime, unionDays, AllBusStopsType, TimeTableDataStoreType, AllBusStops } from '../types/Bus.type';
import reactQueryManager from './reactQueryManager';
import { SettingsManager } from './SettingsManager';


export const TimeTableManager = () => {
    const { timetableQueryResults, handleReset, addQueryKey } = reactQueryManager().TimeTablereactQueryManager
    const { startStaSetting, goalStaSetting, setStartStaSetting, setGoalStaSetting } = SettingsManager().TimeTableParams
    const [startSta, setStartSta] = useState<AllBusStopsType>(startStaSetting)
    const [goalSta, setGoalSta] = useState<AllBusStopsType>(goalStaSetting)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [timeTables, setTimeTables] = useState<TimeTable[]>([])
    const [witchIsRits, setWitchIsRits] = useState<'start' | 'goal'>('start')

    const checkStation = () => {
        // debugger; // eslint-disable-line no-debugger
        if ((startSta === "立命館大学前" && goalSta !== "立命館大学") || (startSta !== "立命館大学前" && goalSta === "立命館大学")) {
            return true
        }
        return false
    }

    const fetchData = async () => {
        // debugger; // eslint-disable-line no-debugger
        handleReset().then(
            () => {
                if (timetableQueryResults) {
                    // const addedTable: TimeTable = timetableQueryResults.data
                    // addedTable.from = startSta
                    // addedTable.to = goalSta
                    // console.log(addedTable)
                    // setTimeTable(addedTable)
                    // setTimeTables([...timeTables, addedTable])
                }
            }
        )
    }

    const doFetch = () => {
        if (checkStation() && canFetch()) {
            // fetchData()
            handleReset()
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
        // console.log(TimetableQuery)
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
        if (witchIsRits === 'start') {
            setGoalSta(value as AllBusStopsType)
        }
        else if (witchIsRits === 'goal') {
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
                        {timeTables.map((value, i) => {
                            return (
                                <div key={i}>
                                    from:{value.from},
                                    to:{value.to}
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {/* isLoading:{result.isLoading.toString()} */}
                    </div>
                    <div>
                        <button onClick={() => { swapDestination() }} className='bg-blue-100'>行先切り替え</button>
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
        [{ timetableQueryResults, timeTable, timeTables, startSta, goalSta, doFetch, setStartSta, setGoalSta, selectBusStop, }]
    )
}