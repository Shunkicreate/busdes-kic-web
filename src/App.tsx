import BusCard from './layout/BusCard';
import { ShowTimeTable } from './layout/TimeTable';
import logo from './logo.svg'
import { useState } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { TimeTableManager } from './manager/TimeTableManager';
import { unionDays } from './types/Bus.type';
import React from 'react';

const App = () => {
    // const [{ timeTable, timeTables, isLoading, isError, count, doFetch, setStartSta, setGoalSta }] = TimeTableManager()
    const searchData = [["京都駅前", "立命館大学"], ["立命館大学前", "京都駅"]]
    const [mode, setMode] = useState<mode>('NextBus')
    return (
        <div className="App">
            <Header></Header>
            <body className='border-2' style={{ background: "white" }}>
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
                                    <ShowTimeTable></ShowTimeTable>
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
                                    ShowTimeTable(timeTable)
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
            </body>
            <Footer setMode={setMode} currentMode={mode}></Footer>
        </div>
    );
}

export default App;
