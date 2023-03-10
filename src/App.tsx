import BusCard from './layout/BusCard';
import { ShowTimeTable } from './layout/TimeTable';
import { useState } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import Settings from './layout/Settings';
import { RecoilRoot } from 'recoil';
import React from 'react';

const App = () => {
    const [mode, setMode] = useState<mode>('NextBus')
    return (
        <div className="App">
            <RecoilRoot>
                <Header></Header>
                <div className='border-2' style={{ background: "white" }}>
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
                                    <Settings></Settings>
                                )
                            }
                            else {
                                return (
                                    <></>
                                )
                            }
                        })()
                    }
                </div>
                <Footer setMode={setMode} currentMode={mode}></Footer>
            </RecoilRoot>
        </div>
    );
}

export default App;
