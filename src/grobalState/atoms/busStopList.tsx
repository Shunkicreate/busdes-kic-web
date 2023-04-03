import { atom } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import { ApproachInfos } from '../../types/Bus.type'

const TestData: ApproachInfos = {

    'approach_infos': [

    ]
}

const busStopListAtom = atom<busStopListAtomType[]>({
    key: 'busStopListAtom',
    default: [
        {
            fr: '立命館大学前',
            to: '京都駅前',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: TestData
        },
        {
            fr: '京都駅前',
            to: '立命館大学',
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: TestData
        }

    ]
})

export default busStopListAtom