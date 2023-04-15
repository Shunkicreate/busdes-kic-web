import React from 'react';
import BusArrow from '../images/BusArrow.svg';
import { AllBusStopsType } from '../types/Bus.type';

type Props = {
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
}

const BusCardHeader = (props: Props) => {

    return (
        <div className='grid grid-cols-7 gap-2 h-16 place-content-center text-center'>
            <div className='text-xl col-span-3 my-auto'>{props.from_bus}</div>
            <div className='flex justify-center col-span-1'>
                <img className='' src={BusArrow} alt='BusArrow' width='45' />
            </div>
            <div className='text-xl col-span-3 my-auto'>{props.to_bus}</div>
        </div>
    )
}


export default BusCardHeader