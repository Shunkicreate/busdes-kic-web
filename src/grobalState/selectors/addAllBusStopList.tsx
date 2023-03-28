import { selector, DefaultValue } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import busStopListAtom from '../atoms/busStopList'

const isNotUndefinedOrNull = (target: any | undefined | null) => {
    if (typeof (target) === undefined || typeof (target) === null) {
        return true
    }
    else {
        return false
    }
}

const updateBusStopList = (newBusStop: busStopListAtomType, oldBusStop: busStopListAtomType) => {
    if (isNotUndefinedOrNull(oldBusStop.fr)) {
        newBusStop.fr = oldBusStop.fr
    }
    if (isNotUndefinedOrNull(oldBusStop.to)) {
        newBusStop.to = oldBusStop.to
    }
    if (isNotUndefinedOrNull(oldBusStop.BusCardData)) {
        newBusStop.BusCardData = oldBusStop.BusCardData
    }
    if (isNotUndefinedOrNull(oldBusStop.TimeTableData)) {
        newBusStop.TimeTableData = oldBusStop.TimeTableData
    }
    if (isNotUndefinedOrNull(oldBusStop.ShowBusCard)) {
        newBusStop.ShowBusCard = oldBusStop.ShowBusCard
    }
    if (isNotUndefinedOrNull(oldBusStop.ShowTimeTable)) {
        newBusStop.ShowTimeTable = oldBusStop.ShowTimeTable
    }
    return newBusStop
}

const addAllBusStopListSelector = selector<busStopListAtomType[]>({
    key: 'addAllBusStopListSelector',
    get: ({ get }) => {
        return get(busStopListAtom)
    },
    set: ({ get, set }, newBusStop) => {
        const defaultRoutes = get(busStopListAtom)
        // debugger; // eslint-disable-line no-debugger
        //引数に値が入っていた場合
        if (!(newBusStop instanceof DefaultValue)) {
            let flag = true
            defaultRoutes.forEach((defaultRoute, i) => {
                //既存のルートが存在していたらアップデートをする。
                if ((defaultRoute.fr === newBusStop[0].fr) && (defaultRoute.to === newBusStop[0].to)) {
                    const newBusStopListAtom: busStopListAtomType[] = [...defaultRoutes]
                    newBusStopListAtom[i] = updateBusStopList(newBusStop[0], newBusStopListAtom[i])
                    set(busStopListAtom, newBusStopListAtom)
                    flag = false
                }
            })
            //flagが立ったままだったら存在しないルートのデータなのでそのまま追加する。
            if (flag) {
                set(busStopListAtom, [...get(busStopListAtom), ...newBusStop])
            }
        }
    }
})

export default addAllBusStopListSelector