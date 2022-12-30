import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays } from '../Bus.type';
import BusCard from './BusCard';
import { JsxElement } from 'typescript';
import logo from './logo.svg'
import { isArray } from 'util';

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

const strictEntries = <T extends Record<string, any>>(
	object: T
): [keyof T, T[keyof T]][] => {
	return Object.entries(object);
};

const ShowOneBusTime = ({ oneBusTime }: { oneBusTime: OneBusTime }) => {
    return (
        <div>
            <div>{oneBusTime.Min}</div>
            <div>{oneBusTime.Via}</div>
            <div>{oneBusTime.BusStop}</div>
        </div>
    )
}

const ShowDayBusTime = (dayBusTime: Map<unionDays, OneBusTime[]> | undefined) => {
    if (dayBusTime === undefined) {
        return (
            <div>undifined</div>
        )
    }
    // const keys = [...dayBusTime.keys()]
    //https://ribbit.konomi.app/blog/ts-strict-object-entries
    //明日頑張れ！！！！！！！！！！
    const DAYS:unionDays[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const jsxBusTime: JSX.Element[] = []
    debugger
    const entities = strictEntries(dayBusTime)
    entities.forEach(element => {
        console.log(element)
        const hour = element[0]
        const busArray = element[1]
        if(Array.isArray(busArray)){
            console.log(busArray.length)
            if((typeof busArray !== "string" || typeof busArray !== "number") && busArray.length > 0){
                console.log("hehe", busArray)
            }
        }
        console.log(typeof busArray, Array.isArray(busArray))
        // if( typeof busArray === Array && busArray.length > 0){

        // }
        console.log()

    });
    for (const [key, value] of strictEntries(dayBusTime)) {
        console.log(`${String(key)}: ${value}`)
        console.log(value)
        // const oneBusTimes = 
        jsxBusTime.push(<div>{String(key)}</div>)
    }
    // DAYS.forEach((n) => {
    //     if( n in dayBusTime){
    //         console.log(dayBusTime.n)
    //     }
    // })
    for (const element of dayBusTime) {
        console.log(element);
    }
    dayBusTime.forEach((value, idx) => {
        console.log(idx, value)
        // jsxBusTime.push(
        //     (() => {
        //         return (value.map((oneBusTime) => {
        //             return (ShowOneBusTime({ oneBusTime }))
        //         }))
        //     })()
        // )


    })
    // for (const [key, value] of dayBusTime) {
    //     console.log(key, value);
    // }
    return (
        <>
            {/* {keys.map((key) => {
                const oneBusTimes = dayBusTime.get(key)
                if (oneBusTimes !== undefined) {
                    console.log("oneBusTimes", oneBusTimes)
                    return (
                        <div>
                            {oneBusTimes.map((oneBusTime: OneBusTime, idx) => {
                                return (
                                    ShowOneBusTime({ oneBusTime })
                                )
                            })}
                        </div>
                    )
                }
                return (
                    <div></div>
                )
            })} */}
            <div>hehehe</div>
        </>
    )
}

const showStrJson = (json: TimeTable | undefined) => {
    if (json === undefined) {
        return (
            <div>undifined</div>
        )
    }
    // const keys = [...json.keys()]
    // console.log(keys)
    // console.log(json.get("Weekdays"))
    // debugger
    console.log(typeof json)
    console.log("json.Weekdays", json.weekdays)
    console.log("hehehe", json["weekdays"])
    return (
        <div className='bg-stone-200'>
            <div>
                {ShowDayBusTime(json.weekdays)}
            </div>
            {JSON.stringify(json)}
        </div>
    )
}

const App = () => {
    const [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }] = useTimeTableApi()
    let idx = 0
    const searchData = [["京都駅前", "立命館大学"], ["立命館大学前", "京都駅"]]
    return (
        <div className="App">
            <img src={logo}></img>
            <BusCard></BusCard>
            <body className='border-2' style={{ background: "white" }}>
                <div>
                    {count}
                </div>
                <div>
                    <button onClick={() => doFetch()}>検索!</button>
                </div>
                <div>
                    <button onClick={() => { idx++; setStartSta(searchData[idx % 2][0]); setGoalSta(searchData[idx % 2][1]); }}>スワッピング</button>
                </div>
                <div>
                    <input type="text" placeholder='from' defaultValue={"立命館大学"} onChange={event => setStartSta(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='to' defaultValue={"京都駅前"} onChange={event => setGoalSta(event.target.value)} />
                </div>
                {isError && <div>Something went wrong ...</div>}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    // <div>{JSON.stringify(timeTable)}</div>
                    showStrJson(timeTable)
                )}
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
