import { useState } from 'react'
import { TimeTable, AllBusStopsType, busStopListAtomType } from '../../../types/Bus.type';
import { getFactory } from '../../../models/getFactory ';
import addAllBusStopListSelector from '../../../grobalState/selectors/addAllBusStopList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import getAllBusStopList from '../../../grobalState/selectors/getAllBusStopList';

/* 責務: postsのAPI通信をしデータをstateに格納しておく */
export const useFetchPosts = () => {
    const [posts, setPosts] = useState<TimeTable[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    // const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    // const AllBusStopList = useRecoilValue(getAllBusStopList)
    // AllBusStopList.forEach((BusStop, i) => {
    const fetch = async () => {
        debugger; // eslint-disable-line no-debugger
        // try {
        // const fr = BusStop.fr
        // const to = BusStop.to
        const fr = "立命館大学前"
        const to = "京都駅前"
        // Factoryの呼び出し
        console.log("fetch!", fr, to)
        const data = await getFactory().timetable(fr, to).finally(() => { console.log('fin fetch!') })
        debugger; // eslint-disable-line no-debugger
        setPosts([...posts, data]);
        console.log('set post!')
        // const addTimeTable: TimeTable = Object.assign({}, data)
        // addTimeTable.fr = fr
        // addTimeTable.to = to
        // const addBusStopListAtom: busStopListAtomType = {
        //     fr: fr,
        //     to: to,
        //     ShowTimeTable: true,
        //     ShowBusCard: false,
        //     TimeTableData: addTimeTable,
        //     BusCardData: undefined
        // }
        // addAllBusStopList([addBusStopListAtom])
    };
    fetch().catch((e) => {
        console.log(e);
    }).finally(() => {
        console.log('finelly!!')
        setIsFetching(false);
    })
    // })

    return {
        posts: posts,
        isFetching: isFetching,
    };
};