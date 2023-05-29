import RoundTripCard from './layout/BuscardRoundTrip'
import { TimeTableWrapper } from './layout/TimeTable';
import { useState, useEffect } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import Settings from './layout/Settings';
import { RecoilRoot } from 'recoil';
import React from 'react';
import './App.css'
import { getLocalStrageBusStops, initLocalStrageBusStops } from './functions/LocalStrageFuction';
import analytics from './lib/firebase';

const localStrageInit = () => {
    const LocalStrageBusStops = getLocalStrageBusStops()
    if (!LocalStrageBusStops) {
        //ローカルストレージにデータがない状態でロードされたら京都駅のデータを追加．
        initLocalStrageBusStops()
    }
    else if (LocalStrageBusStops?.length === 0) {
        //入力が空の状態でロードされたらそのまま何もしない．
        null
    }
}

const getModeParam = () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const defaultMode = params.get('mode') as mode | null
    return defaultMode
}

const BackGround = () => {
    return (
        <div className='bg-bgColor fixed w-full h-full -z-10'></div>
    )
}

const App = () => {
    localStrageInit()
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

    useEffect(() => {
        analytics
    }, []);

    const handlePopstate = () => {
        const returnModeParam = getModeParam()
        if (returnModeParam) {
            setMode(returnModeParam)
        }
    }

    return (
        <div className='App bg-bgColor'>
            <BackGround />
            <RecoilRoot>
                <Header></Header>
                <div className='pb-28 mt-16'>
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
                                        <TimeTableWrapper></TimeTableWrapper>
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
