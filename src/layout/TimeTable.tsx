import React, { useRef, useState } from 'react';
import { AllBusStopsType, busStopListAtomType, ApproachInfos } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useEffect } from 'react'
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { fetchTimeTable, ShowOneDayBusTime } from '../functions/TimeTableFunctions';
import Arrow from '../images/Arrow.svg'
import ReverseButton from '../images/ReverseButton.svg'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export const ShowTimeTable = () => {
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const [currentFromBusStop, setCurrentFromBusStop] = useState<AllBusStopsType>(AllBusStopList[0].fr)
    const [currenToBusStop, setCurrenToBusStop] = useState<AllBusStopsType>(AllBusStopList[0].to)
    const timetableRefs = useRef<HTMLDivElement[]>([])
    const [value, setValue] = useState(0);
    const swiperRef = useRef<SwiperRef>(null);

    const handleChange = (i: number) => {
        // debugger; // eslint-disable-line no-debugger
        changeSlide(i);
        setValue(i);

        setCurrenToBusStop(switchShowElem()[i].to);
        setCurrentFromBusStop(switchShowElem()[i].fr);
    }

    const changeSlide = (i: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(i)
        }
    };

    const TimeTableHeader = ({ fr, to }: { fr: AllBusStopsType, to: AllBusStopsType }) => {
        return (
            <div className='w-full text-center fixed top-12 pt-4 z-50 bg-main'>
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
                <div className='absolute top-8 right-8 w-fit h-fit'>
                    <img src={ReverseButton} alt="" onClick={switchBusStop} />
                </div>
            </div >
        )
    }

    const SelectBox = () => {
        return (
            <div className='fixed top-32 mt-2 z-40 bg-main w-full'>
                <Box sx={{ width: '100%', indicatorColor: '#FFE600', color: '#FFE600', fontWeight: 'bolder' }}>
                    <Tabs
                        value={value}
                        onChange={(e, newTab) => handleChange(newTab)}
                        TabIndicatorProps={{ style: { backgroundColor: '#000' } }}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        sx={{
                            color: '#000',
                            fontWeight: 'bolder',
                        }}
                    >
                        {
                            switchShowElem().map((BusStop, i) => {
                                const label = fromIsRits(BusStop.fr) ? BusStop.to : BusStop.fr
                                return (
                                    <Tab
                                        label={label}
                                        key={i}
                                        value={i}
                                        sx={{
                                            color: '#0000004d',
                                            fontWeight: 'bolder',
                                            '&.Mui-selected': {
                                                color: '#000',
                                                borderColor: 'transparent',
                                            },
                                        }}
                                    ></Tab>
                                )
                            })
                        }
                    </Tabs>
                </Box>
            </div>
        )
    }

    const fromIsRits = (BusStop: AllBusStopsType) => {
        if (BusStop === '立命館大学前') {
            return true
        }
        return false
    }

    const toIsRits = (BusStop: AllBusStopsType) => {
        if (BusStop === '立命館大学') {
            return true
        }
        return false
    }

    const switchShowElem = () => {
        if (fromIsRits(currentFromBusStop)) {
            return AllBusStopList.filter((BusStop) => fromIsRits(BusStop.fr))
        }
        else if (toIsRits(currenToBusStop)) {
            return AllBusStopList.filter((BusStop) => toIsRits(BusStop.to))
        }
        else {
            return []
        }
    }

    const swapRits = (routeElem: AllBusStopsType, mode: 'fr' | 'to') => {
        let returnSta: AllBusStopsType = routeElem
        if (mode === 'fr') {
            if (returnSta === '立命館大学前') {
                returnSta = '立命館大学'
            }
        }
        else if (mode === 'to') {
            if (returnSta === '立命館大学') {
                returnSta = '立命館大学前'
            }
        }
        return (returnSta)
    }

    const switchBusStop = () => {
        setCurrentFromBusStop(swapRits(currenToBusStop, 'to'));
        setCurrenToBusStop(swapRits(currentFromBusStop, 'fr'));
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
                        ShowBusCard: true,
                        TimeTableData: timetable,
                        BusCardData: BusStop.BusCardData
                    }
                    addAllBusStopList([addBusStopListAtom])
                })
            }
        })
    }, [])

    return (
        <div className='bg-bgColor'>
            <TimeTableHeader fr={currentFromBusStop} to={currenToBusStop}></TimeTableHeader>
            <SelectBox></SelectBox>
            <div className="mt-28 mx-4 flex overflow-scroll whitespace-normal">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={(swiper) => { handleChange(swiper.activeIndex) }}
                    ref={swiperRef}
                >
                    {
                        switchShowElem().map((BusStop, i) => {
                            return (
                                <SwiperSlide key={i} >
                                    <div className='timetable' ref={(el) => {
                                        if (el) {
                                            timetableRefs.current[i] = el
                                        }
                                    }}>
                                        {BusStop.TimeTableData ? <ShowOneDayBusTime timeTable={BusStop.TimeTableData}></ShowOneDayBusTime> : <></>}
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}
