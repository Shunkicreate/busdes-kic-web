import React from 'react';
import NextBusInfoFromAPI from './NextBusInfoFromAPI';
import BusCardHeader from './BusCardHeader';
import { AllBusStopsType } from '../types/Bus.type';
import CardDisplayButton from '../atom/CardDisplayButton';
import BusCardDisplaySetting from './BusCardDisplaySetteing';



type Props = {
  from: AllBusStopsType
  to: AllBusStopsType
  index: number
}


const BusCard = (prop : Props) => {

  return (

    <div className='w-11/12 p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <BusCardHeader from_bus={prop.from} to_bus={prop.to} />
      <hr />
      <NextBusInfoFromAPI from_bus={prop.from} to_bus={prop.to} index={prop.index}/>
      <BusCardDisplaySetting></BusCardDisplaySetting>
    </div>
  )
}

export default BusCard