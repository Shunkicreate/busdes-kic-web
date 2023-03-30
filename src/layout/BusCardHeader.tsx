import React from 'react';
import BusArrow from '../images/BusArrow.svg';
import { AllBusStopsType } from '../types/Bus.type';

type Props = {
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
}

const BusCardHeader = (props: Props) => {

    return (
        <div className='grid grid-cols-5 h-16 place-content-center text-center'>
            <div className='text-xl col-start-1 col-span-2'>{props.from_bus}</div>
            <div className='flex justify-center'>
                <img className='' src={BusArrow} alt='BusArrow' width='45' />
            </div>
            <div className='text-xl col-start-4 col-span-2'>{props.to_bus}</div>
        </div>
    )
}


export default BusCardHeader