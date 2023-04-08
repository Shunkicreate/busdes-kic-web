import React from 'react';
// import { useModal } from 'react-hooks-use-modal';
import useModal from '../hooks/useModal';
import { useState } from 'react';
import { AllBusStopsType, AllBusStops, busStopListAtomType } from '../types/Bus.type';
import { useSetRecoilState } from 'recoil';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { ApproachInfos } from '../types/Bus.type';
import Addbutton from '../images/addButton.svg'

const SettingModal = () => {
    const { Modal, isOpen, openModal, closeModal } = useModal();
    const [select, setSelect] = useState<AllBusStopsType | ''>('')
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

    const upDateStation = (value: AllBusStopsType) => {
        setSelect(value)
    }

    const onClickEventHandle = () => {
        setSelect('')
    }

    const addSettingList = () => {
        if (!select) {
            alert('バス停を選択してください')
        }
        else if (!(AllBusStops.includes(select))) {
            alert('正式なバス停の名前を選択してください。')
        }
        else {
            let addBusStop: busStopListAtomType[] = [{
                fr: select,
                to: '立命館大学',
                ShowTimeTable: true,
                ShowBusCard: true,
                TimeTableData: undefined,
                BusCardData: TestData,
            }]
            addAllBusStopList(addBusStop)
            addBusStop = [{
                fr: '立命館大学前',
                to: select,
                ShowTimeTable: true,
                ShowBusCard: true,
                TimeTableData: undefined,
                BusCardData: TestData,
            }]
            addAllBusStopList(addBusStop)
            closeModal()
        }
    }

    const isNotRits = (BusStop: AllBusStopsType) => {
        if (BusStop === '立命館大学前' || BusStop === '立命館大学') {
            return false
        }
        else {
            return true
        }
    }

    return (
        <div>
            <button onClick={openModal}>
                <img className="" src={Addbutton} alt="AddButton" width="50" />
            </button>
            <Modal>
                <div className="bg-main rounded-2xl w-[calc(100vw-4rem)] m-auto">
                    <div className='text-center font-bold py-4 relative'>
                        <button onClick={closeModal} className='absolute w-fit h-fit top-0 bottom-0 left-6 m-auto'>
                            戻る
                        </button>
                        <div>
                            路線の追加
                        </div>
                    </div>
                    <div className='bg-white h-[calc(100vh-12rem)] rounded-b-2xl'>
                        <div className='text-center p-4 text-lg'>
                            どこからバスに乗りますか？
                        </div>
                        <div className=''>
                            <div className='w-fit m-auto'>
                                <input className='bg-border rounded-full py-2 px-8' type='text' list='bus-stop-list' id='bus-stop-choice' name='bus-stop-choice' value={select as AllBusStopsType} onChange={(event) => upDateStation(event.target.value as AllBusStopsType)} placeholder='駅名を入力' onClick={() => { onClickEventHandle() }} onKeyDown={(e) => { if (e.key === 'Enter') { addSettingList() } }}></input>
                            </div>
                            <datalist id='bus-stop-list'>
                                {AllBusStops.filter(isNotRits).map((value, idx) => {
                                    return (
                                        <option value={value} key={idx}></option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <div className='m-4 overflow-scroll h-[calc(100vh-24rem)]'>
                            {
                                AllBusStops.filter(isNotRits).map((BusStop, i) => {
                                    return (
                                        <div key={i} className='m-4 text-sm' onClick={() => { setSelect(BusStop) }}>
                                            {BusStop}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='text-center m-8' onClick={addSettingList}>
                            追加
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SettingModal