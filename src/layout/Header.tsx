import React from 'react'
import refresh from '../images/refresh.svg'

export const Header = () => {

    return (
        <div className="sticky top-0 w-full text-2xl text-contentText bg-main py-4 font-bold z-10">
            <div>
                Busdes!
            </div>
            <div className='absolute w-fit h-fit right-8 top-4'>
                <button onClick={() => { location.reload() }}>
                    <img src={refresh} alt="refresh button" className='w-8 h-8' />
                </button>
            </div>
        </div>
    )
}