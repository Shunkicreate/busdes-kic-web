import { selector, DefaultValue } from 'recoil'
import { busStopListAtomType } from '../../types/Bus.type'
import busStopListAtom from '../atoms/busStopList'

const addAllBusStopListSelector = selector<busStopListAtomType[]>({
    key: 'addAllBusStopListSelector',
    get: ({ get }) => {
        return get(busStopListAtom)
    },
    set: ({ get, set }, newBusStop) => {
        const defaultRoute = get(busStopListAtom)
        if (!(newBusStop instanceof DefaultValue)) {
            let flag = true
            defaultRoute.forEach((route, i) => {
                if ((route.fr === newBusStop[0].fr) && (route.to === newBusStop[0].to)) {
                    const newBusStopListAtom: busStopListAtomType[] = [...defaultRoute]
                    // debugger; // eslint-disable-line no-debugger
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