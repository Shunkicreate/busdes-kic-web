import React, { useState } from 'react';
import BusArrow from '../images/BusArrow.svg';
import { AllBusStopsType } from '../types/Bus.type';

type Props = {
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
}

const BusCardHeader = (props: Props) => {

    const [showAllBusStops, setShowAllBusStops] = useState(false);
    const [showAllBusStopsParams, setShowAllBusStopsParams] = useState<'line-clamp-2'|''>('line-clamp-2');

    const switchShow = () => {
        setShowAllBusStops(!showAllBusStops)
        if(showAllBusStops){
            setShowAllBusStopsParams('line-clamp-2')
        }
        else{
            setShowAllBusStopsParams('')
        }
    }

    return (
        <div onClick={switchShow} className='grid grid-cols-7 gap-2 min-h-[4rem] h-fit place-content-center text-center'>
            <div className={'text-xl col-span-3 my-auto ' + showAllBusStopsParams}>{props.from_bus}</div>
            <div className='flex justify-center col-span-1 my-auto'>
                <img className='' src={BusArrow} alt='BusArrow' width='45' />
            </div>
            <div className={'text-xl col-span-3 my-auto ' + showAllBusStopsParams}>{props.to_bus}</div>
        </div>
    )
}


export default BusCardHeader