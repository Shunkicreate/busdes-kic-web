import React from 'react';
import CardDisplayButton from '../atom/CardDisplayButton'
import { useModal } from 'react-hooks-use-modal';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {busStopListAtomType} from '../types/Bus.type';

const BusCardDisplaySetting = ({buslistindex}:{buslistindex : number}) => {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true
    })

    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    const AllBusStopList = useRecoilValue(addAllBusStopListSelector)

    const DeleteBusCard = () => {

        const addBusStop: busStopListAtomType[] = [{
            fr: AllBusStopList[buslistindex].fr,
            to: AllBusStopList[buslistindex].to,
            ShowTimeTable: false,
            ShowBusCard: false,
            TimeTableData: AllBusStopList[buslistindex].TimeTableData,
            BusCardData: AllBusStopList[buslistindex].BusCardData,
        }]

        addAllBusStopList(addBusStop)
        close()

    }

    return (
        <div className='h-6 pr-72 object-center'>
            <button className='w-6' onClick={open}>
                <CardDisplayButton></CardDisplayButton>
            </button>
            <Modal>
                <div className='p-16 text-center bg-white rounded-2xl'>
                    <div className='p-4 text-xl'>削除しますか？</div>
                    <div className='grid grid-cols-5 text-2xl'>
                        <button className='col-start-1 col-span-2' onClick={DeleteBusCard}>はい</button>
                        <button className='col-start-4 col-span-2' onClick={close}>いいえ</button>
                    </div>
                </div>
            </Modal>
        </div>
    )

}

export default BusCardDisplaySetting