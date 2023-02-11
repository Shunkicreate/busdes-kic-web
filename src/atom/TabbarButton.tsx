import { mode } from "../types/main.type"
export const TabbarButton = ({mode,modeName,switchMode}:{mode:mode,modeName:string,switchMode:(prm:mode)=>void}) => {
    return(
        <div>            
            <button onClick={() => { switchMode(mode) }} className="bg-gray-300 hover:bg-gray-200 text-white rounded px-4 py-2">{modeName}</button>
        </div>
    )
}

// export default TabbarButton