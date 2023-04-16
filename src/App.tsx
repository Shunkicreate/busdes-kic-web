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
import { getLocalStrageBusStops, setLocalStrageBusStops } from './functions/LocalStrageFuction';
import { ApproachInfos } from './types/Bus.type';

const localStrageInit = () => {
    const LocalStrageBusStops = getLocalStrageBusStops()
    if (!LocalStrageBusStops || LocalStrageBusStops?.length === 0) {
        const Empty: ApproachInfos = {
            'approach_infos': [
            ]
        }
        setLocalStrageBusStops({
            fr: '立命館大学前',
            to: '京都駅前',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: Empty,
        })
        setLocalStrageBusStops({
            fr: '京都駅前',
            to: '立命館大学',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: Empty,
        })
        location.reload()
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
