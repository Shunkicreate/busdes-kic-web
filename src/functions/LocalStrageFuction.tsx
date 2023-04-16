import { AllBusStopsType } from '../types/Bus.type'

export const getLocalStrageBusStop = () => {
    const localData = localStorage.getItem('BusStops')
    let LocalBusStopList = null
    if (localData) {
        LocalBusStopList = JSON.parse(localData) as AllBusStopsType[]
    }
    return LocalBusStopList
}

export const setLocalStrageBusStop = (BusStops: AllBusStopsType | AllBusStopsType[]) => {
    const LocalBusStopList = getLocalStrageBusStop()
    const addBusStop: AllBusStopsType[] = []
    if (Array.isArray(BusStops)) {
        BusStops.forEach((BusStop) => {
            addBusStop.push(BusStop)
        })
    }
    else {
        addBusStop.push(BusStops)
    }
    if (LocalBusStopList) {
        LocalBusStopList.forEach((BusStop) => {
            addBusStop.push(BusStop)
        })
    }
    const json = JSON.stringify(addBusStop, undefined, 1);
    localStorage.setItem('BusStops', json);
}