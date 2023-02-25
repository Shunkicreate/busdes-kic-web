import { selector } from 'recoil'
import { busRouteAtomType, AllBusStopsType } from '../../types/Bus.type'
import busRouteAtom from '../atoms/busRoute'
import { useState } from 'react'


const checkStation = (route: busRouteAtomType) => {
    // debugger; // eslint-disable-line no-debugger
    if ((route.start === "立命館大学前" && route.goal !== "立命館大学") || (route.start !== "立命館大学前" && route.goal === "立命館大学")) {
        return true
    }
    return false
}

const swapRits = (routeElem: AllBusStopsType, mode: 'start' | 'goal') => {
    let returnSta: AllBusStopsType = routeElem
    if (mode === 'start') {
        if (returnSta === "立命館大学前") {
            returnSta = "立命館大学"
        }
    }
    else if (mode === 'goal') {
        if (returnSta === "立命館大学") {
            returnSta = "立命館大学前"

        }
    }
    return (returnSta)
}

const swapDestination = (route: busRouteAtomType) => {
    // debugger; // eslint-disable-line no-debugger
    if (checkStation(route)) {
        const swappedRoute: busRouteAtomType = {
            start: swapRits(route.goal, 'goal'),
            goal: swapRits(route.start, 'start')
        }
        return (swappedRoute)
    }
    return (
        route
    )
}

const swapBusRouteSelector = selector<busRouteAtomType>({
    key: 'swapBusRouteSelector',
    get: ({ get }) => {
        return get(busRouteAtom)
    },
    set: ({ get, set }) => {
        const defaultRoute = get(busRouteAtom)
        const swappedRoute = swapDestination(defaultRoute)
        set(busRouteAtom, swappedRoute)
    }
})

export default swapBusRouteSelector