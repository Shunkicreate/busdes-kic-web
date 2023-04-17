import BusCard from './layout/BusCard';
import RoundTripCard from './layout/BuscardRoundTrip'
import { TimeTableWrapper } from './layout/TimeTable';
import { useState } from 'react'
import { mode } from './types/main.type';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import Settings from './layout/Settings';
import { RecoilRoot } from 'recoil';
import React from 'react';
import './App.css'
import { getLocalStrageBusStops, initLocalStrageBusStops, setLocalStrageBusStops } from './functions/LocalStrageFuction';
import { ApproachInfos } from './types/Bus.type';

const localStrageInit = () => {
    const LocalStrageBusStops = getLocalStrageBusStops()
    if (!LocalStrageBusStops) {
        //ローカルストレージにデータがない状態でロードされたら京都駅のデータを追加．
        initLocalStrageBusStops()
    }
    else if (LocalStrageBusStops?.length === 0){
        //入力が空の状態でロードされたらそのまま何もしない．
        null
    }
}

const App = () => {
    const [mode, setMode] = useState<mode>('NextBus')
    localStrageInit()
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
