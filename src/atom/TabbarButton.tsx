import { mode } from "../types/main.type"
// import React from "react"
import React, { useState } from 'react';
// export const TabbarButton = ({mode,modeName,switchMode}:{mode:mode,modeName:string,switchMode:(prm:mode)=>void}) => {
export const TabbarButton = ({mode,modeName,color,switchMode}:{mode:mode,modeName:string,color:string,switchMode:(prm:mode)=>void}) => {

    // let colorTab = "gray-200";
    // colorTab = "gray-100";
    // const changeText = (e:string) => {
    //     setColorTab(e);
    // };
    // changeText('gray-100');
    // setColorTab('bg-gray-100');
    // console.log({colorTab});


    return(
        <div className="px-5 pt-2 text-1xl text-center">
            {/* <button onClick={() => { switchMode(mode) }} className={'bg-${colorTab} w-20 h-20'}>{modeName}</button>        */}
            <button onClick={() => { switchMode(mode); }} className={`${color} w-12 h-12 rounded-full`}></button>
            <p>{modeName}</p>
        </div>
    )
}

// export default TabbarButton