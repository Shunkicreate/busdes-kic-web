import React from 'react'
import refresh from '../images/refresh.svg'
import { mode } from '../types/main.type'

const makeReloadURL: (host: string, query: string) => URL = (host: string, query: string) => {
    const parser = new URL(host);
    return new URL('')
}

export const Header = ({ currentMode }: { currentMode: mode }) => {
    const url = location.href
    const host = location.host
    const params = (new URL(url)).searchParams;
    const mode = params.get('mode'); // 文字列 "Jonathan Smith" です。

    return (
        <div className="sticky top-0 w-full text-2xl text-contentText bg-main py-4 font-bold z-10">
            <div>
                Busdes!
            </div>
            <div className='fixed w-fit h-fit right-8 top-4'>
                <button onClick={() => { location.assign('http://' + host + '?mode=' + currentMode) }}>
                    {/* <a className='block' href={origin + '/' + currentMode}> */}
                    <img src={refresh} alt="refresh button" className='w-8 h-8' />
                    {/* </a> */}
                </button>
            </div>
        </div>
    )
}