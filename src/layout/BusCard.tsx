import React from 'react';
import { useState, useEffect } from 'react';
import { ApproachInfos } from "../types/Bus.type"
import BusArrow from "./BusArrow.svg";



const BusCard = () => {

    const inputData: ApproachInfos = 
    {
  "approach_infos": [
    {
      "more_min": "約n分後に到着",
      "real_arrival_time": "06:10",
      "direction": "京都駅前",
      "via": "50号系統",
      "scheduled_time": "06:10",
      "delay": "定時運行",
      "bus_stop": "1",
      "required_time": 20
    },
    {
      "more_min": "約n分後に到着",
      "real_arrival_time": "06:35",
      "direction": "京都駅前",
      "via": "50号系統",
      "scheduled_time": "06:35",
      "delay": "定時運行",
      "bus_stop": "1",
      "required_time": 20
    },
    {
      "more_min": "約n分後に到着",
      "real_arrival_time": "06:55",
      "direction": "京都駅前",
      "via": "50号系統",
      "scheduled_time": "06:55",
      "delay": "定時運行",
      "bus_stop": "1",
      "required_time": 20
    }
  ]
}
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
          setDate(new Date());
        }, 1000);
       
        // Get time
        const time = [date.getHours(), date.getMinutes(), date.getSeconds()];

        return () => clearInterval(timerId)

      }, [date]);
      
    return(

        //inline-flexよりgridの方がいいらしい https://tailwindcss.com/docs/grid-template-columns
        //flexでもいける??

        <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center flex-row h-32">
                <div className="p-12 basis-3/7">立命館大学</div> 
                <div className="basis-1/7 inline-flex">
                    {/* <img className = "" src = {BusArrow}alt="BusArrow" width="45" /> */}
                </div>
                <div className="p-12 basis-3/7">京都駅</div>
            </div>
            <hr></hr>
            <div className="flex justify-center text-xl">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
        </div>
    )
}


export default BusCard