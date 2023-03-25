import React from 'react';
import NextBusInfoFromAPI from './NextBusInfoFromAPI';
import BusCardHeader from './BusCardHeader';
import { AllBusStopsType } from '../types/Bus.type';



type Props = {
  from: AllBusStopsType
  to: AllBusStopsType
}


const BusCard = (prop : Props) => {


  return (

    <div className='w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <BusCardHeader from_bus={prop.from} to_bus={prop.to} />
      <hr />
      <NextBusInfoFromAPI from_bus={prop.from} to_bus={prop.to}/>
    </div>
  )
}

export default BusCard