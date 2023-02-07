import { mode } from "../types/main.type"
export const Footer = ({ setMode }: { setMode: React.Dispatch<React.SetStateAction<mode>> }) => {
    const switchMode = (mode: mode) => {
        setMode(mode)
    }
    return (
        <div>
            <div>
                <button onClick={() => { switchMode("TimeTable") }}>時刻表</button>
            </div>
            <div>
                <button onClick={() => { switchMode("NextBus") }}>次のバス</button>
            </div>
            <div>
                <button onClick={() => { switchMode("Settings") }}>設定</button>
            </div>
        </div>
    )
}