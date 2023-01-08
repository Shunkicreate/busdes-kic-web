import BusCard from './BusCard';
import { useTimeTableApi, showTimeTable } from './TimeTable';
import logo from './logo.svg'

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
                    showTimeTable(timeTable)
                )}
            </body>
        </div>
    );
}

export default App;
