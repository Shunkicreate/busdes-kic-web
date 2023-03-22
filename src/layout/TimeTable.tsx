import React, { useRef, useState } from 'react';
import { TimeTable, OneBusTime, unionDays, AllBusStopsType, TimeTableResponse, busStopListAtomType } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useEffect } from 'react'
import { ApiClient } from '../lib/api-client';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { fetchTimeTable, ShowOneDayBusTime } from '../functions/TimeTableFunctions';
import Arrow from '../images/Arrow.svg'
import ReverseButton from '../images/ReverseButton.svg'


export const ShowTimeTable = () => {
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const [currentFromBusStop, setCurrentFromBusStop] = useState<AllBusStopsType>(AllBusStopList[0].fr)
    const [currenToBusStop, setCurrenToBusStop] = useState<AllBusStopsType>(AllBusStopList[0].to)
    const timetableRefs = useRef<HTMLDivElement[]>([])

    const TimeTableHeader = ({ fr, to }: { fr: AllBusStopsType, to: AllBusStopsType }) => {
        // const [isRotated, setIsRotated] = useState(true);
        // const handleAnimationEnd = () => {
        //     setIsRotated(true);
        // };
        return (
            <div className='text-center relative'>
                <div className=''>
                    <div className='grid grid-cols-3'>
                        <div className=''>
                            <strong>出発</strong>
                        </div>
                        <div className=''>
                            <strong>{fr}</strong>
                        </div>
                    </div>
                    <div>
                        <img src={Arrow} alt="Arrow image" className='m-auto my-1' />
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className=''>
                            <strong>到着</strong>
                        </div>
                        <div className=''>
                            <strong>{to}</strong>
                        </div>
                    </div>
                </div>
                {/* <div
                    className={`absolute top-4 right-4 w-fit h-fit box ${isRotated ? 'rotated' : ''}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    dsfasfds
                    <img src={ReverseButton} alt="" />
                </div> */}
                <div className='absolute top-4 right-4 w-fit h-fit'>
                    <img src={ReverseButton} alt="" />
                </div>
            </div>
        )
    }

    //ここの処理を非同期で上手くリファクタする！！！！！
    useEffect(() => {
        AllBusStopList.forEach((BusStop) => {
            if (BusStop.TimeTableData === undefined) {
                fetchTimeTable(BusStop.fr, BusStop.to).then((timetable) => {
                    const addBusStopListAtom: busStopListAtomType = {
                        fr: BusStop.fr,
                        to: BusStop.to,
                        ShowTimeTable: true,
                        ShowBusCard: false,
                        TimeTableData: timetable,
                        BusCardData: undefined
                    }
                    addAllBusStopList([addBusStopListAtom])
                })
            }
        })
    }, [])

    const scrollToTimatable = (i: number) => {
        timetableRefs.current[i].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }

    return (
        <div className='mx-4'>
            <TimeTableHeader fr={currentFromBusStop} to={currenToBusStop}></TimeTableHeader>
            {
                AllBusStopList.map((BusStop, i) => {
                    return (
                        <div key={i} onClick={() => { scrollToTimatable(i) }}>{BusStop.to}</div>
                    )
                })
            }
            <div className="flex bg-white overflow-scroll whitespace-normal">
                {
                    AllBusStopList.map((BusStop, i) => {
                        return (
                            <div key={i} className='timetable' ref={(el) => {
                                if (el) {
                                    timetableRefs.current[i] = el
                                }
                            }}>
                                {BusStop.TimeTableData ? <ShowOneDayBusTime timeTable={BusStop.TimeTableData}></ShowOneDayBusTime> : <></>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
