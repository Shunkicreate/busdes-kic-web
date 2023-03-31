import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useState } from 'react';
import { AllBusStopsType, AllBusStops, busRouteAtomType, busStopListAtomType } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/swapBusRoute';
import setpBusRouteSelector from '../grobalState/selectors/setBusRoute';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
<<<<<<< HEAD:src/hooks/useModal.tsx
import { AddButton } from '../atom/AddButton';
=======
import { ApproachInfos } from '../types/Bus.type';
import Addbutton from '../images/addButton.svg'
>>>>>>> origin/develop:src/layout/SettingModal.tsx

const useAddBusRouteModal = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true
    })
    const modalStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        padding: '60px 100px',
        borderRadius: '10px',
    };
    const busRoute = useRecoilValue<busRouteAtomType>(busRouteAtom)
    const swapBusRoute = useSetRecoilState(swapBusRouteSelector)
    const setBusRoute = useSetRecoilState(setpBusRouteSelector)
    const [select, setSelect] = useState('')
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)

    const TestData: ApproachInfos = {

        'approach_infos': [
            {
                more_min: undefined,
                real_arrival_time: '99:30',
                direction: '京都駅前',
                bus_name: '50号系統',
                scheduled_time: '06:10',
                delay: '定時運行',
                bus_stop: '1',
                required_time: 20
            }
        ]
    }


    const upDateStation = (value: string) => {
        setSelect(value)
        if (busRoute.fr === '立命館大学前') {
            const newRoute: busRouteAtomType = {
                fr: '立命館大学前',
                to: value as AllBusStopsType
            }
            setBusRoute(newRoute)
        }
        else if (busRoute.to === '立命館大学') {
            const newRoute: busRouteAtomType = {
                fr: value as AllBusStopsType,
                to: '立命館大学'
            }
            setBusRoute(newRoute)
        }
    }

    const onClickEventHandle = () => {
        setSelect('')
    }

    const addSettingList = () => {
        const addBusStop: busStopListAtomType[] = [{
            fr: busRoute.fr,
            to: busRoute.to,
            ShowTimeTable: true,
            ShowBusCard: true,
            TimeTableData: undefined,
            BusCardData: TestData,
        }]
        addAllBusStopList(addBusStop)
        close()
    }

    const AddBusRouteModal = () => (
        <Modal>
            <button onClick={() => { close() }} className='text-white'>CLOSE</button>
            <div style={modalStyle}>
                <div onClick={() => { swapBusRoute(busRoute) }}>
                    入れ替え
                </div>
                <div>
                    <div>出発: {busRoute.fr}</div>
                </div>
                <div>
                    <div>到着: {busRoute.to}</div>
                    <label htmlFor='bus-stop-choice'>Choose a Bus Stop:</label>
                    <input type='text' list='bus-stop-list' id='bus-stop-choice' name='bus-stop-choice' value={select} onChange={(event) => upDateStation(event.target.value)} placeholder='駅名を入力' onClick={() => { onClickEventHandle() }}></input>
                    <div onClick={addSettingList}>
                        追加
                    </div>
                    <datalist id='bus-stop-list'>
                        {AllBusStops.map((value, idx) => {
                            return (
                                <option value={value} key={idx}></option>
                            )
                        })}
                    </datalist>
                </div>
            </div>
        </Modal>
    )

    const ModalOpenButon = () => (
        <div>
            <div onClick={() => { open() }}>
                <AddButton></AddButton>
            </div>
            <AddBusRouteModal></AddBusRouteModal>
        </div>
    )

    return (
        {
            AddBusRouteModal,
            ModalOpenButon,
            open,
            close,
            isOpen

        }
    )
}

export default useAddBusRouteModal