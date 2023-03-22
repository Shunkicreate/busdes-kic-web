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
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const SwiperTab = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
    );
};

export const ShowTimeTable = () => {
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const [currentFromBusStop, setCurrentFromBusStop] = useState<AllBusStopsType>(AllBusStopList[0].fr)
    const [currenToBusStop, setCurrenToBusStop] = useState<AllBusStopsType>(AllBusStopList[0].to)
    const timetableRefs = useRef<HTMLDivElement[]>([])
    const [value, setValue] = useState(0);
    const swiperRef = useRef<SwiperRef>(null);
    const handleChange = (i: number) => {
        console.log('handle changed')
        setValue(i);
        changeSlide(i)
    }

    const changeSlide = (i: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(i)
        }
    };

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
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={(e, newTab) => handleChange(newTab)} centered>
                    {
                        AllBusStopList.map((BusStop, i) => {
                            return (
                                <Tab label={BusStop.to} key={i} value={i} ></Tab>
                            )
                        })
                    }
                </Tabs>
            </Box>
            <div className="flex bg-white overflow-scroll whitespace-normal">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={(swiper) => { handleChange(swiper.activeIndex) }}
                    ref={swiperRef}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        AllBusStopList.map((BusStop, i) => {
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
