import { atom } from 'recoil'
import { ApproachInfos } from '../../types/Bus.type'

const busArrivalAtom = atom<ApproachInfos>({
    key: 'busArriveAtom',
    default:{
        approach_infos: [
        {
                more_min: 'TESTDATA',
                real_arrival_time: 'hh:mm',
                direction: '京都駅前',
                bus_name: 'n号系統',
                scheduled_time: 'hh:mm',
                delay: '定時運行',
                bus_stop: 'n',
                required_time: 20
            }
        ]
    }
})

export default busArrivalAtom