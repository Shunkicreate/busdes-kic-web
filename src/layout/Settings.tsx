import React from 'react';
import { useRecoilValue } from 'recoil';
import { string } from 'yargs';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import SettingModal from './SettingModal';

type settingItemType = {
    name: string,
    url: string,
}

const Settings = () => {
    const settingItems: settingItemType[] = [
        {
            name: 'フィードバックを送信',
            url: 'https://forms.gle/EkfH4jRu6PKhkEjPA'
        },
        {
            name: '利用規約',
            url: 'https://mercy34mercy.github.io/bustimer_kic/policy/'
        },
        {
            name: '最新情報【Twitter】',
            url: 'https://twitter.com/busdes_kic'
        },
    ]
    const busSettingItems: settingItemType[] = [
        {
            name: '運航スケジュール',
            url: 'https://mercy34mercy.github.io/bustimer_kic/shuttle/schedule.jpg'
        },
        {
            name: '時刻表',
            url: 'https://mercy34mercy.github.io/bustimer_kic/shuttle/timetable.jpg'
        },
    ]

    const SettingList = ({ name, items }: { name: string, items: settingItemType[] }) => {
        return (
            <div className='m-4 mt-0 mb-0 pt-4  after:border-b-2 after:px-2 after:w-full after:block'>
                <div className='font-bold mb-4 text-lg'>{name}</div>
                <div>
                    {
                        items.map((item, i) => {
                            return (
                                <div key={i} className='m-4 ml-8'>
                                    <a href={item.url} className="block text-sm">
                                        {item.name}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const AllBusStopList = useRecoilValue(getAllBusStopList)

    return (
        <div className='bg-white'>
            <SettingList name='大学間シャトルバス' items={busSettingItems} />
            <SettingList name='設定' items={settingItems} />
            <div className='p-4'>
                {AllBusStopList.map((BusStop, idx) => {
                    return (
                        <div key={idx} className='even:bg-stone-200 odd:bg-stone-300'>
                            <span>fr: </span>
                            <span>{BusStop.fr}</span>
                            <span>to: </span>
                            <span>{BusStop.to}</span>
                        </div>
                    )
                })}
            </div>
            <SettingModal></SettingModal>
        </div>
    )
}

export default Settings