import React from "react"
// import "./ScrollBar.css"

export const ScrollBar = () => {
    const StationName = ['立命館大学前', '北野白梅町', '西ノ京円町', '四条大宮', '二条駅前', '三条京阪前'];

    // const NameScroll = StationName.map((name) => <div >ああああああああああああああい</div>)
    return (
        <div className="overflow-x-scroll my-2">
            <div className="flex whitespace-nowrap ">
                {StationName.map((name:string) => {
                    return <div key={name} className="px-6">{name}</div>
                })}
            </div>
        </div>
    )
}