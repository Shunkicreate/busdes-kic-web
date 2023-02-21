import React from "react";
import { AllBusStopsType } from "../types/Bus.type";
import { useState } from "react";

export const SettingsManager = () => {
    const TimeTableParams = (() => {
        const [startSta, setStartSta] = useState<AllBusStopsType>('立命館大学前')
        const [goalSta, setGoalSta] = useState<AllBusStopsType>('京都駅前')
        return (
            { startSta, setStartSta, goalSta, setGoalSta }
        )
    })()
    const BusCardParams = (() => {
        const [startSta, setStartSta] = useState<AllBusStopsType>('立命館大学前')
        const [goalSta, setGoalSta] = useState<AllBusStopsType>('京都駅前')
        return (
            { startSta, setStartSta, goalSta, setGoalSta }
        )
    })()
    return (
        { TimeTableParams, BusCardParams }
    )
}
