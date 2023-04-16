import BusCard from './layout/BusCard';
import RoundTripCard from './layout/BuscardRoundTrip'
import { ShowTimeTable } from './layout/TimeTable';
import { useState, useEffect } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import Settings from './layout/Settings';
import { RecoilRoot } from 'recoil';
import React from 'react';
import './App.css'

const getModeParam = () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const defaultMode = params.get('mode') as mode | null
    return defaultMode
}

const App = () => {
    let defaultMode = getModeParam()
    if (defaultMode === null) {
        defaultMode = 'NextBus'
    }
    const [mode, setMode] = useState<mode>(defaultMode as mode)
    
    useEffect(() => {
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);
    
    const handlePopstate = () => {
        const returnModeParam = getModeParam()
        if (returnModeParam) {
            setMode(returnModeParam)
        }
    }

    return (
        <div className='App bg-white'>
            <RecoilRoot>
                <Header></Header>
                <div className='pb-20'>
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
                <Footer setMode={setMode} currentMode={mode}></Footer>
            </RecoilRoot>
        </div>
    );
}

export default App;
