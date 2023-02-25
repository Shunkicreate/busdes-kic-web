import { AllBusStopsType } from "../types/Bus.type";
import { useState } from "react";

export const SettingsManager = () => {
    // const TimeTableParams = (() => {
    //     const [startStaSetting, setStartStaSetting] = useState<AllBusStopsType>('立命館大学前')
    //     const [goalStaSetting, setGoalStaSetting] = useState<AllBusStopsType>('京都駅前')
    //     const [startStaSettings, setStartStaSettings] = useState<AllBusStopsType[]>([startStaSetting])
    //     const [goalStaSettings, setGoalStaSettings] = useState<AllBusStopsType[]>([goalStaSetting])
    //     return (
    //         { startStaSetting, setStartStaSetting, goalStaSetting, setGoalStaSetting, startStaSettings, setStartStaSettings, goalStaSettings, setGoalStaSettings }
    //     )
    // })()
    // const BusCardParams = (() => {
    //     const [startStaSetting, setStartStaSetting] = useState<AllBusStopsType>('立命館大学前')
    //     const [goalStaSetting, setGoalStaSetting] = useState<AllBusStopsType>('京都駅前')
    //     return (
    //         { startStaSetting, setStartStaSetting, goalStaSetting, setGoalStaSetting }
    //     )
    // })()
    // const [witchIsRits, setWitchIsRits] = useState<'start' | 'goal'>('start')
    // const swapRits = (busStop: AllBusStopsType): AllBusStopsType => {
    //     // console.log(TimetableQuery)
    //     if (busStop === "立命館大学前") {
    //         setWitchIsRits('goal')
    //         return ("立命館大学")
    //     }
    //     else if (busStop === "立命館大学") {
    //         setWitchIsRits('start')
    //         return ("立命館大学前")
    //     }
    //     else {
    //         return (busStop)
    //     }
    // }

    // const swapDestination = (start: AllBusStopsType, goal: AllBusStopsType, type: 'TimeTable'|'BusCard') => {
    //     const tempStart = swapRits(goal)
    //     const tempGoal = swapRits(start)
    //     if(type === 'TimeTable'){
    //         TimeTableParams.setStartStaSetting(tempStart)
    //         TimeTableParams.setGoalStaSetting(tempGoal)
    //     }
    //     else if(type === 'BusCard'){
    //         BusCardParams.setStartStaSetting(tempStart)
    //         BusCardParams.setGoalStaSetting(tempGoal)
    //     }
    // }

    return (
        {}
        // { TimeTableParams, BusCardParams, swapDestination }
    )
}
