import BusCard from './layout/BusCard';
import { useTimeTableApi, showTimeTable } from './TimeTable';
import logo from './logo.svg'
import { useState } from 'react'

const App = () => {
    const [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }] = useTimeTableApi()
    let idx = 0
    const searchData = [["京都駅前", "立命館大学"], ["立命館大学前", "京都駅"]]
    const [mode, setMode] = useState('Next bus')
    return (
        <div className="App">
            <body className='border-2' style={{ background: "white" }}>
                <div>
                    {count}
                </div>
                <div>
                    <button onClick={() => doFetch()}>検索!</button>
                </div>
                {(() => {
                    if (mode === "Next bus") {
                        return (
                            <BusCard></BusCard>
                        )
                    }
                    else if (mode === "Timetable") {
                        return (
                            <>
                                {isError && <div>Something went wrong ...</div>}
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    showTimeTable(timeTable)
                                )}
                            </>
                        )
                    }
                })()}
                {/* <div>
                    <button onClick={() => { idx++; setStartSta(searchData[idx % 2][0]); setGoalSta(searchData[idx % 2][1]); }}>スワッピング</button>
                </div>
                <div>
                    <input type="text" placeholder='from' defaultValue={"立命館大学"} onChange={event => setStartSta(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder='to' defaultValue={"京都駅前"} onChange={event => setGoalSta(event.target.value)} />
                </div> */}
                <div className='absolute bottom-0 text-center w-full my-5'>
                    <button onClick={() => { setMode("Next bus") }}>Next bus</button>
                    <button onClick={() => { setMode("Timetable") }}>Timetable</button>
                    <div className='bg-stone-100'>
                        AdSense
                    </div>
                </div>
            </body>
        </div>
    );
}

export default App;
