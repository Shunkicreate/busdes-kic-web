import { atom } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import { ApproachInfos } from '../../types/Bus.type'
import { getLocalStrageBusStops } from '../../functions/LocalStrageFuction'

const Empty: ApproachInfos = { 'approach_infos': [] }

const LocalStrageBusStops = getLocalStrageBusStops()
export const defaultBusData: busStopListAtomType[] = [
    {
        fr: '立命館大学前',
        to: '京都駅前',
        ShowTimeTable: true,
        ShowBusCard: true,
        TimeTableData: undefined,
        BusCardData: Empty
    },
    {
        fr: '京都駅前',
        to: '立命館大学',
        ShowTimeTable: true,
        ShowBusCard: true,
        TimeTableData: undefined,
        BusCardData: Empty
    },
]

const busStopListAtom = atom<busStopListAtomType[]>({
    key: 'busStopListAtom',
    default: LocalStrageBusStops ? LocalStrageBusStops.map((BusStop) => (
        {
            fr: BusStop.fr,
            to: BusStop.to,
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: Empty
        }
    )) : defaultBusData
})

export default busStopListAtom