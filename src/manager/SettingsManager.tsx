import { AllBusStopsType } from "../types/Bus.type";
import { useState } from "react";

export const SettingsManager = () => {
    const TimeTableParams = (() => {
        const [startStaSetting, setStartStaSetting] = useState<AllBusStopsType>('立命館大学前')
        const [goalStaSetting, setGoalStaSetting] = useState<AllBusStopsType>('京都駅前')
        const [startStaSettings, setStartStaSettings] = useState<AllBusStopsType[]>([startStaSetting])
        const [goalStaSettings, setGoalStaSettings] = useState<AllBusStopsType[]>([goalStaSetting])
        return (
            { startStaSetting, setStartStaSetting, goalStaSetting, setGoalStaSetting, startStaSettings, setStartStaSettings, goalStaSettings, setGoalStaSettings }
        )
    })()
    const BusCardParams = (() => {
        const [startStaSetting, setStartStaSetting] = useState<AllBusStopsType>('立命館大学前')
        const [goalStaSetting, setGoalStaSetting] = useState<AllBusStopsType>('京都駅前')
        return (
            { startStaSetting, setStartStaSetting, goalStaSetting, setGoalStaSetting }
        )
    })()
    return (
        { TimeTableParams, BusCardParams }
    )
}
