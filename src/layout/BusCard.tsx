import React from 'react';
import { useState, useEffect } from 'react';
import BusArrow from "./BusArrow.svg";
import { ApproachInfos } from "../../Bus.type"
import { type } from 'os';


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

      
      const testdata = inputData.approach_infos.map((info , index) => {

        var dep_time = info.real_arrival_time.split(':')
        var dep_hour = Number(dep_time[0])
        var dep_min = Number(dep_time[1])
        var req_time = Number(info.required_time)

        var arrival_min = dep_min + req_time
        var arrival_hour = dep_hour

        if(arrival_min >= 120)
          {
            arrival_min -= 120
            arrival_hour += 2

          } 
          else if(arrival_min >= 60)
          {
            arrival_min -= 60
            arrival_hour += 1
          } 

        if(index === 0)
          {
        
            return (
            <div>
              <div className="flex justify-center text-4xl py-0.5 pt-3">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
              <div className="flex justify-center pt-1">{info.via} {info.bus_stop}番乗り場</div>
              <div className="flex justify-center text-xl py-0.5 text-red-500">{info.real_arrival_time} → {arrival_hour}:{arrival_min} &nbsp; &nbsp; {info.via}</div>
            </div>
            )
          
          }
        else 
          {
            return (
            <div className="flex justify-center text-xl py-0.5">{info.real_arrival_time} → {arrival_hour}:{arrival_min} &nbsp; &nbsp; {info.via}</div>
            )
          }
        }  
      )
      
    return(

        //inline-flexよりgridの方がいいらしい https://tailwindcss.com/docs/grid-template-columns
        //flexでもいける??

        <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center flex-row h-16">
                <div className="p-6 justify-center text-xl">立命館大学</div> 
                <div className="inline-flex">
                    <img className = "" src = {BusArrow}alt="BusArrow" width="45" />
                </div>
                <div className="p-6 justify-center text-xl">京都駅</div>
            </div>
            <hr></hr>
            <ul>{testdata}</ul>
        </div>
    )
}


export default BusCard