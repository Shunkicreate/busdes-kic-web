import BusCard from './layout/BusCard';
import RoundTripCard from './layout/BuscardRoundTrip'
import { ShowTimeTable } from './layout/TimeTable';
import { useState } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import Settings from './layout/Settings';
import { RecoilRoot } from 'recoil';
import React from 'react';
import './App.css'
import DisplayAddButton from './atom/DisplayAddButton';

const App = () => {
    const [mode, setMode] = useState<mode>('NextBus')
    return (
        <div className='App bg-white'>
            <RecoilRoot>
                <Header></Header>
                <div className=''>
                    {
                        (() => {
                            if (mode === 'NextBus') {
                                return (
                                    <RoundTripCard />
                                )
                            }
                            else if (mode === 'TimeTable') {
                                return (
                                    <div>
                                        <ShowTimeTable></ShowTimeTable>
                                    </div>
                                )
                            }
                            else if (mode === 'Settings') {
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
                <DisplayAddButton currentMode={mode}></DisplayAddButton>
                <Footer setMode={setMode} currentMode={mode}></Footer>
            </RecoilRoot>
        </div>
    );
}

export default App;
