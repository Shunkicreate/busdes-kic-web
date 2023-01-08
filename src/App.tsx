import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { TimeTable, OneBusTime, unionDays } from '../Bus.type';
import BusCard from './BusCard';
import logo from './logo.svg'

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


const ShowOneBusTime = (oneBusTime: OneBusTime, index: number, hour:number ) => {
    return (
        <div key={index} className="text-left pl-10">
            <div><span className='pr-3'>{zeroPadding(hour, 2)}:{zeroPadding(Number(oneBusTime.min), 2)}</span><span className='pr-3'>{oneBusTime.via}</span><span>{oneBusTime.bus_stop}</span></div>
        </div>
    )
}

const zeroPadding = (num: number, len: number) => {
    return( Array(len).join('0') + num).slice(-len)
}

const ShowDayBusTime = (dayBusTime: Map<unionDays, OneBusTime[]> | undefined) => {
    if (dayBusTime === undefined) {
        return (
            <div>undifined</div>
        )
    }
    const jsxBusTime: JSX.Element[] = []
    const entities = strictEntries(dayBusTime)
    entities.forEach(element => {
        const hour = element[0]
        const busArray = element[1]
        if(Array.isArray(busArray) && busArray.length > 0){
            if((typeof busArray !== "string" || typeof busArray !== "number") && busArray.length > 0){
                const oneHourList = <div><div>{String(hour)}時</div>{busArray.map( (value: OneBusTime, index) => ShowOneBusTime(value, index, Number(hour)))}</div>
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

const showStrJson = (json: TimeTable | undefined) => {
    if (json === undefined) {
        return (
            <div>undifined</div>
        )
    }
    return (
        <div className="m-4">
            <div>
                {ShowDayBusTime(json.weekdays)}
            </div>
            <div>
                {ShowDayBusTime(json.holidays)}
            </div>
            <div>
                {ShowDayBusTime(json.saturdays)}
            </div>
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
