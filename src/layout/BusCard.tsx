import React from 'react';
import NextThreeBusInfo from './NextThreeBusInfo';
import BusCardHeader from './BusCardHeader';


const BusCard = () => {

  return (

    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <BusCardHeader/>
      <hr/>
      <NextThreeBusInfo/>
    </div>
  )
}

export default BusCard