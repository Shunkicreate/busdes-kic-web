import { selector } from 'recoil'
import { busRouteAtomType, AllBusStopsType } from '../../types/Bus.type'
import busRouteAtom from '../atoms/busRoute'

const checkStation = (route: busRouteAtomType) => {
    // debugger; // eslint-disable-line no-debugger
    if (route.fr === '立命館大学前' && route.to !== '立命館大学') {
        return true
    }
    else if (route.fr !== '立命館大学前' && route.to === '立命館大学') {
        return true
    }
    return false
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

const swapDestination = (route: busRouteAtomType) => {
    // debugger; // eslint-disable-line no-debugger
    if (checkStation(route)) {
        const swappedRoute: busRouteAtomType = {
            fr: swapRits(route.to, 'to'),
            to: swapRits(route.fr, 'fr')
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