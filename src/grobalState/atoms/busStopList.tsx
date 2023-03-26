import { atom } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'

const busStopListAtom = atom<busStopListAtomType[]>({
    key: 'busStopListAtom',
    default: [
        {
            fr: '立命館大学前',
            to: '京都駅前',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: undefined
        },
        {
            fr: '京都駅前',
            to: '立命館大学',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: undefined
        },
        {
            fr: '立命館大学前',
            to: '四条河原町',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: undefined
        },
        {
            fr: '立命館大学前',
            to: '二条城前',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: undefined
        },
        {
            fr: '立命館大学前',
            to: '四条堀川',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: undefined
        },
    ]
})

export default busStopListAtom