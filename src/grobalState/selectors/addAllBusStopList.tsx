import { selector, DefaultValue } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import busStopListAtom from '../atoms/busStopList'

const addAllBusStopListSelector = selector<busStopListAtomType[]>({
    key: 'addAllBusStopListSelector',
    get: ({ get }) => {
        return get(busStopListAtom)
    },
    set: ({ get, set }, newBusStop) => {
        if(!(newBusStop instanceof DefaultValue)){
            set(busStopListAtom, [...get(busStopListAtom), ...newBusStop]);
        }
    }
})

export default addAllBusStopListSelector