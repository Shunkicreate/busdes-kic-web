import React from 'react';
import { AllBusStopsType } from '../types/Bus.type';
import BusCard from './BusCard';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RoundTripCard = () => {

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    const BusStops = AllBusStopList.map((busstop, i) => {

        if (busstop.ShowBusCard == true){

            return (
                <div key={i} className='flex justify-center p-2'>
                    <BusCard from={busstop.fr} to={busstop.to} index={i}/>
                </div>

            )
        }

    })

    return (

        <div>
            {BusStops}
        </div>

    )

}

export default RoundTripCard