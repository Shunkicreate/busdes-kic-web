import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApproachInfos, TimeTable, DayBusTime, OneBusTime } from '../Bus.type';

const ShowOneBusTime = ({ oneBusTime }: { oneBusTime: OneBusTime }) => {
    return (
        <div>
            <div>{oneBusTime.Min}</div>
            <div>{oneBusTime.Via}</div>
            <div>{oneBusTime.BusStop}</div>
        </div>
    )

}

const ShowDayBusTime = (dayBusTime: DayBusTime) => {
    // type dayBusTimeKey = keyof DayBusTime
    // const keys = Object.keys(dayBusTime) as dayBusTimeKey[]
    // debugger
    return (
        <>
            {(Object.keys(dayBusTime) as (keyof DayBusTime)[]).map((key) => {
                const data = dayBusTime[key]
                console.log(data);
                return (
                    data?.map((oneBusTime: OneBusTime, idx: number) => {
                        return (
                            ShowOneBusTime({ oneBusTime })
                        )

                    })
                )
            })}
            {/* {keys.map((key:string, i:number) => {

            })} */}
        </>
    )

}

const App = () => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const [timeTable, setTimeTable] = useState<TimeTable>()
    // let JSxDayBusTime = <div></div>
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching...", baseURL + "timetable?fr=京都駅前&to=立命館大学")
            const result = await axios.get(
                baseURL + "timetable?fr=京都駅前&to=立命館大学",
            )
                .then((res: AxiosResponse<TimeTable>) => {
                    const { data, status } = res;
                    setTimeTable(data);
                    console.log(data)
                })
                .catch((e: AxiosError<{ error: string }>) => {
                    // エラー処理
                    console.log(e.message);
                })
        }
        fetchData()
    }, []);



    return (
        <div className="App">
            <body style={{ background: "red" }}>
                {timeTable === undefined ? <></> : ShowDayBusTime(timeTable.Weekdays)}
                {/* {timeTable?ShowDayBusTime(timeTable.Saturdays):<></>}
                {timeTable?ShowDayBusTime(timeTable.Holidays):<></>} */}
                <div>
                    busdes
                </div>
                <div>
                    南草津→立命館大学
                </div>
                <div>
                    <div>
                        6時
                        <div>
                            <span>06:57</span><span>パナソニック 東口経由</span>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default App;
