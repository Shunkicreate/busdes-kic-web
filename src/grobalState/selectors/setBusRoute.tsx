import { DefaultValue, selector } from 'recoil'
import { busRouteAtomType } from '../../types/Bus.type'
import busRouteAtom from '../atoms/busRoute'

const checkStation = (route: busRouteAtomType) => {
    // debugger; // eslint-disable-line no-debugger
    if ((route.fr === "立命館大学前" && route.to !== "立命館大学") || (route.fr !== "立命館大学前" && route.to === "立命館大学")) {
        return true
    }
    return false
}

const setpBusRouteSelector = selector<busRouteAtomType>({
    key: 'setpBusRouteSelector',
    get: ({ get }) => {
        return get(busRouteAtom)
    },
    set: ({ get, set }, newRoute) => {
        const defaultRoute = get(busRouteAtom)
        if (newRoute instanceof DefaultValue) {
            return (
                defaultRoute
            )
        }
        else {
            if (checkStation(newRoute)) {
                set(busRouteAtom, newRoute)
            }
        }
    }
})

export default setpBusRouteSelector