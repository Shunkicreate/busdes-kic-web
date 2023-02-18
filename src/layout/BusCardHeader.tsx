import React from 'react';
import BusArrow from "./BusArrow.svg";


const BusCardHeader = () => {

    return (

        <div className="flex justify-center flex-row h-16">
            <div className="p-6 justify-center text-xl">立命館大学</div>
            <div className="inline-flex">
                <img className="" src={BusArrow} alt="BusArrow" width="45" />
            </div>
            <div className="p-6 justify-center text-xl">京都駅</div>
        </div>
    )
}


export default BusCardHeader