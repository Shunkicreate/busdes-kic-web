import { selector } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import busStopListAtom from '../atoms/busStopList'

const getAllBusStopList = selector<busStopListAtomType[]>({
    key: 'getAllBusStopList',
    get: ({ get }) => {
        return get(busStopListAtom)
    }
})

export default getAllBusStopList