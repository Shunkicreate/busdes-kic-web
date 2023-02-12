import React from "react"
import { useState, useEffect } from 'react';

type Times = {
    dep_time: string
}

const CountDownTimes = (dep_times: Times) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timerId)

    }, [date]);

    const dep_time_split = dep_times.dep_time.split(':')
    const dep_hour = Number(dep_time_split[0])
    const dep_min = Number(dep_time_split[1])

    let count_hour = dep_hour - date.getHours()
    let count_min = dep_min - date.getMinutes()

    if (count_min < 0 && count_hour >= 1) {

        count_hour -= 1
        count_min += 60

    } else if(count_min < 0){

        count_min += 60
        
    }

    return (
        <div className="text-4xl py-0.5 pt-3">{count_hour}:{count_min}:{59 - date.getSeconds()}</div>
    )

}

export default CountDownTimes