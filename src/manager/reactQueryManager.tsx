import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { hashQueryKey, useQuery, useQueries, QueryClient } from 'react-query';
import { TimeTableResponse, AllBusStopsType, TimeTable, busStopListAtomType } from '../types/Bus.type';
import { SettingsManager } from './SettingsManager';
import { UseQueryResult } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';

export const queryClient = new QueryClient();

const useReactQuery = () => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const [queryKeys, setQueryKeys] = useState(AllBusStopList.map((AllBusStopData, i) => {
        return (
            {
                fr: AllBusStopData.fr,
                to: AllBusStopData.to
            }
        )
    }))
    const queryElem = queryKeys.map((value) => {
        console.log("value", value)
        console.log("url", `${baseURL}timetable?fr=${value.fr}&to=${value.to}`)
        return (
            {
                queryKey: ["timetable", value],
                queryFn: () => axios.get(`${baseURL}timetable?fr=${value.fr}&to=${value.to}`,).then((res: AxiosResponse) => res.data) as Promise<TimeTable>,
                UseQueryOptions: {
                    enabled: true,
                },
            }
        )
    })
    const reactQueryResults = useQueries(
        queryElem
    )

    const fetchData = () => {
        //AllBusStopListのうちundefinedのやつだけrefetchする仕様にする
        console.log("queryKeys", queryElem)
        // AllBusStopList.forEach((BusStop, i) => {
        //     if (BusStop.TimeTableData === undefined) {
        //         queryClient.invalidateQueries(["timetable", {
        //             fr: BusStop.fr,
        //             to: BusStop.to
        //         }])
        //     }
        // })
        reactQueryResults.forEach((reactQueryResult, i) => {
            if (reactQueryResult) {
                reactQueryResult.refetch().then((res) => {
                    // queryKeys.forEach((queryKey, i) => {
                    //     const data = queryClient.getQueriesData(["timetable", queryKey])
                    //     // console.log(queryKey, data)
                    // })
                    AllBusStopList.forEach((BusStop, i) => {
                        // https://bustimer.azurewebsites.net/timetable?fr=%E7%AB%8B%E5%91%BD%E9%A4%A8%E5%A4%A7%E5%AD%A6%E5%89%8D&to=%E4%BA%AC%E9%83%BD%E9%A7%85%E5%89%8D
                        // https://bustimer.azurewebsites.net/timetable?fr=京都駅前&to=立命館大学
                        if ((res.data)) {
                            // debugger; // eslint-disable-line no-debugger
                            // if ((BusStop.fr === fr) && (BusStop.to === to) && (res.data)) {
                            const addTimeTable: TimeTable = Object.assign({}, res.data)
                            const fr = BusStop.fr
                            const to = BusStop.to
                            // Object.assign(addTimeTable, { fr: fr })
                            // Object.assign(addTimeTable, { to: to })
                            addTimeTable.fr = fr
                            addTimeTable.to = to
                            debugger; // eslint-disable-line no-debugger
                            const addBusStopListAtom: busStopListAtomType = {
                                fr: fr,
                                to: to,
                                ShowTimeTable: true,
                                ShowBusCard: false,
                                TimeTableData: addTimeTable,
                                BusCardData: undefined
                            }
                            addAllBusStopList([addBusStopListAtom])
                        }
                    })
                }
                )
            }
        })
    }


    return (
        { queryClient, reactQueryResults, fetchData }
        // { queryClient, TimeTablereactQueryManager }
    );
}

export default useReactQuery;