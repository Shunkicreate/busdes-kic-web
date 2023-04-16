import { AllBusStopsType } from '../types/Bus.type'

export const getLocalStrageBusStop = () => {
    const localData = localStorage.getItem('BusStops')
    let LocalBusStopList = null
    if (localData) {
        LocalBusStopList = JSON.parse(localData) as AllBusStopsType[][]
    }
    return LocalBusStopList
}

export const setLocalStrageBusStop = (BusStops: AllBusStopsType[]) => {
    const LocalBusStopList = getLocalStrageBusStop()
    const addBusStop: AllBusStopsType[][] = []
    addBusStop.push(BusStops)
    if (LocalBusStopList) {
        LocalBusStopList.forEach((BusStop) => {
            addBusStop.push(BusStop)
        })
    }
    const json = JSON.stringify(addBusStop, undefined, 1);
    localStorage.setItem('BusStops', json);
}