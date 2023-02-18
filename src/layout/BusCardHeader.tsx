import React from 'react';
import BusArrow from "./BusArrow.svg";




const BusCardHeader = () => {


    

    return (
        <div className="grid grid-cols-3 h-16 place-content-center">
            <div className="text-center text-xl">立命館大学</div>
            <div className="flex justify-center">
                <img className="" src={BusArrow} alt="BusArrow" width="45" />
            </div>
            <div className="text-center text-xl">京都駅</div>
        </div>
    )
}


export default BusCardHeader