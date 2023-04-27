import React from 'react';
import CardDisplayButton from '../atom/CardDisplayButton'
import useModal from '../hooks/useModal';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { busStopListAtomType } from '../types/Bus.type';
import { deleteLocalStrageBusStops } from '../functions/LocalStrageFuction';

const BusCardDisplaySetting = ({ buslistindex }: { buslistindex: number }) => {

    const { Modal, openModal, closeModal, isOpen } = useModal()

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
        deleteLocalStrageBusStops(addBusStop[0])
        closeModal()

    }

    return (
        <div className='h-3 pr-72 object-center relative'>
            <div className='absolute h-full flex right-2'>
                <button className='w-6 my-auto' onClick={openModal}>
                    <CardDisplayButton></CardDisplayButton>
                </button>
            </div>
            <Modal>
                <div className='bg-white rounded-2xl'>
                    <div className='pt-4 text-2xl font-bold'>バスカードの削除</div>
                    <div className='p-3'>選択したカードを削除しますか？</div>
                    <div className='grid grid-cols-9 p-1 pb-4 text-lg font-semibold'>
                        <button className='col-start-2 col-span-3 rounded border-2 bg-slate-200' onClick={closeModal}>キャンセル</button>
                        <button className='col-start-6 col-span-3 rounded border-2 border-yellow-300 bg-yellow-300' onClick={DeleteBusCard}>削除する</button>
                    </div>
                </div>
            </Modal>
        </div>
    )

}

export default BusCardDisplaySetting