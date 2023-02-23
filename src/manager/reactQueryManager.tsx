import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { hashQueryKey, useQuery, useQueries, QueryClient } from 'react-query';
import { TimeTableResponse, AllBusStopsType } from '../types/Bus.type';
import { SettingsManager } from './SettingsManager';
import { UseQueryResult } from 'react-query';
export const queryClient = new QueryClient();

const reactQueryManager = () => {
    const baseURL = "https://busdes-kic.mercy34.workers.dev/";

    const TimeTablereactQueryManager = (() => {
        // const [startSta, setStartSta] = useState<AllBusStopsType>('立命館大学前')
        // const [goalSta, setGoalSta] = useState<AllBusStopsType>('京都駅前')
        const { startStaSettings, goalStaSettings } = SettingsManager().TimeTableParams
        // const [queryKeys, setQueryKeys] = useState([["timeTableQuery", { fr: startStaSetting }, { to: goalStaSetting }]])
        const [queryKeys, setQueryKeys] = useState(startStaSettings.map((startStaSetting, i) => {
            return (
                {
                    fr: startStaSetting,
                    to: goalStaSettings[i]
                }
            )
        }))
        // let url = baseURL + "timetable?fr=" + startStaSetting + "&to=" + goalStaSetting
        // function fetchTodoList({ queryKey }: {
        //     queryKey: (string | {
        //         fr: AllBusStopsType;
        //         to?: undefined;
        //     } | {
        //         to: AllBusStopsType;
        //         fr?: undefined;
        //     })[]
        // }) {
        //     const a = queryKey
        //     fetch(baseURL).then((res) =>
        //         res.json()
        //     )
        //     // return Promise()
        // }
        // const fetchPost = () => {
        //     fetch(baseURL).then((res) =>
        //         res.json()
        //     )
        //     return Promise
        // }
        const myHeaders = new Headers({
            'Content-Type': 'text/plain',
            'X-Custom-Header': 'ProcessThisImmediately',
            'sec-fetch-site': 'none'
        });
        const queryElem = queryKeys.map((value) => {
            return (
                {
                    queryKey: ["timetable", value],
                    queryFn: () => fetch(`${baseURL}timetable?fr=${value.fr}&to=${value.to}`, { mode: 'no-cors', method: 'GET' }).then((res) => res.json()) as Promise<TimeTableResponse>,
                    UseQueryOptions: {
                        enabled: false,
                    },
                }
            )
        })

        const timetableQueryResults = useQueries(
            queryElem
        )
        // queryKey: 'timeTableQuery',
        // queryFn: () =>
        //     fetch(url).then((res) =>
        //         res.json()
        //     )
        // )
        const handleReset = async () => {
            console.log("start refetch")
            await queryClient.refetchQueries().then(
                () => {
                    console.log("refetch")
                    console.log(timetableQueryResults)
                }
            )
            // url = baseURL + "timetable?fr=" + startStaSetting + "&to=" + goalStaSetting
            // console.log(url)
            // await result.refetch()
        }

        const addQueryKey = (fr: AllBusStopsType, to: AllBusStopsType) => {
            setQueryKeys([...queryKeys, { fr: fr, to: to }])
        }

        return (
            { timetableQueryResults, handleReset, addQueryKey }
        )
    })()

    return (
        { queryClient, TimeTablereactQueryManager }
    );
}

export default reactQueryManager;