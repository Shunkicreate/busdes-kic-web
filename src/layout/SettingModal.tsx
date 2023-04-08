import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useState } from 'react';
import { AllBusStopsType, AllBusStops, busRouteAtomType, busStopListAtomType } from '../types/Bus.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import busRouteAtom from '../grobalState/atoms/busRoute';
import swapBusRouteSelector from '../grobalState/selectors/swapBusRoute';
import setpBusRouteSelector from '../grobalState/selectors/setBusRoute';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { ApproachInfos } from '../types/Bus.type';
import Addbutton from '../images/addButton.svg'

const SettingModal = () => {
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

    const Empty : ApproachInfos = {

        'approach_infos': [

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
            BusCardData: Empty,
        }]
        addAllBusStopList(addBusStop)
        close()
    }

    return (
        <div>
            {/* <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div> */}
            <button onClick={open}>
                <img className="" src={Addbutton} alt="AddButton" width="50" />
            </button>
            <Modal>
                <button onClick={close} className='text-white'>CLOSE</button>
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
        </div>
    );
}

export default SettingModal