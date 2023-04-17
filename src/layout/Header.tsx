import React from 'react'
import refresh from '../images/refresh.svg'
import { mode } from '../types/main.type'

export const Header = () => {

    return (
        <div className="sticky top-0 w-full text-2xl text-contentText bg-main py-4 font-bold z-10">
            <div>
                Busdes!
            </div>
            <div className='fixed w-fit h-fit right-8 top-4'>
                <button onClick={() => { location.reload() }}>
                    {/* <a className='block' href={origin + '/' + currentMode}> */}
                    <img src={refresh} alt="refresh button" className='w-8 h-8' />
                    {/* </a> */}
                </button>
            </div>
        </div>
    )
}