import { TimeTable, OneBusTime, unionDays } from '../types/Bus.type';
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

const ShowOneDayBusTime = (timeTable: TimeTable) => {
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
    const [{ timeTables, isLoading, isError, doFetch, selectBusStop }] = TimeTableManager()
    return (
        <div className="m-4">
            {selectBusStop()}
            <div onClick={() => { doFetch() }} className="bg-blue-100">
                検索！！！！
            </div>
            {
                (() => {
                    if (timeTables === undefined) {
                        return (
                            <div>検索してください</div>
                        )
                    }
                    else if (isLoading) {
                        return (
                            <div>検索中...</div>
                        )
                    }
                    else if (isError) {
                        return (
                            <div>Error. Try again a few minutes later</div>
                        )
                    }
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
