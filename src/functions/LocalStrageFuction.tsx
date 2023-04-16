import { AllBusStopsType, busStopListAtomType } from '../types/Bus.type'

export const getLocalStrageBusStops = () => {
    const localData = localStorage.getItem('BusStops')
    let LocalBusStopList = null
    if (localData) {
        LocalBusStopList = JSON.parse(localData) as busStopListAtomType[]
    }
    return LocalBusStopList
}

export const setLocalStrageBusStops = (BusStops: busStopListAtomType) => {
    const LocalBusStopList = getLocalStrageBusStops()
    const addBusStop: busStopListAtomType[] = []
    if (LocalBusStopList) {
        LocalBusStopList.forEach((BusStop) => {
            addBusStop.push(BusStop)
        })
    }
    addBusStop.push(BusStops)
    const json = JSON.stringify(addBusStop, undefined, 1)
    localStorage.clear()
    localStorage.setItem('BusStops', json)
}

export const updateLocalStrageBusStops = (BusStops: busStopListAtomType) => {
    const LocalBusStopList = getLocalStrageBusStops()
    console.log(LocalBusStopList)
    if (LocalBusStopList) {
        LocalBusStopList.forEach((BusStop) => {
            if (BusStop.fr === BusStops.fr && BusStop.to === BusStops.to) {
                BusStop.ShowBusCard = BusStops.ShowBusCard
                BusStop.ShowTimeTable = BusStops.ShowTimeTable
            }
        })
    }
    console.log(LocalBusStopList)
    const json = JSON.stringify(LocalBusStopList, undefined, 1)
    localStorage.clear()
    localStorage.setItem('BusStops', json)
}

export const deleteLocalStrageBusStops = (BusStops: busStopListAtomType) => {
    const LocalBusStopList = getLocalStrageBusStops()
    console.log(LocalBusStopList)
    if (LocalBusStopList) {
        const newLocalBusStopList: busStopListAtomType[] = []
        LocalBusStopList.forEach((BusStop) => {
            if (BusStop.fr === BusStops.fr && BusStop.to === BusStops.to) {
                null
            }
            else {
                newLocalBusStopList.push(BusStop)
            }
        })
        const json = JSON.stringify(newLocalBusStopList, undefined, 1)
        localStorage.clear()
        localStorage.setItem('BusStops', json)
    }
}