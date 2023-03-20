import React from 'react';
import NextThreeBusInfo from './NextThreeBusInfo';
import BusCardHeader from './BusCardHeader';
import { AllBusStopsType } from '../types/Bus.type';


const BusCard = () => {


  return (

    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <BusCardHeader from_bus='立命館大学' to_bus='京都駅前'/>
      <hr/>
      <NextThreeBusInfo/>
    </div>
  )
}

export default BusCard