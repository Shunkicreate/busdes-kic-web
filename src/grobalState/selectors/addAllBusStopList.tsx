import { selector, DefaultValue } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import busStopListAtom from '../atoms/busStopList'

const addAllBusStopListSelector = selector<busStopListAtomType[]>({
    key: 'addAllBusStopListSelector',
    get: ({ get }) => {
        return get(busStopListAtom)
    },
    set: ({ get, set }, newBusStop) => {
        const defaultRoutes = get(busStopListAtom)
        // debugger; // eslint-disable-line no-debugger
        if (!(newBusStop instanceof DefaultValue)) {
            let flag = true
            defaultRoutes.forEach((defaultRoute, i) => {
                if ((defaultRoute.fr === newBusStop[0].fr) && (defaultRoute.to === newBusStop[0].to)) {
                    const newBusStopListAtom: busStopListAtomType[] = [...defaultRoutes]
                    newBusStopListAtom[i] = newBusStop[0]
                    set(busStopListAtom, newBusStopListAtom)
                    flag = false
                }
            })
            if (flag) {
                set(busStopListAtom, [...get(busStopListAtom), ...newBusStop])
            }
        }
    }
})

export default addAllBusStopListSelector