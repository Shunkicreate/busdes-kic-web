import React from 'react';
import BusArrow from "./BusArrow.svg";
import { AllBusStopsType } from '../types/Bus.type';

type Props = {
    from_bus: AllBusStopsType
    to_bus: AllBusStopsType
}

const BusCardHeader = (station_name : Props) => {

    return (
        <div className="grid grid-cols-3 h-16 place-content-center">
            <div className="text-center text-xl">{station_name.from_bus}</div>
            <div className="flex justify-center">
                <img className="" src={BusArrow} alt="BusArrow" width="45" />
            </div>
            <div className="text-center text-xl">{station_name.to_bus}</div>
        </div>
    )
}


export default BusCardHeader