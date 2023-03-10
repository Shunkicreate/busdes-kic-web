import React from 'react';
import { TimeTableResponse, AllBusStopsType, TimeTable, busStopListAtomType } from '../types/Bus.type';
import { hashQueryKey, useQuery, useQueries, QueryClient } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { ShowOneDayBusTime } from '../layout/TimeTable';

const useTimeTable = ({ fr, to }: { fr: AllBusStopsType, to: AllBusStopsType }) => {
    const baseURL = "https://bustimer.azurewebsites.net/";
    const url = `${baseURL}timetable?fr=${fr}&to=${to}`
    const { data, error, isLoading, isError, isSuccess } = useQuery(["timetable", "fr-" + fr + "to-" + to], () => axios.get(url).then((res: AxiosResponse) => res.data) as Promise<TimeTable>)
    if (isLoading) {
        return (
            <div>
                loading....
            </div>
        )
    }
    else if (isError) {
        return <div>An error occurred</div>;
    }
    else if (isSuccess && data) {
        return (
            <div>
                <ShowOneDayBusTime timeTable={data}></ShowOneDayBusTime>
            </div>
        )
    }
    else return (
        <div></div>
    )

}

export default useTimeTable