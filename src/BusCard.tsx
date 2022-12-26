import React from 'react';
import { useState, useEffect } from 'react';
import BusArrow from "./BusArrow.svg";
import { ApproachInfos } from "../Bus.type"


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

        <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="inline-flex p-10 ">停留所1</div>
            <div className="inline-flex">
                <img className = "object-center"src = {BusArrow}alt="BusArrow" width="45" height="45"  />
            </div>
            <div className="inline-flex p-10 ">停留所2</div>
            <hr></hr>
            <div>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>

        </div>
    )
}


export default BusCard