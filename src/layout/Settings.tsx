import React from 'react';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, busRouteAtomType } from '../types/Bus.type';
import { SettingsManager } from '../manager/SettingsManager';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useTimeTableManager from '../manager/TimeTableManager';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/setBusRoute';
import useReactQuery from '../manager/reactQueryManager';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import SettingModal from './SettingModal';

const Settings = () => {
    const [{ timeTables, selectBusStop }] = useTimeTableManager()
    const settings = SettingsManager()
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const swapBusRoute = useSetRecoilState(swapBusRouteSelector)
    const { reactQueryResults, fetchData } = useReactQuery()
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    return (
        <div>
            <div>
                バス停設定
            </div>
            <div className='p-4'>
                {AllBusStopList.map((BusStop, i) => {
                    return (
                        <div key={i} className="even:bg-stone-200 odd:bg-stone-300">
                            <span>fr: </span>
                            <span>{BusStop.fr}</span>
                            <span>to: </span>
                            <span>{BusStop.to}</span>
                        </div>
                    )
                })}
            </div>
            <SettingModal></SettingModal>
        </div>
    )
}

export default Settings