import { atom } from 'recoil'
import { busRouteAtomType } from '../../types/Bus.type'

const busRouteAtom = atom<busRouteAtomType>({
    key: 'busRouteAtom',
    default: {
        fr: '立命館大学前',
        to: '京都駅前',
    }
})

export default busRouteAtom