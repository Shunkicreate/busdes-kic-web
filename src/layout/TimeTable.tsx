import { TimeTable, OneBusTime, unionDays, AllBusStopsType } from '../types/Bus.type';
import { SettingsManager } from '../manager/SettingsManager';
import { TimeTableManager } from '../manager/TimeTableManager';
import React from 'react';

const strictEntries = <T extends Record<string, any>>(
    object: T
): [keyof T, T[keyof T]][] => {
    return Object.entries(object);
};


const ShowOneRowBusTime = (oneBusTime: OneBusTime, index: number, hour: number) => {
    return (
        <div key={index} className="text-left pl-10">
            <div><span className='pr-3'>{zeroPadding(hour, 2)}:{zeroPadding(Number(oneBusTime.min), 2)}</span><span className='pr-3'>{oneBusTime.via}</span><span>{oneBusTime.bus_stop}</span></div>
        </div>
    )
}

const zeroPadding = (num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
}

const ShowOneCategoryDayBusTime = (dayBusTime: Map<unionDays, OneBusTime[]> | undefined) => {
    if (dayBusTime === undefined) {
        return (
            <div>undifined</div>
        )
    }
    const jsxBusTime: JSX.Element[] = []
    const entities = strictEntries(dayBusTime)
    entities.forEach((element, idx) => {
        const hour = element[0]
        const busArray = element[1]
        if (Array.isArray(busArray) && busArray.length > 0) {
            if ((typeof busArray !== "string" || typeof busArray !== "number") && busArray.length > 0) {
                const oneHourList = <div key={idx}><div>{String(hour)}時</div>{busArray.map((value: OneBusTime, index) => ShowOneRowBusTime(value, index, Number(hour)))}</div>
                jsxBusTime.push(oneHourList)
            }
        }
    });
    return (
        <>
            {jsxBusTime}
        </>
    )
}

export const SwapDestination = ({ start, goal }: { start: AllBusStopsType, goal: AllBusStopsType }) => {
    const swapDestination = SettingsManager().swapDestination
    const settings = SettingsManager()

    return (
        <div>
            <div onClick={() => { settings.swapDestination(settings.TimeTableParams.startStaSetting, settings.TimeTableParams.goalStaSetting, 'TimeTable') }}>0Swap</div>
            <div onClick={() => { swapDestination(start, goal, 'TimeTable') }}>1Swap</div>
        </div>
    )
}

export const ShowOneDayBusTime = (timeTable: TimeTable) => {
    return (
        <div>
            <div>
                from: {timeTable.from}
            </div>
            <div>
                to: {timeTable.to}
            </div>
            <div>
                {ShowOneCategoryDayBusTime(timeTable.weekdays)}
            </div>
            <div>
                {ShowOneCategoryDayBusTime(timeTable.holidays)}
            </div>
        </div>
    )
}

export const ShowTimeTable = () => {
    const [{ timeTables, timetableQueryResults, doFetch, selectBusStop }] = TimeTableManager()
    const settings = SettingsManager()

    return (
        <div className="m-4">
            <div className='bg-red-100'>
                <div>設定</div>
                <SwapDestination start={settings.TimeTableParams.startStaSetting} goal={settings.TimeTableParams.goalStaSetting} />
                <div onClick={() => { settings.swapDestination(settings.TimeTableParams.startStaSetting, settings.TimeTableParams.goalStaSetting, 'TimeTable') }}>Swap</div>
                <div>{settings.TimeTableParams.goalStaSetting}</div>
                <div>{settings.TimeTableParams.goalStaSettings}</div>
                <div>{settings.TimeTableParams.startStaSetting}</div>
                <div>{settings.TimeTableParams.startStaSettings}</div>
            </div>
            {selectBusStop()}
            <div onClick={() => { doFetch() }} className="bg-blue-100">
                検索！！！！
            </div>
            <div>
                {timetableQueryResults.map((timetableQueryResult, i) => {
                    const timeTable = timetableQueryResult.data
                    if (timeTable) {
                        return (
                            <div key={i}>
                                {ShowOneDayBusTime(timeTable)}
                            </div>
                        )

                    }
                })}
            </div>
            {
                (() => {
                    if (timeTables === undefined) {
                        return (
                            <div>検索してください</div>
                        )
                    }
                    // else if (timetableQueryResults.isLoading) {
                    //     return (
                    //         <div>検索中...</div>
                    //     )
                    // }
                    // else if (timetableQueryResults.isError) {
                    //     return (
                    //         <div>Error. Try again a few minutes later</div>
                    //     )
                    // }
                    else {
                        return (
                            <div className='flex w-max'>
                                {timeTables.map((timeTable, idx) => {
                                    return (
                                        <div key={idx}>
                                            {ShowOneDayBusTime(timeTable)}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}
