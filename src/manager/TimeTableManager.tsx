import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays, AllBusStops, TimeTableDataStoreType } from '../types/Bus.type';

export const TimeTableManager = () => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const [startSta, setStartSta] = useState<AllBusStops>('京都駅前')
    const [goalSta, setGoalSta] = useState<AllBusStops>('立命館大学')
    // const [url, setUrl] = useState(baseURL + "timetable?fr=" + startSta + "&to=" + goalSta)
    const [timeTable, setTimeTable] = useState<TimeTable>()
    const [TimeTableDataStore, setTimeTableDataStoreType] = useState<TimeTableDataStoreType>()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const checkStation = () => {
        if ((startSta === "立命館大学前" || goalSta === "立命館大学") && !(startSta === "立命館大学前" && goalSta === "立命館大学")) {
            return true
        }
        return false
    }
    
    const fetchData = async (url:string) => {
        setIsLoading(true)
        await axios.get(
            url,
        )
            .then((res: AxiosResponse<TimeTable>) => {
                const { data, status } = res;
                setTimeTable(data);
                setIsLoading(false)
                setCount(count + 1)
                const appEndData = TimeTableDataStore
                // appEndData?.busData["三条京阪前"]
                // const appEndData = {
                //     startSta: {

                //     }
                // }
            })
            .catch((e: AxiosError<{ error: string }>) => {
                console.log(e.message);
                setIsError(false);
            })
    }

    const doFetch = () => {
        if(checkStation()){
            const url = baseURL + "timetable?fr=" + startSta + "&to=" + goalSta
            fetchData(url)
        }
        else{
            return(false)
        }
    }

    return (
        [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }]
    )
}