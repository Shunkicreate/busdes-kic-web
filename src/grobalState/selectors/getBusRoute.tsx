import { selector } from 'recoil'
import { busRouteAtomType } from '../../types/Bus.type'
import busRouteAtom from '../atoms/busRoute'

const getBusRoute = selector<busRouteAtomType>({
    key: 'getBusRoute',
    get: ({ get }) => {
        return get(busRouteAtom)
    }
})

export default getBusRoute