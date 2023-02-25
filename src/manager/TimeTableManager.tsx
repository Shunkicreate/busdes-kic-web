import React from 'react';
import { useState } from 'react';
import { TimeTable, TimeTableResponse, OneBusTime, unionDays, AllBusStopsType, TimeTableDataStoreType, AllBusStops, busRouteAtomType } from '../types/Bus.type';
import useReactQuery from './reactQueryManager';
import { SettingsManager } from './SettingsManager';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/swapBusRoute';

const useTimeTableManager = () => {
    const { reactQueryResults, fetchData  } = useReactQuery()
    const { startStaSetting, goalStaSetting, setStartStaSetting, setGoalStaSetting } = SettingsManager().TimeTableParams
    const swapFunc = SettingsManager().swapDestination
    const settings = SettingsManager()
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const swapBusRoute = useSetRecoilState(swapBusRouteSelector)


    // const [startSta, setStartSta] = useState<AllBusStopsType>(startStaSetting)
    // const [goalSta, setGoalSta] = useState<AllBusStopsType>(goalStaSetting)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [timeTables, setTimeTables] = useState<TimeTable[]>([])
    const [witchIsRits, setWitchIsRits] = useState<'start' | 'goal'>('start')

    const [select, setSelect] = useState("")
    const upDateStation = (value: string) => {
        setSelect(value)
        if (witchIsRits === 'start') {
            setGoalStaSetting(value as AllBusStopsType)
        }
        else if (witchIsRits === 'goal') {
            setStartStaSetting(value as AllBusStopsType)
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
                        <div onClick={() => { swapFunc(startStaSetting, goalStaSetting, 'TimeTable') }}>Swap in timetable manager</div>
                        <div onClick={() => { console.log('haaaaa');settings.swapDestination(settings.TimeTableParams.goalStaSetting, settings.TimeTableParams.startStaSetting, 'TimeTable') }}>Swap</div>
                    </div>
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
                        <button onClick={() => { swapBusRoute(busRoute) }} className='bg-blue-100'>行先切り替え</button>
                    </div>
                    <div>
                        <div>出発: {startStaSetting}</div>
                    </div>
                    <div>
                        <div>到着: {goalStaSetting}</div>
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
        [{ reactQueryResults, timeTable, timeTables, selectBusStop }]
    )
}

export default useTimeTableManager