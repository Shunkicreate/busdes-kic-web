import React from 'react';
import useModal from '../hooks/useModal';
import { AllBusStopsType, AllBusStops, busStopListAtomType, TimeTable } from '../types/Bus.type';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import addAllBusStopListSelector from '../grobalState/selectors/addAllBusStopList';
import { ApproachInfos } from '../types/Bus.type';
import Addbutton from '../images/addButton.svg'
import { useForm, Controller } from 'react-hook-form';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';

import {
    Box,
    TextField,
    Autocomplete,
} from '@mui/material'
import { setLocalStrageBusStops } from '../functions/LocalStrageFuction';


const SettingModal = () => {
    const { Modal, isOpen, openModal, closeModal } = useModal();
    const addAllBusStopList = useSetRecoilState(addAllBusStopListSelector)
    interface IFormInput {
        BusStop: AllBusStopsType | null;
    }
    const { control, handleSubmit, setValue, getValues } = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: {
            BusStop: null,
        },
    });
    const AllBusStopList = useRecoilValue(getAllBusStopList)

    const addLocalStorageAndGlobalState = (fr: AllBusStopsType, to: AllBusStopsType, ShowTimeTable = true, ShowBusCard = true, TimeTableData?: TimeTable, BusCardData?: ApproachInfos) => {
        const Empty: ApproachInfos = { 'approach_infos': [] }
        const addBusStop: busStopListAtomType[] = [{
            fr: fr,
            to: to,
            ShowTimeTable: ShowTimeTable,
            ShowBusCard: ShowBusCard,
            TimeTableData: TimeTableData,
            BusCardData: BusCardData ? BusCardData : Empty,
        }]
        addAllBusStopList(addBusStop)
        setLocalStrageBusStops(addBusStop[0])
    }

    const addBusStop = (fr: AllBusStopsType, to: AllBusStopsType) => {
        if (isAlreadyListed(AllBusStopList, fr, to)) {
            const BusStopData = AllBusStopList.filter((BusStop) => BusStop.fr === fr && BusStop.to === to)[0]
            addLocalStorageAndGlobalState(BusStopData.fr, BusStopData.to, true, true, BusStopData.TimeTableData, BusStopData.BusCardData)
        }
        else {
            addLocalStorageAndGlobalState(fr, to)
        }
    }

    const isAlreadyListed = (BusStopList: busStopListAtomType[], fr: AllBusStopsType, to: AllBusStopsType) => {
        let flag = false
        BusStopList.forEach(((BusStop) => {
            if (BusStop.fr === fr && BusStop.to === to) {
                flag = true
            }
        }))
        return flag
    }

    const addSettingList = () => {

        const BusStop = getValues().BusStop
        if (!BusStop) {
            alert('バス停を選択してください')
        }
        else if (!(AllBusStops.includes(BusStop))) {
            alert('正式なバス停の名前を選択してください。')
        }
        else {
            addBusStop(BusStop, '立命館大学')
            addBusStop('立命館大学前', BusStop)
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
                <div className="bg-main rounded-2xl w-[calc(100vw-2rem)] mx-auto">
                    <div className='text-center font-bold py-4 relative'>
                        <button onClick={closeModal} className='absolute w-fit h-fit top-0 bottom-0 left-6 m-auto'>
                            戻る
                        </button>
                        <div>
                            路線の追加
                        </div>
                    </div>
                    <div className='bg-white h-[calc(100svh-12rem)] rounded-b-2xl'>
                        <div className='text-center p-4 text-lg'>
                            どこからバスに乗りますか？
                        </div>
                        <div className='w-fit m-auto'>
                            <Box
                                sx={{
                                    width: 300,
                                }}
                            >
                                <form onSubmit={handleSubmit(addSettingList)}>
                                    <Controller
                                        control={control}
                                        name='BusStop'
                                        render={() => (
                                            <Autocomplete
                                                fullWidth
                                                options={AllBusStops.filter(isNotRits)}
                                                renderInput={(params) => <TextField {...params} label='バス停' />}
                                                onChange={(event, value) => {
                                                    if (value) {
                                                        setValue('BusStop', value, {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                            shouldTouch: true,
                                                        });
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <Box sx={{ mt: 5 }} />
                                </form>
                            </Box>
                        </div>
                        <button className='text-center m-8' onClick={addSettingList}>
                            追加
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SettingModal