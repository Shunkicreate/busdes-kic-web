import { atom } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import { ApproachInfos } from '../../types/Bus.type'

const TestData: ApproachInfos = {

    'approach_infos': [
        {
            more_min: undefined,
            real_arrival_time: '09:30',
            direction: '京都駅前',
            bus_name: '50号系統',
            scheduled_time: '06:10',
            delay: '定時運行',
            bus_stop: '1',
            required_time: 20
        }
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