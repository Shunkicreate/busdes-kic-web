import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApproachInfos, TimeTable, OneBusTime } from '../Bus.type';
import BusCard from './BusCard';

const ShowOneBusTime = ({ oneBusTime }: { oneBusTime: OneBusTime }) => {
    return (
        <div>
            <div>{oneBusTime.Min}</div>
            <div>{oneBusTime.Via}</div>
            <div>{oneBusTime.BusStop}</div>
        </div>
    )

}

const ShowDayBusTime = (dayBusTime: Map<string, OneBusTime[]>) => {
    // type dayBusTimeKey = keyof DayBusTime
    // const keys = Object.keys(dayBusTime) as dayBusTimeKey[]
    // debugger
    const keys = [...dayBusTime.keys()]
    return (
        <>
            {keys.map((key) => {
                const oneBusTimes = dayBusTime.get(key)
                if (oneBusTimes !== undefined) {
                    console.log("oneBusTimes", oneBusTimes)
                }
                return (
                    <div></div>
                )
            })}
            {/* {(Object.keys(dayBusTime) as (keyof DayBusTime)[]).map((key) => {
                const data = dayBusTime[key]
                console.log(data);
                return (
                    data?.map((oneBusTime: OneBusTime, idx: number) => {
                        return (
                            ShowOneBusTime({ oneBusTime })
                        )

                    })
                )
            })} */}
            {/* {keys.map((key:string, i:number) => {

            })} */}
        </>
    )

}

const useTimeTableApi = () => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const [startSta, setStartSta] = useState('京都駅前')
    const [goalSta, setGoalSta] = useState('立命館大学')
    const [url, setUrl] = useState(baseURL + "timetable?fr=" + startSta + "&to=" + goalSta)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const doFetch = () => {
        setUrl(baseURL + "timetable?fr=" + startSta + "&to=" + goalSta)
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await axios.get(
                url,
            )
                .then((res: AxiosResponse<TimeTable>) => {
                    const { data, status } = res;
                    setTimeTable(data);
                    setIsLoading(false)
                    console.log(data)
                    setCount(count + 1)
                })
                .catch((e: AxiosError<{ error: string }>) => {
                    console.log(e.message);
                    setIsError(false);
                })
        }
        fetchData()
    }, [url]);
    return (
        [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }]
    )
}

const App = () => {
    const [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }] = useTimeTableApi()
    return (
        <div className="App">
            <BusCard></BusCard>
            <body className='border-2' style={{ background: "white" }}>
                <div>
                    {count}
                </div>
                <button onClick={() => doFetch()}>検索!</button>
                <div>
                    <input type="text" placeholder='from' onChange={event => setStartSta(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='to' onChange={event => setGoalSta(event.target.value)} />
                </div>
                {isError && <div>Something went wrong ...</div>}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>data</div>
                )}
                {/* {timeTable === undefined ? <></> : ShowDayBusTime(timeTable.Weekdays)} */}
                {/* {timeTable?ShowDayBusTime(timeTable.Saturdays):<></>}
                {timeTable?ShowDayBusTime(timeTable.Holidays):<></>} */}
                <div className='bg-gray-300'>
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
