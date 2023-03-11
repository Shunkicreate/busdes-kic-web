import React from 'react';
import { useRecoilValue } from 'recoil';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import SettingModal from './SettingModal';

const Settings = () => {
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    return (
        <div>
            <div>
                バス停設定
            </div>
            <div className='p-4'>
                {AllBusStopList.map((BusStop, i) => {
                    return (
                        <div key={i} className='even:bg-stone-200 odd:bg-stone-300'>
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