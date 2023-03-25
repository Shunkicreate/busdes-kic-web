import React from 'react';
import { AllBusStopsType } from '../types/Bus.type';
import BusCard from './BusCard';

const RoundTripCard = () => {

    //


    return(

        <div>
            <BusCard from='立命館大学前' to='京都駅前'/>
            <BusCard from='京都駅前' to='立命館大学'/>
        </div>
        
    )

}

export default RoundTripCard