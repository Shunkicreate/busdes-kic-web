import React from 'react';
import { AllBusStopsType } from '../types/Bus.type';
import BusCard from './BusCard';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RoundTripCard = () => {

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    console.log(AllBusStopList)

    const BusStops = AllBusStopList.map((busstop, i) => {

        return (
            <div key={i} className='flex justify-center p-2'>
                <BusCard from={busstop.fr} to={busstop.to} />
            </div>
        )

    })


    return (

        <div>
            {BusStops}
        </div>

    )

}

export default RoundTripCard