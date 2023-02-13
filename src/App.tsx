import BusCard from './layout/BusCard';
import { useTimeTableApi, showTimeTable } from './TimeTable';
import logo from './logo.svg'
import { useState } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ScrollBar } from './layout/ScrollBar'
import React from 'react';

const App = () => {
    const [{ timeTable, isLoading, isError, count, doFetch, setStartSta, setGoalSta }] = useTimeTableApi()
    // let idx = 0
    const searchData = [["京都駅前", "立命館大学"], ["立命館大学前", "京都駅"]]
    const StationName = ['立命館大学前', '北野白梅町', '西ノ京円町', '四条大宮', '二条駅前', '三条京阪前'];
    const [mode, setMode] = useState<mode>('NextBus')
    return (
        <div className="App">
            <Header></Header>
            <div className='border-2' style={{ background: "white" }}>
                {mode}
                {
                    (() => {
                        if (mode === "NextBus") {
                            return (
                                <BusCard></BusCard>
                            )
                        }
                        else if (mode === "TimeTable") {
                            return (
                                <div>
                                    <ScrollBar stationName={StationName}></ScrollBar>
                                    TimeTable
                                </div>
                            )
                        }
                        else if (mode === "Settings") {
                            return (
                                <div>
                                    settings
                                </div>
                            )
                        }
                        else {
                            return (
                                <></>
                            )
                        }
                    })()
                }
                {/* <div>
                    {count}
                </div>
                <div>
                    <button onClick={() => doFetch()}>検索!</button>
                </div>
                {(() => {
                    if (mode === "NextBus") {
                        return (
                            <BusCard></BusCard>
                        )
                    }
                    else if (mode === "TimeTable") {
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
                <div className='absolute bottom-0 text-center w-full my-5'>
                    <button onClick={() => { setMode("NextBus") }}>Next bus</button>
                    <button onClick={() => { setMode("TimeTable") }}>Timetable</button>
                    <div className='bg-stone-100'>
                        AdSense
                    </div>
                </div> */}
            </div>
            <Footer setMode={setMode} currentMode={mode}></Footer>
        </div>
    );
}

export default App;
