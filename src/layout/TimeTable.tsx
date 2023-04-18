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

const switchShowElem = (currentFromBusStop: AllBusStopsType, currenToBusStop: AllBusStopsType, AllBusStopList: busStopListAtomType[]) => {
    if (fromIsRits(currentFromBusStop)) {
        return AllBusStopList.filter((BusStop) => fromIsRits(BusStop.fr) && BusStop.ShowTimeTable)
    }
    else if (toIsRits(currenToBusStop)) {
        return AllBusStopList.filter((BusStop) => toIsRits(BusStop.to) && BusStop.ShowTimeTable)
    }
    else {
        return []
    }
}

const TimeTableHeader = ({ fr, to, switchBusStop }: { fr: AllBusStopsType, to: AllBusStopsType, switchBusStop: () => void }) => {
    return (
        <div className='w-full text-center top-12 pt-4 bg-main'>
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
            <div className='absolute top-8 right-8 w-fit h-fit'>
                <img src={ReverseButton} alt="" onClick={switchBusStop} />
            </div>
        </div >
    )
}


const SelectBox = ({ BusStops, value, handleChange }: { BusStops: busStopListAtomType[], value: number, handleChange: (i: number) => void }) => {
    return (
        <div className='bg-main w-full'>
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
                        BusStops.map((BusStop, i) => {
                            const label = fromIsRits(BusStop.fr) ? BusStop.to.slice(0, 5) : BusStop.fr.slice(0, 5)
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

const SwiperTable = ({ BusStops, swiperRef, handleChange }: { BusStops: busStopListAtomType[], swiperRef: React.RefObject<SwiperRef>, handleChange: (i: number) => void }) => {
    const timetableRefs = useRef<HTMLDivElement[]>([])
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => { handleChange(swiper.activeIndex) }}
            ref={swiperRef}
        >
            {
                BusStops.map((BusStop, i) => {
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
        </Swiper>)
}


const whichIsRits: (currentFromBusStop: AllBusStopsType) => 'fr' | 'to' = (currentFromBusStop) => {
    if (currentFromBusStop === '立命館大学前') {
        return 'fr'
    }
    else
        return 'to'
}

const makeSwitchFlag = (AllBusStopList: busStopListAtomType[], currentFromBusStop: AllBusStopsType) => {
    let switchFlag = false
    const rits = whichIsRits(currentFromBusStop)
    if (rits === 'to') {
        AllBusStopList.filter((BusStop) => fromIsRits(BusStop.fr) && BusStop.ShowTimeTable).forEach((BusStop) => {
            switchFlag = true
        })
    }
    else if (rits === 'fr') {
        AllBusStopList.filter((BusStop) => toIsRits(BusStop.to) && BusStop.ShowTimeTable).forEach((BusStop) => {
            switchFlag = true
        })
    }
    return switchFlag
}

const ShowTimeTable = () => {
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    const [currentFromBusStop, setCurrentFromBusStop] = useState<AllBusStopsType>(AllBusStopList[0].fr)
    const [currenToBusStop, setCurrenToBusStop] = useState<AllBusStopsType>(AllBusStopList[0].to)
    const [value, setValue] = useState(0);
    const swiperRef = useRef<SwiperRef>(null);

    const handleChange = (i: number) => {
        changeSlide(i);
        setValue(i);
        setCurrenToBusStop(switchShowElem(currentFromBusStop, currenToBusStop, AllBusStopList)[i].to);
        setCurrentFromBusStop(switchShowElem(currentFromBusStop, currenToBusStop, AllBusStopList)[i].fr);
    }

    const changeSlide = (i: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(i)
        }
    };

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
        const switchFlag = makeSwitchFlag(AllBusStopList, currentFromBusStop)
        if (switchFlag) {
            setCurrentFromBusStop(swapRits(currenToBusStop, 'to'));
            setCurrenToBusStop(swapRits(currentFromBusStop, 'fr'));
        }
        else {
            alert('バス停を追加してください')
        }
    }

    useEffect(() => {
        const switchFlag = makeSwitchFlag(AllBusStopList, currentFromBusStop)
        if (switchFlag) {
            setCurrentFromBusStop(swapRits(currenToBusStop, 'to'));
            setCurrenToBusStop(swapRits(currentFromBusStop, 'fr'));
        }
    }, [])

    //ここの処理を非同期で上手くリファクタする！！！！！

    useEffect(() => {
        AllBusStopList.forEach((BusStop) => {
            if (BusStop.TimeTableData === undefined) {
                fetchTimeTable(BusStop.fr, BusStop.to).then((timetable) => {
                    const addBusStopListAtom: busStopListAtomType = {
                        fr: BusStop.fr,
                        to: BusStop.to,
                        ShowTimeTable: BusStop.ShowTimeTable,
                        ShowBusCard: BusStop.ShowBusCard,
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
            <div className='fixed w-full top-16 z-10'>
                <TimeTableHeader fr={currentFromBusStop} to={currenToBusStop} switchBusStop={switchBusStop}></TimeTableHeader>
                <SelectBox BusStops={switchShowElem(currentFromBusStop, currenToBusStop, AllBusStopList)} value={value} handleChange={handleChange}></SelectBox>
            </div>
            <div className="mx-4 mt-40 overflow-scroll whitespace-normal">
                <SwiperTable BusStops={switchShowElem(currentFromBusStop, currenToBusStop, AllBusStopList)} swiperRef={swiperRef} handleChange={handleChange}></SwiperTable>
            </div>
        </div>
    )
}

export const TimeTableWrapper = () => {
    const AllBusStopList = useRecoilValue(getAllBusStopList)
    if (AllBusStopList.length === 0) {
        return (
            <div>バス停を追加してください</div>
        )
    }
    return (
        <ShowTimeTable></ShowTimeTable>
    )
}