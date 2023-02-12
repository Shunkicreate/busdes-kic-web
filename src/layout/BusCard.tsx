import React from 'react';
import { useState, useEffect } from 'react';
import BusArrow from "./BusArrow.svg";
import { ApproachInfos } from "../../Bus.type"
import { type } from 'os';
import BusTimeProcess from "./BusTimeProcess";
import NextThreeBusInfo from './NextThreeBusInfo';


const BusCard = () => {

  return (

    //inline-flexよりgridの方がいいらしい https://tailwindcss.com/docs/grid-template-columns
    //flexでもいける??

    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center flex-row h-16">
        <div className="p-6 justify-center text-xl">立命館大学</div>
        <div className="inline-flex">
          <img className="" src={BusArrow} alt="BusArrow" width="45"/>
        </div>
        <div className="p-6 justify-center text-xl">京都駅</div>
      </div>
      <hr/>
      <BusTimeProcess/>
      <NextThreeBusInfo/>
    </div>
  )
}


export default BusCard