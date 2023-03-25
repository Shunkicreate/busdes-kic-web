import React from 'react';
import { useRecoilValue } from 'recoil';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import useAddBusRouteModal from '../hooks/useModal';

const Settings = () => {
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const { AddBusRouteModal, open } = useAddBusRouteModal()

    return (
        <div>
            <div>
                バス停設定
            </div>
            <div className='p-4'>
                {AllBusStopList.map((BusStop, idx) => {
                    return (
                        <div key={idx} className='even:bg-stone-200 odd:bg-stone-300'>
                            <span>fr: </span>
                            <span>{BusStop.fr}</span>
                            <span>to: </span>
                            <span>{BusStop.to}</span>
                        </div>
                    )
                })}
            </div>
            <div onClick={() => { open() }}>Open Modal</div>
            <AddBusRouteModal></AddBusRouteModal>
        </div>
    )
}

export default Settings