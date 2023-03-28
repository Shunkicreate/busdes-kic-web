import { selector } from 'recoil'
import { ApproachInfos } from '../../types/Bus.type'
import busArrivalAtom from '../atoms/busArriveInfo'

const setBusArriveInfos = selector<ApproachInfos>({
    key: 'setBusArriveInfos',
    get: ({ get }) => {
        return get(busArrivalAtom)
    },
    set:({set}, newValue) => {
        set(busArrivalAtom, newValue)
    }
})

export default setBusArriveInfos