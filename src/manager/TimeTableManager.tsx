import React from 'react';
import { useState } from 'react';
import { TimeTable, TimeTableResponse, OneBusTime, unionDays, AllBusStopsType, TimeTableDataStoreType, AllBusStops, busRouteAtomType } from '../types/Bus.type';
import useReactQuery from './reactQueryManager';
import { SettingsManager } from './SettingsManager';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/swapBusRoute';
import setpBusRouteSelector from '../grobalState/selectors/setBusRoute';

const useTimeTableManager = () => {
    const { reactQueryResults, fetchData } = useReactQuery()
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const swapBusRoute = useSetRecoilState(swapBusRouteSelector)
    const setBusRoute = useSetRecoilState(setpBusRouteSelector)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [timeTables, setTimeTables] = useState<TimeTable[]>([])

    const [select, setSelect] = useState("")
    const upDateStation = (value: string) => {
        if (busRoute.fr === '立命館大学前') {
            const newRoute: busRouteAtomType = {
                fr: '立命館大学前',
                to: value as AllBusStopsType
            }
            setBusRoute(newRoute)
        }
        else if (busRoute.to === '立命館大学') {
            const newRoute: busRouteAtomType = {
                fr: value as AllBusStopsType,
                to: '立命館大学'
            }
            setBusRoute(newRoute)
        }
    }

    const onClickEventHandle = () => {
        setSelect('')
    }

    const selectBusStop = () => {
        return (
            <div>
                <div>
                    {/* <div>
                        <div onClick={() => { swapFunc(startStaSetting, goalStaSetting, 'TimeTable') }}>Swap in timetable manager</div>
                        <div onClick={() => { console.log('haaaaa'); settings.swapDestination(settings.TimeTableParams.goalStaSetting, settings.TimeTableParams.startStaSetting, 'TimeTable') }}>Swap</div>
                    </div> */}
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
                        <div>出発: {busRoute.fr}</div>
                    </div>
                    <div>
                        <div>到着: {busRoute.to}</div>
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