import { mode } from "../types/main.type"
import { TabbarButton } from "../atom/TabbarButton"
export const Footer = ({ setMode }: { setMode: React.Dispatch<React.SetStateAction<mode>> }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    return (
        <div>
            {/* { setMode } */}
            {/* <div>
                <button className="bg-gray-300 hover:bg-gray-200 text-white rounded px-4 py-2">Gray 300</button>
                <button onClick={() => { switchMode("TimeTable") }}>時刻表</button>
            </div>
            <div>
                <button onClick={() => { switchMode("NextBus") }}>次のバス</button>
            </div>
            <div>
                <button onClick={() => { switchMode("Settings") }}>設定</button>
            </div> */}
            <TabbarButton mode="TimeTable" modeName="時刻表" switchMode={switchMode}></TabbarButton>
            <TabbarButton mode="NextBus" modeName="次のバス" switchMode={switchMode}></TabbarButton>
            <TabbarButton mode="Settings" modeName="設定" switchMode={switchMode}></TabbarButton>
        </div>
    )
}